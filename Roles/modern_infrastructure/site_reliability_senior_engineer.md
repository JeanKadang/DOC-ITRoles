# Site Reliability Senior Engineer

| Field | Value |
|---|---|
| **Domain** | Modern Infrastructure |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Senior Engineer |
| **Reports To** | Cloud, Platform & Infrastructure Chapter Lead |
| **Direct Reports** | None (formal line management sits with the Chapter Lead) |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Site Reliability Senior Engineer (Senior SRE) leads the technical implementation of SRE practices across the organisation's production engineering teams. Building on hands-on SRE engineering experience, this role takes ownership of complex reliability projects, leads SLO/SLI design for critical services, mentors junior SREs, and drives forward the engineering practices around observability, incident management, capacity planning, and toil elimination. The Senior SRE operates with a high degree of autonomy and serves as a technical lead in cross-functional reliability initiatives.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — reliability engineering practice, SLO design, and incident post-mortem methodology across engineering squads
- **Experience Anchor:** 5+ years in site reliability engineering with demonstrated independent delivery — operates independently within the reliability strategy set by chapter architecture
- **Out of Scope:** Platform engineering architecture (Platform Engineering Architect-owned, this role drives reliability requirements into it); observability platform design (Observability Engineers-owned, this role collaborates on telemetry pipeline design with it); availability-impacting security incident ownership (Security Operations-owned, this role coordinates with it)
- **Escalates To:** Platform Engineering Architect — systemic reliability issues and platform-level design escalations
- **Escalated To By:** the Site Reliability Engineer on implementation feedback and reliability practice questions

## Business Impact

- **Business Objective:** Drive measurable improvements in service reliability, reducing customer-impacting incidents and enabling engineering teams to safely increase delivery velocity through automated reliability controls.
- **Value Metrics:** Service availability against SLO targets, error budget consumption trends, mean time to detect (MTTD) and mean time to recover (MTTR), toil reduction percentage, change failure rate, deployment frequency improvement.
- **Key Stakeholders:** Engineering squads (product and platform), Observability team, Security Operations, Product Management, Customer Support.
- **Processes Supported:** Incident management, SLO review cycles, capacity planning, change risk assessment, on-call programme management, blameless post-mortem process.

## Key Responsibilities

- Lead SLO/SLI design for business-critical services; guide engineering squads in defining and instrumenting meaningful reliability targets.
- Design and implement advanced observability solutions: distributed tracing (OpenTelemetry), structured logging pipelines, and multi-dimensional metrics collection.
- Lead complex incident response for P1/P2 incidents; run blameless post-mortems and drive action item resolution.
- Identify and lead toil elimination projects - automating recurring manual operational tasks.
- Design and implement chaos engineering experiments to proactively validate system resilience.
- Build and maintain reliability dashboards and error budget burn rate alerting.
- Lead capacity planning exercises for production services, including load testing and traffic modelling.
- Contribute to and review production readiness review (PRR) processes for new services.
- Develop shared SRE tooling - runbooks automation, auto-remediation scripts, and self-healing infrastructure patterns.
- Mentor SREs and provide technical coaching to engineering teams on reliability best practices.
- Define and maintain on-call runbooks and playbooks for critical services.
- Evaluate and adopt new reliability tooling and platform improvements.

## Key Decisions and Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| SLO/SLI definition for assigned service domains | Architectural decisions affecting reliability (with Architects) |
| Toil elimination project scoping and execution | Error budget policy and risk appetite (with Product and Engineering leadership) |
| On-call runbook design and incident response tooling | System design choices in engineering squads |
| Chaos engineering experiment design and execution | Capacity investment decisions (with Infrastructure/Finance) |
| SRE tooling and automation implementation | Incident prioritisation policy |

## Required Skills

**Technical Skills:**

- Deep expertise with observability tooling: Prometheus, Grafana, OpenTelemetry, Datadog, Dynatrace, or New Relic.
- Proficiency with Kubernetes operations: scaling, resource quotas, node management, cluster reliability patterns.
- Strong coding skills in Go, Python, or similar for SRE tooling development and automation.
- Experience with chaos engineering frameworks: Chaos Monkey, LitmusChaos, Chaos Mesh, or AWS Fault Injection Simulator.
- In-depth knowledge of SLO/SLI/SLA frameworks and error budget management.
- Experience designing load testing strategies: k6, Locust, Apache JMeter, or Gatling.
- Strong understanding of distributed systems failure modes and reliability patterns (circuit breakers, bulkheads, retries with backoff).
- Knowledge of incident management processes: PagerDuty, OpsGenie, incident command frameworks.
- Experience implementing auto-remediation and self-healing patterns.
- Familiarity with infrastructure as code: Terraform or Pulumi for reliability infrastructure.

**Soft Skills and Leadership:**

- Ability to remain calm and lead effectively under the pressure of major incident response.
- Strong facilitation skills for post-mortem and reliability review meetings.
- Mentoring and coaching engineers on reliability culture and practices.
- Ability to advocate for reliability investment with product and engineering leadership.

**Technology Proficiency Levels:**

- **Expert level required:** Prometheus, Grafana, and Alertmanager for SLO instrumentation, error budget burn-rate alerting, and reliability dashboards, Kubernetes (Helm, Kustomize) for cluster reliability operations and resource management, OpenTelemetry for distributed tracing and multi-signal observability, SLO/SLI/SLA framework design and error budget policy implementation for business-critical services
- **Proficient level required:** LitmusChaos, Chaos Mesh, and AWS FIS for chaos engineering experiment design and execution, PagerDuty and OpsGenie for on-call programme management and incident routing, k6 and Locust for load testing, capacity validation, and traffic modelling, Python and Go for SRE tooling development and runbook automation
- **Working Knowledge required:** Terraform and Pulumi for reliability infrastructure as code, Argo Rollouts and Flagger for progressive delivery and canary deployments, Datadog and Dynatrace for supplementary APM and infrastructure observability
- **Awareness level expected:** AIOps and ML-assisted incident detection and anomaly correlation platforms, eBPF-based observability tooling (Pixie, Tetragon)

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| SRE Architect (Platform Engineering Architect) | Receive reliability strategy direction; provide implementation feedback and escalate systemic reliability issues | Escalates To |
| Engineering Squads | Embed reliability practices; support SLO design and incident post-mortems | Provides To |
| Observability Engineers | Collaborate on telemetry pipeline and dashboard design | Collaborates |
| Platform Engineering | Drive reliability requirements for internal developer platform capabilities | Provides To |
| Security Operations | Coordinate on availability-impacting security incidents | Collaborates |

## Key Technologies

- Kubernetes / Helm / Kustomize
- Prometheus / Grafana / Alertmanager
- OpenTelemetry (metrics, traces, logs)
- Datadog / Dynatrace / New Relic
- LitmusChaos / Chaos Mesh / AWS FIS
- PagerDuty / OpsGenie
- Python / Go (SRE tooling)
- Terraform / Pulumi
- k6 / Locust (load testing)
- Argo Rollouts / Flagger (progressive delivery)

## Typical Day-to-Day Activities

- Reviewing error budget burn rate dashboards and investigating degraded SLOs.
- Leading or participating in P1/P2 incident bridge calls.
- Designing and running chaos experiments on resilience test candidates.
- Reviewing production readiness checklists for new service launches.
- Collaborating with engineering squads on SLI instrumentation.
- Mentoring SREs on incident analysis and post-mortem facilitation.
- Building automation for toil-heavy operational tasks.
- Participating in on-call rotation and reviewing on-call burden metrics.

## Key Performance Indicators

- SLO target achievement rate per service
- Error budget consumption trends (healthy burn rate)
- Mean time to detect (MTTD) for P1/P2 incidents
- Mean time to recover (MTTR) for P1/P2 incidents
- Toil hours per week (trend: decreasing)
- Post-mortem completion rate and action item close rate
- Chaos experiment coverage across critical service tier

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, Slack, PagerDuty, GitHub, Confluence, Grafana.
- **On-Site Requirements:** None typically.
- **Time Zone Flexibility:** On-call rotation requires responsiveness outside core hours; rota design should minimise unsociable hours.
- **On-Call / Operational Demands:** Active on-call rotation (typically 1 week in N, where N = team size); P1 incident response required within defined SLA.

## Career Development Path

**Previous Roles:**

- Site Reliability Engineer
- Senior DevOps Engineer
- Senior Platform Engineer

**Potential Next Roles:**

- SRE Architect / Staff SRE
- Platform Engineering Architect
- Engineering Manager (reliability-focused)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Certified Kubernetes Administrator (CKA)
- Certified Kubernetes Application Developer (CKAD)

**Complementary Certifications:**

- Google Cloud Professional Cloud DevOps Engineer
- AWS DevOps Engineer - Professional
- Prometheus Certified Associate (PCA)

**Learning Resources and Communities:**

- Google SRE Book and Workbook (sre.google)
- CNCF Observability Technical Advisory Group
- SRE Weekly newsletter
- LitmusChaos and Chaos Engineering community resources
