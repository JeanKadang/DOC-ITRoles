# Data Platform Architect

| Field | Value |
|---|---|
| **Role ID** | `data-platform-architect` |
| **Domain** | Data Engineering |
| **Chapter:** | Data & AI |
| **Role Level** | Architect |
| **Reports To** | Data & AI Chapter Lead <!-- role: data-and-ai-chapter-lead --> |
| **Direct Reports** | None (sets technical direction and mentors Data Senior Engineers and Data Platform Engineers; formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Data Platform Architect designs and governs the organisation's enterprise data platform strategy, covering data ingestion, storage, transformation, and consumption layers across on-premises, cloud, and hybrid environments. This role defines the architecture for data lakehouse platforms, cloud data warehouses, streaming pipelines, and data mesh or data product patterns that enable analytics, machine learning, and operational data use cases at scale. The Architect ensures the data platform is secure, reliable, governed, and cost-efficient.

## Role Scope & Boundaries

- **Scope of Influence:** Domain-wide — data platform architecture, ingestion/storage/compute standards, and data platform technology selection across the chapter
- **Experience Anchor:** 8+ years in data engineering or platform architecture with demonstrated architecture-level delivery — operates independently on domain-wide data platform architecture decisions, as a peer counterpart to the Data Mesh Architect rather than in a hierarchical relationship
- **Out of Scope:** Data mesh domain decomposition and federated governance model (Data Mesh Architect-owned); AI/ML training and serving infrastructure (AI Platform Architect-owned, this role aligns data pipelines to it); data governance policy (CDO/Data Governance-owned)
- **Escalates To:** Data & AI Chapter Lead — chapter-wide priorities and cross-domain investment decisions
- **Escalated To By:** Data Senior Engineers and Data Platform Engineers on architecture-level design exceptions

## Business Impact

- **Business Objective:** Enable the organisation to unlock value from its data through a scalable, well-governed, and reliable data platform that accelerates analytics, AI/ML, and operational intelligence use cases.
- **Value Metrics:** Data platform availability SLA, time-to-production for new data products, data quality score across critical datasets, data platform cost per TB processed, adoption rate of data platform by analytics and data science teams.
- **Key Stakeholders:** Chief Data Officer (CDO), Analytics and BI teams, Data Science and ML teams, Compliance, Finance, IT Operations.
- **Processes Supported:** Data ingestion and pipeline delivery, analytical workloads (BI, reporting), ML feature engineering, regulatory data retention and lineage, master data management.

## Key Responsibilities

- Design the enterprise data platform architecture: data lakehouse (Delta Lake, Apache Iceberg), cloud data warehouse (Snowflake, BigQuery, Azure Synapse, Redshift), and streaming layers.
- Define data architecture patterns: medallion architecture (Bronze/Silver/Gold), data mesh, data product design principles, and domain data ownership models.
- Architect real-time and batch ingestion pipelines: Kafka, Azure Event Hubs, AWS Kinesis, Debezium CDC, and managed ETL/ELT platforms.
- Define data storage layer standards: Delta Lake, Apache Iceberg, Apache Hudi for ACID lakehouse operations; partitioning and Z-ordering strategies.
- Design data governance architecture: data cataloguing (Unity Catalog, Collibra, DataHub), lineage tracking, data classification, and access control patterns.
- Define compute and orchestration standards: Apache Spark, Databricks, dbt, Apache Airflow, and managed workflow services.
- Establish data security architecture: column-level security, row-level filtering, dynamic data masking, and encryption-at-rest/in-transit.
- Provide architecture governance for data pipelines and platform components through design review.
- Evaluate and select data platform technologies aligned to organisational cloud strategy.
- Define FinOps practices for data platform cost governance: compute cluster sizing, auto-suspend policies, query cost attribution.
- Create reference architectures, patterns libraries, and data platform standards documentation.
- Mentor data engineers and senior data engineers on platform design principles.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Data platform technology selection and reference architecture | Data governance policy (with CDO/Data Governance team) |
| Medallion/data mesh architecture patterns | Business data requirements and domain ownership model |
| Data security architecture and access control design | ML/AI platform architecture (with MLOps/AI Platform Architect) |
| Data platform FinOps standards | Budget and procurement (with Finance) |
| Ingestion and streaming architecture standards | Application integration patterns |

## Required Skills & Qualifications

**Technical Skills:**

- Expert knowledge of cloud data platforms: Databricks (Lakehouse), Snowflake, BigQuery, or Azure Synapse Analytics.
- Deep understanding of data lakehouse architectures: Delta Lake, Apache Iceberg, Apache Hudi; medallion architecture patterns.
- Experience with data orchestration platforms: Apache Airflow, Dagster, Prefect, or Azure Data Factory.
- Proficiency with dbt for transformation layer architecture and testing standards.
- Knowledge of streaming data architectures: Apache Kafka, Azure Event Hubs, AWS Kinesis, Flink.
- Experience with CDC (Change Data Capture) patterns: Debezium, AWS DMS, Azure Data Migration Service.
- Strong understanding of data governance tooling: Databricks Unity Catalog, Collibra, DataHub, OpenMetadata.
- Knowledge of data security patterns: RBAC, column masking, row-level security in Snowflake/Databricks/BigQuery.
- Experience with infrastructure as code for data platforms: Terraform, Pulumi.
- Understanding of ML platform integration: feature stores (Feast, Databricks Feature Store), model registry integration.

**Soft Skills and Leadership:**

- Ability to translate data platform architecture into business value language for CDO and executive audiences.
- Strong facilitation skills for data domain modelling workshops and architecture reviews.
- Vendor management for data platform commercial relationships (Databricks, Snowflake, etc.).
- Mentoring and developing data engineering talent.

**Technology Proficiency Levels:**

**Expert level required:**

- Lakehouse architecture (Delta Lake, Apache Iceberg, Apache Hudi — ACID operations, table format selection, medallion patterns)
- Data modelling (dimensional modelling, data mesh domain design, data product principles)

**Proficient level required:**

- Apache Spark / PySpark (distributed processing, optimisation, cluster tuning)
- dbt (transformation layer architecture, testing standards, lineage tracking)
- Apache Airflow / Dagster (orchestration patterns, DAG design, dependency management)

**Working Knowledge required:**

- Feature stores (Feast, Tecton, Databricks Feature Store — point-in-time correctness, training/serving skew prevention)
- Data mesh patterns (domain ownership, self-serve infrastructure, data product contracts)

**Awareness level expected:**

- LLM cost attribution and chargeback for AI/ML workloads on the data platform
- Streaming-first architectures (event-driven lakehouse, Kafka-to-Iceberg, Flink streaming)

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| CDO / Data Governance team | Align platform architecture with data governance policies and data strategy | Governed By |
| MLOps / AI Platform Architect | Design integration between data platform and ML training/serving infrastructure | Collaborates |
| DataOps Specialist <!-- role: dataops-specialist --> | Provide architecture direction; receive operational feedback from platform operations | Provides To |
| Cloud Architects | Align data platform architecture with cloud platform standards | Collaborates |
| Analytics / BI teams | Ensure data platform serves consumption layer performance requirements | Provides To |
| FinOps | Provide data platform cost attribution models | Provides To |

## Key Technologies

- Databricks (Delta Lake, Unity Catalog, Workflows)
- Snowflake / BigQuery / Azure Synapse Analytics
- Apache Spark / PySpark
- dbt (data build tool)
- Apache Airflow / Dagster / Prefect
- Apache Kafka / Azure Event Hubs / AWS Kinesis
- Debezium (CDC)
- Lakehouse table formats: Delta Lake (best for Databricks/Azure ecosystem, ACID transactions, time travel), Apache Iceberg (best for multi-engine, open standard, fine-grained partition evolution), Apache Hudi (best for high-frequency upserts and CDC patterns) — selection driven by engine ecosystem and update frequency requirements
- Feature stores: Feast (open source), Databricks Feature Store, AWS SageMaker Feature Store, Tecton — for ML feature reuse, point-in-time correctness, and training/serving skew prevention
- Terraform / Pulumi
- Collibra / DataHub / OpenMetadata (governance)

## Typical Day-to-Day Activities

- Reviewing data platform architecture proposals from data engineering teams.
- Designing reference implementations for new data domains or ingestion patterns.
- Evaluating new Databricks or Snowflake features for platform adoption.
- Collaborating with CDO on data governance requirements affecting platform design.
- Presenting data platform roadmap and architecture to IT and data leadership.
- Reviewing data platform cost reports and recommending FinOps improvements.
- Producing and updating data platform architecture documentation.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Data platform SLA availability | ≥95% (proposed) | Monthly |
| Time-to-production for new data products | — | — |
| Data platform cost per TB processed | — | — |
| Data quality score across Gold tier datasets | — | — |
| Data governance completeness (catalogued and classified datasets %) | — | — |
| Engineering team adoption of platform standards | — | — |
| Data platform cost per TB of data processed (trending month-over-month vs. volume growth) | — | — |
| ML feature pipeline production lead time (time from feature request to production availability) | — | Monthly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, GitHub, Confluence, Jira, Databricks/Snowflake consoles.
- **On-Site Requirements:** Rare; occasional for stakeholder workshops or data strategy sessions.
- **Time Zone Flexibility:** Standard business hours.
- **On-Call / Operational Demands:** On escalation path for critical data platform outages affecting business reporting or ML pipeline production.

## Career Development Path

**Previous Roles:**

- Data Senior Engineer <!-- role: data-senior-engineer -->
- MLOps Engineer <!-- role: mlops-engineer -->
- Cloud Architect (data platform focus)
- Data Science Platform Engineer

**Potential Next Roles:**

- Chief Data Architect
- Enterprise Architect (data domain)
- Head of Data Engineering

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Databricks Certified Data Engineer Professional
- Snowflake SnowPro Advanced: Architect
- Microsoft Certified: Azure Data Engineer Associate (DP-203) - if Azure-focused

**Complementary Certifications:**

- Google Professional Data Engineer
- AWS Certified Data Engineer - Associate
- dbt Analytics Engineering Certification

**Learning Resources and Communities:**

- Databricks Academy
- dbt Community and dbt Learn
- Data Council and Data Engineering Podcast
- CNCF Data on Kubernetes working group
