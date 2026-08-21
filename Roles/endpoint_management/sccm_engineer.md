# SCCM Engineer

| Field | Value |
|---|---|
| **Role ID** | `sccm-engineer` |
| **Domain** | Endpoint Management |
| **Chapter:** | End User & Workplace |
| **Role Level** | Engineer |
| **Reports To** | Endpoint Management Senior Engineer <!-- role: endpoint-management-senior-engineer --> |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The SCCM Engineer implements and maintains Microsoft System Center Configuration Manager (SCCM/ConfigMgr) and related endpoint management solutions. This role ensures reliable, secure, and efficient deployment of applications, updates, and configurations to endpoint devices across the organization.

## Role Scope & Boundaries

- **Scope of Influence:** Team — SCCM/MECM configuration manager operation: application deployment, patching, and OS deployment via ConfigMgr
- **Experience Anchor:** 2-4 years in SCCM/ConfigMgr administration — works semi-independently on defined ConfigMgr operational tasks
- **Out of Scope:** UEM platform architecture and technology selection (Architect-owned); Intune/modern management strategy and co-management sequencing (Architect-owned); broader endpoint security policy (Security Engineers-owned)
- **Escalates To:** Endpoint Management Senior Engineer — complex ConfigMgr issues and co-management/migration questions
- **Escalated To By:** application teams on packaging and deployment readiness questions

## Business Impact

- **Business Objective:** Implements and maintains SCCM/ConfigMgr infrastructure ensuring reliable application deployment, operating system deployment, and software update compliance for the Windows endpoint estate
- **Value Metrics:** Application deployment success rate, software update compliance rate, OS deployment success rate, SCCM client health metrics, documentation completeness
- **Key Stakeholders:** Endpoint Management Senior Engineers, Windows Server Engineers, application teams, help desk
- **Processes Supported:** SCCM application packaging and deployment, operating system deployment (OSD), software update management, configuration baseline management, endpoint hardware and software inventory

## Key Responsibilities

- Implement and configure SCCM infrastructure components
- Create and maintain application packages and deployments
- Configure and manage operating system deployment
- Implement software update management processes
- Configure hardware and software inventory collection
- Create and maintain configuration baselines
- Troubleshoot SCCM-related issues
- Maintain documentation for SCCM configurations and procedures

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| SCCM application packaging, collection management, and deployment task execution | Architecture and design decisions; SCCM infrastructure design |
| Software update deployment execution and OS deployment task maintenance | Automation strategy and scripting approach design |
| SCCM configuration documentation, operational runbooks, and knowledge base maintenance | Infrastructure lifecycle planning and tooling procurement decisions |

## Required Skills & Qualifications

- Experience with SCCM/ConfigMgr administration
- Knowledge of Windows operating systems and deployment
- Understanding of software packaging and distribution
- Familiarity with Group Policy and Active Directory
- Basic PowerShell scripting skills
- Knowledge of software update management processes
- Understanding of endpoint security concepts
- Relevant Microsoft certifications

**Technology Proficiency Levels:**

**Expert level required:**

- SCCM/ConfigMgr application packaging and deployment
- SCCM operating system deployment (OSD) and task sequences
- software update management via SCCM
- SCCM collection management and queries

**Proficient level required:**

- Windows Deployment Services (WDS) and Microsoft Deployment Toolkit (MDT)
- PowerShell scripting for endpoint tasks
- Group Policy administration
- Windows Server infrastructure basics

**Working Knowledge required:**

- Microsoft SQL Server for SCCM site database administration
- Microsoft Intune basics and co-management concepts
- PKI and certificate management for SCCM

**Awareness level expected:**

- Modern management migration to Intune cloud-native delivery
- Windows Autopilot integration
- Microsoft Configuration Manager cloud attach features

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Endpoint Management Product Owner <!-- role: endpoint-management-product-owner --> | Task prioritization | Consumes From |
| Windows Server Engineers | Infrastructure | Collaborates |
| Security Engineers | Endpoint security | Governed By |
| Application Packaging | Software deployment | Collaborates |
| SCCM Senior Engineers | Escalate complex ConfigMgr site infrastructure and co-management migration issues; receive guidance and mentoring | Escalates To |
| application teams | Application deployment needs | Provides To |

## Key Technologies

- Microsoft System Center Configuration Manager (SCCM/ConfigMgr)
- Microsoft Endpoint Manager
- Windows Deployment Services (WDS)
- Microsoft Deployment Toolkit (MDT)
- Windows operating systems
- PowerShell scripting
- Windows Server technologies
- Group Policy
- Microsoft SQL Server (basics)
- PKI certificates for SCCM
- Windows Update services
- Microsoft Intune (basics)

## Typical Day-to-Day Activities

- Creating and testing application packages
- Managing software update deployments
- Configuring operating system deployment tasks
- Monitoring SCCM infrastructure health
- Troubleshooting client deployment issues
- Creating collections and queries
- Managing configuration baselines
- Generating reports on deployment status
- Supporting image creation and maintenance
- Documenting SCCM configurations
- Assisting with endpoint support escalations

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| SCCM infrastructure availability and health | ≥99.9% (proposed) | Monthly |
| Application deployment success rates | — | — |
| Software update compliance percentages | — | — |
| Operating system deployment reliability | — | — |
| Client health metrics | — | — |
| Configuration baseline compliance | ≥95% (proposed) | Monthly |
| Owned documentation reviewed and current within the agreed review cycle (%) | ≥95% (proposed) | Quarterly |
| Issue resolution time for SCCM-related problems | — | — |
| Endpoint inventory accuracy | — | — |
| Knowledge-sharing contributions published or presented (count per quarter) | ≥1 per quarter (proposed) | Quarterly |

## Remote Work Considerations

- **Remote Eligibility:** Hybrid; primarily remote for SCCM console management, deployment authoring, and compliance reporting; occasional on-site for OS deployment testing and image validation in hardware lab
- **Collaboration Tools:** Microsoft Teams, Jira, SCCM/ConfigMgr console, PowerShell, and Microsoft Intune Admin Centre
- **On-Site Requirements:** Periodic lab access for OSD task sequence testing, image creation, and Autopilot hardware validation
- **Time Zone Flexibility:** Standard business hours with availability for software update deployment windows and maintenance activities
- **On-Call / Operational Demands:** On-call for critical SCCM infrastructure failures, mass deployment failures, or software update deployment issues affecting business operations

## Career Development Path

**Previous Roles:**

- Desktop Support Technician
- IT Support Specialist
- Windows Administrator
- Junior Systems Administrator
- Help Desk Technician

**Potential Next Roles:**

- SCCM Senior Engineer
- Endpoint Management Specialist
- Windows Systems Administrator
- Cloud Endpoint Manager
- Desktop Engineering Lead

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft 365 Certified: Modern Desktop Administrator Associate
- Microsoft Certified: Windows Server
- Microsoft Certified: Azure Administrator Associate
- CompTIA A+
- ITIL Foundation
- PowerShell certifications
- Microsoft Certified: Endpoint Manager Administrator
- Microsoft 365 Security Administration

**Complementary Certifications:**

- Microsoft 365 Certified: Modern Desktop Administrator Associate, CompTIA A+, and ITIL 4 Foundation

**Learning Resources & Communities:**

- Microsoft Learn ConfigMgr documentation (learn.microsoft.com/mem/configmgr), Microsoft Tech Community SCCM/ConfigMgr forums, Patch My PC blog, Deployment Research blog (deploymentresearch.com), and PowerShell Gallery for ConfigMgr automation modules
