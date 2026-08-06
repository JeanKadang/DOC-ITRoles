# Azure Cloud Architect

| Field | Value |
|---|---|
| **Domain** | Cloud Platforms |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Architect |
| **Reports To** | Cloud, Platform & Infrastructure Chapter Lead |
| **Direct Reports** | None (sets technical direction and mentors Azure Cloud Senior Engineers; formal line management sits with the Chapter Lead) |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Azure Cloud Platform Architect designs, implements, and governs cloud solutions using Microsoft Azure. This role is responsible for creating a secure, scalable, and cost-effective cloud environment that aligns with business objectives and technical requirements.

## Role Scope & Boundaries

- **Scope of Influence:** Domain-wide — Azure platform architecture and technology standards across the chapter
- **Experience Anchor:** 8+ years in Azure or cloud architecture with demonstrated architecture-level delivery — operates independently on domain-wide Azure architecture decisions within the Cloud Lead Architect's cross-platform standards
- **Out of Scope:** Cross-platform architecture consistency (Cloud Lead Architect-owned, this role escalates cross-platform problems to it); Windows Server / hybrid identity infrastructure (Windows Server Architect-owned, this role aligns Entra ID to it); AKS cluster architecture (Kubernetes Architect-owned, this role coordinates with it)
- **Escalates To:** Cloud Lead Architect — complex cross-platform cloud problems
- **Escalated To By:** Azure Cloud Senior Engineers on solution design questions

## Business Impact

- **Business Objective:** Designs secure, scalable, and cost-optimized Azure architectures that enable the organization to accelerate workload delivery, modernize applications, and exploit Microsoft cloud services effectively
- **Value Metrics:** Cloud infrastructure cost reduction, Azure environment availability, time-to-deploy for new workloads, reduction in security findings, landing zone adoption rate
- **Key Stakeholders:** CTO/CIO, application teams, DevOps teams, FinOps, Security and Compliance, Microsoft enterprise account team
- **Processes Supported:** Application hosting and migration to Azure, CI/CD infrastructure, hybrid identity and networking, cloud security posture management, FinOps cost governance

## Key Responsibilities

- Design and implement Azure cloud architectures following Microsoft best practices
- Develop cloud governance frameworks, including policies and guardrails
- Create and maintain landing zone patterns for different workloads
- Optimize Azure resources for cost, performance, and security
- Implement cloud security controls and compliance requirements
- Design hybrid and multi-cloud connectivity patterns
- Establish cloud monitoring and management strategies
- Architect generative AI and Azure AI workload deployments (Azure AI Foundry, Azure OpenAI)
- Design cloud architectures that comply with data residency and sovereignty requirements, leveraging Azure sovereign cloud offerings for regulated industries
- Provide technical leadership for Azure migrations and modernization initiatives

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Azure architecture standards, landing zone design, and subscription governance strategy | Enterprise security architecture and overall multi-cloud strategy |
| Azure service selection, reference architecture patterns, and IaC standards (Bicep/Terraform) | Application architecture and modernization approach decisions |
| Azure governance framework, Azure Policy guardrails, and compliance control design | Organizational cloud cost management and FinOps practices |

## Required Skills & Qualifications

- Deep knowledge of Azure services and architectural patterns
- Experience with Azure networking, security, and identity management
- Understanding of Infrastructure as Code using ARM templates or Terraform
- Knowledge of Azure cost management and optimization techniques
- Experience with Azure DevOps and deployment automation
- Familiarity with compliance frameworks in cloud environments
- Relevant certifications (Microsoft Certified: Azure Solutions Architect Expert)

**Technology Proficiency Levels:**

**Expert level required:**

- Azure Well-Architected Framework
- Azure Kubernetes Service (AKS)
- Azure Networking (Hub-spoke, vWAN, ExpressRoute, Azure Firewall)
- Azure Security (Entra ID, RBAC, PIM, Conditional Access)

**Proficient level required:**

- Terraform / Bicep (IaC for Azure)
- Azure DevOps / GitHub Actions
- Azure Monitor (metrics, alerts, dashboards, Log Analytics)

**Working Knowledge required:**

- Azure Cost Management and Billing
- Microsoft Defender for Cloud (CSPM, workload protections)

**Awareness level expected:**

- Azure AI Foundry and Azure OpenAI Service
- Sovereign cloud patterns (Azure Government, EU Data Boundary, Microsoft Cloud for Sovereignty)

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Windows Server Architect | Microsoft Entra ID and hybrid services | Collaborates |
| Kubernetes Architect | Azure Kubernetes Service implementations | Collaborates |
| Database Architect | Azure database services | Collaborates |
| Observability Architect | Azure Monitor and Log Analytics | Collaborates |
| AWS Cloud Platform Architect | Multi-cloud strategies | Collaborates |

## Key Technologies

- Azure landing zone design frameworks
- Azure Well-Architected Framework
- Enterprise-scale Azure architecture patterns
- Azure networking architectures (Hub-spoke, vWAN)
- Microsoft Entra ID architecture
- Azure security design patterns and services
- Hybrid and multi-cloud connectivity designs
- Azure infrastructure as code (Bicep, ARM, Terraform, OpenTofu)
- Azure governance and management frameworks
- Azure cost optimization architectures
- Serverless and PaaS architectural patterns
- Azure application hosting architectures
- Azure AI Foundry and Azure OpenAI Service architecture
- Azure AI Search (vector and hybrid search) and RAG patterns
- Azure Container Apps and Azure Kubernetes Service
- Azure Arc for hybrid and multi-cloud management
- Azure Sovereign Cloud and data residency: Azure Government, Microsoft Cloud for Sovereignty, EU Data Boundary compliance, and national cloud deployment patterns for regulated industries

## Typical Day-to-Day Activities

- Designing complex Azure cloud architectures
- Creating enterprise reference architectures
- Consulting on application cloud migration strategies
- Evaluating new Azure services and features
- Leading architecture reviews for Azure implementations
- Developing governance frameworks and policies
- Collaborating with product owners on strategic roadmaps
- Working with security teams on secure cloud design
- Mentoring senior engineers on architectural concepts
- Researching industry trends in cloud architecture

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Designs approved at first architecture review, without rework (%) | ≥80% (proposed) | Quarterly |
| Cloud designs accepted by the requesting business owner without rework (%) | ≥80% (proposed) | Quarterly |
| Cloud architecture scalability and flexibility | — | — |
| Cost efficiency of designed cloud solutions | — | — |
| Cloud designs passing security review at first submission (%) | ≥80% (proposed) | Quarterly |
| Adoption of cloud reference architectures and patterns | — | — |
| Recorded architectural risks and debt items closed (count per quarter) | — | — |
| New cloud patterns adopted into the reference architecture (count per year) | — | — |
| Engineers mentored who progress to the next competency level (count per year) | — | — |
| Knowledge-sharing sessions delivered to engineering teams (count per quarter) | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; cloud architecture work is design, documentation, and consultation-focused with no physical infrastructure requirements
- **Collaboration Tools:** Microsoft Teams, Jira, Confluence, GitHub/ADO, Azure Portal, and diagramming tools for architecture artifacts
- **On-Site Requirements:** Minimal; occasional on-site for strategic workshops or hybrid connectivity planning with networking teams
- **Time Zone Flexibility:** Standard business hours with flexibility for cross-regional reviews and Microsoft partner engagements
- **On-Call / Operational Demands:** Not typically on-call; available for critical architecture escalations or major incident architectural support

## Career Development Path

**Previous Roles:**

- Azure Cloud Senior Engineer
- Cloud Solutions Architect
- Enterprise Application Architect
- Technical Infrastructure Lead
- DevOps Architect

**Potential Next Roles:**

- Chief Architect
- Cloud Strategy Executive
- CTO/CIO track positions
- VP of Cloud Engineering
- Digital Transformation Leader

## Recommended Certifications & Learning Paths

- Microsoft Certified: Azure Solutions Architect Expert (AZ-305)
- Microsoft Certified: DevOps Engineer Expert (AZ-400)
- Microsoft Certified: Azure Security Engineer Associate (AZ-500)
- Microsoft Certified: Azure Network Engineer Associate (AZ-700)
- Microsoft Certified: Azure AI Engineer Associate (AI-102)
- HashiCorp Certified: Terraform Associate
- Certified Cloud Security Professional (CCSP)
- TOGAF or other enterprise architecture certification
- Azure VMware Solution specialist certification
- FinOps Certified Practitioner

**Complementary Certifications:**

- AWS or GCP architect certifications for multi-cloud context, TOGAF for enterprise architecture, CISSP, Agile/SAFe certifications, and FinOps Certified Practitioner

**Learning Resources and Communities:**

- Microsoft Learn (learn.microsoft.com), Azure Architecture Center, Azure Friday YouTube series, A Cloud Guru Azure paths, and Microsoft Tech Community forums
