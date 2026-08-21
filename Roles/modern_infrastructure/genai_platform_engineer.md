# GenAI Platform Engineer

| Field | Value |
|---|---|
| **Role ID** | `genai-platform-engineer` |
| **Domain** | Modern Infrastructure |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Engineer |
| **Reports To** | GenAI Platform Architect <!-- role: genai-platform-architect --> |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-07 |

---

## Role Overview

The GenAI Platform Engineer implements and maintains the infrastructure, tooling, and pipelines that enable engineering and data science teams to build, deploy, and operate AI and generative AI applications in production. This role focuses on the day-to-day delivery of reliable, secure, and cost-efficient AI infrastructure, including LLM serving, RAG pipelines, vector databases, agentic workflow infrastructure, and AI observability tooling. This role is distinct from the AI Platform Engineer in AI Governance, which builds and operates classical MLOps pipelines (feature stores, model training, model registries) — the GenAI Platform Engineer operates the infrastructure layer specific to large language models and agentic AI.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of GenAI/LLM platform implementation, pipeline integration, and IDP tooling tasks
- **Experience Anchor:** 3-5 years in AI/ML or platform engineering — operates independently within the GenAI Platform Architect's reference architecture
- **Out of Scope:** GenAI platform architecture and technology standards (Architect-owned); ML pipeline architecture (MLOps Engineers-owned, this role integrates with it); AI security control design (Security Engineers-owned, this role implements it)
- **Escalates To:** GenAI Platform Architect — platform delivery decisions
- **Escalated To By:** Data Scientists and AI Engineers on platform tooling support

## Business Impact

- **Business Objective:** Implements and maintains LLM serving and RAG pipeline infrastructure enabling engineering teams to rapidly build, deploy, and operate AI-powered applications reliably and cost-efficiently at enterprise scale
- **Value Metrics:** LLM serving reliability and latency SLA compliance, RAG pipeline retrieval accuracy, AI platform cost per request (token efficiency), time to onboard new teams onto AI platform capabilities
- **Key Stakeholders:** GenAI Platform Architect, data science teams, application engineering teams, security, FinOps
- **Processes Supported:** LLM API serving and model deployment, RAG pipeline operations, vector database management, AI cost optimization, AI observability and evaluation

## Key Responsibilities

- Implement and maintain LLM serving infrastructure and model deployment pipelines
- Build and operate RAG (Retrieval-Augmented Generation) pipeline infrastructure
- Manage vector database deployments and embedding pipeline operations
- Integrate AI/LLM APIs and model gateways into developer workflows
- Implement prompt versioning, evaluation automation, and quality testing pipelines
- Configure and maintain AI observability tooling (latency, cost, hallucination detection)
- Implement AI security controls including prompt injection defenses and access controls
- Support teams building agentic AI applications with platform tooling and guidance
- Optimize LLM inference costs through batching, caching, quantization, and model selection
- Maintain IaC for AI platform components and automate deployments through CI/CD
- Document AI platform capabilities, patterns, and runbooks
- Deploy and operate inference at the edge: model packaging for constrained hardware, rollout and rollback across distributed sites, and monitoring of edge inference latency and accuracy drift

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| AI platform component configuration, LLM gateway settings, and operational standards | AI architecture design and model provider strategy decisions |
| AI security controls implementation including prompt injection defenses, RBAC, and access logging | AI governance framework design and responsible AI policy development |
| LLM inference cost optimization approach (caching, batching, quantization, model routing) | AI platform technology roadmap and long-term model selection decisions |

## Required Skills & Qualifications

- Experience deploying and managing LLM APIs and model serving platforms
- Knowledge of vector databases and embedding workflows
- Understanding of RAG patterns and agentic AI frameworks
- Familiarity with AI security considerations (prompt injection, access control, data leakage)
- Experience with Kubernetes and container orchestration (including GPU node management)
- Infrastructure as Code experience (Terraform, Bicep, Pulumi)
- CI/CD experience for AI/ML pipelines
- Scripting and automation skills (Python, Bash)
- Understanding of AI model evaluation metrics and quality measurement
- Basic understanding of responsible AI and governance requirements

**Technology Proficiency Levels:**

**Expert level required:**

- LLM serving platforms (vLLM, Ollama, Azure AI Foundry, Amazon Bedrock)
- Vector database operations (Pinecone, pgvector, Weaviate, Qdrant)
- RAG pipeline frameworks (LangChain, LlamaIndex, Semantic Kernel)
- Kubernetes with GPU Operator for AI workload orchestration

**Proficient level required:**

- Agentic AI frameworks (AutoGen, CrewAI, LangGraph, Azure AI Agents)
- AI evaluation tools (RAGAS, TruLens, Azure AI Evaluation SDK, LangSmith)
- MLflow and Weights & Biases for experiment tracking
- Infrastructure as Code (Terraform, Bicep, Pulumi)

**Working Knowledge required:**

- CI/CD for AI pipelines (GitHub Actions, Azure DevOps, GitLab CI)
- Prompt Flow and PromptLayer for prompt versioning and management
- Python ML/AI ecosystem (transformers, pydantic-ai)

**Awareness level expected:**

- Emerging model quantisation and inference optimisation techniques
- Responsible AI governance tooling and regulatory framework developments

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| MLOps Engineers | ML pipeline integration | Collaborates |
| Data Scientists and AI Engineers | Platform tooling | Provides To |
| DevOps Engineers | CI/CD pipeline automation | Collaborates |
| Security Engineers | AI security control implementation | Governed By |
| Cloud Engineers | Cloud AI service configuration | Collaborates |
| Platform Engineering Engineers | IDP integration | Collaborates |
| GenAI Platform Architect <!-- role: genai-platform-architect --> | Platform delivery | Escalates To |

## Key Technologies

- LLM serving platforms (vLLM, Ollama, Azure AI Foundry, Amazon Bedrock, Vertex AI)
- Vector databases (Pinecone, Weaviate, pgvector, Azure AI Search, Qdrant)
- RAG frameworks (LangChain, LlamaIndex, Semantic Kernel)
- Agentic AI frameworks (AutoGen, CrewAI, LangGraph, Azure AI Agents)
- Prompt management and versioning (Prompt Flow, PromptLayer)
- AI evaluation tools (RAGAS, TruLens, Azure AI Evaluation SDK, LangSmith)
- Model tracking and registry (MLflow, Weights & Biases)
- Container orchestration (Kubernetes with GPU Operator, KEDA)
- Infrastructure as Code (Terraform, Bicep, Pulumi)
- CI/CD for AI pipelines (GitHub Actions, Azure DevOps, GitLab CI)
- AI observability and monitoring platforms
- Python ML/AI ecosystem (LangChain, transformers, pydantic-ai)
- Edge inference runtimes (NVIDIA Jetson, Intel OpenVINO) for on-device model serving
- Model distribution and versioning across edge fleets (Azure IoT Edge, AWS Greengrass)

## Typical Day-to-Day Activities

- Deploying and configuring LLM serving infrastructure
- Maintaining and optimizing RAG pipeline performance
- Troubleshooting AI model serving and API gateway issues
- Implementing new prompt evaluation and testing automation
- Managing vector database indexes and embedding pipelines
- Supporting developers with AI platform integrations
- Monitoring AI workload costs and optimizing token usage
- Implementing security controls for AI API endpoints
- Creating runbooks and platform documentation
- Testing and evaluating new AI models and frameworks

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| LLM serving reliability and latency SLA compliance | ≥95% (proposed) | Monthly |
| RAG pipeline retrieval accuracy and end-to-end quality scores | — | — |
| AI platform cost per request / token cost efficiency | — | — |
| Time to onboard new teams onto AI platform capabilities | — | — |
| AI security control effectiveness (blocked prompt injection attempts) | — | — |
| Mean time to restore for AI platform incidents | ≤4 hours (proposed) | Monthly |
| Coverage of AI workloads under observability and evaluation monitoring | — | — |
| Deployment automation coverage and frequency | — | — |
| Quality and completeness of platform documentation | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; AI platform engineering is performed through cloud platforms and secure remote development environments
- **Collaboration Tools:** Microsoft Teams, Jira, GitHub, AI platform consoles (Azure AI Foundry, AWS Bedrock, Vertex AI), Kubernetes tooling
- **On-Site Requirements:** Occasional GPU lab access may be needed for self-hosted model benchmarking and evaluation; otherwise fully remote
- **Time Zone Flexibility:** Core hours with flexibility for cross-regional AI platform operations and incident coverage
- **On-Call / Operational Demands:** On-call rotation for AI platform serving incidents, model quality degradation events, and LLM API or RAG pipeline outages

## Career Development Path

**Previous Roles:**

- DevOps Engineer / Cloud Engineer
- Data Engineer <!-- role: data-engineer -->
- Software Engineer with ML/AI focus
- Platform Engineering Engineer <!-- role: platform-engineering-engineer -->
- MLOps Engineer <!-- role: mlops-engineer -->

**Potential Next Roles:**

- Senior GenAI Platform Engineer
- MLOps Engineer <!-- role: mlops-engineer -->
- GenAI Platform Architect <!-- role: genai-platform-architect -->
- ML Infrastructure Lead
- AI Engineering Manager

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Microsoft Certified: Azure AI Engineer Associate (AI-102)
- AWS Certified AI Practitioner
- Google Cloud Professional Machine Learning Engineer
- Certified Kubernetes Application Developer (CKAD)
- Databricks Generative AI Fundamentals
- NVIDIA Deep Learning Institute AI Infrastructure certificates
- HashiCorp Certified: Terraform Associate
- GitHub Actions certification

**Complementary Certifications:**

- FinOps Certified Practitioner (for AI cost governance), IAPP AI Governance Professional (AIGP), GitOps certifications (ArgoCD), and cloud security associate certifications

**Learning Resources & Communities:**

- Hugging Face community (huggingface.co), LangChain documentation, LlamaIndex documentation, vLLM GitHub, NVIDIA developer blog, Microsoft AI blog, AWS Machine Learning blog, and Google DeepMind technical blog
