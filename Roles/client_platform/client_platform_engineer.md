# Client Platform Engineer

| Field | Value |
|---|---|
| **Role ID** | `client-platform-engineer` |
| **Domain** | Client Platform |
| **Chapter:** | End User & Workplace |
| **Role Level** | Engineer |
| **Reports To** | Client Platform Senior Engineer <!-- role: client-platform-senior-engineer --> |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Client Platform Engineer supports the day-to-day operational and build activities of the client OS estate across Windows 10/11, macOS, and Linux desktop (Ubuntu LTS). This role performs monthly OS image updates, application packaging and testing, hardware setup and imaging for new employee cohorts, and provides Tier-2 OS-level support for issues escalated from the Service Desk.

Working under the guidance of the Senior Engineer and Architect, the Client Platform Engineer develops practical skills in OS image maintenance, packaging tooling, scripting, and provisioning workflows. This is a hands-on technical role that forms the foundation of the client platform engineering career pathway; individuals in this role are expected to grow their multi-platform skills progressively and take increasing ownership of discrete build and packaging tasks over time.

The Engineer plays a critical role in the device lifecycle — from imaging new hardware for onboarding cohorts to retiring and wiping outgoing devices — and in maintaining the documentation that supports consistent, auditable, and repeatable operations.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of OS build, provisioning, packaging, and patching tasks to defined standards
- **Experience Anchor:** 1-3 years in client platform, endpoint, or desktop support engineering — works under guidance, building toward independent delivery
- **Out of Scope:** Engineering pipeline design (Senior Engineers and the Architect-owned); packaging and hardening standards (provides implementation feedback only); patch ring strategy and scheduling (Senior Engineer/Architect-owned); tooling selection and platform strategy
- **Escalates To:** Client Platform Senior Engineer — design-level questions, complex packaging issues, and escalated tickets beyond first-line resolution
- **Escalated To By:** Service Desk (Tier 1) on OS-level issues requiring engineering-tier resolution

## Business Impact

- **Business Objective:** Support fast, reliable device provisioning and OS maintenance to keep the workforce productive, with minimal disruption from OS-level incidents and timely integration of monthly patches and application updates.
- **Value Metrics:** Device setup time for new starters, patch deployment success rate, application packaging completion within SLA, Tier-2 ticket resolution time, documentation accuracy and currency.
- **Key Stakeholders:** Client Platform Senior Engineer, Client Platform Architect, Service Desk, HR (onboarding cohort planning), new employees receiving provisioned devices.
- **Processes Supported:** New employee device setup and imaging, monthly OS patch integration, application packaging and release, Tier-2 OS escalation handling, hardware driver update testing.

## Key Responsibilities

- Perform monthly OS image updates for Windows 11, macOS, and Ubuntu LTS images, integrating cumulative patches and driver refreshes under Senior Engineer guidance.
- Package and test applications for deployment across Windows (MSIX/Win32), macOS (.pkg/Homebrew cask), and Linux (.deb), following established packaging standards and testing checklists.
- Set up and image devices for new employees: register devices in Autopilot or Apple Business Manager, initiate zero-touch provisioning flows, and validate build completion before handoff.
- Provide Tier-2 support for OS-level issues escalated from the Service Desk, including OS reinstallation, profile remediation, driver conflicts, and application installation failures.
- Perform hardware driver updates and compatibility testing for new Lenovo ThinkPad and ThinkCentre models entering the fleet, including running Lenovo System Update and Thin Installer workflows and documenting driver and BIOS/firmware revision outcomes.
- Maintain and update build procedure documentation, packaging runbooks, and known-issues logs to ensure accuracy following each build cycle.
- Run and interpret OS patch compliance reports across Windows (WUfB), macOS (Jamf), and Linux (apt) to identify devices requiring manual follow-up.
- Assist with hardware asset tagging and ITAM system registration (ServiceNow ITAM or equivalent), BIOS/UEFI configuration on Lenovo devices, and device enrolment for hardware refresh cohorts.
- Participate in sprint ceremonies, daily stand-ups, and retrospectives as part of the Client Platform team.
- Escalate complex technical issues to the Senior Engineer with clear diagnostic information and reproduction steps.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Execution of OS build, provisioning, packaging, and patching tasks to the defined standards | Engineering pipeline design (owned by Senior Engineers and the Architect) |
| Quality and documentation of individual packages, scripts, and build artefacts | Packaging and hardening standards (provides implementation feedback) |
| First-line resolution of escalated client platform tickets within the engineering tier | Patch ring strategy and scheduling (Senior Engineer/Architect-owned) |
| Accuracy of estate telemetry data hygiene for assigned platforms | Tooling selection and platform strategy |

## Required Skills & Qualifications

**Technical Skills:**

- Working knowledge of Windows 10/11 OS maintenance: integrating cumulative updates with DISM, mounting and unmounting WIM files, and basic image validation.
- Familiarity with macOS device management using Jamf Pro: policy scoping, package deployment, and basic configuration profile concepts.
- Basic Linux desktop skills: command-line proficiency on Ubuntu LTS, apt package management, and shell scripting fundamentals.
- Application packaging fundamentals: creating Win32 Intune packages with the Content Prep Tool, understanding MSIX basics, and building basic .pkg files for macOS.
- Experience with device provisioning workflows: initiating Windows Autopilot flows, Apple Business Manager device assignment, and running scripted Linux setup procedures.
- Understanding of patch management workflows: WUfB deployment rings, Jamf software update policies, and apt update automation.
- Basic PowerShell scripting for Windows configuration tasks and Intune remediation script deployment.
- Ability to interpret Windows event logs, application logs, and MDM diagnostic logs for OS-level troubleshooting.
- Familiarity with IT service management tooling (ServiceNow or Jira) for ticket handling and documentation.
- Familiarity with Lenovo hardware tooling basics: running Lenovo System Update for BIOS/firmware updates, interpreting Lenovo driver pack contents, and understanding Apple Silicon M-series implications for macOS application compatibility testing.

**Soft Skills:**

- Strong attention to detail when performing image builds, packaging, and device setup to prevent downstream issues.
- Customer focus and empathy when handling Tier-2 escalations from end users and Service Desk colleagues.
- Willingness to document processes thoroughly and keep runbooks current following each build cycle.
- Eagerness to learn across multiple OS platforms and progressively expand technical depth.
- Good written and verbal communication for escalation handoffs and team knowledge-sharing.

**Technology Proficiency Levels:**

**Expert level required:**

- Windows 11 cumulative update integration via DISM
- device setup and imaging workflows for Windows Autopilot and Apple Business Manager enrolment

**Proficient level required:**

- Win32 application packaging with Intune Content Prep Tool
- Jamf Pro basic policy and package deployment
- apt/dpkg package management on Ubuntu LTS
- basic PowerShell scripting for Windows remediation tasks

**Working Knowledge required:**

- MSIX packaging basics
- macOS .pkg creation
- Jamf software update policies
- WUfB patch compliance report interpretation
- Windows event log and MDM log analysis for troubleshooting

**Awareness level expected:**

- Ansible basics for Linux configuration management
- Homebrew cask authoring structure
- MSIX Packaging Tool advanced features
- CIS Benchmark client hardening concepts
- Lenovo System Update and Thin Installer for BIOS/firmware management
- Apple Silicon M-series application compatibility (Rosetta 2, Universal Binary)

### Qualifications

**Education:** Diploma or Bachelor's degree in IT, Computing, or a related field; or demonstrated equivalent practical experience in a desktop or endpoint support environment.

**Certifications:**

| Certification | Issuer | Level |
|---|---|---|
| Microsoft Certified: Endpoint Administrator Associate (MD-102) | Microsoft | Associate |
| Microsoft 365 Certified: Fundamentals (MS-900) | Microsoft | Fundamentals |
| Jamf Certified Associate (JCA) | Jamf | Associate |
| ITIL 4 Foundation | Axelos | Foundation |
| CompTIA A+ (entry-level alternative) | CompTIA | Foundational |

**Experience:** 1–3 years in desktop support, IT field services, or a junior endpoint/client platform engineering role. Demonstrable hands-on experience with Windows device management; exposure to macOS or Linux desktop is advantageous.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Device provisioning completion time for new starters | ≤ 4 hours end-to-end | Per cohort |
| Monthly image update completion (per platform) | Within 5 business days post-Patch Tuesday | Monthly |
| Application packaging requests completed within SLA | ≥ 85% | Monthly |
| Tier-2 OS escalation resolution within SLA | ≥ 90% | Monthly |
| Patch compliance rate on assigned device cohorts | ≥ 97% | Monthly |
| Runbook and documentation accuracy (verified by Senior Engineer) | No critical gaps identified in quarterly review | Quarterly |

## Career Development Path

**From (typical previous roles):**

- IT Help Desk / Service Desk Analyst (Level 1/2)
- Desktop Support Technician / Field Services Engineer
- Junior Systems Administrator

**To (typical next roles):**

- Client Platform Senior Engineer <!-- role: client-platform-senior-engineer -->
- Endpoint Management Engineer <!-- role: endpoint-management-engineer -->
- Modern Workplace Engineer
- Systems Administrator (Windows or macOS focused)

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Client Platform Senior Engineer <!-- role: client-platform-senior-engineer --> | Day-to-day technical guidance, escalation point, and peer review of packaging output | Escalates To |
| Client Platform Architect <!-- role: client-platform-architect --> | Receive procedures and standards; escalate design-level questions through the Senior Engineer | Governed By |
| Service Desk (Tier 1) | Receive OS-level escalations; provide resolution and knowledge transfer back to Tier 1 | Provides To |
| Endpoint Management Engineers | Coordinate on Intune application deployment and compliance policy interactions | Collaborates |
| HR / People Operations | Align device setup timing with new employee start dates and onboarding cohort schedules | Collaborates |
| Procurement / Asset Management | Receive new hardware for imaging; return retired devices for secure wipe and disposal | Consumes From |

## Key Technologies

**OS Image Maintenance:**

- DISM (Windows image servicing and management)
- Windows ADK (Deployment Tools, USMT)
- Jamf Pro (macOS package and policy management)
- Ubuntu apt / dpkg tooling

**Provisioning:**

- Windows Autopilot (self-deploy and pre-provisioning initiation)
- Apple Business Manager (ABM device assignment)
- Jamf enrolment profiles
- Bash provisioning scripts (Linux)

**Application Packaging:**

- Intune Win32 Content Prep Tool (intunewin)
- MSIX Packaging Tool (basic usage)
- Jamf package composer / .pkg creation (pkgbuild)
- dpkg-deb (.deb package creation)

**Patch & Update Management:**

- Windows Update for Business (WUfB) compliance reporting
- Jamf Software Update policies
- apt / apt-get (Ubuntu patch management)

**Hardware & Firmware Management:**

- Lenovo System Update (Windows — BIOS, firmware, and driver updates)
- Lenovo Thin Installer (scripted/silent driver and firmware deployment)
- fwupd (Linux firmware updates on Lenovo hardware via LVFS)
- BIOS/UEFI configuration utilities (Lenovo BIOS Setup, WMI-based BIOS scripting basics)

**Scripting:**

- PowerShell (Windows scripting and remediation basics)
- Bash (macOS and Linux scripting)

**ITSM & Collaboration:**

- ServiceNow or Jira (ticket handling and sprint tracking)
- Microsoft Teams, SharePoint (team communication)
- Confluence or SharePoint (runbook and documentation maintenance)

## Typical Day-to-Day Activities

- Building, testing, and releasing application packages for Windows (MSIX/Win32), macOS (.pkg), and Linux (.deb/.rpm)
- Executing OS image build and provisioning tasks, including driver pack updates and validation on reference hardware
- Running patch deployment activities and verifying update compliance across assigned rings
- Resolving escalated tickets from the Service Desk that require OS engineering investigation
- Writing and maintaining automation scripts (PowerShell, Bash) for routine client-platform tasks
- Updating engineering documentation, runbooks, and package records
- Validating hardening baseline settings on test devices and reporting deviations
- Participating in team stand-ups, peer reviews, and knowledge-sharing sessions

## Remote Work Considerations

- **Remote Eligibility:** Hybrid; a substantial share of packaging, scripting, and pipeline work is remote-compatible, with regular lab presence for device work
- **Collaboration Tools:** Microsoft Teams, Git repositories, Intune/Jamf consoles, and ticketing/ITSM tooling
- **On-Site Requirements:** Regular presence for physical device provisioning, hardware troubleshooting, and deployment support events
- **Time Zone Flexibility:** Standard business hours; occasional out-of-hours participation in deployment windows
- **On-Call / Operational Demands:** May participate in a follow-the-sun or rota-based escalation model for client estate incidents

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Endpoint Administrator Associate (MD-102)
- Jamf Certified Associate / Jamf 200-level (JCA)
- CompTIA A+ or equivalent client platform foundation

**Complementary Certifications:**

- Linux Foundation Certified IT Associate (LFCA) or LFCS
- ITIL 4 Foundation
- PowerShell and scripting fundamentals courses (Microsoft Learn paths)

**Learning Resources and Communities:**

- Microsoft Learn (Windows deployment, Intune), Jamf training catalogue and Jamf Nation, MacAdmins community, packaging communities (PSAppDeployToolkit, Homebrew), and internal engineering runbooks and standards

## Common Challenges

- **Build regression risk:** Monthly patch integration can introduce unexpected application compatibility issues or driver conflicts that are not caught until validation testing, requiring careful regression coverage with limited test device availability.
- **Onboarding cohort pressure:** New employee start dates often cluster (e.g., first Monday of the month), creating peak demand for device imaging that can strain capacity if onboarding schedules are not communicated in advance.
- **Multi-platform skill breadth:** Being expected to work across Windows, macOS, and Linux as an engineer in development requires sustained learning investment and can feel daunting when context-switching between very different toolsets.
- **Escalation diagnostic ambiguity:** OS-level issues escalated from the Service Desk are often poorly described, requiring the engineer to reproduce the issue and perform significant diagnostic triage before a root cause becomes apparent.
- **Documentation discipline:** Keeping runbooks and known-issues logs current while managing operational workload requires active time management and team norms that genuinely value documentation as part of the definition of done.

## Example Projects

- **Monthly Windows 11 Image Update Cycle:** Integrate the latest Microsoft Cumulative Update and any new driver revisions into the production Windows 11 WIM, run validation tests on a physical test device and a VM, resolve any detected regressions, and submit the completed image for Senior Engineer review — delivered within the 5-day post-Patch-Tuesday window.
- **New Starter Onboarding Cohort:** Image and configure 25 Windows 11 laptops and 10 MacBooks for a recruitment intake, coordinating with HR on confirmed start dates, completing Autopilot and ABM registration, and handing off validated devices to the Service Desk for collection.
- **Application Packaging Request — Security Tooling:** Package a new endpoint security agent as a Win32 intunewin package, test installation and uninstallation on Windows 11 in a clean sandbox environment, validate behaviour under standard user context, and submit to the Senior Engineer for deployment approval.
- **Driver Compatibility Testing for New Lenovo ThinkPad Model:** Test a newly introduced Lenovo ThinkPad L-series model against the existing Windows 11 WIM and Ubuntu LTS base image, run Lenovo Thin Installer to validate driver pack completeness, source and inject any missing INF packages for Windows, verify Ubuntu LTS hardware support against Lenovo's Linux certification status, and document all findings in the hardware compatibility matrix.
- **Runbook Refresh Cycle:** Review and update the team's OS provisioning and packaging runbooks following the Windows 11 23H2 image refresh, ensuring all procedures reflect current tooling versions, screenshot accuracy, and step-by-step completeness verified by the Senior Engineer.
