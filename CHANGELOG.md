# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- **Reports To / Direct Reports / Role Scope & Boundaries / Interaction
  Mode backfilled for the Leadership chapter (#5, batch 1/7: 16 of 219
  files).** All 4 C-suite roles and all 12 Leadership-domain roles now
  carry the full modern role_template.md field set. Reporting hierarchy is
  grounded in each file's own existing content (Key Decisions &
  Accountabilities Owns/Advises tables, Key Stakeholders, and prior
  "Reports to:" prose) rather than invented: CEO → Board of Directors;
  CTO/CIO/SVP of Technology → CEO (documented equivalent titles); CISO →
  SVP/CTO/CIO or directly to CEO/Board (dual governance model per the
  file's own text); PAL/TAL → CTO/CIO/SVP as the delivery/technical
  leadership pair; the 6 Chapter Leads → TAL or PAL; the Engineering
  Practices Champion and Technical Community Leader → Engineering
  Director or TAL. The 8 files that previously jammed "Reports to:" and
  "Line manages:" into the Interactions table as a workaround (predating
  the metadata fields) had those now-redundant rows removed and the
  remaining stakeholder rows re-authored with real role names and an
  Interaction Mode, matching the modern-template convention already
  established by the Service Desk roles (downward = Provides To, upward =
  Escalates To, peer = Collaborates). Remaining 6 chapters (203 files)
  tracked in #5.

### Fixed

- **End User & Workplace Chapter Lead's domain list now names all four
  chapter domains (#77).** The "Line manages" row and two Key
  Responsibilities bullets still said "Endpoint Management and Modern
  Workplace" (or omitted Client Platform), missed when Service Desk joined
  the chapter in #65 — the Role Overview was updated at the time but these
  three spots weren't. All three now list Client Platform, Endpoint
  Management, Modern Workplace, and Service Desk consistently.
- **Process ownership assigned (#10).** The five process items in
  `docs/improvements_and_recommendations.md` that lacked a named owner —
  role description maintenance, skills assessment/LMS integration, role
  effectiveness measurement, continuous role evolution strategy, and
  CROSS_DOMAIN_INTERACTIONS.md upkeep — are now owned by JeanKadang, with
  review cadence tied to each release rather than a fixed calendar date.
  Owner assignment does not itself complete the underlying external
  actions (HR/L&D engagement, pulse survey, tech radar adoption) — those
  remain flagged as pending in their respective sections.

### Added

- **Service Desk domain (#65).** 31 role files referenced "Service Desk" /
  "Service Desk Lead" as an escalation target or stakeholder, but the
  catalog had no service-desk roles. Adds a 3-role ladder under a new
  `service_desk` domain — `service_desk_analyst` (Tier 1, Engineer),
  `service_desk_senior_analyst` (Tier 2, Senior Engineer),
  `service_desk_lead` (support model/staffing owner, Senior Engineer) —
  slotted into the existing End User & Workplace chapter alongside Client
  Platform, Endpoint Management, and Modern Workplace. The new files use
  the full modern template (Role Scope & Boundaries, Reports To/Direct
  Reports, Interaction Mode) rather than the legacy template #5 is
  backfilling, so they add no new debt to that effort. Wired into
  `roleMeta.js`, the sidebar/chapter mapping, `SKILLS_PROGRESSION.md`, and
  `CROSS_DOMAIN_INTERACTIONS.md` (including a major-incident-detection
  note); chapter overview docs and the chapter lead's role overview
  updated to name four domains instead of three. Catalog: 216 → 219 roles,
  32 → 33 domains.

## [1.5.0] - 2026-07-22

### Added

- **Full-text search across role content (#68).** The sidebar search still
  filters titles/domains/chapters instantly, but for queries of 3+ chars it
  now also asks the server (`/api/search`) to search role *bodies* and
  prepends a "Content matches" group with a snippet around each hit — so
  searching "Terraform", "Entra", or "Slurm" finds the roles that mention
  it, not just those with it in the title. The server keeps a body index
  cached against the same mtime signature as `/api/roles` (no extra I/O
  until a search runs, live-edit pickup preserved), excludes reference
  docs, caps results at 50, and sorts title matches first. Results are
  keyboard-operable (#24 pattern) and open the role like any sidebar item;
  the query is debounced and guarded against out-of-order responses.
- **The validator now flags duplicate role titles (#67).**
  `validate-roles.js` groups H1 titles across all non-reference role files
  and fails (exit 1, blocking CI) on any title held by more than one role,
  naming both paths. Duplicate titles shipped in v1.2.0 (3 cross-domain
  pairs) and v1.3.0 (a pair the filename scan missed because the files
  differed); this closes the recurrence. Covered by fixture tests; the
  current catalog has zero duplicates.
- **Per-role career stepper (#55).** The role view now opens with a
  From → current role → To strip parsed from the role's own Career
  Development Path section (both heading variants in the catalog are
  handled; every one of the 216 role files parses). Steps whose text
  exactly matches a catalog role title become keyboard-operable chips
  that open that role; unmatched steps render as plain chips. Plain
  HTML/CSS — no chart library, accessible by construction, hidden in
  print and in the compare column.

### Changed

- **Clarified automation and reliability domain ownership boundaries (#66).**
  `CROSS_DOMAIN_INTERACTIONS.md` gains two ownership-table rows plus
  Automation and Reliability scope-clarification sections: the
  Automation Framework Engineer owns shared cross-domain tooling while
  Infrastructure/Network/Security automation architects own standards
  within their own domain only; SRE sets org-wide reliability
  methodology while Platform/Database/Backup Reliability Engineers each
  apply it to one system class. Also notes the SCCM vs Endpoint
  Management Engineer tool-specialist/generalist split. No role files
  changed — their scope statements didn't contradict each other.

### Fixed

- **Org chart: the CISO now carries the security-governance line (#71).**
  The CISO previously rendered as a childless C-suite leaf while the entire
  Security & Identity chapter hung under the SVP of Technology —
  contradicting the role content, in which the CISO "provides strategic
  direction to the Security & Identity Chapter Lead and senior security
  architects." `buildOrgTree()` now attaches the Security & Identity chapter
  (its Chapter Lead, 5 domains, and all security roles) under the CISO, with
  every other chapter remaining under the SVP; the tree falls back to the
  old placement when no CISO exists. All 216 roles still appear exactly
  once, and the org-view copy names the CISO→security relationship.
- **Retired the one-role "Reliability Engineer" career level (#69).**
  The canonical level was held by exactly one of 216 roles
  (`platform_reliability_engineer`), which made that role render as a
  career dead end — a terminal Sankey branch, a one-chip matrix column,
  and a ladder line with no upward connection — while its own Career
  Development Path listed real next steps. The role is now graded
  Engineer like the catalog's four other reliability-titled roles; the
  level was removed from `roleMeta.js`, `viewer-logic.js`
  (LEVEL_ORDER/LEVEL_SHORT/badge/sankey branch), the welcome stats, and
  the DevOps ladder. Also fixed the role's phantom "Platform Reliability
  Senior Engineer" next-step: its To-list now names the real DevOps /
  Site Reliability / Observability Senior Engineer roles, all of which
  link in the career stepper.

## [1.4.0] - 2026-07-12

### Added

- **Career path flow view (#15).** New "📈 Careers" header toggle renders
  an ECharts sankey built live from SKILLS_PROGRESSION.md: career rungs as
  columns (Engineer → Senior → Architect → Lead/Principal → Chapter Lead →
  Area Lead → Executive), band width = role count at each rung, with
  Product Owner and Reliability Engineer branching off the IC line. Node
  colors are an ordinal blue ramp (darker = more senior); hover shows the
  contributing domains per band. Ladder and mobility parsers
  (`parseProgressionLadders`, `buildCareerSankey`, `parseMobilityPaths`)
  live in `viewer-logic.js` with fixture tests plus an integration test
  against the real document (32 ladders, all 216 roles). Ships the full
  chart-accessibility bar: reduced-motion support, aria summary, and a
  "View as table" fallback that also lists the cross-domain mobility
  paths. Completes the In-App Data Visualization milestone's original
  chart set.
- **SKILLS_PROGRESSION.md now covers all 32 domains (#1)** — up from 10.
  The domain-ladder section was regenerated from the role files themselves:
  every one of the 216 roles appears exactly once, mapped to its metadata
  level (Product Owner lines added throughout; the eight specialist
  Senior-Engineer-grade governance roles sit on their domains' Senior
  lines). New "GenAI vs classical MLOps" section documents the two AI
  platform tracks, the Data-to-AI mobility path names which of the two
  architect targets it leads to, and governance-specialist feeder paths
  were added to cross-domain mobility. A new test suite pins the doc to
  the catalog — a missing, duplicate, or phantom ladder entry now fails
  CI. Unblocks the #15 career Sankey.

- **Reference/standards docs are reachable in the viewer again (#29).**
  `/api/roles` now lists `*_standards.md` files in a per-domain
  `references` array (never counted as roles, levelled, or stale-tracked),
  and the sidebar renders them inside their domain group with a 📐
  Standards badge, opening in the doc view. Markdown links to standards
  docs route to the doc view instead of the role view, and the FinOps
  Architect/Engineer files gained "See also" cross-links to the Cloud
  Cost Optimization Standards. Fixes the side effect of #23 that left the
  FinOps standards doc orphaned; the pattern works for any future
  standards file in any domain.
- **Domain relationship graph (#13).** New "🔗 Graph" header toggle renders
  an ECharts force-directed graph built live from
  docs/CROSS_DOMAIN_INTERACTIONS.md: nodes are domains (sized by how
  connected they are, colored by chapter with a palette validated for
  color-vision safety on both themes), solid edges are collaboration pairs,
  dashed edges are consultation relationships from the ownership table, and
  external parties (Legal, Procurement) render in a neutral gray. "All
  domains" entries become node notes instead of edge explosions. The
  markdown parser (`parseInteractions`) lives in `viewer-logic.js` with
  fixture tests plus an integration test against the real document, so doc
  drift that would break the graph fails CI. Clicking a node reveals that
  domain in the sidebar; a keyboard-operable "View as list" fallback ships
  per #17.
- **Governance-role coverage in CROSS_DOMAIN_INTERACTIONS.md (#2).** The
  eight v1.2.0 governance roles now appear in the interaction map: seven
  ownership-boundary rows (change enablement, major incident, BC/DR
  standards, data governance, privacy program, risk register, vendor/asset
  management), four cross-domain relationship entries, a "Data governance
  scope clarification" section splitting Data Governance Lead vs Data
  Privacy Officer vs Security, and an "Operational and governance
  escalations" section mapping each event type to its entry-point role —
  all aligned with the escalation paths documented in the role files
  themselves. Unblocks the #13 relationship graph.
- **Organisation chart view (#11).** New "🌳 Org" header toggle renders the
  live hierarchy as an ECharts tree (first UI use of the vendored ECharts):
  leadership line (CEO → C-suite/SVP → area leads → chapters) flowing into
  Chapters → Domains → Roles, with expand/collapse, pan/zoom, and
  click-to-open on any role, chapter-lead, or executive node. The tree is
  built by a pure `buildOrgTree()` in `viewer-logic.js` whose tests pin the
  invariant that **every role appears exactly once** — unplaced leadership
  roles group under "Cross-cutting Leadership" instead of vanishing. Ships
  a keyboard-operable "View as list" fallback (#17), re-renders on theme
  toggle, and is mutually exclusive with the Matrix and Stale views.
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

- **Charts respect `prefers-reduced-motion` (#17).** Users who ask the OS
  for reduced motion get all four visuals (distribution charts, org chart,
  relationship graph) without entrance/update animations; the force graph
  lays out statically. This closes the chart-accessibility issue — the
  fallback/labeling requirements it tracked were built into each chart as
  it shipped: aria-label summaries and table/list fallbacks on every
  visual, identity via labels and shape cues (solid vs dashed edges)
  rather than color alone, and validated palettes on both themes.
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
