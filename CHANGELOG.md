# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.16.0] - 2026-08-08

### Added

- **Authoritative credential registry and rollout guardrails (#211).** Adds a
  Kubernetes pilot, marker validation, stale-review warnings, and rollout
  documentation.
- **Spawned validator CLI regression coverage (#213).** Proves invalid
  registries exit 1 with the registry error, while stale-registry warnings exit
  0 normally and exit 1 under `--strict`.

### Changed

- **Vendored dependency integrity and governance are traceable (#209).**
  `npm run verify-vendor` enforces checksum/manifest verification, alongside
  recorded checksum and licence provenance, contribution evidence, and ADR
  governance.

### Fixed

- **Dark-theme contrast now meets the viewer accessibility gate (#208).**
- **Malformed `audited_roles` input is handled safely (#213).**

## [1.15.0] - 2026-08-07

The catalogue becomes easier to explore and safer to change. This release
adds two generated visual views, improves search results, and introduces
real-browser journey and accessibility checks across Chromium, Firefox, and
WebKit.

### Added

- **An interactive technology radar (#172, #195).** The generated radar data
  now has a responsive browser view with filters, keyboard navigation,
  accessible details, and direct links back to the catalogue evidence.
- **A generated skills matrix (#177).** Career rungs and role definitions are
  combined into a browsable matrix that makes expected progression easier to
  compare without duplicating source content.
- **Cross-browser journey coverage (#183).** Playwright now exercises search,
  role comparison, responsive navigation, keyboard operation, and the viewer's
  main accessibility paths in Chromium, Firefox, and WebKit. Failed CI runs
  retain browser diagnostics as short-lived artifacts.
- **Automated accessibility smoke checks (#183, #201).** Axe checks now block
  serious and critical regressions on the highest-value viewer journeys.

### Changed

- **Search results are clearer and less repetitive (#182).** Exact title
  matches no longer reappear as duplicate section results, search whitespace
  is normalized, and result previews prefer useful narrative text.
- **Repository review findings are traceable to GitHub work (#197, #198).** The
  review document now includes a maintained crosswalk from each recommendation
  to its issue, milestone, and current disposition.

### Fixed

- Light-theme viewer colors now meet the new automated contrast gate (#201).
- Accessibility scans now wait for finite entrance animations, preventing
  Firefox from measuring partially transparent content as a false contrast
  failure (#201, #205).
- Browser CI now permits failure-artifact uploads and has a bounded provisioning
  window that tolerates slow hosted-runner package mirrors (#203, #206).
- Markdown list spacing now passes the repository lint policy (#199, #200).

## [1.14.0] - 2026-08-06

KPI targets stop being a promise and start being numbers, and the catalogue
learns to describe itself: two generators, three drift guards, and a
technology radar derived from the roles rather than assembled by hand.

The theme across all of it is that a mechanism must not hide the gap it was
built to expose — seeded targets are counted apart from agreed ones, the
radar leaves a ring visibly empty rather than guessing at it, and every
hand-maintained list added this cycle fails the suite when it goes stale.

### Added

- **A technology radar, generated from the role definitions (#172).**
  `npm run build-radar` reads the **Technology Proficiency Levels** block of
  every role and writes `docs/TECHNOLOGY_RADAR.md` — 99 technologies across
  four quadrants, in the viewer's 📚 Resources group.

  | Ring | Rule | Technologies |
  |---|---|---:|
  | Adopt | Expert or Proficient in 10 or more roles | 40 |
  | Trial | Expert or Proficient below that threshold | 55 |
  | Assess | Named mostly at Working Knowledge or Awareness | 4 |
  | Hold | *No source in this repository* | **0** |

  **Only the proficiency block is counted.** `Microsoft Teams` appears in
  220 role files and in 5 proficiency bullets; a product named under Remote
  Work Considerations says nothing about the skill expected of a person.

  **Hold is empty and the document says why.** Nothing in a role definition
  says "stop using this", so the ring has no source here and is left visibly
  empty rather than quietly omitted or filled with a guess. The page states
  the other limit too: a count of role definitions is not a licence count,
  and a role definition may describe one person or thirty.

  **A curated vocabulary rather than extraction.** Parsing names out of the
  bullets yields 2,278 candidates — among them `equivalent`, `reporting` and
  `governance` — and puts Kubernetes at Awareness in 6 roles, because it is
  usually named inside a longer capability phrase. Matching known names
  against prose is reliable; parsing prose into names is not.
  `data/technologies.json` holds the vocabulary with aliases, so `Azure AD`
  folds into `Microsoft Entra ID`.

  That vocabulary is hand-maintained, which is this repository's dominant
  bug class, so a guard requires any capitalised term appearing in 25 or
  more proficiency bullets to be in the vocabulary or its explicit
  exclusions list. **It found HPE SimpliVity on its first run** — expected in
  25 bullets and absent from the list.

### Fixed

- **16 seeded targets that contradicted their own metric are corrected
  (#140).** Auditing all 258 rows seeded in 1.12.0 found the benchmark
  keyword matching incidentally rather than as the thing measured:

  | Was | Metric |
  |---|---|
  | `≥99.9%` | Model deployment lead time (hours … to production endpoint **availability**, trending down) |
  | `≤4 hours` | Vulnerability mean time to remediate (**MTTR**) — the remediation policy, not the P1 restore commitment |
  | `≥95%` | **Number of** ad hoc analysis requests completed within SLA per quarter |
  | `≤15%` | DORA metrics **trend** (deployment frequency, lead time, change failure rate, MTTR) |

  A wrong proposal is worse than a blank. The validator counts a blank as a
  gap and a `(proposed)` value as awaiting confirmation, so a target that
  does not fit its metric is the one state that reads as progress while
  being false. 15 rows return to an em dash and the vulnerability row is
  re-pointed at the remediation policy.

  Three guards prevent the class rather than the instances: a **unit
  conflict** rule (no percentage on a metric counted in hours or in units of
  work), a **direction-only** rule (`trend`, `improvement`, `etc.` describe
  travel, not a threshold), and a **composite** rule counting measure nouns
  rather than commas — so `Microsoft 365 service availability (Exchange,
  Teams, SharePoint)` stays seeded while `incident frequency, severity, and
  mean time to detect` does not.

  The guard was reconciled against all 258 rows before use, and refused two
  the hand audit had passed. Both were product lists rather than measure
  lists, which is what moved the composite rule off comma counting.

### Added

- **179 more rows carry a proposed target, each marked by where its number
  came from (#140).** 427 rows now hold an opening figure, up from 258.

  | Basis | Rows | Examples |
  |---|---|---|
  | Published benchmark | **275** | DORA change lead time `≤24 hours`, SLO attainment and guardrail compliance `≥95%` |
  | House starting point | **152** | documentation currency `≥95%`, first-review approval `≥80%`, ramp completion `≥90%` |

  **The distinction `(proposed)` cannot carry.** The marker says a number is
  not agreed; it does not say whether anybody published it. The house
  families — documentation currency (33 rows), accepted without rework (85),
  reaching independent delivery within the agreed ramp period (32) — are the
  largest in the catalogue and are standardised nowhere. Each entry now
  declares `basis: 'house'` and the note *"no industry standard; house
  starting point for discussion"*, and a test asserts every entry declares a
  basis, so one cannot be added as published by omission.

  The DORA lead-time figure is anchored to `commit` so that any duration
  called a lead time does not inherit it.

- The validator no longer describes proposals as *"seeded from an industry
  benchmark"*. The file marker cannot distinguish the two bases, and
  claiming a source for all of them would be false for 152 of the 427.

- **162 further rows carry an indicative number (#140).** Every untargeted
  row whose metric already declares what it is counted in — a `(%)`, a
  `(count per quarter)`, a `(ms)` — now has an opening figure. 168 rows met
  that test and 162 could be given one, taking proposals to **589 of the
  1,694 untargeted rows**.

  | Target | Families |
  |---|---|
  | `≥95%` | conformance to a standard · estate within its supported lifecycle · maintenance completed in window · hires retained at 90 days |
  | `≥90%` | quality gate pass rate · deployed from the approved standard build · review recommendations implemented |
  | `≥80%` | fulfilled without manual intervention · committed sprint items delivered |
  | `70–85%` | provisioned capacity actively utilised |
  | `70–80%` | eligible spend on reserved or committed capacity |

  The last two are **bands rather than thresholds**: under-use wastes the
  spend and over-use removes the headroom the capacity exists for, so a `≥`
  target would propose the wrong shape of answer.

  Counts get the lowest defensible figure rather than none —
  `≥1 per year` for engineers mentored who progress a level (22 rows),
  `≥1 per quarter` for knowledge-sharing (43), `≥2 per quarter` for
  recorded risks and debt items closed (11), `≥2 per year` for new patterns
  adopted into a standard (14). **A floor is not a level of output.** 1.12.0
  recorded that these families had no defensible figure; that holds for a
  target level, but "at least one a quarter" asserts only that the activity
  happens at all, which is sayable without knowing team size, and beats a
  blank. Access- and identity-related security incidents are the one count
  with a knowable right answer: `0 critical or high`.

  The direction-only guard narrows from `improvement` to `improvements in`.
  `Improvement in delivery metrics` is a direction and stays refused;
  `Improvement items proposed and adopted (count per quarter)` counts
  things, and the broader rule was withholding a target from it.

- **47 filename mentions became links (#168, #169).** A document naming
  another document was giving the reader a code span rather than a way to
  get there, and the viewer already routes in-body `.md` links.

  The onboarding templates were the sharp case: they instruct a new starter
  to read two documents the viewer carries as pages, and both were inert
  text. Prose now names each document as the sidebar names it — nobody
  scanning for *Career Paths & Skills Progression* will find
  `SKILLS_PROGRESSION.md`.

  Two rows in `ONBOARDING_TEMPLATE.md` were not mentions but instructions
  where a link belonged, one of them the **Day 1** learning resource. Both
  differ per hire, so they became fillable `\<link to the role definition\>`
  placeholders in the template's own style.

  `README.md` also gave a naming example for a file that does not exist,
  whose level contradicted the rule stated one line above it. Following a
  link landed the reader on a page headed `SKILLS PROGRESSION`, derived from
  the filename, for a document listed under a different name — the route now
  prefers the registered title.

  `test/doc-links.test.js` guards all three: no bare mention in a
  navigational document, no link to a file that does not exist, and no
  reverting the placeholders to prose.

### Still open

Tracked in #140. **1,105 of 1,941 KPI rows have no target** (down from
1,436). Nine of them declare a unit and are still blank on purpose:
`Engineering hours saved per quarter attributable to platform capabilities
(hours)` needs a baseline nobody has measured, and `Delivery teams
consuming a shared component (count)` names no period to count over.

The rest name a subject rather than a measure and need rewriting before any
target means anything — a KPI nobody can quantify is not a KPI.

The 589 proposals split **275 from a published benchmark and 314 house
starting points**. That distinction is not visible in the files, where both
render as `(proposed)`; it lives in `KPI_BENCHMARKS` as
`basis: 'benchmark' | 'house'`.

## [1.13.0] - 2026-08-06

Onboarding gains four level supplements, covering 206 of the 226 roles
without needing information the repository does not hold.

### Added

- **Onboarding supplements for Engineer, Senior Engineer, Architect and
  Product Owner (#149).** Each sits in the 🚀 Onboarding sidebar group, in
  level order, between the base template and the Chapter Lead variant.

  | Level | Roles | Scope of influence stated |
  |---|---|---|
  | Engineer | 61 | **Team** — 58 of 61 |
  | Senior Engineer | 56 | **Domain** — 45 |
  | Architect | 49 | **Domain-wide** — 47 |
  | Product Owner | 41 | **Domain** (backlog) |

  Each is an overlay of roughly 400 words: what changes at that level,
  additions to each of the 30/60/90 phases, and the failure modes common
  there. `ONBOARDING_TEMPLATE.md` keeps the shared 30/60/90 structure, the
  manager checklist and the check-in questions, and none of it is repeated.
  Copying 144 lines four times would guarantee the drift that #123 retired a
  509-line document over.

### On answering the issue differently from how it was filed

#149 asked for variants for *high-volume roles*, and named hiring volume and
access processes as what it was waiting on. That framing is what had kept it
open.

**Level is the better axis, and the catalogue already documents it.**
The role definitions state scope of influence consistently enough to
partition on, so four supplements reach 206 roles where naming two or three
high-volume roles would have reached two or three — and no hiring data is
needed to write them.

Every claim traces to something already in the catalogue rather than to
general onboarding advice:

- *"Assuming the guidance role includes line management"* comes from the
  phrasing **132 roles** share — "day-to-day technical guidance and
  mentoring; formal line management sits with the Chapter Lead"
- *"Not escalating soon enough"* comes from the Engineer's **Escalates To**
  line, which names the Senior Engineer
- *"Treating Governed By as advisory"* comes from the Architect's
  **Interactions** table, where Enterprise Architect and Security appear as
  governing roles
- *"Straying into technical decisions"* comes from the Owns/Advises split
  stated in nearly every Product Owner definition

The 20 roles outside these four levels — Chapter Leads and the executive
tier — are either covered by the existing Chapter Lead template or are
individual enough that a shared supplement would not serve them.

## [1.12.1] - 2026-08-06

KPI content: subject-style metrics rewritten into things that can actually
be counted. No behaviour change.

### Changed

- **348 KPI rows rewritten from subjects into countable measures (#140).**
  `Architecture design quality and effectiveness` becomes `Designs approved
  at first architecture review, without rework (%)`.

  | | Before | After |
  |---|---|---|
  | Subject-style rows | 852 | **506** |
  | Countable metrics awaiting a number | 584 | **930** |

  **Every rewritten row keeps its em dash.** The count of untargeted rows is
  unchanged at 1,436, deliberately — this proposes a *measure*, not a
  *target*. Rewriting what is measured is a lower-risk act than inventing
  what the number should be: a proposed measure is reviewable on its face,
  whereas a fabricated target reads as agreed fact.

  Rows that already carry a target are never rewritten, since changing what
  is measured would invalidate an agreed number.

### On scope, and what was learned

The work split into two passes with very different yields.

**313 rows came from 86 texts appearing in more than one role.** Doing the
repeated ones first put consistency where it mattered most —
`Documentation quality and completeness` alone appeared in 31 roles, and
phrasing it three ways would have been worse than leaving it.

**35 more came from three phrasing patterns.** A first pass tried ten
patterns; reviewing the generated output rejected seven of them —
`API standards completed without rework` (standards are not completed),
`Integration effort (count per quarter)` (effort is not a count),
`Resolving issues delivered in the committed period` (ungrammatical), and a
casing helper that turned `API` into `aPI`. Even the survivor needed
narrowing: `Implementation quality of X` produced
`standard configurations implementations` until anchored to X ending in
"solutions".

**The remaining 506 resist templating, and that is the point.** They appear
once each. The 86 repeated texts were repeated *because* they were generic;
singletons are specific and no shared frame serves them. They need
individual authoring.

### Still open

Tracked in #140:

- **930** countable metrics awaiting a number from the organisation
- **506** subject-style rows still needing individual rewriting
- **258** proposed benchmarks awaiting confirmation

## [1.12.0] - 2026-08-06

Every KPI section is now a table, with its gaps visible on the page rather
than only in a validator warning.

### Changed

- **All 200 remaining roles moved from bullet KPIs to the template's
  `| Metric | Target | Frequency |` table (#140).** 1,791 rows: 97 carried a
  target already stated in the prose, 13 a cadence.

  Metric text is kept **verbatim** rather than cut down to a name — a target
  already in the sentence is surfaced into its own column as well, so ~97
  rows repeat it. That redundancy is the price of guaranteeing nothing is
  lost in a 1,791-row rewrite, and it was verified rather than assumed:
  every original bullet appears unchanged as its metric cell.

- **258 rows seeded with recognised industry benchmarks, each marked
  `(proposed)` (#140).** Three-nines availability, DORA change failure and
  deployment frequency, common P1 restore and detection times, standard
  data-protection and security baselines, widely-used coverage thresholds.

  Correcting a draft is far easier than filling a blank, and a marked
  proposal carries none of the risk of an unmarked invented number — which
  would end up cited as though it had been agreed.

  **Adoption rate and incident rate are deliberately not seeded.** Both are
  widely measured and neither has an industry-standard value to propose.

### Added

- **The validator reports KPI targets per row, not per file.** Previously it
  warned that a role "uses bullets"; once every role has a table that
  warning goes silent, which would have hidden the very problem the
  conversion exists to expose. It now counts rows with **no target**
  separately from **proposed** targets awaiting confirmation, so neither
  converting a role nor seeding a benchmark can make it look finished.

  ```
  before: 200 files — "Key Performance Indicators uses bullets"
  after :   258 proposed awaiting confirmation
            1,436 rows still with no target
  ```

  `security_automation_engineer` is the first role in the catalogue to clear
  the check outright — all 8 of its KPIs already carry real targets.

### Testing

Suite grown **171 → 190**. New tests assert that `parseKpiBullet` does not
read `ISO 27001` or `the 2026 standard` as a target, that unmeasurable
metrics are **not** seeded, and that `documentation available to teams` does
not trigger the availability benchmark.

### Still open

1,436 rows have no target. Roughly a third name a real metric and need a
number; the rest name a subject and need rewriting or removal — a KPI nobody
can quantify is not a KPI. Tracked in #140.

## [1.11.1] - 2026-08-06

Content readability and test coverage. No behaviour change.

### Changed

- **The 73 run-on Technology Proficiency entries are split (#138).** 1.9.0
  deliberately left these whole, because a mechanical comma split would have
  shattered them — they are Oxford-comma capability groups, not flat tool
  lists, and splitting yields fragments like `and route table configuration`.
  Split points are authored per entry rather than derived: three mechanical
  rules were tried first and each failed on real data (capitalisation splits
  acronym lists; word count splits `Amazon EC2, Auto Scaling groups, and
  Elastic Load Balancing for compute management` into three when it is one
  capability).

  The detection heuristic flagged 84 candidates; **11 are single capabilities
  that merely contain an Oxford comma** — `ISO 27001, NIST CSF, and SOC 2
  control frameworks` is one thing — and were left alone, leaving exactly the
  73 from the issue.

  | | Before | After |
  |---|---|---|
  | Bullets | 73 | **254** across 47 files |
  | Longest proficiency bullet | 476 chars | **161** |
  | Bullets over 250 chars | 55 | **0** |
  | Bullets beginning with a connective | — | **0** |

  All 47 files verified to have an identical word multiset before and after.
  Also repairs a pre-existing `, ,` typo in
  `platform_engineering_product_owner` that produced an empty list segment.

### Testing

- **The accessible list fallbacks are extracted and covered (#118).**
  `orgListHtml` and `graphListHtml` build the "View as list" content behind
  the Org and Graph charts — what a screen-reader user gets instead of an
  ECharts canvas. Both were pure string builders sitting untested in
  `index.html`, where a regression is invisible to sighted testing. Moved to
  `viewer-logic.js` with 10 tests. Suite **161 → 171**.

  Scoped deliberately: two of the three priorities the issue named were
  already done (the search predicates became `roleMatchesFilter` in 1.9.0;
  `badgeClass` was already extracted), and the third — `renderMarkdown` — is
  not "trivially testable" as described. It wraps DOMPurify and marked, both
  browser globals, and `package.json` carries zero runtime dependencies by
  design. Moving it would break `viewer-logic.js`'s contract of staying
  DOM-free. The remaining inline code is DOM-coupled; testing it means adding
  jsdom, which is a dependency decision rather than a cleanup.

## [1.11.0] - 2026-08-06

Resolves the long-open question of which flagged role types belong in an
infrastructure and platform catalogue.

### Added

- **Quality Engineering domain (#148).** Four roles — Engineer, Senior
  Engineer, Architect, Product Owner — under DevOps & Delivery. It was the
  one genuine gap of five candidates considered: no role owned testing,
  yet the content was spread across the catalogue
  (`dataops_specialist` 20 mentions, `automation_framework_engineer` 19,
  `api_strategy_architect` 12). A discipline that is everywhere and owned
  by nobody is the same shape as the Service Desk gap closed in 1.6.0.

  Catalogue: **222 → 226 roles, 33 → 34 domains.**

### Changed

- **The Service Desk Lead's people-management exception is now documented
  (#148).** The catalogue turned out to have two management models rather
  than one: 132 roles state that formal line management "sits with the
  Chapter Lead", but `service_desk_lead` owns hiring, onboarding and career
  progression directly. Confirmed as deliberate rather than drift, with the
  reason recorded in the role — the desk runs a shift rota with its own
  progression ladder and volume-driven headcount, which a Chapter Lead one
  level removed cannot staff in real time. No Engineering Manager role was
  added.

### Not added, and why

Three candidates were declined on evidence rather than preference, each
recorded on the issue so the question does not recur:

- **Data Scientist / ML Engineer** — `mlops_engineer` already states it
  exists to "enable data science and AI teams", placing them outside the
  catalogue. Adding the role would contradict content already written.
- **Technical Writer** — not named as an interaction partner by a single
  one of the 222 roles.
- **Sustainability / Green IT Lead** — `finops_architect` carries 16
  sustainability mentions and owns carbon tracking; a separate lead would
  compete with an existing owner.

### Note on the drift guards

Adding a domain touches six registration points. The suite was run before
any of them were updated and named all six — including the
`CROSS_DOMAIN_INTERACTIONS.md` coverage guard added in 1.10.0, catching the
first new domain since it was written.

## [1.10.0] - 2026-08-05

Content coverage: the relationship graph now shows the whole catalogue,
edge computing reaches the roles that implement it, and the review-history
document stops competing with the issue tracker. Plus a recently-viewed
list.

### Added

- **Recently viewed (#117).** Navigation history was a single linear Back
  stack, so returning to a role seen a few minutes ago meant finding it
  again — and Compare actively encourages visiting several in sequence.
  The last ten roles now appear on the welcome screen, newest first,
  persisted across sessions. Revisiting a role moves it to the front
  rather than duplicating it, and the block stays hidden until there is
  history. Storage is treated as hostile: `localStorage` *throws* rather
  than returning null when unavailable (private mode, disabled site data,
  full quota), and its contents are user-writable and outlive the version
  that wrote them, so every access is guarded and stored history is
  sanitised on load rather than trusted.
- **Edge computing coverage across the remaining Modern Infrastructure and
  Specialized Computing roles (#150).** The March review added edge at
  architect level and never carried it down, so ten roles were expected to
  implement, operate or prioritise something their own role file never
  mentioned. Thirteen roles gained a responsibility and matching
  technologies, written per role: engineers got operational detail (local
  buffering for intermittent links, model rollout across edge fleets),
  senior engineers the design slice (what an SLO means when a site is
  unreachable but healthy), product owners roadmap framing without tooling
  depth. Every role in both domains now has coverage.

### Fixed

- **The Domain Relationship Graph showed 22 of 33 domains (#125).** It is
  built from `CROSS_DOMAIN_INTERACTIONS.md`, which never named the other
  eleven — including Virtualization (12 roles) and Security Cross-Platform
  (6) — so a reader got a picture silently missing a third of the
  catalogue. Entries were derived from those domains' own 377 existing
  interaction rows rather than invented. Graph nodes 27 → 38, links → 81,
  accessible list fallback 123 → 207 entries. Two drift guards were added
  and **verified to fail** when a domain is removed or renamed, rather than
  assumed to work.

### Changed

- **`improvements_and_recommendations.md` retired to a review-history note
  (#123).** A 509-line second source of truth that had drifted: it claimed
  "216 roles across 32 domains" in four places against an actual 222 across
  33, three items marked open were already complete, and its live items sat
  invisible at lines 54–279. Triaged before replacing — the three completed
  items were verified against the repository, and the five genuinely open
  ones became #148, #149, #150 and #151. The four-cycle review narrative
  was kept, since CHANGELOG records what shipped but not why each cycle
  happened. 509 lines → 48.

### Testing

Suite grown **154 → 161**. One of the new tests exists because driving the
browser caught a bug the green suite missed: `loadRecent()` sanitises stored
history by calling `pushRecent(stored, null)`, and the early return for a
missing entry handed the raw list back unfiltered, so a stored `null`
crashed the renderer. The unit test covering junk entries passed only
because it supplied a valid entry, taking the other branch.

## [1.9.0] - 2026-08-04

Sidebar filtering, the mechanical half of the role-content normalisation,
and two corrections to earlier work.

### Added

- **Filter the sidebar by level (#115).** Chips above the tree narrow it by
  role level and combine with the text query rather than replacing it.
  Reference docs carry no level, so a level filter hides them instead of
  matching everything.
- **The welcome stat tiles are navigation (#116).** The eight level tiles
  set the filter and, on narrow viewports, open the drawer so the result
  is visible. A tile means "show me these", so it sets rather than
  toggles — clicking two in a row does not leave both applied. The three
  summary tiles have nothing to filter by and stay inert.
- **Onboarding templates have their own sidebar group (#144).** The
  Resources list mixed read-only references describing the catalogue with
  templates you copy and fill in for a specific person; listing them
  identically made the templates easy to miss. Grouping is data-driven, so
  the onboarding group is somewhere new material gets added — 30/60/90
  plans, buddy checklists, per-chapter variants.

### Fixed

- **The Executives tile undercounted by one (#141).** It summed
  `CEO+CTO+CIO+SVP+CISO` and reported 5 of 6; CFO was missing. This is the
  third bug of that shape after #18 and #46, all of them a hand-maintained
  level list nobody extended. Rather than adding CFO to a fourth list, the
  tiles are generated from a shared `STAT_GROUPS`, and tests assert every
  canonical level sits in exactly one group and that the groups account for
  the whole catalogue. The level tiles now sum to 222.
- **Search says what it did (#114).** The sidebar reports `49 of 222 roles
  matching "aws" at Architect` whenever a filter is active, and the empty
  state names which constraint excluded everything. Two real defects sat
  behind this: chapter counts summed *unfiltered* totals, so a filtered
  chapter advertised more roles than it listed; and the content search was
  silent in three distinguishable states — no matches, request in flight,
  and request failed all rendered as nothing.
- **Reference sections no longer render smaller than the rest (#143).**
  1.8.0 de-emphasised Key Technologies, Remote Work Considerations and
  Recommended Certifications with a muted heading *and* a 0.95em size on
  the whole section, which shrank their body copy. Three sections out of
  thirteen rendering smaller read as a rendering fault rather than as
  hierarchy. Reverted; sections already collapse by default and the section
  nav handles navigation. The Owns / Advises On emphasis from the same
  release is kept.

### Changed

- **Section headings normalised to one spelling each (#122).** The
  validator accepted several historical spellings so a genuinely missing
  section was reported rather than a cosmetic difference, and that
  permissiveness is why the catalogue drifted. 207 files touched: 203
  `Key Decisions and Accountabilities`, 67 bare `Required Skills`, 4
  `Key Technologies & Platforms`/`& Tools`, 1 stray `and` on
  Certifications. A further 27 files carried `## Qualifications` as a
  *sibling* section, which the template folds into Required Skills &
  Qualifications — in every one it already sat directly beneath, so
  demoting it to `###` placed it inside the canonical section without
  moving a line of content.
- **Technology Proficiency levels use the template's sub-heading form
  (#122).** 191 files folded each tier into a single inline bullet.
  Splitting is not uniformly safe: 653 lines are flat tool lists and split
  cleanly, but 73 are grouped capability phrases using Oxford commas where
  a split yields fragments like `and route table configuration`. Those are
  kept verbatim and tracked in #138. Splitting is paren-aware throughout.
  Every one of the 191 files was verified to have an identical word
  multiset before and after — structure changed, content did not.

Validator warnings across the catalogue: **610 → 200**. All remaining are
the KPI-table class, which is not a formatting problem and needs real
organisational targets — tracked in #140.

### Testing

Suite grown **143 → 152**.

## [1.8.0] - 2026-08-04

A viewer-quality release: role documents became navigable rather than a
wall of text, the site became usable on a phone, and several thousand
cross-references that had never been links became clickable.

### Added

- **Cross-references resolve and the interactions table links (#120).**
  Role names written in prose — plural for a group (`Security Engineers`),
  or carrying a parenthetical qualifier (`Enterprise Architect (AI
  governance domain)`) — never matched the exact-match lookup, so they
  rendered as dead text. `findRoleByTitle` now normalises case,
  punctuation, a trailing parenthetical and a trailing plural, and nothing
  else: no fuzzy matching, because a near-miss resolving to the wrong role
  is worse than one that stays unlinked. The *Interactions with Other
  Roles* table was never linked at all and now resolves through the same
  function. Catalogue-wide, **639 interaction rows became navigable** and
  career-path resolution rose 294 → 375. Non-catalogue actors
  (`Development Teams`, `Business Leaders`) and aspirational career exits
  (`Chief Architect`, `VP of Engineering`) correctly stay as text.
- **Collapsible role sections (#112).** Opening a role expanded all 14
  sections at once — about 9,000 characters. Sections now start collapsed
  except *Role Overview* and *Role Scope & Boundaries*, taking visible text
  on load from 8,946 to **1,407 characters**. Native `<details>` for free
  keyboard and ARIA behaviour; a `beforeprint` handler force-opens every
  section and restores the reader's state afterwards, since CSS cannot
  expand a closed `<details>`.
- **Sticky section nav (#111).** Collapsing gives an overview at the top of
  the page; this covers what remains — once a section is expanded and the
  reader scrolls in, that overview is gone. A pinned bar lists every
  section, marks the current one via scroll-spy, and jumps to any of them,
  expanding the target first. Built as a horizontal bar rather than the
  side rail originally sketched, because compare mode splits the grid into
  two equal columns.
- **The reporting line is now visible (#113).** `Reports To` and `Direct
  Reports` were absent from the viewer entirely: the body renders from the
  first `## ` heading onward, so the metadata table above it never
  appeared — the #5 backfill across all 222 files was invisible in the UI.
  Both now render as header chips and link to the catalogue role where one
  resolves. 34% of these values exceed 60 characters (longest 241) because
  they explain the arrangement inline, so the lead-in shows and the
  qualifier moves to a tooltip — 121 characters down to 23 in the worst
  case.
- **Staggered review schedule (#124).** 206 of 222 roles carry an identical
  `2026-03` stamp, so at a flat 12-month threshold all of them would turn
  stale in March 2027 and the panel would stop being a work queue.
  Restamping from git history is not possible — the repository is *younger
  than the stamps it holds* (first commit 2026-07-06), so every file traces
  to one seeding commit and any staggered date would assert a review that
  never happened. The schedule is spread instead and the recorded dates
  stay truthful: each role falls due `STALE_MONTHS + slot` months after its
  stamp, turning **206 roles in one month into 9–29 per month across a
  year**. A missing date is never deferred.

### Fixed

- **The sidebar is an off-canvas drawer on narrow viewports (#110).** The
  single breakpoint only narrowed the sidebar to 240px, so at 375px it
  permanently occupied ~64% of the screen with no way to dismiss it. It now
  slides over the content behind a header toggle, closes on selection,
  Escape, or scrim tap, moves focus to search on open and back to the
  toggle on close, and clears its state when the viewport widens.
- **Closing Org, Graph or Careers over an open role no longer blanks the
  screen (#129).** Opening any panel hid the role grid but only
  `toggleMatrix` restored it, so three of five panels left an empty content
  area. Found while surveying the duplication for #119 — exactly the defect
  that issue predicted.
- **Role action buttons no longer overflow the viewport on mobile
  (#132).** The Print/Export/Compare row is ~283px and pushed *Compare*
  off-screen at 375px; it now wraps.

### Changed

- **The five overlay panels are driven by one registry (#119).** Matrix,
  Stale, Org, Graph and Careers each hid the other four by hand — the
  teardown existed in five copies plus a sixth in `closePanels` and a
  seventh inline in `openDoc`. `panelStateFor` now computes the desired
  state once and `index.html` applies it, so a sixth panel is one table
  row. **`index.html` lost ~245 lines.**
- **The validator warns on non-canonical headings and content formats
  (#121).** Its permissiveness — a code comment called the cleanup "a
  follow-up" that was never filed — is why the catalogue drifted. Reported
  as warnings, not errors, so CI stays green while #122 normalises the
  files; `--strict` already fails on warnings and is now the gate. Against
  the catalogue: 203 `and` vs `&`, 200 bullet KPIs, 191 inline proficiency
  levels, 67 bare `Required Skills`, and **4 previously unnoticed** `Key
  Technologies & Platforms`/`& Tools` variants a manual survey had missed.

### Testing

Suite grown **120 → 143 tests**. Every new pure function was written
test-first, including a collision guard asserting no two catalogue titles
reduce to the same lookup key, and a distribution test asserting the real
catalogue spreads across all 12 review months.

## [1.7.0] - 2026-08-04

### Added

- **`enterprise_architecture` engineer and product_owner tiers (#103).** The
  chapter had only 3 roles (`enterprise_architect`,
  `enterprise_architecture_senior_engineer`, `solution_architect`), breaking
  the 4-tier pattern every comparable chapter follows. Adds
  `enterprise_architecture_engineer` and `enterprise_architecture_product_owner`,
  wires the Senior Engineer's Direct Reports to the new Engineer role, and
  adds both to `SKILLS_PROGRESSION.md`.
- **`service_desk_product_owner` (#104).** The desk had no backlog owner for
  its own tooling roadmap (self-service portal, knowledge base,
  virtual-agent/chatbot deflection), distinct from `service_desk_lead`'s
  operational ownership (staffing, SLAs, escalation boundaries). No separate
  "manager" role was added — `service_desk_lead` already covers that scope
  at Senior Engineer level, matching how other domains fold "manager"
  titles into the Senior Engineer tier.
- **`Roles/c_suite/README.md` (#105).** Cross-references the CISO's actual
  location (`Roles/leadership/chief_information_security_officer.md`) so a
  reader landing in `c_suite/` doesn't assume it's missing. Mirrors the
  existing cross-reference README pattern used for the security domain
  split.

Catalog: 219 → 222 roles.

## [1.6.0] - 2026-07-25

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

- **The role template's reporting-line and interaction fields are now
  enforced by `npm run validate` (closes #6).** With the #5 backfill
  complete across all 219 role files, `Reports To` and `Direct Reports`
  metadata, the `Role Scope & Boundaries` section, and the Interactions
  table's `Interaction Mode` column are all required — missing any of them
  is an error, not a silent omission. The canonical structure is therefore
  now 14 sections rather than 13. `parseMeta` in `roleMeta.js` exposes
  `reportsTo` and `directReports` alongside the existing metadata fields.
  The Interaction Mode check matches a real table header followed by its
  delimiter row, so the template's explanatory blockquote above the table
  cannot satisfy it on its own.

- **Reports To / Direct Reports / Role Scope & Boundaries / Interaction
  Mode backfilled for the Cloud, Platform & Infrastructure chapter (#89,
  batch 7/7 — the final batch: 77 of 219 files, completing #5).** Cloud
  Platforms, Kubernetes, Modern Infrastructure, Virtualisation (VMware,
  Hyper-V, Nutanix), Specialised Computing (HPC), Server Hardware
  (vendor-agnostic and HPE), Server OS (Linux and Windows), Network, and
  FinOps all follow the standard IC-ladder pattern: Engineer reports to
  Senior Engineer, Senior Engineer and Product Owner report to the Cloud,
  Platform & Infrastructure Chapter Lead. Kubernetes and one Hyper-V file
  had the variant "Relationships & Collaboration" heading renamed to the
  canonical "Interactions with Other Roles" (mirroring the #7 fix, same as
  batch 4). Two grounded structural exceptions:
  - **Cloud Platforms has an explicit three-tier hierarchy above the
    standard architect ladder**, stated directly in its own role-overview
    text: the Cloud Principal Architect "operates below the Technical Area
    Lead (TAL)" and reports there directly rather than to the Chapter
    Lead; the Cloud Lead Architect "bridges the gap" between the Principal
    Architect's strategy and the AWS/Azure/GCP Cloud Architects' designs
    and reports to the Principal Architect. The three platform Architects
    themselves still report to the Chapter Lead like every other domain,
    but escalate cross-platform problems to the Cloud Lead Architect
    rather than straight to the Chapter Lead.
  - **Network Automation Architect is a peer to Network Architect**, per
    its own text ("automation extends and operationalises network
    designs" rather than replacing them) — both report to the Chapter
    Lead, mirroring the API Strategy/API Platform peer pattern from
    batch 4.
  Six further structural notes: Site Reliability Engineer/Senior Engineer
  has no Architect tier of its own in the catalog, so the Senior Engineer
  reports to the Chapter Lead directly and escalates to the Platform
  Engineering Architect (its closest real architectural relationship);
  GenAI Platform Engineer and MLOps Engineer both report to the GenAI
  Platform Architect (MLOps has no dedicated architect of its own); Chaos
  Engineer reports to the Site Reliability Senior Engineer. FinOps's
  interactions tables were fully restructured — the pre-existing content
  used a degraded "Reports to | X" / blank-role-cell pseudo-row format
  unlike every other domain's proper two-column table, including several
  rows with a literally empty Role cell — into the standard three-column
  format grounded in the same raw material. Fixed a malformed row in
  `hpc_architect.md` ("Facilitates knowledge sharing and documentation |
  All HPC stakeholders", with Role and Nature reversed) and merged a
  duplicate pair of rows in `hpc_engineer.md` describing the same
  researcher-training relationship twice.
- **Reports To / Direct Reports / Role Scope & Boundaries / Interaction
  Mode backfilled for the Security & Identity chapter (#88, batch 6/7:
  36 of 219 files — the domain's 2 governance specialists, GRC Risk
  Compliance Analyst and Business Continuity/DR Manager, were already on
  the modern template).** Security, Security Cross-Platform, Security &
  Identity, Data Protection, and Directory Services all follow the
  standard IC-ladder pattern: Engineer reports to Senior Engineer, Senior
  Engineer and Product Owner report to the Security & Identity Chapter
  Lead. Storage-style parallel ladders (Commvault vs. SimpliVity backup)
  each report straight to the Chapter Lead rather than to each other, same
  as the Storage/Qumulo Storage pattern from batch 5. Six Engineer- or
  Senior-Engineer-grade specialists with no dedicated tier of their own
  report to their nearest Architect or Senior Engineer: DevSecOps Engineer
  → DevSecOps Architect, Security Automation Engineer → Security
  Cross-Platform Senior Engineer, Cloud Security Posture Manager →
  escalates to Security Cross-Platform Architect, Identity Governance
  Specialist → escalates to Identity Management Architect, Privileged
  Access Management Engineer → PAM Architect (no PAM Senior Engineer tier
  exists), and Backup Reliability Engineer → "Commvault Senior Engineer or
  SimpliVity Backup Senior Engineer, depending on platform assignment"
  (mirroring the DevOps chapter's Automation Framework Engineer pattern).
  Fixed a malformed interactions-table row in `commvault_product_owner.md`
  ("IT Operations Manager | Or **Infrastructure Director**", referencing
  roles that don't exist in the catalog) the same way as the
  `qumulo_storage_engineer.md` fix in batch 5.
- **Reports To / Direct Reports / Role Scope & Boundaries / Interaction
  Mode backfilled for the Data & AI chapter (#87, batch 5/7: 27 of 219
  files — Data Management's 2 governance specialists, Data Governance
  Lead and Data Privacy Officer, were already on the modern template).**
  AI Governance, Data Engineering, Data Management (Storage and Qumulo
  Storage ladders), and Database Management all follow the standard
  IC-ladder pattern: Engineer reports to Senior Engineer, Senior Engineer
  and Product Owner report to the Data & AI Chapter Lead. Three Architect
  pairs are modeled as peers rather than a hierarchy, per each pair's own
  text describing the other as its counterpart rather than its manager:
  AI Governance Architect / AI Platform Architect, Data Platform Architect
  / Data Mesh Architect, and Storage Architect / Qumulo Storage Architect
  (parallel block-storage and unstructured-storage ladders). AI Platform
  Engineer, Data Platform Engineer, and Responsible AI Engineer — Engineer-
  grade specialists with no dedicated Senior Engineer tier of their own —
  report to their nearest Architect. Fixed a malformed interactions-table
  row in `qumulo_storage_engineer.md` ("Storage Team Lead | Or
  **Infrastructure Manager**", referencing roles that don't exist in the
  catalog) by replacing it with the standard escalation row to Qumulo
  Storage Senior Engineer.
- **Reports To / Direct Reports / Role Scope & Boundaries / Interaction
  Mode backfilled for the DevOps & Delivery chapter (#86, batch 4/7:
  24 of 219 files).** DevOps, App Platforms (API, .NET, Java), and
  Integration & Middleware all follow the standard IC-ladder pattern:
  Engineer reports to Senior Engineer, Senior Engineer and Architect and
  Product Owner report to the DevOps & Delivery Chapter Lead. API Strategy
  Architect and API Platform Architect are modeled as peers per the
  domain's own text (each the other's "primary technical counterpart"),
  both reporting to the Chapter Lead rather than one managing the other.
  Developer Experience Engineer and Platform Reliability Engineer — two
  Engineer-grade specialists with no dedicated Senior Engineer tier —
  report to the DevOps Architect. `devops_engineer.md`,
  `devops_senior_engineer.md`, and `devops_product_owner.md` had their
  "Relationships & Collaboration" heading renamed to the canonical
  "Interactions with Other Roles" (mirroring the #7 fix). Consolidated a
  duplicate Security Architect row in `devops_architect.md`'s interactions
  table into one entry.
- **Reports To / Direct Reports / Role Scope & Boundaries / Interaction
  Mode backfilled for the Service & Governance chapter (#85, batch 3/7:
  15 of 219 files — the domain's 4 governance specialists, built in the
  v1.2.0 batch, were already on the modern template).** ITSM &
  Configuration, Service Management, and Infrastructure Onboarding follow
  the standard IC-ladder pattern from batch 2. Enterprise Architecture is
  modeled as a sub-hierarchy rather than three flat peer architects: its
  own existing text has the Solution Architect explicitly "receiving
  strategic direction from" and "escalating enterprise-wide decisions to"
  the Enterprise Architect, and the Senior Engineer providing "operational
  and documentation support" to both — so both report to the Enterprise
  Architect, who alone reports to the Chapter Lead, rather than all three
  reporting straight to the Chapter Lead like the chapter's other domains.
- **Reports To / Direct Reports / Role Scope & Boundaries / Interaction
  Mode backfilled for the End User & Workplace chapter (#84, batch 2/7:
  13 of 219 files — the domain's 3 Service Desk files were already on the
  modern template).** Client Platform, Endpoint Management, and Modern
  Workplace's Engineer/Senior Engineer/Architect/Product Owner ladders now
  carry the full field set, establishing the reporting model for all
  remaining IC-ladder domains without a dedicated Lead role: Engineer →
  Senior Engineer (day-to-day technical lead) → Chapter Lead; Architect and
  Product Owner also report directly to the Chapter Lead, matching its own
  existing Direct Reports claim ("Domain Architects and Senior Engineers").
  A cross-file directional inconsistency was caught and fixed: Client
  Platform Architect's Service Desk Lead row was tagged as the Architect
  providing direction, when the Service Desk Lead's own file states it
  owns escalation-boundary decisions that Client Platform cites it as the
  owner of — corrected to Collaborates.
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
- **Stale README and role-template claims corrected.** An audit of every
  documented claim against the code found the docs had drifted behind the
  last two releases. The retired `Reliability Engineer` level (removed in
  v1.4.0, #69) was still listed in the README hierarchy table, in the
  filename conventions, and in `docs/role_template.md`'s Role Level
  vocabulary — so a role copied from the template would have picked a
  level the validator no longer accepts, which #6 now makes a hard error.
  The Features table was missing the entire visualization epic (org chart,
  relationship graph, career paths), full-text content search, the career
  stepper, and the welcome-screen distribution charts. The structure tree
  omitted `viewer-logic.js`, `SECURITY.md`, and `dependabot.yml`, listed
  three of four vendored libraries, and described `test/` as two suites
  when there are five; the design notes claimed "~1,700 lines" and "two
  files" for a UI that is now ~3,000 lines across three. Claims were
  re-verified against a running server rather than read off the source,
  after a first pass got three button labels wrong. Also gitignores
  `.claude/scheduled_tasks.lock`.

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
