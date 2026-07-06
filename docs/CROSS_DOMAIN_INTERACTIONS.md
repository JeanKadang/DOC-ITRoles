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

## Security domain scope clarification

The repository contains three distinct security-related domains. The boundaries below prevent overlap and duplicate ownership.

- **`security/`** — General security architecture: threat modelling, security controls framework, SIEM and SOC architecture, incident response frameworks, penetration testing governance, and organisation-wide security policies.

- **`security_cross_platform/`** — Security patterns that span multiple technology platforms: zero trust architecture implementation, cloud security posture management (CSPM), DevSecOps control frameworks that cut across domains, supply chain security, and security automation tooling.

- **`security_identity/`** — Identity and access management architecture: Microsoft Entra ID, RBAC and ABAC design, privileged access management (PAM), identity governance and administration (IGA), federation and SSO, and passwordless authentication.

## Escalation paths

When architectural decisions conflict between domains, use the following escalation chain.

1. **Domain architects** — resolve peer-level conflicts directly; preferred first step
2. **Lead Architect** (cloud-related conflicts: Cloud Lead Architect; others: relevant cluster Lead Architect) — if peer resolution fails
3. **Principal Cloud Architect** — for multi-cloud strategic conflicts or decisions with organisation-wide platform implications
4. **Chapter Lead** — for conflicts that span multiple domains within a chapter, or where chapter-level standards need to be set or enforced
5. **TAL (Technical Area Lead)** — final technical escalation; owns the technical direction for the entire IT area
6. **PAL (Product Area Lead)** — escalation for business priority conflicts or decisions requiring budget authority
7. **SVP of Technology / CISO** — executive escalation for strategic decisions, major risk issues, or decisions requiring board-level visibility
