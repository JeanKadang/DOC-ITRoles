# Chaos Engineer

| Field | Value |
|---|---|
| **Domain** | Modern Infrastructure |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Engineer |
| **Reports To** | Site Reliability Senior Engineer |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Chaos Engineer designs, implements, and executes controlled failure experiments to proactively validate the resilience and reliability of distributed systems, cloud infrastructure, and microservices. Rather than waiting for production incidents to expose weaknesses, Chaos Engineering deliberately injects failures - network partitions, pod terminations, resource exhaustion, latency injection - to verify that systems behave as expected under failure conditions and that monitoring and alerting correctly detects them. This role operates at the intersection of SRE, platform engineering, and quality engineering.

## Role Scope & Boundaries

- **Scope of Influence:** Team — chaos engineering experiment design, fault injection tooling, and resilience validation
- **Experience Anchor:** 3-5 years in site reliability or resilience engineering — operates independently within the SRE practice's SLO framework
- **Out of Scope:** SLO framework and reliability strategy (Site Reliability Senior Engineer-owned, this role validates it through experiments); internal developer platform design (Platform Engineering-owned, this role integrates chaos tooling with it); monitoring platform architecture (Observability Engineers-owned, this role validates alerting through it)
- **Escalates To:** Site Reliability Senior Engineer — SLO validation findings and incident readiness gaps
- **Escalated To By:** Engineering Squads on chaos experiment scheduling and remediation guidance

## Business Impact

- **Business Objective:** Reduce the frequency and severity of unplanned production outages by discovering and remediating resilience weaknesses before they manifest as customer-impacting incidents.
- **Value Metrics:** Number of resilience weaknesses discovered per experiment cycle, reduction in P1/P2 incident rate correlated with chaos experiment areas, mean time to detect (MTTD) validation accuracy, percentage of critical services covered by chaos experiments, blast radius containment demonstrated in experiments.
- **Key Stakeholders:** SRE teams, Engineering squads, Platform Engineering, Observability team, Security Operations, Product Management.
- **Processes Supported:** Production readiness reviews, resilience validation, disaster recovery testing, incident preparation, game day exercises.

## Key Responsibilities

- Design and execute controlled chaos experiments targeting infrastructure, network, application, and data layer failure scenarios.
- Implement and maintain chaos engineering platforms (LitmusChaos, Chaos Mesh, AWS Fault Injection Simulator, Azure Chaos Studio, Gremlin).
- Define hypothesis-driven experiment methodology: steady state definition, hypothesis, experiment design, and result analysis.
- Collaborate with SRE and engineering teams to identify resilience gaps and prioritise experiment targets.
- Conduct game days: coordinated fault injection exercises with on-call teams to validate incident response and system recovery.
- Validate monitoring and alerting effectiveness during experiments - ensuring failures are detected within target MTTD.
- Document experiment results, findings, and recommended remediations in a chaos experiment catalogue.
- Integrate chaos experiments into CI/CD pipelines for automated pre-production resilience validation.
- Design blast radius controls and safeguards to ensure experiments do not cause unintended production impact.
- Support teams in remediating identified resilience weaknesses.
- Contribute to production readiness review checklists by defining resilience acceptance criteria.
- Develop chaos engineering runbooks and experiment templates for engineering team self-service.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Chaos experiment design, execution, and documentation | Go/no-go decisions for experiments on sensitive production systems |
| Chaos engineering platform administration | Resilience requirements in system architecture (with Architects) |
| Experiment catalogue and findings tracking | Remediation implementation (engineering squads own fixes) |
| Game day planning and facilitation | Error budget policy implications of identified gaps |

## Required Skills & Qualifications

**Technical Skills:**

- Hands-on experience with chaos engineering platforms: LitmusChaos, Chaos Mesh, Gremlin, AWS Fault Injection Simulator (FIS), or Azure Chaos Studio.
- Strong knowledge of Kubernetes failure modes: pod termination, node failure, network partition, resource pressure, HPA/VPA disruption.
- Understanding of distributed systems failure patterns: cascading failures, split-brain, thundering herd, retry storms, circuit breaker failures.
- Experience with network fault injection: latency, packet loss, bandwidth throttling (tc/netem, Toxiproxy, Istio fault injection).
- Proficiency with observability tooling to measure steady state and validate experiment impact: Prometheus, Grafana, Datadog, OpenTelemetry.
- Scripting skills in Python, Go, or bash for experiment automation and tooling integration.
- Experience with load generation tools (k6, Locust) for steady-state traffic generation during experiments.
- Familiarity with cloud platform failure injection: AWS FIS, Azure Chaos Studio, GCP fault injection.
- Knowledge of resilience patterns: circuit breakers, bulkheads, exponential backoff, read replicas, multi-AZ deployments.

**Soft Skills and Leadership:**

- Meticulous approach to safety and blast radius management during experiment design.
- Strong written communication for experiment documentation and stakeholder reports.
- Ability to facilitate cross-team game day exercises with confidence.
- Persuasive communication skills for gaining trust and buy-in from teams protective of their services.

**Technology Proficiency Levels:**

**Expert level required:**

- LitmusChaos and Chaos Mesh for Kubernetes fault injection experiments
- Kubernetes failure modes and cluster-level chaos (pod termination, node failure, resource pressure)
- Prometheus and Grafana for steady-state measurement and experiment impact validation
- Hypothesis-driven chaos experiment design and blast radius controls

**Proficient level required:**

- Gremlin commercial chaos platform
- AWS Fault Injection Simulator (FIS) and Azure Chaos Studio
- Toxiproxy and tc-netem for network fault injection (latency, packet loss, bandwidth throttling)
- k6 and Locust for steady-state traffic generation during experiments

**Working Knowledge required:**

- Istio and Envoy service mesh fault injection, GitHub Actions and Azure DevOps for CI chaos pipeline integration, Python, Go, and Bash for experiment automation and tooling

**Awareness level expected:**

- OpenTelemetry for chaos observability integration
- Emerging GameDay automation frameworks and chaos orchestration tooling

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| SRE / Senior SRE | Collaborate on SLO validation and incident readiness | Escalates To |
| Platform Engineering | Design chaos tooling integration with internal developer platforms | Collaborates |
| Engineering Squads | Run experiments on their services; communicate findings and guide remediation | Provides To |
| Observability Engineers | Validate alerting and monitoring effectiveness during fault injection | Collaborates |
| Security Engineers | Ensure experiment tooling and processes meet security requirements | Governed By |

## Key Technologies

- LitmusChaos / Chaos Mesh (Kubernetes chaos)
- Gremlin (commercial chaos platform)
- AWS Fault Injection Simulator (FIS)
- Azure Chaos Studio
- Toxiproxy / tc-netem (network fault injection)
- Istio / Envoy (service mesh fault injection)
- Prometheus / Grafana / OpenTelemetry
- k6 / Locust (load generation for steady state)
- Python / Go / bash (experiment automation)
- GitHub Actions / Azure DevOps (CI chaos integration)

## Typical Day-to-Day Activities

- Designing new chaos experiment hypotheses based on recent incident data or upcoming service launches.
- Running experiments in staging or canary production environments with observability monitoring active.
- Analysing experiment results and documenting findings in the chaos catalogue.
- Collaborating with engineering squads on remediating identified weaknesses.
- Building and maintaining chaos tooling integrations in CI/CD pipelines.
- Planning and facilitating game day exercises with on-call and engineering teams.
- Reviewing production readiness checklists for new service deployments.
- Monitoring chaos experiment platform health.

## Key Performance Indicators

- Number of chaos experiments executed per quarter
- Resilience weaknesses discovered and remediated
- Game day exercises conducted per year (target: per major service domain)
- Services with automated pre-production chaos gates in CI/CD
- MTTD validation accuracy (alerts triggered within target window during experiments)
- Stakeholder participation rate in game days

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, GitHub, Jira, Confluence, chaos platform consoles, Grafana.
- **On-Site Requirements:** None typically.
- **Time Zone Flexibility:** Game days require coordination with on-call teams across time zones.
- **On-Call / Operational Demands:** Not typically on an incident on-call rota, but available during game days and active experiments.

## Career Development Path

**Previous Roles:**

- Site Reliability Engineer
- Platform Engineer
- DevOps Engineer with resilience focus
- Software Engineer with distributed systems background

**Potential Next Roles:**

- Site Reliability Senior Engineer
- SRE Architect
- Platform Engineering Architect
- Resilience Engineering Lead

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Certified Kubernetes Administrator (CKA)
- Certified Kubernetes Application Developer (CKAD)

**Complementary Certifications:**

- AWS DevOps Engineer - Professional
- Google Cloud Professional Cloud DevOps Engineer
- Prometheus Certified Associate (PCA)

**Learning Resources and Communities:**

- Chaos Engineering: System Resiliency in Practice (O'Reilly book, Casey Rosenthal)
- Chaos Engineering Community (Slack)
- LitmusChaos community and CNCF Chaos Engineering Working Group
- Netflix Tech Blog - Chaos Engineering origins and practices
- Gremlin learning hub and experiment templates
