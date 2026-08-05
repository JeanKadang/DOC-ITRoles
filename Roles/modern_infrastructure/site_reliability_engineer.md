# Site Reliability Engineer

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

The Site Reliability Engineer (SRE) focuses on creating reliable, scalable, and efficient systems through engineering practices applied to operations. This role bridges development and operations, designing solutions that improve system reliability, performance, and observability while reducing toil through automation.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of reliability engineering practices and incident response support tasks
- **Experience Anchor:** 1-3 years in site reliability or infrastructure engineering — works under guidance, building toward independent delivery
- **Out of Scope:** Reliability strategy and SLO framework design (Site Reliability Senior Engineer and Platform Engineering Architect-owned); observability platform implementation (Observability Engineers-owned, this role coordinates monitoring with it); deployment pipeline architecture (DevOps Engineers-owned, this role coordinates reliability with it)
- **Escalates To:** Site Reliability Senior Engineer — reliability design questions and complex implementation issues
- **Escalated To By:** application teams on reliability engineering practices support

## Business Impact

- **Business Objective:** Ensures critical services meet reliability targets through engineering-driven automation, SLO management, and chaos engineering, directly reducing business impact from system failures and operational incidents
- **Value Metrics:** SLO/SLA achievement rates, mean time to detect (MTTD) and recover (MTTR), toil reduction percentage, percentage of incidents resolved by automated remediation, error budget consumption
- **Key Stakeholders:** Application development teams, IT operations, Platform Engineering Architects, Observability Engineers, IT leadership
- **Processes Supported:** SLO management and error budget tracking, incident response automation, chaos engineering, capacity planning, postmortem and reliability improvement lifecycle

## Key Responsibilities

- Design and implement automation for operational tasks and incident response
- Establish and maintain Service Level Objectives (SLOs) for critical services
- Create observability solutions for complex distributed systems
- Implement robust monitoring and alerting frameworks
- Build and maintain self-healing systems that recover from failures
- Conduct postmortem analysis and implement reliability improvements
- Develop runbooks and playbooks for operational procedures
- Implement chaos engineering practices to improve system resilience
- Extend SLOs and error budgets to services running at edge sites, where a site can be unreachable without being unhealthy and recovery may not be remotely actionable

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| SLO/SLI framework design, error budget policies, and automated remediation runbook implementation | Application architecture reliability patterns and cloud infrastructure design decisions |
| Chaos engineering experiment design, failure injection testing strategy, and resilience validation | Cloud platform scaling decisions, disaster recovery architecture, and capacity planning |
| Runbook automation, incident playbook standards, and toil elimination through code | Platform architecture reliability design, observability instrumentation strategy, and deployment pipeline reliability |

## Required Skills & Qualifications

- Strong software engineering skills with operational experience
- Experience with monitoring, metrics collection, and alerting systems
- Knowledge of infrastructure automation and configuration management
- Understanding of distributed systems design and failure modes
- Experience with incident management and response
- Proficiency in at least one programming language (Python, Go, etc.)
- Knowledge of containerization and orchestration technologies
- Understanding of infrastructure as code principles

**Technology Proficiency Levels:**

**Expert level required:**

- Prometheus and Grafana for SLI/SLO instrumentation, error budget dashboards, and reliability monitoring, Kubernetes for container platform reliability operations and resource management, SLO/SLI framework design and error budget policy implementation, Incident management platforms (PagerDuty, OpsGenie) and runbook automation

**Proficient level required:**

- Chaos engineering tools (LitmusChaos, Gremlin, Chaos Mesh) for resilience validation
- Infrastructure as Code (Terraform, Pulumi) for reliability infrastructure automation
- Load testing tools (k6, Locust, Apache JMeter) for performance and capacity validation
- Log aggregation systems (Loki, Elasticsearch, Splunk) for incident diagnosis

**Working Knowledge required:**

- Service mesh technologies (Istio, Linkerd) for traffic management and circuit-breaking
- Datadog or New Relic for APM and synthetic monitoring
- CI/CD pipeline reliability gates and progressive delivery patterns

**Awareness level expected:**

- eBPF-based observability and low-overhead profiling tools
- Emerging auto-remediation and AIOps platforms for toil reduction

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Platform Engineering Architects | Reliability design patterns | Consumes From |
| Observability Engineers | Monitoring implementation | Collaborates |
| Cloud Platform Engineers | Cloud service reliability | Collaborates |
| DevOps Engineers | Deployment pipeline reliability | Collaborates |
| Security Engineers | Implementing secure reliable systems | Collaborates |
| application teams | Reliability engineering practices | Provides To |

## Key Technologies

- Observability platforms (Prometheus, Grafana, Datadog, New Relic)
- Service mesh technologies (Istio, Linkerd)
- Kubernetes and container platforms
- Infrastructure as Code tools (Terraform, Pulumi)
- CI/CD pipeline tools with reliability gates
- Chaos engineering tools (Chaos Monkey, Litmus, Gremlin)
- SLO/SLI instrumentation frameworks
- Load testing and performance analysis tools
- Log aggregation and analysis systems
- Incident management platforms
- Runbook automation tools
- Configuration management systems
- Edge site reliability patterns — degraded-mode operation and autonomous local recovery
- Multi-site SLO aggregation where per-site availability differs from service availability

## Typical Day-to-Day Activities

- Analyzing service reliability metrics and identifying improvements
- Designing and implementing automated remediation for common failures
- Collaborating with development teams on reliability requirements
- Configuring and optimizing monitoring and alerting systems
- Participating in incident response and postmortem reviews
- Implementing chaos engineering experiments
- Creating and improving runbooks for operational procedures
- Optimizing service performance and resource utilization
- Conducting capacity planning and scalability analysis
- Building tools to reduce operational toil

## Key Performance Indicators

- System availability and reliability metrics
- Mean time to detection (MTTD) for incidents
- Mean time to recovery (MTTR) from failures
- SLO/SLA achievement percentages
- Percentage of incidents resolved by automated remediation
- Reduction in toil through automation
- Accuracy of capacity planning
- Effectiveness of observability solutions
- Quality of postmortem analysis and improvements
- Knowledge sharing and documentation quality

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; SRE work is performed through cloud management tooling, monitoring platforms, and remote development environments
- **Collaboration Tools:** Microsoft Teams, Jira, GitHub, PagerDuty/OpsGenie, observability platforms (Prometheus/Grafana/Datadog), Kubernetes tooling
- **On-Site Requirements:** Not required; all SRE operations and engineering are performed remotely
- **Time Zone Flexibility:** Core hours with strong time zone coverage for incident response; flexibility for distributed team coverage of on-call rotation
- **On-Call / Operational Demands:** Participates in on-call rotation for critical service incidents, SLO breach response, major infrastructure reliability events, and post-incident reviews

## Career Development Path

**Previous Roles:**

- Software Engineer
- DevOps Engineer
- Systems Administrator
- Network Engineer
- Cloud Engineer

**Potential Next Roles:**

- Senior Site Reliability Engineer
- SRE Team Lead
- Reliability Architect
- Platform Engineering Manager
- Technical Operations Director

## Recommended Certifications & Learning Paths

- Google SRE certification
- Linux Foundation SRE certification
- Certified Kubernetes Administrator (CKA)
- AWS/Azure/GCP cloud certifications
- Prometheus certification
- Chaos engineering certifications
- Service mesh certifications
- DevOps certifications (e.g., DevOps Institute)
- Site Reliability Engineering courses from major cloud providers

**Complementary Certifications:**

- Certified Kubernetes Administrator (CKA), cloud reliability certifications (AWS/Azure/GCP), Prometheus Certified Associate, chaos engineering practitioner certifications (Gremlin, LitmusChaos), and ITIL Foundation

**Learning Resources and Communities:**

- Google SRE books (sre.google), SREcon archives (usenix.org/srecon), Honeycomb engineering blog (honeycomb.io), DORA research (dora.dev), Prometheus documentation, and PagerDuty operational runbook guides
