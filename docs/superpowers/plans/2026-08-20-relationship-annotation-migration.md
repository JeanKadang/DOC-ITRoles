# Relationship Annotation Migration (#269) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one idempotent migration tool that converts resolvable
`Reports To`, `Direct Reports`, career-path, and interaction-table
relationships from mutable titles to ADR-0006's stable-ID annotation
syntax, then run it across the catalogue in reviewable domain-folder
batches.

**Architecture:** A single shared library (`scripts/lib/relationship-annotations.js`)
does all parsing/annotation decisions as pure functions operating on
strings; a thin CLI (`scripts/migrate-relationship-annotations.js`) walks
`Roles/` and applies the library to each of the four field shapes. A
separate read-only audit script informs a curated external-terms list,
because the tool must never guess.

**Tech Stack:** Node.js (`node:fs`, `node:path`, `node:test`,
`node:assert/strict`), zero runtime dependencies — matches every existing
script in `scripts/`.

## Global Constraints

- No new dependencies (repo's `package.json` has `"dependencies": {}`).
- Follow `backfill-role-ids.js`'s conventions: dry-run by default, `--write`
  to apply, preserve per-file BOM and CRLF, never rewrite a field that
  wasn't changed.
- Target syntax is exactly ADR-0006 (`docs/adr/0006-annotate-role-relationships-with-stable-targets.md`):
  `` <!-- role: id --> ``, `` <!-- external-role --> ``,
  `` <!-- one-of -->...<!-- /one-of --> ``.
- Never guess: only annotate a target that resolves via an exact title
  match or an exact match against the curated external-terms list.
- `npm run validate` and `npm test` must pass after every batch.
- New tests go in top-level `test/*.test.js` files only —
  `scripts/run-node-tests.js` does not recurse into subdirectories.

---

### Task 1: Role index and single-target annotation

**Files:**

- Create: `scripts/lib/relationship-annotations.js`
- Test: `test/relationship-annotations.test.js`

**Interfaces:**

- Produces: `normalizeTitle(title: string): string`,
  `buildRoleIndex(roles: {title: string, roleId: string}[]): Map<string, {roleId: string, title: string}>`,
  `annotateTarget(label: string, ctx: {roleIndex: Map, externalTerms: Set<string>}): {text: string, kind: 'role'|'external', roleId?: string} | null`.

- [ ] **Step 1: Write the failing tests**

```javascript
// test/relationship-annotations.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  normalizeTitle,
  buildRoleIndex,
  annotateTarget,
} = require('../scripts/lib/relationship-annotations.js');

test('normalizeTitle lowercases and collapses whitespace', () => {
  assert.equal(normalizeTitle('  Cloud   Platform Architect '), 'cloud platform architect');
});

test('buildRoleIndex keys by normalized title', () => {
  const idx = buildRoleIndex([{ title: 'Cloud Platform Architect', roleId: 'cloud-platform-architect' }]);
  assert.deepEqual(idx.get('cloud platform architect'), { roleId: 'cloud-platform-architect', title: 'Cloud Platform Architect' });
});

test('annotateTarget resolves an exact catalogue title to a role annotation', () => {
  const roleIndex = buildRoleIndex([{ title: 'Cloud Platform Architect', roleId: 'cloud-platform-architect' }]);
  const result = annotateTarget('Cloud Platform Architect', { roleIndex, externalTerms: new Set() });
  assert.deepEqual(result, {
    text: 'Cloud Platform Architect <!-- role: cloud-platform-architect -->',
    kind: 'role',
    roleId: 'cloud-platform-architect',
  });
});

test('annotateTarget matches case-insensitively', () => {
  const roleIndex = buildRoleIndex([{ title: 'Cloud Platform Architect', roleId: 'cloud-platform-architect' }]);
  const result = annotateTarget('cloud platform architect', { roleIndex, externalTerms: new Set() });
  assert.equal(result.kind, 'role');
});

test('annotateTarget resolves a curated external term', () => {
  const result = annotateTarget('Board of Directors', { roleIndex: new Map(), externalTerms: new Set(['board of directors']) });
  assert.deepEqual(result, { text: 'Board of Directors <!-- external-role -->', kind: 'external' });
});

test('a catalogue title takes priority over an external term of the same text', () => {
  const roleIndex = buildRoleIndex([{ title: 'CEO', roleId: 'ceo' }]);
  const result = annotateTarget('CEO', { roleIndex, externalTerms: new Set(['ceo']) });
  assert.equal(result.kind, 'role');
});

test('annotateTarget returns null for text that resolves to nothing', () => {
  const result = annotateTarget('Some Drifted Title', { roleIndex: new Map(), externalTerms: new Set() });
  assert.equal(result, null);
});

test('annotateTarget returns null for empty or whitespace-only text', () => {
  assert.equal(annotateTarget('   ', { roleIndex: new Map(), externalTerms: new Set() }), null);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test test/relationship-annotations.test.js`
Expected: FAIL — `Cannot find module '../scripts/lib/relationship-annotations.js'`

- [ ] **Step 3: Write the implementation**

```javascript
// scripts/lib/relationship-annotations.js
'use strict';

// Shared parser/annotator for the relationship representation decided in
// ADR-0006 (docs/adr/0006-annotate-role-relationships-with-stable-targets.md).
// This module only ever adds an annotation when it can prove one is
// correct — an exact title match or an exact curated external-term match.
// Everything else stays as legacy, unannotated text. Guessing here would
// reproduce the exact silent-drift failure ADR-0006 exists to prevent.

function normalizeTitle(title) {
  return String(title).trim().toLowerCase().replace(/\s+/g, ' ');
}

function buildRoleIndex(roles) {
  const index = new Map();
  for (const { title, roleId } of roles) {
    index.set(normalizeTitle(title), { roleId, title });
  }
  return index;
}

function annotateTarget(label, { roleIndex, externalTerms }) {
  const trimmed = String(label).trim();
  if (!trimmed) return null;
  const norm = normalizeTitle(trimmed);

  const role = roleIndex.get(norm);
  if (role) {
    return { text: `${trimmed} <!-- role: ${role.roleId} -->`, kind: 'role', roleId: role.roleId };
  }
  if (externalTerms.has(norm)) {
    return { text: `${trimmed} <!-- external-role -->`, kind: 'external' };
  }
  return null;
}

module.exports = { normalizeTitle, buildRoleIndex, annotateTarget };
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test test/relationship-annotations.test.js`
Expected: PASS (8 tests)

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/relationship-annotations.js test/relationship-annotations.test.js
git commit -m "feat: add role index and single-target annotation (#269)"
```

---

### Task 2: Field splitting, one-of grouping, and field-level annotation

**Files:**

- Modify: `scripts/lib/relationship-annotations.js`
- Test: `test/relationship-annotations.test.js`

**Interfaces:**

- Consumes: `annotateTarget` from Task 1 (same signature).
- Produces: `isAnnotated(segment: string): boolean`,
  `annotateField(fieldText: string, ctx: {roleIndex, externalTerms}): {text: string, resolved: object[], legacy: string[]}`.

- [ ] **Step 1: Write the failing tests**

```javascript
// append to test/relationship-annotations.test.js
const { isAnnotated, annotateField } = require('../scripts/lib/relationship-annotations.js');

function ctx(roles = [], external = []) {
  return { roleIndex: buildRoleIndex(roles), externalTerms: new Set(external.map(normalizeTitle)) };
}

test('isAnnotated detects each existing marker', () => {
  assert.equal(isAnnotated('X <!-- role: x -->'), true);
  assert.equal(isAnnotated('X <!-- external-role -->'), true);
  assert.equal(isAnnotated('<!-- one-of -->X<!-- /one-of -->'), true);
  assert.equal(isAnnotated('Plain Title'), false);
});

test('annotateField resolves a single catalogue target', () => {
  const r = annotateField('Cloud Platform Architect', ctx([{ title: 'Cloud Platform Architect', roleId: 'cloud-platform-architect' }]));
  assert.equal(r.text, 'Cloud Platform Architect <!-- role: cloud-platform-architect -->');
  assert.equal(r.resolved.length, 1);
  assert.deepEqual(r.legacy, []);
});

test('annotateField leaves "None" untouched', () => {
  const r = annotateField('None', ctx());
  assert.equal(r.text, 'None');
  assert.deepEqual(r.resolved, []);
  assert.deepEqual(r.legacy, []);
});

test('annotateField wraps a fully-resolvable "or" choice in one-of', () => {
  const roles = [
    { title: 'DevOps Senior Engineer', roleId: 'devops-senior-engineer' },
    { title: 'DevOps Architect', roleId: 'devops-architect' },
  ];
  const r = annotateField('DevOps Senior Engineer or DevOps Architect', ctx(roles));
  assert.equal(
    r.text,
    '<!-- one-of -->DevOps Senior Engineer <!-- role: devops-senior-engineer --> or DevOps Architect <!-- role: devops-architect --><!-- /one-of -->'
  );
  assert.equal(r.resolved.length, 1);
  assert.equal(r.resolved[0].kind, 'one-of');
});

test('annotateField wraps a three-way comma/or choice with an Oxford comma', () => {
  const roles = [
    { title: 'CTO', roleId: 'chief-technology-officer' },
    { title: 'CIO', roleId: 'chief-information-officer' },
    { title: 'SVP of Technology', roleId: 'svp-technology' },
  ];
  const r = annotateField('CTO, CIO, or SVP of Technology', ctx(roles));
  assert.equal(
    r.text,
    '<!-- one-of -->CTO <!-- role: chief-technology-officer -->, CIO <!-- role: chief-information-officer -->, or SVP of Technology <!-- role: svp-technology --><!-- /one-of -->'
  );
});

test('annotateField leaves an "or" choice untouched when one side does not resolve', () => {
  const roles = [{ title: 'DevOps Senior Engineer', roleId: 'devops-senior-engineer' }];
  const original = 'DevOps Senior Engineer or Some Drifted Title';
  const r = annotateField(original, ctx(roles));
  assert.equal(r.text, original);
  assert.deepEqual(r.resolved, []);
  assert.deepEqual(r.legacy, [original]);
});

test('annotateField splits simultaneous targets on top-level semicolons', () => {
  const roles = [
    { title: 'CFO', roleId: 'chief-financial-officer' },
    { title: 'CISO', roleId: 'chief-information-security-officer' },
  ];
  const r = annotateField('CFO; CISO', ctx(roles));
  assert.equal(r.text, 'CFO <!-- role: chief-financial-officer -->; CISO <!-- role: chief-information-security-officer -->');
  assert.equal(r.resolved.length, 2);
});

test('annotateField is a no-op on text that is already annotated', () => {
  const original = 'Cloud Platform Architect <!-- role: cloud-platform-architect -->';
  const r = annotateField(original, ctx([{ title: 'Cloud Platform Architect', roleId: 'cloud-platform-architect' }]));
  assert.equal(r.text, original);
  assert.deepEqual(r.resolved, []);
});

test('annotateField leaves an unresolved semicolon-separated field byte-identical', () => {
  const original = 'Some Drift;Another Drift';
  const r = annotateField(original, ctx());
  assert.equal(r.text, original, 'nothing resolved, so nothing should be rewritten, including separator spacing');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test test/relationship-annotations.test.js`
Expected: FAIL — `isAnnotated is not a function` / `annotateField is not a function`

- [ ] **Step 3: Write the implementation**

```javascript
// append to scripts/lib/relationship-annotations.js, before module.exports

const ANNOTATION_MARKER = /<!--\s*(role:|external-role|one-of)/i;

function isAnnotated(segment) {
  return ANNOTATION_MARKER.test(segment);
}

// Builds a "<!-- one-of -->A, B, or C<!-- /one-of -->" group only when every
// candidate independently resolves. Punctuation is normalized to an Oxford
// comma to match ADR-0006's own examples — the candidate labels themselves
// are used verbatim, only the joiners are standardized.
function buildOneOf(rawCandidates, ctx) {
  const candidates = rawCandidates.map(c => c.trim()).filter(Boolean);
  if (candidates.length < 2) return null;

  const annotated = candidates.map(label => annotateTarget(label, ctx));
  if (annotated.some(a => !a)) return null;

  const texts = annotated.map(a => a.text);
  const joined = texts.length === 2
    ? `${texts[0]} or ${texts[1]}`
    : `${texts.slice(0, -1).join(', ')}, or ${texts[texts.length - 1]}`;

  return { text: `<!-- one-of -->${joined}<!-- /one-of -->`, kind: 'one-of', options: annotated };
}

// A top-level segment is either a single target or a genuine "or" choice
// among two or more targets. Direct resolution is tried first so a title
// that happens to contain the word "or" is never misread as a choice.
function annotateSegment(segment, ctx) {
  const trimmed = segment.trim();
  if (!trimmed || /^none$/i.test(trimmed) || isAnnotated(trimmed)) {
    return { text: segment, status: 'skip' };
  }

  const direct = annotateTarget(trimmed, ctx);
  if (direct) return { text: direct.text, status: 'resolved', detail: direct };

  if (/\bor\b/i.test(trimmed)) {
    const candidates = trimmed.split(/\s*,\s*|\s+or\s+/i);
    const oneOf = buildOneOf(candidates, ctx);
    if (oneOf) return { text: oneOf.text, status: 'resolved', detail: oneOf };
  }

  return { text: segment, status: 'legacy', detail: trimmed };
}

// Top-level targets in a field are separated by ";" (see ADR-0006's Direct
// Reports example). A field that resolves nothing is returned completely
// unchanged, including its original separator spacing, so untouched fields
// never produce a diff.
function annotateField(fieldText, ctx) {
  if (/^\s*none\s*$/i.test(fieldText)) return { text: fieldText, resolved: [], legacy: [] };

  const segments = fieldText.split(';').map(s => annotateSegment(s, ctx));
  const resolved = segments.filter(s => s.status === 'resolved').map(s => s.detail);
  const legacy = segments.filter(s => s.status === 'legacy').map(s => s.detail);

  if (resolved.length === 0) return { text: fieldText, resolved, legacy };

  const text = segments.map(s => s.text.trim()).join('; ');
  return { text, resolved, legacy };
}
```

Update the final `module.exports` line to:

```javascript
module.exports = { normalizeTitle, buildRoleIndex, annotateTarget, isAnnotated, annotateField };
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test test/relationship-annotations.test.js`
Expected: PASS (all tests from Task 1 and Task 2)

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/relationship-annotations.js test/relationship-annotations.test.js
git commit -m "feat: add field splitting and one-of grouping to relationship annotator (#269)"
```

---

### Task 3: Whole-document migration for Reports To and Direct Reports

**Files:**

- Modify: `scripts/lib/relationship-annotations.js`
- Test: `test/relationship-annotations.test.js`

**Interfaces:**

- Consumes: `annotateField` from Task 2.
- Produces: `migrateRoleContent(content: string, ctx: {roleIndex, externalTerms}): {content: string, resolved: object[], legacy: {field: string, text: string}[]}`.

- [ ] **Step 1: Write the failing tests**

```javascript
// append to test/relationship-annotations.test.js
const { migrateRoleContent } = require('../scripts/lib/relationship-annotations.js');

const SAMPLE = [
  '# Kubernetes Engineer',
  '',
  '| Field | Value |',
  '|---|---|',
  '| **Role ID** | `kubernetes-engineer` |',
  '| **Reports To** | Kubernetes Senior Engineer |',
  '| **Direct Reports** | None |',
  '',
  '## Role Overview',
  '',
  'Text.',
  '',
].join('\n');

function sampleCtx() {
  return {
    roleIndex: buildRoleIndex([
      { title: 'Kubernetes Engineer', roleId: 'kubernetes-engineer' },
      { title: 'Kubernetes Senior Engineer', roleId: 'kubernetes-senior-engineer' },
    ]),
    externalTerms: new Set(),
  };
}

test('migrateRoleContent annotates Reports To and leaves a None Direct Reports untouched', () => {
  const r = migrateRoleContent(SAMPLE, sampleCtx());
  assert.match(r.content, /\*\*Reports To\*\* \| Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer --> \|/);
  assert.match(r.content, /\*\*Direct Reports\*\* \| None \|/);
  assert.equal(r.resolved.length, 1);
});

test('migrateRoleContent leaves everything else in the document unchanged', () => {
  const r = migrateRoleContent(SAMPLE, sampleCtx());
  assert.match(r.content, /## Role Overview\n\nText\./);
});

test('migrateRoleContent is idempotent', () => {
  const first = migrateRoleContent(SAMPLE, sampleCtx());
  const second = migrateRoleContent(first.content, sampleCtx());
  assert.equal(second.content, first.content);
  assert.deepEqual(second.resolved, []);
});

test('migrateRoleContent records an unresolved Reports To as a legacy entry', () => {
  const drifted = SAMPLE.replace('Kubernetes Senior Engineer', 'Some Drifted Title');
  const r = migrateRoleContent(drifted, sampleCtx());
  assert.equal(r.content, drifted);
  assert.deepEqual(r.legacy, [{ field: 'Reports To', text: 'Some Drifted Title' }]);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test test/relationship-annotations.test.js`
Expected: FAIL — `migrateRoleContent is not a function`

- [ ] **Step 3: Write the implementation**

```javascript
// append to scripts/lib/relationship-annotations.js, before module.exports

// Matches a metadata table row's value cell: group 1 is everything up to
// and including the opening "| **Field** | ", group 2 is the value, group 3
// is the trailing whitespace and closing pipe. Replacing only group 2 keeps
// the row's formatting untouched when nothing resolves.
function fieldRowPattern(name) {
  return new RegExp(`(\\|\\s*\\*\\*${name}\\*\\*\\s*\\|\\s*)([^|\\n]*?)(\\s*\\|)`);
}

function migrateTableField(content, name, ctx, resolved, legacy) {
  const pattern = fieldRowPattern(name);
  const match = content.match(pattern);
  if (!match) return content;

  const { text, resolved: fieldResolved, legacy: fieldLegacy } = annotateField(match[2], ctx);
  resolved.push(...fieldResolved);
  legacy.push(...fieldLegacy.map(entry => ({ field: name, text: entry })));

  if (text === match[2]) return content;
  return content.replace(pattern, `$1${text}$3`);
}

function migrateRoleContent(content, ctx) {
  const resolved = [];
  const legacy = [];
  let out = content;
  out = migrateTableField(out, 'Reports To', ctx, resolved, legacy);
  out = migrateTableField(out, 'Direct Reports', ctx, resolved, legacy);
  return { content: out, resolved, legacy };
}
```

Update `module.exports` to add `migrateRoleContent`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test test/relationship-annotations.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/relationship-annotations.js test/relationship-annotations.test.js
git commit -m "feat: migrate Reports To and Direct Reports table fields (#269)"
```

---

### Task 4: Extend migration to career-path bullets and the interactions table

**Files:**

- Modify: `scripts/lib/relationship-annotations.js`
- Test: `test/relationship-annotations.test.js`

**Interfaces:**

- Consumes: `annotateField` from Task 2; extends `migrateRoleContent` from Task 3 (same signature, no change to its contract).

- [ ] **Step 1: Write the failing tests**

```javascript
// append to test/relationship-annotations.test.js
const CAREER_AND_INTERACTIONS = [
  '# Kubernetes Engineer',
  '',
  '| Field | Value |',
  '|---|---|',
  '| **Role ID** | `kubernetes-engineer` |',
  '| **Reports To** | Kubernetes Senior Engineer |',
  '| **Direct Reports** | None |',
  '',
  '## Interactions with Other Roles',
  '',
  '| Role | Nature of Interaction | Interaction Mode |',
  '|---|---|---|',
  '| Kubernetes Senior Engineer | Escalation | Escalates To |',
  '| Board of Directors | Reporting | Provides To |',
  '',
  '## Career Development Path',
  '',
  '**Previous Roles:**',
  '',
  '- Kubernetes Senior Engineer',
  '',
  '**Potential Next Roles:**',
  '',
  '- Kubernetes Architect',
  '',
].join('\n');

function extendedCtx() {
  return {
    roleIndex: buildRoleIndex([
      { title: 'Kubernetes Engineer', roleId: 'kubernetes-engineer' },
      { title: 'Kubernetes Senior Engineer', roleId: 'kubernetes-senior-engineer' },
      { title: 'Kubernetes Architect', roleId: 'kubernetes-architect' },
    ]),
    externalTerms: new Set(['board of directors']),
  };
}

test('migrateRoleContent annotates the interactions table Role column', () => {
  const r = migrateRoleContent(CAREER_AND_INTERACTIONS, extendedCtx());
  assert.match(r.content, /\| Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer --> \| Escalation \| Escalates To \|/);
  assert.match(r.content, /\| Board of Directors <!-- external-role --> \| Reporting \| Provides To \|/);
});

test('migrateRoleContent annotates career-path bullets', () => {
  const r = migrateRoleContent(CAREER_AND_INTERACTIONS, extendedCtx());
  assert.match(r.content, /- Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer -->\n/);
  assert.match(r.content, /- Kubernetes Architect <!-- role: kubernetes-architect -->\n/);
});

test('migrateRoleContent leaves the interactions header row and separator untouched', () => {
  const r = migrateRoleContent(CAREER_AND_INTERACTIONS, extendedCtx());
  assert.match(r.content, /\| Role \| Nature of Interaction \| Interaction Mode \|/);
  assert.match(r.content, /\|---\|---\|---\|/);
});

test('a career-path bullet that does not resolve is left as legacy text', () => {
  const drifted = CAREER_AND_INTERACTIONS.replace('- Kubernetes Architect', '- Some Drifted Title');
  const r = migrateRoleContent(drifted, extendedCtx());
  assert.match(r.content, /- Some Drifted Title\n/);
  assert.ok(r.legacy.some(l => l.field === 'Career Development Path' && l.text === 'Some Drifted Title'));
});

test('the extended migration is idempotent', () => {
  const first = migrateRoleContent(CAREER_AND_INTERACTIONS, extendedCtx());
  const second = migrateRoleContent(first.content, extendedCtx());
  assert.equal(second.content, first.content);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test test/relationship-annotations.test.js`
Expected: FAIL — new assertions on interactions/career-path content don't match (function exists but doesn't touch those sections yet)

- [ ] **Step 3: Write the implementation**

```javascript
// append to scripts/lib/relationship-annotations.js, before module.exports

// Same boundary rule validate-roles.js uses for section bodies: a heading
// runs to the next "## " heading or end of document.
function sectionBody(content, headingPattern) {
  const start = content.search(headingPattern);
  if (start === -1) return null;
  const rest = content.slice(start);
  const next = rest.slice(1).search(/\n##\s+/);
  const end = next === -1 ? rest.length : next + 1;
  return { start, end: start + end, text: rest.slice(0, end) };
}

function migrateInteractionsTable(content, ctx, resolved, legacy) {
  const section = sectionBody(content, /^##\s+(Interactions with Other Roles|Relationships (&|and) Collaboration)/im);
  if (!section) return content;

  const lines = section.text.split('\n');
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip the header row and the "|---|---|---|" separator row.
    if (!/^\|/.test(line) || /^\|\s*Role\s*\|/.test(line) || /^\|[\s:|-]+\|$/.test(line)) continue;

    const cellMatch = line.match(/^(\|\s*)([^|]*?)(\s*\|.*)$/);
    if (!cellMatch) continue;

    const { text, resolved: cellResolved, legacy: cellLegacy } = annotateField(cellMatch[2], ctx);
    resolved.push(...cellResolved);
    legacy.push(...cellLegacy.map(entry => ({ field: 'Interactions with Other Roles', text: entry })));

    if (text !== cellMatch[2]) {
      lines[i] = `${cellMatch[1]}${text}${cellMatch[3]}`;
      changed = true;
    }
  }

  if (!changed) return content;
  const newSection = lines.join('\n');
  return content.slice(0, section.start) + newSection + content.slice(section.end);
}

function migrateCareerBullets(content, ctx, resolved, legacy) {
  const section = sectionBody(content, /^##\s+Career Development Path/im);
  if (!section) return content;

  const lines = section.text.split('\n');
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const bulletMatch = lines[i].match(/^(-\s+)(.+)$/);
    if (!bulletMatch) continue;

    const { text, resolved: itemResolved, legacy: itemLegacy } = annotateField(bulletMatch[2], ctx);
    resolved.push(...itemResolved);
    legacy.push(...itemLegacy.map(entry => ({ field: 'Career Development Path', text: entry })));

    if (text !== bulletMatch[2]) {
      lines[i] = `${bulletMatch[1]}${text}`;
      changed = true;
    }
  }

  if (!changed) return content;
  const newSection = lines.join('\n');
  return content.slice(0, section.start) + newSection + content.slice(section.end);
}
```

Update `migrateRoleContent` to call both new functions:

```javascript
function migrateRoleContent(content, ctx) {
  const resolved = [];
  const legacy = [];
  let out = content;
  out = migrateTableField(out, 'Reports To', ctx, resolved, legacy);
  out = migrateTableField(out, 'Direct Reports', ctx, resolved, legacy);
  out = migrateInteractionsTable(out, ctx, resolved, legacy);
  out = migrateCareerBullets(out, ctx, resolved, legacy);
  return { content: out, resolved, legacy };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test test/relationship-annotations.test.js`
Expected: PASS (full file, all tasks so far)

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/relationship-annotations.js test/relationship-annotations.test.js
git commit -m "feat: migrate career-path bullets and interactions table (#269)"
```

---

### Task 5: Read-only audit of unresolved relationship terms

**Files:**

- Create: `scripts/audit-relationship-terms.js`
- Test: `test/audit-relationship-terms.test.js`

**Interfaces:**

- Consumes: `buildRoleIndex`, `normalizeTitle`, `annotateField` from `scripts/lib/relationship-annotations.js`.
- Produces: `collectUnresolvedTerms(roles: {title, roleId, fields: {reportsTo, directReports, careerBullets: string[], interactionRoles: string[]}}[], externalTerms: Set<string>): Map<string, number>` (unresolved text → occurrence count, sorted by count descending when read via `[...map]`), and a CLI (`roleFiles`, `run`) that walks `Roles/`, extracts the four field shapes per file, and prints the map.

This mirrors `relationship-report.js`'s split between a pure, testable
`buildGraph`-equivalent and an untested CLI wrapper — see that file for the
walking/extraction pattern to follow for `roleFiles` and field extraction
(`Reports To` / `Direct Reports` via the same table-row regex; career
bullets and interaction rows via the same section-boundary approach as
Task 4's `sectionBody`).

- [ ] **Step 1: Write the failing tests**

```javascript
// test/audit-relationship-terms.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { collectUnresolvedTerms } = require('../scripts/audit-relationship-terms.js');

test('collectUnresolvedTerms counts text that does not resolve to a catalogue role or external term', () => {
  const roles = [
    {
      title: 'Kubernetes Engineer',
      roleId: 'kubernetes-engineer',
      fields: { reportsTo: 'Some Drifted Title', directReports: 'None', careerBullets: [], interactionRoles: [] },
    },
    {
      title: 'Kubernetes Senior Engineer',
      roleId: 'kubernetes-senior-engineer',
      fields: { reportsTo: 'Some Drifted Title', directReports: 'None', careerBullets: ['Some Drifted Title'], interactionRoles: [] },
    },
  ];
  const result = collectUnresolvedTerms(roles, new Set());
  assert.equal(result.get('Some Drifted Title'), 3);
});

test('collectUnresolvedTerms excludes text that resolves to a catalogue title', () => {
  const roles = [
    { title: 'Kubernetes Engineer', roleId: 'kubernetes-engineer', fields: { reportsTo: 'Kubernetes Senior Engineer', directReports: 'None', careerBullets: [], interactionRoles: [] } },
    { title: 'Kubernetes Senior Engineer', roleId: 'kubernetes-senior-engineer', fields: { reportsTo: 'None', directReports: 'None', careerBullets: [], interactionRoles: [] } },
  ];
  const result = collectUnresolvedTerms(roles, new Set());
  assert.equal(result.size, 0);
});

test('collectUnresolvedTerms excludes text that resolves to a curated external term', () => {
  const roles = [
    { title: 'Kubernetes Engineer', roleId: 'kubernetes-engineer', fields: { reportsTo: 'Board of Directors', directReports: 'None', careerBullets: [], interactionRoles: [] } },
  ];
  const result = collectUnresolvedTerms(roles, new Set(['board of directors']));
  assert.equal(result.size, 0);
});

test('collectUnresolvedTerms ignores an "or" choice where every side resolves', () => {
  const roles = [
    { title: 'A', roleId: 'a', fields: { reportsTo: 'B or C', directReports: 'None', careerBullets: [], interactionRoles: [] } },
    { title: 'B', roleId: 'b', fields: { reportsTo: 'None', directReports: 'None', careerBullets: [], interactionRoles: [] } },
    { title: 'C', roleId: 'c', fields: { reportsTo: 'None', directReports: 'None', careerBullets: [], interactionRoles: [] } },
  ];
  const result = collectUnresolvedTerms(roles, new Set());
  assert.equal(result.size, 0);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test test/audit-relationship-terms.test.js`
Expected: FAIL — `Cannot find module '../scripts/audit-relationship-terms.js'`

- [ ] **Step 3: Write the implementation**

```javascript
// scripts/audit-relationship-terms.js
'use strict';

// Read-only inventory of relationship text that neither resolves to a
// catalogue title nor matches the curated external-terms list (#269). Run
// this before extending scripts/lib/external-role-terms.js, so the list is
// built from evidence in the catalogue rather than guessed at. This never
// edits a file.

const fs = require('node:fs');
const path = require('node:path');
const { buildRoleIndex, annotateField } = require('./lib/relationship-annotations.js');

const ROLES_DIR = path.resolve(__dirname, '..', 'Roles');

function roleFiles(dir = ROLES_DIR, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) roleFiles(full, out);
    else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(full);
  }
  return out;
}

function fieldValue(text, name) {
  const m = text.match(new RegExp(`\\|\\s*\\*\\*${name}\\*\\*\\s*\\|\\s*([^|\\n]*)`));
  return m ? m[1].trim() : null;
}

function sectionBody(content, headingPattern) {
  const start = content.search(headingPattern);
  if (start === -1) return '';
  const rest = content.slice(start);
  const next = rest.slice(1).search(/\n##\s+/);
  return next === -1 ? rest : rest.slice(0, next + 1);
}

function extractFields(text) {
  const careerSection = sectionBody(text, /^##\s+Career Development Path/im);
  const careerBullets = [...careerSection.matchAll(/^-\s+(.+)$/gm)].map(m => m[1]);

  const interactionsSection = sectionBody(text, /^##\s+(Interactions with Other Roles|Relationships (&|and) Collaboration)/im);
  const interactionRoles = [...interactionsSection.matchAll(/^\|\s*([^|]+?)\s*\|/gm)]
    .map(m => m[1])
    .filter(cell => cell && cell !== 'Role' && !/^[-:\s]+$/.test(cell));

  return {
    reportsTo: fieldValue(text, 'Reports To'),
    directReports: fieldValue(text, 'Direct Reports'),
    careerBullets,
    interactionRoles,
  };
}

function loadRoles(dir = ROLES_DIR) {
  return roleFiles(dir).map(file => {
    const text = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
    const title = (text.match(/^#\s+(.+)$/m) || [])[1];
    const roleId = (text.match(/\|\s*\*\*Role ID\*\*\s*\|\s*`([^`]+)`/) || [])[1];
    return { file, title: title && title.trim(), roleId, fields: extractFields(text) };
  }).filter(r => r.title);
}

function collectUnresolvedTerms(roles, externalTerms) {
  const roleIndex = buildRoleIndex(roles.filter(r => r.roleId).map(r => ({ title: r.title, roleId: r.roleId })));
  const ctx = { roleIndex, externalTerms };
  const counts = new Map();

  const record = text => counts.set(text, (counts.get(text) || 0) + 1);

  for (const role of roles) {
    const { reportsTo, directReports, careerBullets, interactionRoles } = role.fields;
    for (const value of [reportsTo, directReports]) {
      if (!value) continue;
      const { legacy } = annotateField(value, ctx);
      legacy.forEach(record);
    }
    for (const bullet of careerBullets) {
      const { legacy } = annotateField(bullet, ctx);
      legacy.forEach(record);
    }
    for (const cell of interactionRoles) {
      const { legacy } = annotateField(cell, ctx);
      legacy.forEach(record);
    }
  }

  return new Map([...counts].sort((a, b) => b[1] - a[1]));
}

function run() {
  const roles = loadRoles();
  const counts = collectUnresolvedTerms(roles, new Set());
  console.log(`${roles.length} roles scanned.\n`);
  console.log('Unresolved relationship text (not a catalogue title, not a curated external term):\n');
  for (const [text, count] of counts) {
    console.log(`  ${String(count).padStart(4)}  ${text}`);
  }
}

if (require.main === module) run();

module.exports = { collectUnresolvedTerms, loadRoles, extractFields };
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test test/audit-relationship-terms.test.js`
Expected: PASS (4 tests)

- [ ] **Step 5: Run the audit against the live catalogue and read the output**

Run: `node scripts/audit-relationship-terms.js`

This output is the input to Task 6 — read it before writing
`external-role-terms.js` so the curated list reflects what is actually in
the catalogue.

- [ ] **Step 6: Commit**

```bash
git add scripts/audit-relationship-terms.js test/audit-relationship-terms.test.js
git commit -m "feat: add read-only audit of unresolved relationship terms (#269)"
```

---

### Task 6: Curated external terms and the migration CLI

**Files:**

- Create: `scripts/lib/external-role-terms.js`
- Create: `scripts/migrate-relationship-annotations.js`
- Test: `test/migrate-relationship-annotations.test.js`

**Interfaces:**

- Consumes: `migrateRoleContent` from Task 4, `Task 5`'s audit output (read by a human before this task, not by code).
- Produces: `EXTERNAL_TERMS: string[]` (exported from `external-role-terms.js`), and a CLI entry point in `migrate-relationship-annotations.js` with a `--write` flag, following `backfill-role-ids.js`'s `run({ write })` shape.

- [ ] **Step 1: Write `external-role-terms.js`**

Seed this list from ADR-0006's own examples and the terms
`scripts/relationship-report.js`'s `EXTERNAL` regex already treats as
outside the catalogue, then extend it with whatever Task 5's audit output
showed as a clearly-external, recurring, non-catalogue term (do this by
hand, reading the real audit output — do not guess at entries that are not
either in this seed list or confirmed by the audit).

```javascript
// scripts/lib/external-role-terms.js
'use strict';

// Curated, exact-match destinations that are legitimately outside the
// catalogue (#269). Every entry here must be a term actually observed in
// Roles/ and confirmed — via scripts/audit-relationship-terms.js — to name
// something outside the catalogue, not a guess at a pattern. Extend this
// list by re-running the audit script and adding what it surfaces.

const EXTERNAL_TERMS = [
  'CEO',
  'CFO',
  'CIO',
  'CISO',
  'CTO',
  'SVP',
  'Board',
  'Board of Directors',
  'Executive',
  'Managing Director',
  'Chief AI Officer',
  'Chief AI Officer (CAIO)',
  'Chief Risk Officer',
  'Regulators',
  'Vendors',
  'People Operations',
  'Legal',
  'Legal and Compliance',
  'HR',
  'Customers',
  'Product Teams',
];

module.exports = { EXTERNAL_TERMS };
```

- [ ] **Step 2: Write the failing CLI test**

```javascript
// test/migrate-relationship-annotations.test.js
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
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `node --test test/migrate-relationship-annotations.test.js`
Expected: FAIL — `Cannot find module '../scripts/migrate-relationship-annotations.js'`

- [ ] **Step 4: Write `migrate-relationship-annotations.js`**

```javascript
// scripts/migrate-relationship-annotations.js
'use strict';

// Applies the ADR-0006 annotation syntax to Reports To, Direct Reports,
// career-path bullets, and the interactions table (#269). Dry-run by
// default; pass --write to apply. Idempotent: re-running with --write
// after a clean run changes no files. Mirrors backfill-role-ids.js's
// structure — BOM/CRLF preservation, per-file compare-and-skip.

const fs = require('node:fs');
const path = require('node:path');
const { buildRoleIndex, migrateRoleContent, normalizeTitle } = require('./lib/relationship-annotations.js');
const { EXTERNAL_TERMS } = require('./lib/external-role-terms.js');

const ROLES_DIR = process.env.ROLES_DIR
  ? path.resolve(process.env.ROLES_DIR)
  : path.resolve(__dirname, '..', 'Roles');

function roleFiles(dir = ROLES_DIR, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) roleFiles(full, out);
    else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(full);
  }
  return out;
}

function loadRoleIndex(files) {
  const roles = [];
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
    const title = (text.match(/^#\s+(.+)$/m) || [])[1];
    const roleId = (text.match(/\|\s*\*\*Role ID\*\*\s*\|\s*`([^`]+)`/) || [])[1];
    if (title && roleId) roles.push({ title: title.trim(), roleId });
  }
  return buildRoleIndex(roles);
}

function run({ write }) {
  const files = roleFiles();
  const roleIndex = loadRoleIndex(files);
  const externalTerms = new Set(EXTERNAL_TERMS.map(normalizeTitle));
  const ctx = { roleIndex, externalTerms };

  let filesChanged = 0;
  const kindCounts = { role: 0, external: 0, 'one-of': 0 };
  const legacyEntries = [];

  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const hadBom = original.startsWith('﻿');
    const hadCrlf = original.includes('\r\n');
    const body = original.replace(/^﻿/, '').replace(/\r\n/g, '\n');

    const { content, resolved, legacy } = migrateRoleContent(body, ctx);
    for (const item of resolved) kindCounts[item.kind] = (kindCounts[item.kind] || 0) + 1;
    for (const item of legacy) legacyEntries.push({ file, ...item });

    if (content === body) continue;
    filesChanged++;

    if (write) {
      const out = (hadBom ? '﻿' : '') + (hadCrlf ? content.replace(/\n/g, '\r\n') : content);
      fs.writeFileSync(file, out, 'utf8');
    }
  }

  console.log(`${write ? 'Annotated' : 'Would annotate'} relationships in ${filesChanged} file(s).`);
  console.log(`  role: ${kindCounts.role || 0}   external: ${kindCounts.external || 0}   one-of: ${kindCounts['one-of'] || 0}`);
  if (legacyEntries.length) {
    console.log(`\n${legacyEntries.length} unresolved reference(s) left as legacy text — run scripts/audit-relationship-terms.js for the full breakdown.`);
  }
}

if (require.main === module) run({ write: process.argv.includes('--write') });

module.exports = { run, loadRoleIndex, roleFiles };
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `node --test test/migrate-relationship-annotations.test.js`
Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/external-role-terms.js scripts/migrate-relationship-annotations.js test/migrate-relationship-annotations.test.js
git commit -m "feat: add curated external terms and migration CLI (#269)"
```

---

### Task 7: Run the migration across the catalogue in batches

**Files:**

- Modify: files under `Roles/` (all 33 domain subfolders, applied in batches).
- Modify: `scripts/lib/external-role-terms.js` (only if the live audit surfaces a new recurring external term).
- Create: a legacy-exceptions record (see Step 4).

This task is operational, not code-writing: it runs the tools built in
Tasks 1–6 against the real catalogue. Each domain folder is one reviewable
batch, gated on the same two commands the acceptance criteria name.

- [ ] **Step 1: Re-run the audit against the live catalogue**

Run: `node scripts/audit-relationship-terms.js`

Read the full output. For any term that appears many times and is clearly
external (not a typo or paraphrase of a catalogue role), add it to
`scripts/lib/external-role-terms.js`. Re-run the audit to confirm the
addition removed those entries from the unresolved list. Commit if the
file changed:

```bash
git add scripts/lib/external-role-terms.js
git commit -m "feat: extend curated external terms from live catalogue audit (#269)"
```

- [ ] **Step 2: Migrate one domain folder at a time**

For each folder listed by `ls Roles/` (33 folders: `ai_governance`,
`app_platforms`, `c_suite`, `client_platform`, `cloud_platforms`,
`data_engineering`, `data_management`, `data_protection`,
`database_management`, `devops`, `directory_services`,
`endpoint_management`, `enterprise_architecture`, `finops`,
`infrastructure_onboarding_cross_platform`, `integration_middleware`,
`itsm_configuration`, `kubernetes`, `leadership`, `modern_infrastructure`,
`modern_workplace`, `network`, `quality_engineering`, `security`,
`security_cross_platform`, `security_identity`, `server_hardware`,
`server_hardware_hpe`, `server_os_linux`, `server_os_windows`,
`service_desk`, `service_management`, `specialized_computing`,
`virtualization`), run this loop body. The tool always scans the whole
`Roles/` tree (it is cheap and re-runs are no-ops on already-migrated
files), so "one folder at a time" means: run it, then stage and commit only
that folder's changed files.

```bash
node scripts/migrate-relationship-annotations.js --write
npm run validate
npm test
git add Roles/<folder>/
git status --short Roles/  # confirm no other folder has unstaged changes left uncommitted from this run
git commit -m "feat: migrate Roles/<folder> relationship annotations (#269)"
```

If `npm run validate` or `npm test` fails after a folder's batch, stop and
fix the cause before continuing — do not proceed to the next folder with a
failing tree. A failure here most likely means a corner case in
`migrateRoleContent` that Tasks 1–4's tests didn't cover; add a regression
test for it in `test/relationship-annotations.test.js` before moving on.

Repeat for all 33 folders.

- [ ] **Step 3: Confirm the migration is idempotent end-to-end**

```bash
node scripts/migrate-relationship-annotations.js --write
git status --short Roles/
```

Expected: no output from `git status` — the tree is unchanged, matching the
acceptance criterion "re-running the migration changes no files."

- [ ] **Step 4: Record remaining legacy references as deliberate exceptions**

```bash
node scripts/audit-relationship-terms.js > docs/superpowers/plans/2026-08-20-relationship-annotation-legacy-exceptions.txt
```

Add one sentence above the captured output in that file explaining what it
is (the catalogue's unresolved relationship references as of this
migration, each a deliberate exception rather than an oversight) and commit
it. This satisfies the acceptance criterion that every reference is
"migrated or recorded as deliberate exceptions."

```bash
git add docs/superpowers/plans/2026-08-20-relationship-annotation-legacy-exceptions.txt
git commit -m "docs: record remaining relationship legacy exceptions after migration (#269)"
```

- [ ] **Step 5: Full validation pass**

```bash
npm run validate
npm test
```

Expected: both exit 0.

---

## Self-Review Notes

- **Spec coverage:** every acceptance criterion in #269 maps to a task —
  idempotent tool (Tasks 1–6, idempotency tests + Task 7 Step 3), explicit
  external/one-of without guessing (Task 1–2's resolution rules), all four
  field shapes migrated (Tasks 3–4), migrated-or-exception (Task 7 Step 4),
  validation/tests pass per batch (Task 7 Step 2).
- **Not in scope, by design:** #270 owns parser enforcement (rejecting
  legacy/malformed text) and viewer graph consumption. This plan's
  `relationship-annotations.js` only ever adds valid annotations; it does
  not need to detect or reject invalid ones, since it never produces them
  and never rewrites text it cannot positively resolve.
