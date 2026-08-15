# Quality Engineering Architect

| Field | Value |
|---|---|
| **Role ID** | `quality-engineering-architect` |
| **Domain** | Quality Engineering |
| **Chapter:** | DevOps & Delivery |
| **Role Level** | Architect |
| **Reports To** | DevOps & Delivery Chapter Lead |
| **Direct Reports** | None (technical direction role, not a people manager) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-08 |

---

## Role Overview

The Quality Engineering Architect owns how quality is engineered across the delivery estate: the testing standards every team works to, the tooling they share, and the quality gates that apply regardless of which team is shipping. Before this role existed the discipline was distributed — testing appeared in DevOps, application platform, data and AI role definitions without anyone owning the standard — so practice varied by team and defects escaped through the gaps between them. This role sets the standard and is the escalation point when a team argues for an exception.

## Role Scope & Boundaries

- **Scope of Influence:** Cross-domain — testing standards, shared quality tooling, and estate-wide quality gates across every delivery team
- **Experience Anchor:** 8+ years in test engineering or software engineering with demonstrated ownership of quality practice at organisation scale — operates independently within enterprise architecture standards
- **Out of Scope:** Test strategy for a specific delivery area (Quality Engineering Senior Engineer-owned); CI/CD platform architecture (DevOps Architect-owned, this role defines what runs in it); security testing depth and threat modelling (Security and DevSecOps Architects-owned); release approval (Change / Release Manager-owned)
- **Escalates To:** DevOps & Delivery Chapter Lead on investment and cross-team disputes; Enterprise Architect on standards that conflict with wider architecture direction
- **Escalated To By:** Quality Engineering Senior Engineers on standards exceptions; delivery teams disputing an estate-wide gate

## Business Impact

- **Business Objective:** Make quality a property of the delivery system rather than of individual teams, so defect rates do not depend on which team happens to be shipping
- **Value Metrics:** Estate-wide escaped defect rate, change failure rate, mean time to restore, consistency of quality practice across teams, tooling consolidation savings
- **Key Stakeholders:** DevOps & Delivery Chapter Lead, Enterprise Architect, DevOps Architect, delivery team leads, Change / Release Manager, DevSecOps Architect
- **Processes Supported:** Quality standards definition, test tooling selection and consolidation, quality gate governance, testability review of proposed architectures, quality metrics and DORA reporting

## Key Responsibilities

- Define the testing standards every delivery team works to: expected coverage levels, the balance of the test pyramid, and what must pass before a change reaches production
- Select and consolidate shared test tooling, and retire the duplicated frameworks that accumulate when each team chooses its own
- Design the estate-wide quality gates and the exception process, so that an exception is a visible decision rather than a quiet omission
- Review proposed architectures for testability, and push back on designs that can only be verified in production
- Set the strategy for test environments and test data across the estate, including anonymisation for production-like data
- Define how quality is measured and reported, favouring DORA-aligned delivery signals over raw test counts
- Partner with the DevOps Architect so quality gates fit the pipeline platform rather than fighting it, and with the DevSecOps Architect so security and quality gates do not duplicate each other
- Govern quality practice adoption across teams, including where a team is meeting the letter of a standard but not its intent
- Mentor Quality Engineering Senior Engineers and contribute to the engineering practices community

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Estate-wide testing standards, coverage expectations, and quality gate design | Test strategy for a specific delivery area (Senior Engineer-owned) |
| Test tooling selection, consolidation, and retirement | CI/CD platform architecture and runner capacity (DevOps Architect-owned) |
| The quality-gate exception process and which exceptions are granted | Security testing depth and threat coverage (Security / DevSecOps Architect-owned) |
| Test environment and test data strategy across the estate | Release go/no-go decisions (Change / Release Manager-owned) |
| Quality measurement and reporting model | Application and platform architecture decisions (respective Architects-owned) |

## Required Skills & Qualifications

**Technical Skills:**

- Deep knowledge of test architecture across levels: unit, contract, integration, end-to-end, performance, and where each earns its cost
- Experience defining quality practice across multiple teams with differing languages and platforms
- Strong understanding of CI/CD pipeline design and the relationship between feedback time and delivery performance
- Ability to assess a proposed architecture for testability before it is built
- Knowledge of test environment strategy, including ephemeral environments and service virtualisation
- Familiarity with DORA metrics and the research linking quality practice to delivery outcomes
- Understanding of data protection constraints on test data, and anonymisation approaches that satisfy them

**Soft Skills & Leadership:**

- Ability to set a standard that teams adopt because it helps them, not because it is mandated
- Comfort holding a position on quality gates against delivery pressure, and knowing when an exception is legitimate
- Translating quality practice into business language: change failure rate and restore time, not test counts

**Technology Proficiency Levels:**

**Expert level required:**

- Test architecture and the practical design of the test pyramid at estate scale
- Quality gate design in Azure DevOps Pipelines and GitHub Actions
- Contract testing strategy between services (Pact or equivalent)

**Proficient level required:**

- End-to-end automation platforms (Playwright, Cypress) at a standards and selection level
- Coverage and static analysis platforms (SonarQube) including quality-profile governance
- Ephemeral test environments and service virtualisation (Testcontainers, WireMock, Kubernetes namespaces)
- Performance testing strategy (k6, JMeter)

**Working Knowledge required:**

- Security testing integration points (SAST, DAST, SCA) owned by DevSecOps
- Accessibility testing standards (WCAG) and tooling (axe, Lighthouse)
- Test data anonymisation and synthetic data generation

**Awareness level expected:**

- Chaos and resilience testing as a complement to deterministic testing
- AI-assisted test generation, and where it substitutes for coverage rather than adding it

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Quality Engineering Senior Engineer | Sets the estate-wide standards they design area test strategy within | Provides To |
| DevOps Architect | Jointly ensures quality gates fit the pipeline platform rather than fighting it | Collaborates |
| DevSecOps Architect | Aligns quality and security gates so they complement rather than duplicate | Collaborates |
| Enterprise Architect | Works within enterprise architecture standards; escalates conflicts | Governed By |
| Change / Release Manager | Supplies the quality signals that inform change risk classification | Provides To |
| Engineering Practices Champion | Partners on adoption of quality practice across engineering teams | Collaborates |
| DevOps & Delivery Chapter Lead | Escalates tooling investment and cross-team quality disputes | Escalates To |
| Delivery Team Architects | Reviews proposed architectures for testability | Governed By |

## Key Technologies

- Test frameworks across platforms: xUnit, NUnit, JUnit, pytest, Jest
- End-to-end automation: Playwright, Cypress, Selenium
- Contract testing: Pact, Spring Cloud Contract
- Service virtualisation: WireMock, Testcontainers
- CI/CD quality gates: Azure DevOps Pipelines, GitHub Actions
- Coverage and static analysis: SonarQube, JaCoCo, Coverlet
- Performance testing: k6, JMeter, Gatling
- Accessibility testing: axe, Lighthouse, WCAG conformance tooling
- Quality and delivery reporting: Power BI, DORA metrics dashboards

## Typical Day-to-Day Activities

- Reviewing a proposed architecture for testability before it reaches build
- Working with the DevOps Architect on where estate-wide gates sit in the pipeline
- Adjudicating a quality-gate exception request from a delivery team
- Assessing a candidate test tool against what the estate already runs
- Reviewing quality and DORA metrics for patterns that point at a standards gap
- Mentoring Quality Engineering Senior Engineers on test architecture
- Contributing to the engineering practices community of practice
- Updating testing standards as platforms and languages in the estate change

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Estate-wide change failure rate | ≤10% | Monthly |
| Delivery teams meeting the coverage standard | ≥90% | Quarterly |
| Distinct test frameworks in use across the estate (consolidation) | Decreasing trend | Quarterly |
| Quality-gate exceptions granted | ≤5 open at any time | Monthly |
| Mean time to restore after a change-induced incident | ≤4 hours | Monthly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; standards, review and governance work is entirely tooling-based
- **Collaboration Tools:** Microsoft Teams, Azure DevOps or GitHub, Confluence, SonarQube, Power BI
- **On-Site Requirements:** Occasional on-site for architecture review boards, engineering practice forums, or cross-team workshops
- **Time Zone Flexibility:** Standard business hours with flexibility for cross-regional architecture and practice forums
- **On-Call / Operational Demands:** Not on-call; engaged in post-incident review where a systemic quality gap is implicated

## Career Development Path

**Previous Roles:**

- Quality Engineering Senior Engineer
- DevOps Architect or Senior Engineer with a strong quality focus
- Application platform Architect with test architecture depth
- Engineering Practices Champion

**Potential Next Roles:**

- Enterprise Architect
- DevOps & Delivery Chapter Lead
- Head of Engineering Practice
- Solution Architect

## Recommended Certifications & Learning Paths

**Core Certifications:**

- ISTQB Expert Level Test Management or Test Automation Engineer
- Microsoft Certified: DevOps Engineer Expert (AZ-400) or equivalent for the estate's platform

**Complementary Certifications:**

- TOGAF Foundation for enterprise architecture alignment
- Certified Kubernetes Application Developer (CKAD)

**Learning Resources & Communities:**

- Accelerate / DORA State of DevOps research on quality and delivery performance
- Ministry of Testing community and conferences (ministryoftesting.com)
- Continuous Delivery and testing practice literature (Humble, Farley, Fowler)
