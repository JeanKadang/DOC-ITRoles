# Credential Registry Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make malformed credential-registry shapes fail safely and prove the registry CLI exit-code contract with spawned-process tests.

**Architecture:** Keep `credentialRegistry.js` responsible for pure schema validation and index construction. Normalize a malformed `audited_roles` field to an empty iterable after recording its structured error, while allowing independent credential validation to continue. Exercise CLI behavior only through the existing `CREDENTIALS_FILE` environment override and `validate-roles.js` entry point.

**Tech Stack:** Node.js CommonJS, built-in `node:test`, `node:assert/strict`, `node:child_process`, and filesystem-backed temporary fixtures.

## Global Constraints

- Do not change the credential registry schema, marker syntax, or CLI interface.
- Preserve behavior for valid registries.
- Return structured validation errors instead of throwing for malformed `audited_roles` values.
- Continue validating the independent `credentials` array after an `audited_roles` type error.
- Add no dependencies and perform no network access.
- Do not run local Firefox or any browser test for this issue.

---

### Task 1: Make `audited_roles` validation non-throwing

**Files:**
- Modify: `credentialRegistry.js:43-63`
- Test: `test/credential-registry.test.js`

**Interfaces:**
- Consumes: `validateCredentialRegistry(value, now = new Date())` and the existing `{ errors, warnings, credentialsById, auditedRoles }` result shape.
- Produces: The same result shape, with an empty `auditedRoles` set and a structured error for every non-array `audited_roles` value; independent valid credentials remain indexed.

- [x] **Step 1: Write the failing malformed-shape test**

Add after the valid-registry test in `test/credential-registry.test.js`:

```js
for (const [label, auditedRoles] of [
  ['object', {}],
  ['number', 42],
  ['string', 'Roles/kubernetes/kubernetes_engineer.md'],
  ['boolean', true],
  ['null', null],
]) {
  test(`a ${label} audited_roles value returns a structured error`, () => {
    const registry = validRegistry();
    registry.audited_roles = auditedRoles;

    let result;
    assert.doesNotThrow(() => {
      result = validateCredentialRegistry(registry, NOW);
    });
    assert.ok(result.errors.some(error => /audited_roles must be an array/i.test(error)));
    assert.deepEqual([...result.auditedRoles], []);
    assert.ok(result.credentialsById.has('cncf-cka'),
      'independent credential validation should continue');
  });
}
```

- [x] **Step 2: Run the focused test and confirm the original defect**

Run: `node --test test/credential-registry.test.js`

Expected: FAIL for at least the truthy non-iterable values because the current loop iterates `value.audited_roles || []`.

- [x] **Step 3: Normalize the collection after recording the error**

In `validateCredentialRegistry()`, replace the direct check and loop source with:

```js
  const auditedRoles = Array.isArray(value.audited_roles) ? value.audited_roles : [];
  if (!Array.isArray(value.audited_roles)) result.errors.push('audited_roles must be an array');
```

Then iterate the normalized local value:

```js
  for (const role of auditedRoles) {
```

Do not change the existing non-array `credentials` early return.

- [x] **Step 4: Run the focused credential-registry tests**

Run: `node --test test/credential-registry.test.js`

Expected: PASS; all malformed-shape cases return normally, report the structured error, keep `auditedRoles` empty, and still index the valid credential.

- [x] **Step 5: Commit the validator hardening**

```bash
git add credentialRegistry.js test/credential-registry.test.js
git commit -m "fix: harden audited role validation"
```

---

### Task 2: Prove registry CLI exit codes

**Files:**
- Test: `test/validate-roles.test.js`

**Interfaces:**
- Consumes: `runCli(rolesDir, args = [], env = {})`, the `CREDENTIALS_FILE` environment override, and the current normal/strict exit-code rules in `validate-roles.js`.
- Produces: Spawned-process regression coverage for invalid-registry errors and stale-registry warnings without changing production CLI behavior.

- [x] **Step 1: Add an invalid-registry spawned CLI test**

Add near the existing credential CLI test in `test/validate-roles.test.js`:

```js
test('CLI exits 1 and identifies an invalid credential registry', () => {
  const cliRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'roles-cli-invalid-registry-'));
  const credentialsFile = path.join(cliRoot, 'credentials.json');
  fs.mkdirSync(path.join(cliRoot, 'testdomain'));
  fs.writeFileSync(path.join(cliRoot, 'testdomain', 'ok.md'),
    completeRole({ transform: c => c.replace('# Test Role', '# Ok Role') }));
  fs.writeFileSync(credentialsFile, JSON.stringify({
    schema_version: 1,
    audited_roles: {},
    credentials: [],
  }));

  const run = runCli(cliRoot, [], { CREDENTIALS_FILE: credentialsFile });
  assert.equal(run.status, 1, run.stdout);
  assert.match(run.stdout, /credentials\.json/i);
  assert.match(run.stdout, /audited_roles must be an array/i);
  fs.rmSync(cliRoot, { recursive: true, force: true });
});
```

- [x] **Step 2: Add normal and strict stale-registry CLI assertions**

Add a second spawned-process test:

```js
test('CLI stale registry warnings exit 0 normally and 1 with --strict', () => {
  const cliRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'roles-cli-stale-registry-'));
  const credentialsFile = path.join(cliRoot, 'credentials.json');
  fs.mkdirSync(path.join(cliRoot, 'testdomain'));
  fs.writeFileSync(path.join(cliRoot, 'testdomain', 'ok.md'),
    completeRole({ transform: c => c.replace('# Test Role', '# Ok Role') }));
  fs.writeFileSync(credentialsFile, JSON.stringify({
    schema_version: 1,
    audited_roles: [],
    credentials: [{
      id: 'example-certification',
      name: 'Example Certification',
      issuer: 'Example Issuer',
      type: 'certification',
      url: 'https://example.com/certification',
      status: 'active',
      verified_on: '2020-01-01',
      owner: 'catalogue-maintainers',
      review_months: 12,
    }],
  }));

  const normal = runCli(cliRoot, [], { CREDENTIALS_FILE: credentialsFile });
  assert.equal(normal.status, 0, normal.stdout);
  assert.match(normal.stdout, /example-certification.*stale/i);

  const strict = runCli(cliRoot, ['--strict'], { CREDENTIALS_FILE: credentialsFile });
  assert.equal(strict.status, 1, strict.stdout);
  assert.match(strict.stdout, /example-certification.*stale/i);
  fs.rmSync(cliRoot, { recursive: true, force: true });
});
```

- [x] **Step 3: Run the focused CLI tests**

Run: `node --test test/validate-roles.test.js`

Expected: PASS. The invalid registry exits 1 with its field error; the stale registry exits 0 normally and 1 with `--strict`.

- [x] **Step 4: Commit the CLI regression coverage**

```bash
git add test/validate-roles.test.js
git commit -m "test: cover registry CLI exit codes"
```

---

### Task 3: Verify issue #212 as a whole

**Files:**
- Modify only if execution evidence is recorded: `docs/superpowers/plans/2026-08-08-credential-registry-hardening.md`

**Interfaces:**
- Consumes: The completed validator and CLI tests from Tasks 1 and 2.
- Produces: Reproducible local evidence for every code-level acceptance criterion in issue #212.

- [x] **Step 1: Run all focused registry and validator tests**

Run:

```bash
node --test test/credential-registry.test.js test/kubernetes-credentials.test.js test/validate-roles.test.js
```

Expected: exit 0 with no failed tests.

- [x] **Step 2: Run the full Node test suite**

Run: `npm test`

Expected: exit 0 with every test passing.

- [x] **Step 3: Run repository validation**

Run: `npm run validate`

Expected: exit 0 with zero files containing errors. Existing non-strict KPI warnings may remain and do not fail validation.

- [x] **Step 4: Check diff and worktree scope**

Run:

```bash
git diff --check
git status --short
git diff main...HEAD -- credentialRegistry.js test/credential-registry.test.js test/validate-roles.test.js docs/superpowers/specs/2026-08-08-credential-registry-hardening-design.md docs/superpowers/plans/2026-08-08-credential-registry-hardening.md
```

Expected: no whitespace errors; only issue #212 implementation, test, design, and plan files are included. The pre-existing untracked `.claude/settings.local.json` remains untouched and unstaged.

- [x] **Step 5: Record verification evidence and commit the completed plan**

Append the actual command results under a `## Verification evidence` section,
check only steps demonstrated by the recorded output, then commit:

```bash
git add docs/superpowers/plans/2026-08-08-credential-registry-hardening.md
git commit -m "docs: record registry hardening evidence"
```

## Verification evidence

Executed on 2026-08-08 in the isolated issue #212 worktree. No browser or
Firefox check was run.

1. `node --test test/credential-registry.test.js test/kubernetes-credentials.test.js test/validate-roles.test.js`
   exited `0`: `79` tests passed, `0` failed, `0` skipped, duration `867.8424 ms`.
2. `npm test` exited `0`: `279` tests passed, `0` failed, `0` skipped, duration
   `1758.3867 ms`.
3. `npm run validate` exited `0`: checked `227` role files (`1` reference doc
   skipped), with `0 file(s) with errors`, `199 file(s) with warnings`, and
   `0 duplicate title(s)`. The warnings were non-strict KPI target/proposed-target
   warnings.
4. `git diff --check` exited `0` with no output (no whitespace errors).
   `git status --short` exited `0` with no status entries; Git emitted only
   permission warnings while reading the global ignore file. The scoped
   `git diff main...HEAD -- credentialRegistry.js test/credential-registry.test.js
   test/validate-roles.test.js docs/superpowers/specs/2026-08-08-credential-registry-hardening-design.md
   docs/superpowers/plans/2026-08-08-credential-registry-hardening.md` exited
   `0` and showed only the issue #212 validator, focused-test, design, and plan
   changes. Follow-up scope evidence: `git diff --name-only main...HEAD` exited
   `0` and printed exactly `credentialRegistry.js`,
   `docs/superpowers/plans/2026-08-08-credential-registry-hardening.md`,
   `docs/superpowers/specs/2026-08-08-credential-registry-hardening-design.md`,
   `test/credential-registry.test.js`, and `test/validate-roles.test.js`.
   The primary checkout was confirmed on `main`; the exact temporary
   safe-directory status command,
   `git -c safe.directory='C:/Claude/Projects/DOC-ITRoles' -C C:\\Claude\\Projects\\DOC-ITRoles status --short`,
   exited `0` and
   printed `?? .claude/settings.local.json` (in addition to two global-ignore
   permission warnings). This proves that pre-existing file remains untracked
   and unstaged in the primary checkout.
