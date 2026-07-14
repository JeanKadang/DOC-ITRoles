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

- **Major incident (P1/P2)** — on-call engineers and SREs escalate to the **Major Incident Manager**, who has incident-scoped authority to direct any team onto the bridge; incidents identified as security events hand off to the **Security Architect**; executive notification goes via the Service Management Architect.
- **Emergency or disputed change** — engineering teams appeal risk classification to the **Change / Release Manager**; unresolved CAB disputes and organisation-wide change freezes escalate to the Service Management Architect.
- **DR invocation and recovery gaps** — service owners raise recovery capability gaps to the **BC/DR Manager**; BIA-identified risks requiring investment or risk acceptance escalate to the Security & Identity Chapter Lead, and to the **CISO** where regulatory implications exist.
- **Privacy incident or new personal-data processing** — any domain Architect consults the **Data Privacy Officer** before launching features that collect new personal data; privacy incidents with material regulatory exposure escalate to the **CISO** and Legal/Compliance.
- **Data classification or stewardship dispute** — domain data stewards escalate cross-domain data quality and classification conflicts to the **Data Governance Lead**; unresolved policy disputes go to the Data & AI Chapter Lead.
- **Risk acceptance and audit findings** — control gaps route through the **GRC / Risk & Compliance Analyst**; risk acceptance for unremediated high/critical risks is a **CISO** decision.
- **Vendor or license conflict** — technical decisions blocked by a vendor relationship or license constraint go to the **Vendor / Supplier / IT Asset Manager**; major contract risk escalates to the Service Management Architect.
