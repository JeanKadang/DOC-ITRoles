# Business Continuity / Disaster Recovery Manager

| Field | Value |
|---|---|
| **Domain** | Data Protection |
| **Chapter:** | Security & Identity |
| **Role Level** | Senior Engineer |
| **Reports To** | Security & Identity Chapter Lead |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-07 |

---

## Role Overview

The Business Continuity / Disaster Recovery Manager owns the organization's business continuity and disaster recovery (BC/DR) governance program — ensuring every critical business service has a defined Recovery Time Objective (RTO) and Recovery Point Objective (RPO), a documented and tested recovery plan, and a clear owner. This role is distinct from the backup and DR engineering roles in this domain (Commvault, SimpliVity): those roles build and operate the technical recovery mechanisms; the BC/DR Manager owns the governance layer — running Business Impact Analyses (BIAs), coordinating DR test exercises across every technical domain, and reporting organizational recovery readiness to executive leadership.

## Role Scope & Boundaries

- **Scope of Influence:** Organization-wide governance — has authority to mandate BIA completion and DR test participation across all technical domains, but does not directly manage the engineers who execute the recovery.
- **Experience Anchor:** 6+ years in business continuity, disaster recovery planning, or IT risk management; expected to operate independently running enterprise-wide BC/DR programs with minimal oversight.
- **Out of Scope:** Does not build or operate backup/replication technology (owned by Commvault Architect/Engineer and SimpliVity Backup Architect/Engineer); does not own the technical DR runbook execution during an actual disaster (owned by the relevant service's engineering team, coordinated by this role); does not own the underlying service architecture (owned by the relevant domain Architect).
- **Escalates To:** Security & Identity Chapter Lead (for BIA-identified risks that require executive risk acceptance or investment) and the CISO (for recovery readiness gaps with security or regulatory implications).
- **Escalated To By:** Service owners and domain Architects (when a Business Impact Analysis surfaces a recovery capability gap they cannot close without additional investment or cross-team coordination).

## Business Impact

- **Business Objective:** Ensure the organization can recover critical business services within agreed timeframes after a disruptive event, by maintaining current Business Impact Analyses, validated recovery plans, and a regular DR testing cadence across every critical service.
- **Value Metrics:** Percentage of critical services with a current (within 12 months) Business Impact Analysis, DR test pass rate, RTO/RPO achievement rate during tests, time to update recovery plans after an organizational change.
- **Key Stakeholders:** CISO, Security & Identity Chapter Lead, every domain Architect (as recovery plan owners), Commvault/SimpliVity Backup Architects and Engineers, executive leadership and the Board (for regulatory BC/DR reporting), internal/external auditors.
- **Processes Supported:** Business Impact Analysis (BIA), Business Continuity Planning (BCP), Disaster Recovery Planning (DRP), DR test exercise coordination, BC/DR audit and regulatory reporting (ISO 22301, DORA operational resilience requirements).

## Key Responsibilities

- Run and maintain Business Impact Analyses (BIAs) for every critical business service, establishing RTO, RPO, and business impact tolerance in partnership with service owners.
- Maintain the organization's Business Continuity Plan (BCP) and Disaster Recovery Plan (DRP) documentation, ensuring plans reflect the current architecture and organizational structure.
- Coordinate enterprise-wide DR test exercises — scheduling tests, defining success criteria, and working with technical teams (backup engineers, domain Architects, SREs) to execute and validate recovery against RTO/RPO targets.
- Track DR test results and drive remediation of any gaps identified, escalating unresolved capability gaps to the Security & Identity Chapter Lead.
- Own the BC/DR governance framework and align it to relevant standards (ISO 22301, DORA operational resilience requirements, and industry-specific regulatory obligations).
- Maintain the crisis management and business continuity invocation procedure — the process for declaring a business continuity event and mobilizing the response, distinct from the Major Incident Manager's technical incident process.
- Partner with Commvault and SimpliVity Backup Architects/Engineers to validate that backup and replication configurations actually meet the RPOs defined in the BIA.
- Produce BC/DR readiness reporting for executive leadership, the Board, and regulatory/audit stakeholders.
- Maintain a current inventory of critical third-party dependencies and their own BC/DR posture as part of the organization's operational resilience obligations.
- Facilitate lessons-learned reviews after any real business continuity invocation, feeding improvements back into the BCP/DRP.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Business Impact Analysis methodology, RTO/RPO target-setting process, and BCP/DRP documentation | Backup and replication technology architecture (owned by Commvault/SimpliVity Architects) |
| DR test exercise scheduling, success criteria, and readiness reporting | The technical DR runbook execution during a real event (owned by the relevant service's engineering team) |
| BC/DR governance framework and regulatory compliance mapping (ISO 22301, DORA) | Underlying service architecture and resilience design (owned by the relevant domain Architect) |
| Business continuity invocation procedure | Major incident technical response process (owned by the Major Incident Manager) |

## Required Skills & Qualifications

**Technical Skills:**

- Strong working knowledge of Business Impact Analysis (BIA) methodology and RTO/RPO target-setting.
- Experience running enterprise-scale DR test exercises across multiple technical domains and coordinating cross-team participation.
- Familiarity with backup and replication concepts (not implementation) well enough to validate that a technical DR configuration can plausibly meet a defined RPO.
- Working knowledge of BC/DR-relevant regulatory and standards frameworks: ISO 22301 (Business Continuity Management), DORA (Digital Operational Resilience Act) operational resilience testing requirements.
- Crisis management and business continuity invocation process design.
- Data analysis and reporting skills for BC/DR readiness dashboards and audit evidence packages.

**Soft Skills & Leadership:**

- Strong cross-functional facilitation to drive BIA completion and DR test participation across teams that do not report to this role.
- Calm, structured crisis facilitation for real business continuity invocations.
- Clear executive and regulatory reporting communication.

**Technology Proficiency Levels:**

**Expert level required:**

- Business Impact Analysis (BIA) methodology and BC/DR governance frameworks (ISO 22301)

**Proficient level required:**

- BC/DR planning and crisis management tooling (Fusion Risk Management, Veoci, Everbridge, or equivalent)
- DORA operational resilience testing requirements

**Working Knowledge required:**

- Backup and replication concepts (Commvault, SimpliVity) sufficient to validate RPO achievability
- ServiceNow BCM or equivalent GRC-adjacent tooling

**Awareness level expected:**

- The underlying architecture of the critical services this role coordinates recovery planning for

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Commvault Architect / Engineer | Validates that backup configurations meet the RPOs defined in the Business Impact Analysis | Consumes From |
| SimpliVity Backup Architect / Engineer | Validates that replication/recovery configurations meet defined RTOs for hyperconverged workloads | Consumes From |
| Major Incident Manager | Coordinates the handoff between a technical major incident and a formal business continuity invocation | Collaborates |
| Security Architect | Collaborates on aligning BC/DR governance with the broader security and resilience posture | Collaborates |
| Any domain Architect | Provides the RTO/RPO targets and BIA findings that inform that domain's resilience design | Provides To |
| Security & Identity Chapter Lead | Escalation path for BIA-identified risks requiring executive risk acceptance or investment | Escalates To |

## Key Technologies

- Fusion Risk Management, Veoci, or Everbridge (BC/DR planning and crisis management platforms)
- ServiceNow Business Continuity Management (BCM)
- Commvault and SimpliVity (backup/replication platforms this role validates against, without operating them directly)
- Confluence (BCP/DRP documentation and DR test runbooks)
- Power BI (BC/DR readiness and compliance reporting)

## Typical Day-to-Day Activities

- Facilitating a Business Impact Analysis workshop with a service owner to establish RTO/RPO targets for a newly identified critical service.
- Coordinating a quarterly DR test exercise across three technical domains, defining success criteria and tracking results.
- Reviewing DR test results and following up with a Commvault Engineer on a backup configuration gap identified during the test.
- Updating the Business Continuity Plan following an organizational restructuring that changed service ownership.
- Preparing a BC/DR readiness report for an upcoming ISO 22301 or DORA regulatory audit.
- Reviewing the third-party critical dependency inventory and following up on a supplier's outdated BC/DR attestation.
- Running a lessons-learned session after a real business continuity invocation to update the crisis management procedure.
- Meeting with the Major Incident Manager to clarify the handoff criteria between a technical incident and a formal BC event.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Critical services with a current Business Impact Analysis (within 12 months) | 100% | Quarterly |
| DR test pass rate (RTO/RPO achieved) | ≥90% | Quarterly |
| DR test coverage of critical services | 100% tested at least annually | Annual |
| Time to update recovery plans after an organizational change | <30 days | Ongoing |
| Regulatory/audit finding rate for BC/DR program | Zero repeat findings across consecutive audit cycles | Annual |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — the role is governance, planning, and coordination-based.
- **Collaboration Tools:** Microsoft Teams, Fusion Risk Management/Veoci/Everbridge, ServiceNow BCM, Confluence, Power BI.
- **On-Site Requirements:** None typically; occasional on-site for enterprise-wide DR test exercises or crisis simulation workshops.
- **Time Zone Flexibility:** Moderate — DR tests and BIA workshops may span teams in multiple time zones.
- **On-Call / Operational Demands:** Not on a routine on-call rotation, but must be reachable to coordinate a formal business continuity invocation during a genuine disaster event, at any hour.

## Career Development Path

**Previous Roles:**

- Backup Reliability Engineer or Data Protection Senior Engineer with BC/DR planning exposure
- IT Risk Analyst or Business Continuity Analyst
- Site Reliability Engineer with disaster recovery test coordination experience

**Potential Next Roles:**

- Security Architect (if pivoting toward broader security/resilience architecture)
- Head of Business Continuity / Operational Resilience
- Security & Identity Chapter Lead

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Certified Business Continuity Professional (CBCP) — DRI International
- ISO 22301 Lead Implementer

**Complementary Certifications:**

- MBCI (Member of the Business Continuity Institute)
- ITIL 4 Foundation

**Learning Resources & Communities:**

- DRI International and Business Continuity Institute (BCI) community and certification learning paths.
