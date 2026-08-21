# Kubernetes Engineer

| Field | Value |
|---|---|
| **Role ID** | `kubernetes-engineer` |
| **Domain** | Kubernetes |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Engineer |
| **Reports To** | Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer --> |
| **Direct Reports** | None |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Kubernetes Engineer implements and maintains Kubernetes environments, ensuring stable, secure, and performant container orchestration platforms. This role is responsible for day-to-day operations, troubleshooting, and implementation of standard Kubernetes components and configurations.

## Role Scope & Boundaries

- **Scope of Influence:** Team — execution of container deployment and cluster operations tasks to defined standards
- **Experience Anchor:** 1-3 years in Kubernetes or container engineering — works under guidance, building toward independent delivery
- **Out of Scope:** Kubernetes architecture and cluster design (Senior Engineers and the Architect-owned); underlying infrastructure platform ownership (infrastructure teams-owned, this role coordinates with it); CI/CD pipeline design (CI/CD teams-owned, this role integrates deployments with it)
- **Escalates To:** Kubernetes Senior Engineers and Architect — day-to-day guidance and direction
- **Escalated To By:** application teams on containerized workload support

## Business Impact

- **Business Objective:** Maintains the day-to-day health, availability, and security of Kubernetes clusters, enabling development teams to deploy and run containerised workloads reliably and efficiently.
- **Value Metrics:** Cluster uptime, container deployment success rate, mean time to resolve standard Kubernetes incidents, change implementation success rate, documentation completeness.
- **Key Stakeholders:** Kubernetes Senior Engineer, Kubernetes Product Owner, application development teams, CI/CD pipeline engineers.
- **Processes Supported:** Incident management (Kubernetes platform), cluster upgrade and patch management, application team onboarding to container platform, change management (standard Kubernetes changes).

## Key Responsibilities

- Install, configure, and maintain Kubernetes clusters
- Implement container networking, storage, and security configurations
- Monitor cluster health, performance, and resource utilization
- Troubleshoot and resolve Kubernetes-related issues and incidents
- Perform cluster upgrades and patch management
- Implement standard deployment patterns and resource configurations
- Create and maintain Kubernetes manifests and Helm charts
- Support application teams in deploying containerized workloads
- Document Kubernetes operational procedures and configurations

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Day-to-day cluster operations, standard deployment support, and routine maintenance | Complex Kubernetes architecture decisions (escalated to Senior Engineer / Architect) |
| Helm chart creation and Kubernetes manifest maintenance for standard workload patterns | Container security policy and network policy design |
| Cluster monitoring alert response, node troubleshooting, and first-response incident triage | Cluster capacity planning and scaling strategy |

## Required Skills & Qualifications

**Technical Skills:**

- Hands-on experience with Kubernetes cluster operations
- Proficiency with container technologies (Docker, containerd)
- Understanding of Kubernetes networking models and CNI plugins
- Experience with Kubernetes storage options and CSI drivers
- Knowledge of Kubernetes security features and best practices
- Familiarity with monitoring and logging tools for containers
- Scripting and automation skills (Bash, Python, YAML)
- Understanding of Linux fundamentals and container OS concepts

**Soft Skills and Leadership:**

- Communicates cluster health status and incident progress clearly to development teams and product owners.
- Collaborates with application teams to diagnose workload issues and onboard new services to the container platform.
- Methodical troubleshooting approach for pod failures, scheduling issues, and network connectivity problems.

**Technology Proficiency Levels:**

**Expert level required:**

- Kubernetes cluster operations (kubectl, namespaces, Deployments, StatefulSets, DaemonSets, RBAC)
- Container runtime technologies (Docker, containerd, CRI-O) and image management
- Kubernetes networking (CNI plugins, Services, Ingress controllers, NetworkPolicies)
- Helm for application package management and chart creation and maintenance

**Proficient level required:**

- Kubernetes storage (PersistentVolumes, PVCs, CSI drivers, StorageClasses)
- Prometheus and Grafana for cluster monitoring, alerting, and dashboards
- Kubernetes security (Pod Security Standards, RBAC, Secrets management, image scanning)

**Working Knowledge required:**

- GitOps deployment tools (ArgoCD, Flux) for declarative workload delivery
- Linux system administration and container OS fundamentals (cgroups, namespaces, systemd)

**Awareness level expected:**

- Service mesh concepts (Istio, Linkerd) for advanced traffic management and mTLS
- Cloud-managed Kubernetes platforms (AKS, EKS, GKE) for cloud-specific deployment and operations

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| application teams | Containerized workloads | Provides To |
| infrastructure teams | Underlying platforms | Collaborates |
| security teams | Container security implementations | Governed By |
| CI/CD teams | Deployment pipeline integration | Collaborates |
| Kubernetes Senior Engineers and Architect | Day-to-day guidance and direction | Escalates To |

## Key Technologies

- Kubernetes distributions and managed services (kubeadm-based clusters, AKS/EKS)
- kubectl, Helm, and Kustomize for cluster and workload management
- Container runtimes and image tooling (containerd, Docker, image registries such as Harbor/ACR)
- Ingress controllers and cluster networking (NGINX Ingress, CNI plugins, network policies)
- GitOps and deployment tooling (Argo CD, Flux)
- Monitoring and logging stacks (Prometheus, Grafana, Loki/Fluent Bit)
- Kubernetes security basics (RBAC, namespaces, secrets management, image scanning with Trivy)
- Infrastructure as Code fundamentals (Terraform) for cluster-adjacent resources

## Typical Day-to-Day Activities

- Performing daily cluster health checks and responding to platform monitoring alerts
- Executing cluster patching and upgrade tasks following the defined upgrade runbooks
- Resolving standard Kubernetes incidents and tickets: failing pods, resource pressure, configuration issues
- Provisioning namespaces, RBAC bindings, and quotas for application team onboarding
- Reviewing and applying workload manifests and Helm chart changes through the GitOps pipeline
- Maintaining platform documentation, runbooks, and onboarding guides
- Participating in stand-ups, change advisory reviews for standard changes, and knowledge sharing with Senior Engineers
- Escalating complex platform issues to the Kubernetes Senior Engineer with diagnostic context

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Kubernetes cluster uptime and reliability | ≥99.9% (proposed) | Monthly |
| Container deployment success rate | — | — |
| Time to resolve Kubernetes incidents | — | — |
| Security compliance in Kubernetes environments | — | — |
| Owned documentation reviewed and current within the agreed review cycle (%) | ≥95% (proposed) | Quarterly |
| Implementation quality of standard patterns | — | — |
| Knowledge-sharing contributions published or presented (count per quarter) | ≥1 per quarter (proposed) | Quarterly |
| Kubernetes automation implementation | — | — |
| User satisfaction with container platform | ≥85% (proposed) | Quarterly |
| Cluster resource utilization efficiency | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — all Kubernetes operations are performed remotely via kubectl and cloud console.
- **Collaboration Tools:** Microsoft Teams, GitHub / GitLab, Jira, ServiceNow (change and incident management), Lens / OpenLens, Prometheus / Grafana dashboards.
- **On-Site Requirements:** Rarely required on-site; occasional bare-metal node replacement in on-premises clusters.
- **Time Zone Flexibility:** Standard business hours; may participate in shift rota for out-of-hours maintenance windows.
- **On-Call / Operational Demands:** May participate in on-call rota; escalates P1 cluster failures to Senior Kubernetes Engineer.

## Career Development Path

**Previous Roles:**

- Linux System Administrator
- DevOps Engineer <!-- role: devops-engineer -->
- Cloud Engineer
- Application Support Engineer
- Docker Specialist

**Potential Next Roles:**

- Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer -->
- DevOps Team Lead
- Site Reliability Engineer <!-- role: site-reliability-engineer -->
- Platform Engineering Specialist
- Cloud Architect with container focus

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Certified Kubernetes Administrator (CKA) <!-- credential: cncf-cka -->
- Certified Kubernetes Application Developer (CKAD) <!-- credential: cncf-ckad -->

**Complementary Certifications:**

- Kubernetes and Cloud Native Associate (KCNA) <!-- credential: cncf-kcna -->
- Prometheus Certified Associate (PCA) <!-- credential: cncf-pca -->
- Certified Argo Project Associate (CAPA) <!-- credential: cncf-capa -->
- HashiCorp Certified: Terraform Associate <!-- credential: hashicorp-terraform-associate -->

**Learning Resources and Communities:**

- KodeKloud (CKA/CKAD labs), Learnk8s.io, TechWorld with Nana Kubernetes course (YouTube), Kubernetes official documentation (kubernetes.io), KubeAcademy (kube.academy).
