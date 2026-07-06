# HPC Architect

| Field | Value |
|---|---|
| **Domain** | Specialized Computing |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Architect |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The High-Performance Computing (HPC) Architect leads the design, implementation, and evolution of advanced HPC environments for scientific, engineering, analytics, and large-scale AI/ML training workloads. This role focuses on maximizing performance, scalability, security, sustainability, and efficiency, and sets technical direction for GPU-accelerated AI infrastructure, LLM training clusters, and hybrid/cloud HPC. The HPC Architect ensures alignment with organizational goals including AI strategy and fosters a culture of continuous learning and cross-functional collaboration.

## Business Impact

- **Business Objective:** Designs enterprise HPC cluster architectures that provide high-throughput compute, low-latency interconnects, and scalable parallel storage, enabling the organisation's research, scientific simulation, and large-scale AI/ML training workloads to deliver breakthroughs at speed
- **Value Metrics:** Cluster availability and MTTR, job throughput and scheduler efficiency, parallel filesystem bandwidth and IOPS, cost per FLOP, time-to-science for priority research workloads, GPU utilisation rates
- **Key Stakeholders:** CTO, Research Directors, Data Science leads, Server Hardware Architect, Linux Architect, Cloud Platform Architects, Security Architect, HPC Product Owner
- **Processes Supported:** HPC cluster architecture and standards governance, scheduler and queue topology design, high-speed interconnect and GPU/accelerator platform design, parallel filesystem architecture, hybrid and cloud HPC strategy, HPC capacity and technology roadmap

## Key Responsibilities

- Design and architect scalable, secure, and resilient HPC solutions for complex computational workloads
- Develop and enforce standards, best practices, and automation for HPC environments
- Lead the evaluation and integration of new HPC technologies, including cloud and hybrid solutions
- Optimize HPC cluster performance, efficiency, and cost-effectiveness
- Develop strategies for parallel, distributed, and accelerated computing
- Provide technical guidance on HPC hardware, software, and storage requirements
- Oversee implementation of job scheduling, resource management, and workflow automation
- Ensure compliance with security, data protection, and regulatory requirements
- Mentor HPC engineers and collaborate with research stakeholders
- Drive sustainability and cost optimization initiatives in HPC design and operations
- Lead cross-functional teams and facilitate knowledge sharing across the organization
- Maintain comprehensive documentation of HPC architectures, standards, and procedures
- Design edge-HPC convergence patterns: distributed edge inference for ML models, FPGA acceleration at edge locations, and low-latency compute at geographically distributed edge sites

## Key Decisions and Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| HPC cluster architecture standards, scheduler topology, and interconnect design | Enterprise architecture decisions and cross-domain infrastructure standards |
| GPU and accelerator platform selection, MPI workload design, and parallel storage architecture | Server hardware and storage procurement decisions |
| HPC technology evaluation, adoption roadmap, and hybrid/cloud strategy | Business investment cases, capacity budgets, and FinOps guidelines |

## Required Skills & Qualifications

**Technical Skills:**

- Strong background in high-performance computing architectures and design
- Experience with parallel programming models (MPI, OpenMP, CUDA, OpenACC, NCCL)
- Deep knowledge of job schedulers (Slurm, PBS, LSF)
- Understanding of high-speed interconnects (InfiniBand NDR/HDR, NVLink, RoCE)
- Extensive experience with GPU and accelerator computing (NVIDIA, AMD Instinct)
- Understanding of AI/LLM training architectures and distributed training (FSDP, DeepSpeed, Megatron)
- Experience with HPC storage systems and parallel file systems
- Knowledge of containerization and orchestration in HPC
- Experience with cloud-based and hybrid HPC solutions
- Understanding of security and compliance in HPC environments
- Strong leadership, communication, and mentoring skills

**Soft Skills and Leadership:**

- Communicates complex HPC architectures clearly to research stakeholders, IT leadership, and vendors, translating technical tradeoffs into business impact
- Collaborates across server hardware, Linux, cloud, and security architecture teams to deliver cohesive, integrated HPC solutions
- Applies rigorous analytical thinking to benchmark results, performance bottlenecks, and capacity constraints to drive evidence-based architecture decisions

**Technology Proficiency Levels:**

**Expert level required:**

- SLURM/PBS/LSF workload managers
- InfiniBand/RDMA high-speed interconnects
- CUDA/ROCm GPU programming frameworks

**Proficient level required:**

- MPI/OpenMP parallel programming
- Lustre/GPFS/WekaFS parallel filesystems
- Singularity/Apptainer container runtimes

**Working Knowledge required:**

- Kubernetes for HPC (Volcano scheduler)
- OpenHPC deployment and management

**Awareness level expected:**

- Quantum computing frameworks (Qiskit)
- Neuromorphic computing platforms

## Interactions with Other Roles

| Role | Nature of Interaction |
|---|---|
| Linux Server Architect | OS and hybrid/cloud integration |
| Cloud Platform Architects | OS and hybrid/cloud integration |
| Database Architect | Data-intensive computing solutions |
| Security Architects | Ensure compliance and data protection |
| Observability Architect | HPC monitoring and analytics |
| HPC Product Owner | Business stakeholders on HPC strategy |
| Server Hardware Architect | Specialized HPC hardware |
| Facilitates knowledge sharing and documentation | All HPC stakeholders |

## Key Technologies

- HPC cluster management and automation software (xCAT, Bright Cluster Manager, Ansible, OpenHPC)
- Job schedulers (Slurm, PBS Pro, LSF, SGE, Volcano for Kubernetes)
- High-speed interconnects (InfiniBand NDR/HDR, OmniPath, RoCE, NVIDIA NVLink/NVSwitch)
- Parallel file systems (Lustre, BeeGFS, GPFS/Spectrum Scale, VAST Data, WekaFS)
- GPU and accelerator computing frameworks (CUDA, ROCm, OpenACC, NVIDIA NCCL)
- MPI, OpenMP, and scientific libraries
- Containerized HPC (Apptainer/Singularity, Docker, Kubernetes with GPU Operator)
- Cloud HPC solutions (AWS ParallelCluster, Azure CycleCloud, Google Cloud HPC Toolkit)
- AI/ML training infrastructure (NVIDIA DGX/HGX, AMD Instinct, distributed training with FSDP/DeepSpeed)
- LLM training and inference optimization frameworks
- Monitoring and performance analysis tools (Grafana, Prometheus, DCGM, XDMOD)
- Edge AI computing platforms (NVIDIA Jetson for edge inference, Intel OpenVINO for model optimisation)
- Cloud edge infrastructure services (AWS Wavelength, Azure Edge Zones)
- 5G network slicing for edge HPC and low-latency distributed compute

## Typical Day-to-Day Activities

- Designing and reviewing HPC architecture solutions
- Evaluating new technologies and hardware for HPC environments
- Developing technical standards and best practices documentation
- Collaborating with researchers on computational workflow design
- Leading architectural reviews and knowledge sharing sessions
- Mentoring HPC engineers and senior engineers
- Optimizing resource allocation and job scheduling strategies
- Meeting with vendors and evaluating HPC technology solutions
- Conducting performance analysis and benchmarking
- Planning for capacity, upgrades, and future HPC requirements

## Key Performance Indicators

- Architectural design quality and alignment with business needs
- System performance benchmarks against industry standards
- Cost efficiency and resource optimization achievements
- Successful implementation of new technologies and approaches
- Time-to-solution improvements for computational workloads
- Security and compliance adherence in HPC environments
- Knowledge transfer effectiveness and documentation quality
- Stakeholder satisfaction with HPC capabilities
- Innovation in HPC solutions and approaches
- Sustainability improvements in HPC operations
- Edge-to-cloud latency SLA adherence: ≥99% of edge inference workloads meeting defined end-to-end latency SLAs

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible for all architecture design, standards development, and advisory activities; periodic on-site visits for cluster assessment, hardware lab reviews, and major commissioning milestones
- **Collaboration Tools:** Teams, Jira, Confluence, GitHub, NVIDIA NGC, vendor portals, monitoring dashboards (Grafana, DCGM)
- **On-Site Requirements:** Occasional on-site for data centre walk-throughs, rack-level cluster assessments, and new hardware validation labs
- **Time Zone Flexibility:** Standard core hours with flexibility; cross-regional collaboration required for cloud HPC vendor engagements
- **On-Call / Operational Demands:** Not on-call; available as an escalation path for architect-level decisions during critical HPC incidents

## Career Development Path

**Previous Roles:**

- HPC Senior Engineer
- Scientific Computing Team Lead
- Research Computing Specialist
- Senior Linux System Administrator
- Technical Lead for HPC Operations

**Potential Next Roles:**

- Chief Technology Officer (research organization)
- Director of Research Computing
- Distinguished Engineer
- VP of Advanced Computing
- Technology Fellow

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Advanced HPC Administration certifications
- Cloud HPC specializations (Azure, AWS, GCP)
- Enterprise architecture certifications (TOGAF)
- Project management certifications (PMP, Agile)
- Specialized vendor certifications (NVIDIA, Intel, AMD)
- Parallel programming and performance optimization certifications
- High-performance storage certifications
- Security certifications for sensitive computing environments
- Leadership and management training
- Technical mentoring and knowledge transfer programs

**Complementary Certifications:**

- NVIDIA Certified Networking Professional, Lustre/BeeGFS/GPFS storage certifications, and AWS/Azure/GCP cloud HPC specialisations

**Learning Resources and Communities:**

- SC and ISC High Performance conference proceedings, OpenHPC community (openhpc.community), Top500 (top500.org), HPC Wire, NVIDIA NGC Technical Blog, ACM SIGHPC, and Lustre/BeeGFS user communities
