# GRC / Risk & Compliance Analyst

| Field | Value |
|---|---|
| **Domain** | Security |
| **Chapter:** | Security & Identity |
| **Role Level** | Senior Engineer |
| **Reports To** | Security Architect |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-07 |

---

## Role Overview

The GRC / Risk & Compliance Analyst owns the operational governance, risk, and compliance (GRC) program that translates security and regulatory requirements into a tracked, evidenced control environment. This role is distinct from the Security Architect (who designs the technical security architecture) and the DevSecOps Architect/Engineer (who embeds security into the delivery pipeline): the GRC Analyst owns the enterprise risk register, control framework mapping (ISO 27001, NIST CSF, SOC 2, DORA), audit coordination, and compliance evidence collection — the governance layer that proves the technical controls are actually working.

## Role Scope & Boundaries

- **Scope of Influence:** Organization-wide — maintains the enterprise risk register and control framework mapping across all technical domains, with a dotted-line relationship to the CISO for material risk escalation.
- **Experience Anchor:** 4+ years in GRC, IT audit, or information security compliance; expected to operate independently coordinating audits and risk assessments across multiple domains.
- **Out of Scope:** Does not design or implement security controls (owned by the Security Architect and domain Architects/Engineers); does not own privacy compliance specifically (owned by the Data Privacy Officer, though this role's risk register includes privacy risk as a category); does not own the technical remediation of an identified control gap (owned by the relevant domain's Architect/Engineer, tracked to closure by this role).
- **Escalates To:** Security Architect (for control gaps requiring architectural remediation) and the CISO (for risk acceptance decisions on unremediated high/critical risks).
- **Escalated To By:** Domain Architects/Engineers (when a compliance requirement is unclear or conflicts with a technical constraint) and internal/external auditors (via this role, for evidence requests during an audit).

## Business Impact

- **Business Objective:** Maintain a continuously evidenced compliance posture against relevant frameworks (ISO 27001, NIST CSF, SOC 2, DORA) and a current, actively managed enterprise risk register, reducing audit finding rates and enabling faster response to customer security questionnaires and regulatory assessments.
- **Value Metrics:** Audit finding rate and repeat finding rate, risk register currency (percentage of risks reviewed within the last quarter), control evidence collection cycle time, customer security questionnaire response time.
- **Key Stakeholders:** CISO, Security Architect, every domain Architect (as control owners), Data Privacy Officer, internal and external auditors, customers/prospects (via security questionnaires and compliance attestations).
- **Processes Supported:** Enterprise risk register management, control framework mapping and gap assessment, internal and external audit coordination, compliance evidence collection, customer security questionnaire response, third-party/vendor risk assessment support.

## Key Responsibilities

- Maintain the enterprise risk register, working with domain Architects to identify, assess, and track risks through to remediation or formal risk acceptance.
- Own control framework mapping across ISO 27001, NIST CSF, SOC 2, and DORA — maintaining a current view of which technical and process controls satisfy which framework requirements.
- Coordinate internal and external audits — scheduling, gathering evidence from domain teams, managing auditor communication, and tracking findings through to closure.
- Conduct periodic control gap assessments, identifying areas where a framework requirement lacks a mapped, evidenced control and escalating to the Security Architect for remediation planning.
- Respond to customer and prospect security questionnaires, drawing on the control framework mapping and current compliance evidence.
- Support third-party/vendor risk assessments, in partnership with the Vendor / Supplier / IT Asset Manager, assessing supplier security posture against the organization's risk appetite.
- Track audit findings and risk register items to closure, escalating overdue remediation to the Security Architect or CISO.
- Maintain compliance evidence repositories (policies, control test results, audit artifacts) in a state ready for on-demand audit or customer due diligence requests.
- Monitor regulatory and framework changes (e.g., new DORA requirements, ISO 27001 revisions) and assess their impact on the current control environment.
- Produce regular GRC status reporting for the CISO and Security Architect, summarizing risk posture, audit status, and control coverage.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Enterprise risk register maintenance, control framework mapping, and audit coordination | Technical security control design and implementation (owned by the Security Architect and domain Architects/Engineers) |
| Compliance evidence collection and customer security questionnaire responses | Formal risk acceptance decisions on high/critical risks (owned by the CISO) |
| Control gap identification and audit finding tracking to closure | Privacy-specific compliance obligations (owned by the Data Privacy Officer, this role tracks privacy risk as a register category) |
| GRC status reporting content and cadence | Vendor selection decisions based on third-party risk assessment (owned jointly with Procurement and the requesting Architect) |

## Required Skills & Qualifications

**Technical Skills:**

- Strong working knowledge of major security and compliance frameworks: ISO 27001, NIST Cybersecurity Framework (CSF), SOC 2, and DORA (Digital Operational Resilience Act).
- Experience with GRC platforms: ServiceNow GRC, Archer, MetricStream, or continuous-compliance tooling such as Vanta or Drata.
- Ability to read and interpret technical control evidence (configuration exports, access review results, vulnerability scan reports) well enough to assess framework compliance, without needing to be the control implementer.
- Experience coordinating internal and external audits, including evidence gathering and auditor relationship management.
- Risk assessment methodology (likelihood/impact scoring, risk register maintenance) and structured risk reporting.

**Soft Skills & Leadership:**

- Strong organizational and tracking discipline — GRC work depends on complete, current evidence and risk register hygiene.
- Clear, structured communication to translate framework requirements into actionable guidance for domain teams.
- Diplomatic persistence in following up on overdue control remediation without being perceived as purely a compliance blocker.

**Technology Proficiency Levels:**

**Expert level required:**

- ISO 27001, NIST CSF, and SOC 2 control frameworks
- ServiceNow GRC or Archer (GRC platform)

**Proficient level required:**

- DORA operational resilience requirements
- Vanta, Drata, or equivalent continuous compliance monitoring tooling

**Working Knowledge required:**

- Vulnerability and configuration scan output interpretation
- Vendor/third-party risk assessment methodology

**Awareness level expected:**

- The underlying technical architecture of the domains this role assesses for compliance

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Security Architect | Escalation path for control gaps requiring architectural remediation | Escalates To |
| Any domain Architect/Engineer | Consumes technical control evidence to assess framework compliance | Consumes From |
| Data Privacy Officer | Tracks privacy compliance status as a category within the enterprise risk register | Collaborates |
| Vendor / Supplier / IT Asset Manager | Collaborates on third-party/vendor risk assessment | Collaborates |
| Business Continuity / Disaster Recovery Manager | Incorporates BC/DR readiness status into the DORA operational resilience risk category | Consumes From |
| Chief Information Security Officer | Provides GRC status reporting and escalates risk acceptance decisions on high/critical risks | Provides To |

## Key Technologies

- ServiceNow GRC (governance, risk, and compliance platform)
- RSA Archer (enterprise risk and compliance management)
- MetricStream (GRC platform)
- Vanta / Drata (continuous compliance monitoring and evidence automation)
- OneTrust (vendor/third-party risk assessment)
- Power BI (risk and compliance status reporting)

## Typical Day-to-Day Activities

- Reviewing the enterprise risk register and following up with a domain Architect on an overdue risk remediation item.
- Coordinating evidence collection for an upcoming SOC 2 Type II audit, working with multiple technical teams to gather control artifacts.
- Responding to a customer security questionnaire ahead of a contract renewal, drawing on the current control framework mapping.
- Conducting a control gap assessment against a new DORA requirement and identifying which domains need additional control implementation.
- Reviewing a third-party vendor's security assessment responses in partnership with the Vendor/IT Asset Manager.
- Updating the control framework mapping after an internal audit finding revealed a control that no longer satisfies its mapped ISO 27001 requirement.
- Preparing the monthly GRC status report for the CISO, summarizing risk register trends and audit progress.
- Monitoring for a regulatory update (e.g., a DORA technical standard revision) and assessing its impact on current control mappings.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Audit finding rate | Zero repeat findings across consecutive audit cycles | Annual |
| Risk register currency (risks reviewed within the quarter) | ≥95% | Quarterly |
| Control evidence collection cycle time (audit request to evidence delivery) | <10 business days | Per audit |
| Customer security questionnaire response time | <5 business days | Ongoing |
| Control gap remediation closure rate | ≥90% closed within committed due date | Quarterly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — the role is documentation, tooling, and coordination-based.
- **Collaboration Tools:** Microsoft Teams, ServiceNow GRC/Archer, Vanta/Drata, Confluence, Power BI.
- **On-Site Requirements:** None typically; occasional on-site for external audit engagements.
- **Time Zone Flexibility:** Low to moderate — primarily standard business hours, with some flexibility for auditor scheduling across time zones.
- **On-Call / Operational Demands:** Not on a rotating on-call schedule; expected to respond promptly to urgent audit evidence requests or time-sensitive customer due diligence requests.

## Career Development Path

**Previous Roles:**

- IT Auditor or Compliance Analyst
- Security Engineer or Security Senior Engineer with compliance exposure
- Risk Analyst transitioning into a technical GRC specialism

**Potential Next Roles:**

- Security Architect (if pivoting toward broader security architecture)
- Head of GRC / IT Risk Management
- Chief Information Security Officer track

## Recommended Certifications & Learning Paths

**Core Certifications:**

- ISACA Certified Information Systems Auditor (CISA)
- ISACA Certified in Risk and Information Systems Control (CRISC)

**Complementary Certifications:**

- ISO 27001 Lead Auditor
- ISC2 Certified in Governance, Risk and Compliance (CGRC)

**Learning Resources & Communities:**

- ISACA community and certification learning paths; Cloud Security Alliance (CSA) GRC resources.
