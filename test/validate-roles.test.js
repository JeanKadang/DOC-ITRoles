'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const { listRoleFiles, validateFile, findDuplicateTitles, REQUIRED_SECTIONS } = require('../validate-roles');

// All fixtures are generated into a temp tree at runtime — nothing under
// Roles/ or test/ is touched, so `npm run validate` and markdownlint on the
// repo are unaffected.
let tmpRoot;   // <tmp>/roles-fixture — plays the part of Roles/
let domainDir; // <tmp>/roles-fixture/testdomain

test.before(() => {
  tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'roles-fixture-'));
  domainDir = path.join(tmpRoot, 'testdomain');
  fs.mkdirSync(domainDir);
});

test.after(() => {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
});

// A minimal role file that satisfies every validator check. The Domain
// value matches the folder name (no DOMAIN_LABELS entry for 'testdomain',
// so the canonical label falls back to the folder name).
function completeRole({ except = null, transform = null } = {}) {
  const sections = REQUIRED_SECTIONS
    .filter(s => s.name !== except)
    .map(s => `## ${s.name}\n\nContent for ${s.name}.\n`)
    .join('\n');
  let content = `# Test Role

| Field | Value |
|---|---|
| **Domain** | testdomain |
| **Role Level** | Engineer |
| **Last Reviewed** | 2026-07 |

${sections}`;
  if (transform) content = transform(content);
  return content;
}

function writeFixture(name, content) {
  const file = path.join(domainDir, name);
  fs.writeFileSync(file, content);
  return file;
}

// ── happy path ───────────────────────────────────────────

test('a well-formed role file passes with 0 errors and 0 warnings', () => {
  const file = writeFixture('complete.md', completeRole());
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.warnings, []);
  assert.equal(r.skipped, false);
});

// ── required sections ────────────────────────────────────

test('each required section individually missing produces exactly that error', () => {
  for (const section of REQUIRED_SECTIONS) {
    const file = writeFixture('missing-section.md', completeRole({ except: section.name }));
    const r = validateFile(file, tmpRoot);
    assert.deepEqual(r.errors, [`Missing section: ## ${section.name}`],
      `expected a single missing-section error for "${section.name}"`);
  }
});

test('historical heading spellings are accepted as equivalents', () => {
  // "Relationships & Collaboration" is an accepted alternative for
  // "Interactions with Other Roles".
  const file = writeFixture('alt-heading.md', completeRole({
    transform: c => c.replace('## Interactions with Other Roles', '## Relationships & Collaboration'),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, []);
});

// ── metadata errors ──────────────────────────────────────

test('missing H1 title is an error', () => {
  const file = writeFixture('no-title.md', completeRole({ transform: c => c.replace(/^# Test Role\n/, '') }));
  const r = validateFile(file, tmpRoot);
  assert.ok(r.errors.includes('Missing H1 title (# Role Title)'));
});

test('missing Domain metadata is an error', () => {
  const file = writeFixture('no-domain.md', completeRole({ transform: c => c.replace(/\|\s*\*\*Domain\*\*.*\n/, '') }));
  const r = validateFile(file, tmpRoot);
  assert.ok(r.errors.includes('Missing **Domain** metadata field'));
});

test('missing Role Level metadata is an error', () => {
  const file = writeFixture('no-level.md', completeRole({ transform: c => c.replace(/\|\s*\*\*Role Level\*\*.*\n/, '') }));
  const r = validateFile(file, tmpRoot);
  assert.ok(r.errors.includes('Missing **Role Level** metadata field'));
});

test('missing Last Reviewed metadata is an error', () => {
  const file = writeFixture('no-reviewed.md', completeRole({ transform: c => c.replace(/\|\s*\*\*Last Reviewed\*\*.*\n/, '') }));
  const r = validateFile(file, tmpRoot);
  assert.ok(r.errors.includes('Missing **Last Reviewed** metadata field'));
});

// ── warnings (not errors) ────────────────────────────────

test('a non-canonical Role Level is a warning, not an error', () => {
  const file = writeFixture('odd-level.md', completeRole({
    transform: c => c.replace('| **Role Level** | Engineer |', '| **Role Level** | Grand Wizard |'),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, []);
  assert.equal(r.warnings.length, 1);
  assert.match(r.warnings[0], /Grand Wizard.*not in the canonical level vocabulary/);
});

test('a malformed Last Reviewed value is a warning, not an error', () => {
  const file = writeFixture('odd-date.md', completeRole({
    transform: c => c.replace('| **Last Reviewed** | 2026-07 |', '| **Last Reviewed** | July 2026 |'),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, []);
  assert.ok(r.warnings.some(w => w.includes('not in YYYY-MM format')));
});

test('a Domain not matching the folder label is a warning, not an error', () => {
  const file = writeFixture('wrong-domain.md', completeRole({
    transform: c => c.replace('| **Domain** | testdomain |', '| **Domain** | Somewhere Else |'),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, []);
  assert.ok(r.warnings.some(w => w.includes('does not match the canonical label')));
});

// ── reference docs ───────────────────────────────────────

test('a _standards.md reference doc is skipped after title/domain checks', () => {
  const file = writeFixture('cost_standards.md',
    '# Cost Standards\n\n| Field | Value |\n|---|---|\n| **Domain** | testdomain |\n\n## Overview\n\nStandards text.\n');
  const r = validateFile(file, tmpRoot);
  assert.equal(r.skipped, true);
  assert.deepEqual(r.errors, []);
});

test('a reference doc still requires title and Domain', () => {
  const file = writeFixture('bare_standards.md', 'Just some text without title or metadata.\n');
  const r = validateFile(file, tmpRoot);
  assert.equal(r.skipped, true);
  assert.ok(r.errors.includes('Missing H1 title (# Role Title)'));
  assert.ok(r.errors.includes('Missing **Domain** metadata field'));
});

// ── listRoleFiles ────────────────────────────────────────

test('listRoleFiles finds .md files in domain folders and skips READMEs', () => {
  const listRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'roles-list-'));
  fs.mkdirSync(path.join(listRoot, 'dom'));
  fs.writeFileSync(path.join(listRoot, 'dom', 'a_role.md'), '# A');
  fs.writeFileSync(path.join(listRoot, 'dom', 'README.md'), '# readme');
  fs.writeFileSync(path.join(listRoot, 'toplevel.md'), '# ignored'); // not in a domain folder
  const files = listRoleFiles(listRoot).map(f => path.basename(f));
  assert.deepEqual(files, ['a_role.md']);
  fs.rmSync(listRoot, { recursive: true, force: true });
});

// ── CLI exit codes (spawned against a fixture tree) ─────

function runCli(rolesDir, args = []) {
  return spawnSync(process.execPath, [path.join(__dirname, '..', 'validate-roles.js'), ...args], {
    env: { ...process.env, ROLES_DIR: rolesDir },
    encoding: 'utf8',
  });
}

test('CLI exits 0 on a clean tree, and warnings do not fail a normal run', () => {
  const cliRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'roles-cli-'));
  fs.mkdirSync(path.join(cliRoot, 'testdomain'));
  fs.writeFileSync(path.join(cliRoot, 'testdomain', 'ok.md'),
    completeRole({ transform: c => c.replace('# Test Role', '# Ok Role') }));
  fs.writeFileSync(path.join(cliRoot, 'testdomain', 'warny.md'), completeRole({
    transform: c => c.replace('# Test Role', '# Warny Role')
                     .replace('| **Role Level** | Engineer |', '| **Role Level** | Grand Wizard |'),
  }));
  const normal = runCli(cliRoot);
  assert.equal(normal.status, 0, normal.stdout);
  assert.match(normal.stdout, /1 file\(s\) with warnings/);

  const strict = runCli(cliRoot, ['--strict']);
  assert.equal(strict.status, 1, '--strict must promote warnings to a failing exit code');

  fs.rmSync(cliRoot, { recursive: true, force: true });
});

test('CLI exits 1 when a file has errors', () => {
  const cliRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'roles-cli-err-'));
  fs.mkdirSync(path.join(cliRoot, 'testdomain'));
  fs.writeFileSync(path.join(cliRoot, 'testdomain', 'broken.md'),
    completeRole({ except: 'Business Impact' }));
  const run = runCli(cliRoot);
  assert.equal(run.status, 1);
  assert.match(run.stdout, /Missing section: ## Business Impact/);
  fs.rmSync(cliRoot, { recursive: true, force: true });
});

// ── findDuplicateTitles (#67) ────────────────────────────
// Isolated temp trees (not the shared tmpRoot, which accumulates many
// "Test Role" H1s across the other tests).

function isolatedTree(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'roles-dupe-'));
  fs.mkdirSync(path.join(root, 'dom_a'));
  fs.mkdirSync(path.join(root, 'dom_b'));
  for (const [rel, title] of Object.entries(files)) {
    fs.writeFileSync(path.join(root, rel), `# ${title}\n\n| Field | Value |\n|---|---|\n| **Domain** | x |\n`);
  }
  return root;
}

test('findDuplicateTitles reports a title shared by two role files, with both paths', () => {
  const root = isolatedTree({
    'dom_a/one.md': 'Platform Owner',
    'dom_b/two.md': 'Platform Owner',
    'dom_a/three.md': 'Unique Role',
  });
  const dupes = findDuplicateTitles(root);
  assert.equal(dupes.length, 1);
  assert.equal(dupes[0].title, 'Platform Owner');
  // rel paths carry the temp-dir basename prefix; assert on the tail.
  assert.deepEqual(dupes[0].files.map(f => f.split('/').slice(-2).join('/')),
    ['dom_a/one.md', 'dom_b/two.md']);
  fs.rmSync(root, { recursive: true, force: true });
});

test('findDuplicateTitles returns nothing when every title is unique', () => {
  const root = isolatedTree({ 'dom_a/one.md': 'Alpha', 'dom_b/two.md': 'Beta' });
  assert.deepEqual(findDuplicateTitles(root), []);
  fs.rmSync(root, { recursive: true, force: true });
});

test('findDuplicateTitles ignores _standards.md reference docs', () => {
  const root = isolatedTree({
    'dom_a/role.md': 'Shared Name',
    'dom_a/cost_standards.md': 'Shared Name', // reference doc, must not count
  });
  assert.deepEqual(findDuplicateTitles(root), []);
  fs.rmSync(root, { recursive: true, force: true });
});

test('CLI exits 1 and names both files when a duplicate title exists', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'roles-dupe-cli-'));
  fs.mkdirSync(path.join(root, 'testdomain'));
  fs.writeFileSync(path.join(root, 'testdomain', 'a.md'), completeRole({ transform: c => c.replace('# Test Role', '# Same Title') }));
  fs.writeFileSync(path.join(root, 'testdomain', 'b.md'), completeRole({ transform: c => c.replace('# Test Role', '# Same Title') }));
  const run = spawnSync(process.execPath, [path.join(__dirname, '..', 'validate-roles.js')], {
    env: { ...process.env, ROLES_DIR: root }, encoding: 'utf8',
  });
  assert.equal(run.status, 1);
  assert.match(run.stdout, /Duplicate role title: "Same Title"/);
  assert.match(run.stdout, /testdomain\/a\.md/);
  assert.match(run.stdout, /testdomain\/b\.md/);
  fs.rmSync(root, { recursive: true, force: true });
});
