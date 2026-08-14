# Service Desk Analyst

| Field | Value |
|---|---|
| **Domain** | Service Desk |
| **Chapter:** | End User & Workplace |
| **Role Level** | Engineer |
| **Reports To** | Service Desk Senior Analyst |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-07 |

---

## Role Overview

The Service Desk Analyst is the Tier-1 point of contact for every employee technology issue — the first human response to a broken laptop, a locked account, a failed application install, or "is anything down right now?" This role owns the ticket queue's front door: logging, triaging, and resolving straightforward incidents and service requests within defined first-contact-resolution scope, and escalating everything else — with enough diagnostic context that Tier-2 doesn't have to start from zero — to the right specialist team (Client Platform, Endpoint Management, Identity & Access, or the Major Incident Manager for anything wide-scale). The role is measured on speed, accuracy of triage, and the employee's experience of being helped, not just ticket closure counts.

## Role Scope & Boundaries

- **Scope of Influence:** Team — resolves within an individual ticket's scope; does not set support model, staffing, or SLA policy (owned by the Service Desk Lead).
- **Experience Anchor:** 0–2 years in an IT support or customer-facing technical role; works under close guidance initially, building toward independent handling of the standard ticket catalogue within the first 6 months.
- **Out of Scope:** Does not perform OS-level engineering, driver/imaging fixes, or profile remediation (owned by Client Platform Engineer, received as a Tier-2 escalation); does not own device enrollment policy or compliance configuration (owned by Endpoint Management); does not declare or run major incidents (owned by the Major Incident Manager, though this role is frequently the first to detect and report one).
- **Escalates To:** Service Desk Senior Analyst (for tickets outside first-contact-resolution scope or requiring deeper technical investigation).
- **Escalated To By:** End users directly (via phone, chat, self-service portal, or walk-up), and automated monitoring alerts routed into the service desk queue.

## Business Impact

- **Business Objective:** Keeps every employee productive by resolving the most common technology blockers fast and routing everything else to the right team the first time — minimizing the time between "something's broken" and "someone competent is on it."
- **Value Metrics:** First-contact resolution rate, average time to first response, ticket backlog age, customer satisfaction (CSAT) score per interaction, correct-escalation rate (tickets not bounced back for wrong routing).
- **Key Stakeholders:** Service Desk Senior Analyst, Service Desk Lead, every employee across the organization, Client Platform Engineer, Endpoint Management Engineer, HR (onboarding/offboarding ticket volume).
- **Processes Supported:** Incident logging and Tier-1 triage, standard service request fulfilment (password resets, access requests, software installs from catalogue), knowledge base lookup and self-service deflection, new-starter and leaver ticket handling.

## Key Responsibilities

- Log every inbound contact (phone, chat, portal, email, walk-up) as a ticket with accurate category, priority, and affected-user detail — the record that every downstream team relies on.
- Triage each ticket against the known-issue and knowledge base catalogue; resolve within first-contact-resolution scope where a documented fix exists (password resets, standard software installs, account unlocks, basic connectivity troubleshooting).
- Escalate tickets outside first-contact-resolution scope to the correct Tier-2 team with full diagnostic context already captured — error messages, steps already tried, device/user identifiers — so the receiving engineer isn't starting from zero.
- Recognize patterns suggesting a wider outage (multiple simultaneous reports of the same symptom) and flag them immediately to the Service Desk Senior Analyst or directly to the Major Incident Manager.
- Process routine access and provisioning requests: standard software installs from the approved catalogue, distribution list changes, basic permission requests within pre-approved bounds.
- Support new-starter and leaver administrative tickets — account creation/deactivation triggers, standard equipment requests — coordinating with HR-driven onboarding cohorts.
- Maintain and contribute to the knowledge base: flag outdated articles, draft new ones for recurring issues once a fix pattern is confirmed by Tier-2.
- Communicate clearly and empathetically with non-technical end users, setting expectations on resolution time and following up on tickets left open overnight.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Ticket categorization, priority assignment, and initial triage decision | First-contact-resolution scope boundaries and the standard fix catalogue (owned by Service Desk Lead) |
| Resolution of tickets within the documented Tier-1 catalogue | Escalation routing rules for ambiguous or novel issue types (owned by Service Desk Senior Analyst) |
| Initial detection and flagging of suspected wide-scale outages | Major incident declaration and incident bridge management (owned by Major Incident Manager) |
| Knowledge base article flagging and first-draft contributions | Knowledge base structure, ownership, and publication standards (owned by Service Desk Senior Analyst) |

## Required Skills & Qualifications

**Technical Skills:**

- Working knowledge of Windows 10/11 and macOS end-user troubleshooting: account lockouts, network connectivity, printing, common application errors
- Familiarity with Microsoft 365 basics (Outlook, Teams, OneDrive) sufficient to resolve common access and sync issues
- Comfortable navigating a ticketing/ITSM platform (ServiceNow or equivalent) for logging, categorizing, and updating tickets
- Basic understanding of Active Directory / Entra ID concepts: what an account lockout or password reset actually does
- Clear, professional written and verbal communication for both technical and non-technical audiences

**Soft Skills and Leadership:**

- Patience and empathy — many callers are frustrated or non-technical; de-escalation and clear expectation-setting matter as much as the fix itself.
- Attention to detail in ticket documentation — a poorly logged ticket costs Tier-2 time reconstructing what already happened.
- Willingness to learn continuously; the fix catalogue and knowledge base expand constantly as new issues get documented.

**Technology Proficiency Levels:**

**Expert level required:**

- ITSM ticketing platform (ServiceNow or equivalent) day-to-day operation

**Proficient level required:**

- Windows 10/11 and Microsoft 365 end-user troubleshooting
- remote-support tooling (Quick Assist, TeamViewer, or equivalent)

**Working Knowledge required:**

- macOS end-user troubleshooting
- Active Directory / Entra ID account concepts

**Awareness level expected:**

- mobile device (iOS/Android) basic troubleshooting
- VPN/network connectivity fundamentals

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Service Desk Senior Analyst | Escalates tickets outside first-contact-resolution scope; receives coaching and knowledge base guidance | Escalates To |
| Client Platform Engineer | Hands off OS-level issues (imaging, driver conflicts, profile corruption) that require engineering investigation | Escalates To |
| Endpoint Management Engineer | Hands off device enrollment, compliance policy, or MDM configuration issues | Escalates To |
| Major Incident Manager | Reports suspected wide-scale outages detected through ticket pattern spikes | Escalates To |
| HR / People Function | Receives new-starter and leaver notifications that trigger account and equipment tickets | Consumes From |
| End users (organization-wide) | Provides first-line support, resolution, and status updates for logged tickets | Provides To |

## Key Technologies

- ITSM/ticketing platform (ServiceNow or equivalent) for ticket logging and workflow
- Microsoft Entra ID / Active Directory (account unlock, password reset operations)
- Microsoft 365 (Outlook, Teams, OneDrive) end-user administration basics
- Remote support tooling (Microsoft Quick Assist, TeamViewer, or equivalent)
- Knowledge base / self-service portal platform
- Telephony/contact-centre software and chat support tooling
- Windows 10/11 and macOS end-user environments

## Typical Day-to-Day Activities

- Answering inbound calls and chats, logging tickets with accurate categorization and priority
- Walking a user through a password reset or MFA re-registration
- Triaging a batch of overnight portal-submitted tickets and resolving the straightforward ones before the day's call volume picks up
- Escalating a laptop that won't boot past the login screen to Client Platform Engineer with the error code and steps already tried
- Noticing three unrelated users reporting the same VPN symptom within ten minutes and flagging it to the Senior Analyst
- Processing a batch of new-starter account creation tickets ahead of a Monday onboarding cohort
- Updating a knowledge base article after confirming with Tier-2 that a known fix now applies to a new OS version
- Following up on tickets left open from the previous shift to confirm resolution with the affected user

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| First-contact resolution rate | ≥60% | Monthly |
| Average time to first response | <5 minutes (phone/chat), <2 hours (portal/email) | Monthly |
| Customer satisfaction (CSAT) score | ≥4.2 / 5 | Monthly |
| Correct-escalation rate (not bounced back for wrong routing) | ≥90% | Monthly |
| Ticket backlog age (open >48h) | <5% of open tickets | Weekly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — ticket handling, phone/chat support, and remote-assistance tooling require no physical presence.
- **Collaboration Tools:** ITSM/ticketing platform, Microsoft Teams, telephony/contact-centre software, remote support tooling, knowledge base platform.
- **On-Site Requirements:** None typically; some organizations run a walk-up desk requiring rostered on-site coverage.
- **Time Zone Flexibility:** Shift-based coverage aligned to business hours (and extended or 24/7 coverage in larger organizations); rota-driven rather than flexible.
- **On-Call / Operational Demands:** Shift work is the norm rather than on-call; may include early/late shifts or weekend rotation depending on the organization's support hours commitment.

## Career Development Path

**Previous Roles:**

- Customer service or technical support role outside IT
- Retail or hospitality technology support
- IT apprenticeship or entry-level technical training programme
- Help desk intern or campus IT support assistant

**Potential Next Roles:**

- Service Desk Senior Analyst
- Client Platform Engineer (for those developing OS/hardware engineering interest)
- Endpoint Management Engineer (for those developing device management platform interest)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- CompTIA A+ — foundational hardware and OS troubleshooting
- ITIL 4 Foundation — service management vocabulary and process context
- Microsoft 365 Certified: Fundamentals (MS-900)

**Complementary Certifications:**

- HDI Support Center Analyst
- Microsoft Certified: Modern Desktop Administrator Associate (entry-level modules)

**Learning Resources and Communities:**

- Microsoft Learn (Microsoft 365 and Windows fundamentals paths), HDI (Help Desk Institute) community and best-practice library, ITIL 4 Foundation self-study guides, internal knowledge base and shadowing rotations with Tier-2 teams.
