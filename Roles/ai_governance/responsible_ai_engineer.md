# Responsible AI Engineer

| Field | Value |
|---|---|
| **Domain** | AI Governance |
| **Chapter:** | Data & AI |
| **Role Level** | Engineer |
| **Reports To** | AI Governance Architect |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Responsible AI Engineer implements the technical tooling, testing processes, and compliance artefacts that support the organisation's AI governance framework. Where the AI Governance Architect defines policy and strategy, this role operationalises governance controls directly within AI development and MLOps pipelines. The Responsible AI Engineer runs bias and fairness evaluations, generates explainability outputs, produces model cards and compliance documentation, integrates governance tooling into CI/CD pipelines, and supports AI risk assessments with quantitative evidence and audit artefacts.

## Role Scope & Boundaries

- **Scope of Influence:** Team — embedding responsible AI checks and governance tooling into ML experimentation and deployment workflows
- **Experience Anchor:** 3-5 years in AI/ML engineering with a responsible AI, ethics, or governance focus — operates independently within the AI Governance Architect's framework
- **Out of Scope:** AI governance framework and policy design (AI Governance Architect-owned); ML platform infrastructure (AI Platform team-owned); AI regulatory legal interpretation (Legal and Compliance-owned)
- **Escalates To:** AI Governance Architect — governance requirements interpretation and compliance gap findings
- **Escalated To By:** Data Scientists and MLOps Engineers on responsible AI tooling and governance check integration

## Business Impact

- **Business Objective:** Translate AI governance policy into working technical controls and measurable evidence, ensuring AI systems meet regulatory requirements and ethical standards before and after deployment.
- **Value Metrics:** Coverage of AI systems with bias and fairness evaluations, model cards produced per model deployment, explainability report coverage for decision-making AI systems, governance pipeline integration rate, AI audit findings remediated.
- **Key Stakeholders:** AI Governance Architect, Data Scientists, MLOps Engineers, Legal and Compliance, AI Platform Engineers.
- **Processes Supported:** AI model evaluation and testing, AI system documentation, risk assessment evidence generation, MLOps pipeline governance integration, AI incident investigation.

## Key Responsibilities

- Implement bias and fairness testing suites using Fairlearn, AI Fairness 360, or equivalent frameworks; report findings against agreed fairness metrics (demographic parity, equalised odds, predictive parity).
- Generate model explainability outputs using SHAP, LIME, Captum, or Microsoft InterpretML; produce human-readable explanation artefacts for high-risk AI system stakeholders.
- Produce and maintain model cards and data sheets for AI systems using agreed organisational templates; ensure they are kept current through model updates and retraining cycles.
- Integrate governance checks into MLOps CI/CD pipelines: bias tests, data drift detection, PII scanning (Microsoft Presidio), model performance regression tests.
- Operate Microsoft Purview AI Hub and Azure AI Content Safety configurations; monitor content filtering effectiveness and tune policies.
- Perform AI red teaming and adversarial testing: prompt injection testing for LLM applications, data poisoning scenarios, and model robustness evaluations.
- Support AI risk assessments by generating quantitative evidence on model performance, data quality, bias metrics, and explainability coverage.
- Monitor AI system outputs in production for performance drift, bias drift, and anomalous outputs; escalate to MLOps and Governance Architect.
- Implement data provenance tracking and audit trail tooling within ML pipelines.
- Generate compliance evidence reports for EU AI Act assessments, internal audits, and regulatory inquiries.
- Support AI supplier due diligence by assessing vendor model documentation, API safety controls, and data handling practices.
- Document model limitations, known failure modes, and edge cases in standardised formats for governance records.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Bias and fairness test implementation and reporting | Fairness thresholds and acceptable risk levels (AI Governance Architect) |
| Explainability tooling selection and output quality | AI model design and algorithm choices (Data Scientists) |
| Model card and data sheet authoring | Governance framework and policy requirements (Architect) |
| Governance checks integrated into MLOps pipelines | MLOps pipeline architecture (MLOps Engineer) |
| AI red teaming test execution and findings documentation | AI system approval / rejection decisions (Governance Architect + Risk) |

## Required Skills & Qualifications

**Technical Skills:**

- Python proficiency for ML pipeline integration, bias testing, and explainability tooling.
- Hands-on experience with bias and fairness libraries: Fairlearn (scikit-learn integration), IBM AI Fairness 360.
- Hands-on experience with explainability tools: SHAP (TreeExplainer, KernelExplainer, DeepExplainer), LIME, Captum (for PyTorch), InterpretML.
- Familiarity with model evaluation metrics: confusion matrix, ROC/AUC, fairness metrics (TPR parity, calibration).
- Experience with MLOps platforms: Azure Machine Learning, MLflow, Weights and Biases, Kubeflow.
- Knowledge of responsible AI controls for generative AI: Azure AI Content Safety, Azure OpenAI content filtering, system prompt governance.
- Familiarity with PII detection tooling (Microsoft Presidio, Sensitive Information Types in Purview) for data pipeline scanning.
- Understanding of OWASP LLM Top 10 and practical experience testing LLM applications for prompt injection and jailbreaking risks.
- Experience writing model cards (Hugging Face model card standard, Google Model Cards toolkit).
- Basic understanding of EU AI Act risk categories and technical documentation requirements.

**Soft Skills:**

- Ability to communicate bias and fairness findings clearly to non-technical stakeholders.
- Methodical approach to documentation and evidence generation.
- Collaborative working with data scientists and MLOps engineers to integrate governance without blocking velocity.
- Intellectual curiosity about AI system failures and edge cases.

**Technology Proficiency Levels:**

**Expert level required:**

- SHAP/LIME/Microsoft InterpretML
- Fairlearn/IBM AI Fairness 360
- Azure AI Content Safety
- Microsoft Purview AI Hub

**Proficient level required:**

- Azure Machine Learning/MLflow
- Microsoft Presidio
- garak/PyRIT (LLM red teaming)
- Great Expectations/Evidently AI

**Working Knowledge required:**

- Hugging Face model card toolkit
- Weights and Biases

**Awareness level expected:**

- OWASP LLM Top 10
- MITRE ATLAS

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| AI Governance Architect | Receives governance requirements; escalates findings and compliance gaps | Escalates To |
| Data Scientists | Embeds governance checks into experimentation and training workflows | Provides To |
| MLOps Engineer | Integrates governance tooling into CI/CD pipelines and model deployment gates | Collaborates |
| Security Engineer | Coordinates on AI-specific threat surface (prompt injection, model theft, adversarial examples) | Collaborates |
| Legal and Compliance | Provides technical evidence for AI regulatory assessments and audits | Provides To |

## Key Technologies

- Fairlearn / IBM AI Fairness 360 (bias and fairness testing)
- SHAP / LIME / Captum / Microsoft InterpretML (explainability)
- Microsoft Presidio (PII detection in data pipelines)
- Azure Machine Learning / MLflow / Weights and Biases (MLOps and model registry)
- Azure AI Content Safety / Azure OpenAI content filtering
- Microsoft Purview AI Hub
- Hugging Face model card toolkit / Google Model Cards
- garak / PyRIT (LLM red teaming and adversarial testing)
- Great Expectations / Evidently AI (data quality and drift monitoring)

## Typical Day-to-Day Activities

- Running bias evaluation suites against newly trained or updated models and documenting results.
- Generating SHAP summary plots and explanation artefacts for a model pending production deployment.
- Updating model cards after a retraining cycle with new performance metrics and data provenance details.
- Testing a new LLM-based feature for prompt injection vulnerabilities using garak or PyRIT tooling.
- Reviewing Azure AI Content Safety dashboards and flagging content filter policy gaps.
- Responding to a governance query from Legal by producing a compliance evidence package.
- Maintaining the governance pipeline integration: updating bias test thresholds after a fairness policy review.

## Key Performance Indicators

- Percentage of production AI models with current model cards and fairness evaluations
- Bias and fairness test pass rate at model deployment gates
- Explainability coverage for high-risk AI decision systems
- Governance pipeline integration rate across ML projects
- AI red teaming findings resolved before production deployment
- PII scanning coverage in data pipelines feeding AI systems

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, Azure DevOps / GitHub, MLflow, Confluence.
- **On-Site Requirements:** Rarely required on-site.
- **Time Zone Flexibility:** Standard business hours; no material on-call demand.
- **On-Call / Operational Demands:** Respond to AI incident investigations or urgent audit requests within agreed SLA.

## Career Development Path

**Previous Roles:**

- Data Scientist or ML Engineer with interest in fairness and governance
- Software Engineer with AI development experience
- Compliance Analyst with technical AI background

**Potential Next Roles:**

- Senior Responsible AI Engineer
- AI Governance Architect (after gaining framework and policy experience)
- AI Platform Architect (MLOps and governance specialism)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Azure AI Engineer Associate (AI-102)
- Microsoft Certified: Azure Data Scientist Associate (DP-100)

**Complementary Certifications:**

- ISO/IEC 42001 Foundation (AI Management System awareness)
- CIPP/E Foundation (GDPR and AI data privacy)

**Learning Resources and Communities:**

- Fairlearn documentation and tutorials (fairlearn.org)
- SHAP documentation and examples (shap.readthedocs.io)
- Hugging Face responsible AI course and model card standards
- Google Responsible AI Practices (ai.google/responsibilities)
- NIST AI RMF playbook and measure functions
- OWASP LLM Top 10 project (owasp.org/www-project-top-10-for-large-language-model-applications)
- garak LLM vulnerability scanner documentation (garak.ai)
