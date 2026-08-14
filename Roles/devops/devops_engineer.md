# DevOps Engineer

| Field | Value |
|---|---|
| **Domain** | DevOps |
| **Chapter:** | DevOps & Delivery |
| **Role Level** | Engineer |
| **Reports To** | DevOps Senior Engineer |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The DevOps Engineer implements and maintains CI/CD pipelines and automation tools that enable efficient, reliable software delivery. This role focuses on building and supporting DevOps infrastructure, troubleshooting pipeline issues, and assisting development teams with CI/CD integration.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of CI/CD pipeline implementation, automation, and support tasks to defined standards
- **Experience Anchor:** 1-3 years in DevOps, release, or infrastructure engineering — works under guidance, building toward independent delivery
- **Out of Scope:** Pipeline architecture and platform design (Senior Engineers and the Architect-owned); DevSecOps policy and control framework definition; deployment automation strategy beyond assigned implementation tasks
- **Escalates To:** DevOps Senior Engineer — design-level questions, complex automation issues, and escalated pipeline incidents
- **Escalated To By:** development and operations teams on day-to-day pipeline and deployment support requests

## Business Impact

- **Business Objective:** Enables development teams to deliver software reliably and frequently by implementing and maintaining the CI/CD pipelines and automation tooling they depend on daily, reducing manual effort and human error in the delivery process.
- **Value Metrics:** Pipeline availability and reliability, mean time to resolve pipeline failures, number of pipelines implemented and maintained, deployment success rate, documentation completeness.
- **Key Stakeholders:** DevOps Senior Engineer, development team leads, QA engineers, operations teams, application product owners.
- **Processes Supported:** CI/CD pipeline implementation, build and release management, automated test integration, infrastructure provisioning, change management (standard pipeline changes).

## Key Responsibilities

- Implement and maintain CI/CD pipelines and workflows
- Configure and support build systems and artifact repositories
- Set up automated testing within delivery pipelines
- Implement Infrastructure as Code for deployment environments
- Create and maintain deployment automation scripts
- Configure pipeline integrations with security scanning tools
- Troubleshoot and resolve CI/CD pipeline issues
- Document DevOps processes and pipeline configurations
- Support development teams with CI/CD implementation

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| CI/CD pipeline implementation, routine maintenance, and break-fix for assigned pipelines | Complex pipeline architecture and advanced deployment strategies (escalated to Senior Engineer) |
| IaC template creation and maintenance for standard deployment environments | Infrastructure design and cloud architecture decisions |
| Pipeline documentation, runbooks, and onboarding guides for application teams | Security scanning policy and vulnerability triage |

## Required Skills & Qualifications

**Technical Skills:**

- Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions, etc.)
- Knowledge of Infrastructure as Code tools (Terraform, Ansible, etc.)
- Understanding of source control management and branching strategies
- Experience with build systems and dependency management
- Familiarity with containerization technologies
- Basic scripting and automation skills
- Understanding of automated testing concepts
- Knowledge of artifact management and versioning

**Soft Skills and Leadership:**

- Communicates pipeline issues and resolution steps clearly to development teams and stakeholders.
- Works collaboratively with developers, QA, and operations teams to integrate pipeline requirements.
- Methodical troubleshooting approach to diagnose build failures, flaky tests, and deployment errors.

**Technology Proficiency Levels:**

**Expert level required:**

- CI/CD tools (GitHub Actions, GitLab CI, or Azure DevOps — pipeline implementation and maintenance)
- Git and GitHub/GitLab (version control and branching strategies)
- scripting languages (Bash, PowerShell, Python — pipeline automation)

**Proficient level required:**

- Docker/Containerd (containerization and image management)
- Terraform/OpenTofu (IaC template creation and management)
- Ansible (configuration management)
- artifact repositories (Nexus, Artifactory, or GitHub Packages)

**Working Knowledge required:**

- ArgoCD/Flux (GitOps deployment)
- automated testing framework integration in pipelines
- security scanning tools (SBOM generation, Sigstore/Cosign)

**Awareness level expected:**

- Supply chain security standards (SLSA verification)
- AI-assisted development tools (GitHub Copilot)
- Kubernetes as a pipeline deployment target

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| development teams | Pipeline implementation | Provides To |
| QA teams | Test automation integration | Collaborates |
| infrastructure teams | Deployment environments | Collaborates |
| Senior DevOps Engineers and DevOps Architect | Day-to-day guidance and direction | Escalates To |
| operations | Deployment processes | Collaborates |

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Reliability and performance of CI/CD pipelines | — | — |
| Time to resolve pipeline and automation issues | — | — |
| Quality of DevOps documentation and runbooks | — | — |
| Successful implementation of standard pipeline patterns | — | — |
| Effectiveness of deployment automation | — | — |
| Support responsiveness to development teams | — | — |

## Key Technologies

- Continuous Integration tools (Jenkins, GitLab CI, GitHub Actions, Azure DevOps)
- Source control management systems (Git, GitHub, GitLab)
- Container technologies (Docker, Containerd)
- Infrastructure as Code tools (Terraform, OpenTofu, CloudFormation, Bicep, Pulumi)
- Configuration management tools (Ansible, Chef, Puppet)
- Artifact repositories (Nexus, Artifactory, GitHub Packages)
- Scripting and automation languages (Bash, PowerShell, Python)
- Build tools and dependency management systems
- Testing frameworks and automation tools
- Monitoring and logging systems integration
- AI-assisted development tools (GitHub Copilot, AI code review assistants)
- Supply chain security tools (SLSA verification, SBOM generation, Sigstore/Cosign)
- GitOps tools (ArgoCD, Flux)

## Typical Day-to-Day Activities

- Implementing CI/CD pipelines for application teams
- Maintaining and improving existing pipeline configurations
- Troubleshooting build and deployment failures
- Creating and maintaining Infrastructure as Code templates
- Supporting development teams with DevOps tools and processes
- Setting up automated testing in delivery pipelines
- Managing source control systems and branching strategies
- Documenting DevOps processes and configurations
- Implementing security scans and checks in pipelines
- Collaborating with other teams on service integrations

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — all pipeline and automation work is tooling-based with no physical infrastructure dependency.
- **Collaboration Tools:** Microsoft Teams, GitHub / GitLab / Azure DevOps, Jira, Confluence, ServiceNow (change management).
- **On-Site Requirements:** None expected under normal operations.
- **Time Zone Flexibility:** Standard business hours; may support out-of-hours deployments during release windows.
- **On-Call / Operational Demands:** May participate in on-call rota for pipeline failures; escalates P1 issues to Senior DevOps Engineer.

## Career Development Path

**Previous Roles:**

- System Administrator
- Application Support Specialist
- Developer with infrastructure focus
- Build and Release Engineer

**Potential Next Roles:**

- DevOps Senior Engineer
- CI/CD Specialist
- Cloud Platform Engineer
- Site Reliability Engineer
- DevSecOps Engineer
- Infrastructure Automation Engineer

## Recommended Certifications & Learning Paths

**Core Certifications:**

- GitHub Actions / GitHub Advanced Security certifications
- Microsoft Certified: Azure DevOps Engineer Expert (AZ-400)
- Docker Certified Associate
- Certified Kubernetes Application Developer (CKAD)
- HashiCorp Certified: Terraform Associate
- GitLab Certified Associate
- Red Hat Certified Specialist in Ansible Automation
- AWS Certified Developer - Associate

**Complementary Certifications:**

- CompTIA Linux+, Python Institute PCEP (automation scripting), and cloud-specific developer associate certifications (AWS, Azure, GCP).

**Learning Resources & Communities:**

- GitHub Learning Lab, Microsoft Learn (AZ-400 DevOps path), KodeKloud (hands-on labs for Kubernetes, Terraform, Ansible), TechWorld with Nana (YouTube), Pluralsight DevOps fundamentals tracks.
