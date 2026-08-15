# Service Desk Senior Analyst

| Field | Value |
|---|---|
| **Role ID** | `service-desk-senior-analyst` |
| **Domain** | Service Desk |
| **Chapter:** | End User & Workplace |
| **Role Level** | Senior Engineer |
| **Reports To** | Service Desk Lead |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-07 |

---

## Role Overview

The Service Desk Senior Analyst is the Tier-2 technical backbone of the service desk — the person Tier-1 Analysts escalate to when a ticket needs deeper diagnosis, a non-standard fix, or judgment about whether it's actually a wider problem. This role owns complex ticket resolution, coaches and mentors Analysts on triage and diagnostic technique, maintains the knowledge base's technical accuracy, and acts as the desk's first line of defense against declaring (or missing) a major incident — confirming genuine pattern-driven outages before they reach the Major Incident Manager, and quietly absorbing the one-off oddities that don't need to. Where the Analyst resolves from a documented catalogue, the Senior Analyst builds the catalogue.

## Role Scope & Boundaries

- **Scope of Influence:** Team — technical authority over the Tier-2 ticket queue and knowledge base content; does not set support model, staffing, or SLA policy (owned by the Service Desk Lead).
- **Experience Anchor:** 2–4 years in Tier-1/Tier-2 IT support with demonstrated independent diagnostic ability; operates independently on the full breadth of the desk's technical ticket catalogue.
- **Out of Scope:** Does not perform OS image engineering, driver-level fixes, or profile rebuilds (owned by Client Platform Engineer, received as a Tier-3 escalation); does not own device compliance policy configuration (owned by Endpoint Management Engineer); does not declare major incidents (owned by the Major Incident Manager, though this role is the primary gate that confirms a pattern is real before escalating it).
- **Escalates To:** Service Desk Lead (for staffing/coverage gaps or recurring issues that need a policy or process fix, not just a ticket fix); Client Platform Senior Engineer or Endpoint Management Senior Engineer (for Tier-3 technical escalations); Major Incident Manager (for confirmed wide-scale outages).
- **Escalated To By:** Service Desk Analysts (for tickets outside first-contact-resolution scope or requiring deeper investigation).

## Business Impact

- **Business Objective:** Resolves the technical problems Tier-1 can't, at the speed employees expect, while continuously shrinking the set of things that need Tier-2 at all by turning one-off fixes into documented Tier-1 catalogue entries.
- **Value Metrics:** Tier-2 resolution rate without further escalation, mean time to resolve for escalated tickets, knowledge base article accuracy/reuse rate, false-positive rate on major-incident pattern flags, Analyst coaching effectiveness (measured via Analyst first-contact-resolution trend).
- **Key Stakeholders:** Service Desk Analysts, Service Desk Lead, Client Platform Senior Engineer, Endpoint Management Senior Engineer, Major Incident Manager, end users with escalated or complex issues.
- **Processes Supported:** Tier-2 technical escalation handling, knowledge base authoring and technical review, Analyst coaching and diagnostic upskilling, incident-pattern confirmation ahead of major-incident declaration.

## Key Responsibilities

- Resolve tickets escalated from Tier-1 that require deeper diagnostic work: non-standard application errors, intermittent connectivity issues, account/permission problems outside the standard catalogue, and multi-step troubleshooting.
- Coach and mentor Service Desk Analysts on triage judgment, diagnostic technique, and ticket documentation quality — the primary informal upskilling channel on the desk.
- Confirm or rule out suspected wide-scale outages flagged by Analysts, gathering enough evidence (affected user count, common thread, timing) before escalating to the Major Incident Manager — protecting against both false alarms and missed incidents.
- Author and maintain knowledge base articles for newly confirmed fixes, converting one-off Tier-2 resolutions into Tier-1-actionable documentation.
- Escalate genuinely novel or engineering-level issues to Client Platform Senior Engineer, Endpoint Management Senior Engineer, or the relevant domain specialist, with full diagnostic history attached.
- Handle privileged access requests and non-standard permission changes that fall outside Tier-1's pre-approved bounds, applying least-privilege judgment before actioning or routing for approval.
- Identify recurring ticket patterns that indicate a systemic problem (a bad software update, a misconfigured group policy) and raise them to the Service Desk Lead as a process or standard-change candidate rather than resolving the same ticket repeatedly.
- Provide technical input into the standard change catalogue maintained with the Change / Release Manager for common, pre-approved service desk-initiated changes.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Resolution approach for escalated Tier-2 tickets and technical judgment on further escalation | Support model, staffing levels, and shift/rota design (owned by Service Desk Lead) |
| Knowledge base technical content — accuracy, structure of individual articles, and article lifecycle | Knowledge base platform selection and information architecture (owned by Service Desk Lead) |
| Confirmation (or dismissal) of suspected wide-scale outage patterns before major-incident escalation | Major incident declaration and incident bridge management (owned by Major Incident Manager) |
| Non-standard access/permission ticket judgment within pre-approved policy bounds | Access policy and privileged access standards (owned by Security & Identity) |

## Required Skills & Qualifications

**Technical Skills:**

- Strong diagnostic ability across Windows 10/11 and macOS: event log analysis, network troubleshooting, application error investigation beyond documented fixes
- Solid understanding of Microsoft Entra ID / Active Directory: group membership, conditional access basics, permission troubleshooting
- Comfortable administering Microsoft 365 workloads (Exchange Online, SharePoint, Teams) at a troubleshooting depth beyond basic user support
- Experience with ITSM platform administration: ticket workflow configuration, knowledge base authoring tools, standard change templates
- Working understanding of endpoint management concepts (Intune policies, compliance states) sufficient to diagnose whether an issue is device-policy-related

**Soft Skills and Leadership:**

- Coaching mindset — treats every Tier-1 escalation as a chance to build the Analyst's diagnostic skill, not just close the ticket.
- Sound judgment under ambiguity — distinguishing a genuine emerging outage from a cluster of coincidental unrelated tickets.
- Clear technical writing for knowledge base articles that a Tier-1 Analyst with less context can follow unaided.

**Technology Proficiency Levels:**

**Expert level required:**

- ITSM ticketing platform administration
- Windows 10/11 and Microsoft 365 troubleshooting depth

**Proficient level required:**

- Microsoft Entra ID / Active Directory administration
- macOS troubleshooting

**Working Knowledge required:**

- Microsoft Intune / endpoint compliance concepts
- network connectivity and VPN diagnostics

**Awareness level expected:**

- PowerShell for basic diagnostic scripting
- mobile device management (iOS/Android) troubleshooting

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Service Desk Analyst | Receives escalated tickets; provides coaching, resolution, and knowledge base updates back to Tier-1 | Provides To |
| Service Desk Lead | Escalates staffing/process gaps and recurring-issue patterns; reports on Tier-2 resolution trends | Escalates To |
| Client Platform Senior Engineer | Escalates OS-level issues requiring engineering investigation; receives resolution and root-cause detail | Escalates To |
| Endpoint Management Senior Engineer | Escalates device compliance/enrollment issues beyond standard troubleshooting | Escalates To |
| Major Incident Manager | Escalates confirmed wide-scale outage patterns after pattern verification | Escalates To |
| Change / Release Manager | Collaborates on standard change catalogue entries for common service desk-initiated changes | Collaborates |

## Key Technologies

- ITSM/ticketing platform (ServiceNow or equivalent) — workflow and knowledge base administration
- Microsoft Entra ID / Active Directory (troubleshooting and permission administration depth)
- Microsoft 365 workloads (Exchange Online, SharePoint, Teams) at administrative troubleshooting depth
- Microsoft Intune / endpoint compliance policy concepts
- Remote support and diagnostic tooling (Quick Assist, TeamViewer, or equivalent, plus event log/diagnostic collection tools)
- PowerShell (basic diagnostic and bulk-action scripting)
- Knowledge base authoring platform

## Typical Day-to-Day Activities

- Working a queue of Tier-1 escalations, diagnosing beyond the documented fix catalogue
- Coaching an Analyst through a tricky ticket in real time rather than just taking it over
- Investigating a cluster of connectivity complaints to determine whether it's a genuine VPN gateway issue or unrelated coincidence
- Authoring a knowledge base article after resolving a novel application error, so Tier-1 can handle the next occurrence
- Escalating a persistent profile corruption issue to Client Platform Senior Engineer with full diagnostic history attached
- Reviewing a non-standard access request against policy before approving or routing it to Security
- Flagging a recurring ticket pattern (same software update breaking the same app) to the Service Desk Lead as a candidate for a standard change
- Reviewing the previous shift's escalation log to catch anything left unresolved

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Tier-2 resolution rate without further escalation | ≥75% | Monthly |
| Mean time to resolve escalated tickets | <4 hours | Monthly |
| Knowledge base article reuse rate (articles cited in later Tier-1 resolutions) | ≥50% of published articles | Quarterly |
| False-positive rate on major-incident pattern flags | <10% | Quarterly |
| Analyst first-contact-resolution trend (coaching effectiveness proxy) | Improving quarter-on-quarter | Quarterly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — diagnostic work, coaching, and knowledge base authoring are all tooling-based.
- **Collaboration Tools:** ITSM/ticketing platform, Microsoft Teams, remote diagnostic tooling, knowledge base platform, PowerShell remoting.
- **On-Site Requirements:** None typically; occasional on-site presence for hands-on coaching sessions or hardware-dependent diagnostics.
- **Time Zone Flexibility:** Shift-based coverage aligned to business hours, often anchoring the more experienced end of shift rotations to ensure Tier-2 depth is available across coverage windows.
- **On-Call / Operational Demands:** May carry light on-call responsibility for out-of-hours escalations during extended support-hour commitments; participates in post-incident reviews when their escalation triggered a major incident.

## Career Development Path

**Previous Roles:**

- Service Desk Analyst
- IT Support Technician with 2+ years of Tier-1/Tier-2 experience
- Field/desktop support technician

**Potential Next Roles:**

- Service Desk Lead
- Client Platform Engineer (for those developing OS/hardware engineering depth)
- Endpoint Management Engineer (for those developing device management platform depth)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- ITIL 4 Foundation
- Microsoft Certified: Modern Desktop Administrator Associate (or current MD-102 equivalent)
- Microsoft 365 Certified: Fundamentals (MS-900)

**Complementary Certifications:**

- CompTIA Network+ (network troubleshooting depth)
- HDI Desktop Support Technician
- Microsoft Certified: Identity and Access Administrator Associate (SC-300) — awareness depth for permission troubleshooting

**Learning Resources and Communities:**

- Microsoft Learn (Endpoint Administrator and Microsoft 365 troubleshooting paths), HDI community and knowledge management best practices, ITIL 4 process guides, internal shadowing with Client Platform and Endpoint Management teams.
