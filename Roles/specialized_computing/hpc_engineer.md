# HPC Engineer

| Field | Value |
|---|---|
| **Domain** | Specialized Computing |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Engineer |
| **Reports To** | HPC Senior Engineer |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The HPC Engineer designs, implements, and maintains high-performance computing environments that support computationally intensive workloads. This role ensures that HPC clusters are secure, scalable, and efficient for scientific and engineering applications. The HPC Engineer works closely with the HPC Architect, Product Owner, and other stakeholders to automate operations, integrate new technologies, support users, and promote sustainable, cost-effective HPC operations.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of HPC resource provisioning and support tasks to defined standards
- **Experience Anchor:** 1-3 years in HPC or scientific computing engineering — works under guidance, building toward independent delivery
- **Out of Scope:** HPC architecture and solution design (Senior Engineers and the Architect-owned); underlying Linux OS automation ownership (Linux Server Engineers-owned, this role coordinates with it); specialised hardware upgrade ownership (Server Hardware Engineers-owned, this role coordinates with it)
- **Escalates To:** HPC Architect — implementation and design activity questions
- **Escalated To By:** researchers and engineers on HPC resource training and documentation needs

## Business Impact

- **Business Objective:** Deploys and operates HPC compute nodes, job schedulers, MPI libraries, and parallel filesystems, ensuring reliable cluster availability that enables research teams, data scientists, and engineers to execute compute-intensive workloads without interruption
- **Value Metrics:** Cluster node availability, job scheduler queue efficiency, scientific application installation success rate, mean time to resolve HPC incidents, user support response time, storage system reliability
- **Key Stakeholders:** HPC Architect, HPC Senior Engineers, HPC Product Owner, research computing users, Linux Server Engineers, Server Hardware Engineers
- **Processes Supported:** HPC node provisioning and OS imaging, job scheduler configuration and queue management, scientific software installation and module management, cluster monitoring and incident response, storage and backup operations, user onboarding and support

## Key Responsibilities

- Deploy, configure, and automate HPC cluster components and software
- Implement and optimize job schedulers and resource management systems
- Assist users with job submission, resource utilization, and workflow optimization
- Monitor HPC cluster performance, utilization, and security
- Troubleshoot HPC-related incidents, performance, and security issues
- Install, configure, and maintain scientific and technical applications
- Implement and manage storage and backup solutions for HPC environments
- Document HPC configurations, operational procedures, and best practices
- Integrate cloud-based HPC resources and hybrid workflows
- Ensure compliance with security and data protection policies
- Promote sustainable and energy-efficient HPC operations
- Provide user training and develop clear documentation
- Continuously seek opportunities for process and technology improvement
- Operate distributed edge inference and pre-processing nodes: deployment to accelerator hardware at edge sites, and the data movement between edge collection and central HPC capacity

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| HPC node configuration, job scheduler queue setup, and scientific software module management | Architecture-level design decisions and cluster topology |
| Cluster monitoring alert thresholds, incident triage, and operational runbook execution | Scheduler policy changes and resource allocation strategy |
| User documentation, environment configuration, and container setup for research workloads | Security policy design and platform enhancement prioritisation |

## Required Skills & Qualifications

**Technical Skills:**

- In-depth knowledge of HPC concepts, cluster architectures, and parallel computing
- Experience with Linux administration in HPC contexts
- Familiarity with job scheduling systems (Slurm, PBS, LSF, SGE)
- Understanding of interconnect technologies (InfiniBand, OmniPath, etc.)
- Experience with scientific and technical computing applications
- Proficiency in scripting and automation (Bash, Python, Ansible, etc.)
- Knowledge of container technologies (Singularity, Docker, etc.) in HPC
- Familiarity with cloud platforms and hybrid HPC environments
- Understanding of security best practices for HPC
- Bachelor's degree in Computer Science, Engineering, or related field
- Adaptability and willingness to learn new technologies

**Soft Skills and Leadership:**

- Communicates clearly with research users and scientists in accessible language to understand workload requirements and resolve support requests efficiently
- Collaborates across HPC, Linux, hardware, and storage engineering teams to ensure coordinated cluster operations and effective handoffs
- Applies systematic diagnostic thinking to isolate and resolve complex node failures, scheduler issues, and application environment problems in high-pressure research computing settings

**Technology Proficiency Levels:**

**Expert level required:**

- Slurm or PBS Pro job scheduler administration, queue configuration, and resource policy management
- Linux HPC system administration and cluster node imaging with xCAT or Bright Cluster Manager
- Parallel file systems (Lustre, GPFS/Spectrum Scale, BeeGFS) operations, maintenance, and capacity management
- HPC cluster management and automation using Ansible for configuration management

**Proficient level required:**

- MPI implementations (OpenMPI, MPICH) and scientific library installation and environment module configuration
- InfiniBand and OmniPath high-performance interconnect management and diagnostics
- Container technologies for HPC (Singularity/Apptainer, Docker) for reproducible research environments
- GPU computing frameworks (CUDA, OpenACC) for scientific application support and user enablement

**Working Knowledge required:**

- Cluster monitoring tools (Prometheus, Grafana, Ganglia) for HPC environment health visibility
- Cloud HPC solutions (AWS ParallelCluster, Azure CycleCloud) for hybrid burst workload integration
- Bash and Python scripting for job submission automation and workflow tooling

**Awareness level expected:**

- ROCm AMD GPU computing platform for accelerated scientific workloads
- Emerging cloud-native HPC patterns and Kubernetes batch scheduling (Volcano, Kueue)

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| HPC Product Owner | Task prioritization and user requirements | Consumes From |
| Linux Server Engineers | Base OS and automation | Collaborates |
| Server Hardware Engineers | Specialized hardware and upgrades | Collaborates |
| Security Engineers | Ensure compliance and data protection | Governed By |
| Cloud Engineers | Integrate cloud-based HPC resources | Collaborates |
| HPC Architect | Implementation and design activities | Escalates To |
| researchers and engineers | Provide training, documentation, and support for HPC resource usage | Provides To |

## Key Technologies

- HPC cluster management and automation software (e.g., xCAT, Bright Cluster Manager, Ansible)
- Job scheduling systems (Slurm, PBS Pro, LSF, SGE)
- Linux for HPC environments
- High-performance interconnects (InfiniBand, OmniPath)
- Parallel file systems (Lustre, GPFS/Spectrum Scale, BeeGFS)
- MPI implementations and scientific libraries
- Container technologies for HPC (Singularity, Docker)
- Cluster monitoring and performance analysis tools (Grafana, Prometheus, Ganglia)
- GPU computing frameworks (CUDA, OpenACC)
- Cloud HPC solutions (AWS ParallelCluster, Azure CycleCloud, Google Cloud HPC)
- Batch processing and workflow scripting
- Edge accelerator platforms (NVIDIA Jetson, Intel OpenVINO) for distributed inference
- Edge-to-datacentre data staging for compute pipelines that begin at the edge

## Typical Day-to-Day Activities

- Configuring, automating, and managing HPC cluster components
- Setting up and tuning job schedulers and queue configurations
- Installing and updating scientific software and libraries
- Monitoring cluster performance, utilization, and security
- Troubleshooting hardware, software, and security issues
- Assisting users with job submission, optimization, and workflow automation
- Implementing backup, recovery, and disaster recovery procedures
- Deploying software updates, security patches, and compliance controls
- Creating and updating user documentation and guides
- Setting up user environments, modules, and containers

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Cluster uptime, availability, and security metrics | ≥99.9% (proposed) | Monthly |
| Job scheduling and resource utilization efficiency | — | — |
| Automation coverage and reduction in manual interventions | — | — |
| Software installation and update success rate | — | — |
| User support responsiveness and satisfaction | ≥85% (proposed) | Quarterly |
| Time to resolve HPC-related incidents and security issues | — | — |
| Documentation quality, completeness, and accessibility | — | — |
| Software environment and storage system stability | — | — |
| Knowledge transfer and training effectiveness for research community | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Hybrid — the majority of software configuration, scheduler management, monitoring, and user support is performed remotely; periodic on-site access required for node racking and cabling, hardware fault diagnosis, and drive replacement in the HPC data centre
- **Collaboration Tools:** Teams, Jira, Confluence, GitHub, cluster management portals (xCAT, Bright Cluster Manager), monitoring dashboards (Grafana, Prometheus)
- **On-Site Requirements:** On-site required for physical node installation, hardware maintenance, InfiniBand fabric changes, and storage appliance servicing
- **Time Zone Flexibility:** Standard core business hours; cross-team overlap for support requests from researchers in other time zones
- **On-Call / Operational Demands:** On-call rotation for critical cluster failures, scheduler outages, and parallel filesystem availability incidents

## Career Development Path

**Previous Roles:**

- Linux System Administrator
- Research Computing Support Specialist
- Scientific Application Specialist
- IT Support for Research

**Potential Next Roles:**

- HPC Senior Engineer
- HPC Team Lead
- Research Computing Manager
- HPC Cloud Specialist
- Scientific Computing Architect
- HPC Security Specialist

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Linux Professional Institute certifications
- Red Hat Certified System Administrator
- Cluster management and automation software certifications
- Storage system certifications
- Cloud platform certifications for HPC (AWS, Azure, Google Cloud)
- Performance analysis and monitoring tool certifications
- Domain-specific scientific computing certifications
- Project management fundamentals
- Security certifications relevant to HPC (e.g., CompTIA Security+)

**Complementary Certifications:**

- NVIDIA Deep Learning Institute (Accelerated Computing fundamentals), Slurm administration training (SchedMD), and relevant cloud HPC certifications (AWS ParallelCluster, Azure CycleCloud)

**Learning Resources and Communities:**

- OpenHPC community (openhpc.community), SchedMD Slurm documentation and user group, NVIDIA NGC Technical Blog, HPC Wire, ISC High Performance conference, Lustre/BeeGFS user groups, and Red Hat HPC resources
