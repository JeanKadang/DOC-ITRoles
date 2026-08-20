# Privileged Access Management Architect

| Field | Value |
|---|---|
| **Role ID** | `privileged-access-management-architect` |
| **Domain** | Security & Identity |
| **Chapter:** | Security & Identity |
| **Role Level** | Architect |
| **Reports To** | Security & Identity Chapter Lead <!-- role: security-and-identity-chapter-lead --> |
| **Direct Reports** | None (sets technical direction and mentors the Privileged Access Management Engineer; formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Privileged Access Management (PAM) Architect designs, governs, and evolves the organisation's strategy and technical architecture for securing privileged credentials, accounts, and access paths across on-premises, cloud, and hybrid environments. Privileged access - administrative accounts, service accounts, API keys, and secrets - represents the highest-value attack surface in any organisation. This role ensures that privileged access is vaulted, just-in-time, audited, and aligned to Zero Trust principles, preventing lateral movement and credential-based attacks.

## Role Scope & Boundaries

- **Scope of Influence:** Domain-wide — privileged access management (PAM) architecture, vaulting strategy, and just-in-time access patterns across the chapter
- **Experience Anchor:** 8+ years in PAM or identity security architecture with demonstrated architecture-level delivery — operates independently on domain-wide PAM architecture decisions
- **Out of Scope:** Standard identity lifecycle management (Identity Management Architect-owned, this role coordinates PIM/governance integration with it); enterprise security risk framework (Security Architect / CISO-owned, this role aligns PAM strategy to it); cloud landing zone design (Cloud Architects-owned, this role defines privileged access patterns within it)
- **Escalates To:** Security & Identity Chapter Lead — chapter-wide priorities and cross-domain investment decisions
- **Escalated To By:** the Privileged Access Management Engineer on design-level issues and platform limitations

## Business Impact

- **Business Objective:** Eliminate standing privileged access and credential exposure, reducing the blast radius of compromised accounts and satisfying regulatory requirements for privileged access controls.
- **Value Metrics:** Percentage of privileged accounts on-boarded to PAM vaulting, standing access reduction (trend to zero), privileged session audit coverage, mean time to detect and respond to credential misuse, compliance audit pass rate for PAM controls.
- **Key Stakeholders:** CISO, Identity Architect, IT Operations, Compliance and Audit, Application Teams, Cloud Platform teams.
- **Processes Supported:** Privileged account lifecycle management, just-in-time (JIT) access provisioning, privileged session recording and audit, secrets management, regulatory compliance (SOX, PCI-DSS, ISO 27001, NIST).

## Key Responsibilities

- Design the enterprise PAM architecture encompassing credential vaulting, just-in-time access, privileged session management, and secrets management.
- Lead the selection, design, and implementation of PAM platforms (CyberArk, BeyondTrust, Delinea/Thycotic, Microsoft PIM/Entra ID Governance).
- Define PAM coverage requirements across Windows, Linux, cloud platforms (Azure, AWS, GCP), network infrastructure, databases, and application service accounts.
- Design just-in-time and just-enough-access (JIT/JEA) models to eliminate standing administrative access.
- Architect privileged session recording and audit capabilities for compliance and forensic requirements.
- Define secrets management architecture for application credentials, API keys, and certificate management.
- Integrate PAM architecture with Microsoft Entra ID Privileged Identity Management (PIM), Conditional Access, and SIEM/SOAR platforms.
- Establish PAM governance framework: account discovery, on-boarding standards, review cycles, and decommissioning processes.
- Define PAM architecture for cloud privileged access: AWS IAM roles, Azure RBAC, GCP IAM with JIT overlays.
- Provide technical governance over PAM platform operations and ensure platform availability and resilience.
- Mentor PAM engineers and guide cross-domain teams on privileged access principles.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| PAM platform architecture and technology selection | Risk acceptance decisions for uncovered privileged accounts (with CISO) |
| JIT/JEA model design and access workflow standards | Cloud IAM architecture (with Cloud Architects) |
| Secrets management strategy and integration patterns | Compliance and audit requirements interpretation (with Compliance team) |
| PAM governance framework and on-boarding standards | Organisational change management for JIT adoption |
| Integration architecture with SIEM and identity platforms | Budget allocation for PAM tooling |

## Required Skills & Qualifications

**Technical Skills:**

- Expert knowledge of enterprise PAM platforms: CyberArk (EPV, PSM, PVWA, CPM), BeyondTrust, Delinea/Thycotic Secret Server, Senhasegura.
- Deep understanding of Microsoft Entra ID Privileged Identity Management (PIM) and Entra ID Governance.
- Experience with just-in-time access models and zero standing privilege architecture.
- Knowledge of privileged access for Linux/Unix: sudo management, SSH key vaulting, UNIX connector configurations.
- Experience with cloud IAM privileged access: AWS IAM role assumption, Azure RBAC, GCP Impersonation with JIT overlay.
- Understanding of secrets management integration patterns: CyberArk Conjur, HashiCorp Vault, Azure Key Vault.
- Knowledge of session recording, audit logging, and SIEM integration for privileged session monitoring.
- Familiarity with MITRE ATT&CK framework privilege escalation and credential access techniques.
- Experience with regulatory frameworks requiring PAM controls: SOX, PCI-DSS, ISO 27001, IEC 62443, NIST SP 800-53, CIS Controls.

**Soft Skills and Leadership:**

- Ability to communicate the business and risk case for PAM investment to executive stakeholders.
- Experience managing organisational resistance to JIT access model adoption.
- Strong documentation and governance framework design skills.
- Ability to influence operations teams to on-board privileged accounts to PAM platforms.

**Technology Proficiency Levels:**

**Expert level required:**

- CyberArk PAM Suite (EPV/PSM/PVWA/CPM/AIM)
- Microsoft Entra ID PIM
- BeyondTrust Password Safe

**Proficient level required:**

- HashiCorp Vault/CyberArk Conjur (DevOps secrets)
- Microsoft Sentinel (SIEM)
- Azure Key Vault

**Working Knowledge required:**

- Delinea/Thycotic Secret Server
- Endpoint Privilege Management (EPM/BeyondTrust EPM)

**Awareness level expected:**

- BeyondTrust Privileged Remote Access
- AWS Secrets Manager

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Identity Management Architect <!-- role: identity-management-architect --> | Coordinate on Entra ID PIM, access governance, and identity lifecycle integration | Collaborates |
| Security Architect / CISO | Align PAM strategy with enterprise security architecture and risk management | Governed By |
| Cloud Architects (Azure, AWS, GCP) | Define cloud-native privileged access patterns and JIT models | Collaborates |
| IT Operations / Sysadmins | Drive on-boarding of server and infrastructure privileged accounts | Provides To |
| Database Administrators | On-board database privileged credentials to PAM vaulting | Provides To |
| Compliance / Audit <!-- external-role --> | Provide PAM control evidence and attestation for regulatory requirements | Provides To |

## Key Technologies

- CyberArk PAM Suite (EPV, PSM, PVWA, CPM, AIM)
- BeyondTrust Privileged Remote Access and Password Safe
- Delinea / Thycotic Secret Server
- Microsoft Entra ID Privileged Identity Management (PIM)
- Microsoft Entra ID Governance
- HashiCorp Vault (secrets management)
- Azure Key Vault / AWS Secrets Manager
- SIEM integration: Microsoft Sentinel, Splunk, QRadar
- CyberArk Conjur (DevOps secrets)
- Endpoint Privilege Management (EPM / BeyondTrust EPM)

## Typical Day-to-Day Activities

- Reviewing PAM platform health dashboards and account on-boarding progress.
- Designing new JIT access workflows for specific platforms or application tiers.
- Collaborating with compliance team on audit evidence collection for PAM controls.
- Evaluating new features in PAM platforms and planning adoption.
- Supporting PAM engineers with complex on-boarding or integration challenges.
- Reviewing and approving exceptions to zero-standing-access policy.
- Producing PAM architecture documentation and governance framework updates.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Percentage of privileged accounts vaulted in PAM (target: 100% of in-scope accounts) | 100% | — |
| Standing privileged access reduction (trend to zero standing admin accounts) | — | — |
| Privileged session audit coverage (target: 100% of production privileged access) | 100% | — |
| JIT access adoption rate across administrative populations | — | — |
| PAM platform availability (target: 99.9%+) | 99.9% | — |
| Time to on-board newly discovered privileged accounts | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible for architecture and governance work.
- **Collaboration Tools:** Microsoft Teams, Confluence, Jira, CyberArk/BeyondTrust admin consoles.
- **On-Site Requirements:** Occasional on-site for data centre privileged access validation or disaster recovery testing.
- **Time Zone Flexibility:** Standard business hours; global PAM programmes may require cross-timezone collaboration.
- **On-Call / Operational Demands:** May be included in escalation path for PAM platform outages that block administrative access to critical systems.

## Career Development Path

**Previous Roles:**

- Identity Management Architect <!-- role: identity-management-architect -->
- Security Architect <!-- role: security-architect -->
- Senior PAM Engineer (CyberArk/BeyondTrust specialism)
- Senior Sysadmin / Infrastructure Engineer with security focus

**Potential Next Roles:**

- Enterprise Security Architect
- CISO (security leadership track)
- Identity and Access Management Director

## Recommended Certifications & Learning Paths

**Core Certifications:**

- CyberArk Defender and/or CyberArk Guardian (vendor certification)
- BeyondTrust Certified Administrator (if BeyondTrust platform)
- Microsoft Certified: Identity and Access Administrator Associate (SC-300)

**Complementary Certifications:**

- CISSP or CISM
- Certified Information Security Manager (CISM)
- SC-100 Microsoft Cybersecurity Architect Expert

**Learning Resources and Communities:**

- CyberArk University learning platform
- The PAM Institute resources
- NIST SP 800-53 AC and IA control families
- MITRE ATT&CK - Credential Access and Privilege Escalation techniques
