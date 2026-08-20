'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function runCli(rolesDir, args = []) {
  return spawnSync(process.execPath, [path.join(__dirname, '..', 'scripts', 'migrate-relationship-annotations.js'), ...args], {
    env: { ...process.env, ROLES_DIR: rolesDir },
    encoding: 'utf8',
  });
}

function fixtureTree() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'migrate-fixture-'));
  const domain = path.join(root, 'testdomain');
  fs.mkdirSync(domain);
  fs.writeFileSync(path.join(domain, 'engineer.md'), [
    '# Kubernetes Engineer',
    '',
    '| Field | Value |',
    '|---|---|',
    '| **Role ID** | `kubernetes-engineer` |',
    '| **Reports To** | Kubernetes Senior Engineer |',
    '| **Direct Reports** | None |',
    '',
  ].join('\n'));
  fs.writeFileSync(path.join(domain, 'senior.md'), [
    '# Kubernetes Senior Engineer',
    '',
    '| Field | Value |',
    '|---|---|',
    '| **Role ID** | `kubernetes-senior-engineer` |',
    '| **Reports To** | Board of Directors |',
    '| **Direct Reports** | Kubernetes Engineer |',
    '',
  ].join('\n'));
  return root;
}

test('dry run reports changes without writing them', () => {
  const root = fixtureTree();
  const before = fs.readFileSync(path.join(root, 'testdomain', 'engineer.md'), 'utf8');
  const result = runCli(root);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /Would (annotate|change)/i);
  assert.equal(fs.readFileSync(path.join(root, 'testdomain', 'engineer.md'), 'utf8'), before);
  fs.rmSync(root, { recursive: true, force: true });
});

test('--write annotates a resolvable Reports To and a curated external term', () => {
  const root = fixtureTree();
  const result = runCli(root, ['--write']);
  assert.equal(result.status, 0, result.stdout + result.stderr);

  const engineer = fs.readFileSync(path.join(root, 'testdomain', 'engineer.md'), 'utf8');
  assert.match(engineer, /\*\*Reports To\*\* \| Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer --> \|/);

  const senior = fs.readFileSync(path.join(root, 'testdomain', 'senior.md'), 'utf8');
  assert.match(senior, /\*\*Reports To\*\* \| Board of Directors <!-- external-role --> \|/);
  assert.match(senior, /\*\*Direct Reports\*\* \| Kubernetes Engineer <!-- role: kubernetes-engineer --> \|/);
  fs.rmSync(root, { recursive: true, force: true });
});

test('running --write twice is idempotent', () => {
  const root = fixtureTree();
  runCli(root, ['--write']);
  const afterFirst = fs.readFileSync(path.join(root, 'testdomain', 'engineer.md'), 'utf8');
  const second = runCli(root, ['--write']);
  assert.equal(second.status, 0, second.stdout + second.stderr);
  const afterSecond = fs.readFileSync(path.join(root, 'testdomain', 'engineer.md'), 'utf8');
  assert.equal(afterSecond, afterFirst);
  fs.rmSync(root, { recursive: true, force: true });
});
