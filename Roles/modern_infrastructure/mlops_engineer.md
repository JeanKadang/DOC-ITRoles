# MLOps Engineer

| Field | Value |
|---|---|
| **Role ID** | `mlops-engineer` |
| **Domain** | Modern Infrastructure |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Engineer |
| **Reports To** | GenAI Platform Architect <!-- role: genai-platform-architect --> |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The MLOps Engineer implements and maintains platforms and pipelines that enable data science and AI teams to efficiently develop, deploy, and operate machine learning and generative AI models in production. This role bridges the gap between data science, AI engineering, and operations, ensuring ML/LLM models are reliable, scalable, observable, and governed in production environments.

## Role Scope & Boundaries

- **Scope of Influence:** Team — ML pipeline automation, model deployment infrastructure, and cloud ML service integration
- **Experience Anchor:** 3-5 years in MLOps or platform engineering — operates independently within the GenAI Platform Architect's reference architecture
- **Out of Scope:** GenAI/LLM platform architecture (GenAI Platform Architect-owned); data pipeline architecture upstream of model training (Data Engineers-owned, this role integrates with it); infrastructure automation module governance (Platform Engineers-owned, this role integrates with it)
- **Escalates To:** GenAI Platform Architect — ML pipeline platform decisions
- **Escalated To By:** Data Scientists on model deployment requirements

## Business Impact

- **Business Objective:** Implements and maintains ML and LLM pipelines enabling data science teams to deploy, operate, and monitor AI models reliably and reproducibly in production environments
- **Value Metrics:** ML model deployment time, pipeline automation coverage, model serving availability and latency, ML infrastructure cost per training and inference run, model monitoring coverage
- **Key Stakeholders:** Data scientists, AI Platform Architect (AI Governance), GenAI Platform Architect, application teams, DevOps, Cloud Engineers, FinOps
- **Processes Supported:** ML model training and deployment pipelines, feature engineering automation, model monitoring and drift detection, GenAI and RAG pipeline management, ML cost optimization

## Key Responsibilities

- Design and implement ML and LLM pipelines for model training, validation, and deployment
- Establish infrastructure for continuous integration and deployment of ML and GenAI models
- Implement monitoring and observability for ML model and LLM response quality
- Create reproducible environments for ML/AI development and production
- Build and maintain RAG (Retrieval-Augmented Generation) pipeline infrastructure
- Integrate and manage vector databases for semantic search and contextual retrieval
- Implement prompt management, versioning, and evaluation frameworks
- Automate feature engineering and model serving infrastructure
- Implement model versioning, tracking, and registry solutions
- Design model and agent serving architectures for various inference patterns
- Ensure security, compliance, and responsible AI governance in ML workflows
- Implement edge MLOps pipelines: automate model packaging, optimisation (ONNX, TinyML quantisation), and deployment to edge devices using OTA update frameworks and edge runtime platforms.
- Monitor and maintain edge-deployed models: implement performance telemetry, drift detection, and rollback mechanisms for ML models running on resource-constrained edge hardware.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| ML pipeline architecture, orchestration approach, and MLOps toolchain configuration (MLflow, Kubeflow, Airflow) | AI platform strategy, model architecture decisions, and research infrastructure design |
| Model serving infrastructure design, monitoring automation, and experiment tracking governance | ML training budget, compute resource allocation, and GPU cluster strategy |
| Reproducible environment design, model registry standards, and feature engineering automation | Data science workflow design, training data management, and feature store strategy |

## Required Skills & Qualifications

- Experience with ML engineering and operations tooling
- Knowledge of container technologies and orchestration
- Understanding of CI/CD practices for ML workflows
- Familiarity with ML frameworks and libraries
- Understanding of distributed training systems
- Experience with model serving technologies
- Knowledge of data engineering principles
- Basic understanding of data science methodologies

**Technology Proficiency Levels:**

**Expert level required:**

- MLflow for experiment tracking, model registry, and pipeline orchestration
- Kubeflow and Apache Airflow for ML workflow orchestration and scheduling
- Kubernetes with GPU node pools for model training and serving
- LLM serving platforms (vLLM, Azure AI Foundry, Amazon Bedrock, Vertex AI)

**Proficient level required:**

- Vector databases (Pinecone, Weaviate, pgvector, Qdrant) and RAG frameworks (LangChain, LlamaIndex)
- Feature stores (Feast, Tecton) for ML feature engineering
- Distributed training frameworks (DeepSpeed, FSDP) for large model training
- RAGAS and TruLens for LLM evaluation and quality measurement

**Working Knowledge required:**

- ONNX, TensorFlow Lite, and TinyML frameworks for edge model optimisation
- Azure IoT Edge and AWS Greengrass for edge ML deployment pipelines
- Responsible AI governance tooling and model risk management frameworks

**Awareness level expected:**

- Emerging agentic AI frameworks (AutoGen, LangGraph) for MLOps pipeline automation
- Next-generation foundation model fine-tuning and PEFT approaches (LoRA, QLoRA)

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Data Engineers | Data pipeline integration | Collaborates |
| DevOps Engineers | Infrastructure automation | Collaborates |
| Platform Engineers | Platform integration | Collaborates |
| Cloud Engineers | Cloud services for ML | Collaborates |
| Application Teams | Model integration | Provides To |
| Data Scientists | Model deployment requirements | Consumes From |

## Key Technologies

- ML workflow orchestration tools (Kubeflow, Airflow, MLflow, Dagster)
- LLM serving platforms (vLLM, Ollama, Azure AI Foundry, Amazon Bedrock, Vertex AI)
- Model tracking and registry solutions (MLflow, Weights & Biases, Microsoft Prompt Flow)
- Feature stores (Feast, Tecton)
- Vector databases (Pinecone, Weaviate, pgvector, Azure AI Search, Qdrant)
- RAG pipeline frameworks (LangChain, LlamaIndex, Semantic Kernel)
- Agentic AI frameworks (AutoGen, CrewAI, LangGraph)
- Prompt versioning and evaluation frameworks (PromptFlow, RAGAS, TruLens)
- Container orchestration platforms (Kubernetes with GPU node pools)
- Infrastructure as Code tools
- CI/CD platforms for ML/AI pipelines
- Model monitoring and observability tools
- Distributed training frameworks (DeepSpeed, FSDP)
- Cloud AI platforms (Azure AI Foundry, SageMaker, Vertex AI)
- Responsible AI and AI governance tools
- Edge model optimisation and conversion frameworks (ONNX, TensorFlow Lite, TinyML)
- Edge deployment and OTA update tooling (Azure IoT Edge, AWS Greengrass, NVIDIA DeepStream)
- Edge runtime model serving (ONNX Runtime, TensorFlow Lite runtime, OpenVINO runtime)

## Typical Day-to-Day Activities

- Building and maintaining ML pipelines
- Deploying and monitoring ML models in production
- Troubleshooting model serving infrastructure issues
- Implementing feature engineering automation
- Collaborating with data scientists on model requirements
- Optimizing ML infrastructure performance and cost
- Setting up model monitoring and alerts
- Implementing model A/B testing infrastructure
- Creating reproducible ML environments
- Documenting ML workflows and best practices

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| ML model deployment time and reliability | — | — |
| Pipeline automation coverage | — | — |
| Model serving availability and performance | ≥99.9% (proposed) | Monthly |
| Time to detect and resolve model issues | ≤24 hours (proposed) | Monthly |
| Model deployment frequency | Weekly or better (proposed) | Monthly |
| Infrastructure cost optimization for ML workloads | — | — |
| Reproducibility of ML workflows | — | — |
| Model monitoring coverage | — | — |
| Feature engineering automation level | — | — |
| Owned documentation reviewed and current within the agreed review cycle (%) | ≥95% (proposed) | Quarterly |
| Edge model deployment automation coverage: ≥80% of edge model updates delivered via automated pipelines | ≥80% | — |
| Edge model drift detection rate: ≥90% of edge-deployed models under active performance monitoring | ≥90% | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; ML engineering is performed through cloud platforms, container environments, and secure remote development tooling
- **Collaboration Tools:** Microsoft Teams, Jira, GitHub, MLflow/Weights & Biases, Kubernetes tooling, cloud ML platform consoles (SageMaker/Vertex/Azure AI)
- **On-Site Requirements:** Occasional GPU cluster access may be needed for large-scale model training evaluations; otherwise fully remote
- **Time Zone Flexibility:** Core hours with flexibility for model deployment windows and cross-regional team collaboration
- **On-Call / Operational Demands:** On-call for production model serving incidents, data pipeline failures affecting model quality, and ML infrastructure outages impacting business AI services

## Career Development Path

**Previous Roles:**

- DevOps Engineer <!-- role: devops-engineer -->
- Data Engineer <!-- role: data-engineer -->
- Software Engineer with ML focus
- ML Engineer
- Cloud Engineer

**Potential Next Roles:**

- Senior MLOps Engineer
- ML Platform Architect
- ML Infrastructure Lead
- MLOps Team Lead
- AI Engineering Manager

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Certified Kubernetes Application Developer (CKAD)
- AWS Certified Machine Learning - Specialty
- Google Professional Machine Learning Engineer
- Microsoft Certified: Azure AI Engineer Associate (AI-102)
- Microsoft Certified: Azure Data Scientist Associate (DP-100)
- Databricks Certified Machine Learning Professional
- Databricks Generative AI Fundamentals
- MLflow Certified Practitioner
- NVIDIA Deep Learning Institute certificates
- FinOps Certified Practitioner (for AI/ML cost optimization)

**Complementary Certifications:**

- FinOps Certified Practitioner (for ML cost governance), cloud ML specialty certifications (AWS Machine Learning Specialty, GCP Professional ML Engineer, Azure AI Engineer), and Databricks certifications

**Learning Resources & Communities:**

- MLflow documentation (mlflow.org), Papers with Code (paperswithcode.com), Hugging Face community, Made With ML (madewithml.com), Neptune.ai blog, Evidently AI blog, and NVIDIA developer blog
