# Observability Architect

| Field | Value |
|---|---|
| **Domain** | Modern Infrastructure |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Architect |
| **Reports To** | Cloud, Platform & Infrastructure Chapter Lead |
| **Direct Reports** | None (sets technical direction and mentors Observability Senior Engineers; formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Observability Architect designs and governs the organisation's full-stack observability strategy, covering metrics, distributed tracing, structured logging, alerting frameworks, and SLO/SLA design. This role owns the observability platform architecture and toolchain, ensuring that engineers, SREs, and operations teams have the signals they need to detect issues, investigate incidents, and meet reliability commitments. The Observability Architect sets organisation-wide instrumentation standards, governs telemetry pipelines, and drives observability culture across engineering teams operating across cloud-native, hybrid, and multi-cloud environments.

## Role Scope & Boundaries

- **Scope of Influence:** Domain-wide — observability platform architecture, telemetry pipeline standards, and SLO framework design across the chapter
- **Experience Anchor:** 8+ years in observability or SRE architecture with demonstrated architecture-level delivery — operates independently on domain-wide observability architecture decisions
- **Out of Scope:** Cloud-native monitoring service selection (Cloud Architects-owned, this role aligns platform design to it); security event monitoring policy (Security Architect-owned, this role integrates with SIEM per its requirements); CI/CD pipeline design (DevOps Architect-owned, this role integrates observability into it)
- **Escalates To:** Cloud, Platform & Infrastructure Chapter Lead — chapter-wide priorities and cross-domain investment decisions
- **Escalated To By:** Observability Senior Engineers and Engineers on platform implementation and instrumentation standards

## Business Impact

- **Business Objective:** Establish an enterprise observability capability that gives engineering and operations teams real-time insight into system behaviour, enabling rapid incident detection, root cause analysis, and evidence-based reliability engineering — directly reducing customer-impacting outages and improving SLO achievement across the organisation's services.
- **Value Metrics:** Mean time to detect (MTTD) and mean time to recover (MTTR) reduction, SLO achievement rate across critical services, observability coverage across production workloads, alert signal-to-noise ratio improvement, telemetry pipeline cost-per-signal.
- **Key Stakeholders:** CTO, SRE and operations teams, application development teams, security teams, cloud platform teams, business service owners, FinOps.
- **Processes Supported:** Incident detection and response, SLO/SLA management, capacity planning, performance engineering, change impact analysis, security event monitoring, post-incident review.

## Key Responsibilities

- Design the enterprise observability architecture: metrics, logs, traces, events, and continuous profiling across cloud-native, hybrid, and on-premises environments.
- Define organisation-wide instrumentation standards: OpenTelemetry semantic conventions, log structuring standards, trace context propagation, and cardinality governance.
- Architect the observability toolchain: platform selection, data pipeline design (agents, collectors, backends), storage tiering, and visualisation layer.
- Establish SLO/SLI frameworks: define error budget policies, burn-rate alerting, and SLA reporting standards for business-critical services.
- Design alerting governance standards: tiering framework (critical/warning/info), on-call routing integration, runbook linkage, and alert noise reduction policies.
- Govern observability data lifecycle: retention policies, aggregation strategies, cardinality management, and telemetry cost optimisation.
- Architect self-service observability capabilities for application teams: golden signal dashboards, default instrumentation templates, and platform-integrated observability patterns.
- Evaluate and select observability platforms and tools in context of multi-cloud and cloud-native workloads.
- Provide architectural oversight for major platform and application observability implementations.
- Collaborate with SRE teams on reliability engineering practices that depend on observability signals.
- Mentor senior engineers and champion observability culture across the engineering organisation.
- Design edge observability architecture: distributed telemetry collection from edge nodes, OpenTelemetry Collector deployment patterns for resource-constrained edge environments, and KubeEdge workload monitoring integration.
- Define observability strategies for disconnected and intermittently-connected edge sites, including local telemetry buffering, store-and-forward pipeline patterns, and edge-to-cloud telemetry aggregation.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Observability platform architecture and toolchain selection (Prometheus, Datadog, Grafana, Elastic, Azure Monitor) | Cloud platform infrastructure telemetry design and cloud-native monitoring configuration (with Cloud Architects) |
| Organisation-wide instrumentation standards, OpenTelemetry adoption strategy, and cardinality governance | Application architecture decisions and service design patterns (with Solution/Application Architects) |
| SLO/SLI framework design, alerting governance standards, and error budget policies | Incident response process design and on-call operational practices (with SRE and Operations leadership) |
| Observability data lifecycle governance, retention strategy, and telemetry pipeline cost management | Security monitoring strategy and SIEM integration requirements (with Security Architect) |

## Required Skills & Qualifications

**Technical Skills:**

- Deep knowledge of modern observability concepts: the three pillars (metrics, logs, traces) and extended signals (continuous profiling, real user monitoring, synthetic monitoring).
- Hands-on experience with observability platforms: Datadog, Dynatrace, Grafana stack (Prometheus, Loki, Tempo), Elastic Stack, or Azure Monitor / Application Insights.
- Expert knowledge of OpenTelemetry: SDK instrumentation, Collector pipelines, semantic conventions, and trace context propagation.
- Experience designing SLO/SLI frameworks: error budgets, burn-rate alerting, and multi-window multi-burn-rate alert strategies.
- Knowledge of distributed tracing architecture: Jaeger, Grafana Tempo, Zipkin, trace sampling strategies, and head/tail sampling trade-offs.
- Experience with log aggregation and structured logging architecture: Loki, Elasticsearch, Splunk, and log pipeline tooling (Fluent Bit, Fluentd, Vector).
- Understanding of time-series data modelling, cardinality management, and storage tiering for telemetry data at scale.
- Familiarity with Kubernetes-native observability: kube-state-metrics, node exporter, kubelet metrics, and service mesh observability (Istio, Linkerd).
- Knowledge of observability cost management: telemetry sampling, metric downsampling, and data tiering strategies.

**Soft Skills & Leadership:**

- Ability to communicate observability strategy and SLO frameworks to engineering leadership and business stakeholders.
- Cross-functional influence to drive instrumentation standards adoption across autonomous engineering teams without creating adversarial dynamics.
- Pragmatic, high-signal thinking: ability to guide teams toward effective observability without over-instrumentation complexity.

**Technology Proficiency Levels:**

**Expert level required:**

- OpenTelemetry SDK, Collector pipelines, and semantic conventions for enterprise instrumentation standards
- Prometheus and Thanos / Grafana Mimir for large-scale metrics storage and querying
- SLO/SLI framework design with error budget policies and burn-rate alerting
- Grafana stack (Loki, Tempo, dashboards) and Datadog/Dynatrace for enterprise-grade observability

**Proficient level required:**

- Elastic Stack (Elasticsearch, Logstash, Kibana, Elastic APM) for log and APM architecture
- Azure Monitor, Log Analytics Workspace, and Application Insights for cloud-native observability
- Fluent Bit, Fluentd, and Vector for log pipeline agent design
- Jaeger and Grafana Tempo for distributed tracing architecture

**Working Knowledge required:**

- Kubernetes-native observability (kube-state-metrics, node exporter, service mesh telemetry)
- Alertmanager, PagerDuty, and OpsGenie for alerting governance and on-call routing
- OpenTelemetry Collector edge deployment for resource-constrained environments

**Awareness level expected:**

- AI/ML-assisted anomaly detection in observability platforms
- Emerging eBPF-based continuous profiling tools (Parca, Pyroscope)

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Azure, AWS, and GCP Cloud Architects | Align observability platform with cloud-native monitoring services (Azure Monitor, CloudWatch, Cloud Operations Suite) | Collaborates |
| Kubernetes Architect | Cluster observability, workload metrics collection, and service mesh telemetry design | Collaborates |
| Site Reliability Engineers and Senior Engineers | SLO framework implementation, error budget policies, and incident detection engineering | Collaborates |
| Security Architect | Security event monitoring, telemetry pipeline access controls, and integration with SIEM platforms | Governed By |
| DevOps Architect | Observability integration within CI/CD pipelines (deployment tracking, release impact analysis, and pipeline performance metrics) | Collaborates |
| Data Platform Architect | Telemetry data pipeline patterns and event streaming for observability data feeds | Collaborates |
| Observability Product Owner | Platform roadmap prioritisation and capability investment decisions | Collaborates |
| Observability Senior Engineers and Engineers | Platform implementation and instrumentation standards | Provides To |

## Key Technologies

- OpenTelemetry (SDK, Collector, semantic conventions)
- Prometheus and Thanos / Grafana Mimir (long-term metrics storage and querying)
- Grafana (dashboards, unified observability, and alerting)
- Grafana Loki (log aggregation) and Grafana Tempo (distributed tracing)
- Elastic Stack (Elasticsearch, Logstash, Kibana, Elastic APM)
- Azure Monitor, Log Analytics Workspace, and Application Insights
- Datadog (APM, infrastructure monitoring, log management)
- Dynatrace (full-stack observability, AI-assisted root cause analysis)
- Jaeger (open-source distributed tracing)
- Fluent Bit / Fluentd / Vector (log pipeline agents)
- Alertmanager, PagerDuty, OpsGenie (alerting and on-call routing)
- Kubernetes metrics stack (kube-state-metrics, node exporter, metrics-server)
- KubeEdge and OpenYurt observability integration (edge node metrics, edge workload health signals)
- OpenTelemetry Collector edge deployment profiles (low-resource footprint, offline-tolerant, MQTT bridge)
- Edge telemetry aggregation pipelines (local buffering, store-and-forward, Fluent Bit edge agent)

## Typical Day-to-Day Activities

- Reviewing and approving observability architecture designs for new platform services and application migrations.
- Defining or refining OpenTelemetry instrumentation standards and reviewing team compliance.
- Working with SRE teams to design and tune SLO/error budget frameworks for critical services.
- Evaluating new observability tooling and conducting proof-of-concept assessments.
- Investigating telemetry cost spikes and designing cardinality reduction or sampling strategies.
- Consulting with application teams on effective instrumentation strategies and golden signal dashboards.
- Producing and maintaining observability architecture standards documentation and architecture decision records.
- Participating in post-incident reviews to assess where observability gaps contributed to detection or diagnosis delays.
- Collaborating with cloud architects on monitoring strategy for new cloud platform capabilities.
- Mentoring senior observability engineers on platform design and advanced instrumentation patterns.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Mean time to detect (MTTD) for P1/P2 incidents: target reduction of ≥20% year-on-year | ≥20% | — |
| SLO achievement rate across critical services: ≥95% of defined SLOs met per quarter | ≥95% | — |
| Observability coverage: ≥90% of production services emitting metrics, logs, and traces conforming to standards | ≥90% | — |
| Alert signal-to-noise ratio: false positive alert rate below 15% of total actionable alerts triggered | 15% | — |
| Telemetry pipeline cost per observed service: tracked and within agreed FinOps budget envelope each quarter | — | — |
| Time-to-instrument new services: median instrumentation to production observability within 5 business days | — | — |
| OpenTelemetry standard adoption: ≥80% of new services instrumented using org standards within 6 months of standard publication | ≥80% | — |
| Edge observability coverage: ≥80% of edge nodes emitting conformant metrics, logs, and traces within 3 months of edge platform deployment | ≥80% | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; observability architecture is design, governance, and consultation focused with no physical infrastructure requirements.
- **Collaboration Tools:** Microsoft Teams, Jira, Confluence, GitHub/ADO, Grafana Cloud, Datadog/Dynatrace portals, architecture diagramming tools (Miro, Lucidchart).
- **On-Site Requirements:** Minimal; occasional on-site for architecture workshops, SRE practice summits, or data centre connectivity planning sessions.
- **Time Zone Flexibility:** Standard business hours with flexibility for cross-regional architecture reviews and incident post-mortems across globally distributed engineering teams.
- **On-Call / Operational Demands:** Not typically on-call; provides architectural escalation during major observability platform outages or significant SLO degradation events affecting multiple services.

## Career Development Path

**Previous Roles:**

- Observability Senior Engineer
- Site Reliability Engineer (SRE) / Senior SRE
- DevOps Architect with monitoring and reliability specialism
- Platform Engineer with observability focus
- Cloud Architect with operations and reliability emphasis

**Potential Next Roles:**

- VP of Engineering (reliability and platform engineering)
- Chief Architect
- Head of Platform Engineering / Head of SRE
- Enterprise Architect (infrastructure domain)
- Engineering Director (Reliability and Observability practice)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Prometheus Certified Associate (PCA) — CNCF
- Elastic Certified Engineer
- Datadog Fundamentals and APM certification (Datadog Learning Center)

**Complementary Certifications:**

- Certified Kubernetes Administrator (CKA) — for Kubernetes-native observability context
- AWS Certified SysOps Administrator — Associate (CloudWatch/X-Ray depth)
- Microsoft Certified: Azure Administrator Associate (AZ-104) — Azure Monitor and Log Analytics
- FinOps Certified Practitioner — for telemetry cost management discipline

**Learning Resources & Communities:**

- OpenTelemetry documentation and CNCF observability working group (opentelemetry.io)
- Google SRE books and SRE workbook (sre.google)
- SREcon conference archives (usenix.org/srecon)
- Grafana Labs engineering blog and ObservabilityCON session recordings
- Honeycomb engineering blog (honeycomb.io) — observability and o11y culture thought leadership
- CNCF TAG Observability technical advisory group publications
