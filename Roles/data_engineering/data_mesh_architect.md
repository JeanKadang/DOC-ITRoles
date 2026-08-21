# Data Mesh Architect

| Field | Value |
|---|---|
| **Role ID** | `data-mesh-architect` |
| **Domain** | Data Engineering |
| **Chapter:** | Data & AI |
| **Role Level** | Architect |
| **Reports To** | Data & AI Chapter Lead <!-- role: data-and-ai-chapter-lead --> |
| **Direct Reports** | None (sets technical direction on data mesh standards; formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Data Mesh Architect designs and governs the organisation's data mesh architecture — a sociotechnical approach to data management that moves away from centralised monolithic data platforms towards a domain-oriented, self-serve model where business domains own and publish their data as products. This role owns the data mesh governance framework, federated data product standards, data contract specifications, and the central infrastructure components (data product portal, federated catalogue, and interoperability layer) that allow domain teams to operate autonomously while maintaining enterprise-wide discoverability and interoperability. The Data Mesh Architect operates at the intersection of enterprise architecture, data engineering, and data governance.

## Role Scope & Boundaries

- **Scope of Influence:** Domain-wide — data mesh domain decomposition model, federated governance, and data product standards across the chapter
- **Experience Anchor:** 8+ years in data architecture with demonstrated experience designing federated/domain-oriented data platforms — operates independently on domain-wide data mesh strategy decisions, as a peer counterpart to the Data Platform Architect rather than in a hierarchical relationship
- **Out of Scope:** Underlying data platform infrastructure (Data Platform Architect-owned, this role aligns mesh requirements to it); enterprise capability domain boundaries (Enterprise Architect-owned, this role aligns mesh boundaries to it); enterprise-wide data governance policy (Data Management / Data Governance team-owned)
- **Escalates To:** Data & AI Chapter Lead — chapter-wide priorities and cross-domain investment decisions
- **Escalated To By:** Business domain teams (Data Product Owners) on data product onboarding and governance guidance

## Business Impact

- **Business Objective:** Accelerate data product delivery across the organisation by shifting ownership to the domain teams best placed to understand and manage their data, while maintaining enterprise-wide data quality, discoverability, and interoperability through federated governance.
- **Value Metrics:** Number of active data products in production, data product SLA compliance rate across domains, time-to-production for new domain data products, data catalogue coverage (% of domain datasets published and catalogued), cross-domain data product consumption rate, reduction in centralised data platform delivery bottlenecks.
- **Key Stakeholders:** Chief Data Officer, Enterprise Architect, business domain leadership (data product owners), Analytics and BI teams, Data Science teams, Compliance and Data Governance.
- **Processes Supported:** Domain data product development and publishing, cross-domain data product consumption, federated data governance and policy compliance, AI/ML feature data sourcing, regulatory data lineage and audit.

## Key Responsibilities

- Design the organisation's data mesh architecture: domain decomposition model, data product topology, self-serve data infrastructure layer, and federated computational governance model.
- Define data product standards: data product specifications, interface contracts (output ports), data contract schemas, SLA definitions, and quality standards that all domain data products must adhere to.
- Architect data contract frameworks using Data Contract CLI, Soda, or equivalent — specifying schema, quality rules, SLAs, and change management processes between data producers and consumers.
- Design the federated data catalogue architecture using Collibra, DataHub, Alation, or OpenMetadata — enabling cross-domain discoverability while maintaining domain ownership of metadata.
- Establish open table format and storage interoperability standards for data products: Apache Iceberg for cross-engine interoperability, enabling data products to be consumed by multiple compute engines.
- Define event streaming architecture for real-time data product publishing using Apache Kafka or Confluent Platform.
- Govern the data observability framework across domains: Monte Carlo, Bigeye, or Great Expectations for automated quality monitoring and SLA breach alerting.
- Design the data product portal — the self-service interface through which domain teams publish and manage data products, and consumers discover and subscribe to them.
- Define transformation and data product build standards using dbt — modelling conventions, testing requirements, and documentation standards.
- Facilitate data mesh adoption across business domains: domain data architecture reviews, self-serve platform onboarding, and governance training.
- Align data mesh architecture with enterprise and cloud architecture standards in collaboration with the Enterprise Architect and Cloud Architect.
- Define AI data product standards in coordination with the AI Governance Architect — ensuring ML training datasets, feature datasets, and inference outputs meet traceability and quality requirements.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Data mesh governance framework and federated governance model | Domain internal data architecture (owned by domain teams and their data product owners) |
| Data product standards, specifications, and interface contract requirements | Data platform infrastructure and shared compute layer (owned by Data Platform Architect) |
| Federated data catalogue standards and metadata governance | AI/ML data product requirements (coordinated with AI Governance Architect) |
| Data contract framework selection and specification standards | Business domain decomposition (with Enterprise Architect) |
| Data observability standards and cross-domain SLA governance | Data governance policy (with CDO and Data Governance team) |

## Required Skills & Qualifications

**Technical Skills:**

- Deep understanding of data mesh principles: domain-oriented ownership, data-as-a-product, self-serve data infrastructure, and federated computational governance (Zhamak Dehghani's framework).
- Experience with data contract tooling: Data Contract CLI, Soda, or similar specification and validation frameworks.
- Proficiency with data catalogue platforms: DataHub, Collibra, Alation, or OpenMetadata — including metadata governance, lineage, and API integration.
- Knowledge of open table formats: Apache Iceberg (schema evolution, partition management, multi-engine compatibility), with awareness of Delta Lake and Apache Hudi trade-offs.
- Experience with dbt for data product transformation layer design, testing standards, and documentation conventions.
- Understanding of event streaming architecture: Apache Kafka, Confluent Schema Registry, and event schema governance.
- Experience with data observability tooling: Monte Carlo, Bigeye, Great Expectations, or equivalent for automated data quality monitoring.
- Knowledge of cloud data platform architectures (Databricks, Snowflake, BigQuery, Azure Synapse) to align data product delivery with platform capabilities.
- Understanding of data mesh self-serve infrastructure patterns: compute abstraction, storage standardisation, and data product template toolkits.

**Soft Skills and Leadership:**

- Ability to influence domain teams and business leaders to adopt data product ownership practices — requires change management and facilitation skills.
- Executive communication to CDO and C-suite on data mesh strategy, maturity, and business value.
- Strong workshop facilitation skills for domain data product discovery sessions and data contract negotiation.
- Ability to balance federated domain autonomy with enterprise governance requirements.

**Technology Proficiency Levels:**

**Expert level required:**

- Data mesh governance framework design (domain decomposition model, data product specifications, and federated computational governance model)
- data catalogue platforms (DataHub, Collibra, or OpenMetadata — federated metadata governance and cross-domain discoverability)
- Apache Iceberg (open table format governance and cross-engine interoperability standards)

**Proficient level required:**

- Data Contract CLI or Soda (data contract specification, validation, and schema change management)
- dbt (data product transformation layer standards, testing requirements, and documentation conventions)
- data observability tooling (Monte Carlo, Bigeye, or Great Expectations — automated quality monitoring and SLA breach alerting)

**Working Knowledge required:**

- Apache Kafka and Confluent Schema Registry (event streaming architecture for real-time data product publishing)
- Terraform (self-serve data infrastructure provisioning patterns)
- cloud data platform architectures (Databricks, Snowflake, or BigQuery — data product delivery alignment)

**Awareness level expected:**

- AI data product standards for ML training datasets and feature stores
- emerging data mesh tooling (OpenMetadata, Apache Hudi)
- DataOps CI/CD patterns for domain data product pipelines

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Data Platform Architect <!-- role: data-platform-architect --> | Aligns data mesh self-serve infrastructure requirements with the underlying data platform architecture; agrees shared storage, compute, and governance tooling | Collaborates |
| Enterprise Architect <!-- role: enterprise-architect --> | Aligns domain decomposition model with enterprise capability domains; ensures data mesh boundaries are consistent with application and business architecture | Governed By |
| AI Governance Architect <!-- role: ai-governance-architect --> | Defines AI data product standards for ML training datasets, feature stores, and model output datasets published as data products | Collaborates |
| Data Management / Data Governance team | Integrates federated governance model with enterprise-wide data governance policy, data classification, and regulatory requirements | Governed By |
| Integration Architect <!-- role: integration-architect --> | Aligns data product output port patterns with enterprise integration and API standards for downstream consumption | Collaborates |
| Business domain teams (Data Product Owners) | Partners with domain teams to design, review, and onboard data products to the mesh; provides governance guidance and self-serve tooling support | Provides To |

## Key Technologies

- Data Contract CLI / Soda (data contract specification and validation)
- DataHub / Collibra / Alation / OpenMetadata (federated data catalogue)
- Apache Iceberg (open table format for cross-engine interoperability)
- dbt (data product transformation and testing layer)
- Apache Kafka / Confluent Platform (event streaming for real-time data products)
- Monte Carlo / Bigeye / Great Expectations (data observability)
- Databricks / Snowflake / BigQuery (domain data product execution platforms)
- Data product portal tooling (custom-built or platform-native)
- GitHub / GitLab (data product version control and CI/CD)
- Terraform (self-serve data infrastructure provisioning)

## Typical Day-to-Day Activities

- Reviewing domain team data product proposals against mesh governance standards and data contract specifications.
- Facilitating domain data product discovery workshops to help teams identify, scope, and design new data products.
- Updating federated data catalogue governance standards in response to new domain onboarding requirements.
- Reviewing data observability alerts and coordinating with domain teams on SLA breach investigations.
- Collaborating with the Data Platform Architect on self-serve infrastructure capabilities needed by domain teams.
- Producing and maintaining data mesh reference architectures, data product templates, and onboarding guides.
- Engaging with the AI Governance Architect to validate AI-facing data products meet ML data lineage requirements.
- Reviewing and governing changes to the data contract schema registry and version compatibility policies.
- Presenting data mesh adoption progress and data product metrics to CDO and data leadership.
- Evaluating emerging data mesh tooling and open-source ecosystem developments (Iceberg, DataHub, etc.).

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Number of active domain data products published to the mesh (trending growth month-over-month) | — | — |
| Data product SLA compliance rate (% of data products meeting their published quality and freshness SLOs) | ≥95% (proposed) | Monthly |
| Time-to-production for new domain data products (days from initiation to first consumer, trending down) | — | — |
| Data catalogue coverage (% of domain data products with complete metadata, lineage, and ownership records) | — | — |
| Cross-domain data product consumption rate (number of active cross-domain data product subscriptions) | — | — |
| Data contract compliance rate (% of data product interfaces backed by validated and enforced data contracts) | — | — |
| Data observability incident rate per domain data product (trending down) | — | — |
| Domain team self-serve capability score (onboarding time and central platform dependency reduction) | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, Confluence, GitHub, DataHub/Collibra consoles, Miro (workshop facilitation).
- **On-Site Requirements:** Occasional for domain data product discovery workshops or stakeholder data strategy sessions.
- **Time Zone Flexibility:** Standard business hours; cross-domain coordination may require overlap with distributed domain teams.
- **On-Call / Operational Demands:** Not typically on-call; escalation point for critical federated governance incidents or data contract violations affecting regulated or business-critical data.

## Career Development Path

**Previous Roles:**

- Data Platform Architect (central platform experience)
- Senior Data Engineer (pipeline and data product delivery background)
- Enterprise Architect (domain and capability modelling background)
- Data Governance Lead or CDO office professional

**Potential Next Roles:**

- Chief Data Architect
- Enterprise Architect (data domain lead)
- Head of Data Engineering
- Chief Data Officer (CDO) <!-- external-role -->

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Databricks Certified Data Engineer Professional
- dbt Analytics Engineering Certification
- Microsoft Certified: Azure Data Engineer Associate (DP-203) or Google Professional Data Engineer

**Complementary Certifications:**

- TOGAF (Enterprise Architecture — for domain decomposition and architecture governance)
- Snowflake SnowPro Advanced: Architect
- CDMP (Certified Data Management Professional) — for data governance grounding

**Learning Resources and Communities:**

- Data Mesh Learning community (datameshlearning.com) and Zhamak Dehghani's "Data Mesh" book
- DataHub community and documentation (datahubproject.io)
- dbt Community and dbt Learn platform (getdbt.com)
- Apache Iceberg community (iceberg.apache.org)
- Data Contract CLI community and specification (datacontract.com)
