# AI Governance Engineer

| Field | Value |
|---|---|
| **Domain** | AI Governance |
| **Chapter:** | Data & AI |
| **Role Level** | Engineer |
| **Reports To** | AI Governance Senior Engineer |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The AI Governance Engineer is an entry-level practitioner role responsible for implementing AI governance controls across the organisation's AI systems under the direction of the AI Governance Architect and Senior AI Governance Engineer. This role conducts bias testing and fairness evaluations, maintains AI system documentation and risk registers, supports AI incident logging and investigation processes, and assists with compliance evidence collection for regulatory requirements. The AI Governance Engineer builds practical hands-on experience with responsible AI toolkits and governance processes, forming the operational backbone of the AI governance function.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of AI governance documentation and evidence-gathering tasks to defined standards
- **Experience Anchor:** 1-3 years in AI/ML governance, risk, or compliance — works under guidance, building toward independent delivery
- **Out of Scope:** AI governance framework design (Senior Engineers and the Architect-owned); risk assessment methodology definition; AI platform architecture decisions
- **Escalates To:** AI Governance Senior Engineer — day-to-day task direction and technical guidance
- **Escalated To By:** AI Governance Product Owner on documentation and risk register completeness status

## Business Impact

- **Business Objective:** Provide the day-to-day operational execution of AI governance controls — ensuring AI system risk assessments, fairness evaluations, documentation, and compliance evidence are completed accurately and on schedule to maintain the organisation's AI governance posture and regulatory readiness.
- **Value Metrics:** AI system documentation completeness rate, bias and fairness evaluation coverage of in-scope AI systems, AI risk register currency (percentage of systems with assessments completed within the review cycle), compliance evidence collection completion rate ahead of audit deadlines.
- **Key Stakeholders:** AI Governance Senior Engineer (direct supervisor), AI Governance Architect, Legal and Compliance, data science and ML engineering teams.
- **Processes Supported:** AI system risk assessment, fairness and bias evaluation, model card and AI documentation maintenance, AI incident logging, compliance evidence collection, AI system inventory management.

## Key Responsibilities

- Conduct bias testing and fairness evaluations on AI models using responsible AI toolkits (Fairlearn, InterpretML, AI Fairness 360) under the guidance of the Senior Engineer and Architect.
- Maintain and update the AI system risk register: recording assessment status, risk ratings, control implementations, and review cycles for each in-scope AI system.
- Produce and maintain model cards and AI system documentation according to the organisation's documentation standards and model card frameworks.
- Support AI incident logging: recording AI-related incidents in the incident register, collecting initial information, and escalating to senior team members.
- Assist with compliance evidence collection for EU AI Act, ISO/IEC 42001, and other applicable regulatory frameworks.
- Operate AI safety and content moderation tooling (Azure AI Content Safety, AWS Bedrock Guardrails) and document configuration and monitoring outputs.
- Support AI system audits by preparing documentation packs and evidence artefacts.
- Assist with reviewing third-party AI supplier documentation as part of the due diligence process.
- Maintain the organisation's AI system inventory, tracking new AI system onboarding and periodic re-assessment schedules.
- Attend and contribute to AI governance team meetings, learning from senior practitioners and contributing operational observations.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Timely completion and accuracy of AI system documentation (model cards, risk register entries, audit artefacts) | Risk rating and classification decisions for AI systems (escalated to Senior Engineer / Architect) |
| Execution of bias and fairness test plans as defined by the Senior Engineer | Fairness evaluation methodology selection (advises from test results; methodology set by Architect) |
| AI incident log completeness and accuracy | AI incident severity classification and response decisions (escalated to Senior Engineer) |
| Compliance evidence collation and artefact packaging for audit support | Regulatory interpretation and compliance gap decisions (with Senior Engineer and Legal) |

## Required Skills & Qualifications

**Technical Skills:**

- Understanding of AI/ML fundamentals: supervised and unsupervised learning, model training, evaluation metrics, and model lifecycle stages.
- Familiarity with responsible AI concepts: fairness metrics (demographic parity, equalised odds, counterfactual fairness), sources of bias, and explainability approaches.
- Working knowledge of bias and fairness testing tools: Fairlearn, Microsoft InterpretML, IBM AI Fairness 360.
- Ability to execute Python-based analysis and testing scripts: running bias evaluation notebooks, interpreting outputs, and documenting results.
- Familiarity with AI risk and governance frameworks: NIST AI Risk Management Framework (AI RMF), EU AI Act risk categories, ISO/IEC 42001 concepts.
- Understanding of model card documentation standards and AI system documentation requirements (model purpose, training data, limitations, intended use).
- Familiarity with GRC (governance, risk, and compliance) tooling for risk register management (ServiceNow GRC, Archer, or equivalent).
- Awareness of Azure AI Content Safety and AWS Bedrock Guardrails capabilities for content moderation and harm detection.

**Soft Skills & Leadership:**

- Attention to detail and rigour in documentation to produce audit-quality governance artefacts.
- Proactive communication with the Senior Engineer when encountering edge cases or escalation triggers in risk assessments.
- Curiosity and a learning mindset to build knowledge of rapidly evolving AI regulation and responsible AI practices.

**Technology Proficiency Levels:**

**Expert level required:**

- Fairlearn
- Microsoft InterpretML
- Azure AI Content Safety
- MLflow

**Proficient level required:**

- IBM AI Fairness 360
- NIST AI RMF tooling
- Python/Jupyter notebooks
- GRC platforms (ServiceNow GRC)

**Working Knowledge required:**

- AWS Bedrock Guardrails
- Model card frameworks
- Jira/Confluence

**Awareness level expected:**

- Azure Machine Learning
- Microsoft Purview

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| AI Platform Architect | Accessing deployed model artefacts, MLOps pipeline outputs, and model registry metadata needed for governance assessments | Consumes From |
| Legal and Compliance | Team members when collecting compliance evidence or seeking clarification on documentation requirements | Collaborates |
| AI Governance Senior Engineer | Day-to-day task direction, mentoring, and technical guidance | Escalates To |
| AI Governance Architect | Technical guidance, framework interpretation, and escalation of complex governance decisions | Escalates To |
| Data Science and ML Engineering | Teams to collect model documentation, training data lineage, and evaluation metrics required for risk assessments | Consumes From |
| AI Governance Product Owner | Provide status on documentation and risk register completeness for backlog and programme reporting | Provides To |

## Key Technologies

- Fairlearn (fairness metrics and mitigation algorithms)
- Microsoft InterpretML (model explainability tooling)
- IBM AI Fairness 360 (bias detection and mitigation toolkit)
- Azure AI Content Safety (content moderation and harm detection)
- AWS Bedrock Guardrails (GenAI safety and content controls)
- MLflow (model registry and experiment tracking — for accessing model artefacts and metadata)
- Model card frameworks (Google Model Cards, Hugging Face model card templates)
- NIST AI RMF tooling and assessment templates
- GRC platforms (ServiceNow GRC, Archer, or equivalent) for risk register management
- Jira and Confluence (task management and governance documentation)
- Python and Jupyter notebooks (for bias evaluation scripts and analysis)

## Typical Day-to-Day Activities

- Running bias and fairness evaluation scripts against model outputs and documenting findings for review by the Senior Engineer.
- Updating AI system risk register entries following completed assessments or AI system changes.
- Drafting model card documentation for new AI systems or updating cards after model version updates.
- Logging and tracking AI incidents in the incident register and following up with teams for additional information.
- Collecting compliance evidence artefacts (screenshots, configuration records, assessment reports) for upcoming audit cycles.
- Reviewing AI supplier documentation checklists and noting gaps for escalation to the Senior Engineer.
- Monitoring Azure AI Content Safety and Bedrock Guardrails dashboards and recording content moderation metrics.
- Attending AI governance team stand-ups and status meetings.
- Researching specific AI governance topics or emerging regulatory requirements when tasked by the Senior Engineer.
- Supporting preparation of governance committee report inputs under Senior Engineer direction.

## Key Performance Indicators

- AI risk register currency: ≥95% of in-scope AI systems with assessment completed within the required review cycle
- Model card documentation completeness: 100% of production AI systems with a current, complete model card in the inventory
- Bias evaluation coverage: all AI systems flagged for bias testing evaluated and results documented within the agreed schedule
- Compliance evidence collection: 100% of required evidence artefacts collated at least 5 business days prior to audit deadlines
- AI incident log accuracy: all logged incidents with complete required fields within 24 hours of identification
- AI system inventory completeness: ≥98% of known AI systems tracked in the inventory with current status and last review date

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; all governance and documentation work is performed using digital tooling.
- **Collaboration Tools:** Microsoft Teams, Jira, Confluence, Python/Jupyter (bias evaluation), Azure AI portal, GRC platforms, SharePoint.
- **On-Site Requirements:** Not required; occasional on-site for team induction events, governance committee sessions, or compliance workshops.
- **Time Zone Flexibility:** Standard business hours; EU AI Act compliance timelines may necessitate engagement with European regulatory reporting cycles.
- **On-Call / Operational Demands:** Not on-call; escalates AI incidents to the Senior Engineer during business hours. No operational on-call requirement at this level.

## Career Development Path

**Previous Roles:**

- Graduate or Junior Data Analyst with AI interest
- Junior ML Engineer or Data Science Graduate
- Compliance Analyst with technology governance focus
- Junior Software Engineer with interest in responsible AI
- Technology Risk Analyst (entry level)

**Potential Next Roles:**

- AI Governance Senior Engineer
- Responsible AI Specialist / Engineer
- MLOps Engineer (platform engineering career track)
- Data Privacy Engineer (adjacent governance specialism)
- AI Risk and Compliance Analyst (GRC career track)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Azure AI Fundamentals (AI-900) — foundational AI and responsible AI knowledge
- NIST AI RMF practitioner training and qualification (via NIST-recognised training providers)
- ISO/IEC 42001 Foundation (AI Management System awareness level)

**Complementary Certifications:**

- CIPP/E Foundation (data privacy context for AI governance)
- Microsoft Certified: Azure AI Engineer Associate (AI-102) — for technical depth in Azure AI services
- CompTIA Data+ — foundational data literacy supporting governance work

**Learning Resources & Communities:**

- NIST AI Risk Management Framework documentation and playbook (nist.gov/artificial-intelligence)
- Responsible AI toolkits documentation: Fairlearn (fairlearn.org), InterpretML (interpret.ml)
- Microsoft Responsible AI resources and principles (microsoft.com/en-us/ai/responsible-ai)
- Partnership on AI practitioner resources (partnershiponai.org)
- EU AI Act official text and European AI Office guidance (digital-strategy.ec.europa.eu)
- Hugging Face course on AI ethics and model documentation (huggingface.co/learn)
