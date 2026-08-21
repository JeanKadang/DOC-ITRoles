# Quality Engineering Product Owner

| Field | Value |
|---|---|
| **Role ID** | `quality-engineering-product-owner` |
| **Domain** | Quality Engineering |
| **Chapter:** | DevOps & Delivery |
| **Role Level** | Product Owner |
| **Reports To** | DevOps & Delivery Chapter Lead <!-- role: devops-and-delivery-chapter-lead --> |
| **Direct Reports** | None (owns backlog and roadmap; formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-08 |

---

## Role Overview

The Quality Engineering Product Owner treats the organisation's testing capability as a product with its own backlog: the shared test frameworks, the quality-gate tooling, the test environment and data services that delivery teams consume. Without this role, quality tooling is improved only when someone finds spare capacity, which is why duplicated frameworks accumulate and test environments stay unreliable for years. The Product Owner prioritises that work against measured delivery pain rather than against whoever asks most persistently.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — quality tooling backlog, roadmap, and prioritisation of shared testing capability
- **Experience Anchor:** 5+ years in product ownership or technical product management, ideally with delivery tooling or developer-experience exposure — operates independently on backlog and roadmap decisions
- **Out of Scope:** Testing standards and tooling selection criteria (Quality Engineering Architect-owned); test strategy for a delivery area (Senior Engineer-owned); CI/CD platform roadmap (DevOps Product Owner-owned); release decisions (Change / Release Manager-owned)
- **Escalates To:** DevOps & Delivery Chapter Lead — budget, headcount, and cross-domain roadmap trade-offs
- **Escalated To By:** Quality Engineering Senior Engineers and Quality Engineers on ceremony direction and delivery transparency

## Business Impact

- **Business Objective:** Make the shared quality capability something teams choose to use because it is faster than rolling their own, so quality practice consolidates instead of fragmenting
- **Value Metrics:** Adoption of shared test frameworks, test environment availability and provisioning time, reduction in duplicated tooling, quality tooling backlog delivery rate
- **Key Stakeholders:** Quality Engineering Architect, DevOps Product Owner, delivery team leads as the consuming teams, DevOps & Delivery Chapter Lead, Procurement for tooling licences
- **Processes Supported:** Quality tooling backlog management, test environment service roadmap, shared framework adoption, tooling procurement and licensing, agile ceremonies for the quality workstream

## Key Responsibilities

- Own and manage the quality engineering backlog: shared test frameworks, quality-gate tooling, test environment provisioning, and test data services
- Develop the quality tooling roadmap aligned with the Architect's standards and the delivery estate's measured pain points
- Gather requirements from delivery teams on where testing is slow, unreliable, or duplicated, and translate them into prioritised backlog items
- Lead agile ceremonies for the quality engineering workstream: sprint or kanban planning, backlog refinement, and reviews
- Prioritise investment in test environment reliability and provisioning time, which is consistently where delivery teams lose the most time
- Track adoption of shared frameworks and identify where a team has rolled its own, treating that as a signal about the shared offering rather than as non-compliance
- Coordinate tooling procurement and licensing for test platforms in partnership with the Chapter Lead and Procurement
- Report quality tooling health and adoption to the Chapter Lead in delivery-impact terms
- Align the roadmap with the DevOps Product Owner so quality tooling and pipeline platform work do not duplicate or block each other

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Quality tooling backlog, sprint prioritisation, and roadmap sequencing | Testing standards and tooling selection criteria (Architect-owned) |
| Test environment service roadmap and provisioning-time targets | Test strategy for any specific delivery area (Senior Engineer-owned) |
| Tooling procurement prioritisation and licence management | CI/CD platform roadmap (DevOps Product Owner-owned) |
| Adoption reporting and how shared-framework uptake is measured | Release go/no-go decisions (Change / Release Manager-owned) |

## Required Skills & Qualifications

**Technical Skills:**

- Understanding of testing practice sufficient to scope tooling work: the test pyramid, quality gates, and why test environments dominate delivery friction
- Familiarity with shared test tooling categories — frameworks, end-to-end platforms, contract testing, environment provisioning — at a capability rather than implementation level
- Experience with agile product ownership: backlog management, user story writing with acceptance criteria, ceremony facilitation, roadmap communication
- Ability to read delivery metrics (pipeline feedback time, environment wait time, change failure rate) and turn them into prioritisation arguments
- Experience with product management and roadmapping tooling: Jira, Azure Boards, Confluence

**Soft Skills & Leadership:**

- Ability to prioritise against measured delivery pain rather than the loudest requesting team
- Communication that bridges quality engineers and a Chapter Lead who needs delivery-risk framing
- Willingness to treat low adoption of a shared tool as feedback on the tool, not as a compliance problem

**Technology Proficiency Levels:**

**Expert level required:**

- Quality tooling backlog and sprint management (Jira, Azure Boards, Confluence)
- Adoption and delivery-metric reporting for a shared capability

**Proficient level required:**

- Test environment provisioning approaches (ephemeral environments, containerised stacks) at a capability level
- CI/CD quality-gate concepts (Azure DevOps Pipelines, GitHub Actions)
- Shared test framework landscape (Playwright, Cypress, Pact, SonarQube) for roadmap decisions

**Working Knowledge required:**

- Test data management and anonymisation constraints under data protection rules
- DORA delivery metrics and their relationship to quality investment

**Awareness level expected:**

- AI-assisted testing tooling and its licensing and cost model
- Performance and accessibility testing platforms

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Quality Engineering Architect <!-- role: quality-engineering-architect --> | Receives standards and tooling selection criteria the backlog must respect | Governed By |
| Quality Engineering Senior Engineer <!-- role: quality-engineering-senior-engineer --> | As the workstream's product owner, leading ceremonies and providing delivery direction | Provides To |
| Quality Engineer <!-- role: quality-engineer --> | As the workstream's product owner, leading ceremonies and providing delivery direction | Provides To |
| DevOps Product Owner <!-- role: devops-product-owner --> | Aligns quality tooling and pipeline platform roadmaps to avoid duplicated or blocking work | Collaborates |
| Delivery Teams | Gathers tooling pain points and delivers shared capability they consume | Provides To |
| DevOps & Delivery Chapter Lead <!-- role: devops-and-delivery-chapter-lead --> | Escalates budget, headcount, and cross-domain roadmap trade-offs | Escalates To |
| Vendor TAM/PAM (test tooling vendors) | Product roadmap updates, support agreements, and licensing strategy | Collaborates |

## Key Technologies

- Backlog and ceremony tooling: Jira, Azure Boards, Confluence
- CI/CD platforms at a capability level: Azure DevOps Pipelines, GitHub Actions
- Shared test framework landscape: Playwright, Cypress, Pact, SonarQube
- Test environment provisioning: Docker, Testcontainers, Kubernetes namespaces
- Quality and delivery reporting: Power BI, DORA metrics dashboards
- Test data management and anonymisation tooling

## Typical Day-to-Day Activities

- Grooming and prioritising the quality tooling backlog
- Running sprint or kanban ceremonies with the quality engineering workstream
- Meeting delivery teams to capture where testing is slow, flaky, or duplicated
- Reviewing adoption metrics for shared frameworks and investigating low uptake
- Working with the Architect to keep the backlog inside the standards it must respect
- Aligning roadmap items with the DevOps Product Owner
- Managing tooling licence renewals with Procurement
- Preparing quality tooling roadmap updates for the Chapter Lead

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Backlog delivery rate | ≥85% of committed items | Per sprint |
| Delivery teams using the shared test frameworks | ≥80% | Quarterly |
| Test environment provisioning time | ≤30 minutes | Monthly |
| Test environment availability during working hours | ≥98% | Monthly |
| Duplicated test frameworks retired | ≥2 per year | Annual |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; backlog management and stakeholder engagement are entirely tooling-based
- **Collaboration Tools:** Microsoft Teams, Jira or Azure Boards, Confluence, Power BI
- **On-Site Requirements:** Occasional on-site for Chapter Lead planning sessions or vendor briefings
- **Time Zone Flexibility:** Standard business hours with overlap for delivery-team ceremonies
- **On-Call / Operational Demands:** Not on-call; stakeholder communication point during major test environment outages affecting delivery

## Career Development Path

**Previous Roles:**

- Quality Engineering Senior Engineer moving into product ownership
- Product Owner in a DevOps, platform engineering, or developer-experience domain
- Business Analyst with delivery tooling focus
- Delivery or test manager transitioning to product ownership

**Potential Next Roles:**

- DevOps Product Owner <!-- role: devops-product-owner -->
- Platform Engineering Product Owner <!-- role: platform-engineering-product-owner -->
- DevOps & Delivery Chapter Lead <!-- role: devops-and-delivery-chapter-lead -->
- Head of Engineering Productivity

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Professional Scrum Product Owner (PSPO I) — Scrum.org
- ISTQB Certified Tester Foundation Level for domain literacy

**Complementary Certifications:**

- SAFe Product Owner / Product Manager (POPM) for large programme contexts
- Microsoft Certified: DevOps Engineer Expert (AZ-400) for platform context

**Learning Resources & Communities:**

- Scrum.org PSPO learning paths and Product Owner community
- Accelerate / DORA research on delivery performance
- Ministry of Testing community (ministryoftesting.com)
