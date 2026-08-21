# Technical Program Manager / Delivery Manager

| Field | Value |
|---|---|
| **Role ID** | `technical-program-manager-delivery-manager` |
| **Domain** | Service Management |
| **Chapter:** | Service & Governance |
| **Role Level** | Senior Engineer |
| **Reports To** | Service Management Architect <!-- role: service-management-architect --> |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-07 |

---

## Role Overview

The Technical Program Manager / Delivery Manager coordinates cross-team delivery for complex, multi-domain technical programs that no single engineering team can own end to end — platform migrations, major version upgrades, multi-quarter modernization initiatives, and cross-chapter dependencies. This role does not own technical design or a product backlog; it owns the delivery plan, the dependency map, and the removal of cross-team blockers, working across Chapter Leads, Product Owners, and Architects to keep a program moving without duplicating the authority of the teams doing the work.

## Role Scope & Boundaries

- **Scope of Influence:** Cross-domain, program-level — typically coordinates 3-8 teams across one or more chapters for the duration of a program; no permanent budget authority, but manages the program's delivery budget and timeline.
- **Experience Anchor:** 5+ years in technical program or delivery management within an engineering organization; expected to operate independently across multiple concurrent programs with minimal oversight.
- **Out of Scope:** Does not own technical architecture or design decisions (owned by the relevant Architect); does not own product backlog prioritization (owned by the relevant Product Owner); does not own individual team resourcing decisions (owned by each team's manager/Chapter Lead).
- **Escalates To:** Service & Governance Chapter Lead (for cross-chapter resourcing conflicts or program risk requiring executive attention).
- **Escalated To By:** Individual delivery teams and Product Owners (for cross-team dependency conflicts or blocked work the team cannot resolve itself).

## Business Impact

- **Business Objective:** Ensure that cross-team, multi-quarter technical programs deliver on time and within scope by proactively identifying and resolving cross-team dependencies, resourcing conflicts, and delivery risks before they cause schedule slippage.
- **Value Metrics:** Program on-time delivery rate, dependency resolution cycle time, program risk burn-down rate, stakeholder-reported program transparency and predictability.
- **Key Stakeholders:** Chapter Leads, Product Owners, Architects, Technical Area Lead, executive sponsors of the program, Finance/FinOps (for program budget tracking).
- **Processes Supported:** Cross-team program planning and roadmapping, dependency management, program-level risk and issue management, executive status reporting, budget tracking for multi-team initiatives.

## Key Responsibilities

- Build and maintain the end-to-end delivery plan for cross-domain technical programs, integrating the individual roadmaps of each contributing team into a single coherent timeline.
- Identify, track, and actively resolve cross-team dependencies — surfacing blockers early and coordinating directly with the owning teams to unblock them.
- Facilitate program-level ceremonies (steering committees, cross-team syncs, quarterly planning) that keep contributing teams aligned without replacing each team's own agile ceremonies.
- Maintain a program-level risk and issue register, driving mitigation plans and escalating unresolved risks to the appropriate Chapter Lead or Technical Area Lead.
- Produce clear, accurate program status reporting for executive stakeholders, translating technical progress into business-relevant milestones and risk indicators.
- Track program budget and resourcing against plan, flagging variances to Finance/FinOps and the executive sponsor.
- Partner with Product Owners to sequence cross-team backlog items so that dependent work lands in the correct order across teams.
- Facilitate post-program retrospectives, capturing lessons learned and feeding process improvements back to the Chapter Leads and Engineering Practices Champion.
- Maintain program documentation (charters, RAID logs, decision records) as the single source of truth for program status and history.
- Coach individual teams on program-level agile-at-scale practices (e.g., SAFe Program Increment planning) without prescribing team-level process.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| The cross-team delivery plan, dependency map, and program-level risk register | Technical architecture and design decisions for the program (owned by the relevant Architect) |
| Program-level ceremony cadence and structure (steering committees, cross-team syncs) | Product backlog prioritization within any single team (owned by that team's Product Owner) |
| Program status reporting and escalation of unresolved cross-team risks | Individual team resourcing and hiring decisions (owned by each team's manager/Chapter Lead) |
| Program budget tracking and variance reporting | Final program budget approval (owned by the executive sponsor and Finance) |

## Required Skills & Qualifications

**Technical Skills:**

- Proven experience running multi-team technical programs in an agile-at-scale environment (SAFe, LeSS, or a comparable scaled agile framework).
- Working knowledge of software delivery lifecycles well enough to read a technical roadmap, understand dependency chains, and ask informed questions of engineering leads.
- Proficiency with program and portfolio tooling: Jira Align, Azure DevOps (cross-team boards), ServiceNow Strategic Portfolio Management, or equivalent.
- Strong RAID (Risks, Assumptions, Issues, Dependencies) management discipline and structured risk facilitation techniques.
- Budget tracking and variance analysis for multi-team technical initiatives.
- Data visualization and executive reporting (Power BI, or equivalent) to translate program status into stakeholder-appropriate summaries.

**Soft Skills & Leadership:**

- Exceptional cross-team facilitation and influence-without-authority — this role coordinates teams it does not manage.
- Calm, structured risk and conflict escalation that resolves blockers without creating adversarial relationships between teams.
- Clear written and verbal communication tailored to both engineering and executive audiences.

**Technology Proficiency Levels:**

**Expert level required:**

- Jira Align or equivalent program-level portfolio tooling
- Agile-at-scale frameworks (SAFe Program Increment planning or equivalent)

**Proficient level required:**

- Azure DevOps / Jira (team-level boards, cross-team dependency linking)
- Power BI or equivalent executive reporting tooling

**Working Knowledge required:**

- Software delivery lifecycle fundamentals (CI/CD, release management)
- FinOps/budget tracking tooling

**Awareness level expected:**

- Cloud platform and infrastructure concepts sufficient to understand dependency impact across domains

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Service & Governance Chapter Lead <!-- role: service-and-governance-chapter-lead --> | Escalation path for cross-chapter resourcing conflicts and executive program risk reporting | Escalates To |
| Product Owner (any domain) | Coordinates cross-team backlog sequencing so dependent work lands in the correct order | Collaborates |
| Architect (any domain) | Consumes technical roadmap and design timelines to build the integrated delivery plan | Consumes From |
| Chapter Lead (any chapter) | Provides program status and risk visibility for teams within that chapter | Provides To |
| Engineering Practices Champion <!-- role: engineering-practices-champion --> | Shares program retrospective findings to inform organization-wide delivery process improvements | Provides To |
| Technical Area Lead <!-- role: technical-area-lead --> | Escalation path for unresolved cross-chapter technical risk affecting program delivery | Escalates To |

## Key Technologies

- Jira Align (scaled agile program and portfolio management)
- Azure DevOps (cross-team boards, dependency tracking, release pipelines)
- ServiceNow Strategic Portfolio Management (SPM)
- Confluence (program documentation, RAID logs, decision records)
- Power BI (executive program status reporting)
- Smartsheet / Monday.com (program timeline and resourcing tracking)
- Miro or Mural (cross-team dependency mapping workshops)
- SAFe (Scaled Agile Framework) Program Increment planning tooling

## Typical Day-to-Day Activities

- Reviewing the cross-team dependency map for newly surfaced blockers and following up directly with the owning teams.
- Facilitating a program steering committee meeting, presenting status against milestones and surfacing risks requiring executive decisions.
- Meeting with a Product Owner to re-sequence backlog items after a dependency slipped in another team.
- Updating the program risk register following a delayed third-party integration and drafting a mitigation plan.
- Coordinating a cross-team Program Increment planning session with multiple Architects and Product Owners.
- Producing a weekly executive status summary translating technical progress into business-relevant milestones.
- Reviewing program budget burn against plan and flagging a variance to the executive sponsor.
- Running a mid-program retrospective with contributing teams to capture process improvements.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Program on-time delivery rate | ≥85% of milestones delivered within committed date | Quarterly |
| Dependency resolution cycle time | <5 business days from identification to resolution plan | Monthly |
| Program risk burn-down rate | 100% of high-severity risks have an active mitigation plan | Monthly |
| Executive stakeholder satisfaction with program transparency | ≥4/5 average rating | Quarterly |
| Budget variance | Within ±10% of approved program budget | Quarterly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — the role is coordination- and tooling-based with no physical infrastructure dependency.
- **Collaboration Tools:** Microsoft Teams, Jira Align, Azure DevOps, Confluence, Power BI, Miro/Mural.
- **On-Site Requirements:** None typically; occasional on-site for major program kickoffs or steering committee workshops.
- **Time Zone Flexibility:** Moderate — programs frequently span teams in multiple time zones, requiring some flexibility for cross-team ceremonies.
- **On-Call / Operational Demands:** Not on a rotating on-call schedule; expected to be reachable during a program's critical delivery windows (e.g., major cutover weekends).

## Career Development Path

**Previous Roles:**

- Product Owner or Senior Engineer with strong cross-team coordination experience
- Scrum Master or Agile Coach progressing into program-level scope
- Project Manager transitioning into a technical delivery specialism

**Potential Next Roles:**

- Chapter Lead (any chapter, if paired with people-management aspiration)
- Head of Technical Program Management / Portfolio Delivery Lead
- Product Area Lead (PAL)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- SAFe Program Consultant (SPC) or SAFe Release Train Engineer (RTE)
- PMI Agile Certified Practitioner (PMI-ACP)
- Project Management Professional (PMP)

**Complementary Certifications:**

- Certified ScrumMaster (CSM) or Professional Scrum Master (PSM)
- ITIL 4 Foundation

**Learning Resources & Communities:**

- Scaled Agile Framework (SAFe) community and official training paths; PMI community of practice for technical program managers.
