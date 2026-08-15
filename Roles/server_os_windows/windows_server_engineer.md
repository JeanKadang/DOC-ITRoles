# Windows Server Engineer

| Field | Value |
|---|---|
| **Role ID** | `windows-server-engineer` |
| **Domain** | Windows Server OS |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Engineer |
| **Reports To** | Windows Server Senior Engineer |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Windows Server Engineer implements and maintains Tier 1 Windows Server environments across the organization, excluding Tier 0 infrastructure (domain controllers and servers involved in directory services) which falls under the exclusive responsibility of the Directory Services team.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of Windows server deployment and configuration tasks to defined standards
- **Experience Anchor:** 1-3 years in Windows systems engineering — works under guidance, building toward independent delivery
- **Out of Scope:** Windows architecture and solution design (Senior Engineers and the Architect-owned); server hardware deployment ownership (Server Hardware Engineers-owned, this role coordinates with it); monitoring platform implementation ownership (Observability Engineers-owned, this role coordinates with it)
- **Escalates To:** Windows Server Architect — implementation detail questions
- **Escalated To By:** other platform engineers on integration point coordination

## Business Impact

- **Business Objective:** Implements and maintains Tier 1 Windows Server environments ensuring reliable OS operations, security compliance, and stable infrastructure supporting business applications and services
- **Value Metrics:** Server availability, patch compliance rate, incident resolution time, provisioning turnaround, change success rate
- **Key Stakeholders:** Application teams, service desk, server hardware engineers, observability engineers, security teams
- **Processes Supported:** Server provisioning and configuration, patch and lifecycle management, AD user/group management, file share administration, monitoring, change management

## Key Responsibilities

- Install and configure Windows Server operating systems and related services
- Implement group policies and security configurations following established standards
- Manage Active Directory services including users, groups, and OUs
- Execute server patching and updates according to maintenance schedules
- Troubleshoot and resolve Windows Server-related incidents and problems
- Implement backup and recovery procedures for Windows environments
- Assist in server migrations and upgrades
- Document configurations, procedures, and operational processes

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Tier 1 Windows Server provisioning, OS configuration, and routine maintenance within established standards | Architecture and advanced design decisions for Windows environments |
| Patch management execution, WSUS administration, and change documentation | HA design and clustering configuration |
| AD user/group management and GPO configuration execution within defined policies | Automation and scripting strategy, security governance |

## Required Skills & Qualifications

**Technical Skills:**

- Experience with Windows Server administration (2016, 2019, 2022, 2025)
- Knowledge of Active Directory and Group Policy management
- Understanding of Windows security principles and best practices
- Familiarity with PowerShell scripting for automation
- Experience with Windows server roles and features
- Basic understanding of networking concepts in Windows environments
- ITIL knowledge for incident and problem management
- Relevant certifications (Microsoft Certified: Windows Server, etc.)

**Soft Skills and Leadership:**

- Communicates server status, incident progress, and configuration documentation clearly to senior engineers, application teams, and the service desk requesting Windows environment support
- Collaborates effectively with hardware, observability, security, and application teams to fulfil server provisioning, patching, and change management requirements
- Applies systematic troubleshooting to diagnose Windows Server availability, performance, and configuration issues, escalating complex problems to senior engineers with organised context

**Technology Proficiency Levels:**

**Expert level required:**

- Windows Server (2016/2019/2022) administration
- Active Directory user/group/OU management
- Group Policy configuration and troubleshooting
- WSUS patch management

**Proficient level required:**

- PowerShell scripting for Windows administration
- DNS and DHCP management
- Windows File Services and DFS
- IIS and Remote Desktop Services

**Working Knowledge required:**

- Windows Firewall and security features
- Windows Backup and recovery tools
- Hyper-V virtualization basics

**Awareness level expected:**

- Azure Arc management basics
- PowerShell DSC concepts
- Windows Server containers

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Windows Server Product Owner | Task prioritization and delivery | Consumes From |
| Server Hardware Engineers | Physical server deployments | Collaborates |
| Observability Engineers | Monitoring implementation | Collaborates |
| Windows Server Architect | Implementation details | Escalates To |
| other platform engineers | Integration points | Collaborates |

## Key Technologies

- Windows Server operating systems (2016-2022)
- Active Directory user and group management
- Group Policy management and implementation
- Windows Server roles and features
- Windows PowerShell for administration
- Domain Name System (DNS) and DHCP
- Windows File Services and DFS
- Internet Information Services (IIS)
- Windows Server Update Services (WSUS)
- Windows Backup and recovery tools
- Remote Desktop Services
- Windows Firewall and security features

## Typical Day-to-Day Activities

- Installing and configuring Windows Server operating systems
- Managing user accounts and group memberships in Active Directory
- Implementing Group Policy settings for system management
- Deploying and configuring server roles and features
- Performing routine server patching and maintenance
- Troubleshooting Windows Server operational issues
- Managing file shares and permissions
- Implementing backup and recovery procedures
- Creating and updating technical documentation
- Responding to user service requests

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Windows Server availability and reliability metrics | ≥99.9% (proposed) | Monthly |
| Patch compliance percentages | ≥95% (proposed) | Monthly |
| Time to implement standard server configurations | — | — |
| Service request resolution time | — | — |
| Owned documentation reviewed and current within the agreed review cycle (%) | ≥95% (proposed) | Quarterly |
| Group Policy implementation accuracy | — | — |
| Backup success rate and recovery effectiveness | ≥99% (proposed) | Monthly |
| Change implementation success rate | — | — |
| Work conforming to security standards and best practices (%) | ≥95% (proposed) | Quarterly |
| User satisfaction with server services | ≥85% (proposed) | Quarterly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; Windows Server administration is performed through remote management tools
- **Collaboration Tools:** Microsoft Teams, Jira, Windows Admin Center, RSAT, PowerShell, WSUS management console, monitoring dashboards
- **On-Site Requirements:** Occasional on-site for physical server commissioning or hardware-connected tasks in the data centre
- **Time Zone Flexibility:** Core business hours aligned with server operations team
- **On-Call / Operational Demands:** On-call rotation for Windows Server availability incidents impacting business applications and user services

## Career Development Path

**Previous Roles:**

- IT Support Specialist
- Desktop Support Technician
- Junior Systems Administrator
- IT Helpdesk Specialist

**Potential Next Roles:**

- Windows Server Senior Engineer
- Systems Administrator Team Lead
- Microsoft Technology Specialist
- Cloud Platform Engineer
- Infrastructure Project Engineer

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Windows Server
- CompTIA Server+
- Microsoft 365 Certified: Modern Desktop Administrator Associate
- Microsoft Azure Fundamentals
- ITIL Foundation
- PowerShell certification
- Basic security certifications (Security+)
- Microsoft Certified: Identity and Access Administrator Associate

**Complementary Certifications:**

- CompTIA Server+, Microsoft Azure Fundamentals (AZ-900), ITIL 4 Foundation, and CompTIA Security+ (foundational security knowledge for server hardening)

**Learning Resources & Communities:**

- Microsoft Learn (learn.microsoft.com), Windows Server documentation, Petri.com Windows Server content, Spiceworks Windows community, and Microsoft Tech Community
