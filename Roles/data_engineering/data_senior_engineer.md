# Data Senior Engineer

| Field | Value |
|---|---|
| **Domain** | Data Engineering |
| **Chapter:** | Data & AI |
| **Role Level** | Senior Engineer |
| **Reports To** | Data & AI Chapter Lead |
| **Direct Reports** | Data Engineers (day-to-day technical guidance and mentoring; formal line management sits with the Chapter Lead) |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Data Senior Engineer leads complex data engineering initiatives, drives data platform standards adoption, and acts as a technical authority and escalation point within the data engineering team. This role owns design decisions for significant data domains or platform components, leads the development of reusable data frameworks and patterns, drives data quality maturity, and mentors data engineers. The Senior Data Engineer operates within a high degree of autonomy and contributes to the broader data platform architecture through hands-on technical leadership.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — advanced data pipeline design and delivery within the Data Platform Architect's reference architecture
- **Experience Anchor:** 5+ years in data engineering with demonstrated independent delivery — operates independently within the Architect's reference architecture
- **Out of Scope:** Data platform architecture and technology standards (Architect-owned); pipeline reliability tooling and CI/CD standards (DataOps Specialist-owned, this role collaborates with it); semantic layer ownership (Analytics Engineers-owned, this role aligns to it)
- **Escalates To:** Data Platform Architect — architecture-level questions and standards exceptions
- **Escalated To By:** Data Engineers on complex pipeline design and implementation issues

## Business Impact

- **Business Objective:** Accelerate data product delivery and improve data quality maturity across the organisation, enabling faster and more trustworthy analytical and ML use cases.
- **Value Metrics:** Data product delivery velocity, data quality coverage (percentage of tables with quality tests), data platform cost efficiency, pipeline reliability, and time-to-value for new analytical capabilities.
- **Key Stakeholders:** Data Platform Architect, Analytics and BI leads, Data Science teams, DataOps Specialists, Data Governance.
- **Processes Supported:** Data platform development, data domain design, data quality governance, ML feature pipeline delivery, data catalogue and lineage management.

## Key Responsibilities

- Lead the design and implementation of complex, large-scale data pipelines and data domains.
- Design data models for complex analytical and operational use cases: dimensional, Data Vault 2.0, or domain-driven design patterns.
- Build and maintain reusable data engineering frameworks, dbt macros, and pipeline templates.
- Define and enforce data quality standards: data contracts, schema evolution policies, and multi-layer quality validation.
- Lead data platform technical reviews and contribute to architecture decision records.
- Optimise data platform performance and cost at scale: partition strategies, clustering, materialisation policies, compute tuning.
- Design streaming data pipelines for near-real-time data products using Kafka, Flink, or Spark Structured Streaming.
- Lead migration initiatives: on-premises ETL to cloud-native ELT, legacy warehouse to data lakehouse.
- Mentor data engineers and review data models, pipeline code, and data documentation.
- Collaborate with DataOps engineers to improve CI/CD maturity and pipeline reliability.
- Contribute to data governance by designing lineage tracking, business glossary, and data product ownership models.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Detailed data model and pipeline design for owned domains | Data platform architecture (with Data Platform Architect) |
| Data quality framework standards and test coverage for team | Business domain data requirements (with Product/Analytics) |
| Reusable framework and shared asset development | DataOps CI/CD process design (with DataOps Specialists) |
| Code review standards and technical quality gates for data team | Data governance policy (with CDO/Governance team) |
| Performance and cost optimisation of owned data platform components | Tooling and platform procurement decisions |

## Required Skills & Qualifications

**Technical Skills:**

- Expert proficiency in Python and SQL for advanced data engineering.
- Deep expertise with dbt: advanced macro development, packages, testing strategies, and performance tuning.
- Advanced knowledge of Apache Spark / PySpark: performance tuning, Adaptive Query Execution, broadcast joins, partitioning.
- Expert knowledge of cloud data platforms: Databricks, Snowflake, or BigQuery at production scale.
- Experience with streaming platforms: Apache Kafka, AWS Kinesis, Azure Event Hubs; Spark Structured Streaming or Flink.
- Knowledge of Data Vault 2.0 or advanced dimensional modelling patterns.
- Experience with data lakehouse formats: Delta Lake, Apache Iceberg - including time travel, schema evolution, compaction.
- Experience designing and implementing data contracts and schema evolution strategies.
- Proficiency with data quality frameworks at scale: Great Expectations, Soda, dbt tests, Monte Carlo.
- Experience with data governance tooling: Databricks Unity Catalog, Collibra, DataHub.

**Soft Skills and Leadership:**

- Technical mentoring and code review skills.
- Ability to lead design discussions and architecture decision-making with the data team.
- Clear written communication for data documentation, ADRs, and design proposals.
- Collaborative engagement with analytics and data science consumers.

**Technology Proficiency Levels:**

- **Expert level required:** dbt (advanced macro development, packages, exposure definitions, testing strategies, and performance tuning), Python and SQL (advanced data engineering, pipeline framework development, and complex transformation logic), Databricks or Snowflake (production-scale platform operations, advanced performance tuning, and cost optimisation)
- **Proficient level required:** Apache Spark/PySpark (adaptive query execution, broadcast joins, and partitioning optimisation), Apache Kafka or Flink (streaming data pipeline design for near-real-time data products), data quality and observability frameworks (Great Expectations, Soda, or Monte Carlo)
- **Working Knowledge required:** Delta Lake and Apache Iceberg (advanced features — schema evolution, time travel, and compaction strategies), data governance tooling (Databricks Unity Catalog, DataHub, or Collibra), Data Vault 2.0 and advanced dimensional modelling patterns
- **Awareness level expected:** AI-assisted data engineering and feature engineering tools, real-time data mesh data product patterns, emerging lakehouse optimisation technologies (Apache Hudi)

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Data Platform Architect | Receive strategic direction; contribute implementation experience to architecture decisions | Escalates To |
| DataOps Specialists | Collaborate on pipeline reliability, testing, and observability | Collaborates |
| Data Engineers | Provide mentoring, code review, and design guidance | Provides To |
| Analytics Engineers | Align on semantic layer requirements and data model design | Collaborates |
| Data Scientists | Provide feature engineering pipelines and curated, well-documented datasets | Provides To |

## Key Technologies

- Python / SQL (advanced)
- dbt (advanced: macros, packages, exposures)
- Apache Spark / PySpark (performance tuning)
- Databricks / Snowflake / BigQuery
- Apache Kafka / Flink / Spark Structured Streaming
- Delta Lake / Apache Iceberg (advanced features)
- Great Expectations / Soda / Monte Carlo
- Databricks Unity Catalog / DataHub / Collibra
- Terraform / Pulumi (data platform IaC)
- Apache Airflow / Dagster

## Typical Day-to-Day Activities

- Leading technical design sessions for new data products or domain models.
- Reviewing pull requests for data pipeline and model code quality.
- Investigating and resolving complex pipeline performance or data quality issues.
- Building proof-of-concept implementations for new platform capabilities.
- Mentoring data engineers through code pairing and design reviews.
- Collaborating with analytics teams on requirements for new data products.
- Contributing to data platform standards documentation and decision records.

## Key Performance Indicators

- Data product delivery throughput (team-level velocity)
- Data quality test coverage across owned data domains (target: >90%)
- Pipeline performance and cost efficiency of owned components
- Code review coverage and quality gate adherence within team
- Mentoring: junior engineer progression metrics
- Reusable framework and component adoption by data engineering team

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, GitHub/GitLab, Jira, Confluence, Databricks, Slack.
- **On-Site Requirements:** None typically.
- **Time Zone Flexibility:** Standard business hours; occasional overlap with international data engineering counterparts.
- **On-Call / Operational Demands:** On-call escalation for critical data product failures affecting business-critical reporting.

## Career Development Path

**Previous Roles:**

- Data Engineer (3+ years, significant scope)
- Analytics Engineer with strong Python/Spark engineering skills
- Software Engineer transitioning into data platform engineering

**Potential Next Roles:**

- Data Platform Architect
- Staff Data Engineer
- DataOps Architect
- MLOps / AI Platform Engineer

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Databricks Certified Data Engineer Professional
- dbt Analytics Engineering Certification
- Snowflake SnowPro Advanced: Data Engineer

**Complementary Certifications:**

- Apache Kafka Confluent Certified Developer
- Microsoft Certified: Azure Data Engineer Associate (DP-203)
- AWS Certified Data Engineer - Associate

**Learning Resources and Communities:**

- dbt Learn and dbt Community Slack
- Databricks Academy (professional and specialist courses)
- Data Engineering Podcast
- Data Council community
