'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { loadCredentialRegistry, validateRoleCredentialReferences } = require('../credentialRegistry');

const ROOT = path.join(__dirname, '..');
const REGISTRY = path.join(ROOT, 'data', 'credentials.json');
const EXPECTED_ROLES = [
  'Roles/kubernetes/kubernetes_architect.md',
  'Roles/kubernetes/kubernetes_engineer.md',
  'Roles/kubernetes/kubernetes_product_owner.md',
  'Roles/kubernetes/kubernetes_senior_engineer.md',
];

test('the Kubernetes pilot contains exactly the four audited roles', () => {
  const result = loadCredentialRegistry(REGISTRY, new Date('2026-08-08T00:00:00Z'));
  assert.deepEqual(result.errors, []);
  assert.deepEqual([...result.auditedRoles].sort(), EXPECTED_ROLES);
});

test('every Kubernetes pilot recommendation references a known credential', () => {
  const registry = loadCredentialRegistry(REGISTRY, new Date('2026-08-08T00:00:00Z'));
  for (const relativePath of EXPECTED_ROLES) {
    const markdown = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
    const result = validateRoleCredentialReferences(
      markdown,
      registry.credentialsById,
      { requireComplete: true },
    );
    assert.deepEqual(result.errors, [], `${relativePath}: ${result.errors.join('; ')}`);
  }
});

test('KCSP is not presented as an individual credential', () => {
  for (const relativePath of EXPECTED_ROLES) {
    const markdown = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
    assert.doesNotMatch(markdown, /Certified Kubernetes Service Provider|\bKCSP\b/i);
  }
});
