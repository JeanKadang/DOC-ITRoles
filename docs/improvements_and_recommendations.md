# Review history

> **This document is closed.** It recorded four review cycles between March and July 2026 and doubled as a backlog. It no longer tracks work: open items live in [GitHub Issues](https://github.com/JeanKadang/DOC-ITRoles/issues), and what shipped is in [CHANGELOG.md](../CHANGELOG.md). Retired in [#123](https://github.com/JeanKadang/DOC-ITRoles/issues/123).

## Why it was retired

It had become a second source of truth, and it drifted.

By August 2026 it claimed "216 roles across 32 domains" in four places while the catalogue held **222 across 33**. `scripts/check-counts.js` guards README.md against exactly that drift but never covered this file. Three items still marked open had in fact been completed. Its genuinely live items sat at lines 54, 225, 239, 251, 255, 263 and 279 of a 509-line file, invisible to anyone working from the Issues tab.

Its own closing section had already reached the same conclusion — *"the issue tracker is now the single source of truth for what's outstanding"* — but the body above it was never brought into line, so the status markers kept implying live tracking.

The completed items are recorded properly in CHANGELOG.md, against the commits and PRs that delivered them.

## What the four review cycles covered

**Reviews 1–2 (March 2026)** — established the canonical section structure and applied it across the catalogue: Business Impact, Key Decisions & Accountabilities (the Owns vs. Advises On table), Remote Work Considerations, and a restructured Recommended Certifications. Produced [`role_template.md`](role_template.md).

**Review 3 (March 2026)** — content depth. AI/GenAI responsibilities across cloud and platform roles, sovereign cloud patterns, supply-chain security (SLSA, SBOM, Sigstore), zero-trust integration, platform engineering and internal developer platforms, edge computing, and sustainability/carbon tracking. Compliance coverage extended to NIST CSF and IEC 62443.

**Review 4 (July 2026)** — structural gaps. Added Reports To / Direct Reports, the Role Scope & Boundaries section and the Interaction Mode column to the template, then backfilled all three across the catalogue. Added eight service-operations and governance roles, resolved four duplicate role titles, fixed a BOM parsing bug affecting 57 files, and built out the viewer's validation tooling, tests, export and stale-role tracking.

## Where its open items went

| Item | Outcome |
|---|---|
| Backfill Reports To / Scope / Interaction Mode | **Done** — complete across every role file and now enforced by `validate-roles.js` |
| Service Desk L1–L3 roles | **Done** — the `service_desk` domain holds analyst, senior analyst, lead and product owner |
| Section-drift cleanup | **Done** — [#122](https://github.com/JeanKadang/DOC-ITRoles/issues/122); validator warnings 610 → 200 |
| Five flagged role types, plus the Engineering Manager question | [#148](https://github.com/JeanKadang/DOC-ITRoles/issues/148) |
| Role-specific onboarding variants | [#149](https://github.com/JeanKadang/DOC-ITRoles/issues/149) |
| Edge computing coverage for the remaining roles | [#150](https://github.com/JeanKadang/DOC-ITRoles/issues/150) |
| Skills assessment, effectiveness measurement, technology radar | [#151](https://github.com/JeanKadang/DOC-ITRoles/issues/151) |

## Where things live now

| | |
|---|---|
| Open work | [GitHub Issues](https://github.com/JeanKadang/DOC-ITRoles/issues), labelled by priority (P0–P3) and category |
| What shipped, and when | [CHANGELOG.md](../CHANGELOG.md) |
| The role template | [`role_template.md`](role_template.md) |
| Structural rules, enforced | `validate-roles.js` and the `test/` suite |

The full text before retirement is in git history:

```bash
git show v1.9.0 -- docs/improvements_and_recommendations.md
```
