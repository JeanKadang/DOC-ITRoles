# Endpoint Management Architect

| Field | Value |
|---|---|
| **Role ID** | `endpoint-management-architect` |
| **Domain** | Endpoint Management |
| **Chapter:** | End User & Workplace |
| **Role Level** | Architect |
| **Reports To** | End User & Workplace Chapter Lead |
| **Direct Reports** | None (sets technical direction and mentors Senior Engineers; formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Endpoint Management Architect is responsible for the strategic design, governance, and evolution of the organisation's enterprise endpoint management platform. This role defines the architecture for modern unified endpoint management (UEM) across all device types - Windows, macOS, iOS, Android, and Linux - ensuring security, compliance, and a productive user experience at scale. The Architect leads the transition from legacy management tooling (SCCM/ConfigMgr co-management) toward cloud-native Microsoft Intune and Microsoft Endpoint Manager (MEM) architectures.

## Role Scope & Boundaries

- **Scope of Influence:** Domain-wide — UEM platform architecture and technology selection
- **Experience Anchor:** Minimum 8 years in endpoint/UEM engineering, with at least 3 years in an architecture role — operates independently on domain-wide architecture decisions
- **Out of Scope:** Security policy requirements for endpoints (with CISO); HR processes for device onboarding and offboarding; budget allocation for endpoint tooling licensing; application portfolio rationalisation (with App teams)
- **Escalates To:** End User & Workplace Chapter Lead — chapter-wide priorities, cross-domain boundary disputes, and decisions beyond endpoint management scope
- **Escalated To By:** Endpoint Management Senior Engineers and Engineers on design-level questions and standards clarification

## Business Impact

- **Business Objective:** Enable a secure, scalable, and modern endpoint estate that supports hybrid and remote workforce productivity while minimising risk and operational overhead.
- **Value Metrics:** Device compliance rate, mean time to patch critical vulnerabilities, helpdesk ticket reduction from self-service automation, endpoint security policy coverage, Autopilot provisioning success rate.
- **Key Stakeholders:** CISO, IT Operations leadership, Help Desk, HR (onboarding/offboarding), Finance (licensing), Compliance and Risk teams.
- **Processes Supported:** Employee onboarding and device provisioning, patch management, security compliance enforcement, application delivery, remote wipe and offboarding, audit and regulatory reporting.

## Key Responsibilities

- Design and govern the organisation's enterprise UEM architecture using Microsoft Intune, Microsoft Endpoint Configuration Manager (MECM), and co-management strategies.
- Define endpoint security baselines, compliance policies, and Conditional Access integration aligned to Zero Trust principles.
- Architect Windows Autopilot, Apple Business Manager, and Android Enterprise provisioning workflows for automated device enrolment.
- Lead strategic roadmap planning for endpoint management platform evolution, including migration from on-premises SCCM to cloud-native Intune.
- Establish standards for application packaging, deployment, and self-service via Company Portal and WinGet.
- Design integration patterns between Intune, Microsoft Entra ID, Defender for Endpoint, and Microsoft Purview for a unified security posture.
- Define patch management architecture using Windows Update for Business, Intune, and Autopatch.
- Provide technical governance over endpoint agent proliferation, ensuring rationalisation and consolidation.
- Create and maintain reference architectures, design patterns, and technical standards documents.
- Mentor senior engineers and guide cross-functional teams on endpoint architecture decisions.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| UEM platform architecture and technology selection | Security policy requirements for endpoints (with CISO) |
| Endpoint provisioning and enrolment workflow design | HR processes for device onboarding and offboarding |
| Co-management and migration strategy from SCCM to Intune | Budget allocation for endpoint tooling licensing |
| Integration architecture with Microsoft Entra ID, Defender, and Purview | Application portfolio rationalisation (with App teams) |
| Endpoint compliance policy framework | Network segmentation impacts of endpoint control changes |

## Required Skills & Qualifications

**Technical Skills:**

- Expert-level knowledge of Microsoft Intune, Microsoft Endpoint Configuration Manager (MECM/SCCM), and co-management configurations.
- Deep understanding of Windows 10/11 management, Group Policy, and MDM policy parity.
- Proficiency in Microsoft Entra ID (Azure AD) device registration, Hybrid Entra Join, and Entra Join architectures.
- Experience designing Conditional Access policies integrating device compliance signals.
- Knowledge of Windows Autopilot, Apple Business Manager (ABM), and Android Enterprise enrolment modes.
- Familiarity with Microsoft Defender for Endpoint integration and attack surface reduction policies.
- Experience with PowerShell scripting for endpoint configuration, reporting, and automation.
- Understanding of Windows Update for Business, Intune Autopatch, and patch ring design.
- Knowledge of application packaging standards (MSIX, Win32 app wrapping, Intune Win32 deployment).
- Experience with Zero Trust architecture principles as applied to endpoint management.

**Soft Skills and Leadership:**

- Ability to translate complex technical architecture into clear business value propositions.
- Strong stakeholder engagement and executive communication skills.
- Mentoring and coaching of engineering teams.
- Vendor management and strategic partnership skills (Microsoft relationship management).

**Technology Proficiency Levels:**

**Expert level required:**

- Microsoft Intune / Microsoft Endpoint Manager (MEM)
- Microsoft Endpoint Configuration Manager (MECM / SCCM)
- Windows Autopilot / Apple Business Manager / Android Enterprise
- Conditional Access and Compliance Policies

**Proficient level required:**

- Microsoft Entra ID (Azure AD) Device Management
- Microsoft Intune Autopatch / Windows Update for Business
- PowerShell / Microsoft Graph API
- WinGet / Company Portal / MSIX Packaging

**Working Knowledge required:**

- Microsoft Defender for Endpoint
- Microsoft Purview (Information Protection on endpoints)
- Zero Trust architecture principles as applied to endpoint management

**Awareness level expected:**

- Emerging unified endpoint management (UEM) platforms and competitive landscape
- AI-assisted endpoint health and anomaly detection tooling
- Ability to lead organisational change management for platform migrations.

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Security Architects: | Align endpoint controls with Zero Trust and SIEM/SOAR integration requirements | Governed By |
| Identity Architects: | Coordinate on Microsoft Entra ID device identity, Conditional Access, and SSO | Collaborates |
| Desktop/Endpoint Engineers: | Provide architecture direction and technical governance | Provides To |
| Cloud Architects: | Ensure endpoint policies integrate with cloud workloads and cloud-joined devices | Collaborates |
| Service Management: | Align endpoint change processes with ITSM workflows (ServiceNow, etc.) | Governed By |
| CISO / Security Teams: | Provide compliance posture reporting and drive security baseline adoption | Governed By |

## Key Technologies

- Microsoft Intune / Microsoft Endpoint Manager (MEM)
- Microsoft Endpoint Configuration Manager (MECM / SCCM)
- Microsoft Entra ID (Azure AD) Device Management
- Windows Autopilot / Apple Business Manager / Android Enterprise
- Microsoft Defender for Endpoint
- Microsoft Intune Autopatch / Windows Update for Business
- Microsoft Purview (Information Protection on endpoints)
- PowerShell / Microsoft Graph API
- WinGet / Company Portal / MSIX Packaging
- Conditional Access and Compliance Policies

## Typical Day-to-Day Activities

- Reviewing and approving endpoint architecture design decisions and policy changes.
- Collaborating with security teams on new endpoint compliance requirements.
- Evaluating new Intune features and assessing adoption readiness.
- Creating and updating reference architecture documentation and standards.
- Supporting senior engineers with complex configuration and troubleshooting escalations.
- Engaging with Microsoft TAM or FastTrack for preview features and roadmap alignment.
- Presenting endpoint estate health dashboards and roadmap progress to leadership.
- Participating in change advisory board (CAB) for high-impact endpoint changes.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Device compliance rate across managed estate (target: >98%) | >98% | — |
| Critical patch deployment time (target: <72 hours for critical CVEs) | <72 hours | — |
| Autopilot/zero-touch provisioning success rate (target: >95%) | >95% | — |
| Percentage of devices managed cloud-native via Intune (migration progress metric) | — | — |
| Helpdesk tickets related to endpoint management (trend: decreasing) | — | — |
| Security baseline policy coverage across endpoint fleet | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible - management platform is cloud-native; no on-site requirement for architecture work.
- **Collaboration Tools:** Microsoft Teams, SharePoint, Jira, Confluence, Microsoft Intune Admin Centre, Azure Portal.
- **On-Site Requirements:** Occasional on-site visits for hardware lab testing (Autopilot scenarios, device provisioning validation).
- **Time Zone Flexibility:** Core business hours; occasional cross-regional collaboration for global deployments.
- **On-Call / Operational Demands:** Generally not on-call for P1 incidents, but available for escalation of major platform outages affecting device enrolment or compliance.

## Career Development Path

**Previous Roles:**

- Endpoint Management Senior Engineer
- Systems Engineer (SCCM/ConfigMgr background)
- Desktop Engineer with cloud management experience

**Potential Next Roles:**

- Enterprise Architect
- Modern Workplace Architect (broader Microsoft 365 scope)
- Cloud Platform Architect (with Microsoft focus)
- Director of IT Infrastructure

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Endpoint Administrator Associate (MD-102)
- Microsoft Certified: Identity and Access Administrator Associate (SC-300)
- Microsoft Certified: Security Administrator Associate (MS-500)

**Complementary Certifications:**

- Microsoft Certified: Azure Administrator Associate (AZ-104)
- Microsoft 365 Certified: Enterprise Administrator Expert (MS-102)
- ITIL 4 Foundation

**Learning Resources and Communities:**

- Microsoft Learn - Intune and Endpoint Management learning paths
- Microsoft Tech Community - Intune and Endpoint Management
- Intune Training (intune.training) - community learning resource
- Microsoft Endpoint Manager Blog (techcommunity.microsoft.com)
