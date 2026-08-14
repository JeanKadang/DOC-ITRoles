# Client Platform Senior Engineer

| Field | Value |
|---|---|
| **Domain** | Client Platform |
| **Chapter:** | End User & Workplace |
| **Role Level** | Senior Engineer |
| **Reports To** | End User & Workplace Chapter Lead |
| **Direct Reports** | Client Platform Engineers (day-to-day technical guidance and mentoring; formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Client Platform Senior Engineer is the primary technical practitioner responsible for building, maintaining, and continuously improving the organisation's client OS images, application packaging pipelines, and OS deployment automation across Windows 10/11, macOS, and Linux desktop (Ubuntu LTS). This role delivers the engineering capability that underpins the organisation's ability to provision, patch, and maintain a consistent and secure client estate at scale.

Operating with a high degree of autonomy, the Senior Engineer translates architectural standards set by the Client Platform Architect into working pipelines, automated task sequences, and tested deployable builds. They are the subject matter expert for OS image construction, application packaging (MSIX, .pkg, .deb), zero-touch provisioning, and patch pipeline management across all three platforms.

This role provides technical leadership and mentoring to Client Platform Engineers, collaborates closely with the Endpoint Management team on Intune and SCCM integration, supports Security on hardening implementation, and serves as the primary Tier-3 escalation point for OS-level incidents escalated from the Service Desk.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — detailed engineering design and delivery within the client platform reference architecture
- **Experience Anchor:** 5+ years in client platform or endpoint engineering with demonstrated independent delivery — operates independently within the Architect's reference architecture
- **Out of Scope:** Client platform reference architecture and standards (Architect-owned); UEM policy configuration (Endpoint Management-owned); hardware specification and OEM selection (Architect/Procurement-owned)
- **Escalates To:** Client Platform Architect — architecture-level questions and standards exceptions
- **Escalated To By:** Client Platform Engineers on complex packaging, provisioning, and patch remediation issues

## Business Impact

- **Business Objective:** Ensure the organisation can reliably provision, patch, and maintain a secure client device estate across Windows, macOS, and Linux, enabling productive workforce onboarding and minimising business disruption from OS-level incidents and unpatched vulnerabilities.
- **Value Metrics:** OS image build cycle time, zero-touch provisioning success rate, patch deployment success rate across platforms, application packaging throughput, Tier-2/3 escalation resolution time, documentation coverage.
- **Key Stakeholders:** Client Platform Architect, Endpoint Management Senior Engineers, Service Desk Lead, Security Operations, HR (onboarding workflow coordination), new employees receiving provisioned devices.
- **Processes Supported:** OS image build and release cadence, new employee device provisioning, monthly patch integration, application onboarding and packaging, Tier-2/3 OS issue resolution, hardware compatibility testing.

## Key Responsibilities

- Build and maintain Windows 11 WIM images using DISM and automated task sequences, integrating monthly cumulative updates and driver refreshes into a reliable, repeatable build pipeline.
- Create and maintain macOS enrolment configurations via Jamf Pro and Apple Business Manager, including configuration profiles, pre-stage enrolment, and post-enrolment policy packages.
- Maintain Ubuntu LTS base images and provisioning playbooks for Linux desktop devices using Ansible or equivalent configuration management tooling.
- Package and test applications across platforms: MSIX and Win32 for Windows, Homebrew casks and .pkg for macOS (including Universal Binary validation and Rosetta 2 compatibility testing on Apple Silicon M-series MacBooks), and .deb packages for Linux, adhering to defined packaging standards and testing checklists.
- Design and maintain zero-touch provisioning workflows for Windows (Autopilot pre-provisioning and self-deploy), macOS (ABM zero-touch enrolment), and Linux (scripted provisioning pipelines).
- Manage and optimise the client-side patch pipeline for all three platforms: WUfB ring management and Autopatch, Jamf Software Update management, and apt/dnf pipelines for Linux.
- Perform hardware driver management and compatibility testing for new Lenovo ThinkPad and ThinkCentre models entering the hardware standard: curate and validate Lenovo driver packs, automate BIOS/firmware updates using Lenovo System Update and Thin Installer, and document results in the hardware compatibility matrix.
- Write and maintain PowerShell, Bash, and Python scripts for OS configuration, remediation automation, and Intune-deployed remediations.
- Provide Tier-2/3 technical support for OS-level issues escalated from the Service Desk, including OS reinstallation, profile remediation, driver conflicts, and complex application failures.
- Mentor Client Platform Engineers through peer reviews of packaging submissions, pairing on build tasks, and structured knowledge-sharing.
- Maintain technical documentation including build procedures, packaging standards, runbooks, and known-issues logs.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Detailed engineering design of OS build, provisioning, and packaging pipelines within the reference architecture | Client platform reference architecture and standards (owned by the Architect) |
| Complex application packaging solutions and cross-platform automation implementations | OS hardening baseline selection (advises the Architect with implementation feedback) |
| Patch ring execution design and remediation engineering for the client estate | UEM policy configuration (owned by Endpoint Management) |
| Technical quality of engineering deliverables and peer review outcomes | Hardware specification and OEM selection (Architect/Procurement-owned) |
| Escalated engineering investigations and root-cause analysis for client platform issues | Service desk knowledge base structure and support processes |

## Required Skills & Qualifications

**Technical Skills:**

- Expert knowledge of Windows 11 WIM build construction: DISM image servicing, driver injection, cumulative update integration, component clean-up, and WIM validation workflows.
- Strong experience with macOS fleet engineering using Jamf Pro: configuration profiles, policies, pre-stage enrolment, Jamf scripts, and Extension Attributes, with working knowledge of Apple Silicon M-series architecture differences affecting application packaging and system extension approval on MacBook Pro/Air devices.
- Proficiency in Linux desktop management using Ansible or Puppet: playbook and role authoring, idempotent configuration management, and package management for Ubuntu LTS.
- Advanced application packaging skills: MSIX Packaging Tool, Intune Win32 content prep and deployment, Homebrew cask authoring, .pkg construction, and .deb packaging with dpkg/FPM.
- Solid understanding of zero-touch provisioning: Windows Autopilot pre-provisioning and self-deploy modes, Apple ABM zero-touch assignment, and scripted Linux provisioning.
- Experience managing client patch pipelines: WUfB deployment rings, Intune Autopatch, Jamf software update policies, and apt/dnf automation.
- Advanced PowerShell scripting for Windows OS configuration, Intune remediation scripts, and Microsoft Graph API calls; Bash/Zsh for macOS and Linux automation.
- Hardware driver management expertise: INF-based Windows driver injection with Lenovo driver packs (ThinkPad / ThinkCentre), Lenovo System Update and Thin Installer for scripted BIOS/firmware deployment, macOS system extension management on Apple Silicon M-series hardware, and Linux firmware management using fwupd/LVFS on Lenovo hardware.
- Familiarity with OS hardening implementation: applying CIS benchmark configurations, Microsoft Security Compliance Toolkit baselines, and MDM-enforced security profiles.

**Soft Skills:**

- Strong written communication for technical documentation, runbooks, and knowledge base articles.
- Mentoring and coaching junior engineers, with patience and structure in knowledge transfer.
- Collaborative approach to cross-team integration with Endpoint Management, Security, and Service Desk.
- Structured problem-solving and analytical debugging for complex, multi-layer OS-level issues.
- Ability to manage competing priorities across image builds, packaging requests, and reactive escalation support within sprint commitments.

**Technology Proficiency Levels:**

**Expert level required:**

- Windows 11 DISM/WIM build pipeline and monthly update integration
- MSIX and Win32 application packaging for Intune
- PowerShell scripting for OS automation and Graph API
- Jamf Pro policy and configuration profile management

**Proficient level required:**

- Windows Autopilot (pre-provisioning and self-deploy)
- Apple Business Manager zero-touch enrolment
- Ansible playbook and role authoring for Linux desktop (Ubuntu LTS)
- Homebrew cask and .deb packaging
- Windows Update for Business ring management and Autopatch

**Working Knowledge required:**

- Jamf software update management
- apt/dnf patch pipeline management
- Python scripting for cross-platform automation
- CIS Benchmark hardening implementation
- Lenovo driver pack management and Lenovo System Update / Thin Installer workflows
- hardware driver compatibility testing

**Awareness level expected:**

- Fleet.dm cross-platform telemetry
- Declarative Device Management (DDM) for macOS
- MDT/WDS legacy context
- Microsoft Intune Autopatch advanced ring customisation

### Qualifications

**Education:** Bachelor's degree in IT, Computer Science, or related field; or equivalent industry experience.

**Certifications:**

| Certification | Issuer | Level |
|---|---|---|
| Microsoft Certified: Endpoint Administrator Associate (MD-102) | Microsoft | Associate |
| Jamf Certified Associate (JCA) or Jamf Certified Tech (JCT) | Jamf | Associate / Tech |
| Microsoft Certified: Azure Fundamentals (AZ-900) | Microsoft | Fundamentals |
| ITIL 4 Foundation | Axelos | Foundation |
| Red Hat Certified System Administrator (RHCSA) — recommended for Linux scope | Red Hat | Associate |

**Experience:** Minimum 5 years in client platform or endpoint engineering, with demonstrated multi-platform experience across Windows and at least one of macOS or Linux desktop. Experience packaging applications and building/maintaining OS images at enterprise scale (1,000+ devices).

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| OS image build cycle time — monthly patch integration | ≤ 3 business days per platform | Monthly |
| Zero-touch provisioning success rate | ≥ 97% | Monthly |
| Application packaging requests completed within SLA | ≥ 90% | Monthly |
| Patch deployment success rate (all platforms) | ≥ 98% | Monthly |
| Tier-2/3 OS escalation resolution within SLA | ≥ 95% | Monthly |
| Documentation coverage for active build pipelines and runbooks | 100% of active pipelines documented | Quarterly |
| Peer review participation rate for packaging submissions | 100% reviewed before promotion | Monthly |

## Career Development Path

**From (typical previous roles):**

- Client Platform Engineer
- Desktop Support Engineer (Tier 2/3) with scripting and packaging skills
- Systems Administrator (Windows or macOS focused)
- Endpoint Management Engineer with OS build experience

**To (typical next roles):**

- Client Platform Architect
- Endpoint Management Architect
- Modern Workplace Senior Engineer
- DevOps / Platform Automation Engineer (with OS automation focus)

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Client Platform Architect | Receive architectural direction; contribute engineering feedback to standards and roadmap | Escalates To |
| Client Platform Engineers | Provide mentoring, peer review packaging work, and first-line escalation support | Provides To |
| Endpoint Management Senior Engineers | Coordinate on Intune policy integration with OS builds and application deployment alignment | Collaborates |
| Service Desk (Tier 1/2) | Receive OS-level escalations; provide resolution, root cause analysis, and knowledge base updates | Provides To |
| Security Operations | Validate OS hardening baseline implementations; support rapid remediation of client-side CVEs | Collaborates |
| HR / People Operations | Support device provisioning workflows for new employee onboarding cohorts | Collaborates |
| Procurement | Advise on hardware compatibility for new device models entering the standard | Consumes From |

## Key Technologies

**OS Image Build:**

- DISM (Windows image servicing and management)
- Windows ADK (Assessment and Deployment Kit, Windows PE)
- Jamf Pro (macOS policy and package management platform)
- Ansible (Linux desktop configuration management, Ubuntu LTS)

**Deployment & Provisioning:**

- Windows Autopilot (pre-provisioning and self-deploy modes)
- Apple Business Manager (ABM zero-touch assignment)
- Jamf enrolment profiles and pre-stage policies
- Bash / Python provisioning scripts (Linux)

**Application Packaging:**

- MSIX Packaging Tool, Advanced Installer
- Intune Win32 Content Prep Tool (intunewin)
- Homebrew and cask authoring framework
- dpkg-deb, FPM (Effing Package Management) for .deb construction
- .pkg construction (pkgbuild, productbuild — macOS)

**Patch Management:**

- Windows Update for Business (WUfB) deployment rings
- Microsoft Intune Autopatch
- Jamf Software Update management policies
- apt / dnf (Linux patch automation)

**Scripting & Automation:**

- PowerShell 5.1 / 7.x (Windows automation, Graph API)
- Bash / Zsh (macOS and Linux scripting)
- Python 3.x (cross-platform automation)
- Git (version control for build scripts and packaging)

**Hardware & Driver Management:**

- Lenovo driver packs (ThinkPad T/X/L/E series and ThinkCentre — WinPE-compatible for WIM injection)
- Lenovo System Update and Lenovo Thin Installer (scripted BIOS/firmware and driver deployment)
- Lenovo Commercial Vantage (end-user-facing driver and firmware update tooling, deployed via Intune)
- Apple Software Update / softwareupdate CLI (macOS firmware and security updates)
- fwupd / Linux Vendor Firmware Service (LVFS) for Lenovo hardware on Ubuntu LTS
- OEM INF/SYS driver packages (Intel, AMD — supplementary chipset and peripheral components)

## Typical Day-to-Day Activities

- Designing and building OS image, provisioning, and packaging pipeline improvements across Windows, macOS, and Linux
- Implementing and testing hardening baseline changes and validating compliance impact before rollout
- Handling escalated engineering issues from Engineers and the Service Desk, leading root-cause analysis
- Reviewing peers’ engineering work: scripts, packages, pipeline changes, and documentation
- Automating repetitive client-platform tasks with PowerShell, Bash, and Python
- Monitoring patch ring health and provisioning telemetry, driving remediation where success rates degrade
- Mentoring Engineers on platform internals, packaging techniques, and automation practices
- Contributing implementation feedback to the Architect on standards and tooling decisions

## Remote Work Considerations

- **Remote Eligibility:** Hybrid or remote-first; engineering work is largely remote-compatible with occasional lab/hardware presence
- **Collaboration Tools:** Microsoft Teams, Git repositories for build scripts and pipelines, Intune/Jamf/Fleet.dm consoles, and shared engineering documentation
- **On-Site Requirements:** Occasional presence for physical device validation, driver/firmware testing on reference hardware, and major deployment events
- **Time Zone Flexibility:** Standard business hours; occasional out-of-hours windows for patch ring cutovers and migration activities
- **On-Call / Operational Demands:** Participates in escalation support for client-estate incidents affecting provisioning, patching, or OS stability

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Endpoint Administrator Associate (MD-102)
- Jamf Certified Tech / Jamf 300-level (JCT)
- Linux Foundation Certified System Administrator (LFCS)

**Complementary Certifications:**

- Microsoft Certified: Azure Administrator Associate (AZ-104)
- CIS Controls Implementation Group Practitioner
- ITIL 4 Foundation
- HashiCorp or Red Hat automation credentials (e.g., RHCE/Ansible) for cross-platform automation depth

**Learning Resources and Communities:**

- Microsoft Learn deployment and Intune content, Jamf Nation and MacAdmins community, PatchMyPC and packaging community resources, osquery/Fleet.dm documentation, and PowerShell and Python automation communities

## Common Challenges

- **Monthly image maintenance burden:** Integrating monthly OS patches, driver updates, and application refreshes across three platform images within a tight release window without introducing regressions requires disciplined test coverage and build pipeline automation.
- **Application packaging complexity:** Handling complex installers with custom prerequisites, licensing mechanisms (per-user, per-machine, licence servers), or OS version-specific behaviours that resist standard packaging approaches.
- **Cross-platform tooling context-switching:** Managing significantly different tooling, scripting languages, and packaging formats for three OS platforms simultaneously requires broad skill maintenance and deliberate time allocation.
- **Hardware compatibility testing scale:** Validating new Lenovo ThinkPad and ThinkCentre models and driver pack updates across the Windows 11 and Ubuntu LTS build stack before production rollout — and separately managing Apple's controlled hardware and OS release cadence for MacBook Pro/Air, including Apple Silicon M-series compatibility testing for all packaged applications.
- **Escalation queue vs. planned work:** Balancing proactive build and packaging work within sprint commitments against reactive Tier-2/3 OS escalations from the Service Desk, which can arrive unpredictably.

## Example Projects

- **Windows 11 23H2 WIM Refresh:** Build, test, and release an updated Windows 11 WIM incorporating the latest Microsoft Cumulative Update, Lenovo driver pack revisions for ThinkPad T14/X1 Carbon and ThinkCentre M-series hardware (validated via Thin Installer), and updated MSIX application packages — delivered within the 3-day build window post-Patch Tuesday.
- **macOS Sonoma Zero-Touch Rollout:** Update Jamf Pro enrolment configuration, configuration profiles, and pre-stage policies to support macOS Sonoma deployment via ABM zero-touch for 500 MacBook devices, with less than 5 minutes of IT intervention required per device.
- **Ubuntu LTS Developer Workstation Pipeline:** Develop an Ansible role set for Ubuntu 24.04 LTS developer workstation provisioning on Lenovo ThinkPad hardware (verified against the Lenovo Linux Certification Programme), covering base OS hardening, fwupd-based firmware update automation via LVFS, development toolchain installation, and .deb package deployment, with idempotent execution and CI-tested playbooks.
- **MSIX Migration for Legacy Win32 Applications:** Repackage 30 legacy MSI-based applications to MSIX format, resolving per-user vs. per-machine conflicts and virtualisation compatibility issues, validated via Intune deployment — reducing packaging-related support tickets by 40%.
- **Patch Pipeline Automation:** Automate the monthly WUfB patch ring promotion using PowerShell and Microsoft Graph API, eliminating manual Intune Autopatch ring promotion steps and generating automated compliance reports delivered to the team and the Client Platform Product Owner.
