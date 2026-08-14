# Change / Release Manager

| Field | Value |
|---|---|
| **Domain** | Service Management |
| **Chapter:** | Service & Governance |
| **Role Level** | Senior Engineer |
| **Reports To** | Service Management Architect |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-07 |

---

## Role Overview

The Change / Release Manager owns the organization's change enablement process — the governance layer that ensures production changes are assessed, scheduled, communicated, and released with an appropriate level of risk control, without becoming a bottleneck that slows delivery. This role chairs the Change Advisory Board (CAB), maintains the change and release calendar, and partners with every engineering team to right-size change approval to risk (standard, normal, and emergency change categories), balancing governance with delivery speed.

## Role Scope & Boundaries

- **Scope of Influence:** Cross-domain, organization-wide — has approval authority over the production change calendar and can block or reschedule a change that presents unmanaged risk.
- **Experience Anchor:** 5+ years in change/release management or a senior operations role within a complex, multi-team environment; expected to operate independently and make risk-based approval calls without escalation for the majority of changes.
- **Out of Scope:** Does not own the technical content or design of any change (owned by the submitting team's Architect/Engineer); does not own the CI/CD pipeline tooling itself (owned by the DevOps Architect); does not own incident response for a failed change (handed to the Major Incident Manager once declared).
- **Escalates To:** Service Management Architect (for organization-wide change freezes, conflicting high-risk changes, or CAB disputes that cannot be resolved by consensus).
- **Escalated To By:** Engineering teams (when a standard change is rejected and the team wants to appeal the risk classification) and the Major Incident Manager (when an incident is traced to a change and process improvement is needed).

## Business Impact

- **Business Objective:** Enable fast, frequent production changes while keeping change-related incident rates low, by right-sizing approval rigor to risk and giving every team a clear, predictable path to release.
- **Value Metrics:** Change success rate, change-related incident rate, change lead time (submission to approval), percentage of changes classified as low-risk "standard" changes (a proxy for governance maturity).
- **Key Stakeholders:** All engineering teams and their Architects/Product Owners, Major Incident Manager, Service Management Architect, Security Architect (for security-relevant changes), executive leadership (for change freeze periods, e.g., peak trading/holiday blackout windows).
- **Processes Supported:** Change Advisory Board (CAB) governance, release calendar management, change risk classification, change freeze/blackout period enforcement, post-change incident causality review.

## Key Responsibilities

- Chair the Change Advisory Board (CAB), reviewing submitted normal and high-risk changes for completeness, risk assessment, rollback plan, and scheduling conflicts.
- Maintain the change risk classification framework (standard / normal / emergency) and work with engineering teams to pre-approve well-understood, low-risk change types as standard changes.
- Own and publish the organization-wide release and change calendar, identifying and resolving scheduling conflicts between teams.
- Define and enforce change freeze / blackout periods around business-critical windows (e.g., peak trading periods, major company events).
- Partner with the DevOps Architect to ensure the CI/CD pipeline enforces change approval gates appropriately without adding unnecessary manual steps to low-risk deployments.
- Review emergency changes after the fact to confirm they met the emergency criteria and were properly documented, feeding findings back into the standard change catalogue where a pattern emerges.
- Coordinate with the Major Incident Manager to determine whether a recent change contributed to an incident, and drive any resulting process improvement.
- Track and report change success/failure metrics to Service Management leadership, identifying teams or change types with elevated failure rates.
- Continuously simplify the change process — regularly reviewing which change types can be safely reclassified as standard to reduce CAB overhead.
- Maintain change management documentation, CAB meeting records, and the change/release runbook.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Change risk classification, CAB approval decisions, and the release calendar | The technical content or design of any submitted change (owned by the submitting team) |
| Change freeze/blackout period definition and enforcement | CI/CD pipeline tooling and architecture (owned by the DevOps Architect) |
| Change process, standard change catalogue, and CAB governance model | Incident response for a change-caused incident (owned by the Major Incident Manager once declared) |
| Change success/failure metrics reporting | Team-level release cadence and sprint planning (owned by each team's Product Owner) |

## Required Skills & Qualifications

**Technical Skills:**

- Strong working knowledge of ITIL 4 change enablement practices and how to apply them without becoming a rubber-stamp or a bottleneck.
- Experience operating change/release management tooling: ServiceNow Change Management, Azure DevOps Release Pipelines, Jira, or equivalent.
- Ability to read a technical change request (deployment plan, rollback plan, risk assessment) well enough to ask informed questions, without needing to be the implementer.
- Familiarity with CI/CD and progressive delivery concepts (feature flags, canary releases, blue/green deployments) to help teams reduce change risk through better release engineering rather than heavier approval gates.
- Data analysis skills to track change success/failure trends and identify systemic risk patterns.

**Soft Skills & Leadership:**

- Strong facilitation and negotiation skills to run a CAB that resolves scheduling conflicts fairly across competing team priorities.
- Balanced, risk-based judgment — able to say no to a genuinely risky change while not blocking routine, low-risk work.
- Clear communication of change policy and rationale to engineering teams who may see governance as friction.

**Technology Proficiency Levels:**

**Expert level required:**

- ServiceNow Change Management or Jira Service Management
- ITIL 4 change enablement practice

**Proficient level required:**

- Azure DevOps / CI-CD release pipelines
- Feature flag / progressive delivery tooling (LaunchDarkly, Flagsmith, or equivalent)

**Working Knowledge required:**

- Incident management process (for change-incident causality review)
- Data visualization for change metrics reporting

**Awareness level expected:**

- The underlying architecture of the major platforms this role governs changes for

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| DevOps Architect | Partners on CI/CD pipeline approval gates and progressive delivery patterns that reduce change risk | Collaborates |
| Major Incident Manager | Reviews change records to assess causality when an incident occurs | Provides To |
| Security Architect | Reviews security-relevant changes for additional risk assessment before CAB approval | Consumes From |
| Any team's Architect/Engineer | Submits changes for CAB review and receives approval/rejection with rationale | Governed By |
| Service Management Architect | Escalation path for organization-wide freezes and unresolved CAB disputes | Escalates To |
| Technical Program Manager / Delivery Manager | Coordinates release scheduling for multi-team program cutover events | Collaborates |

## Key Technologies

- ServiceNow Change Management
- Azure DevOps Release Pipelines / GitHub Actions deployment gates
- Jira / Jira Service Management
- LaunchDarkly / Flagsmith (feature flag and progressive delivery tooling)
- Confluence (CAB records, change runbooks)
- Power BI (change success/failure metrics reporting)

## Typical Day-to-Day Activities

- Chairing the weekly Change Advisory Board, reviewing submitted normal changes for risk and scheduling conflicts.
- Reviewing a batch of emergency changes from the past week to confirm they met emergency criteria and were properly documented.
- Updating the release calendar to resolve a scheduling conflict between two teams planning changes to the same shared dependency.
- Working with a team to reclassify a well-understood, low-risk change type as a standard change to reduce future CAB overhead.
- Reviewing the monthly change success/failure report and following up with a team showing an elevated failure rate.
- Coordinating with the Major Incident Manager on a post-incident review to confirm whether a recent change was the root cause.
- Communicating an upcoming change freeze period to all engineering teams ahead of a business-critical event.
- Partnering with the DevOps Architect to streamline an approval gate that engineering teams have flagged as unnecessary friction.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Change success rate | ≥97% of changes implemented without causing an incident | Monthly |
| Change-related incident rate | <3% of major incidents attributable to a recent change | Quarterly |
| Change lead time (submission to approval) | <2 business days for normal changes | Monthly |
| Standard change percentage | ≥60% of changes classified as pre-approved standard changes | Quarterly |
| CAB meeting efficiency | 100% of submitted changes reviewed within the scheduled CAB cycle | Weekly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — the role is process- and tooling-based.
- **Collaboration Tools:** ServiceNow, Azure DevOps, Jira, Confluence, Microsoft Teams, Power BI.
- **On-Site Requirements:** None typically.
- **Time Zone Flexibility:** Moderate — CAB meetings and release windows may need to accommodate teams across multiple time zones.
- **On-Call / Operational Demands:** Not typically on a rotating on-call schedule; expected to be reachable during major scheduled release/cutover windows and to participate in post-incident change-causality reviews as needed.

## Career Development Path

**Previous Roles:**

- Senior Engineer or DevOps Engineer with release management experience
- ITSM/Service Desk lead progressing into change and release governance
- Site Reliability Engineer with change risk management exposure

**Potential Next Roles:**

- Service Management Architect
- DevOps Architect (if pivoting toward release engineering/CI-CD architecture)
- Head of Service Management / IT Governance Lead

## Recommended Certifications & Learning Paths

**Core Certifications:**

- ITIL 4 Specialist: Create, Deliver and Support
- ITIL 4 Foundation

**Complementary Certifications:**

- SAFe Release Train Engineer (RTE)
- Certified ScrumMaster (CSM)

**Learning Resources & Communities:**

- ITIL 4 community of practice; DevOps Institute resources on change enablement and progressive delivery.
