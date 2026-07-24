# DevSecOps Engineer

| Field | Value |
|---|---|
| **Domain** | Security |
| **Chapter:** | Security & Identity |
| **Role Level** | Engineer |
| **Reports To** | DevSecOps Architect |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The DevSecOps Engineer implements and maintains the security tooling, automation, and processes embedded within the organisation's software development pipelines and DevOps workflows. This role works hands-on with CI/CD systems to integrate SAST, SCA, DAST, container scanning, and secrets management capabilities, ensuring security checks are automated, actionable, and minimally disruptive to engineering velocity. The DevSecOps Engineer is a bridge between the security and engineering disciplines, enabling developer teams to ship securely.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of pipeline security tooling deployment and developer enablement tasks
- **Experience Anchor:** 3-5 years in security or DevOps engineering with an application security focus — operates independently within the DevSecOps Architect's framework
- **Out of Scope:** DevSecOps control framework and pipeline security architecture (Architect-owned); broader security incident response (Security Engineers-owned, this role escalates findings to it); DevOps platform toolchain standards (DevOps / Platform Engineers-owned, this role collaborates on it)
- **Escalates To:** DevSecOps Architect — design direction and implementation blockers
- **Escalated To By:** Software Engineers on security finding remediation guidance

## Business Impact

- **Business Objective:** Automate and operationalise security controls across engineering pipelines, reducing the risk of vulnerable software reaching production while maintaining delivery speed.
- **Value Metrics:** Pipeline security gate coverage, mean time to detect and remediate code vulnerabilities, security test automation coverage, critical vulnerability remediation cycle time.
- **Key Stakeholders:** Security Architect, DevOps/Platform Engineering teams, Development teams, Compliance.
- **Processes Supported:** CI/CD pipeline management, vulnerability tracking and remediation, container build and registry governance, secrets lifecycle management, security testing.

## Key Responsibilities

- Implement and maintain SAST, SCA, and DAST integrations within CI/CD pipelines (GitHub Actions, Azure DevOps, GitLab CI).
- Configure and manage container image scanning in build pipelines and container registries.
- Administer secrets management platforms (HashiCorp Vault, Azure Key Vault, AWS Secrets Manager) and develop onboarding guidance for engineering teams.
- Implement IaC security scanning (Checkov, tfsec) as pipeline gates for Terraform, Bicep, and Helm deployments.
- Triage and manage vulnerability scan results, working with development teams on prioritised remediation.
- Develop and maintain SBOM generation pipelines and tooling.
- Configure policy-as-code rules (OPA, Kyverno) for Kubernetes and cloud environments.
- Create and maintain DevSecOps runbooks, developer guidance, and onboarding documentation.
- Monitor pipeline security health dashboards and report on key security metrics.
- Support security champions in engineering teams with tooling guidance and training.
- Participate in security incident response where pipeline or supply chain compromise is suspected.

## Key Decisions and Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Day-to-day configuration and maintenance of DevSecOps tooling | Toolchain architecture and standards (with DevSecOps Architect) |
| Vulnerability triage and remediation prioritisation guidance | Risk acceptance decisions for security findings |
| Developer documentation and onboarding for security tools | Security policy thresholds and gate criteria |
| SBOM generation pipeline maintenance | Application architecture choices |

## Required Skills

**Technical Skills:**

- Hands-on experience with CI/CD platforms: GitHub Actions, Azure DevOps, or GitLab CI.
- Working knowledge of SAST tools (SonarQube, Semgrep), SCA tools (Snyk, OWASP Dependency-Check), and container scanning (Trivy, Grype).
- Experience with secrets management tooling: HashiCorp Vault, Azure Key Vault, or AWS Secrets Manager.
- Familiarity with IaC scanning tools: Checkov, tfsec, or KICS.
- Basic scripting ability in Python, bash, or PowerShell for pipeline automation.
- Understanding of OWASP Top 10 and common vulnerability classes (CVEs, CWEs).
- Familiarity with container technologies (Docker, Kubernetes) and container registry security.
- Knowledge of SBOM formats: CycloneDX, SPDX, and tooling such as Syft.

**Soft Skills and Leadership:**

- Ability to communicate security findings clearly to developers without creating friction.
- Strong documentation skills for developer-facing guidance.
- Collaborative and service-oriented approach to working with engineering teams.
- Keen attention to detail when triaging vulnerability reports.

**Technology Proficiency Levels:**

- **Expert level required:** GitHub Actions/Azure DevOps, Checkmarx/SonarQube (SAST), Snyk/OWASP Dependency-Check (SCA)
- **Proficient level required:** Trivy/Docker Scout (container scanning), Checkov/tfsec (IaC security), HashiCorp Vault/Azure Key Vault
- **Working Knowledge required:** Python/PowerShell scripting, CycloneDX/Syft (SBOM), OPA/Kyverno
- **Awareness level expected:** OWASP ZAP (DAST), Falco (runtime security)

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| DevSecOps Architect | Receive design direction; raise implementation blockers and findings | Escalates To |
| DevOps / Platform Engineers | Collaborate on pipeline integration and tooling deployment | Collaborates |
| Software Engineers | Guide and support developers in understanding and remediating security findings | Provides To |
| Security Engineers | Escalate findings requiring broader security response | Collaborates |
| Compliance | Provide pipeline security evidence for audit requirements | Provides To |

## Key Technologies

- CI/CD: GitHub Actions, Azure DevOps, GitLab CI
- SAST: SonarQube, Semgrep, Checkmarx
- SCA: Snyk, OWASP Dependency-Check
- Container Scanning: Trivy, Grype, Docker Scout
- IaC Security: Checkov, tfsec
- Secrets: HashiCorp Vault, Azure Key Vault
- SBOM: Syft, CycloneDX
- Scripting: Python, bash, PowerShell
- Policy as Code: OPA, Kyverno

## Typical Day-to-Day Activities

- Reviewing pipeline scan results and triaging new vulnerability findings.
- Updating SAST/SCA rule sets and tuning false positive suppressions.
- Onboarding new engineering teams to DevSecOps tooling and workflows.
- Maintaining secrets management configurations and credential rotation processes.
- Writing developer guides for common security tooling integration scenarios.
- Monitoring and reporting on DevSecOps KPI dashboards.
- Collaborating with developers on vulnerability remediation approaches.

## Key Performance Indicators

- Pipeline SAST/SCA gate coverage percentage
- False positive rate from automated scanning tools (minimised via tuning)
- Mean time to triage and assign vulnerability findings
- Developer satisfaction score with DevSecOps tooling
- Secret rotation compliance rate
- SBOM generation coverage

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** GitHub/GitLab, Microsoft Teams, Slack, Jira, Confluence.
- **On-Site Requirements:** None typically.
- **Time Zone Flexibility:** Standard business hours.
- **On-Call / Operational Demands:** May participate in on-call for critical pipeline security incidents or supply chain compromise response.

## Career Development Path

**Previous Roles:**

- DevOps Engineer or Platform Engineer
- Application Security Analyst
- Software Engineer with security interest

**Potential Next Roles:**

- DevSecOps Senior Engineer
- DevSecOps Architect
- Application Security Engineer / Architect

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Certified DevSecOps Professional (CDP) - Practical DevSecOps
- Certified Kubernetes Security Specialist (CKS)

**Complementary Certifications:**

- GIAC Web Application Penetration Tester (GWAPT)
- AWS Certified Security - Specialty or Microsoft SC-200
- CompTIA Security+

**Learning Resources and Communities:**

- OWASP DevSecOps Guideline
- Snyk Learn security training platform
- Practical DevSecOps community and labs
- CNCF Security Technical Advisory Group resources
