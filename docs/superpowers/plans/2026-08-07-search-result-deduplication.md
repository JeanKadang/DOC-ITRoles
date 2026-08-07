# Search Result Deduplication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show an exact role-title search result only once while retaining other content references and preferring narrative search snippets.

**Architecture:** Keep `/api/search` general-purpose and reconcile exact-title duplicates in the browser through a pure helper in `viewer-logic.js`. Select snippet positions on the server with a second pure helper that prefers matches after the first level-two Markdown heading and falls back to the first document-wide match.

**Tech Stack:** Node.js 18+, browser JavaScript, CommonJS/UMD modules, built-in `node:test` and `assert`.

## Global Constraints

- Exact-title normalization trims surrounding whitespace, collapses internal whitespace, and compares case-insensitively.
- Do not use fuzzy matching, stemming, or partial-title matching for deduplication.
- Keep `/api/search` result membership and response fields unchanged.
- Keep other roles that mention the exact title in the content-reference group.
- Keep the sidebar count separate from the post-reconciliation content-reference count.
- Preserve the current keyboard, screen-reader, debounce, stale-response, short-query, and error-state behavior.
- The server returns plain-text snippets; the viewer remains responsible for HTML escaping.

---

## File Structure

- `viewer-logic.js`: owns the new pure content-reference reconciliation helper and exports it to browser and tests.
- `test/viewer-logic.test.js`: verifies exact-title normalization, retention of other references, and safe non-array input.
- `index.html`: applies reconciliation immediately after the API response and before the rendered count/empty state.
- `server.js`: owns and uses the pure preferred-match-index helper for snippet selection.
- `test/server.test.js`: verifies narrative preference, metadata fallback, and unchanged API membership.

### Task 1: Reconcile exact-title content references in the viewer

**Files:**

- Modify: `viewer-logic.js`
- Modify: `test/viewer-logic.test.js`
- Modify: `index.html`

**Interfaces:**

- Consumes: API match objects shaped as `{ file, title, level, domain, inTitle, snippet }` and a string query.
- Produces: `contentReferencesForQuery(matches, query) -> Array`, returning a new array whose only omitted items have a normalized title equal to the normalized query.

- [ ] **Step 1: Import the planned helper and add failing pure-logic tests**

Add `contentReferencesForQuery` to the destructuring import at the top of `test/viewer-logic.test.js`, then add:

```js
test('contentReferencesForQuery removes only an exact normalized title match', () => {
    const exact = { title: 'Kubernetes Architect', file: 'exact.md' };
    const reference = { title: 'Platform Architect', file: 'reference.md' };
    const matches = [exact, reference];

    assert.deepEqual(
        contentReferencesForQuery(matches, '  KUBERNETES   architect  '),
        [reference],
    );
});

test('contentReferencesForQuery retains partial-title and unrelated matches', () => {
    const matches = [
        { title: 'Kubernetes Architect', file: 'architect.md' },
        { title: 'Kubernetes Engineer', file: 'engineer.md' },
    ];

    assert.deepEqual(contentReferencesForQuery(matches, 'Kubernetes'), matches);
});

test('contentReferencesForQuery safely handles missing collections', () => {
    assert.deepEqual(contentReferencesForQuery(undefined, 'Kubernetes Architect'), []);
    assert.deepEqual(contentReferencesForQuery(null, 'Kubernetes Architect'), []);
});
```

- [ ] **Step 2: Run the focused tests and verify the missing export fails**

Run: `node --test test/viewer-logic.test.js`

Expected: FAIL because `contentReferencesForQuery` is not defined/exported.

- [ ] **Step 3: Implement and export the minimal pure helper**

Add near the existing filter helpers in `viewer-logic.js`:

```js
function normalizedSearchText(value) {
    return String(value == null ? '' : value)
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase();
}

function contentReferencesForQuery(matches, query) {
    const items = Array.isArray(matches) ? matches : [];
    const queryKey = normalizedSearchText(query);
    if (!queryKey) return items.slice();
    return items.filter(match => normalizedSearchText(match && match.title) !== queryKey);
}
```

Add `contentReferencesForQuery` to the returned export object. Keep `normalizedSearchText` private because no other module needs it.

- [ ] **Step 4: Run the focused tests and verify they pass**

Run: `node --test test/viewer-logic.test.js`

Expected: all viewer-logic tests PASS.

- [ ] **Step 5: Apply the helper at the viewer boundary**

Add `contentReferencesForQuery` to the `ViewerLogic` destructuring declaration in `index.html`. In `runContentSearch`, directly after parsing the JSON response, reconcile the collection:

```js
({ matches } = await res.json());
matches = contentReferencesForQuery(matches, q);
```

Do not alter the later empty state, count, rendering markup, `role="button"`, `tabindex="0"`, data attributes, or keyboard event handling. Those paths should consume the reconciled array unchanged.

- [ ] **Step 6: Run focused and full tests**

Run: `node --test test/viewer-logic.test.js`

Expected: PASS.

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 7: Commit the independently testable viewer change**

```powershell
git add -- viewer-logic.js test/viewer-logic.test.js index.html
git commit -m "fix: deduplicate exact search titles"
```

### Task 2: Prefer narrative content when generating snippets

**Files:**

- Modify: `server.js`
- Modify: `test/server.test.js`

**Interfaces:**

- Consumes: Markdown text and the normalized lowercase query already produced by `searchRoles`.
- Produces: `preferredSearchMatchIndex(text, query) -> number`, returning the first narrative occurrence, otherwise the first document-wide occurrence, otherwise `-1`.

- [ ] **Step 1: Import the planned helper and add failing snippet tests**

Change the server import in `test/server.test.js` to:

```js
const { server, preferredSearchMatchIndex } = require('../server.js');
```

Add:

```js
test('preferredSearchMatchIndex skips heading and metadata for a narrative match', () => {
  const markdown = [
    '# Kubernetes Architect',
    '',
    '| Related Role | Kubernetes Architect |',
    '',
    '## Purpose',
    '',
    'Partners with the Kubernetes Architect on platform direction.',
  ].join('\n');

  const idx = preferredSearchMatchIndex(markdown, 'kubernetes architect');
  assert.ok(idx > markdown.indexOf('## Purpose'));
  assert.equal(markdown.slice(idx, idx + 'Kubernetes Architect'.length), 'Kubernetes Architect');
});

test('preferredSearchMatchIndex falls back to a metadata-only match', () => {
  const markdown = [
    '# Platform Engineer',
    '',
    '| Primary Tool | Terraform |',
    '',
    '## Purpose',
    '',
    'Builds reliable internal platforms.',
  ].join('\n');

  assert.equal(
    preferredSearchMatchIndex(markdown, 'terraform'),
    markdown.toLowerCase().indexOf('terraform'),
  );
});
```

Extend the existing API coverage with:

```js
test('GET /api/search retains an exact-title match for API consumers', async () => {
  const res = await request('/api/search?q=' + encodeURIComponent('Kubernetes Architect'));
  const { matches } = JSON.parse(res.body);
  assert.ok(matches.some(m => m.title === 'Kubernetes Architect'));
});
```

- [ ] **Step 2: Run the server tests and verify the missing export fails**

Run: `node --test test/server.test.js`

Expected: FAIL because `preferredSearchMatchIndex` is not defined/exported.

- [ ] **Step 3: Implement the preferred index helper**

Add before `makeSnippet` in `server.js`:

```js
function preferredSearchMatchIndex(text, query) {
  const source = String(text == null ? '' : text);
  const q = String(query == null ? '' : query).toLowerCase();
  if (!q) return -1;

  const lower = source.toLowerCase();
  const first = lower.indexOf(q);
  if (first === -1) return -1;

  const narrativeStart = source.search(/^##\s+/m);
  if (narrativeStart !== -1) {
    const narrative = lower.indexOf(q, narrativeStart);
    if (narrative !== -1) return narrative;
  }
  return first;
}
```

In `searchRoles`, replace the first document-wide body index calculation with:

```js
const bodyIdx = preferredSearchMatchIndex(e.text, q);
```

Keep membership, `inTitle`, sorting, response fields, and `makeSnippet` unchanged. Add `preferredSearchMatchIndex` to `module.exports`.

- [ ] **Step 4: Run server tests and verify they pass**

Run: `node --test test/server.test.js`

Expected: all server tests PASS.

- [ ] **Step 5: Run the full suite**

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 6: Commit the independently testable server change**

```powershell
git add -- server.js test/server.test.js
git commit -m "fix: prefer narrative search snippets"
```

### Task 3: Verify #182 acceptance criteria and branch hygiene

**Files:**

- Verify only; no planned source changes.

**Interfaces:**

- Consumes: the completed changes from Tasks 1 and 2.
- Produces: fresh test, validation, count, whitespace, and branch-scope evidence suitable for a pull request.

- [ ] **Step 1: Run all automated tests**

Run: `npm test`

Expected: all tests PASS with 0 failures.

- [ ] **Step 2: Validate the role catalogue**

Run: `npm run validate`

Expected: exit code 0. Existing catalogue warnings may remain; no new errors may be introduced.

- [ ] **Step 3: Verify generated catalogue counts**

Run: `npm run check-counts`

Expected: exit code 0 and committed counts match generated counts.

- [ ] **Step 4: Check whitespace and scope**

Run: `git diff origin/main...HEAD --check`

Expected: no output and exit code 0.

Run: `git status --short --branch`

Expected: clean `codex/182-search-deduplication` branch with only intentional commits ahead of `origin/main`.

Run: `git diff --stat origin/main...HEAD`

Expected: only the approved specification, this plan, `viewer-logic.js`, `test/viewer-logic.test.js`, `index.html`, `server.js`, and `test/server.test.js` are changed.

- [ ] **Step 5: Review the final diff against #182**

Confirm each item explicitly:

```text
[ ] Exact-title role appears only in the sidebar result list.
[ ] Other roles mentioning the exact title remain in Content matches.
[ ] Sidebar and content-reference counts remain distinct.
[ ] Narrative snippets are preferred, with metadata fallback.
[ ] Empty, short, partial, mixed, and exact queries retain defined behavior.
[ ] Existing accessible markup and keyboard behavior are unchanged.
[ ] /api/search remains backward-compatible.
```

If verification requires a correction, return to the relevant task, add or adjust a failing regression test first, make the minimal fix, rerun that task's focused tests, and commit the correction with a specific `fix:` message.
