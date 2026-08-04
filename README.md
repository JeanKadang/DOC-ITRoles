# IT Roles Library

[![CI](https://github.com/JeanKadang/DOC-ITRoles/actions/workflows/ci.yml/badge.svg)](https://github.com/JeanKadang/DOC-ITRoles/actions/workflows/ci.yml)

A portable role definition repository for infrastructure and platform engineering teams. Covers 33 domains grouped into 7 chapters, and 222 roles — spanning the full hierarchy from Engineer to Senior Engineer, Architect, Lead Architect, Principal Architect, Chapter Lead, Technical Area Lead (TAL), Product Area Lead (PAL), and C-Suite.

Repository: [github.com/JeanKadang/DOC-ITRoles](https://github.com/JeanKadang/DOC-ITRoles) (private). Issues and backlog are tracked on the [Issues tab](https://github.com/JeanKadang/DOC-ITRoles/issues).

## Prerequisites

**Node.js v18 or later.** The server and tooling use only Node.js built-in modules — no `npm install` needed.

### Install Node.js on Windows with winget

```powershell
winget install OpenJS.NodeJS.LTS
```

Close and reopen your terminal after installation, then verify:

```powershell
node --version
```

Don't have winget? Install it from the [App Installer page in the Microsoft Store](https://apps.microsoft.com/detail/9nblggh4nns1), or download Node.js directly from [nodejs.org](https://nodejs.org).

## Running the web viewer

**Start:**

```bat
start.bat
```

`start.bat` picks the first free port starting at 3000 (trying up to 3010), starts the server on it, and automatically opens your default browser to it — no manual URL needed. If port 3000 is already in use by something else (another dev server, etc.), it moves on to the next free port instead of touching that process.

Or directly:

```powershell
node server.js
```

Then open **http://localhost:3000** in your browser (does not auto-open — only `start.bat` does that).

To use a different port:

```powershell
$env:PORT = 8080; node server.js
```

## Features

| Feature | How to use |
|---|---|
| Browse roles | Expand a domain in the left sidebar |
| Search | Type in the search box — filters roles, domains, and chapters instantly. Queries of 3+ characters additionally search role *content* and prepend a **🔎 Content matches** group with snippets |
| **Role Matrix** | Click **📊 Matrix** in the header — shows all roles in a domain × level grid |
| **Org chart** | Click **🌳 Org** in the header — interactive hierarchy of chapters, domains, and roles plus the leadership line |
| **Relationship graph** | Click **🔗 Graph** in the header — force-directed view of how domains collaborate |
| **Career paths** | Click **📈 Careers** in the header — flow view of progression and cross-domain mobility |
| Career stepper | Open a role — its Career Development Path renders as a clickable stepper linking previous and next roles |
| Distribution charts | Shown on the welcome screen — roles per chapter and per level, each with an accessible table fallback |
| Compare two roles | Open a role, then click **⚖️ Compare** and select a second role |
| Print a role | Open a role, click **🖨️ Print** — sidebar and controls are hidden in print |
| Export a role | Open a role, click **⬇️ Export** — downloads it as a `.md` file |
| Export the matrix | In Matrix view, click **⬇️ Export CSV** |
| Track stale roles | Click **⏰ Stale (N)** in the header (shown only when roles are overdue) — lists roles with no review date or one older than 12 months, with CSV export |
| Dark mode | Click the **🌙 Dark** toggle in the header |
| Browse by chapter | Click a chapter in the sidebar to open its narrative panel (purpose, cross-chapter collaborations, live domain/role counts, Chapter Lead link) |

## Chapters

The 33 domains are grouped into 7 chapters, each led by a Chapter Lead:

| # | Chapter | Focus |
|---|---------|-------|
| 1 | ☁️ Cloud, Platform & Infrastructure | Cloud, containers, virtualisation, hardware, OS, network, FinOps |
| 2 | 🔄 DevOps & Delivery | CI/CD, developer experience, application platforms, integration |
| 3 | 📊 Data & AI | Data platform, storage, databases, AI governance |
| 4 | 🔒 Security & Identity | Security architecture, IAM/PAM, data protection, directory services |
| 5 | 🖥️ End User & Workplace | Client platform, endpoint management, Microsoft 365, service desk |
| 6 | 🎯 Service & Governance | ITSM, configuration management, service management, enterprise architecture |
| 7 | 👑 Leadership | C-Suite, SVP, CISO, Chapter Leads, TAL, PAL, cross-cutting leadership |

See `docs/CHAPTERS_OVERVIEW.md` for the full breakdown and `docs/chapters/*.md` for each chapter's detail. Domain and role counts are computed live from `Roles/` — never hand-maintained — to prevent drift.

## Role hierarchy

| Level | Badge | Description |
|---|---|---|
| C-Suite (CEO, CTO, CIO, CFO, CISO) | Distinct per role | Executive leadership — organisation-wide accountability |
| SVP | Slate | Senior VP of Technology — cross-chapter executive oversight |
| Product Area Lead (PAL) | Dark navy | Cross-domain delivery, people, and budget leadership |
| Technical Area Lead (TAL) | Blue | Cross-domain technical direction and governance |
| Chapter Lead | Teal | Leads one of the 7 chapters; owns its domains and Chapter Leads report to TAL/PAL |
| Principal Architect | Gold | Senior IC — org-wide architecture strategy |
| Lead Architect | Amber | Multi-domain architecture leadership and standards |
| Architect | Purple | Domain-level technical authority and design |
| Senior Engineer | Blue | Autonomous delivery and mentoring within a domain |
| Engineer | Green | Execution and learning within a domain |
| Product Owner | Orange | Backlog and roadmap ownership for a domain |

## Repository structure

```
roles_master/
├── .github/
│   ├── workflows/ci.yml                    # CI: npm test, npm run validate, check-counts, markdownlint
│   └── dependabot.yml                      # Weekly GitHub Actions + npm update checks
├── Roles/                                  # All role definitions (33 domains, 222 roles)
│   ├── leadership/                         # SVP, CISO, Chapter Leads, TAL, PAL
│   ├── c_suite/                            # CEO, CTO, CIO, CFO
│   ├── cloud_platforms/                    # Azure, AWS, GCP + Lead/Principal
│   ├── devops/                             # DevOps, Developer Experience, Platform Reliability
│   ├── ai_governance/                      # AI Governance, AI Platform (classical MLOps)
│   ├── modern_infrastructure/               # GenAI Platform, Infrastructure Automation
│   ├── data_engineering/                   # Data Platform, Data Mesh, DataOps
│   ├── service_management/                 # TPM, Major Incident, Change/Release, Vendor/Asset
│   ├── security/                           # README.md explains scope
│   ├── security_cross_platform/            # README.md explains scope
│   ├── security_identity/                  # README.md explains scope
│   └── ...                                 # 33 domains total
├── docs/                                   # Governance and reference documentation
│   ├── role_template.md                    # Template for new roles
│   ├── improvements_and_recommendations.md # Review history & completed-work record
│   ├── CROSS_DOMAIN_INTERACTIONS.md        # Domain ownership and escalation paths
│   ├── SKILLS_PROGRESSION.md              # Career progression framework
│   ├── ONBOARDING_TEMPLATE.md             # 30/60/90 day onboarding plan template
│   ├── onboarding_chapter_lead_template.md # Chapter Lead-specific onboarding variant
│   ├── CHAPTERS_OVERVIEW.md               # The 7 chapters: focus, lead, detail link
│   └── chapters/                           # Per-chapter narrative (rendered in the viewer)
├── scripts/
│   └── check-counts.js                     # Verifies README counts vs filesystem — `npm run check-counts`
├── test/                                   # node:test suite (server, roleMeta, validator, viewer logic, career paths)
├── vendor/                                 # Vendored third-party assets (marked, DOMPurify, Chart.js, ECharts)
├── server.js                               # Node.js web server (no dependencies)
├── roleMeta.js                             # Shared role metadata parser (server + validator)
├── viewer-logic.js                         # Browser-side pure logic, shared with the test suite
├── validate-roles.js                       # Content validator — `npm run validate`
├── index.html                              # Web UI markup, styles, and view wiring
├── start.bat                               # Windows launcher (auto-picks a free port, opens browser)
├── package.json                            # Scripts: start, test, validate, check-counts
├── SECURITY.md                             # Security policy and vulnerability reporting
├── CHANGELOG.md                            # Version history (Keep a Changelog)
└── README.md                               # This file
```

## Adding a new role

1. Copy `docs/role_template.md` into the appropriate folder under `Roles/`.
2. Name the file using the pattern: `<technology>_<level>.md`
   - Standard levels: `architect`, `senior_engineer`, `engineer`, `product_owner`
   - Special levels: `product_area_lead`, `technical_area_lead`, `cloud_lead_architect`, `cloud_principal_architect`
   - Example: `Roles/kubernetes/kubernetes_platform_engineer.md`
3. Fill in all 14 sections following the template.
4. Run `npm run validate` to confirm the file has all required sections and metadata.
5. Restart the server — new roles are picked up automatically on each request.

## Adding a new domain

1. Create a new folder under `Roles/` using lowercase and underscores.
   - Example: `Roles/service_mesh/`
2. Add role files inside it.
3. Add the domain key and a display label to the `DOMAIN_LABELS` map in `server.js` and the `ICONS` map in `index.html`.

## Role file format

Each role file follows the canonical 14-section structure. See `docs/role_template.md` for full guidance.

```markdown
# Role Title

| Field | Value |
|---|---|
| **Domain** | Domain Name |
| **Role Level** | Architect / Senior Engineer / Engineer / Product Owner |
| **Reports To** | Role this position reports to |
| **Direct Reports** | Roles managed, or "None" for individual contributors |
| **Last Reviewed** | YYYY-MM |

---

## Role Overview
## Role Scope & Boundaries
## Business Impact
## Key Responsibilities
## Key Decisions & Accountabilities
## Required Skills & Qualifications
## Interactions with Other Roles
## Key Technologies
## Typical Day-to-Day Activities
## Key Performance Indicators
## Remote Work Considerations
## Career Development Path
## Recommended Certifications & Learning Paths
```

## Governance documents

| Document | Purpose |
|---|---|
| `docs/CROSS_DOMAIN_INTERACTIONS.md` | Domain ownership boundaries, key relationships, escalation paths |
| `docs/SKILLS_PROGRESSION.md` | Engineer → Senior → Architect career ladder per domain |
| `docs/ONBOARDING_TEMPLATE.md` | 30/60/90 day plan template for new hires |
| `docs/onboarding_chapter_lead_template.md` | Onboarding variant for incoming Chapter Leads |
| `docs/CHAPTERS_OVERVIEW.md` | The 7 chapters, their focus, and links to per-chapter detail |
| `docs/improvements_and_recommendations.md` | Review history, rationale, and industry-trend tracking (open work tracked as [GitHub issues](https://github.com/JeanKadang/DOC-ITRoles/issues)) |
| `CHANGELOG.md` | Version history of the codebase (Keep a Changelog format) |
| `SECURITY.md` | Security policy and how to report a vulnerability |

## Development

### Testing

```powershell
npm test
```

Runs the Node.js built-in test runner (`node --test`) against `test/` — covers path-traversal protection on `/api/role`, `/api/doc`, and `/vendor/*`, API response shapes, and role-metadata parsing (including the BOM-prefixed-file edge case).

### Validating role content

```powershell
npm run validate
```

Checks every role file against the canonical 14-section template and required metadata fields (`Domain`, `Role Level`, `Reports To`, `Direct Reports`, `Last Reviewed`), and requires the Interactions table to carry an `Interaction Mode` column. Missing sections, metadata, or the mode column are reported as errors (exit code 1); non-canonical values (e.g. an unrecognized `Role Level`, or a `Domain` that doesn't match its folder's canonical label) are reported as warnings. Pass `--strict` to fail the build on warnings too.

Duplicate H1 role titles across the catalog are also errors — the same title appearing in two files is a content-integrity bug that shipped twice before this check existed.

### Checking counts

```powershell
npm run check-counts
```

Compares README.md's count-bearing sentences ("N domains grouped into N chapters, and N roles") against the actual `Roles/` filesystem and fails (exit code 1) on any mismatch — a guard-rail against count drift, since these numbers used to be hand-maintained and go stale silently.

### Continuous integration

`.github/workflows/ci.yml` runs on every push/PR to `main`:

- **Tests** (`npm test`) — blocking, on a Node 18/22 matrix.
- **Role content validation** (`npm run validate`) — blocking; every role file must match the canonical template.
- **Markdown lint** (`markdownlint-cli2`, config in `.markdownlint.json`) — blocking.
- **Count check** (`npm run check-counts`) — blocking.

### Security

- No external CDN dependencies — all third-party browser libraries (`marked`, `DOMPurify`, chart libraries) are vendored locally under `vendor/` and served by `server.js`.
- All rendered markdown is sanitized with DOMPurify before insertion into the DOM, and dynamic strings (role titles, levels, labels, search input) are HTML-escaped — a malicious or copy-pasted `.md` file cannot execute script in the viewer.
- Every response sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and a `Content-Security-Policy` restricting script/style/connect origins to same-origin.
- `/api/role`, `/api/doc`, and `/vendor/*` all validate requested paths against traversal (`..`) and enforce their respective root directories.

## Design notes

- **Near-single-file UI.** Markup, styles, and view wiring live together in `index.html` (~3,000 lines) with no build step or bundler, so the app stays portable. The one deliberate exception is `viewer-logic.js`, which holds the pure functions (level ordering, stale-role computation, career-path parsing) so the `node:test` suite can import and test them directly — logic that was previously untestable and shipped two silent bugs. Keep new *pure* logic there and new *DOM* work in `index.html`.
- **Zero runtime dependencies.** `server.js` uses only Node.js built-ins; the third-party browser libraries (`marked`, `DOMPurify`, Chart.js, ECharts) are vendored under `vendor/` rather than pulled from a CDN, so the app works fully offline.