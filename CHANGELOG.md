# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.2.0] - 2026-07-06

### Added

- Role template (`docs/role_template.md`) extended with **Reports To** /
  **Direct Reports** metadata fields, a new **Role Scope & Boundaries** section
  (scope of influence, experience anchor, out-of-scope statement, escalation
  path), and an **Interaction Mode** column on the Interactions with Other
  Roles table (Collaborates / Consumes From / Provides To / Governed By /
  Escalates To). Not yet backfilled across existing role files (tracked in
  GitHub issue #5).
- 8 new roles covering the service-operations, delivery-coordination, and
  governance layer identified as thin relative to the catalog's technology/
  platform depth: Technical Program Manager / Delivery Manager, Major Incident
  Manager, Change / Release Manager, Vendor / Supplier / IT Asset Manager
  (`service_management`); Business Continuity / Disaster Recovery Manager
  (`data_protection`); Data Governance Lead, Data Privacy Officer
  (`data_management`); GRC / Risk & Compliance Analyst (`security`). All use
  the enhanced template and pass `npm run validate` with zero errors/warnings.
- Git version control and a private GitHub repository
  (github.com/JeanKadang/DOC-ITRoles) — the codebase previously had no version
  control at all.
- CI workflow (`.github/workflows/ci.yml`): runs `npm test` and markdownlint as
  blocking checks, and `npm run validate` as a non-blocking check (43
  pre-existing role files fail validation — tracked in issue #7) on every push
  and pull request to `main`.
- Vendored charting libraries, `vendor/chart.umd.min.js` (Chart.js 4.5.1) and
  `vendor/echarts.min.js` (ECharts 5.x), served by the existing `/vendor/*`
  route — staged for upcoming chart features, not yet wired into the UI.
- Clickable header ("🗂️ IT Roles Library") acting as a Home link — returns to
  the welcome/stats screen from any role, doc, chapter, matrix, or stale view,
  while still preserving Back-button history.
- A full project backlog (20+ issues) filed on GitHub from the accumulated
  Open TODOs in `docs/improvements_and_recommendations.md`, labeled by
  category and a P0–P3 priority scale, with cross-issue dependencies recorded
  as issue comments.

### Fixed

- **3 duplicate role titles across domains**, found via a duplicate-filename scan
  of the full catalog: `AI Platform Architect`/`AI Platform Engineer` existed in
  both `ai_governance` (classical MLOps) and `modern_infrastructure` (GenAI/LLM)
  with identical titles but different scope — renamed the `modern_infrastructure`
  pair to `GenAI Platform Architect`/`GenAI Platform Engineer`. `Developer
  Experience Engineer` and `DataOps Engineer` each existed twice with
  substantially overlapping content — removed the non-canonical duplicate in
  each case (`modern_infrastructure/developer_experience_engineer.md` and
  `data_management/dataops_engineer.md`). Catalog count: 220 → 218 roles.
- **CFO badge silently rendered as green "Engineer" color.** `Roles/c_suite/
  chief_financial_officer.md` exists and `CFO` is a canonical Role Level, but
  `index.html`'s `badgeClass()` had no CFO branch and no `.b-cfo` CSS rule.
- **Reference/standards docs miscounted as roles and permanently flagged
  stale.** `Roles/FinOps/cloud_cost_optimization_standards.md` has no metadata
  table by design (already exempt in `validate-roles.js`), but `server.js`'s
  `getRoles()` didn't know about that exemption — it counted the file as a
  role with a bogus fallback level and a permanently-null `Last Reviewed`,
  so it could never leave the Stale panel. `REFERENCE_DOC_PATTERN` moved into
  `roleMeta.js` as the shared source of truth for both the validator and the
  server. Catalog count corrected: 218 → 217 roles.
- 4 role files with double-blank-line markdownlint (MD012) violations,
  blocking the new CI job.
- `docs/role_template.md`'s Role Level example listed only 4 levels instead
  of the full canonical vocabulary.
- `docs/improvements_and_recommendations.md`: C-suite section omitted CFO
  despite the role file existing; proficiency-table backfill figure was
  stale ("~159/166 remaining" — actual figure recounted to 3 roles).

## [1.1.0] - 2026-07-06

### Added

- `package.json` with `start`, `test`, and `validate` npm scripts, and a pinned
  `engines.node >= 18` requirement.
- `roleMeta.js` — shared role-metadata parser used by both `server.js` and
  `validate-roles.js`, replacing the filename-only level detection with
  metadata-first parsing (`Role Level` table field), falling back to filename
  inference only when metadata is absent.
- `validate-roles.js` (`npm run validate`) — checks every role file against the
  canonical 13-section template and required metadata fields. Missing sections/
  metadata are errors; non-canonical values are warnings. Supports `--strict`.
- `test/` — a `node:test` suite covering path-traversal protection on
  `/api/role`, `/api/doc`, and `/vendor/*`, API response shapes, and
  `roleMeta.js` parsing behavior (`npm test`).
- Vendored `marked` (`vendor/marked.min.js`), served locally by `server.js` —
  removes the `cdn.jsdelivr.net` runtime dependency so the app works offline.
- Security headers on every response: `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, and a
  `Content-Security-Policy` restricting script/style/connect to same-origin.
- Export controls: download the open role or reference doc as Markdown, export
  the role matrix to CSV, and a "Stale roles" panel (roles with no review date
  or reviewed 12+ months ago) with its own CSV export.
- Accessibility: `aria-label`/`aria-pressed` on all header and role-action
  buttons, and a visible `:focus-visible` outline on interactive elements.
- This changelog.

### Changed

- `server.js` now resolves each role's level from its `Role Level` metadata
  field (normalized via `roleMeta.js`), instead of inferring it purely from
  the filename.
- Dropped the wildcard `Access-Control-Allow-Origin: *` response header — the
  app is same-origin only and does not need cross-origin API access.
- `server.js` now exports `{ server, getRoles, ROOT, ROLES_DIR }` and only
  calls `.listen()` when run directly, so it can be imported by tests.
- README rewritten: removed duplicated "Running the web viewer" / "Features" /
  "Governance documents" sections, added Node.js-via-winget install
  instructions, and added Development/Design Notes sections.

### Fixed

- **Role titles silently wrong for 57 of 212 role files.** Files saved with a
  leading UTF-8 BOM broke the `^#` title-detection regex (the BOM character
  precedes the `#` on line 1), causing the UI to silently fall back to a
  lowercase, underscore-separated filename as the displayed title. `roleMeta.js`
  now strips a leading BOM before parsing.

### Known issues (tracked, not yet fixed)

- `npm run validate` currently reports 43 role files with one or more missing
  canonical sections (pre-existing content drift, not introduced by this
  release). See the validator output for the current list.
