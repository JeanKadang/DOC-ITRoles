# Relationship Validation and Viewer Enforcement (#270) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Read the ADR-0006 annotation syntax back into structured data with
one shared parser, use it to catch unresolved IDs/self-references/cycles/
contradictory reporting pairs in `validate-roles.js`, and route the viewer's
relationship displays (reporting chips, career stepper, interactions table)
through that same parsed model instead of fuzzy title matching.

**Architecture:** One new read-side function, `parseRelationshipField`,
added to `scripts/lib/relationship-annotations.js` (the same canonical
module #269 built for writing annotations) and mirrored into
`viewer-logic.js` the same way `stripAnnotations` already is — pure regex
extraction, no dependency on a role index to parse. `validate-roles.js`
builds a catalogue-wide `roleId → role` index and uses the parser to find
what title-matching never could. `index.html` resolves annotated targets by
`roleId` first, falling back to today's title heuristic only for
unannotated legacy text.

**Tech Stack:** Node.js (`node:fs`, `node:path`, `node:test`,
`node:assert/strict`), Playwright for browser journeys — matches every
existing script and test in the repo. Zero new dependencies.

## Global Constraints

- No new dependencies (repo's `package.json` has `"dependencies": {}`).
- The parser never guesses: `kind: 'legacy'` for anything unannotated,
  `kind: 'invalid'` for anything that violates ADR-0006's syntax — never a
  fuzzy resolution.
- `viewer-logic.js` cannot `require()` — `index.html` loads it via a plain
  `<script>` tag with no bundler. Any logic shared between Node and the
  browser needs the documented, test-enforced mirror pattern already
  established for `stripAnnotations` (`viewer-logic.js`, `test/viewer-logic.test.js`).
- A `one-of` group's options resolve independently — a group is not
  "resolved" or "legacy" as a whole; each option carries its own kind.
- New tests go in top-level `test/*.test.js` files only —
  `scripts/run-node-tests.js` does not recurse into subdirectories.
- The domain-level "graph" panel, career sankey, and `buildOrgTree` are out
  of scope (see the spec's Non-goals) — do not modify
  `parseInteractions`, `buildCareerSankey`, `parseProgressionLadders`,
  `parseMobilityPaths`, or `buildOrgTree`.

---

### Task 1: `parseRelationshipField` — the shared read-side parser

**Files:**

- Modify: `scripts/lib/relationship-annotations.js`
- Test: `test/relationship-annotations.test.js`

**Interfaces:**

- Produces: `parseRelationshipField(fieldText: string): Entry[]`, where
  `Entry` is one of:
  - `{ kind: 'catalogue', roleId: string, label: string }`
  - `{ kind: 'external', label: string }`
  - `{ kind: 'one-of', options: Entry[] }` (options are always `catalogue`
    or `external`, never `legacy`/`invalid`/nested `one-of`)
  - `{ kind: 'legacy', text: string }`
  - `{ kind: 'invalid', reason: string, text: string }`

- [ ] **Step 1: Write the failing tests**

```javascript
// append to test/relationship-annotations.test.js
const { parseRelationshipField } = require('../scripts/lib/relationship-annotations.js');

test('parseRelationshipField resolves a single catalogue target', () => {
  const entries = parseRelationshipField('Cloud Platform Architect <!-- role: cloud-platform-architect -->');
  assert.deepEqual(entries, [{ kind: 'catalogue', roleId: 'cloud-platform-architect', label: 'Cloud Platform Architect' }]);
});

test('parseRelationshipField resolves an external target', () => {
  const entries = parseRelationshipField('Board of Directors <!-- external-role -->');
  assert.deepEqual(entries, [{ kind: 'external', label: 'Board of Directors' }]);
});

test('parseRelationshipField resolves a one-of group', () => {
  const entries = parseRelationshipField(
    '<!-- one-of -->DevOps Senior Engineer <!-- role: devops-senior-engineer --> or DevOps Architect <!-- role: devops-architect --><!-- /one-of -->'
  );
  assert.deepEqual(entries, [{
    kind: 'one-of',
    options: [
      { kind: 'catalogue', roleId: 'devops-senior-engineer', label: 'DevOps Senior Engineer' },
      { kind: 'catalogue', roleId: 'devops-architect', label: 'DevOps Architect' },
    ],
  }]);
});

test('parseRelationshipField resolves a one-of group of external options', () => {
  const entries = parseRelationshipField(
    '<!-- one-of -->Chief Data Officer (CDO) <!-- external-role --> or Chief AI Officer <!-- external-role --><!-- /one-of -->'
  );
  assert.deepEqual(entries, [{
    kind: 'one-of',
    options: [
      { kind: 'external', label: 'Chief Data Officer (CDO)' },
      { kind: 'external', label: 'Chief AI Officer' },
    ],
  }]);
});

test('parseRelationshipField returns an empty array for the None sentinel, plain or parenthesised', () => {
  assert.deepEqual(parseRelationshipField('None'), []);
  assert.deepEqual(parseRelationshipField('None (sets technical direction; formal line management sits with the Chapter Lead)'), []);
  assert.deepEqual(parseRelationshipField(''), []);
  assert.deepEqual(parseRelationshipField(null), []);
});

test('parseRelationshipField splits simultaneous targets on top-level semicolons', () => {
  const entries = parseRelationshipField('CFO <!-- role: chief-financial-officer -->; CISO <!-- role: chief-information-security-officer -->');
  assert.deepEqual(entries, [
    { kind: 'catalogue', roleId: 'chief-financial-officer', label: 'CFO' },
    { kind: 'catalogue', roleId: 'chief-information-security-officer', label: 'CISO' },
  ]);
});

test('parseRelationshipField returns legacy for unannotated text', () => {
  assert.deepEqual(parseRelationshipField('Some Drifted Title'), [{ kind: 'legacy', text: 'Some Drifted Title' }]);
});

test('parseRelationshipField flags a target with both role and external-role annotations as invalid', () => {
  const entries = parseRelationshipField('X <!-- role: x --><!-- external-role -->');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags an annotation with no visible label as invalid', () => {
  const entries = parseRelationshipField('<!-- role: x -->');
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags an unclosed one-of as invalid', () => {
  const entries = parseRelationshipField('<!-- one-of -->A <!-- role: a --> or B <!-- role: b -->');
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags a nested one-of as invalid', () => {
  const entries = parseRelationshipField(
    '<!-- one-of -->A <!-- role: a --><!-- one-of -->B <!-- role: b --><!-- /one-of --><!-- /one-of -->'
  );
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags a one-of with fewer than two options as invalid', () => {
  const entries = parseRelationshipField('<!-- one-of -->A <!-- role: a --><!-- /one-of -->');
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags a one-of containing an unannotated option as invalid', () => {
  const entries = parseRelationshipField('<!-- one-of -->A <!-- role: a --> or B<!-- /one-of -->');
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags None combined with another target as invalid', () => {
  const entries = parseRelationshipField('None; Cloud Architect <!-- role: cloud-architect -->');
  assert.equal(entries[0].kind, 'invalid');
  assert.equal(entries[1].kind, 'catalogue');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test test/relationship-annotations.test.js`
Expected: FAIL — `parseRelationshipField is not a function`

- [ ] **Step 3: Write the implementation**

```javascript
// append to scripts/lib/relationship-annotations.js, before module.exports

// Reads the ADR-0006 annotation syntax back into structured data — the
// counterpart to annotateField's writing side. Pure extraction: the role
// ID is already embedded in the text, so this needs no roleIndex to parse,
// which is what makes it small and safe enough to mirror into the browser
// (see the equivalent function in viewer-logic.js).
function parseSingleTarget(segment) {
  const markerCount = (segment.match(/<!--\s*(role:|external-role)/gi) || []).length;
  if (markerCount > 1) {
    return { kind: 'invalid', reason: 'a label carries more than one target annotation', text: segment };
  }

  const roleMatch = segment.match(/^(.*?)\s*<!--\s*role:\s*([a-z0-9][a-z0-9-]*)\s*-->\s*$/);
  if (roleMatch) {
    const label = roleMatch[1].trim();
    if (!label) return { kind: 'invalid', reason: 'annotation has no visible label', text: segment };
    return { kind: 'catalogue', roleId: roleMatch[2], label };
  }

  const externalMatch = segment.match(/^(.*?)\s*<!--\s*external-role\s*-->\s*$/);
  if (externalMatch) {
    const label = externalMatch[1].trim();
    if (!label) return { kind: 'invalid', reason: 'annotation has no visible label', text: segment };
    return { kind: 'external', label };
  }

  return { kind: 'legacy', text: segment };
}

function parseOneOf(segment) {
  const closed = segment.match(/^<!--\s*one-of\s*-->([\s\S]*)<!--\s*\/one-of\s*-->$/);
  if (!closed) {
    if (/<!--\s*one-of\s*-->|<!--\s*\/one-of\s*-->/.test(segment)) {
      return { kind: 'invalid', reason: 'unclosed one-of wrapper', text: segment };
    }
    return null; // not a one-of at all — caller tries a single target instead
  }

  const inner = closed[1];
  if (/<!--\s*one-of\s*-->|<!--\s*\/one-of\s*-->/.test(inner)) {
    return { kind: 'invalid', reason: 'nested one-of wrapper', text: segment };
  }

  const options = inner.split(/,|\bor\b/i).map(s => s.trim()).filter(Boolean).map(parseSingleTarget);
  if (options.length < 2) {
    return { kind: 'invalid', reason: 'one-of has fewer than two options', text: segment };
  }
  if (options.some(o => o.kind === 'invalid' || o.kind === 'legacy')) {
    return { kind: 'invalid', reason: 'one-of contains an unannotated or invalid option', text: segment };
  }
  return { kind: 'one-of', options };
}

function parseSegment(segment) {
  const oneOf = parseOneOf(segment);
  if (oneOf) return oneOf;
  return parseSingleTarget(segment);
}

function parseRelationshipField(fieldText) {
  const text = String(fieldText == null ? '' : fieldText).trim();
  if (!text) return [];

  const segments = text.split(';').map(s => s.trim()).filter(Boolean);

  // The whole field is the empty-relationship sentinel, optionally with a
  // parenthetical explanation (matches annotateField's None handling).
  if (segments.length === 1 && /^none\s*(\(.*\))?$/i.test(segments[0])) return [];

  return segments.map(seg => {
    if (/^none\b/i.test(seg) && !/<!--/.test(seg)) {
      return { kind: 'invalid', reason: 'None combined with another target', text: seg };
    }
    return parseSegment(seg);
  });
}
```

Update the final `module.exports` line to add `parseRelationshipField`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test test/relationship-annotations.test.js`
Expected: PASS (all tests, including every test from earlier tasks in the
#269 migration plan)

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/relationship-annotations.js test/relationship-annotations.test.js
git commit -m "feat: add parseRelationshipField, the shared read-side annotation parser (#270)"
```

---

### Task 2: Catalogue-wide relationship validation

**Files:**

- Modify: `validate-roles.js`
- Test: `test/validate-roles.test.js`

**Interfaces:**

- Consumes: `parseRelationshipField` from Task 1; `loadRoles` from
  `scripts/audit-relationship-terms.js` (already exists — returns
  `[{ file, title, roleId, fields: { reportsTo, directReports,
  careerBullets: string[], interactionRoles: string[] } }]` for every role
  under a directory).
- Produces: `findRelationshipIssues(rolesDir?: string): { errors:
  {file, field, message}[], warnings: {file, field, message}[] }`.

- [ ] **Step 1: Write the failing tests**

```javascript
// append to test/validate-roles.test.js
const { findRelationshipIssues } = require('../validate-roles');

function relRole(dir, filename, { title, roleId, reportsTo = 'None', directReports = 'None' }) {
  fs.writeFileSync(path.join(dir, filename), [
    `# ${title}`,
    '',
    '| Field | Value |',
    '|---|---|',
    `| **Role ID** | \`${roleId}\` |`,
    `| **Reports To** | ${reportsTo} |`,
    `| **Direct Reports** | ${directReports} |`,
    '',
  ].join('\n'));
}

function relTree() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'roles-relationships-'));
  fs.mkdirSync(path.join(root, 'testdomain'));
  return { root, dir: path.join(root, 'testdomain') };
}

test('findRelationshipIssues flags a Reports To that references an unknown role ID', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', { title: 'A', roleId: 'a', reportsTo: 'Ghost Role <!-- role: ghost-role -->' });
  const { errors } = findRelationshipIssues(root);
  assert.ok(errors.some(e => e.field === 'Reports To' && /unknown role ID "ghost-role"/.test(e.message)));
  fs.rmSync(root, { recursive: true, force: true });
});

// Deletion-failure: a role is removed while another still references its ID.
test('a role file removed after another annotated a reference to it becomes an unresolved-ID error', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', { title: 'A', roleId: 'a', reportsTo: 'B <!-- role: b -->' });
  relRole(dir, 'b.md', { title: 'B', roleId: 'b' });
  assert.deepEqual(findRelationshipIssues(root).errors, []);
  fs.rmSync(path.join(dir, 'b.md'));
  const { errors } = findRelationshipIssues(root);
  assert.ok(errors.some(e => /unknown role ID "b"/.test(e.message)));
  fs.rmSync(root, { recursive: true, force: true });
});

test('findRelationshipIssues flags a role reporting to itself', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', { title: 'A', roleId: 'a', reportsTo: 'A <!-- role: a -->' });
  const { errors } = findRelationshipIssues(root);
  assert.ok(errors.some(e => e.field === 'Reports To' && /reports to itself/.test(e.message)));
  fs.rmSync(root, { recursive: true, force: true });
});

test('findRelationshipIssues detects a 2-role reporting cycle', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', { title: 'A', roleId: 'a', reportsTo: 'B <!-- role: b -->' });
  relRole(dir, 'b.md', { title: 'B', roleId: 'b', reportsTo: 'A <!-- role: a -->' });
  const { errors } = findRelationshipIssues(root);
  assert.ok(errors.some(e => /reporting cycle/.test(e.message)));
  fs.rmSync(root, { recursive: true, force: true });
});

test('findRelationshipIssues detects a 3-role reporting cycle', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', { title: 'A', roleId: 'a', reportsTo: 'B <!-- role: b -->' });
  relRole(dir, 'b.md', { title: 'B', roleId: 'b', reportsTo: 'C <!-- role: c -->' });
  relRole(dir, 'c.md', { title: 'C', roleId: 'c', reportsTo: 'A <!-- role: a -->' });
  const { errors } = findRelationshipIssues(root);
  assert.ok(errors.some(e => /reporting cycle/.test(e.message)));
  fs.rmSync(root, { recursive: true, force: true });
});

test('findRelationshipIssues does not treat a one-of Reports To as a cycle edge', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', {
    title: 'A', roleId: 'a',
    reportsTo: '<!-- one-of -->B <!-- role: b --> or C <!-- role: c --><!-- /one-of -->',
  });
  relRole(dir, 'b.md', { title: 'B', roleId: 'b', reportsTo: 'A <!-- role: a -->' });
  relRole(dir, 'c.md', { title: 'C', roleId: 'c' });
  const { errors } = findRelationshipIssues(root);
  assert.deepEqual(errors.filter(e => /cycle/.test(e.message)), []);
  fs.rmSync(root, { recursive: true, force: true });
});

test('findRelationshipIssues flags a contradictory pair when both sides are annotated', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', { title: 'A', roleId: 'a', reportsTo: 'P <!-- role: p -->' });
  relRole(dir, 'p.md', { title: 'P', roleId: 'p', directReports: 'Someone Else <!-- role: someone-else -->' });
  relRole(dir, 'someone-else.md', { title: 'Someone Else', roleId: 'someone-else' });
  const { errors } = findRelationshipIssues(root);
  assert.ok(errors.some(e => e.field === 'Direct Reports' && /does not list "A"/.test(e.message)));
  fs.rmSync(root, { recursive: true, force: true });
});

test('findRelationshipIssues accepts a contradictory-looking pair when both sides agree', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', { title: 'A', roleId: 'a', reportsTo: 'P <!-- role: p -->' });
  relRole(dir, 'p.md', { title: 'P', roleId: 'p', directReports: 'A <!-- role: a -->' });
  const { errors } = findRelationshipIssues(root);
  assert.deepEqual(errors.filter(e => e.field === 'Direct Reports'), []);
  fs.rmSync(root, { recursive: true, force: true });
});

// Single-letter titles ('A', 'B', ...) are used everywhere else in this
// file for brevity, but the "mentions the child" check below is a plain
// substring match — a single letter would spuriously match almost any
// prose (e.g. "A" inside "that"). These two tests use a distinctive
// multi-word title so the substring check is actually meaningful.
test('findRelationshipIssues warns (does not error) when a legacy Direct Reports may not document a known child', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', { title: 'Zephyr Quality Engineer', roleId: 'a', reportsTo: 'P <!-- role: p -->' });
  relRole(dir, 'p.md', { title: 'P', roleId: 'p', directReports: 'Some prose that never mentions the child' });
  const { errors, warnings } = findRelationshipIssues(root);
  assert.deepEqual(errors.filter(e => e.field === 'Direct Reports'), []);
  assert.ok(warnings.some(w => w.field === 'Direct Reports' && /may not document "Zephyr Quality Engineer"/.test(w.message)));
  fs.rmSync(root, { recursive: true, force: true });
});

test('findRelationshipIssues does not warn when legacy Direct Reports text mentions the child', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', { title: 'Zephyr Quality Engineer', roleId: 'a', reportsTo: 'P <!-- role: p -->' });
  relRole(dir, 'p.md', { title: 'P', roleId: 'p', directReports: 'Manages several engineers including Zephyr Quality Engineer directly' });
  const { warnings } = findRelationshipIssues(root);
  assert.deepEqual(warnings.filter(w => w.field === 'Direct Reports'), []);
  fs.rmSync(root, { recursive: true, force: true });
});

// Rename-stability: the title changes, the Role ID doesn't — resolution
// still succeeds; the stale annotation label is a warning, not an error.
test('findRelationshipIssues resolves a rename via Role ID and warns about the stale label', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', { title: 'A', roleId: 'a', reportsTo: 'Old Title For P <!-- role: p -->' });
  relRole(dir, 'p.md', { title: 'New Title For P', roleId: 'p' });
  const { errors, warnings } = findRelationshipIssues(root);
  assert.deepEqual(errors, []);
  assert.ok(warnings.some(w => w.field === 'Reports To' && /stale/.test(w.message)));
  fs.rmSync(root, { recursive: true, force: true });
});

test('findRelationshipIssues flags invalid annotation syntax', () => {
  const { root, dir } = relTree();
  relRole(dir, 'a.md', { title: 'A', roleId: 'a', reportsTo: '<!-- role: p -->' });
  const { errors } = findRelationshipIssues(root);
  assert.ok(errors.some(e => /invalid annotation/.test(e.message)));
  fs.rmSync(root, { recursive: true, force: true });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test test/validate-roles.test.js`
Expected: FAIL — `findRelationshipIssues is not a function`

- [ ] **Step 3: Write the implementation**

```javascript
// add near the top of validate-roles.js, alongside the other requires
const { loadRoles } = require('./scripts/audit-relationship-terms.js');
const { parseRelationshipField } = require('./scripts/lib/relationship-annotations.js');
```

```javascript
// append to validate-roles.js, before module.exports

// Flattens a field's top-level entries so a one-of's options are checked
// individually (each option is its own catalogue/external claim) without
// the group itself being mistaken for a single resolvable target.
function flattenRelationshipEntries(entries) {
  const out = [];
  for (const entry of entries) {
    if (entry.kind === 'one-of') out.push(...entry.options);
    else out.push(entry);
  }
  return out;
}

// Catalogue-wide relationship integrity (#270): unresolved catalogue IDs,
// self-references, reporting cycles, contradictory reporting pairs, and
// stale rename labels. Uses only the fields ADR-0006 annotates — Reports
// To, Direct Reports, career-path bullets, and interactions-table cells.
function findRelationshipIssues(rolesDir = ROLES_DIR) {
  const roles = loadRoles(rolesDir).filter(r => r.roleId);
  const byId = new Map(roles.map(r => [r.roleId, r]));
  const errors = [];
  const warnings = [];
  const record = (list, file, field, message) => list.push({ file, field, message });

  const parsedRoles = roles.map(role => ({
    role,
    fields: {
      'Reports To': parseRelationshipField(role.fields.reportsTo || ''),
      'Direct Reports': parseRelationshipField(role.fields.directReports || ''),
      'Career Development Path': (role.fields.careerBullets || []).flatMap(parseRelationshipField),
      'Interactions with Other Roles': (role.fields.interactionRoles || []).flatMap(parseRelationshipField),
    },
  }));

  // Per-role checks: invalid syntax, unresolved IDs, self-reference, stale
  // labels. None of these need cross-role state.
  for (const { role, fields } of parsedRoles) {
    for (const [fieldName, entries] of Object.entries(fields)) {
      for (const entry of flattenRelationshipEntries(entries)) {
        if (entry.kind === 'invalid') {
          record(errors, role.file, fieldName, `invalid annotation (${entry.reason}): "${entry.text}"`);
          continue;
        }
        if (entry.kind !== 'catalogue') continue;

        if (!byId.has(entry.roleId)) {
          record(errors, role.file, fieldName, `references unknown role ID "${entry.roleId}"`);
          continue;
        }
        if (fieldName === 'Reports To' && entry.roleId === role.roleId) {
          record(errors, role.file, fieldName, `reports to itself ("${entry.roleId}")`);
        }
        const target = byId.get(entry.roleId);
        if (target.title !== entry.label) {
          record(warnings, role.file, fieldName,
            `label "${entry.label}" is stale — "${entry.roleId}" is now titled "${target.title}"`);
        }
      }
    }
  }

  // Reporting cycles: an edge exists only for a single, unambiguous
  // catalogue Reports To target. A one-of doesn't commit to one parent, so
  // it can't participate without guessing which option is real.
  const reportsToParent = new Map();
  for (const { role, fields } of parsedRoles) {
    const entries = fields['Reports To'];
    if (entries.length === 1 && entries[0].kind === 'catalogue' && byId.has(entries[0].roleId)) {
      reportsToParent.set(role.roleId, entries[0].roleId);
    }
  }
  for (const startId of reportsToParent.keys()) {
    const seen = new Set([startId]);
    const chain = [startId];
    let current = startId;
    while (reportsToParent.has(current)) {
      current = reportsToParent.get(current);
      if (seen.has(current)) {
        if (current === startId) {
          record(errors, byId.get(startId).file, 'Reports To',
            `reporting cycle: ${[...chain, current].join(' -> ')}`);
        }
        break;
      }
      seen.add(current);
      chain.push(current);
    }
  }

  // Contradictory reporting pairs, checked from each unambiguous Reports To
  // edge. When the parent's Direct Reports is itself annotated, agreement
  // is provable — a disagreement is an error. When it's legacy prose, a
  // provable check isn't possible, so a missing mention is a warning only.
  for (const [childId, parentId] of reportsToParent) {
    const parentRole = byId.get(parentId);
    const parentParsed = parsedRoles.find(p => p.role.roleId === parentId);
    const annotatedIds = parentParsed.fields['Direct Reports']
      .filter(e => e.kind === 'catalogue')
      .map(e => e.roleId);
    const child = byId.get(childId);

    if (annotatedIds.length > 0) {
      if (!annotatedIds.includes(childId)) {
        record(errors, parentRole.file, 'Direct Reports',
          `does not list "${child.title}" (${childId}), who reports to this role`);
      }
      continue;
    }

    const rawDirectReports = String(parentRole.fields.directReports || '').trim();
    if (rawDirectReports && !/^none\b/i.test(rawDirectReports)
        && !rawDirectReports.toLowerCase().includes(child.title.toLowerCase())) {
      record(warnings, parentRole.file, 'Direct Reports',
        `may not document "${child.title}", who reports to this role — verify manually`);
    }
  }

  return { errors, warnings };
}
```

Wire the new check into `main()`, right after the existing duplicate-title/
duplicate-id blocks:

```javascript
// add inside main(), after the duplicateIds block and before the summary
const relationshipIssues = findRelationshipIssues();

for (const e of relationshipIssues.errors) {
  console.log(`\n✖ ${e.file} [${e.field}]: ${e.message}`);
}
for (const w of relationshipIssues.warnings) {
  console.log(`\n⚠ ${w.file} [${w.field}]: ${w.message}`);
}
```

```javascript
// extend the summary block's counts
console.log(`  ${relationshipIssues.errors.length} relationship error(s)`);
console.log(`  ${relationshipIssues.warnings.length} relationship warning(s)`);
```

```javascript
// extend the exit-code condition to include relationship errors, and add
// relationship warnings to the --strict condition
if (withErrors.length > 0 || credentialContext.errors.length > 0 || duplicates.length > 0 || duplicateIds.length > 0 ||
    relationshipIssues.errors.length > 0 ||
    (STRICT && (withWarnings.length > 0 || credentialContext.warnings.length > 0 || relationshipIssues.warnings.length > 0))) {
  process.exitCode = 1;
}
```

Update the final `module.exports` line to add `findRelationshipIssues`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test test/validate-roles.test.js`
Expected: PASS (all tests, existing and new)

- [ ] **Step 5: Commit**

```bash
git add validate-roles.js test/validate-roles.test.js
git commit -m "feat: validate relationship integrity — unresolved IDs, cycles, contradictions (#270)"
```

---

### Task 3: Pass `roleId` through to the viewer

**Files:**

- Modify: `server.js:73-85`
- Test: `test/server.test.js`

**Interfaces:**

- Produces: each role object in `getRoles()`'s `domains[x].roles` array
  gains a `roleId: string | null` field (already parsed by `parseMeta`,
  simply not passed through before this task).

- [ ] **Step 1: Write the failing test**

```javascript
// append to test/server.test.js — uses the file's existing request()
// helper (a thin http.get wrapper defined near the top of the file) and
// the real Roles/ tree the server already runs against in every other
// test in this file.
test('GET /api/roles includes each role\'s roleId', async () => {
  const res = await request('/api/roles');
  const domains = JSON.parse(res.body);
  const kubernetesArchitect = domains.kubernetes.roles.find(r => r.name === 'kubernetes_architect');
  assert.ok(kubernetesArchitect, 'fixture role should be present');
  assert.equal(kubernetesArchitect.roleId, 'kubernetes-architect');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/server.test.js`
Expected: FAIL — `kubernetesArchitect.roleId` is `undefined`

- [ ] **Step 3: Write the implementation**

In `server.js`, inside `getRoles()`'s `files.map(file => { ... })` callback
(around line 73-85), add `roleId` to the returned object:

```javascript
      return {
        name:         file.replace('.md', ''),
        file:         `Roles/${domainId}/${file}`,
        title,
        level:        resolveLevel(content, file),
        lastReviewed: meta.lastReviewed,
        roleId:       meta.roleId,
      };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/server.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add server.js test/server.test.js
git commit -m "feat: pass roleId through the /api/roles payload (#270)"
```

---

### Task 4: Mirror the parser into the viewer, restructure `parseCareerPath`

**Files:**

- Modify: `viewer-logic.js`
- Test: `test/viewer-logic.test.js`

**Interfaces:**

- Consumes: `parseRelationshipField` from Task 1 (for the equivalence
  test only — `viewer-logic.js` cannot `require()` it, see Global
  Constraints).
- Produces:
  - `parseRelationshipField(fieldText: string): Entry[]` — mirror,
    identical shape to Task 1.
  - `findRoleById(roleId: string, domains): role | null` — new, symmetric
    with the existing `findRoleByTitle(title, domains)`.
  - `parseCareerPath(markdown: string): { from: Item[], to: Item[] }`
    where `Item = { label: string, parsed: Entry[] }` — **changed** from
    the current `{ from: string[], to: string[] }`. Existing callers
    (`index.html`'s `renderCareerStepper`) and existing tests must be
    updated in this task.

- [ ] **Step 1: Write the failing tests**

```javascript
// append to test/viewer-logic.test.js

test('viewer-logic parseRelationshipField mirrors scripts/lib/relationship-annotations.js exactly', () => {
  // Same reasoning as the stripAnnotations mirror test above: index.html
  // cannot require() the canonical implementation, so this test keeps the
  // two from drifting apart.
  const { parseRelationshipField: canonicalParse } = require('../scripts/lib/relationship-annotations.js');
  const samples = [
    'Cloud Platform Architect <!-- role: cloud-platform-architect -->',
    'Board of Directors <!-- external-role -->',
    '<!-- one-of -->A <!-- role: a --> or B <!-- role: b --><!-- /one-of -->',
    'CFO <!-- role: chief-financial-officer -->; CISO <!-- role: chief-information-security-officer -->',
    'Some Drifted Title',
    'None',
    'None (sets technical direction; formal line management sits with the Chapter Lead)',
    '<!-- role: x -->',
    '<!-- one-of -->A <!-- role: a --><!-- /one-of -->',
    '',
    null,
  ];
  for (const sample of samples) {
    assert.deepEqual(parseRelationshipField(sample), canonicalParse(sample), `mismatch for ${JSON.stringify(sample)}`);
  }
});

// ── findRoleById ──────────────────────────────────────────
test('findRoleById finds a role by its stable id across domains', () => {
  const domains = { kubernetes: { label: 'Kubernetes', roles: [{ title: 'Kubernetes Architect', roleId: 'kubernetes-architect', file: 'x', level: 'Architect' }] } };
  const hit = findRoleById('kubernetes-architect', domains);
  assert.equal(hit.title, 'Kubernetes Architect');
  assert.equal(hit.domainLabel, 'Kubernetes');
});

test('findRoleById returns null for an unknown id', () => {
  assert.equal(findRoleById('nonexistent', { kubernetes: { label: 'Kubernetes', roles: [] } }), null);
});

test('findRoleById returns null for an empty id', () => {
  assert.equal(findRoleById('', { kubernetes: { label: 'Kubernetes', roles: [] } }), null);
  assert.equal(findRoleById(null, { kubernetes: { label: 'Kubernetes', roles: [] } }), null);
});
```

Now **replace** the existing `parseCareerPath` tests (they assert the old
`string[]` shape and will fail once Step 3 changes the return type):

```javascript
// REPLACE the five existing tests under "── parseCareerPath ──" with:

test('parseCareerPath handles the dominant heading variant', () => {
  const md = '## Career Development Path\n\n**Previous Roles:**\n\n- Kubernetes Senior Engineer\n\n**Potential Next Roles:**\n\n- Kubernetes Architect\n';
  const result = parseCareerPath(md);
  assert.equal(result.from.length, 1);
  assert.equal(result.from[0].label, 'Kubernetes Senior Engineer');
  assert.deepEqual(result.from[0].parsed, [{ kind: 'legacy', text: 'Kubernetes Senior Engineer' }]);
  assert.equal(result.to[0].label, 'Kubernetes Architect');
});

test('parseCareerPath handles the From/To (typical …) variant', () => {
  const md = '## Career Development Path\n\n**From (typical previous roles):**\n\n- Storage Engineer\n\n**To (typical next roles):**\n\n- Storage Architect\n';
  const result = parseCareerPath(md);
  assert.equal(result.from[0].label, 'Storage Engineer');
  assert.equal(result.to[0].label, 'Storage Architect');
});

test('parseCareerPath returns empty lists when the section is absent', () => {
  assert.deepEqual(parseCareerPath('# Role\n\n## Role Overview\n\nText.'), { from: [], to: [] });
});

test('parseCareerPath ignores bullets outside the from/to sub-lists', () => {
  const md = '## Career Development Path\n\nSome prose.\n\n- Stray bullet\n\n**Previous Roles:**\n\n- Real Entry\n';
  const result = parseCareerPath(md);
  assert.equal(result.from.length, 1);
  assert.equal(result.from[0].label, 'Real Entry');
  assert.equal(result.to.length, 0);
});

test('parseCareerPath parses an annotated bullet into a catalogue entry', () => {
  const md = '## Career Development Path\n\n**Previous Roles:**\n\n- Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer -->\n';
  const result = parseCareerPath(md);
  assert.equal(result.from[0].label, 'Kubernetes Senior Engineer');
  assert.deepEqual(result.from[0].parsed, [{ kind: 'catalogue', roleId: 'kubernetes-senior-engineer', label: 'Kubernetes Senior Engineer' }]);
});

test('parseCareerPath parses an annotated one-of bullet', () => {
  const md = '## Career Development Path\n\n**Potential Next Roles:**\n\n- <!-- one-of -->Cloud Lead Architect <!-- role: cloud-lead-architect --> or Cloud Principal Architect <!-- role: cloud-principal-architect --><!-- /one-of -->\n';
  const result = parseCareerPath(md);
  assert.equal(result.to[0].parsed[0].kind, 'one-of');
  assert.equal(result.to[0].parsed[0].options.length, 2);
});

test('parseCareerPath parses every role file in the catalog without throwing', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const domainsDir = path.join(__dirname, '..', 'Roles');
  let total = 0;
  for (const d of fs.readdirSync(domainsDir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    for (const f of fs.readdirSync(path.join(domainsDir, d.name))) {
      if (!f.endsWith('.md') || f === 'README.md' || /_standards\.md$/.test(f)) continue;
      const cp = parseCareerPath(fs.readFileSync(path.join(domainsDir, d.name, f), 'utf8'));
      assert.ok(Array.isArray(cp.from) && Array.isArray(cp.to));
      total++;
    }
  }
  assert.ok(total > 0);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test test/viewer-logic.test.js`
Expected: FAIL — `parseRelationshipField is not a function`, `findRoleById
is not a function`, and the new `parseCareerPath` assertions fail against
its current string-array return shape

- [ ] **Step 3: Write the implementation**

Append the mirrored parser to `viewer-logic.js`, next to `stripAnnotations`
(same file section, following the same "mirror of the canonical
implementation" comment convention already there):

```javascript
    // Mirror of parseRelationshipField in scripts/lib/relationship-annotations.js
    // (the canonical implementation). Same constraint as stripAnnotations
    // above: index.html loads this file via a plain <script> tag, so it
    // cannot require() that module directly. The equivalence test in
    // test/viewer-logic.test.js keeps the two from drifting apart.
    function parseSingleTarget(segment) {
        const markerCount = (segment.match(/<!--\s*(role:|external-role)/gi) || []).length;
        if (markerCount > 1) {
            return { kind: 'invalid', reason: 'a label carries more than one target annotation', text: segment };
        }
        const roleMatch = segment.match(/^(.*?)\s*<!--\s*role:\s*([a-z0-9][a-z0-9-]*)\s*-->\s*$/);
        if (roleMatch) {
            const label = roleMatch[1].trim();
            if (!label) return { kind: 'invalid', reason: 'annotation has no visible label', text: segment };
            return { kind: 'catalogue', roleId: roleMatch[2], label };
        }
        const externalMatch = segment.match(/^(.*?)\s*<!--\s*external-role\s*-->\s*$/);
        if (externalMatch) {
            const label = externalMatch[1].trim();
            if (!label) return { kind: 'invalid', reason: 'annotation has no visible label', text: segment };
            return { kind: 'external', label };
        }
        return { kind: 'legacy', text: segment };
    }

    function parseOneOf(segment) {
        const closed = segment.match(/^<!--\s*one-of\s*-->([\s\S]*)<!--\s*\/one-of\s*-->$/);
        if (!closed) {
            if (/<!--\s*one-of\s*-->|<!--\s*\/one-of\s*-->/.test(segment)) {
                return { kind: 'invalid', reason: 'unclosed one-of wrapper', text: segment };
            }
            return null;
        }
        const inner = closed[1];
        if (/<!--\s*one-of\s*-->|<!--\s*\/one-of\s*-->/.test(inner)) {
            return { kind: 'invalid', reason: 'nested one-of wrapper', text: segment };
        }
        const options = inner.split(/,|\bor\b/i).map(s => s.trim()).filter(Boolean).map(parseSingleTarget);
        if (options.length < 2) {
            return { kind: 'invalid', reason: 'one-of has fewer than two options', text: segment };
        }
        if (options.some(o => o.kind === 'invalid' || o.kind === 'legacy')) {
            return { kind: 'invalid', reason: 'one-of contains an unannotated or invalid option', text: segment };
        }
        return { kind: 'one-of', options };
    }

    function parseSegment(segment) {
        const oneOf = parseOneOf(segment);
        if (oneOf) return oneOf;
        return parseSingleTarget(segment);
    }

    function parseRelationshipField(fieldText) {
        const text = String(fieldText == null ? '' : fieldText).trim();
        if (!text) return [];
        const segments = text.split(';').map(s => s.trim()).filter(Boolean);
        if (segments.length === 1 && /^none\s*(\(.*\))?$/i.test(segments[0])) return [];
        return segments.map(seg => {
            if (/^none\b/i.test(seg) && !/<!--/.test(seg)) {
                return { kind: 'invalid', reason: 'None combined with another target', text: seg };
            }
            return parseSegment(seg);
        });
    }

    // Resolve a stable role id to the catalog role it names, or null. The
    // ID counterpart to findRoleByTitle — used once #270's annotations give
    // a caller something more durable than a title to resolve against.
    function findRoleById(roleId, domains) {
        if (!roleId) return null;
        for (const d of Object.values(domains || {})) {
            for (const r of (d.roles || [])) {
                if (r.roleId === roleId) return { ...r, domainLabel: d.label };
            }
        }
        return null;
    }
```

Replace `parseCareerPath`'s item-collection line so each bullet becomes a
`{ label, parsed }` item instead of a bare string:

```javascript
    // find this line inside parseCareerPath:
    //   const item = current && line.match(/^-\s+(.+)$/);
    //   if (item) out[current].push(stripAnnotations(item[1]));
    // and replace it with:
    const item = current && line.match(/^-\s+(.+)$/);
    if (item) {
        const raw = item[1];
        out[current].push({ label: stripAnnotations(raw), parsed: parseRelationshipField(raw) });
    }
```

Update `module.exports` (or the equivalent return object at the end of the
factory function) to add `parseRelationshipField` and `findRoleById`.

- [ ] **Step 4: Update the caller in `index.html`**

`renderCareerStepper`'s `chip` function currently takes a plain title
string. Find:

```javascript
        const chip = title => {
            const match = findRoleByTitle(title);
            return match
                ? `<span class="cs-chip" role="button" tabindex="0"
                        data-file="${escapeHtml(match.file)}" data-title="${escapeHtml(match.title)}"
                        data-level="${escapeHtml(match.level)}" data-domain="${escapeHtml(match.domainLabel)}">${escapeHtml(title)}</span>`
                : `<span class="cs-chip">${escapeHtml(title)}</span>`;
        };

        el.innerHTML = `
            <span class="cs-group"><span class="cs-label">From</span>${from.map(chip).join('')}</span>
            <span class="cs-arrow" aria-hidden="true">→</span>
            <span class="cs-current">${escapeHtml(currentTitle)}</span>
            <span class="cs-arrow" aria-hidden="true">→</span>
            <span class="cs-group"><span class="cs-label">To</span>${to.map(chip).join('')}</span>`;
```

Replace with:

```javascript
        const oneChip = (label, hit) => hit
            ? `<span class="cs-chip" role="button" tabindex="0"
                    data-file="${escapeHtml(hit.file)}" data-title="${escapeHtml(hit.title)}"
                    data-level="${escapeHtml(hit.level)}" data-domain="${escapeHtml(hit.domainLabel)}">${escapeHtml(label)}</span>`
            : `<span class="cs-chip">${escapeHtml(label)}</span>`;

        // An item's parsed value is either a single top-level entry or a
        // one-of group — either way, render one chip per resolvable option,
        // joined by "or" for a one-of.
        const chip = item => {
            const entries = (item.parsed.length === 1 && item.parsed[0].kind === 'one-of')
                ? item.parsed[0].options
                : item.parsed;
            return entries.map(entry => {
                const label = entry.kind === 'legacy' ? item.label : entry.label;
                const hit = entry.kind === 'catalogue' ? resolveRoleId(entry.roleId)
                    : entry.kind === 'legacy' ? findRoleByTitle(item.label)
                    : null;
                return oneChip(label, hit);
            }).join('<span class="cs-or"> or </span>');
        };

        el.innerHTML = `
            <span class="cs-group"><span class="cs-label">From</span>${from.map(chip).join('')}</span>
            <span class="cs-arrow" aria-hidden="true">→</span>
            <span class="cs-current">${escapeHtml(currentTitle)}</span>
            <span class="cs-arrow" aria-hidden="true">→</span>
            <span class="cs-group"><span class="cs-label">To</span>${to.map(chip).join('')}</span>`;
```

(`resolveRoleId` is introduced in Task 5, alongside the ViewerLogic
destructuring update — this task's `index.html` edit will not run correctly
in isolation until Task 5 lands; that's expected, both are part of the same
overall change and Task 5 follows immediately.)

- [ ] **Step 5: Run tests to verify they pass**

Run: `node --test test/viewer-logic.test.js`
Expected: PASS (all tests). Do not run browser tests yet — `index.html`
isn't fully wired until Task 5.

- [ ] **Step 6: Commit**

```bash
git add viewer-logic.js index.html test/viewer-logic.test.js
git commit -m "feat: mirror parseRelationshipField into the viewer, resolve career-path bullets by role id (#270)"
```

---

### Task 5: Interactions-table parsing and `index.html` wiring

**Files:**

- Modify: `viewer-logic.js`
- Modify: `index.html`
- Test: `test/viewer-logic.test.js`

**Interfaces:**

- Consumes: `parseRelationshipField` from Task 4's mirror; `findRoleById`
  from Task 4.
- Produces: `parseInteractionRoles(markdown: string): { label: string,
  parsed: Entry[] }[]` — one entry per interactions-table row, in row
  order; empty array when the section is absent.

- [ ] **Step 1: Write the failing tests**

```javascript
// append to test/viewer-logic.test.js

// ── parseInteractionRoles ────────────────────────────────
test('parseInteractionRoles extracts the Role column in row order', () => {
    const md = [
        '## Interactions with Other Roles',
        '',
        '| Role | Nature of Interaction | Interaction Mode |',
        '|---|---|---|',
        '| Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer --> | Escalation | Escalates To |',
        '| Board of Directors <!-- external-role --> | Reporting | Provides To |',
        '',
    ].join('\n');
    const rows = parseInteractionRoles(md);
    assert.equal(rows.length, 2);
    assert.deepEqual(rows[0].parsed, [{ kind: 'catalogue', roleId: 'kubernetes-senior-engineer', label: 'Kubernetes Senior Engineer' }]);
    assert.deepEqual(rows[1].parsed, [{ kind: 'external', label: 'Board of Directors' }]);
});

test('parseInteractionRoles handles a one-of Role cell', () => {
    const md = [
        '## Interactions with Other Roles',
        '',
        '| Role | Nature of Interaction | Interaction Mode |',
        '|---|---|---|',
        '| <!-- one-of -->DevOps Senior Engineer <!-- role: devops-senior-engineer --> or DevOps Architect <!-- role: devops-architect --><!-- /one-of --> | Escalation | Escalates To |',
        '',
    ].join('\n');
    const rows = parseInteractionRoles(md);
    assert.equal(rows[0].parsed[0].kind, 'one-of');
    assert.equal(rows[0].parsed[0].options.length, 2);
});

test('parseInteractionRoles returns an empty array when the section is absent', () => {
    assert.deepEqual(parseInteractionRoles('# Role\n\n## Role Overview\n\nText.'), []);
});

test('parseInteractionRoles skips the header and separator rows', () => {
    const md = [
        '## Interactions with Other Roles',
        '',
        '| Role | Nature of Interaction | Interaction Mode |',
        '|---|---|---|',
        '| Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer --> | Escalation | Escalates To |',
        '',
    ].join('\n');
    assert.equal(parseInteractionRoles(md).length, 1);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test test/viewer-logic.test.js`
Expected: FAIL — `parseInteractionRoles is not a function`

- [ ] **Step 3: Write the implementation**

Append to `viewer-logic.js`, near `parseCareerPath`:

```javascript
    // Extracts the Role column of the per-role "## Interactions with Other
    // Roles" table, in row order, so linkInteractionRoles (index.html) can
    // resolve each row by id instead of re-deriving a fuzzy title match
    // from post-render DOM text (which has already lost the annotation —
    // marked+DOMPurify drop HTML comments before any JS sees the cell).
    function parseInteractionRoles(markdown) {
        const section = String(markdown).split(/^## Interactions with Other Roles\s*$/m)[1];
        if (!section) return [];
        const body = section.split(/\r?\n## /)[0];
        const rows = [];
        for (const line of body.split(/\r?\n/)) {
            if (!/^\|/.test(line)) continue;
            if (/^\|\s*Role\s*\|/.test(line)) continue;       // header
            if (/^\|[\s:|-]+\|$/.test(line)) continue;         // separator
            const cellMatch = line.match(/^\|\s*([^|]*?)\s*\|/);
            if (!cellMatch) continue;
            const raw = cellMatch[1];
            rows.push({ label: stripAnnotations(raw), parsed: parseRelationshipField(raw) });
        }
        return rows;
    }
```

Update `module.exports` to add `parseInteractionRoles`.

- [ ] **Step 4: Wire `index.html`**

Add the four new exports to the `ViewerLogic` destructuring block:

```javascript
    // find this line:
    //     parseRoleMeta, splitReportingValue, stripAnnotations, reviewSlotFor,
    // and replace it with:
    parseRoleMeta, splitReportingValue, stripAnnotations, reviewSlotFor,
    parseRelationshipField, parseInteractionRoles,
    findRoleById: resolveRoleId,
```

Add a `resolveRoleId` wrapper next to the existing `findRoleByTitle`
wrapper:

```javascript
    // find:
    //     function findRoleByTitle(title) {
    //         return resolveRoleTitle(title, allDomains);
    //     }
    // and add immediately after it:
    function resolveRoleId(id) {
        return findRoleById(id, allDomains);
    }
```

(Note the naming: `findRoleById` is destructured from `ViewerLogic` under
the alias `resolveRoleId` — mirroring the existing `findRoleByTitle:
resolveRoleTitle` alias — and `resolveRoleId` above is the local wrapper
function that closes over `allDomains`, exactly parallel to
`findRoleByTitle`'s own wrapper. This gives Task 4's `chip` function, which
already calls `resolveRoleId(entry.roleId)`, something to call.)

Update `reportingChip` to resolve by id first, falling back to today's
title heuristic only for legacy text. Find:

```javascript
        const reportingChip = (icon, label, value) => {
            if (!value) return '';
            // #269 appends an inline annotation comment to this same value.
            // splitReportingValue already strips it for head/detail; strip
            // it here too so the tooltip (which shows the value whole,
            // rather than through head/detail) doesn't carry it either.
            const clean = stripAnnotations(value);
            const { head, detail } = splitReportingValue(value);
            const hit = findRoleByTitle(head);
```

Replace with:

```javascript
        const reportingChip = (icon, label, value) => {
            if (!value) return '';
            // #269 appends an inline annotation comment to this same value.
            // splitReportingValue already strips it for head/detail; strip
            // it here too so the tooltip (which shows the value whole,
            // rather than through head/detail) doesn't carry it either.
            const clean = stripAnnotations(value);
            const { head, detail } = splitReportingValue(value);
            // #270: resolve by the annotated role id first — deterministic
            // and rename-proof. Falls back to the title heuristic only for
            // text #269 never annotated (still legacy, e.g. #299).
            const primary = parseRelationshipField(value)[0];
            const hit = primary && primary.kind === 'catalogue' ? resolveRoleId(primary.roleId)
                : primary && primary.kind === 'external' ? null
                : findRoleByTitle(head);
```

(The rest of `reportingChip` — the `inner`/`note`/return lines — is
unchanged; only how `hit` is computed changes.)

Update `linkInteractionRoles` to take the pre-parsed rows and resolve each
by id, rendering multiple linked/plain spans for a one-of cell. Find:

```javascript
    function linkInteractionRoles(container, currentTitle) {
        if (!container) return;
        for (const h2 of container.querySelectorAll('h2')) {
            if (!/^Interactions with Other Roles/i.test(h2.textContent.trim())) continue;
            let el = h2.nextElementSibling;
            while (el && el.tagName !== 'TABLE' && el.tagName !== 'H2') el = el.nextElementSibling;
            if (!el || el.tagName !== 'TABLE') break;
            for (const row of el.querySelectorAll('tbody tr')) {
                const cell = row.cells[0];
                if (!cell) continue;
                const raw = cell.textContent.trim().replace(/:$/, '').trim();
                const hit = findRoleByTitle(raw);
                if (!hit || hit.title === currentTitle) continue;
                const a = document.createElement('span');
                a.className = 'role-xref';
                a.setAttribute('role', 'button');
                a.tabIndex = 0;
                a.dataset.file   = hit.file;
                a.dataset.title  = hit.title;
                a.dataset.level  = hit.level;
                a.dataset.domain = hit.domainLabel;
                a.title = `Open ${hit.title}`;
                a.textContent = cell.textContent.trim();
                cell.textContent = '';
                cell.appendChild(a);
            }
            break;

        }
    }
```

Replace with:

```javascript
    function linkInteractionRoles(container, currentTitle, parsedRows) {
        if (!container) return;
        for (const h2 of container.querySelectorAll('h2')) {
            if (!/^Interactions with Other Roles/i.test(h2.textContent.trim())) continue;
            let el = h2.nextElementSibling;
            while (el && el.tagName !== 'TABLE' && el.tagName !== 'H2') el = el.nextElementSibling;
            if (!el || el.tagName !== 'TABLE') break;
            const rows = [...el.querySelectorAll('tbody tr')];
            rows.forEach((row, i) => {
                const cell = row.cells[0];
                if (!cell) return;
                const rawText = cell.textContent.trim().replace(/:$/, '').trim();
                const item = parsedRows && parsedRows[i];
                // #270: prefer the pre-parsed row (raw markdown, still
                // carries the annotation) over the rendered cell text (the
                // annotation is already gone — marked+DOMPurify strip HTML
                // comments before any JS sees it).
                const entries = (item && item.parsed.length === 1 && item.parsed[0].kind === 'one-of')
                    ? item.parsed[0].options
                    : (item ? item.parsed : [{ kind: 'legacy', text: rawText }]);
                cell.textContent = '';
                entries.forEach((entry, idx) => {
                    if (idx > 0) cell.appendChild(document.createTextNode(' or '));
                    const label = entry.kind === 'legacy' ? rawText : entry.label;
                    const hit = entry.kind === 'catalogue' ? resolveRoleId(entry.roleId)
                        : entry.kind === 'legacy' ? findRoleByTitle(rawText)
                        : null;
                    if (hit && hit.title !== currentTitle) {
                        const a = document.createElement('span');
                        a.className = 'role-xref';
                        a.setAttribute('role', 'button');
                        a.tabIndex = 0;
                        a.dataset.file   = hit.file;
                        a.dataset.title  = hit.title;
                        a.dataset.level  = hit.level;
                        a.dataset.domain = hit.domainLabel;
                        a.title = `Open ${hit.title}`;
                        a.textContent = label;
                        cell.appendChild(a);
                    } else {
                        cell.appendChild(document.createTextNode(label));
                    }
                });
            });
            break;
        }
    }
```

Both call sites of `linkInteractionRoles` need the raw `markdown` parsed
and passed through as the third argument. Find each occurrence of:

```javascript
            linkInteractionRoles(document.getElementById('roleBody'), title);
```

and

```javascript
            linkInteractionRoles(document.getElementById('roleBody2'), title);
```

Read the surrounding function at each call site to confirm the raw
`markdown` string (the value fetched from `/api/role?file=...` before it
was passed to `renderMarkdown()`) is in scope — it is, at both existing
call sites, under the name `markdown`. Replace each call with:

```javascript
            linkInteractionRoles(document.getElementById('roleBody'), title, parseInteractionRoles(markdown));
```

```javascript
            linkInteractionRoles(document.getElementById('roleBody2'), title, parseInteractionRoles(markdown));
```

- [ ] **Step 5: Write the `index.html` wiring tests**

Following the exact pattern of the existing `index.html`-regex test from
#269 (`test('index.html imports stripAnnotations from ViewerLogic and
applies it to the reporting-chip tooltip value', ...)`), add:

```javascript
// append to test/viewer-logic.test.js
test('index.html destructures parseRelationshipField, parseInteractionRoles, and findRoleById from ViewerLogic', () => {
    const fs = require('node:fs');
    const path = require('node:path');
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/i);
    assert.ok(scriptMatch, 'index.html has an inline <script> block');
    const script = scriptMatch[1];

    const destructure = script.match(/const\s*\{[\s\S]*?\}\s*=\s*ViewerLogic;/);
    assert.ok(destructure, 'index.html destructures ViewerLogic exports');
    assert.match(destructure[0], /\bparseRelationshipField\b/);
    assert.match(destructure[0], /\bparseInteractionRoles\b/);
    assert.match(destructure[0], /findRoleById:\s*resolveRoleId/);

    assert.match(script, /function resolveRoleId\(id\)\s*\{\s*return findRoleById\(id, allDomains\);/,
        'resolveRoleId must wrap findRoleById with allDomains, mirroring findRoleByTitle');
});

test('index.html resolves the reporting chip by role id before falling back to title matching', () => {
    const fs = require('node:fs');
    const path = require('node:path');
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    const script = html.match(/<script>([\s\S]*?)<\/script>/i)[1];
    const reportingChip = script.match(/const reportingChip = \(icon, label, value\) => \{[\s\S]*?\n {8}\};/);
    assert.ok(reportingChip, 'index.html defines reportingChip');
    assert.match(reportingChip[0], /parseRelationshipField\(value\)/);
    assert.match(reportingChip[0], /resolveRoleId\(primary\.roleId\)/);
});

test('index.html passes parsed interaction rows into linkInteractionRoles', () => {
    const fs = require('node:fs');
    const path = require('node:path');
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    assert.match(html, /linkInteractionRoles\([^)]*parseInteractionRoles\(markdown\)\)/);
});
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `node --test test/viewer-logic.test.js`
Expected: PASS (all tests)

- [ ] **Step 7: Commit**

```bash
git add viewer-logic.js index.html test/viewer-logic.test.js
git commit -m "feat: parse and link the interactions table by role id, complete #270 viewer wiring"
```

---

### Task 6: Browser journeys

**Files:**

- Modify: `test/browser/catalogue.spec.js`

**Interfaces:**

- Consumes: the live app, running against the real (fully #269-migrated)
  `Roles/` catalogue. No new production interfaces — this task only adds
  tests.

Uses four real catalogue examples, already verified to exist:

- Catalogue link: `Kubernetes Architect` → Reports To → `Cloud, Platform &
  Infrastructure Chapter Lead` (annotated `role: cloud-platform-and-infrastructure-chapter-lead`).
- External, non-clickable: `Chief Executive Officer` → Reports To → `Board
  of Directors` (annotated `external-role`).
- One-of career stepper: `VMware Architect` → career "To" → `Cloud Lead
  Architect` or `Cloud Principal Architect` (both catalogue targets).
- One-of interactions: `Automation Framework Engineer` → interactions table
  first row → `DevOps Senior Engineer` or `DevOps Architect` (both
  catalogue targets).

- [ ] **Step 1: Write the tests**

```javascript
// append to test/browser/catalogue.spec.js

test('a resolved Reports To chip links to its target role', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('Kubernetes Architect');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^Kubernetes Architect\b/,
  }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Kubernetes Architect' })).toBeVisible();

  const chip = page.locator('.meta-reporting .role-xref');
  await expect(chip).toContainText('Cloud, Platform & Infrastructure Chapter Lead');
  await chip.click();
  await expect(page.locator('#roleHeader').getByRole('heading', {
    name: 'Cloud, Platform & Infrastructure Chapter Lead',
  })).toBeVisible();
});

test('an external Reports To destination renders as plain text, not a link', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('Chief Executive Officer');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^Chief Executive Officer\b/,
  }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Chief Executive Officer' })).toBeVisible();

  const reportingTag = page.locator('.meta-reporting').filter({ hasText: 'Reports to' });
  await expect(reportingTag).toContainText('Board of Directors');
  await expect(reportingTag.locator('.role-xref')).toHaveCount(0);
});

test('a one-of career-path entry renders both options, each independently linkable', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('VMware Architect');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^VMware Architect\b/,
  }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'VMware Architect' })).toBeVisible();

  const toGroup = page.locator('#careerStepper .cs-group').filter({ hasText: 'To' });
  await expect(toGroup.getByText('Cloud Lead Architect', { exact: true })).toBeVisible();
  await expect(toGroup.getByText('Cloud Principal Architect', { exact: true })).toBeVisible();

  await toGroup.getByText('Cloud Principal Architect', { exact: true }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Cloud Principal Architect' })).toBeVisible();
});

test('a one-of interactions-table row renders both options, each independently linkable', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('Automation Framework Engineer');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^Automation Framework Engineer\b/,
  }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Automation Framework Engineer' })).toBeVisible();

  const firstRow = page.locator('#roleBody table tbody tr').first();
  await expect(firstRow).toContainText('DevOps Senior Engineer');
  await expect(firstRow).toContainText('DevOps Architect');
  await expect(firstRow.locator('.role-xref')).toHaveCount(2);

  await firstRow.locator('.role-xref').first().click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'DevOps Senior Engineer' })).toBeVisible();
});
```

- [ ] **Step 2: Run the browser suite**

Run: `npm run test:browser`
Expected: PASS. If a selector doesn't match the real rendered markup (CSS
class names, DOM structure), inspect the actual rendered page for that role
— e.g. `npx playwright test test/browser/catalogue.spec.js --headed` — and
adjust the selector to match reality rather than changing the application
to match a guessed selector.

- [ ] **Step 3: Commit**

```bash
git add test/browser/catalogue.spec.js
git commit -m "test: add browser journeys for role-id-resolved relationship links (#270)"
```

---

### Task 7: Full-catalogue verification

**Files:** none (verification only — fixes, if any are needed, land as
small follow-up commits within this task).

This task runs the new validator against the real, already-migrated
catalogue for the first time. #269's migration never checked bidirectional
agreement between `Reports To` and `Direct Reports`, so real contradictions
or cycles may exist that nothing has surfaced before now.

- [ ] **Step 1: Run the full validator**

```bash
npm run validate
```

- [ ] **Step 2: Triage any relationship errors or warnings**

If `findRelationshipIssues` reports real errors against the live catalogue:
read each one, open the named file(s), and determine whether it's a
genuine content problem (fix the role file directly — e.g. correct a
contradictory `Direct Reports` entry) or a validator bug (fix
`validate-roles.js` or `scripts/lib/relationship-annotations.js`, with a
regression test in the relevant task's test file). Warnings (stale labels,
legacy-text heuristics) do not block — note them but do not feel obligated
to fix every one; they are exactly the kind of "reviewable, not urgent"
signal the design intended.

- [ ] **Step 3: Run the full test suite**

```bash
npm test
```

Expected: all tests pass, including every test added across Tasks 1-6.

- [ ] **Step 4: Run the browser suite once more**

```bash
npm run test:browser
```

- [ ] **Step 5: Final commit (only if Step 2 required fixes)**

```bash
git add -A
git commit -m "fix: address relationship issues surfaced by #270's live catalogue validation"
```

If Step 2 required no fixes, skip this step — there is nothing to commit.

## Self-Review Notes

- **Spec coverage:** shared parser → Task 1; validation (unresolved IDs,
  self-refs, cycles, contradictory pairs) → Task 2; `roleId` passthrough →
  Task 3; viewer mirror + career-path resolution → Task 4; interactions
  table parsing + full `index.html` wiring → Task 5; browser journeys →
  Task 6; rename-stability and deletion-failure tests → embedded in Task
  2's test list (the stale-label test and the file-removal test); real-data
  verification → Task 7.
- **Not in scope, by design:** `buildOrgTree`, `parseInteractions`,
  `buildCareerSankey`, `parseProgressionLadders`, `parseMobilityPaths` are
  untouched — see the spec's Non-goals and this plan's Global Constraints.
- **Known risk flagged for Task 7:** the contradictory-pair and cycle
  checks have never run against the real catalogue before. Task 7 exists
  specifically to surface and resolve whatever that first real run finds,
  the same way #269's Task 7 had to handle real-corpus surprises the unit
  tests couldn't anticipate.
