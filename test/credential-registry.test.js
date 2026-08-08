'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  validateCredentialRegistry,
  loadCredentialRegistry,
  findCredentialReferences,
  validateRoleCredentialReferences,
} = require('../credentialRegistry');

const NOW = new Date('2026-08-08T00:00:00Z');

function validRegistry() {
  return {
    schema_version: 1,
    audited_roles: ['Roles/kubernetes/kubernetes_engineer.md'],
    credentials: [{
      id: 'cncf-cka',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation and The Linux Foundation',
      type: 'certification',
      url: 'https://www.cncf.io/training/certification/cka/',
      status: 'active',
      verified_on: '2026-08-08',
      owner: 'catalogue-maintainers',
      review_months: 12,
    }],
  };
}

test('a valid registry builds ID and audited-role indexes', () => {
  const result = validateCredentialRegistry(validRegistry(), NOW);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
  assert.equal(result.credentialsById.get('cncf-cka').name,
    'Certified Kubernetes Administrator (CKA)');
  assert.ok(result.auditedRoles.has('Roles/kubernetes/kubernetes_engineer.md'));
});

test('duplicate credential IDs are errors', () => {
  const registry = validRegistry();
  registry.credentials.push({ ...registry.credentials[0] });
  assert.ok(validateCredentialRegistry(registry, NOW).errors
    .some(error => /duplicate.*cncf-cka/i.test(error)));
});

test('missing required credential fields are errors', () => {
  const registry = validRegistry();
  delete registry.credentials[0].issuer;
  assert.ok(validateCredentialRegistry(registry, NOW).errors
    .some(error => /issuer/i.test(error)));
});

test('credential names and issuers must be non-empty strings', () => {
  const registry = validRegistry();
  registry.credentials[0].name = 42;
  assert.ok(validateCredentialRegistry(registry, NOW).errors
    .some(error => /name.*string/i.test(error)));
});

for (const [field, value, pattern] of [
  ['id', 'CKA', /id/i],
  ['type', 'badge', /type/i],
  ['url', 'http://example.com/cka', /https/i],
  ['status', 'maybe', /status/i],
  ['verified_on', '2026-02-30', /verified_on/i],
  ['review_months', 0, /review_months/i],
]) {
  test(`invalid ${field} is an error`, () => {
    const registry = validRegistry();
    registry.credentials[0][field] = value;
    assert.ok(validateCredentialRegistry(registry, NOW).errors.some(error => pattern.test(error)));
  });
}

test('an entry becomes stale only after its review interval', () => {
  const registry = validRegistry();
  registry.credentials[0].verified_on = '2025-08-07';
  const result = validateCredentialRegistry(registry, NOW);
  assert.deepEqual(result.errors, []);
  assert.ok(result.warnings.some(warning => /cncf-cka.*stale/i.test(warning)));
});

test('a review due on the reference date is not stale', () => {
  const registry = validRegistry();
  registry.credentials[0].verified_on = '2025-08-08';
  assert.deepEqual(validateCredentialRegistry(registry, NOW).warnings, []);
});

test('malformed JSON is returned as a registry error', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'credential-registry-'));
  const file = path.join(dir, 'credentials.json');
  fs.writeFileSync(file, '{ invalid json');
  const result = loadCredentialRegistry(file, NOW);
  assert.ok(result.errors.some(error => /parse/i.test(error)));
  fs.rmSync(dir, { recursive: true, force: true });
});

const known = new Map([['cncf-cka', { id: 'cncf-cka' }]]);

test('a known credential marker passes', () => {
  const markdown = '## Recommended Certifications & Learning Paths\n\n- Certified Kubernetes Administrator (CKA) <!-- credential: cncf-cka -->\n';
  assert.deepEqual(validateRoleCredentialReferences(markdown, known, { requireComplete: true }),
    { errors: [], warnings: [] });
});

test('an unknown credential marker is an error', () => {
  const markdown = '- Imaginary Credential <!-- credential: invented-one -->\n';
  assert.ok(validateRoleCredentialReferences(markdown, known, { requireComplete: false })
    .errors.some(error => /unknown.*invented-one/i.test(error)));
});

test('a duplicate marker in one role is an error', () => {
  const markdown = '- CKA <!-- credential: cncf-cka -->\n- CKA again <!-- credential: cncf-cka -->\n';
  assert.ok(validateRoleCredentialReferences(markdown, known, { requireComplete: false })
    .errors.some(error => /duplicate.*cncf-cka/i.test(error)));
});

test('audited recommendation bullets require exactly one marker', () => {
  const markdown = `## Recommended Certifications & Learning Paths

**Core Certifications:**

- Certified Kubernetes Administrator (CKA)

**Learning Resources and Communities:**

- Kubernetes documentation
`;
  const result = validateRoleCredentialReferences(markdown, known, { requireComplete: true });
  assert.ok(result.errors.some(error => /missing credential marker/i.test(error)));
  assert.equal(result.errors.filter(error => /Kubernetes documentation/.test(error)).length, 0);
});

test('legacy unmarked recommendations remain allowed', () => {
  const markdown = '## Recommended Certifications & Learning Paths\n\n- Legacy free text\n';
  assert.deepEqual(validateRoleCredentialReferences(markdown, known, { requireComplete: false }),
    { errors: [], warnings: [] });
});

test('credential references include their marker line and source text', () => {
  const markdown = 'Intro\n- CKA <!-- credential: cncf-cka -->\n';
  assert.deepEqual(findCredentialReferences(markdown), [{
    id: 'cncf-cka',
    line: 2,
    raw: '<!-- credential: cncf-cka -->',
  }]);
});

test('a credential marker without canonical spacing is an error', () => {
  const markdown = '- CKA <!--credential:cncf-cka-->\n';
  const result = validateRoleCredentialReferences(markdown, known, { requireComplete: false });
  assert.ok(result.errors.some(error => /invalid credential marker/i.test(error)));
});

test('an uppercase credential ID is an error instead of an ignored marker', () => {
  const markdown = '- CKA <!-- credential: CNCF-CKA -->\n';
  const result = validateRoleCredentialReferences(markdown, known, { requireComplete: false });
  assert.ok(result.errors.some(error => /invalid credential marker/i.test(error)));
});
