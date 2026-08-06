# Integration Senior Engineer

| Field | Value |
|---|---|
| **Domain** | Integration & Middleware |
| **Chapter:** | DevOps & Delivery |
| **Role Level** | Senior Engineer |
| **Reports To** | DevOps & Delivery Chapter Lead |
| **Direct Reports** | Integration Engineers (day-to-day technical guidance and mentoring; formal line management sits with the Chapter Lead) |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Integration Senior Engineer designs and implements complex enterprise integrations across on-premises, cloud, and SaaS platforms. This role serves as the deep technical specialist and escalation point for the integration team, leading delivery of sophisticated integration workflows, API implementations, and event-driven integration patterns. The Senior Engineer drives adoption of integration platform standards, mentors integration engineers, and contributes to integration architecture decisions.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — advanced integration solution design and delivery within the Integration Architect's reference architecture
- **Experience Anchor:** 5+ years in integration or middleware engineering with demonstrated independent delivery — operates independently within the Architect's reference architecture
- **Out of Scope:** Integration platform architecture and standards (Architect-owned); event-driven data feed integration strategy beyond assigned implementation (DataOps-owned, jointly implemented); API security control design (Security Engineers-owned, implements controls)
- **Escalates To:** Integration Architect — architecture-level questions and standards exceptions
- **Escalated To By:** Integration Engineers on complex issues and implementation guidance requests

## Business Impact

- **Business Objective:** Deliver reliable, well-designed integrations that connect enterprise systems efficiently and securely, reducing manual data handling and enabling real-time business processes.
- **Value Metrics:** Integration delivery velocity, integration uptime SLA, API response time compliance, error rate on critical integration flows, senior escalation resolution time.
- **Key Stakeholders:** Application teams, ERP and CRM owners, Cloud Platform teams, Security, DataOps teams.
- **Processes Supported:** Application-to-application data synchronisation, ERP integration, API publication, event-driven business process automation, B2B data exchange.

## Key Responsibilities

- Design and implement integration flows using MuleSoft, Azure Logic Apps, Azure Integration Services, or equivalent iPaaS platforms.
- Build and maintain REST and SOAP API integrations following organisational API design standards and OpenAPI specifications.
- Implement event-driven integrations using Apache Kafka, Azure Service Bus, or AWS EventBridge.
- Design error handling strategies: dead letter queue management, retry patterns, circuit breaker implementation.
- Configure and maintain API gateway policies: authentication (OAuth 2.0, API key), rate limiting, transformation, and routing.
- Lead technical design of new integration solutions from requirements through to implementation.
- Implement integration monitoring: end-to-end message tracing, alerting on SLA breaches, and health dashboards.
- Participate in B2B/EDI integration configuration with partner organisations.
- Conduct code and design reviews for integration solutions developed by team members.
- Mentor integration engineers and guide the team on integration patterns and standards.
- Maintain integration runbooks, operational documentation, and incident response procedures.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Integration flow design and implementation for complex scenarios | Integration architecture standards (with Integration Architect) |
| Error handling and resilience design within integrations | API design standards (governed by Architect) |
| Integration monitoring and alerting configuration | B2B trading partner requirements (with Business/ERP teams) |
| Code review standards and quality gates for integration team | Security policies for API access and credential management |

## Required Skills & Qualifications

**Technical Skills:**

- Advanced hands-on experience with MuleSoft Anypoint, Azure Logic Apps, Azure Service Bus, or equivalent iPaaS.
- Strong knowledge of REST API design: OpenAPI 3.x, HTTP standards, pagination, error responses.
- Experience implementing OAuth 2.0, API key authentication, and JWT validation in integration contexts.
- Proficiency with Apache Kafka producer/consumer development, topic design, and offset management.
- Experience with message transformation: JSON/XML mapping, data manipulation, routing logic.
- Knowledge of error handling patterns: DLQ, retry policies, idempotency, and saga compensation.
- Proficiency in scripting or development languages used in integration platforms (DataWeave for MuleSoft, C# for Azure, JavaScript/Python).
- Experience with API gateway configuration: Azure APIM policies or AWS API Gateway.
- Understanding of EDI and B2B protocol basics: AS2, SFTP, X12, EDIFACT.

**Soft Skills and Leadership:**

- Ability to work effectively with application teams who are not integration specialists.
- Strong troubleshooting approach for complex distributed integration failures.
- Mentoring and coaching junior integration engineers.
- Clear documentation for integration designs and runbooks.

**Technology Proficiency Levels:**

**Expert level required:**

- MuleSoft Anypoint Platform or Azure Integration Services (complex integration flow design, Logic Apps, Service Bus, and Function-based patterns)
- Apache Kafka (producer/consumer development, topic design, and offset management)
- API gateway configuration (Azure APIM or AWS API Gateway — OAuth 2.0, rate limiting, and transformation policies)

**Proficient level required:**

- OpenAPI 3.x specification and REST API design standards
- error handling patterns (DLQ, retry policies, idempotency, and saga compensation)
- B2B/EDI integration protocols (AS2, SFTP, X12, EDIFACT)

**Working Knowledge required:**

- Azure Event Grid or AWS EventBridge (event-driven integration patterns)
- DataWeave or JavaScript/Python scripting for message transformation
- integration monitoring and end-to-end correlation tracing

**Awareness level expected:**

- Dapr for event-driven microservice integration patterns
- schema registry tooling (Confluent Schema Registry, AWS Glue Schema Registry)
- CNCF CloudEvents specification

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Integration Architect | Receive architectural direction; contribute implementation feedback | Escalates To |
| Integration Engineers | Mentor and review work | Provides To |
| Application Teams | Design and agree integration contracts and API specifications | Collaborates |
| DataOps Teams | Implement event-driven data feed integrations for the data platform | Collaborates |
| Security Engineers | Implement API security controls | Governed By |

## Key Technologies

- MuleSoft Anypoint (Runtime, Studio, Exchange, Management Centre)
- Azure Logic Apps / Azure Functions / Azure Service Bus
- Azure API Management
- Apache Kafka / Confluent Platform
- OpenAPI 3.x / Postman
- DataWeave (MuleSoft) / C# / Python / JavaScript
- Azure Event Grid / AWS EventBridge
- SFTP / AS2 (B2B integrations)
- Git / Azure DevOps / GitHub Actions

## Typical Day-to-Day Activities

- Designing and implementing complex integration flows for new programme requirements.
- Investigating and resolving integration flow failures and SLA breaches.
- Reviewing integration designs and code from team members.
- Tuning API gateway policies and error handling configurations.
- Collaborating with application teams on integration contract design.
- Maintaining and improving integration monitoring dashboards.
- Updating integration runbooks and operational documentation.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Integration flow availability and SLA compliance | ≥95% (proposed) | Monthly |
| Error rate on critical integration flows (trend: decreasing) | — | — |
| API response time compliance | — | — |
| Code review coverage within the integration team | — | — |
| Integration incident resolution time | — | — |
| Documentation currency for owned integrations | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, Jira, GitHub, MuleSoft Anypoint, Azure Portal.
- **On-Site Requirements:** None typically.
- **Time Zone Flexibility:** Standard business hours; B2B partner testing may occasionally span time zones.
- **On-Call / Operational Demands:** On-call rotation for critical integration outages affecting revenue-impacting business processes.

## Career Development Path

**Previous Roles:**

- Integration Engineer
- Software Engineer / Backend Developer with API integration experience
- ESB Developer (IBM MQ, Oracle SOA Suite background)

**Potential Next Roles:**

- Integration Architect
- Solution Architect
- Cloud Engineer (Azure Integration Services specialism)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- MuleSoft Certified Developer - Level 1 and Level 2
- Microsoft Certified: Azure Developer Associate (AZ-204) - for Azure Integration Services
- Confluent Certified Kafka Developer

**Complementary Certifications:**

- MuleSoft Certified Integration Architect (MCIA)
- AWS Certified Developer - Associate
- TOGAF 10 Foundation (architectural awareness)

**Learning Resources and Communities:**

- MuleSoft Trailhead and Community
- Confluent training and Kafka Summit talks
- Azure Integration Services Microsoft Learn paths
- AsyncAPI community resources
