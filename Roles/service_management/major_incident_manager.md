# Major Incident Manager

| Field | Value |
|---|---|
| **Domain** | Service Management |
| **Chapter:** | Service & Governance |
| **Role Level** | Senior Engineer |
| **Reports To** | Service Management Architect |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-07 |

---

## Role Overview

The Major Incident Manager owns the end-to-end lifecycle of major (P1/P2) incidents — from declaration through resolution, communication, and the follow-on problem management process. This role combines the Incident Commander function (driving the technical bridge, coordinating responders, and managing stakeholder communication during an active incident) with Problem Management (ensuring root cause analysis is completed and structural fixes are tracked to closure so the same incident does not recur). The Major Incident Manager does not fix the incident themselves — they own the process, the communication, and the accountability for closure, working across every technical domain that touches the affected service.

## Role Scope & Boundaries

- **Scope of Influence:** Cross-domain, incident-scoped — has temporary authority to direct any team's engineers onto a declared major incident bridge, regardless of their normal reporting line, for the duration of the incident.
- **Experience Anchor:** 5+ years in incident management, SRE, or operations within a complex, multi-team technical environment; expected to run high-pressure incident bridges independently.
- **Out of Scope:** Does not perform the technical remediation itself (owned by the responding engineering teams); does not own the underlying service's architecture or long-term reliability roadmap (owned by the Site Reliability Engineer / relevant Architect); does not own the change that may have caused the incident (owned by Change / Release Manager for causal analysis).
- **Escalates To:** Service Management Architect (for incidents requiring executive notification) and the Security Architect (if a major incident is identified as a security event, per the incident-to-security-event handoff).
- **Escalated To By:** On-call engineers and Site Reliability Engineers (when an incident's severity or cross-team scope exceeds what a single team's on-call rotation can coordinate).

## Business Impact

- **Business Objective:** Minimize the business impact of major incidents by driving fast, well-coordinated resolution and ensuring every major incident produces a completed root cause analysis and tracked corrective actions, reducing repeat incident rates over time.
- **Value Metrics:** Mean time to resolution (MTTR) for P1/P2 incidents, post-incident review completion rate, corrective action closure rate, repeat incident rate for the same root cause.
- **Key Stakeholders:** Site Reliability Engineers, Platform Reliability Engineer, affected service owners (Architects/Product Owners), executive leadership (for customer-impacting incidents), Customer Support/Success teams.
- **Processes Supported:** Major incident response and communication, post-incident review (PIR/blameless postmortem), problem management and corrective action tracking, executive incident status reporting.

## Key Responsibilities

- Declare and run the major incident bridge for P1/P2 incidents — coordinating responders across teams, tracking a shared timeline, and making sure the right people are engaged without unnecessary escalation noise.
- Own incident communication: status page updates, executive notifications, and customer-facing communication in partnership with Customer Support, kept accurate and timely throughout the incident lifecycle.
- Maintain the incident command structure during active incidents — assigning clear roles (technical lead, communications lead, scribe) so responders can focus on remediation.
- Drive the transition from incident resolution to problem management — ensuring every major incident has a scheduled blameless post-incident review within the agreed SLA.
- Facilitate post-incident reviews, extracting root cause, contributing factors, and a concrete corrective action list with owners and due dates.
- Track corrective actions from post-incident reviews to closure, escalating overdue items to the responsible Architect or Chapter Lead.
- Maintain and continuously improve the major incident management process, runbooks, and severity classification criteria.
- Analyze incident trends across the organization to identify recurring root causes or systemic weaknesses, feeding findings into the reliability roadmap owned by SRE/Platform teams.
- Coordinate with the Change / Release Manager to determine whether a recent change contributed to an incident, and ensure that causal finding is captured in the post-incident review.
- Run periodic major incident simulations ("game days") with response teams to validate the process and build responder familiarity before a real incident occurs.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Major incident severity classification, bridge structure, and incident communication cadence | Technical remediation approach during the incident (owned by the responding engineering team) |
| Post-incident review scheduling, facilitation, and corrective action tracking to closure | The underlying service architecture or reliability roadmap (owned by the relevant Architect/SRE) |
| Major incident process, runbooks, and severity classification criteria | Root-cause technical diagnosis (owned jointly by the responding engineers, documented by this role) |
| Incident status page and executive notification content and timing | Customer-specific commercial commitments arising from an incident (owned by Customer Success/Legal) |

## Required Skills & Qualifications

**Technical Skills:**

- Proven experience running major incident bridges in a complex, multi-team production environment.
- Strong working knowledge of incident management tooling: PagerDuty, Opsgenie, ServiceNow Incident Management, Statuspage, or equivalent.
- Ability to read and interpret monitoring/observability data (Datadog, Splunk, Grafana) well enough to ask informed diagnostic questions during an incident, without needing to perform the remediation.
- Structured root cause analysis facilitation technique (e.g., the "5 Whys," fishbone/Ishikawa analysis, or a comparable blameless postmortem method).
- Familiarity with ITIL 4 incident and problem management practices and how they map to the organization's severity/priority matrix.
- Clear, calm, real-time written communication under pressure (incident channel updates, status page copy).

**Soft Skills & Leadership:**

- Composure and clear-headed decision-making during high-pressure, high-visibility incidents.
- Strong facilitation skills to keep a multi-team incident bridge focused and free of blame.
- Persistence in following through on corrective actions long after the incident itself has faded from urgency.

**Technology Proficiency Levels:**

**Expert level required:**

- PagerDuty or Opsgenie (incident alerting and on-call coordination)
- ServiceNow Incident Management or Jira Service Management

**Proficient level required:**

- Statuspage or equivalent customer communication tooling
- Datadog, Splunk, or Grafana (reading observability data during an incident)

**Working Knowledge required:**

- ITIL 4 incident and problem management framework
- Change management processes (to assess change-incident causality)

**Awareness level expected:**

- The underlying architecture of the major platforms this role supports incidents for

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Site Reliability Engineer | Coordinates technical remediation during major incidents and shares post-incident findings for the reliability roadmap | Collaborates |
| Platform Reliability Engineer | Coordinates response for platform-level incidents spanning multiple services | Collaborates |
| Change / Release Manager | Consumes recent change records to assess causality during incident investigation | Consumes From |
| Security Architect | Hands off incidents identified as security events for security-led investigation | Escalates To |
| Service Management Architect | Escalation path for incidents requiring executive notification or process exceptions | Escalates To |
| Customer Support / Success teams | Provides incident status and customer-facing communication content | Provides To |

## Key Technologies

- PagerDuty / Opsgenie (on-call alerting and incident coordination)
- ServiceNow Incident Management / Jira Service Management
- Statuspage (customer-facing incident communication)
- Datadog / Splunk / Grafana (observability data during incident diagnosis)
- Slack / Microsoft Teams (incident bridge communication channels)
- Confluence (post-incident review documentation and runbooks)
- Blameless or equivalent post-incident review platform

## Typical Day-to-Day Activities

- Declaring and running a P1 incident bridge, coordinating responders from three different engineering teams.
- Drafting and publishing status page updates as an active incident progresses.
- Facilitating a blameless post-incident review for an incident resolved the previous week.
- Following up on overdue corrective actions from a prior post-incident review and escalating to the responsible Architect.
- Reviewing the weekly incident trend report to identify a recurring root cause across multiple services.
- Coordinating with the Change / Release Manager to confirm whether a recent deployment contributed to an incident.
- Running a quarterly major incident simulation ("game day") with an on-call rotation team.
- Updating the incident severity classification matrix based on lessons learned from a recent miscategorized incident.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Mean time to resolution (MTTR) for P1 incidents | <4 hours | Monthly |
| Post-incident review completion rate | 100% of P1/P2 incidents within 5 business days | Monthly |
| Corrective action closure rate | ≥90% closed within committed due date | Quarterly |
| Repeat incident rate (same root cause) | <5% of major incidents | Quarterly |
| Incident communication timeliness (status page updates) | ≥95% within SLA during active incidents | Monthly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — incident response is bridge/tooling-based.
- **Collaboration Tools:** PagerDuty/Opsgenie, Slack/Microsoft Teams, ServiceNow, Statuspage, Confluence.
- **On-Site Requirements:** None typically.
- **Time Zone Flexibility:** High — major incidents can occur at any hour and require immediate response regardless of time zone.
- **On-Call / Operational Demands:** This role typically participates in a major incident management on-call rotation and must be reachable to stand up an incident bridge within a defined response SLA (e.g., 15 minutes) at any hour.

## Career Development Path

**Previous Roles:**

- Site Reliability Engineer or Platform Reliability Engineer with strong incident response experience
- Senior Engineer (any infrastructure domain) with on-call and incident command experience
- ITSM/Service Desk lead progressing into major incident management

**Potential Next Roles:**

- Service Management Architect
- Head of Incident and Problem Management
- Site Reliability Engineering leadership track

## Recommended Certifications & Learning Paths

**Core Certifications:**

- ITIL 4 Specialist: Monitor, Support and Fulfil (or ITIL 4 Managing Professional)
- PagerDuty Certified Practitioner

**Complementary Certifications:**

- ITIL 4 Foundation
- Google SRE-aligned incident management training

**Learning Resources & Communities:**

- PagerDuty Incident Response community resources; Google SRE workbook chapters on incident management and postmortems.
