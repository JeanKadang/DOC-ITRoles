# Data Platform Engineer

| Field | Value |
|---|---|
| **Domain** | Data Engineering |
| **Chapter:** | Data & AI |
| **Role Level** | Engineer |
| **Reports To** | Data Platform Architect |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Data Platform Engineer builds, maintains, and optimises the shared data platform infrastructure that all data engineering teams and data consumers rely upon. Operating as an entry to mid-level practitioner, this role implements data platform designs created by the Data Platform Architect — constructing and managing data lakes, lakehouses, ingestion pipelines, transformation frameworks, and data storage layers. Distinct from a domain-focused Data Engineer — who builds pipelines serving a specific business domain — the Data Platform Engineer focuses on the shared infrastructure layer that all data engineers and data consumers depend on. This role ensures the platform is reliable, performant, cost-efficient, and continuously improving.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of shared data platform infrastructure, onboarding support, and platform-layer incident response
- **Experience Anchor:** 3-5 years in data platform or infrastructure engineering — operates independently within the Data Platform Architect's reference architecture
- **Out of Scope:** Data platform architecture and technology standards (Architect-owned); domain-specific pipeline implementation (Data Engineers across domains-owned, this role provides shared infrastructure to them); DevOps toolchain standards (DevOps Architect-owned, this role aligns to them)
- **Escalates To:** Data Platform Architect — complex design decisions and implementation feasibility questions
- **Escalated To By:** Data Engineers across domains on platform onboarding and platform-layer issues

## Business Impact

- **Business Objective:** Deliver and maintain a reliable, performant, and cost-efficient shared data platform that enables data engineering, analytics, and ML teams across the organisation to work effectively on data products without being blocked by infrastructure limitations.
- **Value Metrics:** Data platform availability SLA, data ingestion pipeline success rate, time-to-provision for new data engineering environments, data platform cost per TB processed, platform-caused incident rate (data platform failures impacting downstream consumers).
- **Key Stakeholders:** Data Platform Architect, DataOps Specialist, Data Engineers across all business domains, Analytics and BI teams, Cloud Architects, ML/Data Science teams.
- **Processes Supported:** Data lake and lakehouse storage layer management, batch and streaming data ingestion, transformation framework operations, data platform CI/CD, data engineering environment provisioning.

## Key Responsibilities

- Build and maintain data lake and lakehouse storage layers: Delta Lake and Apache Iceberg table management, partitioning strategies, compaction operations, and time travel configuration.
- Implement and operate batch and streaming data ingestion pipelines using Azure Data Factory, AWS Glue, GCP Dataflow, or Apache Kafka for CDC and event-driven ingestion.
- Develop and maintain Apache Spark and Databricks jobs for large-scale data transformation and processing workloads.
- Manage Databricks workspace administration: cluster policies, access control, notebook environments, and Databricks Workflows configuration.
- Apply infrastructure-as-code (Terraform) to provision and manage data platform resources: storage accounts, Databricks workspaces, Kafka clusters, and managed pipeline services.
- Implement dbt transformation framework components: model development, test coverage, documentation, and deployment pipeline integration.
- Support the DataOps Specialist with data pipeline reliability: monitoring, alerting, and incident response for platform-layer failures.
- Maintain data platform storage performance: table optimisation, Z-ordering, caching, and file compaction for lakehouse tables.
- Manage cloud data platform cost controls: cluster auto-suspend policies, spot/preemptible instance configuration, and storage tier management.
- Coordinate with Cloud Architects on underlying compute, networking, storage, and security configuration for the data platform.
- Write and maintain technical documentation for platform components, deployment guides, and runbooks.
- Participate in data platform architecture reviews and provide implementation feasibility feedback to the Data Platform Architect.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Data platform infrastructure build and operational management | Data platform architecture and technology selection (owned by Data Platform Architect) |
| Lakehouse table management, compaction, and performance optimisation | Data governance and access control policy (with Data Governance team) |
| Data ingestion pipeline implementation and reliability | Data pipeline CI/CD toolchain standards (coordinated with DataOps Specialist) |
| Terraform infrastructure-as-code for data platform resources | Domain-specific data pipeline design (owned by domain Data Engineers) |
| Databricks workspace administration and cluster management | Data platform cost allocation and FinOps strategy (with Data Platform Architect) |

## Required Skills & Qualifications

**Technical Skills:**

- Hands-on experience with Databricks and Apache Spark: cluster management, job configuration, PySpark development, and performance tuning.
- Experience with lakehouse table formats: Delta Lake (ACID transactions, time travel, OPTIMIZE and ZORDER operations) and/or Apache Iceberg.
- Proficiency with at least one managed data ingestion platform: Azure Data Factory, AWS Glue, or GCP Dataflow.
- Experience with streaming data ingestion: Apache Kafka, Azure Event Hubs, or AWS Kinesis for real-time platform ingestion patterns.
- Working knowledge of dbt for transformation framework development, model testing, and documentation.
- Proficiency with Terraform for infrastructure-as-code provisioning of cloud data resources.
- Strong SQL skills for transformation development, query optimisation, and data quality investigation.
- Python proficiency for Spark job development, pipeline scripting, and automation.
- Understanding of data security patterns: RBAC configuration in Databricks Unity Catalog or equivalent, and storage account access controls.
- Knowledge of cloud platform fundamentals (Azure, AWS, or GCP) relevant to data storage, compute, and networking.

**Soft Skills and Leadership:**

- Collaborative working style with multiple data engineering teams who depend on the shared platform.
- Strong troubleshooting and problem-solving skills for diagnosing data pipeline and infrastructure performance issues.
- Clear technical documentation skills for runbooks, onboarding guides, and architecture implementation notes.

**Technology Proficiency Levels:**

- **Expert level required:** Databricks (Delta Lake, Unity Catalog, Workflows, cluster management, and workspace administration), Apache Spark/PySpark (job development, performance tuning, and large-scale transformation workloads), Terraform (infrastructure-as-code provisioning for data platform resources — storage, compute, and Kafka clusters)
- **Proficient level required:** Delta Lake or Apache Iceberg (ACID transactions, time travel, OPTIMIZE, ZORDER, and VACUUM operations), dbt (transformation framework development, model testing, and deployment pipeline integration), managed ingestion platforms (Azure Data Factory, AWS Glue, or GCP Dataflow)
- **Working Knowledge required:** Streaming data ingestion (Apache Kafka, Azure Event Hubs, or AWS Kinesis — platform-layer ingestion patterns), Python for Spark job scripting and pipeline automation, cloud platform fundamentals (Azure/AWS/GCP — data storage, compute, and networking)
- **Awareness level expected:** Data mesh self-serve infrastructure patterns for domain data product enablement, AI/ML platform integration points for training data access patterns, data platform cost optimisation strategies (spot instances, auto-suspend, and storage tiering)

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Data Platform Architect | Receives architecture designs, technology standards, and implementation direction; escalates complex design decisions and provides implementation feasibility feedback | Escalates To |
| DataOps Specialist | Collaborates on pipeline reliability, data quality test integration, CI/CD pipeline implementation, and incident response for platform-layer failures | Collaborates |
| Data Engineers across domains | Primary platform customers; supports onboarding, resolves platform issues, and provides shared infrastructure services enabling domain data product delivery | Provides To |
| Cloud Architects | Coordinates on underlying compute, networking, storage, and security configuration that underpins the data platform | Collaborates |
| DevOps Architect | Aligns data platform CI/CD pipelines with organisational DevOps toolchain, container registries, and deployment gates | Governed By |
| AI Platform Engineer | Coordinates on data platform integration points for ML feature pipeline ingestion and training data access patterns | Collaborates |

## Key Technologies

- Databricks (Delta Lake, Unity Catalog, Workflows, cluster management)
- Apache Spark / PySpark
- Delta Lake / Apache Iceberg
- dbt (data build tool)
- Apache Kafka / Azure Event Hubs / AWS Kinesis
- Azure Data Factory / AWS Glue / GCP Dataflow
- Terraform (infrastructure as code)
- Python (pipeline scripting and Spark development)
- SQL (transformation development and query optimisation)
- GitHub Actions / GitLab CI (data platform CI/CD)

## Typical Day-to-Day Activities

- Deploying and testing new Databricks Spark jobs or dbt transformation models developed by domain data engineers.
- Monitoring data ingestion pipeline health and investigating failures in Azure Data Factory, Glue, or Kafka connectors.
- Performing lakehouse table maintenance: running OPTIMIZE, ZORDER, and VACUUM operations on Delta Lake or Iceberg tables.
- Reviewing and applying Terraform infrastructure-as-code changes for new or modified data platform resources.
- Coordinating with domain Data Engineers on ingestion pipeline requirements and shared infrastructure provisioning.
- Responding to data platform incidents and escalating to the DataOps Specialist for complex root cause investigations.
- Reviewing Databricks cluster utilisation reports and adjusting cluster policies to improve cost efficiency.
- Updating dbt models and tests in response to upstream schema changes or new data requirements.
- Writing runbooks and technical documentation for new platform components and deployment procedures.
- Participating in data platform architecture review discussions and providing implementation feedback to the Data Platform Architect.

## Key Performance Indicators

- Data platform availability SLA (uptime % for Databricks, ingestion pipelines, and shared platform components)
- Data ingestion pipeline success rate (% of scheduled ingestion jobs completing without failure)
- Time-to-provision for new data engineering environments (days from request to ready, trending down)
- Data platform cost per TB processed (trending month-over-month vs. data volume growth)
- Platform-caused incident rate (number of incidents caused by shared platform failures, trending down)
- Lakehouse table health score (% of tables meeting compaction, freshness, and partitioning standards)
- Infrastructure-as-code coverage (% of data platform resources managed via Terraform)
- Mean time to restore (MTTR) for data platform infrastructure incidents

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, GitHub/GitLab, Jira, Confluence, Databricks workspace, Azure Portal / AWS Console.
- **On-Site Requirements:** None in most organisations; occasional for on-premises data source connectivity or data centre access.
- **Time Zone Flexibility:** Standard business hours; may require overlap with data engineering teams in multiple regions for shared platform support.
- **On-Call / Operational Demands:** On-call rotation for data platform infrastructure incidents affecting downstream analytics, business reporting, or ML pipelines. Incident response SLA typically within 30–60 minutes for severity-1 platform failures.

## Career Development Path

**Previous Roles:**

- Junior Data Engineer or Analytics Engineer transitioning to platform engineering
- Cloud Engineer with data platform interest
- Software Engineer or Backend Engineer pivoting to data infrastructure
- BI/Analytics Engineer expanding into data platform operations

**Potential Next Roles:**

- DataOps Specialist
- Data Platform Architect
- Senior Data Engineer (domain-focused pipeline specialisation)
- AI Platform Engineer (ML platform specialisation)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Databricks Certified Data Engineer Associate
- Microsoft Certified: Azure Data Engineer Associate (DP-203) or AWS Certified Data Engineer – Associate
- dbt Analytics Engineering Certification

**Complementary Certifications:**

- HashiCorp Certified: Terraform Associate
- Databricks Certified Data Engineer Professional (progression certification)
- Google Professional Data Engineer

**Learning Resources and Communities:**

- Databricks Academy (Databricks fundamentals and advanced engineering courses)
- dbt Community and dbt Learn (getdbt.com)
- Data Engineering Podcast and Data Engineering Weekly newsletter
- Apache Iceberg community documentation (iceberg.apache.org)
- Fundamentals of Data Engineering (Joe Reis & Matt Housley) — foundational reading for platform engineering practitioners
