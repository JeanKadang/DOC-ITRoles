# Data Engineer

| Field | Value |
|---|---|
| **Domain** | Data Engineering |
| **Chapter:** | Data & AI |
| **Role Level** | Engineer |
| **Reports To** | Data Senior Engineer |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Data Engineer designs, builds, and maintains the data pipelines, transformations, and data models that deliver reliable, high-quality data to analytics, reporting, and machine learning consumers. This role works with cloud data platforms (Databricks, Snowflake, BigQuery, Azure Synapse), orchestration tools, and transformation frameworks to ingest data from diverse sources, apply medallion architecture patterns, and produce curated data products that the organisation can trust.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of data pipeline implementation and data model tasks to defined standards
- **Experience Anchor:** 1-3 years in data engineering — works under guidance, building toward independent delivery
- **Out of Scope:** Data pipeline architecture and design (Senior Engineers and the Architect-owned); CI/CD tooling standards (DataOps Specialists-owned); data governance policy definition (Data Governance-owned, this role applies its requirements)
- **Escalates To:** Data Senior Engineer — design-level questions and implementation issues
- **Escalated To By:** Data Scientists on feature engineering pipeline and curated dataset requests

## Business Impact

- **Business Objective:** Deliver reliable, timely, and high-quality data to analytics, BI, and ML consumers, enabling data-driven decisions across the organisation.
- **Value Metrics:** Pipeline reliability and data freshness SLAs, data quality test pass rate, time-to-delivery for new data pipelines, analyst/data science consumer satisfaction.
- **Key Stakeholders:** Analytics/BI teams, Data Scientists, Product Owners, Data Governance, DataOps Specialists.
- **Processes Supported:** Data ingestion, ELT/ETL transformation, data quality validation, data product delivery, ML feature pipeline development.

## Key Responsibilities

- Design and implement ingestion pipelines to extract data from relational databases, APIs, SaaS platforms, and streaming sources.
- Build and maintain transformation pipelines using dbt and Apache Spark/PySpark following medallion architecture (Bronze/Silver/Gold) patterns.
- Implement data quality tests and validation rules using dbt tests, Great Expectations, or Soda.
- Design data models (dimensional, normalised, or data vault) appropriate to analytical and operational use cases.
- Maintain and optimise data lake and data warehouse tables (partitioning, Z-ordering, clustering, vacuuming).
- Implement pipeline orchestration using Apache Airflow, Dagster, or equivalent.
- Collaborate with DataOps engineers to ensure pipelines follow CI/CD practices and are deployed reliably.
- Work with data governance team to apply data classification, lineage tracking, and documentation in the data catalogue.
- Optimise query and pipeline performance and cost on cloud data platforms.
- Write clear data documentation, data contracts, and field-level lineage descriptions.
- Participate in data platform design reviews and contribute to standards development.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Pipeline design and implementation | Data platform architecture standards (with Architect) |
| Data model design for assigned domains | Business data requirements (with Analytics/PO) |
| Data quality test coverage for owned pipelines | DataOps CI/CD process requirements |
| Data documentation in the catalogue | Data governance classification decisions |

## Required Skills & Qualifications

**Technical Skills:**

- Proficiency in Python and SQL for data pipeline development.
- Hands-on experience with dbt for transformation pipeline development and testing.
- Experience with cloud data platforms: Databricks, Snowflake, BigQuery, or Azure Synapse.
- Knowledge of Apache Spark / PySpark for large-scale data processing.
- Experience building ingestion pipelines from common sources: REST APIs, relational databases (JDBC/ODBC), cloud storage.
- Understanding of data orchestration fundamentals: Airflow DAGs, Dagster assets, or Prefect flows.
- Knowledge of data quality testing approaches: dbt tests, Great Expectations, row count validation, schema checks.
- Understanding of data storage formats: Delta Lake, Parquet, Iceberg.
- Familiarity with data modelling concepts: dimensional modelling (star schema), transactional normalisation, data vault basics.

**Soft Skills and Leadership:**

- Collaborative approach to working with analytics and data science consumers.
- Strong written communication for data documentation and data contract design.
- Attention to data quality and correctness as a first principle.

**Technology Proficiency Levels:**

**Expert level required:**

- Python and SQL (data pipeline development and complex transformation logic)
- dbt (transformation model development, testing strategies, and documentation)
- cloud data platforms (Databricks, Snowflake, BigQuery, or Azure Synapse — production pipeline development and optimisation)

**Proficient level required:**

- Apache Spark/PySpark (large-scale data processing and batch pipeline development)
- Apache Airflow or Dagster (pipeline orchestration, DAG design, and dependency management)
- data quality frameworks (dbt tests, Great Expectations, or Soda)

**Working Knowledge required:**

- Delta Lake or Apache Iceberg (lakehouse table formats, partitioning strategies, and compaction operations)
- REST API and JDBC-based ingestion pipeline development
- data catalogue tooling (Databricks Unity Catalog or DataHub — lineage and documentation)

**Awareness level expected:**

- Kafka-based streaming ingestion patterns
- Data Vault 2.0 modelling concepts
- AI-assisted data engineering tools (GitHub Copilot for pipeline scaffolding)

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Data Platform Architect | Receive architectural direction; contribute feedback on implementation feasibility | Consumes From |
| DataOps Specialists | Follow CI/CD standards; request tooling and pipeline infrastructure support | Governed By |
| Analytics Engineers | Collaborate on semantic layer and BI-facing data models | Collaborates |
| Data Scientists | Provide feature engineering pipelines and curated datasets | Provides To |
| Data Governance | Apply cataloguing, lineage, and classification requirements | Governed By |

## Key Technologies

- Python / SQL
- dbt (data build tool)
- Apache Spark / PySpark
- Databricks / Snowflake / BigQuery / Azure Synapse
- Apache Airflow / Dagster / Prefect
- Delta Lake / Apache Iceberg / Parquet
- Great Expectations / Soda (data quality)
- Git / GitHub / Azure DevOps
- REST APIs / JDBC / Kafka (ingestion)

## Typical Day-to-Day Activities

- Building new ingestion pipelines for prioritised data sources.
- Writing dbt models and tests for new transformation requirements.
- Investigating and resolving data quality failures in existing pipelines.
- Optimising slow or expensive queries in Databricks/Snowflake.
- Reviewing and updating data documentation and lineage in the catalogue.
- Participating in sprint ceremonies and data domain design sessions.
- Collaborating with analytics teams to understand data consumption requirements.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Pipeline availability for owned data products | — | — |
| Data quality test pass rate for owned models | — | — |
| Data freshness SLA compliance | ≥95% (proposed) | Monthly |
| Analyst satisfaction with data quality and timeliness | ≥85% (proposed) | Quarterly |
| Data documentation completeness in the catalogue | — | — |
| Query performance and cost efficiency of owned data models | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, GitHub/GitLab, Jira, Confluence, Databricks/Snowflake.
- **On-Site Requirements:** None typically.
- **Time Zone Flexibility:** Standard business hours.
- **On-Call / Operational Demands:** May participate in on-call for critical production pipeline failures affecting business reporting SLAs.

## Career Development Path

**Previous Roles:**

- Software Engineer with data focus
- Analytics Engineer
- Data Analyst with Python/SQL skills transitioning to engineering

**Potential Next Roles:**

- Data Senior Engineer
- DataOps Specialist
- MLOps Engineer
- Analytics Engineer

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Databricks Certified Data Engineer Associate
- dbt Analytics Engineering Certification
- SnowPro Core Certification (if Snowflake environment)

**Complementary Certifications:**

- Microsoft Certified: Azure Data Engineer Associate (DP-203)
- AWS Certified Data Engineer - Associate
- Google Professional Data Engineer

**Learning Resources and Communities:**

- dbt Learn and dbt Community Slack
- DataTalks.Club community
- Data Engineering Podcast
- Databricks Academy
