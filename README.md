# IT Roles Library

A portable role definition repository for infrastructure and platform engineering teams. Covers 32 domains and 218 roles — spanning the full hierarchy from Engineer to Senior Engineer, Architect, Lead Architect, Principal Architect, Technical Area Lead (TAL), and Product Area Lead (PAL).

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

Or directly:

```powershell
node server.js
```

Then open **http://localhost:3000** in your browser.

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

## Role hierarchy

| Level | Badge | Description |
|---|---|---|
| Product Area Lead (PAL) | Dark navy | Cross-domain delivery, people, and budget leadership |
| Technical Area Lead (TAL) | Blue | Cross-domain technical direction and governance |
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
├── Roles/                                  # All role definitions (32 domains)
│   ├── leadership/                         # PAL, TAL
│   ├── cloud_platforms/                    # Azure, AWS, GCP + Lead/Principal
│   ├── devops/                             # DevOps, Developer Experience, Platform Reliability
│   ├── ai_governance/                      # AI Governance, AI Platform
│   ├── data_engineering/                   # Data Platform, Data Mesh, DataOps
│   ├── security/                           # README.md explains scope
│   ├── security_cross_platform/            # README.md explains scope
│   ├── security_identity/                  # README.md explains scope
│   └── ...                                 # 32 domains total
├── docs/                                   # Governance and reference documentation
│   ├── role_template.md                    # Template for new roles
│   ├── improvements_and_recommendations.md # Backlog of future improvements
│   ├── CROSS_DOMAIN_INTERACTIONS.md        # Domain ownership and escalation paths
│   ├── SKILLS_PROGRESSION.md              # Career progression framework
│   └── ONBOARDING_TEMPLATE.md             # 30/60/90 day onboarding plan template
├── test/                                   # node:test suite (server + roleMeta)
├── vendor/                                 # Vendored third-party assets (marked.min.js)
├── server.js                               # Node.js web server (no dependencies)
├── roleMeta.js                             # Shared role metadata parser (server + validator)
├── validate-roles.js                       # Content validator — `npm run validate`
├── index.html                              # Single-file web UI
├── start.bat                               # Windows launcher
├── package.json                            # Scripts: start, test, validate
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
| `docs/improvements_and_recommendations.md` | Backlog of future improvements and industry trend tracking |
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

Checks every role file against the canonical 13-section template and required metadata fields (`Domain`, `Role Level`, `Last Reviewed`). Missing sections or metadata are reported as errors (exit code 1); non-canonical values (e.g. an unrecognized `Role Level`) are reported as warnings. Pass `--strict` to fail the build on warnings too.

### Security

- No external CDN dependencies — `marked` is vendored locally under `vendor/` and served by `server.js`.
- Every response sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and a `Content-Security-Policy` restricting script/style/connect origins to same-origin.
- `/api/role`, `/api/doc`, and `/vendor/*` all validate requested paths against traversal (`..`) and enforce their respective root directories.

## Design notes

- **Single-file `index.html`.** The entire UI (~1,700 lines of HTML/CSS/JS) lives in one file by design, so the whole app can be shared as two files (`index.html` + `server.js`) with no build step or bundler. This is a deliberate portability tradeoff, not unaddressed technical debt — split it up only if maintenance becomes painful.
- **Zero runtime dependencies.** `server.js` uses only Node.js built-ins; the one third-party library (`marked`) is vendored under `vendor/` rather than pulled from a CDN, so the app works fully offline.