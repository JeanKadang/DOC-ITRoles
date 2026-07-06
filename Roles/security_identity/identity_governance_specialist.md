# Identity and Access Governance Specialist

| Field | Value |
|---|---|
| **Domain** | Security Identity |
| **Chapter:** | Security & Identity |
| **Role Level** | Senior Engineer |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Identity and Access Governance Specialist owns the Identity Governance and Administration (IGA) function across the organisation — the operational and technical layer that answers the question: who has what access, and is it appropriate? This role is distinct from the Identity Management Senior Engineer (which focuses on authentication protocols, federation, and SSO): the Identity and Access Governance Specialist focuses on the governance layer — designing and operating access certification campaigns, entitlement management catalogues, role mining and RBAC/ABAC engineering, Joiner/Mover/Leaver (JML) lifecycle automation, and Segregation of Duties (SoD) enforcement. The Specialist operates IGA platforms (SailPoint IdentityNow/IIQ, Saviynt, Omada Identity, Microsoft Entra ID Governance) and integrates them with HR systems (Workday, SAP) to drive fully automated, auditable, and compliant identity lifecycle processes at enterprise scale.

## Business Impact

- **Business Objective:** Ensure that every user in the organisation holds only the access they are entitled to for their current role — enforcing least privilege through automated lifecycle provisioning, regular access certification, SoD controls, and rapid revocation — reducing the organisation's insider risk exposure, audit finding rate, and manual identity administration overhead.
- **Value Metrics:** Access certification campaign completion rate, orphaned account elimination rate, SoD violation remediation time, JML process automation percentage, over-privileged account reduction rate, IGA platform provisioning accuracy and timeliness, audit finding rate attributable to access control gaps.
- **Key Stakeholders:** Identity Management Architect, Privileged Access Management Architect/Engineer, Security Architect, CISO / Security leadership, HR systems teams, application owners, Compliance and Risk team, internal and external auditors.
- **Processes Supported:** Joiner/Mover/Leaver (JML) identity lifecycle, periodic access certification and recertification campaigns, entitlement management and access request fulfilment, role-based and attribute-based access control design, Segregation of Duties policy enforcement, audit evidence collection for identity and access controls, regulatory compliance reporting (SOX, ISO 27001, SOC 2).

## Key Responsibilities

- Design, configure, and operate access certification campaigns across IGA platforms (SailPoint IdentityNow/IIQ, Saviynt, Omada Identity, Microsoft Entra ID Governance) — ensuring campaigns are scheduled, completed on time, and results actioned within defined SLAs.
- Own entitlement management: maintain the entitlement catalogue, define access packages, configure request and approval workflows, and ensure entitlements are accurately mapped to roles and business functions.
- Lead role mining and role engineering initiatives — analysing existing access patterns across enterprise applications to design RBAC role structures and ABAC policy definitions that reflect least-privilege principles.
- Design, implement, and continuously improve Joiner/Mover/Leaver (JML) lifecycle automation — integrating IGA platforms with HR systems (Workday, SAP) to trigger provisioning, role change, and deprovisioning workflows automatically from HR events.
- Define, configure, and enforce Segregation of Duties (SoD) policies within the IGA platform — maintaining the SoD rule set, reviewing violations, orchestrating remediation workflows, and producing SoD compliance reports for audit.
- Operate and maintain IGA platform health: manage connector configurations, integration uptime, provisioning queue monitoring, and escalation of platform incidents to vendors or internal platform teams.
- Partner with application owners to onboard enterprise applications into the IGA platform — designing role and entitlement models, configuring provisioning connectors, and establishing ownership and review workflows for each application.
- Produce audit-ready identity governance reports and evidence packages — providing access certification results, SoD violation logs, JML process completion records, and orphaned account remediation evidence for internal audits and external regulatory assessments.
- Drive continuous improvement of IGA automation coverage — identifying manual identity administration processes still performed outside the IGA platform and building structured plans to automate them.
- Collaborate with the Privileged Access Management Architect/Engineer to ensure privileged account entitlements are accurately represented in the IGA governance layer and subject to appropriate certification and SoD controls.

## Key Decisions and Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| IGA platform configuration, access certification campaign design, scheduling, and execution | IGA platform selection and identity governance architecture strategy (owned by Identity Management Architect) |
| Entitlement catalogue management, access package definitions, and request/approval workflow configuration | Enterprise application access control design and application-side role structures (owned by application owners) |
| SoD rule set definition, violation tracking, remediation SLA management, and SoD compliance reporting | Overall security control framework and regulatory compliance obligations (owned by Security Architect and Compliance team) |
| JML lifecycle automation design, HR system integration configuration, and provisioning/deprovisioning workflow ownership | HR data governance, HR system architecture, and HR process design (owned by HR and HRIS teams) |
| Role mining analysis, RBAC/ABAC role engineering recommendations, and IGA role model maintenance | Privileged account entitlement governance strategy (co-owned with PAM Architect/Engineer) |
| IGA platform operational health: connector monitoring, provisioning queue management, and platform incident escalation | PAM vault and privileged session management configuration (owned by PAM Architect/Engineer) |

## Required Skills

**Technical Skills:**

- Hands-on operational experience with one or more enterprise IGA platforms: SailPoint IdentityNow or IdentityIQ (IIQ), Saviynt Enterprise Identity Cloud, Omada Identity, or Microsoft Entra ID Governance (access reviews, entitlement management, lifecycle workflows).
- Strong understanding of identity governance concepts: access certification, entitlement management, role mining, RBAC and ABAC design patterns, SoD policy construction, and identity lifecycle automation.
- Experience integrating IGA platforms with HR systems (Workday, SAP SuccessFactors) as authoritative sources for JML triggers — including attribute mapping, event-driven provisioning, and deprovisioning workflows.
- Proficiency configuring provisioning connectors and managing application onboarding into the IGA platform — covering SCIM, REST API, flat-file, and PowerShell connector types.
- Working knowledge of Microsoft Entra ID (Azure AD) — group management, directory roles, dynamic membership rules, and the Entra ID Governance access review and entitlement management capabilities.
- Understanding of SoD frameworks: common cross-application SoD conflicts (e.g., financial systems, ERP), SoD rule taxonomy design, and compensating control documentation for SoD exceptions.
- Familiarity with privileged access management concepts (CyberArk, Entra PIM) as they relate to governance — ensuring privileged identities are included in certification scope and SoD analysis.
- Ability to produce structured governance reports, certification result exports, and audit evidence packages suitable for ISO 27001, SOC 2, and SOX compliance assessments.
- Scripting proficiency (PowerShell, Python, or BeanShell/Java for SailPoint IIQ) for IGA workflow customisation, connector scripting, and governance reporting automation.

**Soft Skills & Leadership:**

- Strong stakeholder management: ability to drive access certification completion and SoD remediation urgency with application owners and business managers who are not security specialists.
- Clear, structured communication for translating IGA findings and governance obligations into plain language for HR teams, application owners, and audit stakeholders.
- Methodical and detail-oriented approach to entitlement cataloguing, SoD rule maintenance, and audit evidence management — governance work demands precision and traceability.

**Technology Proficiency Levels:**

- **Expert level required:** SailPoint IdentityNow/IdentityIQ, Microsoft Entra ID Governance, Saviynt Enterprise Identity Cloud
- **Proficient level required:** Microsoft Entra ID (Azure AD), ServiceNow (access request/SoD), PowerShell/Python
- **Working Knowledge required:** Workday/SAP SuccessFactors (HR integration), CyberArk Identity (PAM-IGA)
- **Awareness level expected:** Omada Identity, AI-driven identity governance tools

## Qualifications

- **Education:** Bachelor's degree in Information Security, Computer Science, Information Systems, or a related field; or equivalent demonstrated professional experience.
- **Experience:** 5–7 years of experience in identity and access management, IAM engineering, or information security; at least 3 years with direct hands-on IGA platform operations (SailPoint, Saviynt, Omada, or Microsoft Entra ID Governance) in an enterprise environment.
- **Certifications:** Microsoft Certified: Identity and Access Administrator Associate (SC-300), SailPoint IdentityNow Certified Engineer, ISACA Certified Information Systems Auditor (CISA), ISC2 Certified Cloud Security Professional (CCSP), CyberArk Trustee.

## Interactions

| Role | Nature of Interaction |
|---|---|
| Security Architect | SoD policy alignment with the broader security control framework, risk acceptance processes for SoD exceptions, and audit preparation for identity governance controls |
| application owners | The enterprise to onboard applications into the IGA platform, design entitlement models and role structures, and maintain application-specific certification and SoD configurations |
| Compliance and Risk team | Identity governance evidence, access certification results, and SoD compliance reports in support of ISO 27001, SOC 2, SOX, and regulatory assessments |
| Internal and external audit teams | Identity governance evidence, access certification results, and SoD compliance reports in support of ISO 27001, SOC 2, SOX, and regulatory assessments |
| Access Management Senior Engineer | Identity engineering team on entitlement provisioning integration — ensuring IGA-driven provisioning events are correctly executed at the application and directory layer |
| CyberArk Identity | Or equivalent identity governance tooling to ensure that identity lifecycle events from the IGA platform are reflected in privileged account and vault membership management |
| Identity Management Architect | — operates IGA platforms within the enterprise identity architecture framework and escalates platform or design decisions requiring architectural guidance |
| Privileged Access Management (PAM) Architect and Engineer | Ensure privileged account entitlements are included in IGA certification scope, SoD analysis, and JML deprovisioning workflows — maintaining a unified governance view across standard and privileged identities |
| HR systems teams | (Workday, SAP HRIS owners) to maintain JML integration reliability — managing attribute mapping updates, HR event trigger configurations, and data quality issues that affect automated provisioning |

## Key Technologies

- SailPoint IdentityNow (cloud IGA — access certification, entitlement management, lifecycle automation, SoD)
- SailPoint IdentityIQ (IIQ) (on-premises IGA platform — role engineering, certification campaigns, custom workflows)
- Saviynt Enterprise Identity Cloud (converged IGA and PAM governance, cloud-first IGA platform)
- Omada Identity (IGA with strong SoD and role management capabilities)
- Microsoft Entra ID Governance (access reviews, entitlement management, lifecycle workflows, PIM integration)
- CyberArk Identity (PAM-integrated identity governance and lifecycle management)
- Workday and SAP SuccessFactors (HR authoritative source integration for JML trigger automation)
- Microsoft Entra ID (Azure AD) (directory, group management, SCIM provisioning, and governance integration)
- ServiceNow (access request fulfilment integration, SoD exception management, and governance ticketing workflows)
- PowerShell and Python (IGA connector scripting, governance reporting automation, and HR integration data transformation)

## Typical Day-to-Day Activities

- Monitoring active access certification campaigns — tracking completion progress, chasing overdue reviewers, resolving certification exceptions, and ensuring revocations from completed campaigns are actioned within SLA.
- Reviewing and actioning the IGA provisioning queue — investigating failed provisioning or deprovisioning events, diagnosing connector issues, and ensuring JML lifecycle events are fully processed.
- Working with application owners to onboard a new enterprise application into the IGA platform — mapping entitlements, configuring the provisioning connector, defining the access package structure, and setting up the certification workflow.
- Reviewing newly detected SoD violations — triaging against the SoD rule set, communicating remediation requirements to the relevant role holder's manager, and tracking resolution progress through to closure.
- Collaborating with HR systems team on a Workday attribute mapping change triggered by an HR reorganisation — updating IGA integration configuration and validating that JML events are processing correctly post-change.
- Producing a quarterly SoD compliance report and access certification summary for the Compliance and Risk team — extracting results from the IGA platform, formatting audit evidence packages, and reviewing with the Security Architect.
- Conducting role mining analysis on a target application — pulling entitlement usage data, identifying access patterns, proposing a condensed role set, and presenting RBAC design recommendations to application owners.
- Reviewing orphaned account reports — identifying accounts for users who have left the organisation but retain active entitlements, escalating to application owners, and driving revocation within the defined SLA.
- Updating SoD rules in the IGA platform to reflect a new cross-application conflict identified during an internal audit finding — testing rule logic, validating detection accuracy, and publishing to production.
- Staying current with IGA platform release notes, new Microsoft Entra ID Governance capabilities, and evolving identity governance best practices from IDPro and industry sources.

## Key Performance Indicators

- Access certification campaign completion rate: ≥95% of scheduled certification reviews completed by the campaign deadline, with 100% of revocation decisions actioned within 5 business days of campaign close
- Orphaned account elimination rate: ≥98% of identified orphaned accounts revoked or formally risk-accepted within 10 business days of detection
- SoD violation remediation time: ≥90% of SoD violations remediated or compensating controls documented within 15 business days of detection
- JML process automation percentage: ≥90% of Joiner, Mover, and Leaver events processed via automated IGA workflows without manual intervention, measured monthly
- Over-privileged account reduction: quarter-on-quarter reduction in the number of accounts holding entitlements beyond their role-defined access baseline, tracked via role mining and certification outcomes
- IGA provisioning accuracy: ≤1% error rate on automated provisioning and deprovisioning events, measured as failed or incorrectly processed JML workflow events per total events
- Audit finding rate: zero repeat identity governance audit findings across consecutive annual audit cycles; fewer than two new findings per assessment cycle attributable to IGA process or tooling gaps

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — IGA platform operations, certification campaign management, and integration work are entirely tooling and portal-based with no physical infrastructure access requirement.
- **Collaboration Tools:** Microsoft Teams, SailPoint IdentityNow / Saviynt / Omada administration portals, Microsoft Entra ID Governance portal, ServiceNow (access request and exception management), Jira or equivalent (task and issue tracking), Confluence (IGA runbooks and documentation), Workday and SAP integration monitoring dashboards.
- **On-Site Requirements:** None typically; occasional on-site for security or identity governance workshops, internal audit walkthroughs, or HR systems integration sessions.
- **Time Zone Flexibility:** Standard business hours with some flexibility for coordination with HR teams and application owners across different time zones; IGA campaign deadlines may require brief out-of-hours attention during peak audit preparation periods.
- **On-Call / Operational Demands:** Not typically on a rotating on-call schedule; expected to respond to urgent IGA incidents (e.g., JML provisioning outage preventing a new-starter from accessing systems, or emergency deprovisioning of a terminated employee not yet processed) within a defined business-hours SLA, and to critical deprovisioning escalations out-of-hours in defined high-risk scenarios.

## Career Development Path

**Previous Roles:**

- Identity Management Engineer (authentication, SSO, federation background transitioning to governance specialism)
- IAM Analyst or Identity Access Management Specialist with access certification and provisioning experience
- Security Engineer with strong identity and access management exposure
- IT Audit Analyst or Compliance Engineer with identity governance and access review experience
- Access Management Engineer progressing into a governance and senior engineering focus

**Potential Next Roles:**

- Identity Management Architect (broadening from IGA operations to full identity architecture — authentication, federation, and governance)
- Security Cross-Platform Architect (extending from identity governance into broader cross-platform security architecture)
- Head of Identity and Access Management or IAM Practice Lead
- CISO track — Identity and Access Governance leadership or Senior Director of Identity Security

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Identity and Access Administrator Associate (SC-300) — Microsoft Entra ID Governance, access reviews, entitlement management, and lifecycle workflows
- SailPoint IdentityNow Certified Engineer — IGA platform depth for the most widely deployed enterprise IGA platform
- ISACA Certified Information Systems Auditor (CISA) — audit methodology, control frameworks, and evidence standards essential for IGA compliance work
- ISC2 Certified Cloud Security Professional (CCSP) — cloud identity governance, access control, and IGA in cloud-native environments
- CyberArk Trustee — privileged identity governance integration between IGA and PAM platforms

**Complementary Certifications:**

- SailPoint IdentityIQ Engineer certification — on-premises IIQ platform depth for organisations running legacy IGA deployments
- Microsoft Certified: Security Operations Analyst Associate (SC-200) — Defender for Identity and Sentinel integration with identity governance workflows
- ISACA Certified in Risk and Information Systems Control (CRISC) — risk management framework alignment for SoD and access risk governance decisions
- Saviynt Certified Identity Professional — alternative IGA platform expertise for organisations using Saviynt
- CompTIA Security+ — foundational security knowledge useful for practitioners coming from a non-security engineering background

**Learning Resources & Communities:**

- IDPro Body of Knowledge (idpro.org/body-of-knowledge) — authoritative professional reference for identity governance concepts, JML processes, and role engineering
- SailPoint University and SailPoint Developer Community (university.sailpoint.com) — IGA platform training, IdentityNow and IIQ deep-dive courses, and community knowledge base
- Microsoft Learn — Entra ID Governance learning paths (learn.microsoft.com) — access reviews, entitlement management, and lifecycle workflow configuration
- ISACA resources and ISACA community (isaca.org) — CISA study materials, audit methodology, and identity governance audit guidance
- Saviynt Academy and Omada Academy — IGA platform-specific training for practitioners on alternative platforms
- Gartner IGA market research and Magic Quadrant (gartner.com) — strategic context for IGA platform evaluation and capability roadmap planning
- NIST Special Publication 800-53, IEC 62443 (Access Control family) and NIST Cybersecurity Framework — regulatory context for access governance control mapping
- KuppingerCole Identity Management research and webinars — independent IGA analyst content on governance patterns and platform capabilities
