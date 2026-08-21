# Relationship validation and viewer enforcement (#270)

- **Status:** Draft
- **Date:** 2026-08-21
- **Issue:** #270 (parent: #180; depends on #269's migration and ADR-0006)

## Problem

#269 gave relationship-bearing fields (`Reports To`, `Direct Reports`,
career-path bullets, the interactions table) stable-ID annotations, but
nothing yet enforces or consumes that model. `validate-roles.js` still only
checks presence/format of these fields, with no awareness of resolution,
cycles, or contradictions. The viewer still resolves annotated text by
stripping the annotation and re-matching by fuzzy title
(`findRoleByTitle`'s trailing-paren-strip / lowercase / trailing-`s`-strip
normalizer) — exactly the heuristic the annotations exist to replace. The
per-role Interactions table has no dedicated parser at all; its annotations
silently vanish through generic `marked`+`DOMPurify` rendering.

## Goal

One shared parser reads the ADR-0006 annotation syntax back into structured
data. Validation uses it to catch what title-matching never could:
unresolved IDs (a role was deleted or renamed without updating references),
self-references, reporting cycles, and contradictory reporting pairs.
Viewer relationship displays — `Reports To`/`Direct Reports` chips, the
career-path stepper, and the per-role interactions table — resolve through
that same parsed model instead of fuzzy title matching.

## Non-goals

- The domain-level "graph" panel and career sankey (`parseInteractions`,
  `buildCareerSankey`, `parseProgressionLadders`, `parseMobilityPaths`)
  read entirely separate documents
  (`docs/CROSS_DOMAIN_INTERACTIONS.md`, `docs/SKILLS_PROGRESSION.md`) with
  their own domain-level `(external)` convention. ADR-0006's per-role
  annotations don't touch that data model; this issue doesn't either.
- `buildOrgTree` (the org-chart panel) is built from `role.level` and
  chapter/domain configuration, not from `Reports To` text. It already
  doesn't use title heuristics for relationships and needs no change.
- Resolving #299 (the 14 unmigrated `Reports To` alternatives) is separate,
  tracked work. This issue's validator must not break on that legacy text —
  it stays legacy, handled by the existing fallback path.

## Architecture

### `scripts/lib/relationship-annotations.js`: `parseRelationshipField`

A new read-side function, added to the same canonical module #269 built.
Given already-annotated field text, it returns ADR-0006's own "Parsed
model" shape exactly:

```js
[
  { kind: 'catalogue', roleId: 'cloud-platform-architect', label: 'Cloud Platform Architect' },
  { kind: 'external', label: 'Board of Directors' },
  { kind: 'one-of', options: [
      { kind: 'catalogue', roleId: 'technical-area-lead', label: 'Technical Area Lead' },
      { kind: 'catalogue', roleId: 'product-area-lead', label: 'Product Area Lead' },
    ] },
  { kind: 'legacy', text: 'Some unannotated text' },
]
```

This is pure extraction from the annotation comments already present in the
text — it needs no `roleIndex` to parse (the ID is embedded), which is what
makes it small and safe enough to mirror into the browser, unlike the
write-side `annotateField`/`buildOneOf` machinery. It also enforces
ADR-0006's "Invalid states" list at parse time, returning a syntax-error
marker (`{ kind: 'invalid', reason, text }`) for: a target with both `role`
and `external-role` annotations, an annotation without a visible label, an
unclosed or nested `one-of`, a `one-of` with fewer than two options or an
unannotated option, and `None` combined with any other target or qualifier.

### `validate-roles.js`: catalogue-wide relationship checks

A new function, `findRelationshipIssues(rolesDir)`, following the existing
pattern of `findDuplicateRoleIds`/`findDuplicateTitles` (catalogue-wide,
called once from `main()`, not per-file). It builds a `roleId → role` index
from every file's `Role ID` metadata, then for every role's `Reports To`,
`Direct Reports`, career-path bullets, and interactions-table cells:

- **Invalid syntax** (from `parseRelationshipField`'s `kind: 'invalid'`
  markers) → **error**, naming the file, field, and reason.
- **Unresolved catalogue ID** — a `kind: 'catalogue'` entry whose `roleId`
  isn't in the index → **error**. This is the deletion-failure case: a role
  was removed or renamed without updating what pointed at it.
- **Self-reference** — a role's own `Reports To` resolves (`kind:
  'catalogue'`) to its own `roleId` → **error**.
- **Reporting cycles** — a directed graph over every role's `Reports To`,
  edges added only for a single, unambiguous `kind: 'catalogue'` entry (a
  `one-of` doesn't commit to one parent, so it's excluded — including it
  would produce false cycles on legitimate alternatives). DFS for cycles
  → **error**, reporting the full chain (e.g. `A → B → C → A`).
- **Contradictory reporting pairs** — for role A whose `Reports To`
  resolves unambiguously to role P: if P's `Direct Reports` is itself
  annotated (contains any `kind: 'catalogue'` entries) and does not include
  A's `roleId` among them → **error** (both sides opted into structured
  data and disagree — provable, not a guess). If P's `Direct Reports` is
  legacy/prose text and doesn't mention A's title anywhere in it →
  **warning** only (heuristic, same non-blocking tier as the catalogue's
  existing KPI-target and review-status warnings) — this is deliberately
  not a hard error, since prose Direct Reports fields commonly summarize
  rather than enumerate.
- **Stale label** — a `kind: 'catalogue'` entry's visible `label` no longer
  matches its target's current title (a rename happened after the
  annotation was written) → **warning**, per ADR-0006's own guidance:
  "consumers may display the catalogue's current title and report a stale
  label separately."

### Viewer: `server.js` and `viewer-logic.js`

`server.js`'s `getRoles()` gains one field per role in the `domains`
payload: `roleId` (already parsed by `parseMeta`, currently discarded).
This lets the browser build a `roleId → role` map alongside the existing
title-based one.

`viewer-logic.js`:

- `splitReportingValue` and `parseCareerPath` route through a mirrored
  `parseRelationshipField` (same documented, test-enforced-equivalence
  pattern as `stripAnnotations`) instead of raw `stripAnnotations`-then-
  regex-split. A `kind: 'catalogue'` entry resolves via the new `roleId`
  map — deterministic, rename-proof. A `kind: 'external'` entry renders as
  plain text, never a link. A `kind: 'one-of'` entry renders each option
  individually (linked where it resolves). A `kind: 'legacy'` entry falls
  back to today's `findRoleByTitle` fuzzy match — unchanged behavior for
  anything not yet migrated.
- New: the per-role Interactions table gets a dedicated renderer, following
  the shape of `parseCareerPath`'s table-walk. Instead of handing the whole
  section to `marked`+`DOMPurify` unmodified, the Role-column cell of each
  row is resolved the same way and re-rendered with a link/plain-text/
  one-of-group as appropriate; the rest of the row (Nature of Interaction,
  Interaction Mode) renders unchanged.

## Testing

- Unit tests for `parseRelationshipField` covering every ADR-0006 example
  and every invalid-state case, in `test/relationship-annotations.test.js`
  alongside the existing write-side tests.
- Unit tests for `findRelationshipIssues` in `test/validate-roles.test.js`,
  using the existing fixture-tree pattern: unresolved ID, self-reference, a
  2-role cycle and a 3-role cycle, a contradictory annotated pair, a
  legacy-Direct-Reports warning case, and a stale-label warning case.
- Rename-stability test: a fixture role's H1 title changes, its `Role ID`
  does not — resolution still succeeds, no error, a stale-label warning
  appears if the annotation's visible text wasn't also updated.
- Deletion-failure test: a fixture role file is removed while another
  role's annotation still references its `roleId` — validator errors.
- Browser journeys (`test/browser/catalogue.spec.js` or a new spec):
  clicking a resolved catalogue link opens the target role; an external
  destination renders as plain text with no link; a `one-of` group renders
  both options, each independently clickable/plain as appropriate.

## Acceptance mapping (from #270)

- One shared parser resolves catalogue/external/alternative kinds →
  `parseRelationshipField`.
- Validation rejects unresolved IDs, self-references, cycles, contradictory
  pairs → `findRelationshipIssues`.
- Organisational, career, and relationship views consume the verified model
  → `viewer-logic.js`'s `splitReportingValue`/`parseCareerPath`/new
  interactions renderer, all via `roleId` resolution.
- Tests prove renames stay valid and deletions fail → rename-stability and
  deletion-failure tests above.
- Browser journeys cover catalogue/external/alternative destinations →
  browser journeys above.
