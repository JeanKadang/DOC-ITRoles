# Data Governance Lead

| Field | Value |
|---|---|
| **Domain** | Data Management |
| **Chapter:** | Data & AI |
| **Role Level** | Senior Engineer |
| **Reports To** | Data & AI Chapter Lead |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-07 |

---

## Role Overview

The Data Governance Lead owns the organization's data governance program — establishing data ownership, data quality standards, a business glossary, and data classification policy across the enterprise data estate. This role is distinct from the Storage Architect (who owns the physical/platform storage strategy) and the Data Platform Architect (who owns the data engineering platform): the Data Governance Lead owns the policy, stewardship network, and data cataloguing layer that ensures data across every domain is discoverable, well-defined, appropriately classified, and has a named accountable owner.

## Role Scope & Boundaries

- **Scope of Influence:** Organization-wide governance — defines data governance policy and the data stewardship model, but does not directly manage the data engineers or data stewards embedded in individual domains.
- **Experience Anchor:** 5+ years in data governance, data management, or data quality within an enterprise data environment; expected to operate independently building and running a governance program with minimal oversight.
- **Out of Scope:** Does not own the physical data platform or storage architecture (owned by Storage Architect / Data Platform Architect); does not own data privacy/regulatory compliance obligations directly (owned by the Data Privacy Officer, though this role's classification work feeds directly into it); does not own AI model governance (owned by AI Governance roles, though this role's data classification informs AI training data suitability).
- **Escalates To:** Data & AI Chapter Lead (for governance policy disputes or domains that will not adopt data ownership/stewardship requirements).
- **Escalated To By:** Domain data stewards and data engineers (when data quality or classification issues cross domain boundaries and require governance-level arbitration).

## Business Impact

- **Business Objective:** Ensure data across the organization is discoverable, well-defined, appropriately classified, and has a named accountable owner — reducing duplicate/conflicting data definitions, improving trust in reported metrics, and providing the classification foundation that privacy and security controls depend on.
- **Value Metrics:** Percentage of critical data domains with a named data owner, business glossary term coverage and adoption rate, data quality score trend for governed datasets, data classification coverage across the estate.
- **Key Stakeholders:** Data Platform Architect, Storage Architect, Data Privacy Officer, AI Governance Architect, business data owners across every domain, executive leadership (for data-driven decision confidence).
- **Processes Supported:** Data cataloguing and business glossary management, data ownership and stewardship model, data quality monitoring and remediation, data classification policy, data lineage documentation.

## Key Responsibilities

- Own and maintain the enterprise data catalogue and business glossary, ensuring critical data domains have consistent, agreed definitions across the organization.
- Establish and maintain the data ownership and stewardship model — identifying accountable data owners and embedded data stewards for each critical data domain.
- Define and maintain the data classification policy (e.g., public, internal, confidential, restricted) and drive its consistent application across data platforms, in partnership with the Security Architect and Data Privacy Officer.
- Own data quality standards and monitoring — defining quality dimensions (completeness, accuracy, timeliness, consistency) and working with domain data stewards to remediate quality issues.
- Maintain data lineage documentation for critical data flows, making it possible to trace a reported metric back to its source systems.
- Facilitate a Data Governance Council or equivalent forum bringing together data owners and stewards to resolve cross-domain data definition conflicts.
- Partner with the Data Privacy Officer to ensure data classification directly informs privacy impact assessments and data handling requirements.
- Partner with the AI Governance Architect to ensure data used for AI/ML training is appropriately classified and quality-assessed before use.
- Track and report data governance maturity metrics to the Data & AI Chapter Lead and executive stakeholders.
- Drive adoption of the data catalogue and business glossary across the organization through training and embedded steward enablement.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Data governance policy, business glossary standards, and the data ownership/stewardship model | Physical data platform architecture and storage strategy (owned by Data Platform Architect/Storage Architect) |
| Data classification policy definition and classification coverage tracking | Regulatory data privacy compliance obligations (owned by the Data Privacy Officer, informed by this role's classification work) |
| Data quality standards and cross-domain quality issue arbitration | AI/ML model governance and training data approval (owned by AI Governance Architect, informed by this role's data quality assessments) |
| Data catalogue and lineage documentation standards | Domain-specific data engineering implementation (owned by each domain's data engineers) |

## Required Skills & Qualifications

**Technical Skills:**

- Strong working knowledge of data governance frameworks (DAMA-DMBOK) and practical experience implementing a data stewardship model in an enterprise environment.
- Hands-on experience with a data catalogue/governance platform: Microsoft Purview, Collibra, Alation, or Informatica Axon/EDC.
- Data quality management concepts and tooling (data profiling, quality rule definition, remediation workflow).
- Understanding of data classification schemes and how they map to security and privacy controls.
- Familiarity with data lineage documentation approaches and tooling, sufficient to trace critical metrics to source systems.
- Basic SQL proficiency to independently investigate data quality or lineage questions.

**Soft Skills & Leadership:**

- Strong facilitation skills to build consensus across business and technical stakeholders on shared data definitions.
- Influence-without-authority — this role sets policy that domain teams must adopt without direct management authority over them.
- Clear communication translating data governance concepts into business-relevant value for non-technical stakeholders.

**Technology Proficiency Levels:**

**Expert level required:**

- Microsoft Purview or Collibra (data catalogue and governance platform)
- DAMA-DMBOK data governance framework

**Proficient level required:**

- Alation or Informatica Axon/EDC
- Data quality profiling and rule-based monitoring tooling

**Working Knowledge required:**

- SQL for independent data investigation
- Data classification and privacy impact assessment concepts

**Awareness level expected:**

- AI/ML training data requirements and data platform architecture

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Data Platform Architect | Collaborates on aligning governance policy with the underlying data platform capabilities | Collaborates |
| Storage Architect | Consumes storage platform capabilities to apply data classification and lifecycle policy | Consumes From |
| Data Privacy Officer | Provides data classification and inventory that directly informs privacy impact assessments | Provides To |
| AI Governance Architect | Provides data quality and classification assessments for AI/ML training data suitability | Provides To |
| Security Architect | Collaborates on aligning data classification with the broader security control framework | Collaborates |
| Data & AI Chapter Lead | Escalation path for governance policy disputes across domains | Escalates To |

## Key Technologies

- Microsoft Purview (data catalogue, classification, and governance)
- Collibra (enterprise data governance and glossary platform)
- Alation (data catalogue and discovery)
- Informatica Axon / Enterprise Data Catalog (EDC)
- Ataccama (data quality management)
- Power BI (data governance maturity and quality reporting)
- SQL (ad hoc data investigation)

## Typical Day-to-Day Activities

- Facilitating a Data Governance Council meeting to resolve a conflicting definition of a key business metric between two domains.
- Reviewing data quality scores for a critical dataset and following up with the domain data steward on a remediation plan.
- Onboarding a new critical data domain into the enterprise data catalogue, working with the business owner to define terms and classification.
- Reviewing a data classification gap identified during a Data Privacy Officer's privacy impact assessment and coordinating remediation with the owning domain.
- Partnering with the AI Governance Architect to assess whether a candidate dataset meets quality and classification requirements for a new AI/ML use case.
- Presenting data governance maturity metrics to the Data & AI Chapter Lead and identifying the next priority domain for stewardship rollout.
- Updating data lineage documentation after a source system migration to keep metric traceability accurate.
- Running a training session for newly appointed data stewards on the data catalogue and quality remediation workflow.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Critical data domains with a named data owner | 100% | Quarterly |
| Business glossary term coverage for critical domains | ≥90% | Quarterly |
| Data quality score trend for governed datasets | Improving quarter-on-quarter | Quarterly |
| Data classification coverage across the estate | ≥95% of critical datasets classified | Quarterly |
| Data Governance Council resolution time for cross-domain disputes | <15 business days | Ongoing |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — the role is governance, tooling, and facilitation-based.
- **Collaboration Tools:** Microsoft Teams, Microsoft Purview/Collibra, Confluence, Power BI.
- **On-Site Requirements:** None typically; occasional on-site for governance council workshops or steward training sessions.
- **Time Zone Flexibility:** Moderate — governance council and steward engagement may span multiple business units and time zones.
- **On-Call / Operational Demands:** Not on a rotating on-call schedule; expected to respond promptly to urgent data classification or quality escalations affecting compliance or reporting.

## Career Development Path

**Previous Roles:**

- Data Engineer or Data Senior Engineer with data quality/governance exposure
- Business Analyst or Data Steward within a specific domain
- Storage Engineer or Database Engineer transitioning into a governance specialism

**Potential Next Roles:**

- Data Platform Architect (if pivoting toward broader data platform strategy)
- Data Privacy Officer (if pivoting toward regulatory compliance)
- Data & AI Chapter Lead

## Recommended Certifications & Learning Paths

**Core Certifications:**

- DAMA Certified Data Management Professional (CDMP)
- Collibra Ranger or Collibra Certified Data Citizen

**Complementary Certifications:**

- Microsoft Certified: Information Protection and Compliance Administrator Associate
- Informatica Data Governance certification

**Learning Resources & Communities:**

- DAMA International (Data Management Association) community, DMBOK guide, and certification learning paths.
