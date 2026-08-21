# Solution Architect

| Field | Value |
|---|---|
| **Role ID** | `solution-architect` |
| **Domain** | Enterprise Architecture |
| **Chapter:** | Service & Governance |
| **Role Level** | Architect |
| **Reports To** | Enterprise Architect <!-- role: enterprise-architect --> |
| **Direct Reports** | None (technical direction role, not a people manager) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Solution Architect is responsible for designing end-to-end technical solutions for specific projects, programmes, or business problems. Where the Enterprise Architect operates at the strategic portfolio and long-term roadmap level, the Solution Architect works at the *initiative* level - translating defined business requirements into a coherent, feasible technical design that can be handed to engineering teams for delivery. This role is the primary technical authority for a solution's scope: from component selection and integration design to security, performance, and cost considerations. Solution Architects are found across all IT domains and frequently operate in a cross-functional, cross-platform capacity.

## Role Scope & Boundaries

- **Scope of Influence:** Cross-domain, engagement-scoped — solution design and component selection within enterprise architecture standards for a specific initiative or programme
- **Experience Anchor:** 8+ years in solution/technical architecture with demonstrated delivery of enterprise-scale solutions — operates independently within EA-set guardrails, escalating enterprise-wide-impact decisions
- **Out of Scope:** Enterprise architecture standards and guardrails (set by the Enterprise Architect); business requirements and scope definition (with Business/PO); budget and commercial decisions (with Finance/Procurement); security policy and organisational risk appetite (with CISO)
- **Escalates To:** Enterprise Architect — decisions with enterprise-wide impact and guardrail exceptions
- **Escalated To By:** Engineering Teams on implementation-level design clarification

## Business Impact

- **Business Objective:** Ensure that technology investments for business initiatives are designed soundly, delivered successfully, and achieve their intended business outcomes on time and within budget.
- **Value Metrics:** Solution delivery success rate (on-scope, on-time), post-implementation defect rate, solution TCO vs. estimate accuracy, stakeholder confidence in technical proposals, reduction in late-stage rework.
- **Key Stakeholders:** Business sponsors and programme managers, product owners, delivery leads, engineering teams, security, enterprise architects, procurement.
- **Processes Supported:** Project initiation and business case development, solution design and documentation, vendor evaluation, technical governance and design authority, delivery assurance.

## Key Responsibilities

- Translate business requirements and constraints into technically sound, deliverable solution architectures.
- Produce solution design documentation: high-level design (HLD), low-level design (LLD), integration architecture, data flow diagrams, and component diagrams.
- Define non-functional requirements (NFRs) including performance, availability, scalability, security, and compliance constraints.
- Evaluate and select technologies, platforms, and vendor products appropriate to the solution's requirements and organisational standards.
- Ensure proposed solutions align with enterprise architecture standards, security policies, and technology guardrails.
- Present and defend solution designs at design authority, architecture review boards (ARB), and to business stakeholders.
- Collaborate with security architects to embed security-by-design into solution proposals.
- Provide technical direction and oversight to engineering delivery teams throughout the solution build phase.
- Identify and document solution risks, assumptions, issues, and dependencies (RAID log).
- Conduct technology evaluations and proof-of-concept activities to validate architectural decisions.
- Participate in vendor selection and RFI/RFP processes as subject matter expert.
- Mentor engineers and review technical designs produced by delivery teams.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Solution design and component selection within approved standards | Enterprise architecture standards and guardrails (set by EA) |
| Integration architecture and API design patterns for the solution | Business requirements and scope definition (with Business/PO) |
| NFR definition and solution sizing | Budget and commercial decisions (with Finance/Procurement) |
| RAID log and solution-level risk decisions | Security policy and organisational risk appetite (with CISO) |
| Technical governance of delivery teams during build phase | Organisational change management (with Programme Management) |

## Required Skills & Qualifications

**Technical Skills:**

- Broad, cross-domain technical knowledge spanning infrastructure, cloud, application, networking, and security.
- Experience producing architecture artefacts: HLD, LLD, C4 diagrams, sequence diagrams, data flow diagrams.
- Proficiency with cloud platforms (at least one of Azure, AWS, GCP) and hybrid architecture patterns.
- Understanding of integration patterns: REST APIs, event-driven architecture, messaging (Service Bus, Kafka), ETL/ELT.
- Knowledge of security architecture principles: Zero Trust, defence in depth, authentication and authorisation patterns.
- Familiarity with architecture frameworks: TOGAF, Zachman, or equivalent; C4 modelling.
- Experience with containerisation (Docker, Kubernetes) and modern application deployment patterns.
- Ability to estimate solution sizing, infrastructure costs, and capacity requirements.
- Strong documentation skills: clear, audience-appropriate technical writing.

**Soft Skills and Leadership:**

- Exceptional ability to communicate technical concepts to non-technical business stakeholders.
- Strong facilitation skills for workshops, design sessions, and requirements gathering.
- Ability to influence and build consensus across multiple teams without direct authority.
- Resilience to challenge and defend design decisions under scrutiny.
- Structured thinking and ability to manage complexity across multiple workstreams.

**Technology Proficiency Levels:**

**Expert level required:**

- Azure (design/integration)
- Structurizr C4/Lucidchart (solution architecture modeling)
- Azure Integration Services/MuleSoft

**Proficient level required:**

- Kubernetes/Docker/AKS (containerization)
- Azure APIM/AWS API Gateway (API management)
- Microsoft Entra ID/OAuth 2.0/OIDC

**Working Knowledge required:**

- Terraform/Bicep (IaC design review)
- AWS/GCP (cross-cloud design awareness)

**Awareness level expected:**

- ArchiMate (EA modeling)
- serverless architectures (Azure Functions/AWS Lambda)

## Interactions with Other Roles

> **Interaction Mode** describes the direction/nature of the relationship: **Collaborates** (peer-to-peer), **Consumes From** (relies on the other role's output/service), **Provides To** (delivers a service the other role consumes), **Governed By** (subject to the other role's standards/approval), or **Escalates To** (routes unresolved issues upward).

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Enterprise Architect: | Receive strategic direction, architecture principles, and guardrail policies; escalate decisions with enterprise-wide impact | Escalates To |
| Product Owner / Programme Manager: | Receive and clarify business requirements; manage scope of design engagement | Consumes From |
| Security Architect: | Collaborate on security design within the solution; obtain security sign-off | Governed By |
| Engineering Teams: | Provide technical direction during delivery; review implementation against design | Provides To |
| Domain Architects (Cloud, Network, Data, etc.): | Engage domain specialists for deep-dive design in their areas | Collaborates |
| Vendors / System Integrators: | Lead technical engagement during procurement and delivery | Governed By |

## Key Technologies

- Cloud platforms: Azure, AWS, GCP (design and integration level)
- Architecture tooling: Lucidchart, draw.io, Archi, Structurizr (C4)
- Integration platforms: Azure Integration Services, MuleSoft, Apache Kafka, AWS EventBridge
- Containerisation: Kubernetes, Docker, Azure Kubernetes Service, AWS EKS
- Identity and Access Management: Microsoft Entra ID, SAML, OAuth 2.0, OpenID Connect
- Infrastructure as Code: Terraform, Bicep, Pulumi (design review level)
- API Management: Azure API Management, AWS API Gateway, Kong
- Documentation: Confluence, SharePoint, Markdown + Git

## Typical Day-to-Day Activities

- Facilitating requirements workshops with business sponsors and product owners.
- Producing or reviewing solution design documents and architecture diagrams.
- Attending design authority or architecture review board meetings to present solutions.
- Working with security architects to review solution designs against security baselines.
- Supporting delivery teams with technical queries and design interpretations.
- Conducting technology evaluations or proof-of-concept spikes.
- Reviewing vendor responses to RFPs and scoring against architectural requirements.
- Updating RAID logs and communicating architecture risks to programme leadership.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Solution design approval time at Architecture Review Board | — | — |
| Post-go-live defect rate attributable to design issues | — | — |
| Stakeholder satisfaction scores on design quality and communication | ≥85% (proposed) | Quarterly |
| Accuracy of solution cost estimates (budget vs. actuals) | — | — |
| NFR compliance rate of delivered solutions in first 3 months | — | — |
| Volume of solutions successfully delivered per year | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible for design and documentation work; workshops may benefit from on-site facilitation.
- **Collaboration Tools:** Microsoft Teams, Lucidchart/draw.io, Confluence, SharePoint, Jira, Miro (whiteboarding).
- **On-Site Requirements:** Occasional on-site for stakeholder workshops, design sprints, or data centre assessments.
- **Time Zone Flexibility:** Standard business hours; international programmes may require cross-timezone availability.
- **On-Call / Operational Demands:** Not typically on-call; may be consulted during major post-go-live incidents where design decisions are in question.

## Career Development Path

**Previous Roles:**

- Senior Software Engineer / Senior Cloud Engineer / Senior Infrastructure Engineer
- Domain Architect (Cloud, Network, Security, etc.)
- Technical Lead on delivery projects

**Potential Next Roles:**

- Enterprise Architect <!-- role: enterprise-architect -->
- Chief Architect / Principal Architect
- CTO (technology leadership track)
- Head of Architecture

## Recommended Certifications & Learning Paths

**Core Certifications:**

- TOGAF 10 Foundation and Practitioner
- AWS Certified Solutions Architect - Professional, or Microsoft Certified: Azure Solutions Architect Expert (AZ-305), or Google Cloud Professional Cloud Architect

**Complementary Certifications:**

- SABSA Foundation (Security Architecture)
- Certified Kubernetes Administrator (CKA)
- Any relevant domain certification (networking, security, data)

**Learning Resources and Communities:**

- The Open Group Architecture Forum
- Martin Fowler's Architecture Blog (martinfowler.com)
- AWS/Azure/GCP Well-Architected Framework documentation
- IASA (International Association of Software Architects)
