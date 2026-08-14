# Quality Engineering Senior Engineer

| Field | Value |
|---|---|
| **Domain** | Quality Engineering |
| **Chapter:** | DevOps & Delivery |
| **Role Level** | Senior Engineer |
| **Reports To** | DevOps & Delivery Chapter Lead |
| **Direct Reports** | Quality Engineers (day-to-day technical guidance and mentoring; formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-08 |

---

## Role Overview

The Quality Engineering Senior Engineer owns the test strategy for a set of services or a delivery area: what is tested at which level, what the coverage expectations are, and where the quality gates sit in the pipeline. This role decides the shape of the test pyramid in practice — how much is caught by fast unit tests versus slower integration and end-to-end suites — and holds the line when delivery pressure argues for skipping gates. It is also the escalation point when a suite becomes unreliable enough that teams stop trusting it.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — test strategy, coverage standards, and quality gate placement for an assigned delivery area
- **Experience Anchor:** 5+ years in test automation or software engineering with demonstrated ownership of a test strategy — operates independently within the Architect's estate-wide standards
- **Out of Scope:** Estate-wide quality standards and tooling selection (Quality Engineering Architect-owned); pipeline platform architecture (DevOps Architect-owned); release approval (Change / Release Manager-owned); security testing depth (DevSecOps Engineer-owned, this role integrates their gates)
- **Escalates To:** Quality Engineering Architect on standards exceptions; DevOps & Delivery Chapter Lead on staffing and cross-team quality disputes
- **Escalated To By:** Quality Engineers on flaky tests and coverage gaps; delivery teams disputing a quality gate that is blocking them

## Business Impact

- **Business Objective:** Ensure delivery speed and defect rates move in the same direction rather than trading against each other, by placing the right checks at the right point in the pipeline
- **Value Metrics:** Escaped defect rate, mean time to detect a regression, pipeline feedback time, proportion of releases requiring a hotfix, test suite trust (measured by override and retry rates)
- **Key Stakeholders:** DevOps & Delivery Chapter Lead, Quality Engineering Architect, delivery team leads, Change / Release Manager, DevSecOps Engineer
- **Processes Supported:** Test strategy definition, quality gate design, defect triage, release verification, test environment strategy, quality metrics reporting

## Key Responsibilities

- Own the test strategy for an assigned delivery area: what is covered at unit, integration, contract, and end-to-end level, and why the balance sits where it does
- Define coverage expectations and quality gate placement in delivery pipelines, in partnership with DevOps Engineers who own the pipeline platform
- Review and approve test designs from Quality Engineers, and mentor them toward independent ownership
- Hold the line on quality gates under delivery pressure, and escalate rather than silently weaken them when a release argues for an exception
- Diagnose systemic suite problems — sustained flakiness, runaway runtime, coverage that has drifted from what the service now does
- Lead defect triage for the assigned area, distinguishing a test gap from a design gap
- Define the test environment and test data strategy, including how production-like data is obtained and anonymised
- Report quality metrics to the Chapter Lead in terms of delivery risk rather than raw test counts
- Integrate security and accessibility checks into the pipeline in partnership with DevSecOps and accessibility specialists

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Test strategy, coverage expectations, and quality gate placement for the assigned area | Estate-wide quality standards and tooling selection (Quality Engineering Architect-owned) |
| Test environment and test data strategy for the assigned area | CI/CD platform architecture and runner capacity (DevOps Architect-owned) |
| Defect triage outcomes and whether a gap is a test or a design problem | Release go/no-go decisions (Change / Release Manager-owned) |
| Quality-gate exceptions, and whether one is granted or escalated | Security testing depth and threat coverage (DevSecOps Engineer-owned) |

## Required Skills & Qualifications

**Technical Skills:**

- Strong programming ability in at least one language used across the supported delivery teams
- Deep knowledge of test design: the test pyramid, contract testing, and when an end-to-end test earns its cost
- Experience designing quality gates in CI/CD pipelines and reasoning about feedback time
- Understanding of test environment provisioning and ephemeral environment patterns
- Ability to diagnose systemic flakiness — concurrency, timing, shared state, environmental coupling
- Familiarity with performance and load testing sufficient to place them appropriately in the pipeline

**Soft Skills & Leadership:**

- Willingness to be unpopular in the short term when a gate should hold
- Mentoring engineers toward owning quality rather than delegating it to a test team
- Translating quality metrics into delivery-risk language that a Chapter Lead can act on

**Technology Proficiency Levels:**

**Expert level required:**

- Test design and the practical placement of the test pyramid
- Test frameworks in the team's primary languages (xUnit/NUnit, JUnit, pytest, Jest)
- Azure DevOps Pipelines or GitHub Actions quality-gate design

**Proficient level required:**

- Playwright or Cypress for end-to-end coverage
- Contract testing (Pact or equivalent) between services
- Containerised and ephemeral test environments (Docker, Testcontainers, Kubernetes namespaces)
- Coverage and quality reporting (SonarQube, JaCoCo, Coverlet)

**Working Knowledge required:**

- Performance and load testing (k6, JMeter)
- Security testing integration points (SAST, DAST) owned by DevSecOps
- Accessibility testing tooling (axe, Lighthouse)

**Awareness level expected:**

- Chaos and resilience testing practices
- AI-assisted test generation, and its failure modes as a coverage substitute

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Quality Engineering Architect | Works within estate-wide quality standards; escalates exceptions | Governed By |
| Quality Engineer | Sets test strategy, reviews test designs, and mentors toward independent ownership | Provides To |
| DevOps Senior Engineer | Jointly designs where quality gates sit in the delivery pipeline | Collaborates |
| DevSecOps Engineer | Integrates security gates into the same pipeline without duplicating them | Collaborates |
| Change / Release Manager | Supplies the test evidence that informs release risk classification | Provides To |
| DevOps & Delivery Chapter Lead | Reports quality metrics and escalates cross-team quality disputes | Escalates To |
| Delivery Teams | Receives defect and coverage feedback; negotiates testability of proposed changes | Collaborates |

## Key Technologies

- Test frameworks: xUnit, NUnit, JUnit, pytest, Jest
- End-to-end automation: Playwright, Cypress, Selenium
- Contract testing: Pact, Spring Cloud Contract
- CI/CD quality gates: Azure DevOps Pipelines, GitHub Actions
- Ephemeral test environments: Docker, Testcontainers, Kubernetes
- Coverage and static analysis: SonarQube, JaCoCo, Coverlet
- Performance testing: k6, JMeter
- Accessibility testing: axe, Lighthouse
- Defect and quality reporting: Jira, Azure Boards, Power BI

## Typical Day-to-Day Activities

- Reviewing test designs and pull requests from Quality Engineers
- Investigating a systemic suite problem — sustained flakiness or a runtime that has crept past its budget
- Negotiating with a delivery team about a gate that is blocking them, and deciding whether to hold or escalate
- Leading defect triage for the assigned area
- Working with DevOps Engineers on pipeline stage placement and feedback time
- Refreshing the test environment and data strategy as services change
- Preparing quality metrics for the Chapter Lead in delivery-risk terms
- Mentoring Quality Engineers on test design and flake diagnosis

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Escaped defect rate for the assigned area | Decreasing trend | Quarterly |
| Pipeline feedback time (commit to quality-gate result) | ≤15 minutes | Weekly |
| Releases requiring a hotfix within 48 hours | ≤5% | Monthly |
| Quality-gate override/retry rate (a proxy for suite trust) | ≤2% | Monthly |
| Flaky tests open at end of month across the area | ≤5 | Monthly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; strategy, review and diagnosis work is entirely tooling-based
- **Collaboration Tools:** Microsoft Teams, Azure DevOps or GitHub, Jira, SonarQube, Power BI for quality reporting
- **On-Site Requirements:** Occasional on-site for delivery-team workshops or hardware-dependent testing
- **Time Zone Flexibility:** Standard business hours with overlap for delivery-team ceremonies across regions
- **On-Call / Operational Demands:** Not on-call; available during major releases and for post-incident analysis where a test gap is implicated

## Career Development Path

**Previous Roles:**

- Quality Engineer
- Software Engineer with a strong testing and tooling focus
- DevOps Engineer moving toward delivery quality
- Automation Framework Engineer

**Potential Next Roles:**

- Quality Engineering Architect
- DevOps Architect
- Engineering Practices Champion
- Delivery team technical lead

## Recommended Certifications & Learning Paths

**Core Certifications:**

- ISTQB Advanced Level Test Analyst or Test Automation Engineer
- Microsoft Certified: DevOps Engineer Expert (AZ-400) or equivalent for the team's platform

**Complementary Certifications:**

- Certified Kubernetes Application Developer (CKAD)
- Professional Scrum Developer (PSD)

**Learning Resources & Communities:**

- Ministry of Testing community and conferences (ministryoftesting.com)
- Test Automation University (testautomationu.applitools.com)
- Accelerate / DORA research on delivery performance and quality practices
