# Quality Engineer

| Field | Value |
|---|---|
| **Role ID** | `quality-engineer` |
| **Domain** | Quality Engineering |
| **Chapter:** | DevOps & Delivery |
| **Role Level** | Engineer |
| **Reports To** | Quality Engineering Senior Engineer <!-- role: quality-engineering-senior-engineer --> |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-08 |

---

## Role Overview

The Quality Engineer builds and maintains automated tests for platform and application delivery, working from test strategies set by senior engineers and the Quality Engineering Architect. This is a software engineering role applied to testing: the work is writing and maintaining test code, keeping suites fast and trustworthy, and making failures easy to diagnose — not manually executing test scripts. The Quality Engineer is the first line of defence against a suite becoming slow, flaky, or ignored.

## Role Scope & Boundaries

- **Scope of Influence:** Team — implementation and maintenance of test suites for assigned services to defined standards
- **Experience Anchor:** 1-3 years in test automation or software engineering — works under guidance, building toward independent ownership of a service's test strategy
- **Out of Scope:** Test strategy and coverage standards across the estate (Architect-owned); CI/CD pipeline architecture (DevOps-owned, this role contributes test stages to it); release go/no-go decisions (Change / Release Manager-owned); production incident diagnosis beyond reproducing a defect
- **Escalates To:** Quality Engineering Senior Engineer — flaky tests that resist diagnosis, and coverage gaps that need a strategy decision
- **Escalated To By:** Delivery teams on how to test a specific change, and on interpreting a failing suite

## Business Impact

- **Business Objective:** Keep defects from reaching production by catching them in automated checks that run on every change, so delivery speed is not paid for in escaped defects
- **Value Metrics:** Escaped defect rate, test suite pass rate and runtime, flaky test count, proportion of changes covered by automated tests
- **Key Stakeholders:** Delivery teams whose changes the suites gate, DevOps Engineers who run the pipelines, Service Desk and Major Incident Manager as the people who meet escaped defects
- **Processes Supported:** Automated regression testing, pull-request quality gates, release verification, defect reproduction, test data management

## Key Responsibilities

- Write and maintain automated tests at unit, integration, and end-to-end level for assigned services, following the test strategy set by senior engineers
- Diagnose and fix flaky tests, treating an unreliable test as a defect in its own right rather than a nuisance to be retried
- Keep suite runtime within agreed budgets so that quality gates do not become something teams route around
- Build and maintain test data and environment fixtures, including anonymised data sets where production-like data is needed
- Contribute test stages to CI/CD pipelines in partnership with DevOps Engineers
- Reproduce reported defects, capture them as failing tests, and confirm the fix closes them
- Maintain test tooling and framework upgrades for assigned services
- Document what each suite covers and, as importantly, what it does not

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Test implementation and maintenance for assigned services | Test strategy and coverage standards across the estate (Architect-owned) |
| Flaky-test diagnosis and remediation | CI/CD pipeline architecture and stage design (DevOps-owned) |
| Test data and fixture management for assigned suites | Release go/no-go decisions (Change / Release Manager-owned) |

## Required Skills & Qualifications

**Technical Skills:**

- Programming ability in at least one language used by the delivery teams supported (C#, Java, Python, TypeScript)
- Working knowledge of test frameworks: xUnit/NUnit, JUnit, pytest, Jest or equivalent
- Familiarity with end-to-end and browser automation tooling: Playwright, Cypress, or Selenium
- Understanding of API testing: contract tests, schema validation, Postman or equivalent
- Basic CI/CD literacy — how a test stage is invoked, and how to read a pipeline failure
- Version control and branching workflows (Git)

**Soft Skills & Leadership:**

- Methodical debugging: an intermittent failure is a puzzle to solve, not a test to disable
- Clear defect reporting that gives a developer enough to reproduce without a conversation
- Willingness to push back when a change is untestable as designed

**Technology Proficiency Levels:**

**Expert level required:**

- Test framework implementation in the team's primary language (xUnit/NUnit, JUnit, pytest, or Jest)
- Git and pull-request workflows

**Proficient level required:**

- Playwright or Cypress for end-to-end and browser automation
- API and contract testing (Postman, REST-assured, or equivalent)
- Azure DevOps Pipelines or GitHub Actions for running test stages

**Working Knowledge required:**

- Test data management and anonymisation approaches
- Containerised test environments (Docker, Testcontainers)

**Awareness level expected:**

- Performance and load testing tooling (k6, JMeter)
- AI-assisted test generation and maintenance tooling

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Quality Engineering Senior Engineer <!-- role: quality-engineering-senior-engineer --> | Receives test strategy direction; escalates flaky tests and coverage gaps | Escalates To |
| DevOps Engineer <!-- role: devops-engineer --> | Contributes test stages to pipelines and interprets pipeline failures together | Collaborates |
| Delivery Teams | Provides automated coverage that gates their changes, and support on how to test a change | Provides To |
| Automation Framework Engineer <!-- role: automation-framework-engineer --> | Consumes shared automation frameworks and reusable tooling standards | Consumes From |
| Change / Release Manager <!-- role: change-release-manager --> | Supplies test evidence that informs release decisions | Provides To |

## Key Technologies

- Test frameworks: xUnit, NUnit, JUnit, pytest, Jest
- End-to-end and browser automation: Playwright, Cypress, Selenium
- API and contract testing: Postman, REST-assured, Pact
- CI/CD test execution: Azure DevOps Pipelines, GitHub Actions
- Containerised test environments: Docker, Testcontainers
- Test data management and anonymisation tooling
- Coverage and quality reporting: SonarQube, Coverlet, JaCoCo
- Defect tracking: Jira, Azure Boards

## Typical Day-to-Day Activities

- Writing and reviewing automated tests for changes moving through the pipeline
- Investigating a failing or intermittent test and fixing the underlying cause
- Reproducing a reported defect as a failing test before the fix is written
- Pairing with delivery engineers on how to make a change testable
- Refreshing test data and environment fixtures
- Reviewing suite runtime and trimming or parallelising slow tests
- Updating documentation on what a suite covers

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Automated test pass rate on the main branch | ≥98% | Weekly |
| Flaky tests open at end of month | ≤3 | Monthly |
| Suite runtime for assigned services | Within agreed budget | Weekly |
| Reported defects reproduced as a failing test before fix | ≥90% | Monthly |
| Escaped defects traced to a gap in assigned coverage | Decreasing trend | Quarterly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; all test development, execution and diagnosis is performed through cloud tooling
- **Collaboration Tools:** Microsoft Teams, Azure DevOps or GitHub, Jira, test reporting dashboards
- **On-Site Requirements:** None typically; occasional on-site for device or hardware-dependent testing
- **Time Zone Flexibility:** Standard business hours, with overlap for delivery-team ceremonies
- **On-Call / Operational Demands:** Not on-call; may support release verification outside hours during major releases

## Career Development Path

**Previous Roles:**

- Software Engineer moving toward quality and test automation
- Manual QA Analyst who has learned to code
- DevOps Engineer with a strong testing interest
- Graduate or apprentice engineer entering through a quality route

**Potential Next Roles:**

- Quality Engineering Senior Engineer <!-- role: quality-engineering-senior-engineer -->
- Software Engineer on a delivery team
- DevOps Engineer <!-- role: devops-engineer -->
- Automation Framework Engineer <!-- role: automation-framework-engineer -->

## Recommended Certifications & Learning Paths

**Core Certifications:**

- ISTQB Certified Tester Foundation Level
- Microsoft Certified: Azure Developer Associate (AZ-204) or equivalent for the team's platform

**Complementary Certifications:**

- ISTQB Test Automation Engineer
- Certified Kubernetes Application Developer (CKAD) where services are containerised

**Learning Resources & Communities:**

- Playwright and Cypress official documentation and learning paths
- Ministry of Testing community (ministryoftesting.com)
- Test Automation University (testautomationu.applitools.com)
