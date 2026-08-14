# Automation Framework Engineer

| Field | Value |
|---|---|
| **Domain** | DevOps |
| **Chapter:** | DevOps & Delivery |
| **Role Level** | Engineer |
| **Reports To** | DevOps Senior Engineer or DevOps Architect (depending on team structure) |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Automation Framework Engineer designs, builds, and maintains the reusable automation primitives that accelerate delivery across all engineering teams. This role operates at the meta-level — rather than automating individual workloads, it owns the shared frameworks, libraries, and tooling that other engineers consume to build their own automation. Core outputs include test automation frameworks, infrastructure provisioning libraries, runbook automation platforms, shared pipeline templates, and SDK/API wrappers that standardise how automation is written and maintained across the organisation.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — shared automation frameworks, reusable pipeline modules, and self-service tooling consumed across engineering teams
- **Experience Anchor:** 5+ years in automation, DevOps, or platform engineering with demonstrated framework/tooling ownership — operates independently within DevOps platform standards
- **Out of Scope:** DevOps platform architecture and IDP strategy (DevOps Architect-owned); infrastructure automation module governance (Infrastructure Automation Architect-owned); test strategy definition (QA/test engineering-owned, aligns published frameworks to it)
- **Escalates To:** DevOps Senior Engineer or DevOps Architect (depending on team structure) — framework standards exceptions and cross-team adoption conflicts
- **Escalated To By:** domain engineering teams on issues consuming published automation frameworks

## Business Impact

- **Business Objective:** Accelerates the entire engineering organisation by producing high-quality, reusable automation building blocks that eliminate redundant effort, enforce consistent standards, and reduce the time from idea to deployed automation for every consuming team.
- **Value Metrics:** Framework adoption rate (% of teams using shared frameworks), time saved per automation task versus bespoke alternatives, test coverage enabled by shared test libraries, framework defect rate, and mean onboarding time to first automation for new consumers.
- **Key Stakeholders:** DevOps Architect, Developer Experience Engineer, Platform Reliability Engineer, Infrastructure Automation Architect, domain engineering teams who consume the frameworks, and QA/test engineering leads.
- **Processes Supported:** Test automation enablement, infrastructure provisioning lifecycle, shared CI/CD pipeline templating, runbook and operational automation, internal developer portal scaffolding, and cross-team automation governance.

## Key Responsibilities

- Design and build reusable test automation frameworks using pytest, Testinfra, Terratest, Robot Framework, and Selenium/Playwright for UI scenarios
- Develop and maintain shared infrastructure provisioning libraries in Terraform, Pulumi, and Ansible that teams consume as modules or roles
- Author and publish GitHub Actions reusable workflows and composite actions that standardise pipeline patterns organisation-wide
- Build and maintain internal automation SDKs, CLI tools, and API wrappers that abstract platform complexity for consuming engineers
- Create Backstage scaffolder plugins and software templates that accelerate project bootstrapping and enforce golden-path defaults
- Produce Packer image pipelines and machine-image libraries used across provisioning workflows
- Establish and enforce framework versioning, changelog, and deprecation policies to protect downstream consumers
- Collaborate with domain engineers to understand automation needs, translate them into reusable primitives, and validate framework fitness
- Write comprehensive documentation, usage guides, worked examples, and contribution guidelines for all published frameworks
- Monitor framework adoption, defect rates, and consumer feedback; drive continuous improvement of the automation platform

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Design, implementation, versioning, and lifecycle management of shared automation frameworks and libraries | Architectural direction and strategic toolchain selection for the broader automation platform (escalated to DevOps Architect or Infrastructure Automation Architect) |
| Published GitHub Actions reusable workflows, composite actions, and shared pipeline templates | Adoption mandates or governance policies that require organisational sign-off |
| Internal CLI tooling, SDK/API wrappers, and automation utilities | Cloud platform and security policy decisions that constrain framework design |
| Backstage scaffolder plugins and software templates owned by the DevOps team | Developer experience portal strategy and information architecture (led by Developer Experience Engineer) |
| Framework documentation, contribution guidelines, and deprecation notices | Test strategy and coverage targets for consuming application teams |

## Required Skills & Qualifications

**Technical Skills:**

- Proficiency in Python and Go for framework and library development; PowerShell for Windows/cross-platform automation tooling
- Strong Terraform and Pulumi skills including module authoring, provider development, and state management patterns
- Experience writing Ansible roles and collections for infrastructure configuration and runbook automation
- Hands-on GitHub Actions authoring — reusable workflows, composite actions, custom JavaScript/Docker actions
- Test automation framework experience across pytest/Testinfra (infrastructure), Terratest (IaC), Robot Framework (keyword-driven), and Selenium/Playwright (UI)
- CLI tooling design using cobra (Go), Click/Typer (Python), or equivalent; familiarity with distribution via pip, Homebrew, or internal registries
- Packer template authoring for multi-platform machine image pipelines
- Backstage plugin development and scaffolder template authoring
- Understanding of software packaging, semantic versioning, and artifact publication (PyPI, GitHub Packages, Terraform Registry)
- Familiarity with container technologies (Docker, containerd) and Kubernetes as a runtime target for automation workloads

**Soft Skills and Leadership:**

- Treats consuming engineers as customers — actively solicits feedback, iterates on usability, and writes documentation that enables self-service adoption.
- Communicates framework design decisions, breaking changes, and migration paths clearly to both technical and non-technical stakeholders.
- Applies a product engineering mindset to internal tooling: scopes work to highest-value primitives rather than building for edge cases first.
- Collaborates cross-functionally with DevOps, platform, and domain teams to understand real automation pain points before designing solutions.

**Technology Proficiency Levels:**

**Expert level required:**

- Python and Go (framework and library development)
- GitHub Actions (reusable workflows, composite actions, and custom JavaScript/Docker actions)
- Terraform and Pulumi (IaC module authoring and provider development)

**Proficient level required:**

- pytest, Testinfra, and Terratest (infrastructure and IaC test automation)
- Ansible (roles, collections, and runbook automation)
- Backstage (scaffolder plugins and software templates)

**Working Knowledge required:**

- Docker and container registries (packaging and distributing automation tooling)
- Packer (machine image pipeline authoring)
- internal artifact registries (PyPI, Terraform Registry, GitHub Packages)

**Awareness level expected:**

- Kubernetes as automation workload runtime target
- AI-assisted development tools (GitHub Copilot for framework and test scaffolding)
- Robot Framework and Playwright for UI automation

### Qualifications

- **Education:** Bachelor's degree in Computer Science, Software Engineering, or a related technical discipline; equivalent professional experience considered.
- **Experience:** 3–5 years in DevOps, software engineering, or QA automation engineering, with at least 2 years focused on framework or library development rather than point-in-time automation delivery.
- **Certifications:** HashiCorp Certified: Terraform Associate, GitHub Actions certification, AWS Certified DevOps Engineer – Professional or Microsoft Certified: DevOps Engineer Expert (AZ-400), ISTQB Advanced Level – Test Automation Engineer (desirable).

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| DevOps Senior Engineer or DevOps Architect | Reports to, depending on team structure | Escalates To |
| Developer Experience Engineer | Inner developer portal and golden paths | Collaborates |
| Platform Reliability Engineer | Operational automation and runbook alignment | Collaborates |
| Infrastructure Automation Architect | Strategic direction and module governance | Governed By |
| domain engineering teams | Consume published frameworks | Provides To |
| QA/test engineering leads | Aligning on test automation standards | Collaborates |
| security engineering | Compliance controls embedded in shared templates | Governed By |

## Key Technologies

- Python, Go, PowerShell (framework and CLI development)
- Terraform / OpenTofu and Pulumi (IaC module libraries)
- Ansible (roles, collections, and runbook automation)
- GitHub Actions (reusable workflows, composite actions, custom actions)
- pytest, Testinfra, and Terratest (infrastructure and IaC test frameworks)
- Robot Framework and Selenium / Playwright (keyword-driven and UI automation)
- Packer (machine image pipeline authoring)
- Backstage (scaffolder plugins and software templates)
- Docker and container registries (packaging and distributing automation tooling)
- Internal artifact registries (PyPI mirror, Terraform Registry, GitHub Packages)
- Git / GitHub (version control, PR-based contribution model for frameworks)
- AI-assisted development tools (GitHub Copilot for framework and test scaffolding)

## Typical Day-to-Day Activities

- Designing and implementing new modules, libraries, or reusable workflow components based on a backlog of team requests and adoption feedback
- Reviewing pull requests from domain engineers contributing to shared framework repositories; enforcing contribution standards and API consistency
- Triaging and resolving defects reported against published frameworks; releasing patch versions and communicating changes to consumers
- Pairing with domain engineers to help them integrate shared frameworks into their pipelines, provisioning workflows, or test suites
- Writing and updating documentation, worked examples, migration guides, and changelog entries for published libraries
- Running framework adoption metrics queries and presenting trends to the DevOps Architect and stakeholders
- Conducting design spikes and prototypes to evaluate new tooling or approaches before committing to a framework pattern
- Maintaining Backstage scaffolder templates and validating that generated project scaffolding stays aligned with current golden-path standards
- Participating in DevOps and platform team planning sessions to align the automation framework roadmap with organisational priorities
- Keeping framework dependencies current; assessing and applying security patches across the automation toolchain

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| **Framework adoption rate** — percentage of engineering teams actively consuming at least one shared framework or library (target: continuous growth quarter-over-quarter) | — | — |
| **Time saved per automation task** — measured via consumer surveys or telemetry comparing framework-enabled vs. bespoke automation build time | — | — |
| **Test coverage enabled** — aggregate test coverage attributable to shared test frameworks across consuming repositories | ≥80% (proposed) | Monthly |
| **Framework defect rate** — number of production defects or breaking regressions introduced per framework release, tracked per quarter | — | — |
| **Onboarding time to first automation** — median time for a new consumer team to go from zero to first passing automation run using a shared framework | — | — |
| **Reusable workflow adoption** — percentage of CI/CD pipelines in the organisation referencing shared GitHub Actions reusable workflows rather than duplicated inline definitions | — | — |
| **Documentation completeness** — percentage of published framework components with up-to-date usage documentation and at least one worked example | — | — |
| **Consumer satisfaction** — periodic NPS or satisfaction score from engineering teams who consume the automation frameworks | ≥85% (proposed) | Quarterly |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — all framework development, library publication, and consumer collaboration are tooling-based with no physical infrastructure dependency.
- **Collaboration Tools:** Microsoft Teams, GitHub (issues, PRs, Discussions for framework feedback), Jira, Confluence, Backstage developer portal, Slack channels for framework support.
- **On-Site Requirements:** None expected under normal operations; occasional on-site attendance for team planning workshops or all-hands events may be required.
- **Time Zone Flexibility:** Standard business hours with async-first collaboration for geographically distributed consuming teams; synchronous pairing sessions scheduled with advance notice.
- **On-Call / Operational Demands:** Low on-call exposure — frameworks are libraries, not live services; however, critical breaking defects in high-traffic frameworks may require urgent patch releases outside business hours.

## Career Development Path

**Previous Roles:**

- DevOps Engineer
- Software Engineer (with infrastructure or tooling focus)
- QA Automation Engineer
- Build and Release Engineer
- Platform Engineer

**Potential Next Roles:**

- DevOps Senior Engineer
- Infrastructure Automation Architect
- Developer Experience Engineer (internal platform / golden-path ownership)
- Staff or Principal Engineer (automation platform track)
- Solutions Architect (automation and DevOps tooling specialisation)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- HashiCorp Certified: Terraform Associate — validates module authoring and IaC library design fundamentals
- GitHub Actions Certification — confirms reusable workflow and composite action authoring proficiency
- Microsoft Certified: DevOps Engineer Expert (AZ-400) — broad DevOps toolchain and automation lifecycle coverage
- AWS Certified DevOps Engineer – Professional — equivalent depth for AWS-centric automation environments
- ISTQB Advanced Level – Test Automation Engineer — formalises test framework design and automation architecture knowledge

**Complementary Certifications:**

- HashiCorp Certified: Vault Associate (secrets management in automation pipelines), Red Hat Certified Specialist in Ansible Automation (role and collection authoring), Certified Kubernetes Application Developer (CKAD) (container-based automation runtimes), Python Institute PCEP/PCAP (framework development language depth).

**Learning Resources and Communities:**

- Test Automation University (Applitools) — free courses on pytest, Playwright, and Robot Framework; GitHub Learning Lab and GitHub Actions documentation for reusable workflow patterns; HashiCorp Developer portal for Terraform module and provider development; Terratest documentation and examples (Gruntwork); Backstage.io docs and plugin development guides; Thoughtworks Technology Radar (annual toolchain signal); internal architecture decision records (ADRs) for evolving framework standards.
