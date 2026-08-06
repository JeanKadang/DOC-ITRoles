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
    .map(s => {
      // Two sections have a required shape rather than free prose:
      // Interactions needs the Interaction Mode column (#6), and KPIs need
      // the measurable table form (#121). The rest use placeholder text.
      if (s.name === 'Interactions with Other Roles') {
        return `## ${s.name}\n\n| Role | Nature of Interaction | Interaction Mode |\n|---|---|---|\n| Peer Role | Shared delivery work | Collaborates |\n`;
      }
      if (s.name === 'Key Performance Indicators') {
        return `## ${s.name}\n\n| Metric | Target | Frequency |\n|---|---|---|\n| Delivery within agreed scope | ≥95% | Monthly |\n`;
      }
      return `## ${s.name}\n\nContent for ${s.name}.\n`;
    })
    .join('\n');
  let content = `# Test Role

| Field | Value |
|---|---|
| **Domain** | testdomain |
| **Role Level** | Engineer |
| **Reports To** | Test Chapter Lead |
| **Direct Reports** | None |
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
    const expected = [`Missing section: ## ${section.name}`];
    // Dropping the Interactions section also drops the table carrying the
    // Interaction Mode column, so both errors are legitimately expected.
    if (section.name === 'Interactions with Other Roles') {
      expected.push('Interactions table is missing the "Interaction Mode" column');
    }
    assert.deepEqual(r.errors, expected,
      `unexpected errors for a file missing "${section.name}"`);
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

// ── template fields enforced after the #5 backfill (#6) ──

test('missing Reports To metadata is an error', () => {
  const file = writeFixture('no-reports-to.md', completeRole({ transform: c => c.replace(/\|\s*\*\*Reports To\*\*.*\n/, '') }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, ['Missing **Reports To** metadata field']);
});

test('missing Direct Reports metadata is an error', () => {
  const file = writeFixture('no-direct-reports.md', completeRole({ transform: c => c.replace(/\|\s*\*\*Direct Reports\*\*.*\n/, '') }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, ['Missing **Direct Reports** metadata field']);
});

test('"None" is a valid Direct Reports value for individual contributors', () => {
  const file = writeFixture('ic-role.md', completeRole());
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, []);
});

test('Role Scope & Boundaries is a required section', () => {
  const file = writeFixture('no-scope.md', completeRole({ except: 'Role Scope & Boundaries' }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, ['Missing section: ## Role Scope & Boundaries']);
});

test('"Role Scope and Boundaries" is accepted as an equivalent heading', () => {
  const file = writeFixture('scope-and.md', completeRole({
    transform: c => c.replace('## Role Scope & Boundaries', '## Role Scope and Boundaries'),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, []);
});

test('an Interactions table without the Interaction Mode column is an error', () => {
  const file = writeFixture('no-mode-column.md', completeRole({
    transform: c => c
      .replace('| Role | Nature of Interaction | Interaction Mode |', '| Role | Nature of Interaction |')
      .replace('|---|---|---|', '|---|---|')
      .replace('| Peer Role | Shared delivery work | Collaborates |', '| Peer Role | Shared delivery work |'),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, ['Interactions table is missing the "Interaction Mode" column']);
});

test('prose mentioning Interaction Mode does not satisfy the column check', () => {
  // docs/role_template.md explains the Interaction Mode vocabulary in a
  // blockquote above the table; that text alone must not count as the column.
  const file = writeFixture('mode-prose-only.md', completeRole({
    transform: c => c
      .replace('| Role | Nature of Interaction | Interaction Mode |', '> **Interaction Mode** describes the direction of the relationship.\n\n| Role | Nature of Interaction |')
      .replace('|---|---|---|', '|---|---|')
      .replace('| Peer Role | Shared delivery work | Collaborates |', '| Peer Role | Shared delivery work |'),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, ['Interactions table is missing the "Interaction Mode" column']);
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

// ── canonical formatting warnings (#121) ─────────────────
// The validator accepts several historical spellings and formats so that a
// missing section is reported instead of a cosmetic difference. That
// permissiveness is why the catalog drifted (203/19 on "and" vs "&",
// 155/67 on "Required Skills", 200/22 on KPI format). These now warn, so
// the drift is visible and `--strict` can gate it once #122 normalises the
// files.

test('a non-canonical but accepted heading spelling warns', () => {
  const file = writeFixture('warn-heading.md', completeRole({
    transform: c => c.replace('## Key Decisions & Accountabilities', '## Key Decisions and Accountabilities'),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, [], 'still not an error - the section is present');
  assert.ok(
    r.warnings.some(w => /Key Decisions & Accountabilities/.test(w)),
    `expected a canonical-heading warning, got: ${JSON.stringify(r.warnings)}`
  );
});

test('the canonical heading spelling does not warn', () => {
  const file = writeFixture('ok-heading.md', completeRole());
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.warnings.filter(w => /canonical heading/i.test(w)), []);
});

test('bullet-format Key Performance Indicators warn', () => {
  // 200 of 222 roles list KPI topics rather than measurable targets; the
  // template calls the table form preferred. See #122.
  const file = writeFixture('kpi-bullets.md', completeRole({
    transform: c => c.replace(
      '| Metric | Target | Frequency |\n|---|---|---|\n| Delivery within agreed scope | ≥95% | Monthly |\n',
      '- Architecture design quality and effectiveness\n- Cost efficiency of designed solutions\n'
    ),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, []);
  assert.ok(
    r.warnings.some(w => /Key Performance Indicators/.test(w) && /table/i.test(w)),
    `expected a KPI table warning, got: ${JSON.stringify(r.warnings)}`
  );
});

test('table-format Key Performance Indicators do not warn', () => {
  const file = writeFixture('kpi-table.md', completeRole());
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.warnings.filter(w => /Key Performance Indicators/.test(w)), []);
});

test('inline-bullet Technology Proficiency Levels warn', () => {
  const file = writeFixture('prof-inline.md', completeRole({
    transform: c => c.replace(
      'Content for Required Skills & Qualifications.',
      '**Technology Proficiency Levels:**\n\n- **Expert level required:** Kubernetes, Terraform\n- **Proficient level required:** Helm\n'
    ),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, []);
  assert.ok(
    r.warnings.some(w => /Technology Proficiency Levels/.test(w)),
    `expected a proficiency-format warning, got: ${JSON.stringify(r.warnings)}`
  );
});

test('sub-heading Technology Proficiency Levels do not warn', () => {
  const file = writeFixture('prof-subhead.md', completeRole({
    transform: c => c.replace(
      'Content for Required Skills & Qualifications.',
      '**Technology Proficiency Levels:**\n\n**Expert level required:**\n\n- Kubernetes\n\n**Proficient level required:**\n\n- Helm\n'
    ),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.warnings.filter(w => /Technology Proficiency Levels/.test(w)), []);
});

// ── KPI rows without a target (#140) ─────────────────────
// Once every role uses the table format the old "uses bullets" warning goes
// silent, which would hide the real problem. The signal moves from
// per-file to per-row: a table row with no target is still an unmeasurable
// KPI, and must keep saying so.

test('a KPI table row with no target warns', () => {
  const file = writeFixture('kpi-no-target.md', completeRole({
    transform: c => c.replace(
      '| Delivery within agreed scope | ≥95% | Monthly |',
      '| Delivery within agreed scope | ≥95% | Monthly |\n| Architecture design quality | — | — |'
    ),
  }));
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.errors, [], 'a missing target is a gap to fill, not a broken file');
  assert.ok(
    r.warnings.some(w => /Key Performance Indicators/.test(w) && /target/i.test(w)),
    `expected a missing-target warning, got: ${JSON.stringify(r.warnings)}`
  );
});

test('the warning counts how many rows are missing a target', () => {
  const file = writeFixture('kpi-two-gaps.md', completeRole({
    transform: c => c.replace(
      '| Delivery within agreed scope | ≥95% | Monthly |',
      '| Delivery within agreed scope | ≥95% | Monthly |\n| Gap one | — | — |\n| Gap two | — | Monthly |'
    ),
  }));
  const r = validateFile(file, tmpRoot);
  assert.ok(r.warnings.some(w => /\b2\b/.test(w) && /target/i.test(w)),
    `expected the warning to name 2 rows, got: ${JSON.stringify(r.warnings)}`);
});

test('a fully targeted KPI table does not warn', () => {
  const file = writeFixture('kpi-all-targeted.md', completeRole());
  const r = validateFile(file, tmpRoot);
  assert.deepEqual(r.warnings.filter(w => /Key Performance Indicators/.test(w)), []);
});

test('an empty target cell counts the same as an em dash', () => {
  // Whitespace must not be a way to dodge the check.
  const file = writeFixture('kpi-blank-cell.md', completeRole({
    transform: c => c.replace(
      '| Delivery within agreed scope | ≥95% | Monthly |',
      '| Delivery within agreed scope |  |  |'
    ),
  }));
  const r = validateFile(file, tmpRoot);
  assert.ok(r.warnings.some(w => /target/i.test(w)));
});
