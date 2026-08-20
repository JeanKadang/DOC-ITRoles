# Relationship annotation migration (#269)

- **Status:** Draft
- **Date:** 2026-08-20
- **Issue:** #269 (parent: #180; depends on ADR-0006, #268/#275; blocks #270)

## Problem

`Reports To`, `Direct Reports`, career-path bullets, and interaction-table rows
carry mutable role titles even though every role now has a stable `Role ID`
(ADR-0005). ADR-0006 defines the target representation — human-readable
labels annotated with hidden HTML-comment references — but nothing in the
catalogue has been migrated to it yet. Until migration runs, stable IDs give
no relationship integrity: a rename still breaks references silently.

## Goal

Build one idempotent migration tool that converts resolvable title
relationships to the ADR-0006 representation, run it across the catalogue in
reviewable batches, and leave everything it cannot confidently resolve as
unannotated legacy text for manual follow-up — never guessing.

## Non-goals

- Parser/validator *enforcement* of the model (rejecting legacy text,
  routing viewer graphs through it) — that is #270.
- Resolving every ambiguous relationship by hand in this change. Genuinely
  ambiguous text may remain legacy; that is a valid, ADR-0006-sanctioned end
  state, not a defect to eliminate at all costs.

## Architecture

### `scripts/lib/relationship-annotations.js`

Shared parser/annotator module, plain regex/text manipulation (no new
dependency — matches the zero-dependency convention already used by
`backfill-role-ids.js` and `relationship-report.js`). Exports:

- `buildRoleIndex(roles)` — map of normalized title → `{ roleId, title }`,
  built from every role file's `# Title` heading and `Role ID` field.
- `annotateTarget(text, { roleIndex, externalTerms })` — returns the text
  with an annotation appended if it resolves, or `null` if it does not.
  Resolution order:
  1. Exact title match (case-insensitive, trimmed) against `roleIndex` →
     append `` <!-- role: id --> ``.
  2. Exact match against the curated `externalTerms` list → append
     `` <!-- external-role --> ``.
  3. No match → `null` (caller leaves the text as legacy).
- `splitTopLevel(fieldText)` — splits a field's raw text into top-level
  segments (by `;`, list items, table-cell/row boundaries — the structural
  separators already present in the source), without interpreting `or`/`,`/`/`
  as meaningful on its own.
- `annotateField(fieldText, { roleIndex, externalTerms })` — for each
  top-level segment: if the whole segment resolves via `annotateTarget`,
  annotate it directly; if the segment splits into two or more
  comma/`or`-separated candidates and **every** candidate independently
  resolves, wrap the segment in
  `` <!-- one-of -->...<!-- /one-of --> `` with each candidate annotated;
  otherwise leave the segment untouched (legacy). Already-annotated segments
  (detected via existing `<!-- role:`, `<!-- external-role -->`, or
  `<!-- one-of -->` markers) are left untouched, which is what makes re-runs
  idempotent. Returns `{ text, resolved: [...], legacy: [...] }` for
  reporting.

This module is deliberately the one place that knows the annotation syntax,
so #270's validator can reuse it instead of re-deriving the grammar.

### `scripts/lib/external-role-terms.js`

A curated, exact-match list of destinations that are legitimately outside
the catalogue (Board of Directors, CEO, CFO, CTO, CIO, CISO, Regulators,
Vendors, People Operations, Legal and Compliance, Customers, industry
bodies, etc.). Built from an audit pass (see below), not guessed at from
patterns — every entry is a term actually observed in the catalogue and
confirmed to name something outside it.

### `scripts/audit-relationship-terms.js`

A read-only inventory script (extends the approach in
`relationship-report.js`, which today only covers `Reports To`) that scans
all four field shapes and lists every distinct piece of target text that
does **not** resolve to a catalogue title, grouped by frequency. This is run
once up front to build `external-role-terms.js` from evidence, and can be
re-run later if new external terms appear.

### `scripts/migrate-relationship-annotations.js`

CLI migration tool, same shape as `backfill-role-ids.js`:

- Dry-run by default; `--write` applies changes.
- Preserves BOM/CRLF per file, same as the existing tool.
- Walks `Roles/`, and for each file locates:
  - `Reports To` table row value
  - `Direct Reports` table row value
  - Career Development Path bullets (`Previous Roles`, `Potential Next
    Roles`)
  - Interactions table `Role` column (first cell of each row under `##
    Interactions with Other Roles`)
- Runs `annotateField` on each, replaces text when changed.
- Prints a summary: files changed, targets resolved (by kind: role /
  external / one-of), and targets left legacy — with file + field + text —
  so the legacy list is a concrete, reviewable to-do rather than a silent
  gap.

## Fields and known limitation

`/`-joined interaction-table cells (e.g. "CISO / Security Architect") and
loosely worded career-path alternatives (e.g. "Enterprise Security Architect
or Data Privacy Architect (governance specialism)") will mostly land in the
legacy bucket rather than auto-resolve, because `/` is not a defined
ADR-0006 separator and prose qualifiers aren't candidates the tool can
verify independently. This is expected, not a bug: ADR-0006 explicitly
permits legacy text to persist until deliberately migrated, and guessing
here is exactly the silent-drift failure mode the ADR exists to prevent.

## Execution plan

1. Run `audit-relationship-terms.js`, review output, populate
   `external-role-terms.js`.
2. Build `relationship-annotations.js` and
   `migrate-relationship-annotations.js` against unit test fixtures first
   (TDD).
3. Run the migration tool per existing `Roles/` domain subfolder as a batch.
   After each batch: `npm run validate` and `npm test` must pass, then
   commit.
4. After the automated pass, review the legacy report. Where a pattern is
   clearly a missing external term, add it to the curated list and re-run.
   Where a specific file needs a human call (e.g. a genuine but unusually
   worded alternative), hand-edit that file. Anything still unresolved after
   this pass is a deliberate, logged exception — acceptable per ADR-0006 and
   this issue's acceptance criteria ("migrated or recorded as deliberate
   exceptions").
5. Re-run the migration tool once more at the end to confirm it is a no-op
   (idempotency, satisfies "re-running the migration changes no files").

## Testing

`test/relationship-annotations.test.js`, following the pattern in
`test/validate-roles.test.js`:

- Each ADR-0006 example: catalogue target, external target, `one-of` group,
  `None` sentinel.
- Invalid/edge states: nested `one-of`, a target with both `role` and
  `external-role` annotations, unclosed `one-of`, a `one-of` with fewer than
  two options, mixed annotated/legacy content in one field.
- Idempotency: annotating already-annotated text is a no-op.
- Fixture-based test of `migrate-relationship-annotations.js` against a
  small sample role file (mirrors how `backfill-role-ids.js` is tested, if
  a test exists for it — otherwise a new fixture-based test).

## Acceptance mapping (from #269)

- Idempotent migration tool → `migrate-relationship-annotations.js`,
  re-run-is-no-op test.
- Explicit external/alternative destinations migrated without guessing →
  resolution rules above (exact match only, curated external list).
- All references migrated or recorded as deliberate exceptions → legacy
  report from the tool's summary output, reviewed in step 4.
- Re-running changes no files → idempotency test + step 5.
- Validation, artefacts, and tests pass after each batch → step 3.
