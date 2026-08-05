# Cross-domain interactions

This document maps how the domains in this role repository interact with each other, clarifying ownership boundaries, key collaboration touchpoints, and escalation paths. It is intended to reduce ambiguity when architectural decisions span multiple domains and to serve as a reference for architects and leads navigating cross-functional work.

## Domain ownership boundaries

The table below records which domain holds primary decision-making authority over shared technologies. Primary owners make final calls; Consulted domains provide input and must be aligned before decisions are finalised.

| Technology / Decision | Primary Owner | Consulted |
|---|---|---|
| Kubernetes platform selection | Kubernetes | Cloud Platforms, DevOps |
| API gateway product | App Platforms | Integration & Middleware, Security |
| CI/CD toolchain | DevOps | Cloud Platforms, Security |
| Cloud landing zone design | Cloud Platforms | Network, Security, Enterprise Architecture |
| Identity and access management | Security & Identity | Directory Services, Cloud Platforms |
| Observability platform | Modern Infrastructure | All domains (consumers) |
| Data lakehouse table format | Data Engineering | Database Management, AI Governance |
| AI/ML platform | AI Governance | Cloud Platforms, Data Engineering, Kubernetes |
| Network architecture | Network | Cloud Platforms, Security |
| Cost governance | FinOps | All domains (consumers) |
| Integration platform | Integration & Middleware | App Platforms, DevOps, Data Engineering |
| Endpoint management | Endpoint Management | Modern Workplace, Security |
| Change enablement and the production change calendar | Service Management (Change / Release Manager) | DevOps, all delivery domains |
| Major incident and problem management | Service Management (Major Incident Manager) | All domains (responders), Security |
| Business continuity and disaster recovery standards | Data Protection (BC/DR Manager) | Service Management, Cloud Platforms, Modern Infrastructure |
| Data governance policy, classification scheme, and data catalogue | Data Management (Data Governance Lead) | Security, Data Engineering, AI Governance |
| Personal data privacy program and DPIAs | Data Management (Data Privacy Officer) | Security, Data Protection, Legal (external) |
| Enterprise risk register and compliance framework mapping | Security (GRC / Risk & Compliance Analyst) | All domains (evidence providers) |
| Vendor contracts, IT asset and software license management | Service Management (Vendor / Supplier / IT Asset Manager) | FinOps, Endpoint Management, Procurement (external) |
| Automation framework and reusable tooling standards (cross-domain) | DevOps (Automation Framework Engineer) | Infrastructure Automation Architect, Network Automation Architect, Security Automation Engineer |
| Site reliability engineering practice and SLO/error-budget methodology | Modern Infrastructure (Site Reliability Engineer / Senior SRE) | DevOps, Database Management, Data Protection |
| Service desk support model, staffing, and Tier-1/2/3 escalation boundaries | Service Desk (Service Desk Lead) | Client Platform, Endpoint Management, Modern Workplace, Service Management |
| Hypervisor platform selection and virtual infrastructure standards | Virtualization | Server Hardware, Network, Data Management, Security |
| Physical server platform, capacity, and refresh strategy | Server Hardware | Virtualization, Specialized Computing, Data Management, Network |
| HPE-specific server tooling and firmware baselines (OneView, iLO) | HPE Server Hardware | Server Hardware, Network, Specialized Computing |
| Linux OS build standards, hardening baselines, and patching cadence | Linux Server OS | Security, Kubernetes, Database Management, Specialized Computing |
| Windows Server OS build standards, hardening baselines, and patching cadence | Windows Server OS | Security, Directory Services, Cloud Platforms, Server Hardware |
| HPC and specialised compute (GPU, research computing) platform design | Specialized Computing | Server Hardware, Linux Server OS, Network, Data Management |
| Cloud security posture management and cross-platform guardrails | Security Cross-Platform | Security, DevOps, Cloud Platforms, Kubernetes |
| CMDB structure, configuration item model, and service catalogue design | ITSM & Configuration | Service Management, DevOps, Security, Enterprise Architecture |
| Infrastructure onboarding pathway and platform intake standards | Infrastructure Onboarding | DevOps, Enterprise Architecture, ITSM & Configuration, Security Cross-Platform |
| Chapter structure, technical career framework, and engineering practice standards | Leadership | Enterprise Architecture, all chapters |
| Enterprise technology strategy, IT investment, and risk appetite | C-Suite | Leadership, Enterprise Architecture, Security & Identity |

## Key cross-domain relationships

The pairs below represent the most frequent and consequential collaboration relationships in the repository. Each entry describes what the two domains work on together.

- **Cloud Platforms ↔ Network** — landing zone connectivity, hub-spoke topology, ExpressRoute / Direct Connect design, DNS and routing standards
- **Cloud Platforms ↔ Security** — cloud security posture management (CSPM), policy-as-code (Azure Policy, AWS SCPs), secure landing zone guardrails
- **DevOps ↔ Security** — DevSecOps pipeline integration, supply chain security (SLSA, SBOM, Sigstore/Cosign), security gates in CI/CD
- **DevOps ↔ Cloud Platforms** — IaC standards (Terraform, Bicep), deployment pipeline patterns, platform engineering and internal developer platforms
- **Kubernetes ↔ Cloud Platforms** — managed Kubernetes services (AKS, EKS, GKE), cluster networking (CNI selection), node pool and quota management
- **Kubernetes ↔ Data Engineering** — ML workloads on Kubernetes (Kubeflow, Ray, Apache Spark on K8s), GPU node pool design
- **AI Governance ↔ Data Engineering** — data quality requirements for ML, feature store design, model training data lineage and cataloguing
- **AI Governance ↔ Security** — AI-specific security controls (prompt injection, model access policies), EU AI Act compliance, NIST AI RMF alignment
- **FinOps ↔ Cloud Platforms** — cost allocation tagging standards, commitment (Reserved Instance / Savings Plan) optimisation, cloud billing governance
- **Enterprise Architecture ↔ All** — architecture governance framework, EA repository maintenance, cross-domain Architecture Decision Records (ADRs)
- **Service Management ↔ DevOps** — change enablement for pipeline-driven delivery: standard-change models for CI/CD deployments, pre-approved change templates, change calendar integration; the Change / Release Manager owns change risk classification, the DevOps domain owns the pipeline tooling itself
- **Service Management ↔ Data Protection** — major-incident coordination vs recovery execution: the Major Incident Manager runs the incident bridge and communications; the BC/DR Manager owns recovery plans, BIA coverage, and DR test governance; the affected service's engineers execute the technical recovery
- **Data Management ↔ Security** — classification vs enforcement: the Data Governance Lead defines the classification scheme and data catalogue; Security implements the enforcing controls (DLP, access policy); the Data Privacy Officer sets the privacy requirements both must satisfy for personal data
- **Service Management ↔ FinOps** — license and contract inputs to cloud cost governance: the Vendor / Supplier / IT Asset Manager provides the contract register, license entitlements, and renewal pipeline that FinOps consumes for commitment and cost optimisation decisions
- **Virtualization ↔ Server Hardware** — node specifications for hypervisor clusters (Nutanix, vSphere, Hyper-V hosts), firmware/HCL compatibility, and capacity planning for the physical estate the virtual platform runs on
- **Virtualization ↔ Network** — virtual switching and overlay networking (NSX, distributed switches), east-west traffic design, and connectivity requirements for cluster and vMotion/live-migration traffic
- **Virtualization ↔ Data Management** — virtual storage design: datastore and container layout, storage policy-based management, and the interaction between hypervisor-level and array-level protection
- **Server Hardware ↔ Specialized Computing** — HPC and GPU node selection, high-density rack power and cooling constraints, and interconnect (InfiniBand/RoCE) requirements the standard server platform does not cover
- **Linux Server OS ↔ Kubernetes** — container host configuration: kernel and runtime tuning, host hardening for worker nodes, and the boundary between OS-level patching and cluster node lifecycle
- **Windows Server OS ↔ Directory Services** — domain-joined server build standards, Group Policy scope for server workloads, and the split between OS hardening baselines and directory-enforced policy
- **Security Cross-Platform ↔ DevOps** — shift-left posture management: surfacing CSPM and compliance-as-code checks inside CI/CD pipelines so misconfiguration is caught before deployment rather than detected in production
- **Security Cross-Platform ↔ Security** — scope split: Security owns organisation-wide policy, threat modelling and the control framework; Security Cross-Platform owns the posture tooling and automated enforcement that implements it across cloud and platform estates
- **ITSM & Configuration ↔ Service Management** — tooling versus process: ITSM & Configuration owns the platform build, CMDB model and integrations; Service Management owns the process design, SLAs and governance those capabilities serve
- **Infrastructure Onboarding ↔ DevOps** — pipeline integration for platform intake: onboarding standards expressed as reusable pipeline stages and templates rather than manual gates
- **Infrastructure Onboarding ↔ ITSM & Configuration** — service catalogue design for onboarding requests, and ensuring newly onboarded infrastructure registers correctly as configuration items
- **HPE Server Hardware ↔ Server Hardware** — vendor-specific depth within the general platform: HPE OneView/iLO tooling, firmware baselines and support entitlements operating inside the hardware standards the broader domain sets
- **Leadership ↔ Enterprise Architecture** — chapter leads and architects jointly own how architecture principles reach delivery teams: EA sets the standards, chapter leadership owns capability, staffing and adoption within each chapter
- **C-Suite ↔ Leadership** — strategy to delivery: the C-Suite sets technology direction, investment envelope and risk appetite; SVP/TAL/PAL and chapter leads translate those into structure, headcount and roadmaps
- **C-Suite ↔ Security & Identity** — the CISO's dual line: security strategy and risk reporting run to the CEO/Board where governance independence requires it, while day-to-day security delivery sits with the Security & Identity chapter

## Security domain scope clarification

The repository contains three distinct security-related domains. The boundaries below prevent overlap and duplicate ownership.

- **`security/`** — General security architecture: threat modelling, security controls framework, SIEM and SOC architecture, incident response frameworks, penetration testing governance, and organisation-wide security policies.

- **`security_cross_platform/`** — Security patterns that span multiple technology platforms: zero trust architecture implementation, cloud security posture management (CSPM), DevSecOps control frameworks that cut across domains, supply chain security, and security automation tooling.

- **`security_identity/`** — Identity and access management architecture: Microsoft Entra ID, RBAC and ABAC design, privileged access management (PAM), identity governance and administration (IGA), federation and SSO, and passwordless authentication.

## Data governance scope clarification

Three roles share the data-classification and privacy space. The boundaries below prevent overlap and duplicate ownership.

- **Data Governance Lead** (`data_management/`) — owns data governance policy, the classification scheme, the data catalogue, and the stewardship model. Classification work feeds the other two roles but carries no privacy or enforcement authority of its own.

- **Data Privacy Officer** (`data_management/`) — owns the personal-data privacy program: DPIAs, privacy-by-design requirements, and regulator contact where legally required. Consumes the Data Governance Lead's classification; defines the privacy requirements Security's controls must meet; external Legal owns regulatory interpretation.

- **Security** (`security/`, `security_identity/`) — owns the enforcing controls: DLP, access policy, encryption standards, and monitoring. Implements against the classification scheme and privacy requirements; does not define either.

## Automation domain scope clarification

Automation work is distributed across four domains rather than owned centrally. The boundaries below prevent duplicate framework-building and clarify who owns cross-domain automation standards.

- **Automation Framework Engineer** (`devops/`) — owns the shared, reusable automation primitives consumed *by other engineers* across every domain: test automation frameworks, IaC module libraries, GitHub Actions reusable workflows, and internal automation SDKs/CLIs. Operates at the meta-level — builds the tooling other domains automate with, rather than owning any domain's automation architecture itself.

- **Infrastructure Automation Architect** (`modern_infrastructure/`) — owns infrastructure automation standards, IaC coding patterns, and module library governance across cloud platforms: drift detection, compliance-as-code, and self-healing infrastructure design.

- **Network Automation Architect** (`network/`) — owns network automation toolchain architecture and standards: network-as-code workflows, CI/CD pipeline design for network changes, and intent-based networking automation. Scoped to network infrastructure only.

- **Security Automation Engineer** (`security_cross_platform/`) — owns security automation tooling: policy-as-code rule authoring, SOAR playbook design, and CI/CD-embedded security scanning. Scoped to security control automation only.

Each domain owns the automation *architecture and standards for its own domain*; none of the architect/engineer roles above selects tooling on another domain's behalf. Where a team needs a reusable building block rather than a domain-specific pattern, the Automation Framework Engineer is the consumption point, not a domain automation architect.

## Reliability domain scope clarification

Four roles apply Site Reliability Engineering principles to different systems. The boundary is the system under reliability engineering, not the practice itself — each role owns SLOs, error budgets, and chaos engineering only for its own system class.

- **Site Reliability Engineer / Senior SRE** (`modern_infrastructure/`) — applies SRE practice to production application and platform systems generally; the Senior SRE leads SLO/SLI design for critical services and sets the org-wide SRE methodology (error budget policy shape, chaos engineering standards) that the other three roles below apply within their own system scope.

- **Platform Reliability Engineer** (`devops/`) — applies SRE practice specifically to the internal developer platform and shared engineering infrastructure (CI/CD, developer portals, self-service provisioning, shared Kubernetes clusters), treating internal engineering teams as its customers rather than end users or external products.

- **Database Reliability Engineer** (`database_management/`) — applies SRE practice specifically to database systems: failover automation, replication reliability, and database-specific observability.

- **Backup Reliability Engineer** (`data_protection/`) — applies SRE practice specifically to backup infrastructure: backup job health, restore reliability, and backup-specific observability.

The closest overlap is Site Reliability Engineer and Platform Reliability Engineer: the former owns reliability for production application/infrastructure systems broadly, the latter is scoped exclusively to the internal developer platform and does not own product-facing service SLOs.

## Endpoint tooling scope note

- **SCCM Engineer** vs **Endpoint Management Engineer** (`endpoint_management/`) — the SCCM Engineer is the ConfigMgr/MECM tool specialist for deep on-premises configuration-manager work; the Endpoint Management Engineer is the generalist owning day-to-day operation of the full endpoint stack (Intune and MECM/SCCM) across Windows, macOS, iOS, and Android. Same tool-specific-beside-generalist pattern used elsewhere in this repository.

## Escalation paths

When architectural decisions conflict between domains, use the following escalation chain.

1. **Domain architects** — resolve peer-level conflicts directly; preferred first step
2. **Lead Architect** (cloud-related conflicts: Cloud Lead Architect; others: relevant cluster Lead Architect) — if peer resolution fails
3. **Principal Cloud Architect** — for multi-cloud strategic conflicts or decisions with organisation-wide platform implications
4. **Chapter Lead** — for conflicts that span multiple domains within a chapter, or where chapter-level standards need to be set or enforced
5. **TAL (Technical Area Lead)** — final technical escalation; owns the technical direction for the entire IT area
6. **PAL (Product Area Lead)** — escalation for business priority conflicts or decisions requiring budget authority
7. **SVP of Technology / CISO** — executive escalation for strategic decisions, major risk issues, or decisions requiring board-level visibility

### Operational and governance escalations

The chain above covers architectural conflicts. Operational and governance events have their own entry points, aligned with each role's documented scope:

- **Major incident (P1/P2)** — on-call engineers and SREs escalate to the **Major Incident Manager**, who has incident-scoped authority to direct any team onto the bridge; incidents identified as security events hand off to the **Security Architect**; executive notification goes via the Service Management Architect. End-user-reported outages typically surface first through the **Service Desk**, whose Senior Analysts confirm the pattern before escalating to the Major Incident Manager.
- **Emergency or disputed change** — engineering teams appeal risk classification to the **Change / Release Manager**; unresolved CAB disputes and organisation-wide change freezes escalate to the Service Management Architect.
- **DR invocation and recovery gaps** — service owners raise recovery capability gaps to the **BC/DR Manager**; BIA-identified risks requiring investment or risk acceptance escalate to the Security & Identity Chapter Lead, and to the **CISO** where regulatory implications exist.
- **Privacy incident or new personal-data processing** — any domain Architect consults the **Data Privacy Officer** before launching features that collect new personal data; privacy incidents with material regulatory exposure escalate to the **CISO** and Legal/Compliance.
- **Data classification or stewardship dispute** — domain data stewards escalate cross-domain data quality and classification conflicts to the **Data Governance Lead**; unresolved policy disputes go to the Data & AI Chapter Lead.
- **Risk acceptance and audit findings** — control gaps route through the **GRC / Risk & Compliance Analyst**; risk acceptance for unremediated high/critical risks is a **CISO** decision.
- **Vendor or license conflict** — technical decisions blocked by a vendor relationship or license constraint go to the **Vendor / Supplier / IT Asset Manager**; major contract risk escalates to the Service Management Architect.
