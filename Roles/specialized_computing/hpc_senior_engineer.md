# HPC Senior Engineer

| Field | Value |
|---|---|
| **Domain** | Specialized Computing |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Senior Engineer |
| **Reports To** | Cloud, Platform & Infrastructure Chapter Lead |
| **Direct Reports** | HPC Engineers (day-to-day technical guidance and mentoring; formal line management sits with the Chapter Lead) |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The HPC Senior Engineer leads the technical implementation, automation, and optimization of high-performance computing environments. This role combines deep HPC expertise with technical leadership, driving innovation, security, and efficiency. The Senior Engineer works closely with researchers, architects, and engineers to deliver robust, scalable, and secure HPC solutions for complex workloads. The Senior Engineer also fosters a culture of innovation, continuous improvement, and inclusivity within the HPC team.

## Role Scope & Boundaries

- **Scope of Influence:** Domain — advanced HPC solution design and delivery within the HPC Architect's reference architecture
- **Experience Anchor:** 5+ years in HPC or scientific computing engineering with demonstrated independent delivery — operates independently within the Architect's reference architecture
- **Out of Scope:** HPC platform architecture and standards (Architect-owned); server hardware upgrade ownership (Server Hardware Senior Engineers-owned, this role coordinates with it); cloud HPC integration ownership (Cloud Senior Engineers-owned, this role coordinates with it)
- **Escalates To:** HPC Architect — solution design, automation, and implementation strategy exceptions
- **Escalated To By:** HPC Engineers on complex technical challenges and best practices

## Business Impact

- **Business Objective:** Leads complex HPC cluster implementations, performance tuning, automation development, and interconnect optimisation ensuring enterprise-grade research computing infrastructure delivers consistent throughput, reliability, and security for data-intensive scientific and AI/ML workloads
- **Value Metrics:** Cluster availability and MTTR, benchmark performance improvements, job throughput and scheduler optimisation, automation coverage, parallel filesystem throughput and IOPS, engineer mentorship effectiveness
- **Key Stakeholders:** HPC Architect, HPC Product Owner, HPC Engineers, research computing users, Server Hardware Senior Engineers, Cloud Senior Engineers, Security Engineers
- **Processes Supported:** Complex HPC implementation and automation, scheduler policy and resource management optimisation, performance tuning and benchmarking, hardware integration and commissioning, engineer mentorship and knowledge transfer, security and compliance implementation

## Key Responsibilities

- Design, implement, and automate complex HPC solutions based on architectural guidance
- Optimize HPC environments for specific scientific and engineering workloads, including cloud and hybrid workflows
- Develop advanced automation and orchestration for HPC cluster management
- Lead troubleshooting for complex HPC performance and security issues
- Create and implement tuning strategies for parallel and accelerated applications
- Implement advanced scheduling policies, resource management, and workflow automation
- Evaluate, test, and integrate emerging HPC technologies and cloud solutions
- Provide technical mentorship and training to HPC Engineers and users
- Ensure compliance with security and data protection requirements
- Foster a culture of innovation, diversity, equity, and inclusion within the HPC team
- Proactively identify and mitigate risks to HPC operations and security
- Lead continuous improvement initiatives for HPC processes and technologies

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Complex HPC cluster implementation standards, advanced scheduler policy design, and automation framework | Architecture-level cluster topology and long-term technology roadmap decisions |
| HPC performance benchmarking methodology, tuning strategy, and interconnect optimisation | Platform procurement decisions and hardware selection |
| Code review quality, HPC runbook standards, and engineer mentorship programme | Product backlog prioritisation and roadmap sequencing |

## Required Skills & Qualifications

**Technical Skills:**

- Extensive experience with HPC administration, engineering, and automation
- Advanced knowledge of parallel and distributed computing concepts and practices
- Deep understanding of job scheduling, resource management, and workflow automation
- Experience optimizing applications for HPC and accelerator environments (GPU, FPGA)
- Strong scripting and programming skills (Python, Bash, Ansible, etc.)
- Knowledge of GPU computing and accelerator technologies (CUDA, ROCm, OpenACC)
- Experience with performance profiling, monitoring, and optimization tools
- Familiarity with container and cloud HPC technologies
- Understanding of security best practices in HPC
- Advanced degree in Computer Science, Engineering, or related field
- Demonstrated commitment to diversity, equity, and inclusion in technical teams
- Experience with risk assessment and mitigation in HPC environments

**Soft Skills and Leadership:**

- Communicates advanced HPC concepts clearly to researchers, HPC Engineers, and architects, translating performance data and benchmark results into actionable priorities
- Collaborates across HPC, hardware, cloud, and security engineering teams to deliver cohesive cluster solutions and mentor engineers through complex technical challenges
- Applies deep analytical problem-solving to isolate performance bottlenecks, scheduler pathologies, and interconnect faults in complex multi-node, GPU-accelerated cluster environments

**Technology Proficiency Levels:**

**Expert level required:**

- Slurm advanced scheduler policy design, fair-share configuration, preemption, and resource management optimisation
- InfiniBand and OmniPath high-performance fabric administration, tuning, and fault diagnosis
- Parallel file systems (Lustre, GPFS/Spectrum Scale, BeeGFS) performance tuning, capacity optimisation, and storage troubleshooting
- CUDA and ROCm GPU computing for accelerated scientific and AI/ML workloads

**Proficient level required:**

- MPI implementations (OpenMPI, MPICH, Intel MPI) tuning and parallel application profiling and optimisation
- Performance profiling tools (Intel VTune, Arm Forge, TAU) for HPC application bottleneck analysis
- HPC container platforms (Singularity, Apptainer, Kubernetes) for reproducible research and portable environments
- Cloud HPC solutions (AWS ParallelCluster, Azure CycleCloud) for hybrid and burst compute workloads

**Working Knowledge required:**

- Scientific libraries (Intel MKL, FFTW, ScaLAPACK) for mathematical and scientific computation support
- Python and Ansible for complex HPC cluster lifecycle automation and orchestration
- OpenACC and OpenMP for multi-core and accelerator parallelism optimisation

**Awareness level expected:**

- RoCE next-generation high-speed interconnect technologies and evolving fabric standards
- Kubernetes-native batch scheduling (Volcano, Kueue) for cloud-native HPC patterns

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| HPC Architect | Solution design, automation, and implementation strategies | Escalates To |
| HPC Product Owner | Technical planning, roadmap execution, and user requirements | Collaborates |
| Server Hardware Senior Engineers | HPC infrastructure and upgrades | Collaborates |
| Cloud Senior Engineers | Cloud and hybrid HPC solutions | Collaborates |
| Security Engineers | Ensure compliance and data protection | Governed By |
| HPC Engineers | Complex technical challenges and best practices | Provides To |
| researchers | Optimize and automate computational workflows | Provides To |

## Key Technologies

- HPC cluster architectures (multi-node, GPU/accelerator enabled)
- Job schedulers (Slurm, PBS Pro, LSF, Grid Engine)
- High-performance interconnects (InfiniBand, OmniPath, RoCE)
- Parallel file systems (Lustre, BeeGFS, GPFS/Spectrum Scale)
- MPI implementations (OpenMPI, MPICH, Intel MPI)
- Container and orchestration technologies for HPC (Singularity, Docker, Kubernetes)
- GPU computing frameworks (CUDA, ROCm, OpenACC)
- Scientific libraries (Intel MKL, FFTW, ScaLAPACK)
- Performance profiling and monitoring tools (Intel VTune, Arm Forge, TAU, Grafana)
- Cloud HPC solutions (AWS ParallelCluster, Azure CycleCloud, Google Cloud HPC)
- Advanced scripting and automation (Python, Bash, Ansible)

## Typical Day-to-Day Activities

- Designing, implementing, and automating HPC cluster solutions
- Optimizing parallel and accelerated applications for performance
- Troubleshooting complex performance and security bottlenecks
- Configuring job schedulers, resource management, and workflow automation
- Working with researchers on computational workflow optimization and automation
- Developing automation for HPC management and monitoring tasks
- Analyzing benchmark results and system performance
- Implementing system monitoring, alerting, and compliance controls
- Evaluating and integrating new HPC technologies and hardware
- Mentoring junior HPC engineers and users on advanced concepts

## Key Performance Indicators

- HPC cluster availability, reliability, and security metrics
- System performance benchmarking and optimization results
- Job throughput, resource utilization, and automation coverage
- Implementation quality and innovation in HPC solutions
- Time to resolution for complex HPC and security issues
- User satisfaction with computational performance and support
- Knowledge transfer and training effectiveness
- Success of optimization and automation projects
- Effective capacity planning and resource management

## Remote Work Considerations

- **Remote Eligibility:** Hybrid — the majority of implementation, automation, and performance tuning work is performed remotely; periodic on-site access required for hardware commissioning, InfiniBand fabric validation, and GPU node burn-in testing in the HPC data centre
- **Collaboration Tools:** Teams, Jira, GitHub, cluster management portals, monitoring dashboards (Grafana, Prometheus, DCGM), performance analysis tools (Intel VTune, Arm Forge)
- **On-Site Requirements:** On-site for hardware commissioning, interconnect cable validation, GPU node installation, and parallel filesystem storage servicing
- **Time Zone Flexibility:** Core business hours with flexibility to support research users across time zones; occasional maintenance windows outside standard hours
- **On-Call / Operational Demands:** On-call rotation for critical cluster failures, interconnect fabric faults, and parallel filesystem degradation events

## Career Development Path

**Previous Roles:**

- HPC Engineer
- Scientific Computing Specialist
- Research Computing Engineer
- Linux System Administrator with HPC focus

**Potential Next Roles:**

- HPC Architect
- Research Computing Director
- Scientific Computing Manager
- Chief Technology Officer (research organization)
- Technical Director for Advanced Computing

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Certified HPC Professional
- Linux Clustering Institute certification
- Red Hat Certified Engineer (RHCE)
- Linux Foundation Certified Engineer
- NVIDIA Deep Learning Institute certifications
- IBM Spectrum Scale (GPFS) certification
- Cloud provider HPC specializations
- Relevant vendor certifications (Intel, AMD, NVIDIA)
- Project management certifications for large-scale implementations
- OpenHPC administration certification

**Complementary Certifications:**

- NVIDIA Deep Learning Institute (GPU performance optimisation and CUDA), Lustre/BeeGFS/GPFS engineering certifications, and OpenMPI/Intel MPI tuning training

**Learning Resources and Communities:**

- SC and ISC High Performance conference proceedings, OpenHPC community (openhpc.community), SchedMD Slurm documentation and user group, NVIDIA NGC Technical Blog and NVIDIA DLI, Intel Developer Zone, OpenMPI community mailing lists, and ACM SIGHPC
