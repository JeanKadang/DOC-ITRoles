# Integration Architect

| Field | Value |
|---|---|
| **Domain** | Integration & Middleware |
| **Chapter:** | DevOps & Delivery |
| **Role Level** | Architect |
| **Reports To** | DevOps & Delivery Chapter Lead |
| **Direct Reports** | None (sets technical direction and mentors Integration Senior Engineers; formal line management sits with the Chapter Lead) |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Integration Architect designs and governs the organisation's enterprise integration strategy and architecture, covering API management, event-driven messaging, enterprise service bus (ESB) patterns, and point-to-point integration across on-premises, cloud, and SaaS platforms. This role ensures that systems integrate securely, reliably, and in a maintainable way - moving the organisation away from fragile point-to-point integrations toward governed, reusable integration platforms. The Integration Architect works across the full integration stack: synchronous APIs, asynchronous messaging, event streaming, and MFT.

## Role Scope & Boundaries

- **Scope of Influence:** Domain-wide — integration platform architecture, API design standards, and event-driven architecture patterns across the chapter
- **Experience Anchor:** 8+ years in integration or middleware architecture with demonstrated architecture-level delivery — operates independently on domain-wide integration architecture decisions
- **Out of Scope:** Cloud platform architecture (Cloud Architects-owned); application data model and business process design (application teams-owned); security policy for API and integration access (CISO-owned, this role implements controls)
- **Escalates To:** DevOps & Delivery Chapter Lead — chapter-wide priorities, cross-domain boundary disputes, and investment decisions beyond integration platform scope
- **Escalated To By:** Integration Senior Engineers on architectural direction and design exception questions

## Business Impact

- **Business Objective:** Enable reliable, secure, and reusable integration capabilities that allow business systems to exchange data efficiently, reduce integration technical debt, and support digital transformation and cloud migration programmes.
- **Value Metrics:** Integration platform availability, number of point-to-point integrations decommissioned and replaced with governed patterns, API consumer adoption, integration-related incident rate (trend: decreasing), time-to-integrate for new applications.
- **Key Stakeholders:** Enterprise Architects, Solution Architects, Application teams, Cloud Architects, Security, ERP and CRM system owners, Digital teams.
- **Processes Supported:** Application integration, API publication and consumption, event-driven business processes, B2B data exchange, SaaS-to-on-premises data synchronisation, ERP integration.

## Key Responsibilities

- Design the enterprise integration architecture: integration platform selection, API gateway design, event streaming topology, and ESB/iPaaS patterns.
- Define integration standards: synchronous REST/GraphQL API design standards, asynchronous messaging patterns, event schema registries.
- Architect API management strategy: API gateway (Azure API Management, AWS API Gateway, Kong), developer portal, API lifecycle governance, versioning, and deprecation policies.
- Design event-driven architecture (EDA) patterns using Apache Kafka, Azure Service Bus, AWS EventBridge, or RabbitMQ.
- Define iPaaS integration patterns for cloud-to-cloud and cloud-to-on-premises integration: MuleSoft, Azure Logic Apps, Azure Integration Services, Boomi, Informatica.
- Establish integration security architecture: OAuth 2.0 / API key governance, mTLS for B2B integrations, payload encryption at transit.
- Govern EDI and B2B integration standards for partner-facing data exchange.
- Define integration monitoring and observability standards: end-to-end message tracing, SLA alerting for integration flows.
- Lead integration platform migrations and consolidation programmes.
- Provide technical governance through design review of integration solutions.
- Mentor integration engineers and work with Solution Architects to embed integration best practices in project designs.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Integration platform architecture and technology selection | Cloud platform architecture (with Cloud Architects) |
| API design standards and governance policy | Application data model and business process design |
| Event-driven architecture patterns and schema standards | Security policy for API and integration access (with CISO) |
| Integration monitoring and SLA standards | Commercial licensing decisions (with Procurement) |
| B2B and EDI integration standards | ERP configuration decisions (with ERP/Business Systems teams) |

## Required Skills & Qualifications

**Technical Skills:**

- Expert knowledge of integration platforms: MuleSoft Anypoint, Azure Integration Services (APIM, Logic Apps, Service Bus, Event Grid), AWS (API Gateway, EventBridge, SQS/SNS), or Boomi.
- Deep understanding of API design principles: REST, GraphQL, OpenAPI 3.x specification, semantic versioning.
- Experience with event streaming architecture: Apache Kafka, Azure Event Hubs, AWS Kinesis, Confluent Platform.
- Knowledge of messaging patterns: pub/sub, message queues, dead letter queues, saga pattern, outbox pattern.
- Understanding of ESB and iPaaS patterns and when to use each integration style.
- Experience with API gateway configuration: routing, rate limiting, OAuth 2.0 / JWT validation, caching, transformation.
- Knowledge of B2B and EDI integration standards: AS2, SFTP, X12, EDIFACT.
- Familiarity with integration monitoring: end-to-end correlation IDs, Dynatrace/Datadog integration traces, Azure Application Insights.
- Experience with schema registry patterns for event-driven architectures (Confluent Schema Registry, AWS Glue Schema Registry).

**Soft Skills and Leadership:**

- Ability to communicate integration architecture to non-technical business stakeholders.
- Vendor neutral, pragmatic approach to integration platform selection.
- Strong governance and standards communication skills.
- Mentoring integration engineers and collaborating with Solution Architects.

**Technology Proficiency Levels:**

- **Expert level required:** MuleSoft Anypoint Platform (integration architecture and governance) or Azure Integration Services (APIM, Logic Apps, Service Bus, Event Grid), Apache Kafka/Confluent Platform (event streaming architecture and schema governance), API gateway configuration (Azure APIM, Kong, or AWS API Gateway — routing, policies, OAuth 2.0/JWT)
- **Proficient level required:** OpenAPI 3.x and AsyncAPI (API specification and standards governance), B2B/EDI integration protocols (AS2, SFTP, X12, EDIFACT), Confluent Schema Registry or AWS Glue Schema Registry, Boomi or Informatica (iPaaS alternatives)
- **Working Knowledge required:** Integration monitoring tools (Dynatrace, Datadog, Azure Application Insights — end-to-end correlation), ESB/iPaaS pattern selection and trade-off analysis, saga and outbox patterns for distributed transaction management
- **Awareness level expected:** Dapr for event-driven microservice integration, AI-assisted integration mapping and transformation tools, CNCF CloudEvents specification

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Enterprise Architect / Solution Architects | Provide integration patterns; governance review of integration designs in project proposals | Governed By |
| Cloud Architects | Align integration platform architecture with cloud platform standards | Collaborates |
| Application Teams | Define and enforce API design standards; support integration design within applications | Provides To |
| Security Architect | Implement API security patterns and B2B credential governance | Governed By |
| ERP / Business Systems Teams | Design integration between core enterprise systems and surrounding applications | Collaborates |
| DataOps / Data Platform | Define event sourcing and CDC patterns where integration feeds data platforms | Collaborates |
| DevOps Architect | Govern CI/CD integration pipeline standards, deployment automation for integration artifacts, and integration testing practices | Collaborates |
| API Platform Architect | API design standards, versioning policies, and the boundary between API gateway capabilities and integration platform responsibilities | Collaborates |

## Key Technologies

- MuleSoft Anypoint Platform
- Azure Integration Services: APIM, Logic Apps, Service Bus, Event Grid
- AWS Integration: API Gateway, EventBridge, SQS, SNS, Step Functions
- Apache Kafka / Confluent Platform
- Azure Event Hubs / AWS Kinesis
- Kong / AWS API Gateway / Azure API Management
- OpenAPI 3.x / AsyncAPI
- Confluent Schema Registry / AWS Glue Schema Registry
- Boomi / Informatica (iPaaS alternatives)
- Postman / Swagger / API design tooling

## Typical Day-to-Day Activities

- Reviewing architectural proposals for new integrations and providing governance sign-off.
- Designing integration patterns for new cloud migration or digital transformation projects.
- Working with application teams to align their APIs to integration standards.
- Evaluating new iPaaS or API management platform capabilities.
- Reviewing integration monitoring dashboards and investigating SLA breach patterns.
- Producing and updating integration architecture standards documentation.
- Participating in architecture review boards for integration-touching solution designs.

## Key Performance Indicators

- Integration platform availability (target: 99.9%+)
- API governance compliance rate (APIs adhering to standards)
- Point-to-point integration reduction (governed integrations as percentage of total)
- Integration-related incident rate (trend: decreasing)
- Mean time to integrate new applications
- API developer portal adoption (external/internal consumers)

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, Confluence, Jira, MuleSoft/Azure portal, Postman.
- **On-Site Requirements:** None typically.
- **Time Zone Flexibility:** Standard business hours; B2B partner integrations may span multiple time zones.
- **On-Call / Operational Demands:** On escalation path for critical integration platform outages affecting revenue-impacting business processes.

## Career Development Path

**Previous Roles:**

- Integration Senior Engineer or MuleSoft Developer
- Solution Architect with strong integration focus
- Cloud Architect (Azure Integration Services specialism)

**Potential Next Roles:**

- Enterprise Architect
- Head of Integration and Architecture
- Chief Architect

## Recommended Certifications & Learning Paths

**Core Certifications:**

- MuleSoft Certified Integration Architect (MCIA) - if MuleSoft environment
- Microsoft Certified: Azure Integration Services Specialty (or AZ-204/AZ-305 with integration focus)
- Confluent Certified Kafka Developer or Administrator

**Complementary Certifications:**

- AWS Certified Solutions Architect (integration domain depth)
- TOGAF 10 Foundation and Practitioner

**Learning Resources and Communities:**

- MuleSoft Community and Trailhead
- Confluent Kafka community and training
- AsyncAPI community (event-driven API standards)
- API Academy (API design best practices)
