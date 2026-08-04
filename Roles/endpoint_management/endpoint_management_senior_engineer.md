# Endpoint Management Senior Engineer

| Field | Value |
|---|---|
| **Domain** | Endpoint Management |
| **Chapter:** | End User & Workplace |
| **Role Level** | Senior Engineer |
| **Reports To** | End User & Workplace Chapter Lead |
| **Direct Reports** | Endpoint Management Engineers (day-to-day technical guidance and mentoring; formal line management sits with the Chapter Lead) |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Endpoint Management Senior Engineer designs, implements, and maintains complex enterprise endpoint management solutions using Microsoft Intune and Microsoft Endpoint Configuration Manager (MECM). This role serves as a deep technical specialist and escalation point for the endpoint management team, leading implementation of new capabilities, driving automation, and ensuring the reliability, security, and compliance of the managed device estate across Windows, macOS, iOS, and Android platforms.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — detailed engineering design and delivery within the UEM reference architecture
- **Experience Anchor:** 5+ years in endpoint/UEM engineering with demonstrated independent delivery — operates independently within the Architect's reference architecture
- **Out of Scope:** UEM platform architecture and technology selection (Architect-owned); enterprise identity architecture (Identity Engineers-owned); ITSM process governance (Service Management-owned)
- **Escalates To:** Endpoint Management Architect — architecture-level questions and design direction
- **Escalated To By:** Endpoint Management Engineers on complex device management and compliance issues

## Business Impact

- **Business Objective:** Ensure the endpoint estate is securely managed, compliant, and performant to support workforce productivity and reduce organisational risk.
- **Value Metrics:** Device compliance percentage, patch cycle completion rate, provisioning time reduction, helpdesk escalation volume, automation coverage for repetitive endpoint tasks.
- **Key Stakeholders:** IT Operations, Security Operations, Help Desk, End Users, Compliance teams.
- **Processes Supported:** Device provisioning, application deployment, patch management, security compliance enforcement, remote device management, user onboarding and offboarding.

## Key Responsibilities

- Implement and manage Microsoft Intune policies across Windows, macOS, iOS, and Android device platforms.
- Lead co-management configuration between MECM and Intune, progressing workloads to cloud management.
- Design, test, and deploy Windows Autopilot profiles and enrolment configurations for zero-touch provisioning.
- Develop and maintain PowerShell scripts for endpoint configuration, reporting, and remediation tasks via Intune.
- Package and deploy Win32 applications using the Intune Management Extension; maintain the application catalogue.
- Configure and maintain compliance and Conditional Access integration with Microsoft Entra ID.
- Implement Windows Update for Business and Intune Autopatch ring strategies for controlled patching.
- Administer macOS management via Intune including certificate deployment, configuration profiles, and app management.
- Manage mobile device management (MDM) for iOS and Android using Intune with Apple Business Manager and Android Enterprise.
- Act as escalation point for endpoint management incidents and complex policy conflicts.
- Mentor junior engineers and contribute to team knowledge base and runbooks.
- Participate in change management processes and ensure endpoint changes are properly documented.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Implementation of Intune/MECM configuration and policies | Architecture decisions and standards (with Architect) |
| Application packaging and deployment method decisions | Security baseline requirements (with Security team) |
| Intune scripting and automation solutions | Co-management workload migration timeline |
| Patch ring design and testing | Licensing and tooling procurement |

## Required Skills & Qualifications

**Technical Skills:**

- Advanced knowledge of Microsoft Intune - device configuration, compliance policies, app management, and scripting.
- Strong experience with MECM/SCCM administration including OSD, software distribution, and reporting.
- Proficiency in PowerShell scripting for endpoint management automation and Intune Graph API integration.
- Hands-on experience with Windows Autopilot - profile creation, troubleshooting, and hybrid join scenarios.
- Knowledge of Windows 10/11 management, MDM policy parity with Group Policy.
- Experience with macOS device management via Intune configuration profiles.
- Understanding of Microsoft Entra ID device registration, Hybrid Entra Join vs. Entra Join.
- Familiarity with Conditional Access policy configuration and device compliance signal flow.
- Experience with application packaging (Win32, MSIX) and Intune Win32 app deployment.
- Knowledge of Windows Update for Business rings and Intune Autopatch configuration.

**Soft Skills and Leadership:**

- Strong analytical and troubleshooting skills for complex policy conflicts.
- Ability to document solutions clearly for team knowledge sharing.
- Mentoring junior team members on endpoint tooling and best practices.
- Effective communication with helpdesk and end-user support teams.

**Technology Proficiency Levels:**

**Expert level required:**

- Microsoft Intune (device configuration, compliance policies, app management, scripting)
- PowerShell scripting and Microsoft Graph API for Intune automation
- Windows Autopilot (profile creation, troubleshooting, hybrid join scenarios)

**Proficient level required:**

- MECM/SCCM administration (OSD, software distribution, reporting)
- Win32/MSIX application packaging and Intune Win32 app deployment
- Windows Update for Business / Intune Autopatch ring configuration

**Working Knowledge required:**

- macOS device management via Intune configuration profiles
- Conditional Access policy configuration and device compliance signal flow
- Android Enterprise / Apple Business Manager MDM configuration

**Awareness level expected:**

- Microsoft Entra ID (Azure AD) Hybrid Join vs. Entra Join architecture
- Microsoft Defender for Endpoint policy integration

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Endpoint Management Architect: | Receive design direction; contribute implementation feedback to architecture decisions | Escalates To |
| Help Desk / Desktop Support: | Provide escalation support and knowledge transfer | Provides To |
| Security Engineers: | Implement security baselines and respond to compliance findings | Collaborates |
| Identity Engineers: | Coordinate on Entra ID device policies and Conditional Access | Collaborates |
| Service Management: | Follow ITSM processes for change approval and incident management | Governed By |

## Key Technologies

- Microsoft Intune / Microsoft Endpoint Manager
- Microsoft Endpoint Configuration Manager (MECM/SCCM)
- Windows Autopilot / Apple Business Manager
- Microsoft Entra ID (Azure AD) Device Management
- PowerShell / Microsoft Graph API
- Win32 App Packaging (IntuneWinAppUtil)
- Windows Update for Business / Intune Autopatch
- Microsoft Defender for Endpoint (policy management)
- Android Enterprise / Samsung Knox

## Typical Day-to-Day Activities

- Reviewing device compliance reports and investigating non-compliant devices.
- Creating and testing new Intune configuration profiles or updating existing policies.
- Packaging new application versions for Intune deployment.
- Troubleshooting Autopilot and enrolment failures.
- Developing and testing PowerShell remediation scripts.
- Responding to escalated helpdesk tickets related to device management.
- Reviewing patch deployment status and remediating stalled deployments.
- Participating in sprint planning and peer code reviews of scripts and configurations.

## Key Performance Indicators

- Device compliance percentage across managed platforms (target: >97%)
- Patch ring completion rate within defined SLAs
- Autopilot success rate (target: >95%)
- Application deployment success rate
- Escalation ticket resolution time
- Number of automated remediation scripts deployed (increasing trend)

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible for most responsibilities; occasional on-site for hardware provisioning testing.
- **Collaboration Tools:** Microsoft Teams, Intune Admin Centre, MECM console, ServiceNow, Jira.
- **On-Site Requirements:** Periodic lab access for Autopilot and OSD testing scenarios.
- **Time Zone Flexibility:** Standard business hours with some flexibility; patch cycles may require off-hours work.
- **On-Call / Operational Demands:** May participate in on-call rotation for critical endpoint outages (e.g., mass enrolment failure, Autopatch incident).

## Career Development Path

**Previous Roles:**

- Endpoint Management Engineer
- Desktop Support Engineer (Level 2/3)
- Systems Administrator (Windows/SCCM background)

**Potential Next Roles:**

- Endpoint Management Architect
- Modern Workplace Architect
- Cloud Platform Engineer (Microsoft focus)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Endpoint Administrator Associate (MD-102)
- Microsoft Certified: Security Administrator Associate (MS-500)

**Complementary Certifications:**

- Microsoft Certified: Identity and Access Administrator Associate (SC-300)
- Microsoft Certified: Azure Administrator Associate (AZ-104)
- ITIL 4 Foundation

**Learning Resources and Communities:**

- Microsoft Learn - Modern Endpoint Management
- Microsoft Tech Community - Intune
- Intune.Training community
- Patch My PC blog for packaging and deployment best practices
