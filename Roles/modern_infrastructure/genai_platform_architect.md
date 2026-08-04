# GenAI Platform Architect

| Field | Value |
|---|---|
| **Domain** | Modern Infrastructure |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Architect |
| **Reports To** | Cloud, Platform & Infrastructure Chapter Lead |
| **Direct Reports** | None (sets technical direction and mentors the GenAI Platform Engineer; formal line management sits with the Chapter Lead) |
| **Last Reviewed** | 2026-07 |

---

## Role Overview

The GenAI Platform Architect designs and governs the organization's artificial intelligence and generative AI platform strategy. This role establishes the technical vision for AI/LLM infrastructure, responsible AI governance, and the self-service capabilities that enable engineering and data science teams to build, deploy, and operate AI-powered applications at scale. The GenAI Platform Architect ensures that AI investments are secure, cost-effective, observable, and aligned with organizational and regulatory requirements. This role is distinct from the AI Platform Architect in AI Governance, which owns classical MLOps platform architecture (feature stores, model registries, training pipelines) — the GenAI Platform Architect owns the infrastructure layer specific to large language models, retrieval-augmented generation, and agentic AI workloads.

## Key Responsibilities

- Design enterprise AI platform architectures covering model serving, RAG pipelines, and agentic workflow infrastructure
- Establish AI governance frameworks including responsible AI policies, model risk management, and LLM security controls
- Create reference architectures and golden paths for teams building GenAI-powered applications
- Architect multi-model and multi-provider LLM gateway strategies (Azure AI Foundry, Amazon Bedrock, Vertex AI, self-hosted)
- Design vector database and semantic search infrastructure for RAG and contextual AI patterns
- Define AI observability strategies covering model performance, cost tracking, hallucination detection, and evaluation pipelines
- Govern AI/LLM API cost management and token budget frameworks (in partnership with FinOps)
- Evaluate and select AI frameworks, model providers, and agentic automation tooling
- Ensure AI workloads meet security, privacy, and compliance requirements (GDPR, EU AI Act, organizational AI policies)
- Provide technical leadership on AI strategy and emerging model capabilities
- Architect edge AI inference platforms: design deployment patterns for on-device AI model serving using NVIDIA Jetson, Azure IoT Edge AI modules, and Intel OpenVINO for latency-sensitive or bandwidth-constrained edge workloads.
- Define edge AI governance standards: model versioning, OTA model update pipelines, performance monitoring for edge-deployed models, and alignment between edge and cloud AI governance frameworks.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Enterprise AI platform architecture, LLM gateway topology, and model provider strategy (Azure AI Foundry, Bedrock, Vertex AI, self-hosted) | Cloud platform architecture and infrastructure-level AI service design decisions |
| Responsible AI governance framework, AI security controls (prompt injection defenses, RBAC, audit logging), and LLM policy standards | Enterprise security architecture strategy and data governance policy for AI workloads |
| AI/LLM cost governance framework in partnership with FinOps, including token budgets and GPU utilization standards | AI application development patterns, agentic workflow design, and cross-team platform adoption |

## Required Skills & Qualifications

- Deep understanding of LLM architecture, capabilities, and limitations (transformer models, fine-tuning, RAG, agents)
- Experience designing AI/ML serving infrastructure at scale
- Knowledge of vector databases and semantic search patterns
- Understanding of AI security risks: prompt injection, jailbreaking, model theft, data exfiltration
- Experience with major cloud AI platforms (Azure AI Foundry, Amazon Bedrock, GCP Vertex AI)
- Knowledge of responsible AI frameworks (Microsoft RAI, NIST AI RMF, EU AI Act)
- Familiarity with agentic AI frameworks (AutoGen, LangGraph, Semantic Kernel, CrewAI)
- Strong understanding of MLOps practices and CI/CD for AI workloads
- Experience with enterprise architecture frameworks (TOGAF)
- Excellent stakeholder communication and technical evangelism skills

**Technology Proficiency Levels:**

**Expert level required:**

- Azure AI Foundry / Amazon Bedrock / Vertex AI LLM gateway platforms
- Vector databases (Pinecone, pgvector, Azure AI Search, Qdrant)
- RAG and agentic frameworks (LangChain, LlamaIndex, Semantic Kernel, AutoGen)
- AI governance and responsible AI frameworks (Microsoft RAI, NIST AI RMF, EU AI Act)

**Proficient level required:**

- Model serving infrastructure (vLLM, NVIDIA Triton, KServe, Ollama)
- MLflow and Weights & Biases for experiment tracking and model registry
- AI observability platforms (LangSmith, Arize AI, WhyLabs)
- Kubernetes GPU Operator and GPU cluster orchestration

**Working Knowledge required:**

- Fine-tuning and PEFT frameworks (LoRA, QLoRA, RLHF tooling)
- Edge AI inference platforms (NVIDIA Jetson, Intel OpenVINO, ONNX Runtime)
- TOGAF or equivalent enterprise architecture frameworks

**Awareness level expected:**

- Emerging foundation model architectures and multimodal capabilities
- EU AI Act and evolving global AI regulatory landscape

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| MLOps Engineers | Pipeline implementation and model deployment | Collaborates |
| Security Architects | AI security controls and LLM governance | Governed By |
| Cloud Platform Architects (Azure, AWS, GCP) | AI service integration | Collaborates |
| Platform Engineering Architect | IDP integration of AI tooling | Collaborates |
| FinOps Architect | AI/LLM cost governance | Governed By |
| Enterprise Architects | AI platform strategy and roadmap | Governed By |
| Data Scientists and AI Engineers | Platform capabilities and golden paths | Provides To |
| AI Platform Architect (AI Governance) | Alignment between classical MLOps platform architecture and GenAI/LLM platform architecture | Collaborates |

## Key Technologies

- LLM gateway and management platforms (Azure AI Foundry, Amazon Bedrock, LiteLLM)
- Vector databases (Pinecone, Weaviate, pgvector, Azure AI Search, Qdrant, Milvus)
- RAG and agentic frameworks (LangChain, LlamaIndex, Semantic Kernel, AutoGen, LangGraph)
- Prompt management and versioning tools (Microsoft Prompt Flow, PromptLayer)
- AI evaluation and quality frameworks (RAGAS, TruLens, Azure AI Evaluation SDK)
- Model serving infrastructure (vLLM, Ollama, NVIDIA Triton, KServe)
- MLflow and W&B for experiment tracking and model registry
- AI observability platforms (LangSmith, Arize AI, WhyLabs)
- GPU orchestration (Kubernetes GPU Operator, NVIDIA NCCL, CUDA)
- AI governance and responsible AI tooling (Azure RAI Dashboard, IBM OpenScale)
- Cloud AI platforms (Azure AI Foundry, Amazon SageMaker, Google Vertex AI)
- Fine-tuning and PEFT frameworks (LoRA, QLoRA, RLHF tooling)
- Edge AI inference platforms (NVIDIA Jetson, Intel OpenVINO, Azure IoT Edge AI, AWS Panorama)
- On-device model optimisation tools (ONNX Runtime, TensorRT, Intel OpenVINO Model Optimizer)
- Edge AI deployment and orchestration (Azure IoT Edge modules, NVIDIA Triton Inference Server for edge)

## Typical Day-to-Day Activities

- Designing reference architectures for GenAI application patterns
- Evaluating new LLM models and foundation model releases
- Consulting on AI security, privacy, and compliance requirements
- Leading architecture reviews for AI/LLM implementations
- Defining AI observability and evaluation strategies with platform teams
- Collaborating with data scientists and AI engineers on deployment patterns
- Developing AI governance policies and responsible AI frameworks
- Working with FinOps on LLM token cost governance and optimization
- Mentoring engineers on AI infrastructure and architecture patterns
- Researching emerging AI/LLM capabilities and agentic AI developments

## Key Performance Indicators

- AI platform availability and reliability for model serving workloads
- Time-to-production for new AI/LLM applications using the platform
- AI cost per unit of value delivered (token cost efficiency, GPU utilization)
- Coverage of AI security and governance controls across deployments
- Developer adoption of AI platform golden paths and reference architectures
- Model evaluation score improvements through platform tooling
- Reduction in AI-related security incidents and prompt injection attempts
- AI platform scalability under demand spikes
- Responsible AI compliance rate across AI deployments
- Knowledge transfer and enablement effectiveness
- Edge AI model deployment coverage: ≥80% of approved edge AI workloads served via standardised edge inference patterns
- Edge inference latency: p95 inference latency within agreed SLA for latency-sensitive edge AI applications

## Role Scope & Boundaries

- **Scope of Influence:** Domain-wide — GenAI/LLM platform architecture, AI service integration, and generative AI tooling strategy across the chapter
- **Experience Anchor:** 8+ years in AI/ML or platform architecture with demonstrated GenAI platform ownership — operates independently on domain-wide GenAI platform architecture decisions
- **Out of Scope:** Classical MLOps platform architecture (AI Platform Architect in AI Governance-owned, this role aligns GenAI platform design with it); AI governance and risk framework (Security Architects-owned, this role implements AI security controls and LLM governance from it); cloud AI service selection detail (Cloud Platform Architects-owned, this role integrates with it)
- **Escalates To:** Cloud, Platform & Infrastructure Chapter Lead — chapter-wide priorities and cross-domain investment decisions
- **Escalated To By:** the GenAI Platform Engineer on platform delivery questions

## Business Impact

- **Business Objective:** Enable the organization to build and operate AI-powered products safely, efficiently, and at scale
- **Value Metrics:** Reduction in AI time-to-production, LLM API cost savings, AI reliability improvements, reduced AI security incidents
- **Key Stakeholders:** CTO, CPO, AI/ML engineering teams, security and compliance, legal, FinOps
- **Processes Supported:** AI application development, AI governance review, responsible AI compliance, LLM cost management

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; regular sync required with AI engineering teams and stakeholders
- **Collaboration Tools:** GitHub, Teams/Slack, Jira/Azure DevOps, Confluence, Miro, AI platform consoles
- **On-Site Requirements:** Occasional on-site for architecture workshops or GPU lab evaluations
- **Time Zone Flexibility:** Cross-timezone availability may be required for global AI platform deployments
- **On-Call / Operational Demands:** Not typically on-call; provides architectural guidance for critical AI platform incidents, LLM serving outages, and major AI security events requiring architectural decisions

## Career Development Path

**Previous Roles:**

- MLOps Engineer / Senior MLOps Engineer
- Cloud Platform Architect with AI/ML focus
- Data Scientist with platform engineering experience
- Senior AI/ML Engineer
- Platform Engineering Architect

**Potential Next Roles:**

- Chief AI Officer (CAIO)
- VP of AI Engineering
- CTO track positions
- Distinguished Engineer (AI Systems)
- AI Strategy Executive

## Recommended Certifications & Learning Paths

- Microsoft Certified: Azure AI Engineer Associate (AI-102)
- Microsoft Certified: Azure Solutions Architect Expert (AZ-305)
- AWS Certified Machine Learning Specialty
- AWS Certified AI Practitioner
- Google Cloud Professional Machine Learning Engineer
- Databricks Generative AI Fundamentals
- NVIDIA Deep Learning Institute certificates
- AI Governance and Ethics certifications (IAPP AIGP)
- FinOps Certified Practitioner (for AI cost governance)
- Certified Kubernetes Administrator (CKA) — for AI workload orchestration

**Complementary Certifications:**

- FinOps Certified Practitioner (for AI/LLM cost governance), IAPP AI Governance Professional (AIGP), CISSP for AI security context, and cloud solutions architect certifications (AWS/Azure/GCP)

**Learning Resources and Communities:**

- Hugging Face community (huggingface.co), CNCF AI working groups, Microsoft AI research blog, AWS Machine Learning blog, LangChain and LlamaIndex documentation, ArXiv AI preprints, NVIDIA developer blog, and the AI Alignment Forum
