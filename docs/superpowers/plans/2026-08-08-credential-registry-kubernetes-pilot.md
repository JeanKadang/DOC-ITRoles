# Credential Registry and Kubernetes Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a source-backed credential registry, validate role references and review age, and complete a fully audited Kubernetes pilot for issue #178.

**Architecture:** `credentialRegistry.js` owns registry parsing, schema checks, staleness calculation, and Markdown reference validation. `validate-roles.js` consumes that module so `npm run validate` remains the single content-validation entry point. `data/credentials.json` names the audited role files explicitly, allowing the four Kubernetes roles to require complete registry markers while legacy domains remain valid until later rollout batches.

**Tech Stack:** Node.js 18+, CommonJS, `node:test`, JSON, Markdown, existing zero-runtime-dependency validation workflow.

## Global Constraints

- Keep runtime dependencies at zero; validation must use Node built-ins only.
- Do not perform network requests in tests, `npm run validate`, or CI.
- Use stable hidden markers in the exact form `<!-- credential: <id> -->`.
- Use lowercase kebab-case credential IDs and never rename an ID merely because the official display name changes.
- Treat unknown references and invalid registry records as errors.
- Treat stale verification dates as warnings; the normal validator still exits zero when only warnings exist.
- Default credential review cadence is 12 months.
- Only the four Kubernetes role files are audited in this pilot; unmarked legacy recommendations elsewhere remain allowed.
- Organisation programmes, courses, vague families, and provider marketing tracks are not individual credentials.
- Use issuer-controlled sources checked on `2026-08-08`; do not substitute search snippets or training resellers.
- Keep issue #178 open until every acceptance criterion has criterion-level evidence and is checked.

---

## File Structure

- Create `credentialRegistry.js`: pure registry and Markdown-reference validation functions plus file loading.
- Create `data/credentials.json`: versioned registry, audited-role list, and verified credential records.
- Create `test/credential-registry.test.js`: schema, lifecycle, date, staleness, and reference unit tests.
- Create `test/kubernetes-credentials.test.js`: integration guard for all four audited Kubernetes roles.
- Modify `validate-roles.js`: load registry once, validate it, and apply its context to each role.
- Modify `test/validate-roles.test.js`: prove CLI errors/warnings and audited-role integration.
- Modify four files under `Roles/kubernetes/`: replace free-text claims with verified credentials and markers.
- Create `docs/CREDENTIAL_REGISTRY.md`: schema, ownership, evidence, lifecycle, and rollout policy.
- Modify `CONTRIBUTING.md`, `README.md`, and `docs/role_template.md`: link and apply the registry rules.

### Task 1: Registry schema, loading, and staleness

**Files:**

- Create: `credentialRegistry.js`
- Create: `data/credentials.json`
- Create: `test/credential-registry.test.js`

**Interfaces:**

- Produces: `validateCredentialRegistry(value, now)` returning `{ errors, warnings, credentialsById, auditedRoles }`.
- Produces: `loadCredentialRegistry(filePath, now)` with the same return shape and parse/read errors converted to validation errors.
- Produces: `CREDENTIAL_ID_PATTERN`, `ALLOWED_TYPES`, and `ALLOWED_STATUSES` for focused tests.

- [x] **Step 1: Write failing schema and staleness tests**

Create `test/credential-registry.test.js` with a reusable valid fixture and one-behaviour tests:

```javascript
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  validateCredentialRegistry,
  loadCredentialRegistry,
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
```

- [x] **Step 2: Run the focused test and verify RED**

Run: `node --test test/credential-registry.test.js`

Expected: FAIL with `Cannot find module '../credentialRegistry'`.

- [x] **Step 3: Implement the minimal registry validator**

Create `credentialRegistry.js` using these exact rules:

```javascript
'use strict';

const fs = require('node:fs');

const CREDENTIAL_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_TYPES = new Set(['certification', 'certificate']);
const ALLOWED_STATUSES = new Set(['active', 'retired', 'superseded']);
const REQUIRED_FIELDS = [
  'id', 'name', 'issuer', 'type', 'url', 'status',
  'verified_on', 'owner', 'review_months',
];

function emptyResult(errors = []) {
  return { errors, warnings: [], credentialsById: new Map(), auditedRoles: new Set() };
}

function isRealIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function reviewDueDate(verifiedOn, months) {
  const date = new Date(`${verifiedOn}T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + months);
  return date;
}

function validateCredentialRegistry(value, now = new Date()) {
  const result = emptyResult();
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    result.errors.push('Credential registry must be a JSON object');
    return result;
  }
  if (value.schema_version !== 1) result.errors.push('schema_version must be 1');
  if (!Array.isArray(value.audited_roles)) result.errors.push('audited_roles must be an array');
  if (!Array.isArray(value.credentials)) {
    result.errors.push('credentials must be an array');
    return result;
  }

  for (const role of value.audited_roles || []) {
    if (typeof role !== 'string' || !/^Roles\/[a-z0-9_/-]+\.md$/.test(role)) {
      result.errors.push(`Invalid audited role path: ${String(role)}`);
    } else if (result.auditedRoles.has(role)) {
      result.errors.push(`Duplicate audited role path: ${role}`);
    } else {
      result.auditedRoles.add(role);
    }
  }

  for (const [index, credential] of value.credentials.entries()) {
    const prefix = `credentials[${index}]`;
    if (!credential || typeof credential !== 'object' || Array.isArray(credential)) {
      result.errors.push(`${prefix} must be an object`);
      continue;
    }
    for (const field of REQUIRED_FIELDS) {
      if (credential[field] === undefined || credential[field] === '') {
        result.errors.push(`${prefix}.${field} is required`);
      }
    }
    for (const field of ['name', 'issuer']) {
      if (typeof credential[field] !== 'string' || !credential[field].trim()) {
        result.errors.push(`${prefix}.${field} must be a non-empty string`);
      }
    }
    if (!CREDENTIAL_ID_PATTERN.test(credential.id || '')) {
      result.errors.push(`${prefix}.id must be lowercase kebab-case`);
    } else if (result.credentialsById.has(credential.id)) {
      result.errors.push(`Duplicate credential ID: ${credential.id}`);
    } else {
      result.credentialsById.set(credential.id, credential);
    }
    if (!ALLOWED_TYPES.has(credential.type)) result.errors.push(`${prefix}.type is unsupported`);
    if (!ALLOWED_STATUSES.has(credential.status)) result.errors.push(`${prefix}.status is unsupported`);
    try {
      const url = new URL(credential.url);
      if (url.protocol !== 'https:') result.errors.push(`${prefix}.url must use https`);
    } catch {
      result.errors.push(`${prefix}.url must be a valid https URL`);
    }
    if (!isRealIsoDate(credential.verified_on || '')) {
      result.errors.push(`${prefix}.verified_on must be a real YYYY-MM-DD date`);
    }
    if (!Number.isInteger(credential.review_months) || credential.review_months < 1) {
      result.errors.push(`${prefix}.review_months must be a positive integer`);
    }
    if (typeof credential.owner !== 'string' || !credential.owner.trim()) {
      result.errors.push(`${prefix}.owner is required`);
    }
    if (credential.notes !== undefined && typeof credential.notes !== 'string') {
      result.errors.push(`${prefix}.notes must be a string when present`);
    }
    if (isRealIsoDate(credential.verified_on || '') &&
        Number.isInteger(credential.review_months) && credential.review_months > 0 &&
        now > reviewDueDate(credential.verified_on, credential.review_months)) {
      result.warnings.push(`${credential.id || prefix} credential verification is stale`);
    }
  }
  return result;
}

function loadCredentialRegistry(filePath, now = new Date()) {
  try {
    return validateCredentialRegistry(JSON.parse(fs.readFileSync(filePath, 'utf8')), now);
  } catch (error) {
    return emptyResult([`Unable to read or parse credential registry: ${error.message}`]);
  }
}

module.exports = {
  validateCredentialRegistry,
  loadCredentialRegistry,
  CREDENTIAL_ID_PATTERN,
  ALLOWED_TYPES,
  ALLOWED_STATUSES,
};
```

Create the initially empty but valid `data/credentials.json` so the CLI can be
integrated in Task 2 without leaving `npm run validate` broken between commits:

```json
{
  "schema_version": 1,
  "audited_roles": [],
  "credentials": []
}
```

- [x] **Step 4: Run focused and full Node tests**

Run: `node --test test/credential-registry.test.js`

Expected: PASS with zero failures.

Run: `npm test`

Expected: all existing tests plus the new registry tests pass.

- [x] **Step 5: Commit Task 1**

```bash
git add credentialRegistry.js data/credentials.json test/credential-registry.test.js
git commit -m "feat: validate credential registry"
```

### Task 2: Role-marker validation and CLI integration

**Files:**

- Modify: `credentialRegistry.js`
- Modify: `test/credential-registry.test.js`
- Modify: `validate-roles.js`
- Modify: `test/validate-roles.test.js`

**Interfaces:**

- Consumes: `credentialsById` and `auditedRoles` from Task 1.
- Produces: `findCredentialReferences(markdown)` returning `{ id, line, raw }[]`.
- Produces: `validateRoleCredentialReferences(markdown, credentialsById, { requireComplete })` returning `{ errors, warnings }`.
- Changes: `validateFile(filePath, rolesDir, credentialContext = null)`; existing two-argument callers remain valid.

- [x] **Step 1: Write failing marker tests**

Append tests that prove known, unknown, duplicate, and unmarked audited bullets:

```javascript
const {
  findCredentialReferences,
  validateRoleCredentialReferences,
} = require('../credentialRegistry');

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
```

In `test/validate-roles.test.js`, add a fixture test passing an explicit credential context to `validateFile` and a CLI test using `CREDENTIALS_FILE` to prove an unknown marker exits 1.

- [x] **Step 2: Run the focused tests and verify RED**

Run: `node --test test/credential-registry.test.js test/validate-roles.test.js`

Expected: FAIL because the marker functions and `credentialContext` integration do not exist.

- [x] **Step 3: Implement marker extraction and audited-section checks**

Add to `credentialRegistry.js`:

```javascript
const CREDENTIAL_MARKER = /<!--\s*credential:\s*([a-z0-9]+(?:-[a-z0-9]+)*)\s*-->/g;

function certificationSection(markdown) {
  const start = markdown.search(/^##\s+Recommended Certifications (?:&|and) Learning Paths\s*$/im);
  if (start === -1) return '';
  const rest = markdown.slice(start);
  const next = rest.slice(1).search(/\n##\s+/);
  return next === -1 ? rest : rest.slice(0, next + 1);
}

function findCredentialReferences(markdown) {
  const references = [];
  for (const match of markdown.matchAll(CREDENTIAL_MARKER)) {
    references.push({
      id: match[1],
      line: markdown.slice(0, match.index).split(/\r?\n/).length,
      raw: match[0],
    });
  }
  return references;
}

function recommendedCredentialBullets(markdown) {
  const section = certificationSection(markdown);
  const learningIndex = section.search(/^\*\*Learning Resources and Communities:\*\*\s*$/im);
  const credentialPart = learningIndex === -1 ? section : section.slice(0, learningIndex);
  return credentialPart.split(/\r?\n/)
    .map((line, index) => ({ line, number: index + 1 }))
    .filter(item => /^\s*-\s+/.test(item.line));
}

function validateRoleCredentialReferences(markdown, credentialsById, { requireComplete = false } = {}) {
  const errors = [];
  const warnings = [];
  const seen = new Set();
  for (const reference of findCredentialReferences(markdown)) {
    if (!credentialsById.has(reference.id)) {
      errors.push(`Unknown credential reference "${reference.id}" on line ${reference.line}`);
    }
    if (seen.has(reference.id)) {
      errors.push(`Duplicate credential reference "${reference.id}" in one role`);
    }
    seen.add(reference.id);
  }
  if (requireComplete) {
    for (const bullet of recommendedCredentialBullets(markdown)) {
      const matches = [...bullet.line.matchAll(CREDENTIAL_MARKER)];
      if (matches.length === 0) {
        errors.push(`Audited credential bullet is missing credential marker: ${bullet.line.trim()}`);
      } else if (matches.length > 1) {
        errors.push(`Audited credential bullet has multiple credential markers: ${bullet.line.trim()}`);
      }
    }
  }
  return { errors, warnings };
}
```

Export the three new functions. Reset `CREDENTIAL_MARKER.lastIndex = 0` before each scan if implementation testing shows the global regular expression retaining state between calls.

- [x] **Step 4: Integrate the registry into `validate-roles.js`**

Import `loadCredentialRegistry` and `validateRoleCredentialReferences`. Add `CREDENTIALS_FILE`, honoring a `CREDENTIALS_FILE` environment override for CLI fixtures. Extend `validateFile` with an optional context and append marker errors/warnings after the existing structural checks:

```javascript
function validateFile(filePath, rolesDir = ROLES_DIR, credentialContext = null) {
  // existing implementation
  if (credentialContext) {
    const credentialResult = validateRoleCredentialReferences(
      content,
      credentialContext.credentialsById,
      { requireComplete: credentialContext.auditedRoles.has(rel) },
    );
    errors.push(...credentialResult.errors);
    warnings.push(...credentialResult.warnings);
  }
  return { rel, errors, warnings, skipped: false };
}
```

In `main()`, load the registry once, print registry errors/warnings under `data/credentials.json`, pass the context to every `validateFile`, include registry warnings in the strict-mode decision, and include registry errors in exit code 1. Do not load the registry at module import time.

- [x] **Step 5: Run focused tests and verify GREEN**

Run: `node --test test/credential-registry.test.js test/validate-roles.test.js`

Expected: PASS with zero failures.

Run: `npm test`

Expected: all tests pass.

Run: `npm run validate`

Expected: exit 0 with the empty valid registry and unchanged legacy role files.

- [x] **Step 6: Commit Task 2**

```bash
git add credentialRegistry.js validate-roles.js test/credential-registry.test.js test/validate-roles.test.js
git commit -m "feat: validate role credential references"
```

### Task 3: Source-backed registry data and Kubernetes audit

**Files:**

- Modify: `data/credentials.json`
- Create: `test/kubernetes-credentials.test.js`
- Modify: `Roles/kubernetes/kubernetes_architect.md`
- Modify: `Roles/kubernetes/kubernetes_engineer.md`
- Modify: `Roles/kubernetes/kubernetes_product_owner.md`
- Modify: `Roles/kubernetes/kubernetes_senior_engineer.md`

**Interfaces:**

- Consumes: the registry schema and role-reference validator from Tasks 1–2.
- Produces: 13 stable credential IDs and four fully audited role files.

- [x] **Step 1: Write the failing Kubernetes pilot integration test**

Create `test/kubernetes-credentials.test.js`:

```javascript
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
```

- [x] **Step 2: Run the pilot test and verify RED**

Run: `node --test test/kubernetes-credentials.test.js`

Expected: FAIL because the registry has no audited roles or credential records.

- [x] **Step 3: Add the verified registry records**

Create `data/credentials.json` with `schema_version: 1`, the exact four `audited_roles`, and these records. Every record uses `status: "active"`, `type: "certification"`, `verified_on: "2026-08-08"`, `owner: "catalogue-maintainers"`, and `review_months: 12`.

| ID | Official name | Issuer | Authoritative URL |
|---|---|---|---|
| `cncf-cka` | Certified Kubernetes Administrator (CKA) | Cloud Native Computing Foundation and The Linux Foundation | `https://www.cncf.io/training/certification/cka/` |
| `cncf-ckad` | Certified Kubernetes Application Developer (CKAD) | Cloud Native Computing Foundation and The Linux Foundation | `https://www.cncf.io/training/certification/ckad/` |
| `cncf-cks` | Certified Kubernetes Security Specialist (CKS) | Cloud Native Computing Foundation and The Linux Foundation | `https://www.cncf.io/training/certification/cks/` |
| `cncf-kcna` | Kubernetes and Cloud Native Associate (KCNA) | Cloud Native Computing Foundation and The Linux Foundation | `https://www.cncf.io/training/certification/kcna/` |
| `cncf-pca` | Prometheus Certified Associate (PCA) | Cloud Native Computing Foundation and The Linux Foundation | `https://www.cncf.io/training/certification/pca/` |
| `cncf-ica` | Istio Certified Associate (ICA) | Cloud Native Computing Foundation and The Linux Foundation | `https://www.cncf.io/training/certification/ica/` |
| `cncf-capa` | Certified Argo Project Associate (CAPA) | Cloud Native Computing Foundation and The Linux Foundation | `https://www.cncf.io/training/certification/capa/` |
| `cncf-cgoa` | GitOps Certified Associate (CGOA) | Cloud Native Computing Foundation and The Linux Foundation | `https://www.cncf.io/training/certification/cgoa/` |
| `hashicorp-terraform-associate` | HashiCorp Certified: Terraform Associate | HashiCorp | `https://developer.hashicorp.com/certifications/infrastructure-automation` |
| `scrumorg-pspo-i` | Professional Scrum Product Owner I (PSPO I) | Scrum.org | `https://www.scrum.org/assessments/professional-scrum-product-owner-i-certification` |
| `finops-certified-practitioner` | FinOps Certified Practitioner | FinOps Foundation | `https://www.finops.org/training-certification/recommended/practitioner/` |
| `opengroup-togaf-ea-practitioner` | TOGAF Enterprise Architecture Practitioner | The Open Group | `https://www.opengroup.org/certifications/togaf` |
| `redhat-openshift-administrator` | Red Hat Certified System Administrator in OpenShift | Red Hat | `https://www.redhat.com/en/services/certification/rhcs-paas` |

This table contains 13 records; keep all 13 because each appears in at least one audited role. Do not add Docker Certified Associate, Kubernetes Fundamentals, generic cloud-provider tracks, or invented architecture/product credentials to the registry.

- [x] **Step 4: Replace the four certification sections with audited content**

Use these exact credential sets, one bullet and one marker per credential:

`kubernetes_architect.md`:

```markdown
**Core Certifications:**

- Certified Kubernetes Administrator (CKA) <!-- credential: cncf-cka -->
- Certified Kubernetes Security Specialist (CKS) <!-- credential: cncf-cks -->
- TOGAF Enterprise Architecture Practitioner <!-- credential: opengroup-togaf-ea-practitioner -->

**Complementary Certifications:**

- HashiCorp Certified: Terraform Associate <!-- credential: hashicorp-terraform-associate -->
- Red Hat Certified System Administrator in OpenShift <!-- credential: redhat-openshift-administrator -->
- Istio Certified Associate (ICA) <!-- credential: cncf-ica -->
- GitOps Certified Associate (CGOA) <!-- credential: cncf-cgoa -->
```

`kubernetes_engineer.md`:

```markdown
**Core Certifications:**

- Certified Kubernetes Administrator (CKA) <!-- credential: cncf-cka -->
- Certified Kubernetes Application Developer (CKAD) <!-- credential: cncf-ckad -->

**Complementary Certifications:**

- Kubernetes and Cloud Native Associate (KCNA) <!-- credential: cncf-kcna -->
- Prometheus Certified Associate (PCA) <!-- credential: cncf-pca -->
- Certified Argo Project Associate (CAPA) <!-- credential: cncf-capa -->
- HashiCorp Certified: Terraform Associate <!-- credential: hashicorp-terraform-associate -->
```

`kubernetes_product_owner.md`:

```markdown
**Core Certifications:**

- Professional Scrum Product Owner I (PSPO I) <!-- credential: scrumorg-pspo-i -->
- Kubernetes and Cloud Native Associate (KCNA) <!-- credential: cncf-kcna -->

**Complementary Certifications:**

- FinOps Certified Practitioner <!-- credential: finops-certified-practitioner -->
```

`kubernetes_senior_engineer.md`:

```markdown
**Core Certifications:**

- Certified Kubernetes Administrator (CKA) <!-- credential: cncf-cka -->
- Certified Kubernetes Application Developer (CKAD) <!-- credential: cncf-ckad -->
- Certified Kubernetes Security Specialist (CKS) <!-- credential: cncf-cks -->

**Complementary Certifications:**

- HashiCorp Certified: Terraform Associate <!-- credential: hashicorp-terraform-associate -->
- Red Hat Certified System Administrator in OpenShift <!-- credential: redhat-openshift-administrator -->
- Istio Certified Associate (ICA) <!-- credential: cncf-ica -->
- Prometheus Certified Associate (PCA) <!-- credential: cncf-pca -->
- Certified Argo Project Associate (CAPA) <!-- credential: cncf-capa -->
- GitOps Certified Associate (CGOA) <!-- credential: cncf-cgoa -->
```

Retain each existing `Learning Resources and Communities` subsection. Move only genuine courses or reading suggestions there when the existing text is specific and useful; remove generic pseudo-credentials rather than relabeling them as authoritative learning resources.

- [x] **Step 5: Run pilot, validator, and full tests**

Run: `node --test test/kubernetes-credentials.test.js`

Expected: PASS with zero failures.

Run: `npm run validate`

Expected: exit 0; registry has zero errors and no stale warnings; all four audited roles have zero credential-reference errors.

Run: `npm test`

Expected: all tests pass.

- [x] **Step 6: Commit Task 3**

```bash
git add data/credentials.json test/kubernetes-credentials.test.js Roles/kubernetes
git commit -m "docs: audit kubernetes credentials"
```

### Task 4: Ownership, contribution guidance, and rollout tracking

**Files:**

- Create: `docs/CREDENTIAL_REGISTRY.md`
- Modify: `CONTRIBUTING.md`
- Modify: `README.md`
- Modify: `docs/role_template.md`

**Interfaces:**

- Consumes: schema and marker syntax from Tasks 1–3.
- Produces: contributor-facing ownership and lifecycle policy plus a GitHub follow-up for the remaining domains.

- [x] **Step 1: Write the credential governance document**

Create `docs/CREDENTIAL_REGISTRY.md` with these sections and decisions:

- **Purpose and audit boundary:** registry-backed items are verified; unmarked legacy text is not yet audited.
- **Schema:** document every top-level and credential field, allowed values, the 12-month default, and stable-ID policy.
- **Authoritative evidence:** issuer-controlled pages only; verification date is the day the page was checked.
- **Ownership:** `catalogue-maintainers` owns registry freshness until a durable domain team is named.
- **Adding or changing a credential:** issue-first, source link, exact official name/type/status, marker, tests, and verification date.
- **Lifecycle:** retain retired/superseded records while references exist; update role recommendations deliberately.
- **Staleness:** warnings begin after `verified_on + review_months`; no runtime network request.
- **Courses and organisation programmes:** keep courses under learning resources; never represent KCSP-like programmes as individual credentials.
- **Rollout:** inventory strings, group aliases, audit by bounded domain batches, migrate markers, and track unaudited domains in GitHub.

- [x] **Step 2: Link the policy from contributor and repository guidance**

In `CONTRIBUTING.md`, link `docs/CREDENTIAL_REGISTRY.md` from the credential evidence row and require registry ID, authoritative URL, verification date, and validator output in credential PRs.

In `README.md`, add the credential registry to the governance table and expand the validation description to include registry structure, unknown/duplicate references, audited-role completeness, and stale warnings.

In `docs/role_template.md`, add a concise note above the certification example:

```markdown
> For a registry-audited role, use the official credential name followed by
> `<!-- credential: stable-id -->`. Keep courses and communities under learning
> resources. See [Credential Registry](CREDENTIAL_REGISTRY.md).
```

- [x] **Step 3: Create the catalogue rollout follow-up issue**

Create one assigned, milestone-bound issue titled `Roll out credential registry references across the remaining role domains` with labels `documentation`, `maintenance`, and `P2`, milestone `Catalogue Trust & Adoption`, and this acceptance contract:

```markdown
## Acceptance criteria

- [ ] Unique legacy credential strings are inventoried and grouped into aliases.
- [ ] Remaining domains are split into bounded native sub-issues before migration.
- [ ] Every migrated credential has an issuer-controlled source and verification date.
- [ ] Every migrated role recommendation uses a known registry ID.
- [ ] Courses and organisation programmes are not presented as individual credentials.
- [ ] `audited_roles` lists each completed role and validation rejects new unmarked recommendations in it.
- [ ] `npm test` and `npm run validate` pass after every batch.
```

Reference issue #178 as the completed Kubernetes pilot. Do not close this rollout issue until its own criteria pass.

- [x] **Step 4: Verify documentation and links**

Run: `npx --yes markdownlint-cli2@0.18.1 "**/*.md" "#node_modules" "#.superpowers/sdd"`

Expected: zero Markdown lint errors.

Run: `rg -n "CREDENTIAL_REGISTRY|credential: stable-id|catalogue-maintainers" README.md CONTRIBUTING.md docs/role_template.md docs/CREDENTIAL_REGISTRY.md`

Expected: all four files contain the intended policy link or example.

- [x] **Step 5: Commit Task 4**

```bash
git add docs/CREDENTIAL_REGISTRY.md CONTRIBUTING.md README.md docs/role_template.md
git commit -m "docs: govern credential recommendations"
```

### Task 5: Full verification, issue evidence, and publication

**Files:**

- Modify: `docs/superpowers/plans/2026-08-08-credential-registry-kubernetes-pilot.md` only to check completed execution steps and record actual command results.

**Interfaces:**

- Consumes: every deliverable and test from Tasks 1–4.
- Produces: a pushed branch, reviewable PR, and criterion-level completion evidence for issue #178.

- [x] **Step 1: Run the complete local verification gate**

Run each command separately and retain its exact result:

```bash
node --test test/credential-registry.test.js test/kubernetes-credentials.test.js test/validate-roles.test.js
npm test
npm run validate
npm run check-counts
npm run verify-vendor
npx --yes markdownlint-cli2@0.18.1 "**/*.md" "#node_modules" "#.superpowers/sdd"
git diff --check
```

Expected: every command exits 0. `npm run validate` may report pre-existing non-credential warnings but reports zero errors, zero stale credential warnings, and no audited-role marker gaps.

- [x] **Step 2: Review the complete diff against the approved design**

Confirm explicitly:

- all four and only the four Kubernetes roles are in `audited_roles`;
- all 13 registry records have issuer-controlled HTTPS sources and `2026-08-08` verification dates;
- KCSP and every other organisation programme are absent from individual recommendations;
- all audited recommendation bullets contain exactly one known marker;
- legacy domains remain allowed and visibly unaudited;
- stale references warn and unknown references fail;
- documentation names ownership and the remaining-domain rollout issue exists.

#### Task 5 local verification evidence (2026-08-08)

All commands were run separately on `codex/178-credential-registry` and exited 0:

- `node --test test/credential-registry.test.js test/kubernetes-credentials.test.js test/validate-roles.test.js`: 72 tests, 72 passed, 0 failed, 0 skipped, 0 todo after the final review fixes.
- `npm test`: 272 tests, 272 passed, 0 failed, 0 skipped, 0 todo after the final review fixes.
- `npm run validate`: checked 227 role files, skipped 1 reference document, found 0 files with errors, 199 files with pre-existing KPI warnings, and 0 duplicate titles. No stale credential warnings or audited-role marker gaps were reported.
- `npm run check-counts`: 226 roles, 34 domains, and 7 chapters; README counts match.
- `npm run verify-vendor`: vendored dependency manifest and checksums verified.
- `npx --yes markdownlint-cli2@0.18.1 "**/*.md" "#node_modules" "#.superpowers/sdd"`: linted 275 CI-visible Markdown files with 0 errors.
- `git diff --check`: no whitespace errors.

The original local lint glob also traversed git-ignored `node_modules/` and self-ignored `.superpowers/sdd/` orchestration artifacts, which are absent from CI. The corrected command excludes both ignored trees and matches the 275-file CI-visible scope.

The design review confirmed:

- `audited_roles` contains exactly the four Kubernetes architect, engineer, product owner, and senior engineer paths.
- All 13 registry records use HTTPS issuer-controlled domains, carry `verified_on: 2026-08-08`, and are owned by `catalogue-maintainers`.
- The four audited recommendation sections contain no KCSP or other organisation-programme recommendations.
- Architect, engineer, product owner, and senior engineer contain 7, 6, 3, and 9 markers respectively; every recommendation bullet has exactly one known marker and all four files validate with zero credential errors.
- Legacy unmarked recommendations remain allowed by validation and are explicitly described as unaudited in `docs/CREDENTIAL_REGISTRY.md`.
- Focused tests prove stale entries warn, unknown references fail, and malformed marker syntax fails.
- `docs/CREDENTIAL_REGISTRY.md` names `catalogue-maintainers` ownership and links the remaining-domain rollout tracker, issue #210, in both the audit-boundary and rollout sections. The controller separately verified the external issue state.

The final whole-branch review found two boundary defects. Commit `91ed3db`
fixed both with RED/GREEN regression coverage: audited completeness now accepts
the canonical ampersand learning heading and all Markdown unordered-list
markers, while credential review dates now use UTC date-only comparison and
clamped calendar-month arithmetic. The scoped re-review found both findings
addressed with no new Critical or Important breakage.

- [ ] **Step 3: Commit the verification record and push**

Update this plan's checkboxes and add the actual verification totals beneath this task. Then:

```bash
git add docs/superpowers/plans/2026-08-08-credential-registry-kubernetes-pilot.md
git commit -m "docs: record credential pilot verification"
git push -u origin codex/178-credential-registry
```

- [ ] **Step 4: Reconcile issue #178 acceptance criteria before closure**

Add a completion comment mapping each issue criterion to concrete evidence: registry documentation, four audited role paths, the KCSP removal test, all registry URLs/dates, validator tests/output, and the rollout issue.

Use `gh issue edit 178 --body-file <newline-preserving-file>` to check a criterion only after its evidence is confirmed. If any criterion lacks evidence, leave it unchecked and keep the PR body at `Refs #178`.

- [ ] **Step 5: Open the pull request without bypassing the closure gate**

Create a ready PR titled `feat: add credential registry and Kubernetes pilot`. Its body includes:

- summary of registry, validation, audited roles, and governance;
- authoritative source list;
- removed/reclassified recommendation summary;
- exact verification commands and results;
- rollout issue link; and
- `Closes #178` only if every acceptance criterion has already been evidenced and checked, otherwise `Refs #178`.

Wait for every CI leg. Do not merge until the maintainer explicitly approves and `github-hygiene` confirms the issue closure gate still passes.
