# Platform Reliability Engineer

| Field | Value |
|---|---|
| **Domain** | DevOps |
| **Chapter:** | DevOps & Delivery |
| **Role Level** | Engineer |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Platform Reliability Engineer applies site reliability engineering (SRE) principles specifically to the internal developer platform and shared engineering infrastructure — treating internal engineering teams as the primary customers rather than end users. This role owns the reliability, availability, and performance of platform services including CI/CD infrastructure, developer portals, self-service provisioning tooling, and shared Kubernetes clusters. The Platform Reliability Engineer defines and tracks SLOs for platform services, manages error budgets, runs chaos engineering experiments to validate platform resilience, and leads blameless incident reviews when platform failures affect developer productivity.

## Business Impact

- **Business Objective:** Ensure the internal developer platform remains a high-reliability, high-trust foundation for engineering delivery — minimising platform-caused disruption to development teams and protecting developer productivity through proactive reliability engineering and rapid incident response.
- **Value Metrics:** Platform SLO achievement rate, mean time to recover (MTTR) for platform incidents, platform error budget burn rate, developer-reported platform reliability satisfaction score, number of platform-caused deployment failures per quarter, chaos experiment coverage of critical platform components.
- **Key Stakeholders:** Application development teams (primary customers), DevOps Architect, Developer Experience Engineers, Engineering Managers, FinOps team (platform infrastructure costs).
- **Processes Supported:** Platform incident management, platform SLO/error budget governance, chaos engineering programme, blameless post-incident review process, platform capacity planning, developer platform availability reporting.

## Key Responsibilities

- Define, implement, and track SLOs and SLIs for all critical internal platform services — CI/CD infrastructure, developer portals, self-service APIs, shared cluster infrastructure, and artifact repositories.
- Manage error budget policy: monitor burn rate, trigger reliability work when budgets are at risk, and communicate status transparently to engineering stakeholders.
- Design and execute chaos engineering experiments using LitmusChaos, Chaos Mesh, or equivalent tooling to validate platform resilience before failures reach development teams.
- Lead blameless post-incident reviews for platform failures — producing high-quality incident reports with root cause analysis and actionable follow-up items.
- Instrument platform services with Prometheus, Grafana, and OpenTelemetry to ensure comprehensive observability coverage across all platform components.
- Build and maintain alerting for platform SLO burn-rate and infrastructure health, integrating with PagerDuty or equivalent on-call routing.
- Collaborate with Developer Experience Engineers to build reliability into new IDP features and platform services from design through to production.
- Perform platform capacity planning and work with Cloud Architects on right-sizing and autoscaling strategies for shared platform infrastructure.
- Drive a culture of reliability within the platform engineering team through runbook authorship, game day facilitation, and reliability review practices.
- Maintain platform runbooks, incident playbooks, and reliability standards documentation.

## Key Decisions and Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Platform SLO definitions, SLI instrumentation, and error budget policy for all internal platform services | Platform feature design and IDP architecture (owned by DevOps Architect and Developer Experience Engineers) |
| Chaos engineering programme — experiment design, scheduling, and outcomes for platform resilience validation | Cloud infrastructure reliability architecture and multi-region design (owned by Cloud Architects) |
| Blameless post-incident review process for platform failures and remediation tracking | Observability platform toolchain selection and standards (owned by Observability Architect) |
| Platform on-call rotation design, alerting configuration, and runbook library for platform incidents | Kubernetes cluster architecture and networking (owned by Kubernetes Architect) |

## Required Skills & Qualifications

**Technical Skills:**

- Hands-on experience implementing SLO/SLI frameworks and error budget policies for infrastructure or platform services.
- Proficiency with Prometheus, Grafana, and Alertmanager for platform metrics collection, dashboarding, and burn-rate alerting.
- Experience with chaos engineering tools: LitmusChaos, Chaos Mesh, or equivalent — including experiment design, execution, and outcome analysis.
- Solid Kubernetes operational knowledge: debugging cluster issues, analysing workload reliability, and understanding failure modes in Kubernetes-hosted platform services.
- Working knowledge of OpenTelemetry for platform service instrumentation and distributed trace analysis.
- Experience with incident management tooling: PagerDuty, Opsgenie, or equivalent — including alert routing configuration and on-call scheduling.
- Familiarity with Helm for platform service deployment and release management.
- Understanding of CI/CD infrastructure reliability considerations: pipeline execution reliability, artifact storage availability, and GitOps controller stability.

**Soft Skills & Leadership:**

- Strong analytical thinking for root cause analysis during blameless post-incident reviews and for identifying systemic reliability risks.
- Clear written communication for incident reports, runbooks, and SLO status updates to engineering stakeholders.
- Collaborative and empathetic approach to working with Developer Experience Engineers and application teams who depend on platform reliability.

**Technology Proficiency Levels:**

- **Expert level required:** Prometheus and Grafana (SLO/SLI framework implementation, burn-rate dashboards, and alerting for platform services), LitmusChaos or Chaos Mesh (Kubernetes-native chaos engineering experiment design and execution), blameless post-incident review facilitation and platform error budget management
- **Proficient level required:** Kubernetes (platform workload reliability debugging and failure mode analysis), OpenTelemetry (platform service instrumentation and distributed tracing), PagerDuty or Opsgenie (on-call routing, escalation configuration, and incident alerting)
- **Working Knowledge required:** Helm (platform service deployment and release management), Alertmanager (Prometheus-integrated alert routing and grouping), Grafana Loki (log aggregation and analysis for platform incident response)
- **Awareness level expected:** eBPF-based observability tooling for Kubernetes platform services, incident management platforms (incident.io, Statuspage), AI-assisted incident correlation and anomaly detection tools

## Interactions with Other Roles

| Role | Nature of Interaction |
|---|---|
| Developer Experience Engineer | Review platform feature designs for reliability risks and to jointly respond to IDP incidents |
| DevOps Architect | Platform design reviews — providing reliability and resilience input to IDP architecture decisions |
| Observability Architect | Align platform monitoring with organisation-wide observability standards and telemetry pipeline governance |
| Azure, AWS, and GCP Cloud Architects | Underlying infrastructure reliability, autoscaling, and multi-zone availability design for shared platform components |
| Kubernetes Architect | Cluster reliability, workload isolation, and failure domain analysis for platform services hosted on shared clusters |
| application development teams | Communicate platform SLO status, planned maintenance, and reliability improvements |
| FinOps team | Platform infrastructure cost optimisation initiatives that must be balanced against reliability requirements |

## Key Technologies

- Prometheus and Grafana (platform metrics, SLO tracking, burn-rate dashboards, and alerting)
- OpenTelemetry (platform service instrumentation and distributed tracing)
- LitmusChaos and Chaos Mesh (Kubernetes-native chaos engineering)
- PagerDuty or Opsgenie (on-call routing, incident alerting, and escalation policies)
- Kubernetes (platform workload hosting, failure mode analysis, and cluster operational debugging)
- Helm (platform service packaging and release management)
- Alertmanager (Prometheus-integrated alert routing and grouping)
- Grafana Loki (platform log aggregation and incident log analysis)
- GitHub Actions or GitLab CI (CI/CD infrastructure reliability monitoring)
- Incident management platforms (incident.io, Statuspage, or equivalent for developer-facing status communication)

## Typical Day-to-Day Activities

- Reviewing platform SLO burn-rate dashboards and investigating any error budget anomalies or burn-rate alert triggers.
- Responding to and triaging platform incidents — debugging CI/CD failures, developer portal outages, or self-service provisioning disruptions.
- Designing and scheduling chaos engineering experiments targeting platform components with low resilience validation coverage.
- Writing and reviewing blameless post-incident reports following platform failures, including root cause analysis and follow-up action tracking.
- Collaborating with Developer Experience Engineers during feature design reviews to identify reliability risks in new IDP capabilities.
- Building and refining runbooks for common platform failure scenarios to reduce MTTR for the on-call rotation.
- Updating and maintaining SLO configurations, alerting rules, and Grafana dashboards for platform services.
- Conducting capacity reviews for platform infrastructure to identify risk of resource saturation before it impacts developer teams.
- Participating in sprint ceremonies and contributing reliability work items to the platform engineering backlog.
- Running game day exercises with the platform team to validate incident response procedures and runbook accuracy.

## Key Performance Indicators

- Platform SLO achievement rate: ≥99% of defined platform SLOs met per quarter across CI/CD infrastructure, developer portal, and self-service APIs
- Mean time to recover (MTTR) for platform P1/P2 incidents: target ≤30 minutes for CI/CD infrastructure, ≤60 minutes for developer portal
- Platform error budget burn rate: no service consuming more than 50% of monthly error budget without a reliability improvement plan in place
- Chaos engineering coverage: ≥80% of critical platform components validated by at least one chaos experiment per quarter
- Developer-reported platform reliability satisfaction score: ≥4.0/5.0 on internal developer platform surveys
- Post-incident review completion rate: 100% of P1/P2 platform incidents have a published blameless review within 5 business days
- Runbook coverage: ≥90% of paging alerts have an associated runbook linked in the alert annotation
- Platform-caused deployment failures: fewer than 5 confirmed platform-originated deployment failures per month across all teams

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — all reliability engineering, chaos experimentation, and incident response work is tooling-based with no physical infrastructure dependency.
- **Collaboration Tools:** Microsoft Teams or Slack, PagerDuty, Grafana, GitHub / GitLab, Jira, Confluence, incident.io or equivalent incident coordination tooling.
- **On-Site Requirements:** Minimal; occasional on-site for platform reliability workshops, game days, or team summits.
- **Time Zone Flexibility:** Requires participation in an on-call rotation with time zone coverage agreed within the team; flexibility for cross-regional platform incidents.
- **On-Call / Operational Demands:** Active participant in platform on-call rotation with defined escalation paths; primary responder for platform SLO-breaching incidents during on-call windows.

## Career Development Path

**Previous Roles:**

- DevOps Engineer or Platform Engineer (with reliability interest)
- Site Reliability Engineer (application-focused SRE moving to platform specialism)
- Infrastructure Engineer with monitoring and incident response experience
- CI/CD Engineer with operational support responsibilities
- Cloud Engineer with SRE practices exposure

**Potential Next Roles:**

- DevOps Senior Engineer
- Site Reliability Senior Engineer
- Observability Senior Engineer
- DevOps Architect (platform reliability specialism)
- Head of Platform Reliability / SRE Practice Lead

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Certified Kubernetes Administrator (CKA) — CNCF (foundational for platform reliability context)
- Prometheus Certified Associate (PCA) — CNCF
- AWS Certified SysOps Administrator – Associate or Microsoft Certified: Azure Administrator Associate (AZ-104)

**Complementary Certifications:**

- Certified Kubernetes Security Specialist (CKS) — for platform security reliability context
- FinOps Certified Practitioner — for reliability vs cost trade-off decision-making
- PagerDuty AIOps and On-Call Management certifications (PagerDuty University)
- LitmusChaos contributor certifications and CNCF chaos engineering community resources

**Learning Resources & Communities:**

- Google SRE books and SRE Workbook (sre.google) — foundational SRE principles
- Chaos Engineering community (chaos.community) and LitmusChaos documentation (litmuschaos.io)
- CNCF TAG Runtime and Reliability working group publications
- SLOconf conference recordings and OpenSLO specification (openslo.com)
- Gremlin blog and chaos engineering learning resources (gremlin.com)
- Platform Engineering community (platformengineering.org) — reliability-focused content
