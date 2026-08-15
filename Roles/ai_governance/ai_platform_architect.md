# AI Platform Architect

| Field | Value |
|---|---|
| **Role ID** | `ai-platform-architect` |
| **Domain** | AI Governance |
| **Chapter:** | Data & AI |
| **Role Level** | Architect |
| **Reports To** | Data & AI Chapter Lead |
| **Direct Reports** | None (sets technical direction and mentors AI Platform Engineers; formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The AI Platform Architect designs and governs the organisation's AI/ML platform infrastructure that enables data science and engineering teams to build, train, deploy, and monitor AI and machine learning models at scale. This role owns the end-to-end MLOps architecture: experiment tracking, model registry, feature stores, model serving infrastructure, and AI workload orchestration. The AI Platform Architect ensures the AI platform is secure, scalable, governable, and aligned with both cloud infrastructure standards and AI governance policies — bridging the gap between raw cloud infrastructure and the AI development lifecycle.

## Role Scope & Boundaries

- **Scope of Influence:** Domain-wide — ML platform infrastructure architecture, MLOps tooling standards, and AI/ML compute strategy across the chapter
- **Experience Anchor:** 8+ years in ML platform, MLOps, or AI infrastructure engineering with demonstrated architecture-level delivery — operates independently on domain-wide ML platform architecture decisions, as a peer counterpart to the AI Governance Architect rather than in a hierarchical relationship
- **Out of Scope:** AI governance framework and risk methodology (AI Governance Architect-owned, this role embeds controls into the platform); data pipeline architecture upstream of model training (Data Platform Architect-owned); cloud landing zone design (Cloud Architects-owned)
- **Escalates To:** Data & AI Chapter Lead — chapter-wide priorities and cross-domain investment decisions
- **Escalated To By:** AI Platform Engineers on complex design decisions

## Business Impact

- **Business Objective:** Enable data science and ML engineering teams to move AI models from experimentation to production rapidly and reliably, reducing time-to-value for AI initiatives and providing the infrastructure foundation for the organisation's AI strategy at scale.
- **Value Metrics:** Time from model training completion to production deployment, model deployment frequency, ML platform uptime and availability, feature store reuse rate across teams, cost per model training job, AI infrastructure incidents attributable to platform architecture.
- **Key Stakeholders:** Chief AI Officer / Chief Data Officer, data science teams, ML engineering teams, Cloud Architects, Security and Compliance, AI Governance Architect.
- **Processes Supported:** Model development and experimentation lifecycle, MLOps pipeline orchestration, model release and deployment governance, feature engineering and feature store management, AI workload infrastructure provisioning.

## Key Responsibilities

- Design the AI/ML platform architecture: end-to-end MLOps toolchain covering data ingestion, feature engineering, experiment tracking, model training, evaluation, registry, deployment, and monitoring.
- Define and govern MLOps pipeline standards: pipeline orchestration patterns, CI/CD for ML (CT — continuous training, CI — continuous integration, CD — continuous delivery), and model promotion workflows.
- Architect the feature store platform: feature computation, storage, serving (online/offline), reuse governance, and versioning.
- Design model serving infrastructure: batch inference, real-time inference endpoints, canary deployments, A/B testing infrastructure, and shadow mode deployment patterns.
- Establish model registry standards: model versioning, lineage tracking, metadata tagging, and approval workflow integration.
- Design AI workload orchestration on Kubernetes: GPU node pool management, distributed training patterns, resource quotas, and scheduling.
- Define AI infrastructure security architecture: model artefact access controls, training data lineage, API endpoint security, and secrets management for model serving.
- Collaborate with the AI Governance Architect to embed governance controls into the ML platform: model risk classification tagging, bias evaluation pipeline integration, and audit trail design.
- Architect experiment tracking and reproducibility standards: dataset versioning, hyperparameter logging, environment capture, and model lineage.
- Evaluate and select ML platform tooling: open-source (MLflow, Kubeflow, Ray, Feast) vs. managed cloud services (Azure AI Foundry, AWS SageMaker, Vertex AI).
- Provide technical leadership for ML platform implementation teams and guide ML engineers on platform adoption.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| ML platform architecture and toolchain selection (Azure AI Foundry, SageMaker, Vertex AI, MLflow, Kubeflow) | Model development methodology and algorithm selection (owned by data science teams) |
| MLOps pipeline standards: CI/CT/CD for ML, model promotion workflow, and deployment patterns | AI governance policies and risk classification framework (owned by AI Governance Architect) |
| Feature store architecture, online/offline serving design, and feature reuse governance | Cloud infrastructure cost allocation and FinOps practices for AI workloads (with Cloud Architects) |
| Model serving infrastructure design, inference scalability patterns, and A/B testing architecture | Business prioritisation of AI use cases and investment decisions (with Product and Business stakeholders) |
| AI workload orchestration standards on Kubernetes (GPU scheduling, distributed training patterns) | Data pipeline architecture upstream of feature engineering (with Data Platform Architect) |

## Required Skills & Qualifications

**Technical Skills:**

- Deep knowledge of MLOps principles and the ML lifecycle: data preparation, feature engineering, experiment tracking, model training, evaluation, registry, deployment, and monitoring.
- Hands-on experience with managed ML platforms: Azure AI Foundry / Azure Machine Learning, AWS SageMaker, Google Vertex AI, or Databricks ML.
- Experience with open-source ML tooling: MLflow (experiment tracking and model registry), Kubeflow Pipelines or Apache Airflow (pipeline orchestration), Ray (distributed training and serving).
- Knowledge of feature store architecture: Feast, Tecton, AWS Feature Store, or Azure Feature Store — online vs. offline serving patterns.
- Experience with model serving frameworks: Seldon Core, BentoML, KServe, Triton Inference Server, or managed endpoints (Azure ML Online Endpoints, SageMaker Endpoints).
- Understanding of Kubernetes for ML workloads: GPU node pools, NVIDIA device plugins, job scheduling (Volcano, Kueue), and resource quotas.
- Knowledge of ML security patterns: model artefact signing, training data access controls, inference endpoint authentication, and secrets management.
- Familiarity with data engineering concepts adjacent to ML: Delta Lake, Apache Spark, data versioning (DVC, LakeFS), and streaming feature computation.

**Soft Skills & Leadership:**

- Ability to translate ML platform capabilities into business outcomes for AI programme stakeholders and executive sponsors.
- Cross-functional collaboration skills to work across data science, ML engineering, cloud, security, and AI governance teams.
- Pragmatic platform thinking: ability to balance open-source flexibility with managed service simplicity for diverse data science team personas.

**Technology Proficiency Levels:**

**Expert level required:**

- Azure AI Foundry/Azure Machine Learning
- MLflow
- Kubeflow Pipelines
- AWS SageMaker

**Proficient level required:**

- Google Vertex AI
- Apache Spark/Delta Lake
- Ray/Ray Serve
- KServe/Triton Inference Server

**Working Knowledge required:**

- Seldon Core/BentoML
- Feast (feature store)
- DVC

**Awareness level expected:**

- Databricks Machine Learning
- OWASP LLM Top 10

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| AI Governance Architect | Embed governance controls, bias evaluation pipelines, audit trail requirements, and AI risk tagging into the ML platform architecture | Collaborates |
| Data Platform Architect | Data pipeline integration, feature computation patterns, Delta Lake / data lakehouse architecture, and data quality upstream of model training | Collaborates |
| Azure, AWS, and GCP Cloud Architects | AI/ML infrastructure provisioning, landing zone design for ML workloads, and managed AI service integration | Collaborates |
| Kubernetes Architect | GPU workload orchestration, distributed training scheduling, and ML serving infrastructure deployment on Kubernetes | Collaborates |
| Security Architect | Ensure model artefact security, training data access governance, inference endpoint security, and AI supply chain integrity | Governed By |
| MLOps Engineers | Platform tooling, pipeline patterns, and ML infrastructure implementation | Provides To |
| data science and ML engineering teams | Platform adoption, experiment tracking standards, and model deployment best practices | Provides To |

## Key Technologies

- Azure AI Foundry and Azure Machine Learning (Azure ML)
- AWS SageMaker (training, pipelines, model registry, endpoints)
- Google Vertex AI (pipelines, model registry, Feature Store, Matching Engine)
- MLflow (experiment tracking, model registry, model serving)
- Kubeflow Pipelines (ML workflow orchestration on Kubernetes)
- Feast (open-source feature store)
- Ray and Ray Serve (distributed training and model serving)
- Seldon Core and BentoML (model serving frameworks)
- Databricks Machine Learning (MLflow-integrated ML platform on Databricks)
- KServe / Triton Inference Server (Kubernetes-native model serving)
- DVC (data and model version control)
- Apache Spark and Delta Lake (large-scale feature computation and data versioning)

## Typical Day-to-Day Activities

- Designing ML platform architecture components and evaluating new tooling for the MLOps stack.
- Working with data science teams to understand workflow pain points and translate them into platform capability requirements.
- Reviewing and approving ML pipeline and model serving architecture designs for new AI projects.
- Collaborating with the AI Governance Architect to embed governance checkpoints into CI/CT/CD pipelines.
- Producing and maintaining ML platform architecture standards documentation and reference architectures.
- Evaluating cloud provider AI platform updates and assessing impact on the organisation's toolchain strategy.
- Working with the Kubernetes Architect on GPU cluster design and ML workload scheduling configuration.
- Designing feature store schemas and reuse patterns for new domain-specific feature sets.
- Mentoring MLOps engineers on platform implementation and ML infrastructure patterns.
- Participating in AI programme architecture reviews to ensure new AI initiatives are designed against platform standards.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Model deployment lead time: median time from model registry approval to production endpoint availability — target ≤2 business days for standard deployment patterns | ≤2 business days | — |
| ML platform availability: ≥99.5% uptime for model serving and experiment tracking services per month | ≥99.5% | — |
| Feature store reuse rate: ≥40% of production ML features consumed from the shared feature store rather than per-team custom computation | ≥40% | — |
| MLOps pipeline adoption: ≥80% of production ML models deployed via governed CI/CT/CD pipelines within 12 months of standard publication | ≥80% | — |
| Time to provision ML experiment environment: median new experiment environment ready within 1 business day | — | — |
| AI infrastructure cost per model training job: tracked and within FinOps governance thresholds each quarter | — | — |
| Governance checkpoint compliance: 100% of high-risk AI models passed through bias evaluation and documentation pipeline before production deployment | 100% | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; ML platform architecture is design, governance, and consultation focused with no physical infrastructure dependency.
- **Collaboration Tools:** Microsoft Teams, Jira, Confluence, GitHub/ADO, Azure ML Studio, MLflow UI, Kubeflow dashboard, cloud provider consoles, architecture diagramming tools (Miro, Lucidchart).
- **On-Site Requirements:** Not required; occasional on-site for AI programme workshops or strategic architecture alignment sessions.
- **Time Zone Flexibility:** Standard business hours with flexibility for collaboration with globally distributed data science and ML engineering teams.
- **On-Call / Operational Demands:** Not typically on-call; provides architectural escalation for critical ML platform outages or model serving failures affecting production AI systems.

## Career Development Path

**Previous Roles:**

- MLOps Engineer / Senior MLOps Engineer
- Data Engineer or Data Platform Architect with ML workload focus
- Cloud Architect with AI/ML specialisation
- ML Engineer with platform and infrastructure interest
- Software Architect with data and ML systems background

**Potential Next Roles:**

- Chief AI Officer (CAIO) or Head of AI Engineering
- Enterprise Architect (AI and data domain)
- AI Practice Director or VP of AI Engineering
- Cloud Platform Architect (AI services specialisation)
- Chief Technology Officer (AI-forward technology organisations)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Azure AI Engineer Associate (AI-102) or Azure Data Scientist Associate (DP-100)
- AWS Certified Machine Learning — Specialty
- Google Professional Machine Learning Engineer

**Complementary Certifications:**

- Certified Kubernetes Administrator (CKA) — for ML workload orchestration context
- Databricks Certified Machine Learning Professional
- FinOps Certified Practitioner — for AI infrastructure cost governance
- HashiCorp Certified: Terraform Associate — for ML infrastructure provisioning

**Learning Resources & Communities:**

- MLOps Community (mlops.community) — meetups, podcasts, and practitioner resources
- CNCF MLOps and AI working group publications (cncf.io)
- Made With ML (madewithml.com) — MLOps engineering and production ML content
- Full Stack Deep Learning (fullstackdeeplearning.com) — practical ML platform engineering
- Kubeflow community documentation and KFServing/KServe project (kubeflow.org)
- Databricks Delta Lake and ML community blog and documentation
