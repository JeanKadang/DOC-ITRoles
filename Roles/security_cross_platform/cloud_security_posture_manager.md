# Cloud Security Posture Manager

| Field | Value |
|---|---|
| **Role ID** | `cloud-security-posture-manager` |
| **Domain** | Security Cross-Platform |
| **Chapter:** | Security & Identity |
| **Role Level** | Senior Engineer |
| **Reports To** | Security & Identity Chapter Lead <!-- role: security-and-identity-chapter-lead --> |
| **Direct Reports** | None (formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Cloud Security Posture Manager implements and operates Cloud Security Posture Management (CSPM) across all cloud platforms — Azure, AWS, and GCP. This role continuously monitors cloud environments for misconfigurations, policy violations, and compliance drift, operating CSPM tooling that provides unified visibility across the organisation's multi-cloud estate. The Cloud Security Posture Manager manages cloud security benchmarks (CIS, NIST CSF, IEC 62443, ISO 27001), tracks compliance posture, and drives structured remediation workflows in partnership with cloud platform teams — ensuring that cloud configurations remain aligned to the organisation's security policy framework and regulatory obligations.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — cloud security posture management (CSPM) tooling, runtime detection policy, and multi-cloud misconfiguration remediation
- **Experience Anchor:** 5+ years in cloud security engineering with demonstrated CSPM/cloud posture ownership — operates independently within the Security Cross-Platform Architect's standards
- **Out of Scope:** Cross-platform security standards design (Security Cross-Platform Architect-owned); pipeline-time policy-as-code rule design (DevSecOps engineers-owned, this role aligns runtime detection to it); cloud landing zone architecture (Cloud Architects-owned, this role triages findings within it)
- **Escalates To:** Security Cross-Platform Architect — architectural-level misconfigurations and posture standard definitions
- **Escalated To By:** Azure, AWS, and GCP Cloud Architects on misconfiguration remediation within their cloud estates

## Business Impact

- **Business Objective:** Continuously reduce the organisation's cloud attack surface by identifying and driving remediation of cloud misconfigurations, policy violations, and compliance drift across the multi-cloud estate — preventing security incidents attributable to misconfigured cloud resources and demonstrating a measurable, auditable compliance posture.
- **Value Metrics:** Number of critical and high-severity cloud misconfigurations open beyond SLA, cloud benchmark compliance score (CIS, NIST) per platform, mean time to remediate (MTTR) cloud security findings by severity, CSPM finding recurrence rate, percentage of cloud resources covered by CSPM tooling, compliance posture score trend across auditable frameworks.
- **Key Stakeholders:** Security Architect, CISO / Security leadership, Cloud Architects (Azure, AWS, GCP), Compliance and Risk team, FinOps team (CSPM tooling cost), DevSecOps and DevOps Architect (shift-left integration), audit and external compliance assessors.
- **Processes Supported:** Cloud security compliance monitoring, misconfiguration remediation lifecycle, cloud security benchmark reporting, security risk management, audit evidence collection, DevSecOps shift-left security integration, cloud change risk assessment.

## Key Responsibilities

- Operate and maintain CSPM tooling across Azure (Microsoft Defender for Cloud), AWS (AWS Security Hub), and GCP (Security Command Center) — and where applicable, unified cross-cloud CSPM platforms (Prisma Cloud, Wiz, Orca Security).
- Continuously monitor cloud environments for misconfigurations, policy violations, publicly exposed resources, over-privileged identities, and encryption gaps across all cloud accounts and subscriptions.
- Manage and maintain cloud security benchmark compliance tracking: CIS Benchmarks (Azure, AWS, GCP), NIST CSF, ISO 27001 cloud controls, and organisation-specific security policies.
- Drive structured remediation workflows with cloud platform teams — triaging findings by severity and risk, assigning ownership, tracking remediation progress, and escalating overdue findings to the Security Architect.
- Configure and tune CSPM policies: suppress false positives, define custom policies for organisation-specific security requirements, and maintain policy-as-code configurations (Azure Policy, AWS Config Rules, GCP Organisation Policies).
- Integrate CSPM findings into the organisation's risk register and compliance reporting processes for Compliance and Risk team consumption.
- Collaborate with DevSecOps and DevOps teams to surface CSPM-equivalent checks earlier in the CI/CD pipeline (shift-left) — reducing the volume of findings reaching production.
- Produce regular cloud security posture reports: executive summary dashboards, trend analysis, benchmark score progression, and per-platform finding summaries.
- Assess the security posture impact of proposed cloud architecture changes, providing input to cloud platform teams during design and review.
- Monitor CSPM tooling cost with FinOps team and ensure platform coverage remains cost-efficient and within agreed budgets.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| CSPM tooling configuration, policy rule set management, and cross-cloud platform operations | Cloud architecture design, resource topology, and infrastructure configuration decisions (owned by Cloud Architects) |
| Cloud benchmark compliance tracking and reporting: CIS, NIST CSF, ISO 27001 cloud controls | Security policy framework and organisation-wide security control requirements (owned by Security Architect) |
| Misconfiguration remediation tracking: finding triage, severity assignment, SLA management, and escalation | Remediation implementation on cloud infrastructure (owned by Cloud Architects and cloud platform engineers) |
| CSPM false positive management, custom policy authoring, and policy-as-code configuration | DevSecOps pipeline design and shift-left security toolchain selection (owned by DevOps Architect) |
| Cloud security posture reporting for compliance, audit, and risk register consumption | Compliance framework selection and regulatory compliance strategy (owned by Compliance and Risk team) |

## Required Skills & Qualifications

**Technical Skills:**

- Hands-on operational experience with CSPM platforms: Microsoft Defender for Cloud, AWS Security Hub, GCP Security Command Center — and ideally one unified CSPM platform (Prisma Cloud, Wiz, or Orca Security).
- Deep knowledge of cloud security benchmarks: CIS Benchmarks for Azure, AWS, and GCP; NIST CSF cloud implementation; ISO 27001 cloud security controls.
- Experience configuring cloud policy-as-code: Azure Policy (initiative and assignment management), AWS Config Rules and conformance packs, GCP Organisation Policies.
- Understanding of common cloud misconfiguration patterns: publicly exposed storage, over-permissive IAM roles, unencrypted data at rest/transit, missing MFA, insecure network security groups, and insecure Kubernetes configurations.
- Familiarity with cloud identity and access management concepts across Azure (Entra ID / RBAC), AWS (IAM policies, SCPs), and GCP (IAM bindings, Org policies) as they relate to CSPM findings.
- Working knowledge of Kubernetes security posture: CIS Kubernetes Benchmark, admission controller policies (OPA/Kyverno), and container image scanning.
- Ability to write and maintain custom detection rules, suppression policies, and compliance reports using CSPM platform APIs and query languages (KQL for Defender for Cloud, OCSF for multi-cloud).
- Familiarity with DevSecOps tooling for shift-left integration: Checkov, Trivy, tfsec — for surfacing IaC security findings in pipelines to complement CSPM runtime coverage.

**Soft Skills & Leadership:**

- Clear, structured communication for translating complex CSPM findings into risk-prioritised remediation guidance for cloud platform teams and executive stakeholders.
- Strong stakeholder management: ability to drive remediation urgency with cloud architects and platform engineers without creating adversarial dynamics.
- Methodical and thorough approach to compliance tracking, evidence management, and audit preparation.

**Technology Proficiency Levels:**

**Expert level required:**

- Microsoft Defender for Cloud (CSPM)
- Wiz/Prisma Cloud (multi-cloud CSPM)
- Azure Policy/Blueprints

**Proficient level required:**

- AWS Security Hub/AWS Config
- GCP Security Command Center
- Checkov/tfsec (IaC security)

**Working Knowledge required:**

- Orca Security
- GCP Organisation Policies

**Awareness level expected:**

- KQL (Defender for Cloud queries)
- CSPM automation/SOAR integration

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| DevOps Architect <!-- role: devops-architect --> | Shift-left CSPM integration — surfacing equivalent configuration checks within CI/CD pipelines and IaC scanning tooling | Collaborates |
| DevSecOps engineers | Shift-left CSPM integration — surfacing equivalent configuration checks within CI/CD pipelines and IaC scanning tooling | Collaborates |
| Infrastructure Automation Architect <!-- role: infrastructure-automation-architect --> | Ensure compliance-as-code policies in IaC pipelines align with and complement CSPM runtime detection policies | Collaborates |
| Compliance and Risk team | Provide CSPM findings, benchmark scores, and remediation evidence for regulatory compliance reporting, risk register updates, and audit preparation | Provides To |
| FinOps team | Review CSPM tooling costs, evaluate coverage efficiency, and ensure CSPM platform licensing is optimised across the multi-cloud estate | Collaborates |
| Kubernetes Architect <!-- role: kubernetes-architect --> | Platform engineers to address Kubernetes-specific CSPM findings and CIS Kubernetes Benchmark compliance gaps | Collaborates |
| Security Cross-Platform Architect <!-- role: security-cross-platform-architect --> | Security posture standard definitions and receives escalation guidance for architectural-level misconfigurations | Escalates To |
| Security Architect <!-- role: security-architect --> | Operates within the security policy framework and escalates findings that exceed risk tolerance thresholds or require policy changes | Governed By |
| Azure, AWS, and GCP Cloud Architects | Triage and drive remediation of misconfigurations within their respective cloud estates | Provides To |

## Key Technologies

- Microsoft Defender for Cloud (Azure CSPM, regulatory compliance dashboard, and Defender CSPM plan)
- AWS Security Hub (multi-account CSPM aggregation, CIS AWS Foundations Benchmark)
- GCP Security Command Center (GCP-native CSPM, Security Health Analytics)
- Prisma Cloud (Palo Alto Networks — unified multi-cloud CSPM and CWPP)
- Wiz (agentless multi-cloud CSPM and cloud risk management)
- Orca Security (side-scanning agentless CSPM)
- Azure Policy and Azure Blueprints (Azure compliance policy enforcement)
- AWS Config and AWS Config Conformance Packs (AWS configuration compliance tracking)
- GCP Organisation Policies and Security Command Center custom modules
- Checkov, Trivy, and tfsec (shift-left IaC CSPM complement in CI/CD pipelines)

## Typical Day-to-Day Activities

- Reviewing CSPM dashboards across Azure, AWS, and GCP for new or worsening critical and high-severity findings — triaging and assigning ownership for remediation.
- Following up with cloud platform teams on overdue remediation items — providing technical guidance, escalating to the Security Architect where SLAs are breached.
- Reviewing and tuning CSPM policy configurations: suppressing validated false positives, updating custom policy rules, and refining benchmark mappings.
- Producing weekly or fortnightly cloud security posture reports for security leadership and compliance stakeholders.
- Collaborating with DevSecOps teams to align runtime CSPM findings with shift-left IaC scanning checks — identifying systemic IaC patterns contributing to recurrent findings.
- Assessing the security posture impact of proposed cloud infrastructure changes — reviewing architectural designs for configurations likely to trigger CSPM policy violations.
- Maintaining cloud benchmark compliance reports and preparing evidence packages for internal audits and ISO 27001 / SOC 2 assessments.
- Reviewing CSPM tooling coverage gaps — identifying cloud accounts, subscriptions, or workloads not yet enrolled in CSPM monitoring.
- Working with the FinOps team to review CSPM licensing costs and evaluate coverage efficiency across unified and platform-native tooling.
- Staying current with new CSPM platform capabilities, emerging cloud misconfiguration patterns, and updated CIS Benchmark releases.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Critical misconfiguration SLA compliance: ≥95% of critical-severity CSPM findings remediated or formally risk-accepted within 5 business days | ≥95% | — |
| High-severity misconfiguration SLA compliance: ≥90% of high-severity findings remediated within 15 business days | ≥90% | — |
| CSPM coverage rate: ≥95% of cloud subscriptions/accounts/projects enrolled in CSPM monitoring within 3 months of account creation | ≥95% | — |
| CIS Benchmark compliance score: maintain ≥80% pass rate across CIS Azure, AWS, and GCP Benchmarks per quarter | ≥80% | — |
| CSPM finding recurrence rate: fewer than 10% of remediated findings reoccurring within 60 days | 10% | — |
| Mean time to remediate (MTTR) critical findings: target ≤3 business days from identification to verified remediation | ≤3 business days | — |
| Compliance posture trend: quarter-on-quarter improvement in overall benchmark compliance score across all three cloud platforms | — | Monthly |
| CSPM false positive rate: suppressed findings representing ≤15% of total active findings, with all suppressions documented and reviewed quarterly | ≤15% | Quarterly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — CSPM operations, compliance tracking, and cross-cloud monitoring are entirely tooling-based with no physical infrastructure access requirements.
- **Collaboration Tools:** Microsoft Teams, Jira or equivalent (finding remediation tracking), Confluence (compliance documentation), Microsoft Defender for Cloud portal, Wiz / Prisma Cloud / Orca dashboards, ServiceNow or equivalent (risk register integration).
- **On-Site Requirements:** None typically; occasional on-site for security review workshops or audit preparation sessions.
- **Time Zone Flexibility:** Standard business hours with flexibility for cross-regional cloud team coordination on critical finding remediation; no core on-call requirement but must be reachable for critical CSPM alerts during business hours.
- **On-Call / Operational Demands:** Not typically on a rotating on-call schedule; expected to respond to critical CSPM alerts indicating active exposure risk (e.g., publicly exposed storage with sensitive data) within defined SLA during business hours.

## Career Development Path

**Previous Roles:**

- Security Cross-Platform Engineer or Security Engineer (cloud security focus)
- Cloud Engineer (Azure/AWS/GCP) with security and compliance interest
- DevSecOps Engineer with CSPM and IaC security scanning experience
- Information Security Analyst with cloud environment focus
- Compliance Engineer with cloud configuration management experience

**Potential Next Roles:**

- Security Cross-Platform Architect <!-- role: security-cross-platform-architect -->
- Cloud Security Architect
- Security Architect (with cloud posture management specialism)
- Head of Cloud Security
- CISO track — Cloud Security and Compliance leadership

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Security Operations Analyst Associate (SC-200) — Microsoft Defender for Cloud depth
- AWS Certified Security – Specialty — AWS Security Hub and cloud security governance
- Google Professional Cloud Security Engineer — GCP Security Command Center and Org Policy

**Complementary Certifications:**

- Certified Cloud Security Professional (CCSP) — ISC2 — broad multi-cloud security governance framework
- CompTIA Cloud+ or CySA+ — foundational cloud security operations
- Certified Information Systems Security Professional (CISSP) — for senior security architecture progression
- Palo Alto Networks Certified Security Engineer (PCNSE) or Prisma Cloud certification — for unified CSPM platform depth
- FinOps Certified Practitioner — for CSPM tooling cost management context

**Learning Resources & Communities:**

- CIS Benchmarks and CIS Controls resources (cisecurity.org) — cloud benchmark authoritative standards
- Microsoft Defender for Cloud documentation and Microsoft Security blog (learn.microsoft.com)
- AWS Security Blog and AWS Well-Architected Security Pillar (aws.amazon.com/security)
- GCP Security Best Practices documentation and Google Cloud Security Blog
- Wiz Security Research blog and CSPM thought leadership (wiz.io/blog)
- Cloud Security Alliance (CSA) Cloud Controls Matrix and cloud security guidance (cloudsecurityalliance.org)
- SANS Cloud Security curriculum and SANS reading room cloud security papers
