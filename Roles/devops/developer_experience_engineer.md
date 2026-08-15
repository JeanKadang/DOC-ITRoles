# Developer Experience Engineer

| Field | Value |
|---|---|
| **Role ID** | `developer-experience-engineer` |
| **Domain** | DevOps |
| **Chapter:** | DevOps & Delivery |
| **Role Level** | Engineer |
| **Reports To** | DevOps Architect |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Developer Experience Engineer designs, builds, and operates internal developer platforms (IDPs) and self-service tooling that reduce cognitive load for engineering teams across the organisation. This role owns the golden path templates, developer portals, CLI tooling, and platform scaffolding that allow application teams to provision infrastructure, deploy services, and manage their software delivery lifecycle without deep platform expertise. The Developer Experience Engineer uses DORA metrics and the SPACE framework to measure and continuously improve developer productivity, treating application teams as their primary customers.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — internal developer platform (IDP) design, golden path standards, and developer tooling
- **Experience Anchor:** 5+ years in platform or DevOps engineering with a developer-productivity focus — operates independently within the DevOps Architect's platform strategy
- **Out of Scope:** DevOps platform architecture and toolchain standards (DevOps Architect-owned); cluster and cloud infrastructure provisioning design (Kubernetes/Cloud Architect-owned); security guardrail policy definition (Security Architect-owned, embeds controls into golden paths)
- **Escalates To:** DevOps Architect — platform architecture decisions and IDP strategy exceptions
- **Escalated To By:** application development teams on golden path adoption and self-service platform issues

## Business Impact

- **Business Objective:** Accelerate engineering velocity across the organisation by reducing the time and effort application teams spend on undifferentiated platform tasks — enabling them to focus on delivering business value rather than managing infrastructure, pipelines, and deployment complexity.
- **Value Metrics:** Deployment frequency improvement (DORA), lead time for changes reduction, developer satisfaction score (SPACE framework), self-service adoption rate across golden path templates, mean time to onboard a new service onto the IDP, number of manual platform requests eliminated per quarter.
- **Key Stakeholders:** Engineering managers, application development teams, DevOps Architect, Cloud Architects, Security Architect, platform product owners.
- **Processes Supported:** Application onboarding, CI/CD self-service provisioning, infrastructure self-service, developer portal catalogue management, internal tooling lifecycle management, platform feature delivery.

## Key Responsibilities

- Build and maintain internal developer platform (IDP) features, including self-service workflows, service catalogues, and scaffolding templates aligned to golden paths.
- Design and implement golden path templates covering CI/CD pipelines, infrastructure provisioning, security guardrails, and observability defaults for common application patterns.
- Own and operate the developer portal (e.g., Backstage, Port, Cortex) — including plugin configuration, software catalogue accuracy, and scorecard governance.
- Develop CLI tooling and automation that simplifies common developer tasks, reducing context-switching and platform knowledge requirements.
- Instrument and track DORA metrics and SPACE framework signals to measure the impact of platform improvements on engineering productivity.
- Implement and maintain platform scaffolding using GitOps and self-service infrastructure tooling (Crossplane, ArgoCD, Terraform/Pulumi modules).
- Partner with security teams to embed security guardrails and compliance checks directly into golden path templates and self-service workflows.
- Collect and act on developer feedback to prioritise the IDP feature backlog and drive continuous platform improvement.
- Maintain documentation, runbooks, and onboarding guides within the developer portal to support platform self-service adoption.
- Participate in platform incident response for developer tooling and CI/CD infrastructure availability issues.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Golden path template design, content, and maintenance | CI/CD pipeline architecture and toolchain selection (owned by DevOps Architect) |
| IDP feature backlog prioritisation and developer portal configuration | Infrastructure architecture design and cloud platform standards (owned by Cloud Architects) |
| CLI tooling design and internal platform scaffolding implementation | Kubernetes platform compute design and cluster configuration (owned by Kubernetes Architect) |
| Developer productivity measurement: DORA metrics tracking and SPACE framework instrumentation | Security policy framework and compliance standards (owned by Security Architect) |

## Required Skills & Qualifications

**Technical Skills:**

- Hands-on experience building or operating internal developer platforms (IDPs) using Backstage, Port, or Cortex.
- Proficiency with CI/CD tooling: GitHub Actions, GitLab CI, or Azure Pipelines — including template authoring and pipeline-as-code patterns.
- Experience with GitOps tooling (ArgoCD, Flux) and Kubernetes-based application delivery.
- Working knowledge of Infrastructure as Code tools (Terraform, Pulumi, or Crossplane) for self-service infrastructure provisioning.
- Ability to write and maintain CLI tooling and automation scripts in Go, Python, or TypeScript.
- Understanding of DORA metrics measurement and the SPACE framework for developer productivity.
- Familiarity with software catalogue management, service scorecards, and internal API documentation practices.
- Foundational knowledge of container and Kubernetes concepts relevant to application team self-service.

**Soft Skills & Leadership:**

- Strong developer empathy — ability to understand the friction points application teams face and translate them into platform improvements.
- Clear written communication for developer-facing documentation, runbooks, and golden path guides.
- Collaborative working style to gather feedback from engineering teams and balance competing priority demands.

**Technology Proficiency Levels:**

**Expert level required:**

- Backstage (CNCF developer portal, software catalogue, and scaffolding template development)
- GitHub Actions or GitLab CI (golden path pipeline template authoring and pipeline-as-code patterns)
- DORA metrics tracking and SPACE framework instrumentation

**Proficient level required:**

- ArgoCD or Flux (GitOps-based application delivery and IDP self-service integration)
- Crossplane (Kubernetes-native self-service infrastructure provisioning)
- Terraform or Pulumi (IaC modules for golden path infrastructure)

**Working Knowledge required:**

- Helm (Kubernetes application packaging for golden path templates)
- OPA or Kyverno (policy-as-code enforcement in self-service workflows)
- CLI tooling development (Go, Python, or TypeScript-based internal developer tools)

**Awareness level expected:**

- Port and Cortex (alternative IDP and developer scorecard platforms)
- AI-assisted developer experience automation patterns
- eBPF-based platform observability tooling

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| DevOps Architect | Platform architecture, IDP strategy, and golden path standards | Escalates To |
| Azure, AWS, and GCP Cloud Architects | Designing self-service infrastructure provisioning workflows and cloud resource templates | Collaborates |
| Kubernetes Architect | Align platform compute (cluster provisioning, namespace management, workload templates) with self-service IDP capabilities | Collaborates |
| Security Architect | Embed security guardrails, policy-as-code checks, and compliance gates into golden path templates and platform scaffolding | Governed By |
| application development teams | As primary customers — gathering productivity feedback, co-designing workflows, and supporting onboarding onto the IDP | Provides To |
| Platform Reliability Engineer | Ensure IDP components and developer tooling meet reliability and availability standards | Collaborates |
| Observability Architect | Or Observability Senior Engineers to include default instrumentation templates in golden paths | Collaborates |

## Key Technologies

- Backstage (CNCF developer portal and software catalogue)
- Port and Cortex (alternative IDP and scorecard platforms)
- GitHub Actions and GitLab CI (CI/CD pipeline authoring and golden path templates)
- ArgoCD and Flux (GitOps-based application delivery)
- Crossplane (Kubernetes-native infrastructure self-service and composition)
- Terraform and Pulumi (IaC for golden path infrastructure modules)
- Custom CLI tooling (Go, Python, or TypeScript-based internal developer tools)
- Helm (Kubernetes application packaging for golden path templates)
- OPA / Kyverno (policy-as-code enforcement within self-service workflows)
- DORA metrics tooling and SPACE framework instrumentation

## Typical Day-to-Day Activities

- Building new IDP self-service workflows or golden path templates based on prioritised backlog items.
- Reviewing and responding to developer feedback on platform usability and friction points.
- Updating and maintaining Backstage plugins, software catalogue entries, and service scorecards.
- Debugging and resolving CI/CD pipeline issues or self-service provisioning failures reported by application teams.
- Writing or updating developer documentation, onboarding guides, and golden path usage examples.
- Reviewing DORA metrics dashboards to identify delivery bottlenecks and propose platform improvements.
- Collaborating with the Security Architect or DevSecOps engineers to embed new security controls into golden path templates.
- Participating in sprint ceremonies: backlog grooming, sprint planning, and demo of completed IDP features.
- Conducting developer experience surveys and office hours sessions to gather direct feedback from engineering teams.
- Reviewing pull requests for platform repositories, IDP plugins, and CLI tooling changes.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Deployment frequency improvement across teams using IDP golden paths: target ≥20% increase year-on-year | ≥20% | — |
| Lead time for changes for teams onboarded to golden paths: target ≤1 day median lead time for standard service changes | ≤1 day | — |
| IDP self-service adoption rate: ≥70% of new services onboarded via golden path templates within 6 months | ≥70% | — |
| Developer satisfaction score (SPACE survey or equivalent): ≥4.0/5.0 for platform tooling satisfaction | ≥4.0 | — |
| Mean time to onboard a new service to the IDP: target ≤3 business days end-to-end | ≤3 business days | — |
| Number of manual platform requests (tickets, Slack requests) eliminated per quarter through self-service automation | — | — |
| Golden path template coverage: ≥80% of supported application archetypes covered by maintained golden paths | ≥80% | — |
| Platform tooling incident rate: fewer than 2 developer-impacting IDP outages per quarter | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — all platform engineering, IDP development, and developer enablement work is code and tooling-based with no physical infrastructure dependency.
- **Collaboration Tools:** Microsoft Teams or Slack, GitHub / GitLab, Jira, Confluence, Backstage, Miro (workshop facilitation).
- **On-Site Requirements:** Minimal; occasional on-site for IDP launch workshops, developer experience summits, or team off-sites.
- **Time Zone Flexibility:** Standard business hours with flexibility to support application teams across distributed time zones during onboarding or incident support.
- **On-Call / Operational Demands:** Participates in a platform on-call rotation for developer tooling and CI/CD infrastructure availability; primary on-call for IDP and developer portal incidents.

## Career Development Path

**Previous Roles:**

- Software Engineer or Application Developer (with CI/CD and automation interest)
- DevOps Engineer
- CI/CD Specialist or Build Engineer
- Platform Engineer (entry level)
- Site Reliability Engineer (early career)

**Potential Next Roles:**

- Developer Experience Senior Engineer
- Platform Engineer (Senior)
- DevOps Architect
- Internal Developer Platform Product Owner
- Site Reliability Engineer (platform-focused)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- GitHub Actions certification (GitHub Skills / GitHub certifications)
- HashiCorp Certified: Terraform Associate
- Certified Kubernetes Application Developer (CKAD) — CNCF

**Complementary Certifications:**

- Certified Kubernetes Administrator (CKA) — for deeper platform compute context
- AWS Certified DevOps Engineer – Professional or Microsoft Certified: DevOps Engineer Expert (AZ-400)
- ArgoCD / GitOps certification (CNCF GitOpsCon community resources)
- DORA DevOps Research practitioner resources (dora.dev)

**Learning Resources & Communities:**

- Backstage community and CNCF TAG App Delivery (backstage.io, tag-app-delivery.cncf.io)
- Platform Engineering community (platformengineering.org) — newsletter, Slack, and conference content
- DORA research publications and State of DevOps reports (dora.dev)
- Humanitec platform engineering maturity model and blog (humanitec.com)
- Internal Developer Platform newsletter (internaldeveloperplatform.org)
- CNCF Platforms Working Group publications and reference implementations
