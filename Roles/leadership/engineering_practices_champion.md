# Engineering Practices Champion

| Field | Value |
|---|---|
| **Domain** | Leadership |
| **Chapter:** | Leadership (Cross-cutting) |
| **Role Level** | Senior Engineer |
| **Reports To** | Engineering Director or Technical Area Lead (PAL/TAL pair for the relevant product area or cross-cutting engineering enablement function) |
| **Direct Reports** | None (individual contributor and internal consultant — no line management authority; drives change through coaching influence) |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Engineering Practices Champion is a senior individual contributor and internal consultant focused on embedding and continuously improving software engineering quality across delivery teams. This role works team-by-team — coaching engineers on test-driven development (TDD), behaviour-driven development (BDD), code review culture, trunk-based development, pair programming, and CI/CD maturity — with the goal of systematically uplifting the engineering capability and health of the organisation. The Engineering Practices Champion translates abstract engineering quality principles into concrete, team-applicable habits, tooling configurations, and measurable health metrics (DORA, SPACE), and is the organisation's go-to authority for the question: *how should we be engineering software?*

## Role Scope & Boundaries

- **Scope of Influence:** Cross-domain, organisation-wide (as an internal consultant) — no budget or headcount authority; influence through coaching and standards
- **Experience Anchor:** 8+ years in senior engineering roles with demonstrated coaching/mentoring impact — operates independently across delivery teams organisation-wide
- **Out of Scope:** CI/CD platform architecture and pipeline infrastructure (DevOps Architect-owned); mandatory security policy controls embedded in pipelines (Security Architect-owned); team structure, sprint capacity, and delivery prioritisation (Team Lead and Delivery Lead-owned)
- **Escalates To:** Engineering Director or Technical Area Lead — engineering-culture investment decisions and cross-team quality escalations beyond coaching influence
- **Escalated To By:** Team Leads and Engineering Managers on team-level engineering health issues; not a formal escalation target — engages proactively rather than reactively

## Business Impact

- **Business Objective:** Reduces delivery risk, defect rates, and toil across engineering teams by systematically improving the quality of software engineering practice — directly contributing to faster, safer, and more sustainable delivery at scale
- **Value Metrics:** DORA metrics improvement per team (deployment frequency, lead time for changes, mean time to recovery, change failure rate), code quality gate adoption rate, teams coached per quarter, engineering practice maturity score
- **Key Stakeholders:** Delivery teams, Team Leads and Engineering Managers, DevOps Architect, Developer Experience Engineer, Technical Community Leader, and Engineering Directors
- **Processes Supported:** Definition of Ready (DoR) and Definition of Done (DoD) governance, CI/CD pipeline quality gate configuration, engineering health assessments, code review processes, testing strategy, and engineering onboarding

## Key Responsibilities

- Embed directly within delivery teams for coaching engagements — modelling good engineering practices through pairing, live code review, and workshop facilitation rather than purely through documentation or mandate
- Design and run Definition of Ready and Definition of Done workshops, helping teams establish shared quality standards and build habits that prevent defects from entering pipelines
- Establish and configure code quality gates in CI pipelines using SonarQube, GitHub Advanced Security, and equivalent tooling, and coach teams on interpreting and acting on the results
- Conduct engineering health assessments against a structured maturity model (DORA, SPACE, or an internal equivalent), producing team-level reports with prioritised recommendations
- Drive adoption of trunk-based development, feature flagging, pair programming, and mob programming practices as appropriate for team context and maturity
- Build and maintain golden path templates and Backstage catalogue entries for CI/CD pipelines, test harnesses, and quality tooling that teams can adopt with minimal friction
- Collaborate with the DevOps Architect to ensure quality gate standards are reflected in shared pipeline templates and platform-level defaults
- Partner with the Technical Community Leader to publish engineering practice guidance, facilitate CoP sessions on quality topics, and ensure coaching insights feed back into shared standards
- Define and track team-level engineering practice KPIs, providing regular visibility of maturity trends to Engineering Directors and TALs
- Identify systemic quality issues appearing across multiple teams — escalate architectural or tooling root causes and work with the appropriate function to resolve them at source

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Engineering practice coaching approach, assessment methodology, and team-level improvement plans | CI/CD platform architecture and pipeline infrastructure (DevOps Architect-owned) |
| Code quality gate thresholds, configurations, and standards recommendations for delivery teams | Mandatory security policy controls embedded in pipelines (Security Architect-owned) |
| Engineering health assessment framework, maturity model, and reporting cadence | Team structure, sprint capacity, and delivery prioritisation (Team Lead and Delivery Lead-owned) |
| TDD/BDD, trunk-based development, and pair programming adoption guidance and coaching materials | Test automation framework architecture and long-term tooling investment (Automation Framework Engineer-owned) |
| DoR and DoD workshop design, facilitation, and outcome documentation | Team-level Definition of Done final content (team and Product Owner-owned, with this role as facilitator) |

## Required Skills & Qualifications

- Deep practical expertise in software engineering quality practices — TDD, BDD, pair programming, code review, trunk-based development, and continuous integration — with the ability to demonstrate and coach these practices hands-on, not just advocate for them
- Proficiency with code quality and security tooling: SonarQube, GitHub Advanced Security, and the configuration of quality gates in modern CI pipelines (GitHub Actions, Azure DevOps, or equivalent)
- Working knowledge of DORA metrics and SPACE framework, including how to collect, interpret, and act on deployment frequency, lead time, MTTR, and change failure rate data at team level
- Experience with test automation across multiple layers — unit (Jest, Pytest, NUnit), integration, and end-to-end (Playwright, Cypress, or equivalent) — sufficient to review and uplift team test strategies
- Coaching and facilitation skills: the ability to build trust with engineers, challenge practices constructively, and create psychological safety in coaching engagements without imposing a one-size-fits-all approach
- Experience with Backstage or equivalent developer portals for publishing golden path templates and quality tooling guidance
- Ability to communicate engineering quality concepts to non-technical stakeholders — translating DORA metrics and quality gate results into business-meaningful risk and velocity language
- Familiarity with trunk-based development practices, feature flag management, and the organisational and technical changes required to sustain them at scale

**Technology Proficiency Levels:**

**Expert level required:**

- Test-driven development (TDD), behaviour-driven development (BDD), and pair/mob programming coaching
- SonarQube and GitHub Advanced Security (code quality gate configuration and coaching)
- DORA metrics and SPACE framework (collection, interpretation, and team-level coaching)

**Proficient level required:**

- Test automation frameworks across layers (Jest, Pytest, NUnit, Playwright, Cypress)
- Trunk-based development and feature flag adoption (LaunchDarkly, Azure App Configuration)
- Backstage or equivalent developer portal for golden path template publishing

**Working Knowledge required:**

- GitHub Actions / Azure DevOps Pipelines configuration
- DORA metrics dashboards (Four Keys, LinearB, Sleuth)

**Awareness level expected:**

- Emerging engineering practice trends (Thoughtworks Technology Radar signals)

### Qualifications

- **Education:** Degree in Computer Science, Software Engineering, or a related discipline, or equivalent professional experience demonstrating depth in software quality and delivery practices
- **Experience:** Typically 7+ years in software engineering, DevOps, or platform engineering roles, with a strong focus on quality practices and engineering excellence; at least 2–3 years of coaching, mentoring, or team enablement experience at Senior Engineer level or above
- **Certifications:** No mandatory certifications required; recommended certifications listed in the Certifications section below

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| DevOps Architect, Developer Experience Engineer, Automation Framework Engineer | Joint ownership of tooling and platform capability that engineering practices depend on | Collaborates |
| Technical Community Leader | Coordinate engineering-culture initiatives with the wider technical community programme | Collaborates |
| Delivery teams, Team Leads, Engineering Managers | Primary coaching audience for TDD/BDD, code review culture, and CI/CD maturity uplift | Provides To |
| Product Owners | Definition of Ready / Definition of Done governance as DoR/DoD stakeholders | Collaborates |

## Key Technologies

- SonarQube — code quality analysis, technical debt tracking, and quality gate configuration
- GitHub Advanced Security — secret scanning, dependency review, code scanning, and security policy enforcement in pipelines
- DORA metrics dashboards — Four Keys, LinearB, Sleuth, or equivalent tooling for deployment frequency, lead time, MTTR, and change failure rate visibility
- Backstage — developer portal for publishing golden path templates, quality tooling catalogue entries, and onboarding guides
- GitHub Actions / Azure DevOps Pipelines — CI/CD pipeline configuration and quality gate integration
- Jest, Pytest, NUnit — unit and integration test frameworks across JavaScript/TypeScript, Python, and .NET stacks
- Playwright / Cypress — end-to-end and browser-based test automation tooling
- Feature flag platforms (LaunchDarkly, Azure App Configuration, or equivalent) — for supporting trunk-based development adoption
- Microsoft Teams — coaching session facilitation, async feedback, and community engagement
- Miro — workshop facilitation for DoR/DoD sessions, practice maturity mapping, and team health retrospectives

## Typical Day-to-Day Activities

- Embedding within a delivery team for a pairing or mob programming session — working alongside engineers to model TDD practices on real in-flight work
- Reviewing a team's CI pipeline configuration and quality gate settings, identifying gaps, and coaching the team to implement improvements incrementally
- Running a Definition of Done workshop with a new team — facilitating structured discussion to establish shared quality criteria and embedding them in the team's tooling and process
- Analysing a team's DORA metrics dashboard to identify trends, prepare a coaching report, and prioritise the next improvement focus area
- Collaborating with the DevOps Architect to update shared pipeline templates with improved quality gate defaults that benefit all teams
- Writing a coaching guide or golden path template in Backstage covering TDD setup for a new technology stack being adopted across the organisation
- Attending a code review on GitHub — providing structured feedback on test coverage, review etiquette, and code quality conventions without blocking the team's flow
- Meeting with the Technical Community Leader to plan a CoP session on BDD adoption, sourcing a practitioner speaker from a recently coached team to share real experience
- Reviewing an engineering health assessment for a team completing a coaching engagement — scoring maturity dimensions, writing up findings, and presenting recommendations to the Team Lead
- Tracking practice adoption metrics across coached teams and preparing a quarterly summary for Engineering Directors showing DORA improvement trends and quality gate adoption rates

## Key Performance Indicators

- DORA metrics improvement per coached team: deployment frequency, lead time for changes, mean time to recovery, and change failure rate tracked before and after engagement
- Code quality gate adoption rate across delivery teams (percentage of active pipelines with configured and enforced quality gates)
- Number of distinct teams coached per quarter, with a defined engagement scope and measurable outcome
- Engineering practice maturity score delta — improvement in structured maturity assessment scores across coached teams
- Test coverage trend across teams using shared pipeline templates with quality gate enforcement
- Definition of Done completeness rate — percentage of teams with formally documented and tool-embedded DoD criteria
- Practitioner feedback score from post-coaching engagement surveys — measuring coaching quality and perceived impact
- Golden path template adoption rate in Backstage — percentage of new projects starting from a quality-configured template

## Remote Work Considerations

- **Remote Eligibility:** Substantially remote eligible for assessment, documentation, and advisory work; hands-on coaching engagements are most effective with synchronous sessions (video pairing, screen share mob sessions), which can be conducted remotely with appropriate tooling
- **Collaboration Tools:** GitHub, SonarQube, Backstage, Microsoft Teams, Miro, and DORA dashboards; high-quality screen sharing and collaborative coding tooling are essential for effective remote coaching
- **On-Site Requirements:** Periodic on-site or co-located presence is strongly recommended for new team coaching engagements, DoR/DoD workshops, and engineering health assessments where rapport and trust are being established
- **Time Zone Flexibility:** Standard business hours with flexibility to accommodate delivery teams operating across distributed time zones, particularly for pairing sessions and real-time code review coaching
- **On-Call / Operational Demands:** No operational on-call requirement; available for escalation on quality or pipeline incidents where the root cause is practice-related rather than infrastructure-related

## Career Development Path

**Previous Roles:**

- Senior Software Engineer with a strong quality focus, active code reviewer, and demonstrable TDD or BDD practice
- Senior DevOps or Platform Engineer with CI/CD pipeline expertise and quality tooling experience
- Senior Test Automation Engineer seeking to broaden from test delivery into team-wide practice uplift
- Developer Experience Engineer transitioning into a coaching and standards leadership focus

**Potential Next Roles:**

- Engineering Director (with expanded people leadership, organisational accountability, and delivery portfolio ownership)
- DevOps Architect (deepening platform and pipeline architecture scope from a quality and engineering practices foundation)
- Technical Community Leader (broadening from practice coaching into cross-domain knowledge sharing, standards, and community governance)
- Head of Engineering Quality or Head of Engineering Enablement

## Recommended Certifications & Learning Paths

**Core Certifications:**

- ISTQB Advanced Level – Test Analyst or Technical Test Analyst (for structured test quality and test design depth)
- SAFe DevOps Practitioner (for CI/CD value stream and flow efficiency alignment in scaled Agile contexts)
- ICP-ACC (ICAgile Certified Professional — Agile Coaching) — for team coaching, facilitation, and practice change leadership

**Complementary Certifications:**

- Certified Kubernetes Administrator (CKA) or equivalent cloud-native platform certification (for pipeline and deployment infrastructure credibility)
- GitHub Advanced Security Certification (for security-in-pipeline and SAST/DAST quality gate depth)
- SAFe Lean-Agile Practitioner or SAFe Scrum Master (for delivery team context and scaled agile alignment)
- AWS DevOps Engineer – Professional or Microsoft DevOps Engineer Expert (for CI/CD platform depth across cloud toolchains)

**Learning Resources and Communities:**

- DORA (dora.dev) — research reports, DORA metrics definitions, and the Four Keys open-source project, Accelerate by Nicole Forsgren, Jez Humble, and Gene Kim (foundational text for DORA metrics and engineering performance), Martin Fowler's bliki (martinfowler.com) for TDD, refactoring, and continuous delivery patterns, Thoughtworks Technology Radar for emerging engineering practices and tooling signals, and internal engineering communities of practice as both participant and facilitator for sharing coaching outcomes and practice improvements
