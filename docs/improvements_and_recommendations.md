# Role description improvements and recommendations

> **Last Updated:** July 2026 (Review 4) — Status update: role template extended with Reports To/Direct Reports, Role Scope & Boundaries, and Interaction Mode fields (backfill across 218 roles pending); 8 service-operations and governance roles added; 3 duplicate role titles resolved; web viewer maturity pass (validation tooling, tests, security headers, export, stale-role tracking — see CHANGELOG.md). Catalogue now 218 roles across 32 domains. See status indicators below.
>
> **Status key:** ✅ Completed · ⏳ Partially done · 📋 Not yet started · 🔄 Process/people — requires owner assignment

---

## Overall structure improvements

### 1. Standardization across role types ✅ Completed

**Recommendation:**
Standardize all role descriptions to include these canonical sections in order:

1. Metadata block — Domain, Role Level, Last Reviewed *(added March 2026)*
2. Role Overview
3. **Business Impact** *(added March 2026)*
4. Key Responsibilities
5. **Key Decisions & Accountabilities** — Owns vs. Advises On table *(added March 2026)*
6. Required Skills & Qualifications
7. Interactions with Other Roles
8. Key Technologies
9. Typical Day-to-Day Activities
10. Key Performance Indicators
11. Remote Work Considerations *(added March 2026)*
12. Career Development Path
13. **Recommended Certifications & Learning Paths** *(restructured March 2026)*

**Status:** `docs/role_template.md` fully updated. All 218 roles follow this structure. New roles created in March 2026 Review 3 use the full template.

---

### 2. Cross-domain role mapping ✅ Completed

**Recommendation:**
Create a centralized map of cross-domain dependencies showing key handoffs, shared responsibilities, escalation paths, and collaboration touchpoints.

**Status:** `docs/CROSS_DOMAIN_INTERACTIONS.md` created — covers domain ownership boundaries for 12 technology decisions, 10 key cross-domain relationships, security domain scope clarification, and a 5-step escalation chain.

**Remaining:** Assign a process owner to keep this document current as domains evolve. 🔄

---

### 3. Skills progression framework ✅ Completed

**Recommendation:**
Develop a skills progression framework showing Engineer → Senior Engineer → Architect progression, technical vs. soft skills, and cross-domain mobility paths.

**Status:** `docs/SKILLS_PROGRESSION.md` created — covers the 7-level hierarchy, progression criteria per transition, domain-by-domain role ladders (with actual file names), and 7 cross-domain mobility paths.

---

### 4. Reporting lines, scope boundaries, and interaction mode ⏳ Partially done

**Recommendation:**
Role descriptions captured horizontal peer interactions well (via the Interactions table) but were silent on the vertical reporting line, explicit ownership boundaries, and the direction of each cross-role relationship — the classic overlap failure mode in a 218-role catalog.

**Status:** `docs/role_template.md` updated (2026-07) with:

- **Reports To** / **Direct Reports** fields in the metadata table.
- A new **Role Scope & Boundaries** section: scope of influence, experience anchor, explicit out-of-scope statement, and escalation path (escalates to / escalated to by).
- An **Interaction Mode** column added to the Interactions with Other Roles table (Collaborates / Consumes From / Provides To / Governed By / Escalates To).

**Remaining:** Backfill these fields across all 218 existing role files. Not yet enforced by `validate-roles.js` — added as a required section only once backfill is complete, to avoid a wave of false "missing section" errors on existing files. 🔄

---

### 5. Duplicate role titles across domains ✅ Completed

**Recommendation:** A duplicate-filename scan across the full catalog (2026-07) found 3 role names existing in two different domains at once — a UX and content-integrity risk (search, matrix, and comparisons cannot distinguish them).

**Status:**

- **AI Platform Architect / AI Platform Engineer** existed in both `ai_governance` (classical MLOps: feature stores, model registries, training pipelines) and `modern_infrastructure` (GenAI/LLM: RAG, vector databases, agentic workflows) with genuinely different scope but identical titles. Renamed the `modern_infrastructure` pair to **GenAI Platform Architect** / **GenAI Platform Engineer** (`Roles/modern_infrastructure/genai_platform_architect.md`, `Roles/modern_infrastructure/genai_platform_engineer.md`) to disambiguate; each file cross-references its AI Governance counterpart.
- **Developer Experience Engineer** existed in both `devops` and `modern_infrastructure` with substantially overlapping content (one copy also had a garbled metrics reference mixing NIST CSF into a developer-productivity list). Removed the `modern_infrastructure` duplicate; `Roles/devops/developer_experience_engineer.md` remains canonical (matches the original creation record above).
- **DataOps Engineer** (`data_management`, Engineer level) duplicated **DataOps Specialist** (`data_engineering`, Senior Engineer level) — near-identical role overview. Removed `Roles/data_management/dataops_engineer.md`; `Roles/data_engineering/dataops_specialist.md` remains canonical.

Catalog count adjusted from 220 to 218 roles as a result. Verified with `npm run validate` (218 files checked, same 43 pre-existing errors, 0 new) and `npm test` (19/19 passing).

---

## Content enhancement recommendations

### 1. Technology-specific experience levels ✅ Completed — Architect roles

**Recommendation:**
Add a proficiency scale to the Required Skills section of each role:

- **Awareness** — Basic understanding of concepts
- **Working Knowledge** — Can implement with guidance
- **Proficient** — Can independently implement and troubleshoot
- **Expert** — Can design, optimize, and provide thought leadership

**Status:** All 52 Architect-level roles now have a `**Technology Proficiency Levels:**` subsection with Expert / Proficient / Working Knowledge / Awareness tiers. Coverage is 52/52 across all 30 domains.

**Coverage by domain (Architect roles):**

| Domain | Architect roles with proficiency table |
|---|---|
| ai_governance | 2/2 |
| app_platforms | 4/4 |
| client_platform | 1/1 |
| cloud_platforms | 5/5 |
| data_engineering | 2/2 |
| data_management | 2/2 |
| data_protection | 2/2 |
| database_management | 1/1 |
| devops | 1/1 |
| directory_services | 1/1 |
| endpoint_management | 1/1 |
| enterprise_architecture | 3/3 |
| FinOps | 1/1 |
| infrastructure_onboarding_cross_platform | 1/1 |
| integration_middleware | 1/1 |
| itsm_configuration | 1/1 |
| kubernetes | 1/1 |
| modern_infrastructure | 4/4 |
| modern_workplace | 1/1 |
| network | 2/2 |
| security | 2/2 |
| security_cross_platform | 1/1 |
| security_identity | 3/3 |
| server_hardware | 1/1 |
| server_hardware_hpe | 1/1 |
| server_os_linux | 1/1 |
| server_os_windows | 1/1 |
| service_management | 1/1 |
| specialized_computing | 1/1 |
| virtualization | 3/3 |
| **Total** | **52/52** |

**Remaining (recounted 2026-07-06):** Coverage is now 214/218 role files repo-wide (verified via `grep -rl "Technology Proficiency Levels" Roles`), not the ~159 non-architect roles previously estimated — most non-architect roles were backfilled since that estimate was written but the count here wasn't updated. Only 3 actual roles remain: `Roles/endpoint_management/endpoint_management_senior_engineer.md`, `Roles/leadership/engineering_practices_champion.md`, `Roles/modern_workplace/modern_workplace_senior_engineer.md`. (A 4th file without the section, `Roles/FinOps/cloud_cost_optimization_standards.md`, is a reference/standards doc exempt from the role template, not an actual role.)

---

### 2. Business Impact alignment ✅ Completed

**Status:** All roles include the Business Impact section (Business Objective, Value Metrics, Key Stakeholders, Processes Supported).

---

### 3. Remote Work Considerations ✅ Completed

**Status:** All roles include the Remote Work Considerations section covering eligibility, tools, on-site requirements, time zone flexibility, and on-call demands.

---

## New role recommendations

### 1. Cloud FinOps specialists ✅ Completed

| Role | Status |
|---|---|
| Cloud Cost Optimization Engineer | ✅ Created — `Roles/FinOps/cloud_cost_optimization_engineer.md` |
| Cloud Economics Analyst | ✅ Created — `Roles/FinOps/cloud_economics_analyst.md` |

---

### 2. Automation specialists ✅ Completed

| Role | Status |
|---|---|
| Infrastructure Automation Architect | ✅ Created — `Roles/modern_infrastructure/infrastructure_automation_architect.md` |
| Automation Framework Engineer | ✅ Created — `Roles/devops/automation_framework_engineer.md` |

---

### 3. Community of practice leaders ✅ Completed

| Role | Status |
|---|---|
| Technical Community Leader | ✅ Created — `Roles/leadership/technical_community_leader.md` |
| Engineering Practices Champion | ✅ Created — `Roles/leadership/engineering_practices_champion.md` |

---

### 4. Platform engineering specialists ✅ Completed

| Role | Status |
|---|---|
| Developer Experience Engineer | ✅ Created — `Roles/devops/developer_experience_engineer.md` |
| Platform Reliability Engineer | ✅ Created — `Roles/devops/platform_reliability_engineer.md` |
| API Strategy Architect | ✅ Created — `Roles/app_platforms/api_strategy_architect.md` |

---

### 5. Cloud security specialists ✅ Completed

| Role | Status |
|---|---|
| Cloud Security Posture Manager | ✅ Created — `Roles/security_cross_platform/cloud_security_posture_manager.md` |
| Identity and Access Governance Specialist | ✅ Created — `Roles/security_identity/identity_governance_specialist.md` |
| Security Automation Engineer | ✅ Created — `Roles/security_cross_platform/security_automation_engineer.md` |

---

### 6. Data infrastructure specialists ✅ Completed

| Role | Status |
|---|---|
| Data Platform Engineer | ✅ Created — `Roles/data_engineering/data_platform_engineer.md` |
| DataOps Specialist | ✅ Created — `Roles/data_engineering/dataops_specialist.md` |
| Data Mesh Architect | ✅ Created — `Roles/data_engineering/data_mesh_architect.md` |

---

### 7. Service governance and enterprise risk specialists ✅ Completed

**Recommendation:** Identified during a 2026-07 review of role-information completeness — the catalog was deep on technology/platform roles but thin on the service-operations, delivery-coordination, and governance layer that ties platform teams together.

| Role | Status |
|---|---|
| Technical Program Manager / Delivery Manager | ✅ Created — `Roles/service_management/technical_program_manager.md` |
| Major Incident Manager | ✅ Created — `Roles/service_management/major_incident_manager.md` |
| Change / Release Manager | ✅ Created — `Roles/service_management/change_release_manager.md` |
| Vendor / Supplier / IT Asset Manager | ✅ Created — `Roles/service_management/vendor_supplier_it_asset_manager.md` |
| Business Continuity / Disaster Recovery Manager | ✅ Created — `Roles/data_protection/business_continuity_disaster_recovery_manager.md` |
| Data Governance Lead | ✅ Created — `Roles/data_management/data_governance_lead.md` |
| Data Privacy Officer (DPO) | ✅ Created — `Roles/data_management/data_privacy_officer.md` |
| GRC / Risk & Compliance Analyst | ✅ Created — `Roles/security/grc_risk_compliance_analyst.md` |

**Note:** All 8 roles use the enhanced role template (Reports To / Direct Reports, Role Scope & Boundaries, Interaction Mode) — see "Overall structure improvements" item 4 above.

**Remaining (flagged, not yet actioned):** QA/Test Engineering (SDET), Data Scientist/ML Engineer (distinct from MLOps Engineer), Service Desk L1-L3, Technical Writer, and Sustainability/Green IT Lead were flagged during the same review as potentially out of scope for an infrastructure/platform-focused catalog. Also flagged: whether Chapter Lead should remain the sole people-manager role or whether a distinct "Engineering Manager" role is needed — not yet decided. 📋

---

## Implementation recommendations

### 1. Role description maintenance process 🔄 Process — owner required

**Recommendation:** Annual reviews for technical accuracy; quarterly updates for emerging technology; integration with HR competency frameworks.

**Actionable next step:** Designate a process owner (Architecture Lead or HR Business Partner) and schedule the first quarterly review for Q2 2026.

---

### 2. Skills assessment integration 🔄 Process — owner required

**Recommendation:** Connect role descriptions to skills assessment frameworks, training programs, certification tracking, and career progression pathways.

**Actionable next step:** Share `docs/SKILLS_PROGRESSION.md` with the HR/L&D team as the foundation for a skills matrix aligned to the LMS.

---

### 3. Onboarding integration ✅ Completed

**Status:** `docs/ONBOARDING_TEMPLATE.md` created — a 30/60/90 day plan template with a pre-day-1 manager checklist, domain-specific orientation tasks, and milestone check-ins.

**Remaining:** Create role-specific variants for high-volume roles (e.g., Azure Cloud Architect, DevOps Architect). 🔄

---

### 4. Role effectiveness measurement 🔄 Process — owner required

**Recommendation:** Track time-to-productivity for new hires, internal mobility success rates, skills gap accuracy, and project success rates with properly staffed roles.

**Actionable next step:** Establish a feedback loop — quarterly pulse survey to managers and practitioners against role definitions. Results feed the maintenance process (item 1 above).

---

### 5. Continuous role evolution strategy 🔄 Process — owner required

**Recommendation:** Technology radar integration, industry benchmark comparisons, regular practitioner feedback, skills inventory mapping.

**Actionable next step:** Adopt a lightweight technology radar (e.g., Thoughtworks format) reviewed quarterly alongside role descriptions.

---

## Industry trend alignment

### 1. AI and ML operations integration ✅ Completed

**Status:** AI Governance domain expanded from 3 to 7 roles. AI Platform Architect, AI Platform Engineer, AI Governance Engineer, and AI Governance Product Owner all created. All cloud architect roles updated with AI service responsibilities.

---

### 2. Edge computing expertise ⏳ Partially done

**Recommendation:** Add edge computing components to infrastructure roles — distributed systems management, edge device deployment, edge-to-cloud connectivity, low-latency application support.

**Status:** Edge computing responsibilities, tools (KubeEdge, OpenYurt, AWS Greengrass, Azure IoT Edge, NVIDIA Jetson, Intel OpenVINO, AWS Wavelength, Azure Edge Zones), and KPIs added to `platform_engineering_architect.md`, `infrastructure_automation_architect.md`, and `hpc_architect.md`. Remaining modern_infrastructure and specialized_computing roles to be reviewed in the next cycle.

---

### 3. Sustainability focus ✅ Completed

**Status:** FinOps Architect updated with carbon footprint tracking (Azure Carbon Optimization, AWS Customer Carbon Footprint Tool, GCP Carbon Footprint). Cloud architect roles updated with sustainability-aware sovereign cloud patterns.

---

### 4. Zero trust security integration ✅ Completed

**Status:** Security Architect and Security Cross-Platform roles include zero trust architecture patterns, identity-centric security, and continuous verification.

---

### 5. Platform engineering focus ✅ Completed

**Status:** DevOps Architect updated with Backstage, Port, Cortex IDP tooling and DORA/SPACE metrics. Developer Experience Engineer role created. Infrastructure Automation Architect role created.

---

### 6. GitOps and DevOps evolution ✅ Completed

**Status:** Declarative infrastructure management, GitOps tooling (ArgoCD, Flux), and policy-as-code are present across DevOps, Kubernetes, and Cloud Platform roles.

---

## 2025–2026 industry trend updates

### 1. Generative AI and agentic automation ✅ Completed

**Status:**

- New roles: AI Platform Architect, AI Platform Engineer, Developer Experience Engineer, AI Governance Engineer, AI Governance Product Owner ✅
- Cloud Architect roles updated with Azure AI Foundry, SageMaker, Vertex AI ✅
- DevOps Architect updated with AI-assisted pipeline tooling ✅
- Security Architect updated with prompt injection defense, MITRE ATLAS, LLM rate limiting ✅
- FinOps Architect updated with token-based cost attribution and GPU/LLM cost governance ✅
- Network Architect updated with named AIOps tools (Cisco DNA Center, Arista CloudVision, Juniper Mist AI) ✅
- EU AI Act risk-tier compliance added to AI Governance Architect and Senior Engineer ✅
- NIST AI RMF Govern/Map/Measure/Manage cycle added to AI Governance roles ✅

---

### 2. Microsoft Entra ID ✅ Completed

All references to Azure Active Directory updated to Microsoft Entra ID.

---

### 3. Software supply chain security (SSCS) ✅ Completed

**Status:** DevOps Architect updated with SLSA framework, SBOM generation (Syft, Trivy), artifact signing (Sigstore/Cosign), and dependency scanning (Dependabot, Renovate, Grype).

---

### 4. Platform engineering maturity ✅ Completed

**Status:** Backstage, Port, Cortex added to DevOps Architect. DORA metrics and SPACE framework explicitly named. Developer Experience Engineer role created.

---

### 5. FinOps v2 and AI cost management ✅ Completed

**Status:** FinOps Architect updated with per-user/per-model token attribution, prompt caching optimization, GPU reservation vs. spot modelling, and named sustainability dashboards. Infracost added to DevOps Architect Key Technologies.

---

### 6. eBPF and cloud-native networking ✅ Completed

**Status:** Kubernetes Architect includes Cilium (eBPF CNI and service mesh), Tetragon (runtime security), and Hubble (network observability).

---

### 7. Sovereign cloud and data residency ✅ Completed

**Status:** Azure Cloud Architect updated with Azure Sovereign Cloud and EU Data Boundary compliance. AWS Cloud Architect updated with GovCloud and Digital Sovereignty Pledge patterns. GCP Cloud Architect updated with Assured Workloads and Access Transparency.

---

### 7. C-suite executive roles ✅ Completed

| Role | Status |
|---|---|
| Chief Executive Officer | ✅ Created — `Roles/c_suite/chief_executive_officer.md` |
| Chief Technology Officer | ✅ Created — `Roles/c_suite/chief_technology_officer.md` |
| Chief Information Officer | ✅ Created — `Roles/c_suite/chief_information_officer.md` |
| Chief Financial Officer | ✅ Created — `Roles/c_suite/chief_financial_officer.md` |

C-suite roles are served under a dedicated `c_suite` domain within the Leadership chapter. CEO, CTO, CIO, and CFO each have distinct badge colours and appear as a separate sub-section in the web viewer sidebar above the existing Leadership domain.

---

### 8. Client Platform domain ✅ Completed

| Role | Status |
|---|---|
| Client Platform Architect | ✅ Created — `Roles/client_platform/client_platform_architect.md` |
| Client Platform Senior Engineer | ✅ Created — `Roles/client_platform/client_platform_senior_engineer.md` |
| Client Platform Engineer | ✅ Created — `Roles/client_platform/client_platform_engineer.md` |
| Client Platform Product Owner | ✅ Created — `Roles/client_platform/client_platform_product_owner.md` |

Covers Windows 10/11, macOS, and Linux desktop engineering. Primary hardware fleet is Lenovo ThinkPad and ThinkCentre; MacBook fleet also in scope; Linux-on-Lenovo emerging. Roles cover Lenovo Vantage, Thin Installer, driver pack management, fwupd/LVFS, Intune/SCCM device management, and Lenovo Premier Support integration.

---

## Compliance framework coverage

### 1. NIST CSF coverage ✅ Completed

**Status:** NIST CSF (or NIST SP 800-53 / NIST SP 800-218 where more precise) is now present across all 155 compliance-referencing role files. Verified March 2026 Review 3.

---

### 2. IEC 62443 coverage ✅ Completed

**Status:** IEC 62443 (OT/ICS security standard) added to 12 files where OT/ICS security governance is genuinely applicable — security architecture, DevSecOps, cross-platform security posture, CISO, security identity chapter lead, PAM architect, identity governance specialist, and network architect. Not applied to pure IT roles (DevOps, storage, client platform) where it is out of scope.

---

### 3. Compliance framework summary

All roles covering security, compliance, or regulated workloads now reference the full applicable framework set:

| Framework | Coverage | Notes |
|---|---|---|
| ISO/IEC 27001 | All security and compliance roles | ISMS baseline |
| NIST CSF / SP 800-53 | 155 files | All compliance-referencing roles |
| IEC 62443 | 12 files | OT/ICS-relevant roles only |
| GDPR | All data and security roles | EU data protection |
| NIS2 | All security roles | EU network and information security |
| DORA | Financial resilience roles | Digital Operational Resilience Act |
| SOC 2 | Security and governance roles | Trust services criteria |

---

## Summary scorecard

> **Status snapshot only.** Every actionable/outstanding item is consolidated in the **Open TODOs** section below (with process/people items detailed under **Implementation recommendations**). This table intentionally carries no "outstanding" column so there is a single backlog to maintain.

| Area | Status |
|---|---|
| Template standardization | ✅ Complete |
| Cross-domain interactions map | ✅ Complete |
| Skills progression framework | ✅ Complete |
| Technology experience levels (Architect roles) | ✅ Complete |
| Business Impact sections | ✅ Complete |
| Remote Work sections | ✅ Complete |
| New roles (218 total) | ✅ Complete |
| Chapter Lead roles (6 created) | ✅ Complete |
| C-suite roles (CEO, CTO, CIO) | ✅ Complete |
| Client Platform domain | ✅ Complete |
| Chapters organisational layer | ✅ Complete |
| Interactions format standardisation | ✅ Complete |
| Role template fully up to date | ✅ Complete |
| Role matrix — all levels shown | ✅ Complete |
| Onboarding template (base) | ✅ Complete |
| AI/GenAI era updates | ✅ Complete |
| Sovereign cloud additions | ✅ Complete |
| SSCS / supply chain security | ✅ Complete |
| Platform engineering tooling | ✅ Complete |
| Edge computing | ✅ Complete |
| NIST CSF coverage | ✅ Complete |
| IEC 62443 coverage | ✅ Complete |
| Maintenance process / owner assignment | 🔄 In progress |
| Skills assessment / LMS integration | 🔄 In progress |
| Role effectiveness measurement | 🔄 In progress |
| Reporting lines / scope / interaction-mode fields | ⏳ Template done, backfill pending |
| Proficiency tables — non-architect roles | 📋 Next cycle |
| Role-specific onboarding variants | 📋 Next cycle |
| Section-drift cleanup (43 files) | 📋 Next cycle |

---

## Appendix: standardized role description template *(Updated March 2026)*

See `docs/role_template.md` for the full template with placeholder guidance.

| # | Section | Notes |
|---|---|---|
| 1 | **Metadata block** | Domain, Role Level, Last Reviewed |
| 2 | **Role Overview** | One concise paragraph |
| 3 | **Business Impact** | Objectives, value metrics, stakeholders, processes supported |
| 4 | **Key Responsibilities** | 6–10 bullet points |
| 5 | **Key Decisions & Accountabilities** | Owns vs. Advises On table |
| 6 | **Required Skills & Qualifications** | Technical Skills + Soft Skills & Leadership + **Technology Proficiency Levels block** (Expert / Proficient / Working Knowledge / Awareness) |
| 7 | **Interactions with Other Roles** | `Role \| Nature of Interaction` table — consistent across all roles |
| 8 | **Key Technologies** | 8–12 items |
| 9 | **Typical Day-to-Day Activities** | 8–10 items |
| 10 | **Key Performance Indicators** | `Metric \| Target \| Frequency` table (preferred over bullets) |
| 11 | **Remote Work Considerations** | Eligibility, tools, on-site, time zone, on-call/operational demands |
| 12 | **Career Development Path** | Previous Roles + Potential Next Roles |
| 13 | **Recommended Certifications & Learning Paths** | Core / Complementary / Learning Resources + compliance frameworks note |

---

**Process owner:** Designate a responsible party (Architecture Lead or HR Business Partner) for maintaining this document and scheduling quarterly reviews.

**Feedback loop:** Practitioners and managers should raise suggested improvements via the team's standard backlog process, referencing the relevant role file and section.

---

## Open TODOs — July 2026 (Review 4)

Consolidated backlog from the July 2026 audit. Completed items are checked and kept for traceability; open items carry a status key (📋 not started · 🔄 needs owner).

### Done this review

- [x] **Codebase maturity pass** — `package.json`, vendored `marked` (no CDN), security headers + CSP, `roleMeta.js` shared parser, `validate-roles.js`, `node:test` suite (19 tests), Markdown/CSV export, stale-role tracking. See `CHANGELOG.md`.
- [x] **BOM parsing bug fixed** — 57 role files with a UTF-8 BOM had their titles silently mis-parsed; fixed in the parsing layer.
- [x] **8 service-operations / governance roles added** — TPM, Major Incident Manager, Change/Release Manager, Vendor/IT Asset Manager, BC/DR Manager, Data Governance Lead, Data Privacy Officer, GRC/Risk & Compliance Analyst.
- [x] **3 duplicate role titles resolved** — GenAI Platform Architect/Engineer renamed; duplicate Developer Experience Engineer and DataOps Engineer removed. Catalogue: 220 → 218.
- [x] **Role template extended** — Reports To / Direct Reports, Role Scope & Boundaries, Interaction Mode.
- [x] **Stale role counts corrected** across `CHAPTERS_OVERVIEW.md` and this document (→ 218 roles, 32 domains).
- [x] **Chapters refactored** — per-chapter narrative split into `docs/chapters/*.md`, rendered live in the viewer's chapter panel; flat overview retired to a thin index; counts now computed live to prevent drift.
- [x] **Markdown lint noise cleared** — MD032 blank-line normalisation across 208 files.

### Open — documentation currency

- [ ] `docs/SKILLS_PROGRESSION.md`: domain ladders cover only ~10 of 32 domains; add the remaining domains, the 8 new specialist Senior-Engineer roles, and the GenAI vs classical-MLOps split. Clarify the `Data Engineer → AI Governance Engineer → AI Platform Architect` mobility path now that there are two distinct AI platform architect roles. 📋
- [ ] `docs/CROSS_DOMAIN_INTERACTIONS.md`: add ownership-boundary and escalation rows for the new governance roles — change enablement (Change/Release Manager), major incident/problem (Major Incident Manager), BC/DR ownership, and the data-classification split across Data Governance Lead vs Data Privacy Officer vs Security. 📋
- [x] `docs/role_template.md`: the Role Level example lists only four levels — show the full canonical vocabulary (Engineer … Chapter Lead, TAL, PAL, C-Suite, Reliability Engineer). Fixed 2026-07-06.
- [x] The proficiency-table backfill figure was stale (claimed "~159/166 remaining"); recounted 2026-07-06 — actual remaining is 3 roles, not 166. See "Technology-specific experience levels" above.

### Open — content backfill

- [ ] Backfill the new template fields (Reports To / Direct Reports / Role Scope & Boundaries / Interaction Mode) across all 218 existing role files. 📋
- [ ] Once backfill is complete, enable those sections as required checks in `validate-roles.js`. 📋
- [ ] Resolve the 43 role files that `npm run validate` reports with missing canonical sections (pre-existing drift; run `npm run validate` for the current list). 📋
- [ ] Proficiency tables for the 3 remaining roles: `Roles/endpoint_management/endpoint_management_senior_engineer.md`, `Roles/leadership/engineering_practices_champion.md`, `Roles/modern_workplace/modern_workplace_senior_engineer.md` (corrected 2026-07-06 — previously overstated as ~166). 📋

### Open — tooling and process

- [ ] Initialise Git for the repository — currently no version control, which makes large automated edits (like the 208-file lint fix) higher-risk. 🔄
- [ ] Add a CI workflow (e.g., GitHub Actions) running `npm test`, `npm run validate`, and markdownlint on pull requests. Requires Git first. 📋
- [ ] Consider a small script to generate any count-bearing documentation from the filesystem, so counts never drift again (the chapter panel already does this live). 📋
- [ ] Assign a maintenance owner and schedule the next quarterly review. 🔄

### Open — visualisation & data presentation

> Design principle: any charting library must be **vendored locally** (served from `vendor/`, never a CDN) to preserve the app's offline, zero-external-dependency design — the same approach used for `marked`. Library guidance: **ECharts** for hierarchy/relationship visuals (`tree`, `graph`, `sankey` series); **Chart.js** for simple distributions (bar/donut). ECharts min is ~1 MB vs Chart.js ~200 KB — weigh bundle size before adding.

- [ ] **Organisational chart view** — add an interactive org diagram rendering the live hierarchy (Chapters → Domains → Roles) plus the leadership line (CEO/CTO/CIO → SVP → TAL/PAL → Chapter Leads), built from `/api/roles` data. Recommended: ECharts `tree` series (native hierarchy; Chart.js cannot draw trees). 📋
- [ ] **Vendor a charting library** — add `echarts.min.js` (and/or `chart.umd.js`) under `vendor/` and serve it like `marked`, keeping the no-CDN principle. 📋
- [ ] **Cross-domain relationship graph** — visualise the ownership/collaboration links in `CROSS_DOMAIN_INTERACTIONS.md` as an ECharts force-directed `graph` (nodes = domains, edges = collaborations) to make the "who works with whom" picture immediate. 📋
- [ ] **Distribution charts** — roles per chapter and per level as donut/bar charts (Chart.js is sufficient) to complement the welcome stat cards. 📋
- [ ] **Career-path Sankey** — render the Engineer → Senior → Architect ladders and cross-domain mobility paths from `SKILLS_PROGRESSION.md` as an ECharts `sankey`. 📋
- [ ] **Markdown diagrams for docs** — evaluate Mermaid (`graph TD`, flowcharts) for the reference docs. Note: the in-app viewer renders markdown with `marked`, so Mermaid blocks render natively on GitHub but would require adding `mermaid.js` to the viewer to display in-app. 📋
- [ ] **Accessibility for charts** — ensure any chart pairs colour with text/shape cues and exposes an accessible text/table fallback (WCAG 2.2), consistent with the existing focus-visible and aria work. 📋
