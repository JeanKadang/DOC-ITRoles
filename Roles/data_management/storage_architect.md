# Storage Architect

| Field | Value |
|---|---|
| **Domain** | Data Management |
| **Chapter:** | Data & AI |
| **Role Level** | Architect |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Storage Architect is responsible for designing and governing the organisation's enterprise storage strategy across on-premises, hybrid, and cloud environments. This role defines storage architecture patterns for block, file, and object storage, covering performance, capacity, resilience, data protection, and cost optimisation. Unlike vendor-specific storage specialists, the Storage Architect takes a platform-agnostic view across the full storage estate - from SAN/NAS infrastructure to cloud-native object storage and software-defined storage platforms.

## Business Impact

- **Business Objective:** Ensure that data storage infrastructure meets performance, availability, capacity, and cost requirements across all workloads, from production databases to unstructured data repositories and cloud-native applications.
- **Value Metrics:** Storage utilisation efficiency, cost per TB (on-premises vs. cloud tiering), storage-related incident frequency, RPO/RTO achievement for storage-dependent workloads, capacity forecast accuracy.
- **Key Stakeholders:** Infrastructure leadership, Database Administrators, Virtualisation teams, Cloud Architects, Data Protection teams, Finance (storage opex/capex).
- **Processes Supported:** Infrastructure provisioning, disaster recovery, backup and archiving, database storage management, workload migration to cloud, capacity planning.

## Key Responsibilities

- Design and govern enterprise storage architecture across block (SAN/iSCSI/NVMe-oF), file (NAS/NFS/SMB), and object storage platforms.
- Define storage tiering strategy: hot, warm, cold, and archive tiers - spanning on-premises, cloud (Azure Blob, AWS S3, GCP Cloud Storage), and hybrid.
- Establish standards for storage provisioning, LUN/volume design, and thin/thick provisioning policies.
- Architect high availability and replication configurations across storage platforms.
- Design storage integration patterns for virtualisation platforms (VMware vSAN, Hyper-V, Nutanix) and Kubernetes persistent volumes (CSI drivers, StorageClass design).
- Define data lifecycle management policies for tiering, archiving, and retention.
- Architect storage for cloud-native and containerised workloads including ReadWriteMany and object storage patterns.
- Define capacity planning models and work with infrastructure teams on storage refresh and procurement cycles.
- Evaluate and select storage platforms and inform the organisation's storage vendor strategy.
- Govern storage performance standards and ensure SLA-appropriate storage tiers are assigned to workloads.
- Produce storage architecture documentation, standards, and patterns library.
- Mentor senior storage engineers and provide governance on complex design decisions.

## Key Decisions and Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Storage platform architecture and technology selection | Budget and procurement decisions (with Finance/Infrastructure leadership) |
| Storage tiering strategy and data lifecycle policies | DR and backup strategy (with Data Protection Architect) |
| Kubernetes persistent storage standards (CSI/StorageClass) | Cloud platform storage integration (with Cloud Architects) |
| Performance standards and workload-to-tier mapping | Application storage requirements (with App and DB teams) |
| Storage capacity planning models | Vendor commercial negotiations |

## Required Skills

**Technical Skills:**

- Expert knowledge of enterprise SAN/NAS platforms: NetApp ONTAP, Pure Storage, Dell EMC (PowerStore, PowerScale), HPE Alletra/Primera.
- Strong understanding of storage protocols: FC, iSCSI, NFS, SMB/CIFS, NVMe-oF, S3.
- Experience with software-defined storage: VMware vSAN, Nutanix, Ceph, Portworx.
- Proficiency in Kubernetes persistent storage: CSI drivers, StorageClass, PVC, ReadWriteMany patterns.
- Knowledge of cloud object storage: Azure Blob Storage, AWS S3, Google Cloud Storage; tiering and lifecycle policies.
- Experience with hybrid storage solutions: Azure NetApp Files, AWS FSx, Google Cloud Filestore.
- Understanding of storage replication, snapshots, and data protection integration (NetApp SnapMirror, Pure ActiveDR, etc.).
- Familiarity with storage performance analysis: IOPS, throughput, latency, queue depth.
- Experience with capacity planning and storage modelling.

**Soft Skills and Leadership:**

- Strong communication skills for presenting storage strategy and investment justification.
- Vendor management and technical relationship management skills.
- Ability to mentor engineers and review storage designs.
- Analytical approach to capacity and cost modelling.

**Technology Proficiency Levels:**

- **Expert level required:** Enterprise SAN/NAS platforms (NetApp ONTAP, Pure Storage, Dell EMC PowerStore/PowerScale — architecture standards, HA design, and performance governance), storage protocols (FC, iSCSI, NFS, SMB/CIFS, NVMe-oF — design patterns and workload-to-protocol mapping), data tiering strategy (hot/warm/cold/archive across on-premises and cloud tiers with lifecycle management)
- **Proficient level required:** Software-defined storage (VMware vSAN, Nutanix AOS, or Ceph — architecture and selection criteria), cloud object storage (Azure Blob, AWS S3, or GCP Cloud Storage — tiering, lifecycle policies, and hybrid storage patterns), storage replication and data protection architecture (NetApp SnapMirror, Pure ActiveDR, or Zerto)
- **Working Knowledge required:** Kubernetes persistent storage (CSI drivers, StorageClass design, PVC patterns, and ReadWriteMany for containerised workloads), hybrid cloud storage solutions (Azure NetApp Files, AWS FSx, or Google Cloud Filestore), storage capacity planning and cost modelling methodologies
- **Awareness level expected:** NVMe-oF protocol adoption and all-flash fabric architecture trends, Ceph and Rook-Ceph for cloud-native Kubernetes storage deployments, AI/ML workload storage performance requirements and high-throughput access patterns

## Interactions with Other Roles

| Role | Nature of Interaction |
|---|---|
| Data Protection Architect: | Align storage architecture with backup, replication, and DR requirements |
| Database Architects: | Ensure storage tiers and performance specifications meet database workload requirements |
| Virtualisation Architects: | Design vSAN and hypervisor-attached storage solutions |
| Cloud Architects: | Define hybrid and cloud-native storage integration patterns |
| Kubernetes / Platform Engineers: | Define persistent volume standards and CSI driver governance |
| FinOps / Finance: | Model and optimise storage cost across on-premises and cloud |

## Key Technologies

- NetApp ONTAP / Azure NetApp Files
- Pure Storage (FlashArray, FlashBlade)
- Dell EMC PowerStore / PowerScale (Isilon)
- HPE Alletra / Primera / Nimble
- VMware vSAN / Nutanix AOS
- Ceph / Rook-Ceph (Kubernetes)
- Portworx / Longhorn (Kubernetes storage)
- Azure Blob Storage / AWS S3 / GCP Cloud Storage
- Kubernetes CSI drivers and StorageClass patterns
- NetApp SnapMirror / Pure ActiveDR / Zerto (replication)

## Typical Day-to-Day Activities

- Reviewing storage capacity reports and planning upcoming refresh or expansion.
- Designing storage architecture for new workloads or cloud migration projects.
- Approving storage provisioning requests that require architectural input.
- Collaborating with DBA and virtualisation teams on storage performance issues.
- Evaluating new storage platform features or vendor proposals.
- Producing and updating storage architecture standards documentation.
- Participating in change advisory board (CAB) for high-impact storage changes.

## Key Performance Indicators

- Storage utilisation efficiency (target: >70% average utilisation)
- Storage-related incident count (trend: decreasing)
- Capacity forecast accuracy (target: within 10% of actuals at 6-month horizon)
- Storage cost per TB (trend: optimising)
- SLA compliance for storage performance tiers
- Percentage of Kubernetes persistent volumes using approved CSI/StorageClass standards

## Remote Work Considerations

- **Remote Eligibility:** Primarily remote for architecture and design work; occasional on-site for data centre activities.
- **Collaboration Tools:** Microsoft Teams, Confluence, Jira, storage vendor management portals.
- **On-Site Requirements:** Periodic visits to data centres for hardware assessments, new platform onboarding, or DR tests.
- **Time Zone Flexibility:** Standard business hours.
- **On-Call / Operational Demands:** May be on escalation path for critical storage outages affecting production workloads.

## Career Development Path

**Previous Roles:**

- Storage Senior Engineer
- Infrastructure Architect (generalised)
- Storage Engineer with vendor specialism (NetApp, Pure, Dell)

**Potential Next Roles:**

- Enterprise Architect or Infrastructure Architect (broader scope)
- Chief Infrastructure Architect
- Cloud Architect (infrastructure focus)

## Recommended Certifications & Learning Paths

**Core Certifications:**

- NetApp Certified Storage Associate / Professional (NCSA/NCSP) - if NetApp environment
- Pure Storage FlashArray Certified Technical Specialist
- Dell EMC Proven Professional (Storage track)

**Complementary Certifications:**

- VMware Certified Advanced Professional - Data Center Virtualisation (VCAP-DCV)
- Microsoft Certified: Azure Administrator Associate (AZ-104) - for hybrid storage
- AWS Certified Solutions Architect (storage domain knowledge)

**Learning Resources and Communities:**

- NetApp Learning Services
- SNIA (Storage Networking Industry Association) resources and certifications
- Ceph community documentation and training
- Kubernetes CSI documentation and CNCF storage working group resources
