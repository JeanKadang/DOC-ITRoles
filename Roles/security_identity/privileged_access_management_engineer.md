# Privileged Access Management Engineer

| Field | Value |
|---|---|
| **Domain** | Security & Identity |
| **Chapter:** | Security & Identity |
| **Role Level** | Engineer |
| **Reports To** | Privileged Access Management Architect |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Privileged Access Management (PAM) Engineer implements, operates, and maintains the organisation's PAM platform and associated privileged access controls. This role is responsible for on-boarding privileged accounts to vaulting solutions, configuring session management, maintaining platform health, and supporting IT operational teams in adopting JIT and zero-standing-privilege workflows. The PAM Engineer is a hands-on specialist who ensures the PAM platform is reliable, correctly configured, and actively covering the organisation's privileged attack surface.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of PAM onboarding, vaulting operations, and access support tasks
- **Experience Anchor:** 3-5 years in PAM or identity security engineering — operates independently within the PAM Architect's reference architecture
- **Out of Scope:** PAM architecture and vaulting strategy (Architect-owned); standard identity lifecycle provisioning (Identity Engineers-owned, this role coordinates with it); broader security incident investigation (Security Operations-owned, this role shares audit logs and alerts with it)
- **Escalates To:** Privileged Access Management Architect — design-level issues and platform limitations
- **Escalated To By:** IT Operations / System Administrators on PAM access support and on-boarding requests

## Business Impact

- **Business Objective:** Ensure privileged credentials are vaulted, audited, and controlled, reducing credential theft risk and satisfying compliance requirements for privileged access governance.
- **Value Metrics:** Account on-boarding velocity, platform uptime, session audit completeness, credential rotation compliance rate, PAM-related compliance findings (trend: zero findings).
- **Key Stakeholders:** IT Operations, Security Operations, Compliance, Application teams, System Administrators.
- **Processes Supported:** Privileged account lifecycle, JIT access provisioning, privileged session recording, credential rotation, compliance evidence collection.

## Key Responsibilities

- On-board privileged accounts (Windows, Linux, network devices, databases, cloud) to the PAM vaulting platform.
- Configure and maintain privileged session management (PSM) proxy connections for admin access workflows.
- Implement and manage credential rotation policies and automatic password management.
- Administer the PAM platform: CyberArk EPV/PVWA/PSM/CPM, BeyondTrust, or Delinea Secret Server.
- Configure and manage Microsoft Entra ID Privileged Identity Management (PIM) role assignments and access reviews.
- Monitor PAM platform health, alerts, and audit logs; escalate anomalies to Security Operations.
- Support IT administrators in adopting PAM-mediated access workflows and resolving connectivity issues.
- Maintain PAM safe and policy structures aligned to governance standards.
- Conduct regular privileged account discovery and reconciliation to identify accounts not yet on-boarded.
- Generate compliance reports for audit and regulatory purposes.
- Document PAM configurations, on-boarding procedures, and troubleshooting runbooks.
- Participate in incident response when credential compromise or privileged access abuse is suspected.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Day-to-day PAM platform administration and account on-boarding | PAM architecture and platform design (with PAM Architect) |
| Credential rotation configuration and scheduling | Risk acceptance for unvaulted accounts (with CISO) |
| Platform monitoring and health maintenance | On-boarding priority for account categories |
| Compliance report generation and audit artefact collection | Tooling procurement decisions |

## Required Skills & Qualifications

**Technical Skills:**

- Hands-on experience administering CyberArk, BeyondTrust, or Delinea/Thycotic PAM platforms.
- Working knowledge of Microsoft Entra ID PIM role activation, assignment, and access review configuration.
- Understanding of Windows and Linux privileged account types, service accounts, and local admin accounts.
- Familiarity with database privileged access (SQL Server SA, Oracle SYS) and application account types.
- Experience with network device account management (Cisco, Juniper, F5 integration with PAM).
- Basic understanding of cloud IAM privileged accounts: Azure RBAC Owner/Contributor, AWS Administrator roles.
- Scripting skills in PowerShell or Python for PAM automation and reporting tasks.
- Understanding of PAM audit log formats and SIEM integration.

**Soft Skills and Leadership:**

- Patient and service-oriented approach to supporting operational teams in adopting PAM workflows.
- Strong attention to detail for compliance reporting and account management.
- Good written communication for runbooks and documentation.

**Technology Proficiency Levels:**

- **Expert level required:** CyberArk EPV/PVWA/PSM/CPM, Microsoft Entra ID PIM, Active Directory (service account management)
- **Proficient level required:** Microsoft Sentinel (SIEM/audit), PowerShell/Python automation, BeyondTrust/Delinea (PAM)
- **Working Knowledge required:** Network device management (Cisco/Juniper PAM), Database PAM (SQL Server/Oracle)
- **Awareness level expected:** HashiCorp Vault (DevOps secrets), CyberArk Conjur

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| PAM Architect | Receive architecture direction; escalate design-level issues and platform limitations | Escalates To |
| IT Operations / System Administrators | Provide PAM access support and on-boarding assistance | Provides To |
| Security Operations | Share audit logs and alert on privileged access anomalies | Collaborates |
| Compliance / Audit | Produce access reports and attestation evidence | Provides To |
| Identity Engineers | Coordinate on Entra ID PIM and access lifecycle alignment | Collaborates |

## Key Technologies

- CyberArk EPV, PVWA, PSM, CPM (or BeyondTrust / Delinea equivalent)
- Microsoft Entra ID Privileged Identity Management (PIM)
- PowerShell / Python for PAM automation
- Active Directory (service account management)
- SIEM platforms (Sentinel, Splunk) for audit log review
- Network device management (Cisco, Juniper)
- Database privileged account management (SQL Server, Oracle)

## Typical Day-to-Day Activities

- Processing privileged account on-boarding requests from IT teams.
- Reviewing PAM platform health dashboards and resolving alerts.
- Investigating and remediating failed credential rotation tasks.
- Supporting administrators who cannot connect through PSM proxy sessions.
- Running account discovery scans and reconciling results against PAM inventory.
- Producing weekly compliance and audit reports.
- Updating runbooks and on-boarding documentation.
- Participating in regular access reviews and certifications.

## Key Performance Indicators

- Privileged account on-boarding rate (accounts added per sprint/month)
- Credential rotation success rate (target: >99%)
- PAM platform availability (target: 99.9%+)
- Open privileged account discovery findings (trend: decreasing)
- Compliance audit findings related to PAM (target: zero)
- Session recording completeness rate

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; PAM platforms are managed remotely.
- **Collaboration Tools:** Microsoft Teams, ServiceNow, Jira, PAM admin consoles.
- **On-Site Requirements:** Rare; may need on-site access for break-glass account testing or disaster recovery activities.
- **Time Zone Flexibility:** Standard business hours; break-glass scenarios may require out-of-hours response.
- **On-Call / Operational Demands:** May be on-call for PAM platform outages blocking critical system access (high severity, rare events).

## Career Development Path

**Previous Roles:**

- Identity and Access Management Engineer
- Systems / Infrastructure Administrator
- Security Operations Analyst

**Potential Next Roles:**

- PAM Senior Engineer
- PAM Architect
- Identity Management Architect
- Security Engineer

## Recommended Certifications & Learning Paths

**Core Certifications:**

- CyberArk Defender (or equivalent vendor certification for BeyondTrust/Delinea)
- Microsoft Certified: Identity and Access Administrator Associate (SC-300)

**Complementary Certifications:**

- CompTIA Security+
- ITIL 4 Foundation
- Microsoft Certified: Security Operations Analyst Associate (SC-200)

**Learning Resources and Communities:**

- CyberArk University learning portal
- Microsoft Learn - Entra ID PIM learning path
- NIST SP 800-53 IA and AC control families
- CyberArk Community forums
