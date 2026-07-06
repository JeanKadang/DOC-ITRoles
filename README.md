# IT Roles Library

[![CI](https://github.com/JeanKadang/DOC-ITRoles/actions/workflows/ci.yml/badge.svg)](https://github.com/JeanKadang/DOC-ITRoles/actions/workflows/ci.yml)

A portable role definition repository for infrastructure and platform engineering teams. Covers 32 domains grouped into 7 chapters, and 216 roles — spanning the full hierarchy from Engineer to Senior Engineer, Architect, Lead Architect, Principal Architect, Chapter Lead, Technical Area Lead (TAL), Product Area Lead (PAL), and C-Suite.

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
| Search | Type in the search box — filters roles and domains live |
| **Role Matrix** | Click **📊 Matrix** in the header — shows all roles in a domain × level grid |
| Compare two roles | Open a role, then click **⚖️ Compare** and select a second role |
| Print a role | Open a role, click **🖨️ Print** — sidebar and controls are hidden in print |
| Export a role | Open a role, click **⬇️ Export** — downloads it as a `.md` file |
| Export the matrix | In Matrix view, click **⬇️ Export CSV** |
| Track stale roles | Click **⏰ Stale (N)** in the header (shown only when roles are overdue) — lists roles with no review date or one older than 12 months, with CSV export |
| Dark mode | Click the **🌙 Dark** toggle in the header |
| Browse by chapter | Click a chapter in the sidebar to open its narrative panel (purpose, cross-chapter collaborations, live domain/role counts, Chapter Lead link) |

## Chapters

The 32 domains are grouped into 7 chapters, each led by a Chapter Lead:

| # | Chapter | Focus |
|---|---------|-------|
| 1 | ☁️ Cloud, Platform & Infrastructure | Cloud, containers, virtualisation, hardware, OS, network, FinOps |
| 2 | 🔄 DevOps & Delivery | CI/CD, developer experience, application platforms, integration |
| 3 | 📊 Data & AI | Data platform, storage, databases, AI governance |
| 4 | 🔒 Security & Identity | Security architecture, IAM/PAM, data protection, directory services |
| 5 | 🖥️ End User & Workplace | Client platform, endpoint management, Microsoft 365 |
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
| Reliability Engineer | Cyan | SRE/platform reliability focus |
| Product Owner | Orange | Backlog and roadmap ownership for a domain |

## Repository structure

```
roles_master/
├── .github/
│   └── workflows/ci.yml                    # CI: npm test, npm run validate, markdownlint
├── Roles/                                  # All role definitions (32 domains, 216 roles)
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
│   └── ...                                 # 32 domains total
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
├── test/                                   # node:test suite (server + roleMeta)
├── vendor/                                 # Vendored third-party assets (marked.min.js, chart.umd.min.js, echarts.min.js)
├── server.js                               # Node.js web server (no dependencies)
├── roleMeta.js                             # Shared role metadata parser (server + validator)
├── validate-roles.js                       # Content validator — `npm run validate`
├── index.html                              # Single-file web UI
├── start.bat                               # Windows launcher (auto-picks a free port, opens browser)
├── package.json                            # Scripts: start, test, validate, check-counts
├── CHANGELOG.md                            # Version history (Keep a Changelog)
└── README.md                               # This file
```

## Adding a new role

1. Copy `docs/role_template.md` into the appropriate folder under `Roles/`.
2. Name the file using the pattern: `<technology>_<level>.md`
   - Standard levels: `architect`, `senior_engineer`, `engineer`, `product_owner`, `reliability_engineer`
   - Special levels: `product_area_lead`, `technical_area_lead`, `cloud_lead_architect`, `cloud_principal_architect`
   - Example: `Roles/kubernetes/kubernetes_platform_engineer.md`
3. Fill in all 13 sections following the template.
4. Run `npm run validate` to confirm the file has all required sections and metadata.
5. Restart the server — new roles are picked up automatically on each request.

## Adding a new domain

1. Create a new folder under `Roles/` using lowercase and underscores.
   - Example: `Roles/service_mesh/`
2. Add role files inside it.
3. Add the domain key and a display label to the `DOMAIN_LABELS` map in `server.js` and the `ICONS` map in `index.html`.

## Role file format

Each role file follows the canonical 13-section structure. See `docs/role_template.md` for full guidance.

```markdown
# Role Title

| Field | Value |
|---|---|
| **Domain** | Domain Name |
| **Role Level** | Architect / Senior Engineer / Engineer / Product Owner |
| **Last Reviewed** | YYYY-MM |

---

## Role Overview
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

Checks every role file against the canonical 13-section template and required metadata fields (`Domain`, `Role Level`, `Last Reviewed`). Missing sections or metadata are reported as errors (exit code 1); non-canonical values (e.g. an unrecognized `Role Level`, or a `Domain` that doesn't match its folder's canonical label) are reported as warnings. Pass `--strict` to fail the build on warnings too.

### Checking counts

```powershell
npm run check-counts
```

Compares README.md's count-bearing sentences ("N domains grouped into N chapters, and N roles") against the actual `Roles/` filesystem and fails (exit code 1) on any mismatch — a guard-rail against count drift, since these numbers used to be hand-maintained and go stale silently.

### Continuous integration

`.github/workflows/ci.yml` runs on every push/PR to `main`:

- **Tests** (`npm test`) — blocking, on a Node 18/22 matrix.
- **Role content validation** (`npm run validate`) — currently non-blocking (`continue-on-error`) while 43 pre-existing role files are backfilled to the canonical template; see the repo's Issues tab.
- **Markdown lint** (`markdownlint-cli2`, config in `.markdownlint.json`) — blocking.
- **Count check** (`npm run check-counts`) — blocking.

### Security

- No external CDN dependencies — `marked` is vendored locally under `vendor/` and served by `server.js`.
- Every response sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and a `Content-Security-Policy` restricting script/style/connect origins to same-origin.
- `/api/role`, `/api/doc`, and `/vendor/*` all validate requested paths against traversal (`..`) and enforce their respective root directories.

## Design notes

- **Single-file `index.html`.** The entire UI (~1,700 lines of HTML/CSS/JS) lives in one file by design, so the whole app can be shared as two files (`index.html` + `server.js`) with no build step or bundler. This is a deliberate portability tradeoff, not unaddressed technical debt — split it up only if maintenance becomes painful.
- **Zero runtime dependencies.** `server.js` uses only Node.js built-ins; the one third-party library (`marked`) is vendored under `vendor/` rather than pulled from a CDN, so the app works fully offline.