# AI Platform Engineer

| Field | Value |
|---|---|
| **Domain** | AI Governance |
| **Chapter:** | Data & AI |
| **Role Level** | Engineer |
| **Reports To** | AI Platform Architect |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The AI Platform Engineer builds and operates the organisation's AI/ML platform infrastructure, translating designs from the AI Platform Architect into production-grade implementations. This role provisions and maintains ML compute infrastructure, implements MLOps pipelines for model training and deployment, manages model registries, and supports data science and ML engineering teams with reliable, scalable platform tooling. Operating as an entry to mid-level practitioner, the AI Platform Engineer ensures that the AI platform is operationally stable, cost-efficient, and enables data scientists to move from experimentation to production with minimal friction.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of ML platform implementation, pipeline support, and infrastructure tasks to defined standards
- **Experience Anchor:** 1-3 years in ML platform, MLOps, or infrastructure engineering — works under guidance, building toward independent delivery
- **Out of Scope:** ML platform architecture and technology standards (Architect-owned); AI governance control design (AI Governance Engineer-owned, this role coordinates implementation); data pipeline architecture (Data Platform Architect-owned)
- **Escalates To:** AI Platform Architect — complex design decisions
- **Escalated To By:** Data Science / ML Engineering teams on experiment environment setup, pipeline debugging, and model deployment support

## Business Impact

- **Business Objective:** Accelerate the organisation's AI/ML capability by providing a stable, self-service, and governed ML platform that enables data science teams to develop, train, evaluate, and deploy models efficiently and repeatably.
- **Value Metrics:** ML pipeline deployment frequency, model deployment lead time (time from training completion to production deployment), ML platform uptime SLA, mean time to restore (MTTR) for ML pipeline failures, data scientist onboarding time to first successful experiment run.
- **Key Stakeholders:** AI Platform Architect, Data Science and ML Engineering teams, AI Governance team, DevOps and Platform Engineering teams.
- **Processes Supported:** Model training pipeline execution, model deployment and serving, experiment tracking and management, feature engineering pipelines, ML infrastructure provisioning and maintenance.

## Key Responsibilities

- Provision and maintain ML compute infrastructure: Azure ML compute clusters, SageMaker training jobs, Vertex AI training pipelines, and GPU/CPU instance management.
- Implement and operate MLOps pipelines for automated model training, evaluation, validation, and deployment using CI/CD toolchains.
- Deploy and maintain MLflow for experiment tracking, model registry, and model lifecycle management across data science teams.
- Build and maintain feature store data pipelines using Feast or cloud-native feature stores, ensuring point-in-time correctness for training and serving.
- Manage containerisation and orchestration of ML workloads using Docker and Kubernetes (AKS, EKS, or GKE).
- Implement and maintain ML pipeline orchestration using Kubeflow Pipelines or Apache Airflow DAGs for automated workflow execution.
- Support data scientists with platform tooling, environment management, and debugging ML infrastructure issues.
- Apply infrastructure-as-code (Terraform) for reproducible ML infrastructure provisioning and environment management.
- Coordinate with the AI Governance Engineer to embed governance controls, audit logging, and compliance checks within ML pipelines.
- Monitor ML platform health, pipeline execution, and infrastructure utilisation; respond to incidents and performance degradation.
- Manage platform costs by implementing resource tagging, auto-scaling, and compute auto-suspend policies.
- Document ML platform components, runbooks, and onboarding guides for data science teams.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| ML infrastructure provisioning and configuration | ML platform architecture (owned by AI Platform Architect) |
| MLflow deployment, upgrade, and operational management | Model development practices and framework selection (owned by data science teams) |
| Feature store data pipeline maintenance and reliability | Data governance controls in pipelines (coordinated with AI Governance Engineer) |
| MLOps pipeline implementation and operational stability | ML infrastructure cost allocation (with FinOps/Cloud Architect) |
| Platform tooling environment management for data scientists | CI/CD toolchain standards (with DevOps Architect) |

## Required Skills & Qualifications

**Technical Skills:**

- Hands-on experience with at least one major cloud ML platform: Azure ML, AWS SageMaker, or Google Vertex AI.
- Proficiency with MLflow for experiment tracking, model registry, model versioning, and model serving.
- Experience with container technologies: Docker image build, registry management, and Kubernetes workload deployment.
- Knowledge of ML pipeline orchestration tools: Kubeflow Pipelines, Apache Airflow DAG development, or Prefect/Dagster.
- Experience with Python for ML pipeline scripting, automation, and platform tooling development.
- Familiarity with infrastructure-as-code (Terraform) for provisioning ML compute resources and platform components.
- Understanding of feature store and feature engineering pipeline patterns (Feast, Databricks Feature Store, or equivalent).
- Knowledge of CI/CD principles applied to ML model deployment (MLOps CI/CD patterns).
- Understanding of data pipeline integration patterns for ML data ingestion from upstream data platforms.

**Soft Skills and Leadership:**

- Clear communication with data scientists and ML engineers to understand platform requirements and translate them into operational solutions.
- Proactive incident management mindset with a focus on platform reliability and engineer productivity.
- Willingness to work across organisational boundaries with governance, data engineering, and DevOps teams.

**Technology Proficiency Levels:**

**Expert level required:**

- Azure ML/Azure AI Foundry
- MLflow
- Docker/Kubernetes (AKS)
- Python

**Proficient level required:**

- Kubeflow Pipelines
- Apache Airflow
- GitHub Actions/GitLab CI
- Terraform

**Working Knowledge required:**

- AWS SageMaker
- Google Vertex AI
- Feast (feature store)

**Awareness level expected:**

- Ray/Ray Serve
- KServe/Triton Inference Server

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| AI Platform Architect | Receives architecture design direction, reference implementations, and technology standards; escalates complex design decisions upward | Escalates To |
| AI Governance Engineer | Coordinates on embedding governance controls, audit logging, and bias testing hooks within ML pipelines and the model registry | Collaborates |
| Data Platform Architect | Aligns data ingestion and feature pipeline integration between the data platform and the ML platform | Collaborates |
| Data Science / ML Engineering teams | Primary customers of the platform; supports experiment environment setup, pipeline debugging, and model deployment | Provides To |
| DevOps Architect | Aligns MLOps CI/CD pipelines with organisational DevOps toolchain standards and deployment gates | Governed By |
| Cloud Architects | Coordinates on underlying compute, networking, and storage for ML infrastructure | Collaborates |

## Key Technologies

- Azure ML / AWS SageMaker / Google Vertex AI
- MLflow (experiment tracking, model registry, model serving)
- Azure AI Foundry
- Kubeflow Pipelines
- Apache Airflow (DAG orchestration)
- Feast (open-source feature store)
- Docker / Kubernetes (AKS, EKS, GKE)
- Terraform (infrastructure as code)
- Python (pipeline scripting and automation)
- GitHub Actions / GitLab CI (MLOps CI/CD)

## Typical Day-to-Day Activities

- Provisioning ML compute environments for new data science projects or experiment runs.
- Monitoring ML pipeline execution and investigating failures or performance degradation.
- Reviewing and merging infrastructure-as-code (Terraform) pull requests for ML resource changes.
- Assisting data scientists with environment issues, dependency conflicts, or training job failures.
- Maintaining MLflow deployment, performing upgrades, and resolving model registry issues.
- Updating and testing feature store data pipelines following upstream data platform changes.
- Participating in MLOps CI/CD pipeline reviews and implementing new deployment stages.
- Coordinating with the AI Governance Engineer on audit log configuration for regulated model deployments.
- Reviewing platform cost reports and implementing auto-scaling or compute suspension policies.
- Writing and maintaining runbooks, deployment guides, and onboarding documentation for data science teams.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| ML platform uptime and availability (target SLA, e.g., ≥99.5%) | ≥99.5% | — |
| ML pipeline execution success rate (% of scheduled pipelines completing without failure) | — | — |
| Model deployment lead time (hours from training completion to production endpoint availability, trending down) | — | Monthly |
| Mean time to restore (MTTR) for ML infrastructure incidents | ≤4 hours (proposed) | Monthly |
| Data scientist onboarding time to first successful experiment run (days, trending down) | — | — |
| Feature store pipeline data freshness SLA compliance (% of feature tables meeting published freshness SLO) | ≥95% (proposed) | Monthly |
| ML infrastructure cost per model training run (trending vs. prior period) | — | — |
| Number of platform incidents attributed to infrastructure misconfiguration (trending down) | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible.
- **Collaboration Tools:** Microsoft Teams, GitHub/GitLab, Jira, Confluence, Azure ML Studio / SageMaker Studio consoles.
- **On-Site Requirements:** None in most organisations; occasional for data centre hardware or on-premises ML cluster connectivity work.
- **Time Zone Flexibility:** Standard business hours; may require overlap with data science teams across different regions.
- **On-Call / Operational Demands:** On-call rotation for ML platform incidents affecting production model serving or critical training pipelines.

## Career Development Path

**Previous Roles:**

- Cloud Engineer or DevOps Engineer transitioning to ML platform
- Data Engineer with ML pipeline interest
- Junior ML Engineer or software engineer with Python and infrastructure background
- Analytics Engineer expanding into platform operations

**Potential Next Roles:**

- Senior AI Platform Engineer
- AI Platform Architect
- MLOps Lead / ML Engineering Lead
- DataOps Specialist (data platform operations specialisation)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Azure AI Engineer Associate (AI-102) or AWS Certified Machine Learning – Specialty
- Databricks Certified Machine Learning Professional
- Certified Kubernetes Administrator (CKA)

**Complementary Certifications:**

- HashiCorp Certified: Terraform Associate
- Google Professional Machine Learning Engineer
- Astronomer Certification for Apache Airflow (DAG orchestration for ML pipelines)

**Learning Resources and Communities:**

- MLflow documentation and Databricks Academy
- Kubeflow community and documentation (kubeflow.org)
- Weights & Biases MLOps courses and community
- Made With ML (madewithml.com) — practical MLOps and production ML engineering content
- Linux Foundation AI & Data community
