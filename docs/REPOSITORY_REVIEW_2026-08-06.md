# Repository review — 6 August 2026

## Purpose and scope

This is a point-in-time review of the repository on branch `feat/skills-matrix` at commit `90c6413`. It is not a replacement backlog: GitHub Issues should remain the source of truth for work that is accepted.

## GitHub issue crosswalk

The accepted findings have been converted into independently actionable GitHub issues. [Epic #193](https://github.com/JeanKadang/DOC-ITRoles/issues/193) is the roadmap view, while the [Catalogue Trust & Adoption](https://github.com/JeanKadang/DOC-ITRoles/milestone/9) and [Adoption & Discovery](https://github.com/JeanKadang/DOC-ITRoles/milestone/10) milestones separate foundation work from later adoption choices.

This table is a traceability index, not a second backlog. Current scope, acceptance criteria, priority, dependencies, and delivery status belong in the linked issues.

| Review finding or idea | GitHub issue | Delivery grouping |
| --- | --- | --- |
| Audit certifications and learning recommendations for authority | [#178](https://github.com/JeanKadang/DOC-ITRoles/issues/178) | Catalogue Trust & Adoption |
| Record who reviewed content, not only when | [#179](https://github.com/JeanKadang/DOC-ITRoles/issues/179) | Catalogue Trust & Adoption |
| Complete KPI work through accountable domain decisions | [#140](https://github.com/JeanKadang/DOC-ITRoles/issues/140) | Catalogue Trust & Adoption |
| Give roles stable identities and validate relationships | [#180](https://github.com/JeanKadang/DOC-ITRoles/issues/180) | Catalogue Trust & Adoption |
| Add shareable, reload-safe viewer routes | [#181](https://github.com/JeanKadang/DOC-ITRoles/issues/181) | Catalogue Trust & Adoption |
| Deduplicate and clarify search results | [#182](https://github.com/JeanKadang/DOC-ITRoles/issues/182) | Catalogue Trust & Adoption |
| Add a thin browser-level test layer | [#183](https://github.com/JeanKadang/DOC-ITRoles/issues/183) | Catalogue Trust & Adoption |
| Centralise catalogue configuration | [#184](https://github.com/JeanKadang/DOC-ITRoles/issues/184) | Catalogue Trust & Adoption |
| Track vendored assets as maintained dependencies | [#185](https://github.com/JeanKadang/DOC-ITRoles/issues/185) | Catalogue Trust & Adoption |
| Split the UI by responsibility without adopting a framework | [#186](https://github.com/JeanKadang/DOC-ITRoles/issues/186) | Catalogue Trust & Adoption |
| Improve mobile information density | [#187](https://github.com/JeanKadang/DOC-ITRoles/issues/187) | Catalogue Trust & Adoption |
| Add a trust and maintenance dashboard | [#188](https://github.com/JeanKadang/DOC-ITRoles/issues/188) | Adoption & Discovery |
| Generate role-catalogue change-impact summaries | [#189](https://github.com/JeanKadang/DOC-ITRoles/issues/189) | Adoption & Discovery |
| Investigate local organisation overlays | [#190](https://github.com/JeanKadang/DOC-ITRoles/issues/190) | Adoption & Discovery |
| Make role comparison evidence-aware | [#191](https://github.com/JeanKadang/DOC-ITRoles/issues/191) | Adoption & Discovery |
| Add evidence-focused contribution guidance and decision records | [#192](https://github.com/JeanKadang/DOC-ITRoles/issues/192) | Catalogue Trust & Adoption |
| Define organisational mechanisms outside the repository | [#151](https://github.com/JeanKadang/DOC-ITRoles/issues/151) | Adoption & Discovery |

Two follow-up findings arose after this review and are deliberately not presented as original review findings: [#194](https://github.com/JeanKadang/DOC-ITRoles/issues/194) tracks the interactive Technology Radar visual, and [#196](https://github.com/JeanKadang/DOC-ITRoles/issues/196) tracks remote CI disruption. [#197](https://github.com/JeanKadang/DOC-ITRoles/issues/197) tracks publication of this document and crosswalk.

The review covered:

- repository structure, documentation, content model, and contribution workflow;
- the server, browser viewer, shared logic, validators, generators, and tests;
- a desktop and narrow-screen walkthrough of the running viewer;
- catalogue-wide measurements plus a detailed sample of role content;
- the two open GitHub issues at the time of review, to avoid presenting known work as a new discovery.

This was a structural and risk-based content review, not expert validation of every statement in all 226 roles. That distinction matters: the repository is very good at proving that content is structurally complete, but structural validity is not the same as subject-matter accuracy.

## Executive assessment

This is a strong project. It has moved well beyond a loose folder of AI-generated role descriptions and now behaves like a small governed product: 226 roles across 34 domains and 7 chapters, a useful viewer, reusable templates, content validation, generated governance views, security controls, and 220 passing automated tests.

The main risk has changed. The project no longer appears most exposed to missing sections or broken code. It is now most exposed to **content authority**: whether a role definition, reporting line, certification, technology, KPI, or review date is current, verifiable, and endorsed by the people who will use it.

The best next phase is therefore a trust-and-adoption phase:

1. establish provenance and accountable ownership for role content;
2. audit credentials and learning recommendations against authoritative sources;
3. resolve the KPI-target gap through domain-owner decisions, not generated numbers;
4. make role relationships machine-verifiable;
5. make viewer state linkable and cover the critical browser journeys with a small end-to-end test suite.

There are no obvious P0 defects in the reviewed state.

## What is already working particularly well

### 1. The project has a coherent information architecture

The chapter → domain → role hierarchy is understandable, and the viewer offers multiple useful perspectives: navigation, search, matrix, organisation chart, relationship graph, career paths, comparisons, stale-role tracking, and generated reference documents. The chapter narratives and cross-domain boundary document make the catalogue more than a collection of job descriptions.

### 2. The validation suite protects against real historical failure modes

The validator checks the canonical role sections, metadata, reporting-line fields, duplicate titles, domain/level vocabulary, interaction-mode columns, KPI quality, and proficiency formatting. Tests explicitly preserve fixes for prior issues such as BOM-prefixed files, duplicate titles, path traversal, roles disappearing from matrices, and incorrect organisation-tree placement.

At the reviewed commit:

- `npm test` passed all **220** tests;
- `npm run validate` completed with **0 errors** and no duplicate titles;
- `npm run check-counts` confirmed **226 roles, 34 domains, and 7 chapters**;
- committed technology-radar and skills-matrix documents matched their generators.

This is excellent regression discipline for a project with no runtime package dependencies.

### 3. The security posture is proportionate to a localhost application

The server binds to `127.0.0.1`, constrains file access to known roots, restricts served file types, sanitises rendered Markdown, escapes dynamic strings, and sends defensive response headers. Vendoring browser libraries also keeps the application usable offline and avoids runtime CDN trust.

### 4. Generated views are reproducible

The technology radar and skills matrix are derived from catalogue content and protected by tests that compare generated output with the committed documents. This is much safer than manually maintaining summaries that silently drift.

### 5. The project documents its design choices honestly

The README explains the near-single-file UI, zero-dependency goal, validation rules, and why the retired recommendations document is not a live backlog. That kind of explicit scope control is valuable.

## Prioritised recommendations

## P1 — Audit certifications and learning recommendations for authority

### Finding

The catalogue contains no external URLs in role files, so a reader cannot distinguish an official credential from a generic learning topic, partner designation, retired name, or plausible-sounding generated phrase.

The sampled `Kubernetes Architect` role demonstrates the risk. Its “Core Certifications” includes `Certified Kubernetes Administrator (CKA)` and `Certified Kubernetes Security Specialist (CKS)`, but also `CNCF Certified Kubernetes Service Provider`. CNCF describes the latter as a programme for qualifying **companies/service providers**, requiring CNCF membership and multiple CKA-certified engineers; it is not an individual credential. The same list includes generic names such as “Advanced Kubernetes Networking certification”, “Service Mesh Architecture certification”, and “Container Platform Architecture certification” without a provider or source.

This is not evidence that every recommendation is wrong. It is evidence that the current format makes correctness impossible to audit efficiently.

### Recommendation

Replace free-text certification lists with a small, source-backed credential registry. Each recommended item should carry:

- exact official name;
- issuing organisation;
- official URL;
- type: individual certification, organisation programme, course, community, or learning topic;
- status: active, renamed, retired, or unverified;
- last verified date;
- rationale for the role and level.

Role files can reference registry IDs while the viewer renders the friendly name and source. A validator should reject unknown IDs and warn when a credential has not been re-verified within a chosen interval.

Useful official comparison points include the [CNCF individual certification catalogue](https://www.cncf.io/training/certification/), the [CNCF Kubernetes Certified Service Provider programme](https://www.cncf.io/training/certification/kcsp/), and the [Red Hat certification catalogue](https://www.redhat.com/en/services/certifications).

### Why this matters

Incorrect credentials damage trust quickly, particularly when the catalogue is used for hiring, promotion, or development planning. This should be addressed before expanding the certification content further.

## P1 — Record who reviewed content, not only when

### Finding

Every role has a syntactically valid `Last Reviewed` month, but **206 of 226 roles share `2026-03`**; 13 use `2026-07` and 7 use `2026-08`. A date proves that a field was populated, not that a relevant practitioner approved the role.

The viewer's deterministic 12-month staggering is a sensible way to spread future review workload. It does not provide review provenance or identify who is accountable for acting on that schedule.

### Recommendation

Add governance metadata such as:

- `Content Owner` — named role, team, or domain owner;
- `Reviewed By` — person/team or review body;
- `Review Status` — draft, practitioner-reviewed, manager-approved, or ratified;
- `Last Reviewed` — preferably a full date if auditability matters;
- `Next Review` or review cadence;
- optional `Evidence/Decision Record` link.

Do not require personal names if the repository should stay portable. A durable team or governance-body identifier is often better.

Add a coverage view showing roles by review status and owner. Treat a bulk-generated or mechanical edit separately from a subject-matter review so the date cannot accidentally imply approval.

## P1 — Complete the KPI work through domain decisions

### Finding

This is already tracked in [issue #140](https://github.com/JeanKadang/DOC-ITRoles/issues/140), so it should not be duplicated as a new issue.

The current non-strict validator passes, but `npm run validate -- --strict` fails because **199 of 227 checked files** have warnings. The warnings are overwhelmingly KPI rows with missing targets or targets explicitly marked “proposed”. The repository is correct not to invent organisational commitments simply to make validation green.

### Recommendation

Use a chapter-by-chapter acceptance process:

1. assign each chapter/domain to an accountable owner;
2. classify each row as an actual KPI, a diagnostic metric, or a qualitative outcome;
3. source targets from an SLA, SLO, policy, benchmark, or explicitly approved local baseline;
4. record whether the target is global, service-specific, or a configurable example;
5. enable strict validation one completed chapter at a time, then globally.

Consider renaming the section to `Measures and Outcomes` until targets are approved. Calling every topic a KPI creates false precision.

## P1 — Give roles stable identities and validate relationships

### Finding

Relationships are encoded as human-readable names across `Reports To`, `Direct Reports`, career paths, interaction tables, and narrative text. The viewer does a careful best-effort match, but the validator does not currently prove that these names resolve to catalogue roles. Some unmatched names are legitimate external destinations, such as `VP of Engineering` or `Distinguished Engineer`; others could be typos or stale renames.

The format cannot reliably distinguish those two cases.

### Recommendation

Introduce stable role IDs and explicit relationship types. For example:

```json
{
  "reportsTo": { "kind": "catalogue", "roleId": "chapter-lead-cloud-platform-infra" },
  "nextRoles": [
    { "kind": "external", "label": "Distinguished Engineer" }
  ]
}
```

Markdown can remain the readable source or presentation layer, but relationship-bearing fields should become machine-verifiable. Add validation for:

- unresolved catalogue references;
- accidental self-references;
- reporting cycles;
- contradictory `Reports To`/`Direct Reports` pairs;
- deleted or renamed role IDs;
- interaction modes outside the approved vocabulary.

This would make the organisation chart and career graph dependable data products rather than visual interpretations of text.

## P2 — Add shareable, reload-safe viewer routes

### Finding

Opening a role does not change the URL, and the page title remains `IT Roles Library`. A reload loses the selected role; browser Back cannot reliably express movement between roles; a colleague cannot receive a direct link to a role, comparison, matrix domain, or governance document.

This was confirmed in the running viewer: after opening Kubernetes Architect, the URL remained the site root and the document title did not change.

### Recommendation

Add lightweight hash routing without introducing a framework or build step, for example:

- `#/role/kubernetes/kubernetes_architect`;
- `#/compare/<role-a>/<role-b>`;
- `#/matrix/kubernetes`;
- `#/doc/skills-progression`.

Use `history.pushState`/`popstate` or hash changes, update `document.title`, restore state on load, and add copy-link affordances. Keep search text optional in the URL to avoid excessively long or sensitive URLs.

This is likely the single highest-value viewer enhancement for real organisational use.

## P2 — Deduplicate and clarify search results

### Finding

Searching for `Kubernetes Architect` reports “1 of 226 roles matching” while also showing a `Content matches (15)` group. The exact role appears in both the content group and the filtered hierarchy, so the same result is displayed twice. The first content snippet also begins with metadata-table text rather than the most useful contextual passage.

### Recommendation

- Exclude exact title matches from the content-reference group.
- Label the counts separately, for example `1 title match · 14 content references`.
- Prefer snippets from narrative sections over the H1/metadata block.
- Highlight the matching phrase accessibly, not by colour alone.
- Consider grouping content references by relationship context or section heading.

## P2 — Add a thin browser-level test layer

### Finding

The 220 tests give excellent coverage to pure logic, server endpoints, generators, and validators. They do not run the actual `index.html` DOM interactions in a browser. That leaves critical integration behaviour unprotected: startup rendering, search wiring, opening a role, panel switching, compare mode, keyboard activation, exports, routing, responsive navigation, and sanitised Markdown rendering.

### Recommendation

Add a deliberately small Playwright suite as a development dependency. It need not undermine the zero-runtime-dependency goal. Start with five journeys:

1. load home and confirm live counts;
2. search and open a role;
3. deep-link and reload a role after routing is added;
4. compare two roles and close comparison;
5. use the mobile menu and keyboard navigation.

Add an automated accessibility pass with axe-core or an equivalent tool, plus a few direct assertions for focus order, accessible names, and expanded/collapsed states. Keep visual snapshots limited to stable, high-value layouts.

## P2 — Centralise catalogue configuration

### Finding

Domain labels live in `roleMeta.js`, while chapter membership and icons live in `index.html`; scripts and tests parse or consume these structures separately. Adding a domain requires edits in multiple locations. The pattern is manageable at 34 domains but makes drift and casing mistakes more likely. `Roles/FinOps` is also the only domain folder that does not follow the documented lowercase-and-underscores convention.

### Recommendation

Create one `data/catalogue.json` containing domain ID, label, chapter, icon, display order, aliases, and chapter-lead role ID. Generate or import all server/viewer mappings from it.

Also decide whether to migrate `Roles/FinOps` to `Roles/finops`. If retained for compatibility, document it as a deliberate exception and test the case-sensitive path.

## P2 — Track vendored assets as maintained dependencies

### Finding

Vendoring supports the offline goal, and the files include version/license headers. However, there is no repository-level `LICENSE`, `NOTICE`, third-party notice, or vendor manifest. Dependabot's npm checks cannot update libraries that are copied directly into `vendor/`, so their security and upgrade lifecycle is manual.

### Recommendation

Add `vendor/README.md` or `THIRD_PARTY_NOTICES.md` with, for each asset:

- package and version;
- authoritative download/release URL;
- license and retained notice requirements;
- checksum;
- date reviewed;
- upgrade procedure and owner.

Add a script that verifies filenames/headers/checksums and optionally checks upstream releases in a scheduled workflow. Clarify the project's own licence or explicitly state why it remains private and unlicensed.

## P3 — Split the UI by responsibility, without adopting a framework

### Finding

The simplicity trade-off is defensible, but `index.html` is now approximately **3,524 lines / 166 KB**, and `viewer-logic.js` is approximately **1,015 lines / 56 KB**. Inline styles, the main DOM controller, configuration, templates, and event handlers share one file. Inline handlers also require `unsafe-inline` in the Content Security Policy.

### Recommendation

Keep the no-build architecture, but split along stable boundaries:

- `styles.css`;
- `app.js` for startup and state;
- `views/role.js`, `views/search.js`, `views/matrix.js`, and similar modules;
- shared catalogue configuration in `data/catalogue.json`;
- event delegation instead of inline `onclick` attributes.

This would improve reviewability and allow a stricter CSP. Do it incrementally when touching each area rather than as a rewrite.

## P3 — Improve mobile information density

### Finding

The narrow-screen role view is functional, but the header subtitle is clipped, the career path becomes a long field of pills, and the section navigator requires horizontal scrolling with partially visible labels. These are polish issues, not blockers.

### Recommendation

- Hide or wrap the subtitle cleanly at the smallest breakpoint.
- Offer a compact `From / Current / To` disclosure for long career paths.
- Replace the horizontal section strip with a labelled section menu on narrow screens.
- Consider hiding Print on mobile and prioritising Share/Copy link after routing exists.

## Additional product ideas

These are options, not implied commitments. They should only become backlog items if they support the catalogue's intended audience.

### 1. Trust dashboard

Create a governance view that combines:

- review status and owner;
- missing/proposed KPI targets;
- unverified or aging credentials;
- unresolved/external relationships;
- technology items that have changed radar status.

This would convert maintenance from repository archaeology into a visible work queue.

### 2. Change-impact summaries

For each release, generate a human-readable summary such as:

- roles added, removed, or renamed;
- reporting-line changes;
- responsibilities moved between domains;
- technologies or credentials added/retired;
- roles requiring manager or employee acknowledgement.

This is more useful to adopters than a code-oriented changelog alone.

### 3. Local overlays without forking the core catalogue

Organisations will want local reporting lines, tooling, targets, location rules, and terminology. Define an overlay format that can replace or extend selected fields while leaving the portable base catalogue intact. The viewer could clearly label base content versus local policy.

### 4. Evidence-aware role comparison

The current side-by-side comparison is useful. A more decision-oriented version could highlight:

- scope and autonomy changes between levels;
- skills that increase in proficiency;
- decisions gained or relinquished;
- relationships and on-call expectations that change;
- locally configured versus base-catalogue content.

The generated skills matrix provides a good foundation for this.

### 5. Decision records for taxonomy changes

Add short ADRs for consequential choices such as chapter boundaries, the Product Owner model, IC versus management ladders, role naming, and what is deliberately outside the catalogue. This prevents the same organisational debates from being rediscovered through code and issue history.

### 6. Contribution guidance for subject-matter reviewers

A `CONTRIBUTING.md` should focus less on Git mechanics and more on evidence:

- what counts as an actual review;
- how to handle disputed ownership;
- how to cite standards and credentials;
- when a metric may be called a KPI;
- how to mark organisation-specific assumptions;
- what content should not be generated without expert approval.

## Suggested delivery sequence

### Next 2–4 weeks

1. Accept this report's findings into GitHub Issues rather than using this file as a second backlog.
2. Create the credential registry and audit one high-risk domain as a pilot.
3. Add content-owner/review-status fields to the template and decide the governance vocabulary.
4. Implement role deep links and document titles.
5. Fix search-result duplication.

### Following 1–2 releases

1. Add stable role IDs and relationship validation.
2. Add the five critical browser journeys and an accessibility smoke test.
3. Centralise domain/chapter configuration.
4. Add third-party notices and a vendor manifest.
5. Continue issue #140 chapter by chapter with accountable domain owners.

### Later, if adoption justifies it

1. Add local overlays and change-impact reports.
2. Build the trust dashboard.
3. Modularise the UI as touched by feature work.
4. Decide the organisational mechanism behind issue #151; avoid building assessment or survey features until an owner and operating process exist.

## What not to do

- Do not fabricate KPI targets to achieve a clean strict-validation run.
- Do not treat `Last Reviewed` as proof of expert approval without provenance.
- Do not add more free-text credential names without authoritative sources.
- Do not rewrite the viewer in a framework solely because `index.html` is large.
- Do not turn this review document into another long-lived backlog; accepted work belongs in Issues.
- Do not optimise the synchronous local server for hypothetical scale before there is a real multi-user deployment requirement.

## Final view

The repository's engineering foundation is sound. Its next maturity threshold is organisational rather than technical: can a user tell which content is authoritative, who owns it, what evidence supports it, and when it must be revisited?

If the project answers those questions well, it can become a credible operating model for roles rather than merely a polished catalogue of descriptions.
