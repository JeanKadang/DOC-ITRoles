# DataOps Specialist

| Field | Value |
|---|---|
| **Domain** | Data Engineering |
| **Chapter:** | Data & AI |
| **Role Level** | Senior Engineer |
| **Reports To** | Data & AI Chapter Lead |
| **Direct Reports** | None (formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The DataOps Specialist applies DevOps and agile engineering principles to data pipeline development, testing, and operations — bringing software engineering rigour to the data engineering lifecycle. This senior-level role owns data pipeline CI/CD, automated data quality testing frameworks, data pipeline observability and alerting, and incident management for data infrastructure failures. The DataOps Specialist bridges the gap between data engineering (build) and data operations (run), ensuring that pipelines are reliable, testable, observable, and continuously delivered. This role works closely with Data Platform Architects, data engineers across domains, DevOps, and ML platform teams to maintain a high standard of operational maturity for the organisation's data infrastructure.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — data pipeline CI/CD standards, quality testing integration, and pipeline observability across data engineering teams
- **Experience Anchor:** 5+ years in DataOps, data engineering, or platform reliability with demonstrated independent delivery — operates independently within the Data Platform Architect's standards
- **Out of Scope:** Data platform architecture and technology standards (Data Platform Architect-owned); data mesh governance framework design (Data Mesh Architect-owned, this role aligns pipeline standards to it); organisational DevOps toolchain standards (DevOps Architect-owned, this role aligns to them)
- **Escalates To:** Data Platform Architect — pipeline architecture standards and design direction
- **Escalated To By:** Data Engineers across domains on pipeline code reviews, quality testing guidance, and incident triage

## Business Impact

- **Business Objective:** Ensure the organisation's data pipelines are reliable, high-quality, and continuously delivered — enabling business stakeholders, analytics teams, and data scientists to trust and depend on data products for decision-making and AI/ML workloads.
- **Value Metrics:** Data pipeline SLA compliance rate, data quality score across critical pipelines, pipeline MTTR, deployment frequency for data pipeline changes, data incident volume trend, time-to-detect (TTD) and time-to-resolve (TTR) for data quality incidents.
- **Key Stakeholders:** Data Platform Architect, Chief Data Officer, Analytics and BI teams, Data Science teams, Data Product Owners, Operations and SRE teams.
- **Processes Supported:** Data pipeline delivery and release management, data quality assurance, data infrastructure incident management, data observability and alerting, ML feature pipeline operations.

## Key Responsibilities

- Own and operate data pipeline CI/CD: implement automated build, test, and deployment pipelines for dbt projects, Spark jobs, and Airflow/Prefect/Dagster DAGs using GitHub Actions or GitLab CI.
- Design and implement automated data quality testing frameworks using dbt tests, Great Expectations, and Soda — covering schema validation, freshness checks, referential integrity, and statistical distribution testing.
- Configure and maintain data observability platforms (Monte Carlo, Bigeye) for automated anomaly detection, lineage tracking, and SLA breach alerting across data pipelines.
- Operate and administer data orchestration platforms: Apache Airflow, Prefect, or Dagster — DAG health monitoring, dependency management, scheduler configuration, and platform upgrades.
- Define and enforce data pipeline SLOs and SLAs in coordination with the Data Platform Architect and business data consumers.
- Lead data pipeline incident management: triage, root cause analysis, resolution, and post-incident review for pipeline failures affecting business reporting or ML workloads.
- Apply infrastructure-as-code (Terraform) for data infrastructure provisioning: Databricks clusters, Spark job configurations, and orchestration platform resources.
- Establish data pipeline testing standards and code review processes across data engineering teams.
- Define and monitor pipeline reliability metrics; report data pipeline operational health to data leadership.
- Drive continuous improvement of data pipeline operational maturity using DataOps metrics and retrospectives.
- Coordinate with ML platform teams on orchestration patterns for ML feature engineering and training pipeline reliability.
- Implement data lineage capture tooling to provide end-to-end traceability from source systems to data products.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Data pipeline CI/CD design and implementation | Data pipeline architecture and design patterns (owned by Data Platform Architect) |
| Automated data quality testing framework and coverage standards | Data mesh data product pipeline standards (coordinated with Data Mesh Architect) |
| Data pipeline SLO definitions and SLA monitoring | Business data quality requirements and acceptable thresholds (with CDO and data product owners) |
| Data observability configuration and alerting rules | DevOps CI/CD toolchain platform selection (with DevOps Architect) |
| Data pipeline incident management and post-incident review | ML pipeline architecture (owned by AI Platform Architect) |

## Required Skills & Qualifications

**Technical Skills:**

- Expert-level proficiency with dbt: project structure, testing (schema tests, singular tests, custom generic tests), documentation, and deployment strategies.
- Strong experience with data orchestration platforms: Apache Airflow (DAG authoring, operators, sensors, connection management), Prefect, or Dagster.
- Hands-on experience with data quality frameworks: Great Expectations (expectations, checkpoints, data docs) and Soda (checks YAML, monitoring) or equivalent.
- Experience with data observability and monitoring platforms: Monte Carlo, Bigeye, or equivalent for automated anomaly detection and pipeline lineage.
- Proficiency with CI/CD tooling applied to data pipelines: GitHub Actions or GitLab CI — pipeline templating, environment promotion, and automated testing gates.
- Experience with Apache Spark and Databricks for large-scale batch and streaming pipeline development and optimisation.
- Knowledge of infrastructure-as-code (Terraform) for data infrastructure provisioning.
- Understanding of data lineage concepts and tooling: OpenLineage, Marquez, or platform-native lineage (Databricks Unity Catalog, dbt lineage graph).
- Strong Python skills for pipeline scripting, automation, and testing framework customisation.
- SQL performance optimisation for transformation pipeline tuning and incident investigation.

**Soft Skills and Leadership:**

- Strong incident management skills: calm under pressure, structured root cause analysis, and clear stakeholder communication during data outages.
- Ability to define and champion data pipeline quality standards across multiple data engineering teams.
- Proactive operational mindset — identifying reliability risks before they become incidents.
- Mentoring data engineers on DataOps practices, testing standards, and operational discipline.

**Technology Proficiency Levels:**

**Expert level required:**

- dbt (project structure, schema and singular tests, custom generic tests, documentation, and deployment strategies)
- data pipeline CI/CD (GitHub Actions or GitLab CI — templating, environment promotion, and automated testing gates)
- Apache Airflow or Dagster (DAG authoring, operators, sensors, connection management, and platform administration)

**Proficient level required:**

- Data quality frameworks (Great Expectations — expectations, checkpoints, and data docs; Soda — checks YAML and SLA monitoring)
- data observability platforms (Monte Carlo or Bigeye — automated anomaly detection and SLA breach alerting)
- Apache Spark and Databricks (large-scale batch and streaming pipeline development and optimisation)

**Working Knowledge required:**

- Terraform (data infrastructure provisioning for Databricks clusters, Spark jobs, and orchestration platforms)
- OpenLineage or Marquez (data lineage capture and end-to-end traceability)
- Delta Lake or Apache Iceberg (lakehouse table format operations for pipeline incident management)

**Awareness level expected:**

- AI-assisted data quality anomaly detection tooling
- real-time streaming pipeline reliability patterns (Kafka/Flink)
- ML feature engineering pipeline orchestration and reliability alignment

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Data Platform Architect | Receives pipeline architecture standards and design direction; provides operational feedback on platform reliability and performance | Escalates To |
| Data Mesh Architect | Aligns data product pipeline CI/CD standards with the data mesh governance framework; ensures domain data product pipelines meet quality and SLA requirements | Governed By |
| DevOps Architect | Aligns data pipeline CI/CD toolchain with organisational DevOps standards, shared runners, and deployment governance | Governed By |
| Observability Architect | Integrates data pipeline monitoring, alerting, and incident data with the enterprise observability platform (Datadog, Grafana, etc.) | Governed By |
| AI Platform Architect | Coordinates on ML feature engineering pipeline orchestration reliability and MLOps CI/CD alignment | Collaborates |
| Data Engineers across domains | Primary partners for pipeline code reviews, quality testing guidance, incident triage, and DataOps standards adoption | Provides To |

## Key Technologies

- dbt (transformation, testing, documentation, deployment)
- Apache Airflow / Prefect / Dagster (orchestration)
- Great Expectations / Soda (data quality testing)
- Monte Carlo / Bigeye (data observability and anomaly detection)
- Apache Spark / Databricks (large-scale data processing)
- GitHub Actions / GitLab CI (data pipeline CI/CD)
- Terraform (data infrastructure as code)
- OpenLineage / Marquez (data lineage capture)
- Python (pipeline scripting and test automation)
- Delta Lake / Apache Iceberg (lakehouse table format operations)

## Typical Day-to-Day Activities

- Reviewing and merging data pipeline pull requests, ensuring CI/CD gates pass and test coverage meets standards.
- Triaging data pipeline failures and quality alerts from the observability platform.
- Investigating root causes of SLA breach incidents and coordinating with data engineers for resolution.
- Updating dbt test suites and Great Expectations checkpoints for new datasets entering production.
- Monitoring Airflow/Dagster DAG health dashboards and resolving dependency or scheduling issues.
- Reviewing and tuning data observability alert configurations and anomaly detection thresholds.
- Producing post-incident reviews for major pipeline failures and tracking remediation actions to closure.
- Working with the Data Mesh Architect to onboard new domain data product pipelines to the CI/CD framework.
- Reporting pipeline reliability and data quality metrics to the Data Platform Architect and CDO office.
- Contributing to DataOps standards documentation and operational runbooks for data engineering teams.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Data pipeline SLA compliance rate (% of pipelines meeting their published SLO targets) | ≥95% (proposed) | Monthly |
| Data quality score across critical Gold tier datasets (% of dbt and Great Expectations checks passing) | — | — |
| Pipeline MTTR (mean time to restore failed data pipelines, in hours) | ≤4 hours (proposed) | Monthly |
| Deployment frequency for data pipeline changes (releases per week/month, trending up) | — | Monthly |
| Data incident volume trending (number of data quality incidents per month, trending down) | — | — |
| Time-to-detect (TTD) for data quality anomalies (minutes/hours from issue occurrence to alert firing) | — | — |
| Automated test coverage rate (% of transformation logic covered by automated data quality tests) | ≥80% (proposed) | Monthly |
| Post-incident review completion rate (% of severity-1 incidents with completed PIR within SLA) | ≥95% (proposed) | Monthly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, GitHub/GitLab, Jira, Confluence, Airflow/Dagster UI, Monte Carlo/Bigeye consoles.
- **On-Site Requirements:** None in most organisations.
- **Time Zone Flexibility:** Standard business hours; on-call coverage may require time zone overlap for business-critical pipelines serving finance or operations.
- **On-Call / Operational Demands:** On-call rotation for data pipeline incidents affecting business reporting, financial close processes, or ML production pipelines. Incident response SLA typically within 30 minutes for severity-1 pipeline failures.

## Career Development Path

**Previous Roles:**

- Senior Data Engineer (pipeline development background)
- DevOps or Platform Engineer transitioning to data infrastructure
- Analytics Engineer (dbt-focused background)
- Data Engineer with a strong interest in reliability, testing, and operations

**Potential Next Roles:**

- Data Platform Architect
- Head of DataOps or Data Engineering Lead
- Site Reliability Engineer (data SRE specialisation)
- Data Mesh Architect (governance and standards focus)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Databricks Certified Data Engineer Professional
- dbt Analytics Engineering Certification
- Microsoft Certified: Azure Data Engineer Associate (DP-203)

**Complementary Certifications:**

- HashiCorp Certified: Terraform Associate
- AWS Certified Data Engineer – Associate or Google Professional Data Engineer
- Astronomer Certification for Apache Airflow

**Learning Resources and Communities:**

- dbt Community and dbt Learn (getdbt.com)
- Astronomer Academy (Apache Airflow training and certification)
- Great Expectations community documentation (greatexpectations.io)
- DataOps Manifesto and DataKitchen DataOps resources
- Monte Carlo Data Reliability Engineering blog and community
