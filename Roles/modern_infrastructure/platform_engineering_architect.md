# Platform Engineering Architect

| Field | Value |
|---|---|
| **Domain** | Modern Infrastructure |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Architect |
| **Reports To** | Cloud, Platform & Infrastructure Chapter Lead |
| **Direct Reports** | None (sets technical direction and mentors Platform Engineering Senior Engineers; formal line management sits with the Chapter Lead) |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Platform Engineering Architect designs comprehensive internal developer platforms that enable application teams to efficiently build, deploy, and operate their services. This role establishes the technical vision for developer experience, creating architectures that balance self-service capabilities with governance and operational excellence.

## Role Scope & Boundaries

- **Scope of Influence:** Domain-wide — internal platform engineering architecture and infrastructure self-service standards across the chapter
- **Experience Anchor:** 8+ years in platform engineering or infrastructure architecture with demonstrated architecture-level delivery — operates independently on domain-wide platform architecture decisions
- **Out of Scope:** Cloud infrastructure provisioning architecture (Cloud Platform Architects-owned, this role integrates with it); CI/CD pipeline strategy (DevOps Architects-owned, this role aligns to it); security control design (Security Architects-owned, this role implements secure platform design from it)
- **Escalates To:** Cloud, Platform & Infrastructure Chapter Lead — chapter-wide priorities and cross-domain investment decisions
- **Escalated To By:** Platform Engineering Senior Engineers on solution design questions

## Business Impact

- **Business Objective:** Designs the internal developer platform enabling application teams to reduce time-to-production, increase deployment frequency, and deliver higher-quality software through golden paths and self-service capabilities
- **Value Metrics:** Developer satisfaction scores, deployment frequency improvements, self-service capability adoption rate, time-to-productivity for new engineers, platform security posture and software supply chain coverage
- **Key Stakeholders:** CTO, application development teams, DevOps, Security Architects, Cloud Platform Architects, Engineering Managers
- **Processes Supported:** IDP architecture and strategy, developer experience design, platform engineering governance, AI tooling integration, software supply chain security

## Key Responsibilities

- Design comprehensive internal developer platform architectures
- Establish technical strategies for platform development
- Create reference architectures and golden paths for application teams
- Develop governance frameworks for platform usage and AI tool integration
- Design AI/ML serving infrastructure and agentic workflow capabilities within the IDP
- Design API and integration strategies for platform components
- Establish platform observability and reliability architecture
- Drive software supply chain security architecture
- Evaluate new technologies for platform enhancement (including AI/LLM tooling)
- Provide technical leadership for platform initiatives
- Design edge platform deployment patterns, extending IDP golden paths to edge and IoT environments
- Architect edge-aware self-service tooling and onboarding workflows for edge workloads

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| IDP architecture, golden path design, and developer platform tooling strategy (Backstage, Port, service catalog) | Cloud platform architecture and enterprise application deployment standards |
| Platform security architecture, software supply chain controls (SLSA, SBOM, Sigstore), and policy-as-code framework | Application team security standards and DevSecOps pipeline design |
| AI/LLM tooling integration architecture within the IDP (GitHub Copilot, AI code review, AI test generation) | AI platform strategy, agentic workflow patterns, and developer productivity AI investment |

## Required Skills & Qualifications

- Deep knowledge of platform engineering principles and practices
- Extensive experience with cloud-native architecture
- Strong understanding of software development lifecycle
- Advanced knowledge of DevOps and SRE practices
- Experience with API design and integration patterns
- Understanding of developer experience principles
- Knowledge of security and compliance requirements
- Relevant advanced certifications in architecture disciplines

**Technology Proficiency Levels:**

- **Expert level required:** Backstage/Port IDP, Kubernetes, GitOps (ArgoCD/Flux), Software supply chain tooling (SLSA/Sigstore/SBOM)
- **Proficient level required:** Terraform/Pulumi/Bicep, GitHub Actions/Azure DevOps Pipelines, Crossplane
- **Working Knowledge required:** Service mesh (Istio/Linkerd), OPA/Kyverno policy-as-code
- **Awareness level expected:** WebAssembly (WASM) for platform runtimes, Dapr distributed application runtime

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Cloud Platform Architects | Infrastructure integration | Collaborates |
| DevOps Architects | CI/CD strategy | Collaborates |
| Security Architects | Secure platform design | Governed By |
| Platform Engineering Product Owner | Technical strategy | Collaborates |
| Platform Engineering Senior Engineers | Provide architectural direction and mentoring; receive implementation feedback | Provides To |
| application architects | Platform requirements | Provides To |

## Key Technologies

- Internal Developer Platform (IDP) frameworks (Backstage, Port)
- Cloud-native application architectures
- Kubernetes and container orchestration
- Service mesh architectures (Istio, Linkerd)
- API gateway patterns
- GitOps workflow architectures (ArgoCD, Flux)
- Developer portal frameworks (Backstage, Cortex)
- Infrastructure as Code architecture patterns (Terraform, Pulumi, Bicep)
- CI/CD orchestration designs
- Platform observability architectures
- Policy as Code frameworks (OPA, Kyverno)
- Developer experience tooling and AI coding assistants (GitHub Copilot, IDE integrations)
- AI/ML platform infrastructure (model serving, GPU orchestration, AI gateway)
- Agentic workflow infrastructure and LLM integration patterns
- Software supply chain security (SLSA, SBOM, signing)
- Edge orchestration platforms (KubeEdge, OpenYurt)
- Edge IoT integration and runtime frameworks (Eclipse Vorto, AWS Greengrass, Azure IoT Edge)

## Typical Day-to-Day Activities

- Designing platform architecture components
- Creating reference architectures for developers
- Consulting on complex platform integration challenges
- Evaluating new technologies for platform enhancement
- Leading architecture reviews for platform components
- Developing platform governance frameworks
- Collaborating with product owners on strategic roadmaps
- Working with senior engineers on implementation approaches
- Mentoring platform engineers on architectural concepts
- Researching industry trends in developer platforms
- Designing edge platform deployment patterns and extending golden paths to edge and IoT environments

## Key Performance Indicators

- Architecture design quality and effectiveness
- Alignment of platform design with developer needs
- Platform architecture scalability and flexibility
- Developer experience improvement through architecture
- Platform reliability and performance through design
- Adoption of reference architectures and golden paths
- Reduction in architectural complexity
- Innovation in platform approaches
- Technical leadership effectiveness
- Knowledge transfer to engineering teams
- Edge workload onboarding time: time from request to production-ready edge deployment
- Edge platform availability: uptime SLA for IDP golden paths and self-service tooling at edge locations

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; platform architecture is design, consultation, and governance focused
- **Collaboration Tools:** Microsoft Teams, Jira, Confluence, GitHub, Backstage/Port/IDP consoles, cloud platform portals, and architecture diagramming tools
- **On-Site Requirements:** Not required; architecture consultation and governance is performed remotely
- **Time Zone Flexibility:** Standard hours with flexibility for distributed team architecture reviews and cross-regional platform strategy sessions
- **On-Call / Operational Demands:** Not typically on-call; provides architectural guidance during critical IDP outages affecting developer productivity organization-wide

## Career Development Path

**Previous Roles:**

- Platform Engineering Senior Engineer
- DevOps Architect
- Cloud Architect
- Software Architect with platform focus
- Site Reliability Engineering Lead

**Potential Next Roles:**

- Chief Architect
- VP of Engineering
- Technology Strategy Executive
- CTO track positions
- Engineering Transformation Leader

## Recommended Certifications & Learning Paths

- TOGAF Certified Enterprise Architect
- AWS Solutions Architect Professional
- Microsoft Certified: Azure Solutions Architect Expert
- Google Cloud Professional Cloud Architect
- Certified Kubernetes Security Specialist (CKS)
- HashiCorp Certified: Terraform & Vault
- GitHub Advanced Security certification
- DevOps Leader / DORA metrics practitioner certification
- Cloud Native Architecture certification (CNCF)
- Platform Engineering Leadership certification
- Site Reliability Engineering certification

**Complementary Certifications:**

- Certified Kubernetes Administrator (CKA) or CKS, TOGAF, HashiCorp Vault and Terraform certifications, DORA DevOps Leader certification, and CNCF Kubernetes and Cloud Native Associate (KCNA)

**Learning Resources and Communities:**

- platformengineering.org, CNCF community (cncf.io), Backstage community (backstage.io), DORA research publications (dora.dev), Kelsey Hightower talks, KubeCon + CloudNativeCon content, and DevEx conference resources
