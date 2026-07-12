# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- **Distribution charts on the welcome screen (#14).** Two horizontal bar
  charts — roles per chapter and roles per level (seniority order) — built
  on the vendored Chart.js, first UI use of the charting libraries staged
  in v1.2.0. Data shaping (`rolesPerChapter`, `rolesPerLevel`) lives in
  `viewer-logic.js` with tests, including a guard that unknown levels are
  appended rather than silently dropped (the #46 failure mode). Single
  accent-blue hue validated for contrast and color-vision safety on both
  themes; charts re-render on theme toggle, and each ships an
  `aria-label` summary plus a "View as table" fallback (#17).
- `SECURITY.md`: security policy with private reporting instructions, scope,
  and response expectations.
- `.github/dependabot.yml`: weekly grouped update PRs for GitHub Actions and
  npm dependencies, labeled and assigned automatically.
- **Test coverage for the browser view logic (#27).** Pure functions and
  constants (`escapeHtml`, `badgeClass`, `LEVEL_ORDER`/`LEVEL_SHORT`,
  `monthsSinceReview`, `computeStaleRoles`, `resolveDocHref`) extracted from
  index.html into `viewer-logic.js` (browser global + Node module, served by
  a dedicated route — still no build step) with 18 tests, including guards
  that fail on #18-style badge fallthroughs and #46-style missing matrix
  levels.
- **Test coverage for the validator (#19).** `validate-roles.js` gained a
  `require.main` guard, exported `listRoleFiles`/`validateFile`, and a
  `ROLES_DIR` override; 15 fixture-based tests cover every required-section
  error, metadata errors, warning paths, reference-doc skipping, and CLI
  exit codes including `--strict`. Suite total: 19 → 52 tests.

### Security

- **Rendered markdown is now sanitized (#25).** DOMPurify 3.2.7 is vendored
  under `vendor/` (matching the existing no-CDN pattern) and every
  `marked.parse()` call site routes through a shared `renderMarkdown()`
  helper that sanitizes before `innerHTML`. The old two-character
  `escapeAttr()` helper was replaced by a full `escapeHtml()` (`& < > " '`)
  applied to all dynamic text interpolations — role titles, levels, domain
  labels, review dates, and the reflected search string. A malicious or
  copy-pasted role file can no longer execute script in the viewer.

### Accessibility

- **Sidebar and matrix navigation is now keyboard-accessible (#24).** All
  clickable divs/spans (role items, resource docs, domain/chapter headers,
  chapter-panel cards, matrix and stale-panel chips, compare-cancel) are
  promoted to `role="button"` with `tabindex="0"`, activated by a delegated
  Enter/Space handler; domain and chapter toggles expose `aria-expanded`;
  the search input has an `aria-label`; promoted elements get a visible
  `:focus-visible` outline.

### Changed

- CI workflow now declares a least-privilege `permissions: contents: read`
  block.
- Repository setting `delete_branch_on_merge` enabled — merged PR branches
  are deleted automatically.
- **Role content validation is now a blocking CI check** — the
  `continue-on-error` escape hatch was removed from the validate job now
  that the full catalog passes (#7).

### Fixed

- **CFO role missing from the matrix view (#46)** — `LEVEL_ORDER` and
  `LEVEL_SHORT` lacked `CFO`, so the matrix silently rendered 215 of 216
  role chips while claiming all were shown. Same defect family as the
  v1.2.0 CFO badge fallthrough; the new viewer-logic tests now assert
  level-list parity with `roleMeta.js` so this class of bug fails CI.
- **All 43 role files failing `npm run validate` resolved (#7)** — the full
  216-role catalog now validates with zero errors and zero warnings.
  Roughly 25 files only needed variant headings renamed to the canonical
  template wording (`Interactions`/`Key Interactions`, `KPIs and Success
  Metrics`, `Career Progression`, `Tools and Technologies`, `Recommended
  Background`); the rest received authored content: `Key Technologies`
  sections for 11 product-owner files, four executive-level sections for
  each of the 4 C-suite roles, `Key Decisions & Accountabilities` plus
  three further sections for the 4 `client_platform` roles, and remaining
  gaps in `kubernetes_engineer`, `observability_engineer`, both HPE server
  hardware roles, and `vmware_architect`. The FinOps standards reference
  doc gained its required `Domain` metadata field.
- Stale "217 role files" comment in `server.js` (catalog is 216 since the
  v1.3.0 duplicate-role removal); comment is now count-free so it cannot
  drift again (#40).

## [1.3.0] - 2026-07-06

### Added

- `scripts/check-counts.js` (`npm run check-counts`): compares README.md's
  count-bearing sentences ("N domains grouped into N chapters, and N roles")
  against the actual filesystem, wired as a blocking CI step. Prevents
  the kind of drift that previously left a proficiency-table backfill
  estimate off by two orders of magnitude.
- `validate-roles.js` now warns (non-blocking) when a role's `Domain`
  metadata doesn't match the canonical label for its folder.

### Fixed

- **Duplicate role:** `Java Platform Product Owner` existed as two
  near-identical files (`java_product_owner.md` and
  `java_platform_product_owner.md`) — the 2026-07 duplicate-title cleanup
  scanned by filename and missed this pair. Removed the non-canonical copy.
  Catalog count: 217 → 216 roles.
- **Stale cross-references** to the removed `DataOps Engineer` role (9
  references across 4 `data_engineering` files) updated to `DataOps
  Specialist`; disambiguated an ambiguous `AI Platform Architect` stakeholder
  reference in `mlops_engineer.md` to name both the AI Governance and GenAI
  variants.
- **Domain metadata drift:** 34 role files' `Domain` metadata didn't match
  their folder's canonical label (`Leadership` vs `C-Suite` for c_suite
  roles; `and` vs `&` variants in `integration_middleware`,
  `itsm_configuration`, `security_identity`; naming mismatches in
  `server_hardware_hpe`, `server_os_linux`, `server_os_windows`). Moved
  `DOMAIN_LABELS` out of `server.js` into `roleMeta.js` as the shared source
  of truth, matching the `REFERENCE_DOC_PATTERN` pattern.
- **`start.bat` no longer force-kills** whatever process is listening on
  port 3000 — it now probes 3000-3010 for a free port and launches there,
  and still auto-opens the default browser to whichever port it picked.
- **CI action deprecation warnings** cleared: bumped `actions/checkout`
  v4→v7, `actions/setup-node` v4→v6, `markdownlint-cli2-action` v18→v24.
  Test job now runs a Node 18/22 matrix instead of only 18.
- **`getRoles()` no longer re-reads all 216 role files on every
  `/api/roles` request** — cached, invalidated via an mtime signature over
  the `Roles/` tree. Live-edit pickup (adding/editing a role file without
  restarting the server) is preserved.
- **Technology Proficiency Levels backfilled** for the last 3 roles missing
  it (`endpoint_management_senior_engineer`, `engineering_practices_champion`,
  `modern_workplace_senior_engineer`). Coverage is now 216/216 (100%).
- The "Open TODOs" section in `docs/improvements_and_recommendations.md`,
  which had started duplicating the GitHub issue tracker, replaced with a
  pointer to the Issues tab; historical "Done this review" content kept.

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
