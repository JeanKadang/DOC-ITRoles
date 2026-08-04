# Cloud Cost Optimization Engineer

| Field | Value |
|---|---|
| **Domain** | FinOps |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Engineer |
| **Reports To** | FinOps Senior Engineer |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Cloud Cost Optimization Engineer is responsible for the hands-on implementation of cost reduction measures across the cloud estate, translating FinOps strategy into tangible savings through reserved instance and savings plan management, rightsizing, idle resource cleanup, spot instance adoption, and tagging enforcement. This role operates at the intersection of cloud engineering and financial accountability, working directly with cloud platforms and FinOps tooling to reduce waste, improve coverage, and ensure cost-aware resource utilisation across AWS, Azure, and GCP.

## Role Scope & Boundaries

- **Scope of Influence:** Team — cloud resource tagging, anomaly resolution, and rightsizing implementation tasks
- **Experience Anchor:** 3-5 years in cloud engineering or FinOps with a cost optimisation focus — operates independently within the FinOps Senior Engineer's standards
- **Out of Scope:** FinOps architecture and cost governance standards (FinOps Architect-owned); cloud platform engineering implementation (Cloud Platform Engineers-owned, this role coordinates rightsizing with it); pipeline design ownership (DevOps Engineers-owned, this role coordinates with it)
- **Escalates To:** FinOps Senior Engineer — cost optimisation implementation questions
- **Escalated To By:** application owners on tagging, anomaly resolution, and rightsizing support

## Business Impact

- **Business Objective:** Implements targeted cloud cost optimisation measures that directly reduce cloud spend, eliminate waste, and improve financial efficiency across the organisation's cloud estate
- **Value Metrics:** Percentage of waste eliminated monthly, rightsizing recommendation adoption rate, reserved instance and savings plan coverage, cost anomaly resolution time, tagging compliance percentage
- **Key Stakeholders:** FinOps Senior Engineer, FinOps Manager, Cloud Platform Engineers, DevOps teams, Finance business partners, application owners
- **Processes Supported:** Reserved capacity purchasing and management, rightsizing and workload optimisation, idle and orphaned resource cleanup, tagging policy enforcement, spot instance adoption, cost anomaly triage and resolution

## Key Responsibilities

- Identify and implement rightsizing recommendations across compute, database, and storage resources
- Manage reserved instance and savings plan portfolios to maximise coverage and minimise on-demand spend
- Conduct regular sweeps for idle, orphaned, and underutilised resources and execute cleanup workflows
- Drive spot and preemptible instance adoption for suitable non-production and fault-tolerant workloads
- Enforce cloud tagging policies and remediate non-compliant resources to maintain cost allocation accuracy
- Investigate and resolve cost anomalies within agreed SLA windows, escalating where root cause is architectural
- Produce regular waste and optimisation reports for FinOps management and engineering stakeholders
- Collaborate with DevOps and platform engineering teams to embed cost-aware practices into provisioning pipelines
- Maintain and update optimisation runbooks, savings tracking logs, and reservation coverage dashboards
- Evaluate FinOps tooling and contribute to tool configuration, alert tuning, and reporting improvements

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Execution of rightsizing, idle resource cleanup, and tagging remediation activities | Reservation and savings plan commitment sizing and term decisions |
| Day-to-day cost anomaly triage, investigation, and resolution within defined thresholds | Architectural changes required to address structural cost inefficiencies |
| Tagging enforcement actions and non-compliance remediation workflows | Tagging policy design, governance framework, and enforcement tooling strategy |

## Required Skills & Qualifications

- Practical experience with cloud cost management and billing platforms across one or more major cloud providers
- Working knowledge of cloud compute, storage, networking, and database service pricing models
- Ability to analyse cost and usage data and translate findings into actionable optimisation tasks
- Familiarity with reserved instance, savings plan, and committed use discount mechanics
- Experience implementing or enforcing resource tagging policies at scale
- Understanding of spot/preemptible instance patterns, interruption handling, and suitable workload profiles
- Basic scripting ability (Python, Bash, or PowerShell) for automation of cleanup and reporting tasks
- Clear written and verbal communication skills for reporting savings and engaging engineering teams
- Attention to detail in cost tracking, savings attribution, and KPI reporting

**Technology Proficiency Levels:**

- **Expert level required:** AWS Cost Explorer and Cost and Usage Report (CUR) for detailed billing analysis and waste identification, Azure Cost Management and Azure Advisor for rightsizing recommendations and anomaly investigation, Reserved instance, savings plan, and committed use discount mechanics across AWS, Azure, and GCP, Cloud resource tagging policy enforcement and non-compliant resource remediation workflows
- **Proficient level required:** Multi-cloud cost management platforms (CloudHealth by VMware, Apptio Cloudability) for consolidated waste and coverage reporting, Python and PowerShell scripting for idle resource cleanup, tagging remediation, and optimisation automation, Spot instance platforms (Spot.io Elastigroup/Ocean) for cost-efficient workload scheduling and interruption management
- **Working Knowledge required:** Cloud provider CLIs (AWS CLI, Azure CLI, gcloud) for bulk resource auditing and operational remediation tasks, GCP Billing Console and GCP Recommender for GCP-specific optimisation actions
- **Awareness level expected:** Infracost for shift-left cost estimation integrated into IaC pipelines, Harness Cloud Cost Management (CCM) and Densify for AI-driven rightsizing and workload optimisation

### Qualifications

- Bachelor's degree in Computer Science, Information Technology, Engineering, or a related field; equivalent practical experience considered
- 2+ years of experience in cloud engineering, DevOps, or infrastructure roles with exposure to cloud cost management
- FinOps Certified Practitioner (FCP) required or to be obtained within first 6 months
- AWS Certified Cloud Practitioner, AZ-900, or Google Cloud Digital Leader preferred
- Demonstrated hands-on experience with at least one major cloud cost management or FinOps platform

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| FinOps Senior Engineer | Receives task prioritisation and technical guidance | Escalates To |
| Cloud Platform Engineers | Coordinates on resource tagging, anomaly resolution, and rightsizing implementation | Collaborates |
| DevOps Engineers | Coordinates cost-efficient deployment practices | Collaborates |
| Application owners | Supports tagging, anomaly resolution, and rightsizing initiatives | Provides To |
| Finance business partners | Provides cost optimisation data for reporting | Provides To |
| platform tooling teams | Coordinates on FinOps tooling integration | Collaborates |

## Key Technologies

- AWS Cost Explorer and AWS Cost and Usage Report (CUR)
- Azure Cost Management and Azure Advisor
- GCP Billing Console and GCP Recommender
- CloudHealth by VMware
- Apptio Cloudability
- Infracost
- Spot.io (Elastigroup / Ocean)
- Densify
- Harness Cloud Cost Management
- Cloud provider CLIs and SDKs (AWS CLI, Azure CLI, gcloud)
- Python or PowerShell for automation scripting
- Jira or ServiceNow for anomaly and remediation ticket tracking

## Typical Day-to-Day Activities

- Reviewing daily cost anomaly alerts and initiating investigation or remediation workflows
- Processing rightsizing recommendations from cost management tooling and coordinating changes with engineering teams
- Auditing resource tagging compliance and remediating non-compliant assets
- Monitoring reserved instance and savings plan utilisation and coverage metrics
- Identifying idle or orphaned resources (unattached volumes, unused IPs, dormant instances) and executing cleanup
- Updating optimisation tracking logs and savings attribution records
- Attending FinOps team standups and engineering syncs to communicate cost findings
- Testing spot instance configurations for candidate workloads and documenting interruption handling patterns
- Preparing weekly waste elimination and coverage summary reports for the FinOps Manager
- Reviewing FinOps tool alert thresholds and contributing to tuning improvements

## Key Performance Indicators

- Percentage of cloud waste eliminated month-on-month
- Rightsizing recommendation adoption rate (% of recommendations implemented within SLA)
- Reserved instance and savings plan coverage percentage across eligible spend
- Cost anomaly resolution time (average hours from alert to resolution)
- Tagging compliance percentage across the cloud estate
- Idle and orphaned resource cleanup rate (resources remediated per sprint)
- Spot instance adoption rate across eligible non-production workloads
- Savings delivered ($ value) against quarterly optimisation targets

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible; all optimisation, tagging, anomaly investigation, and reservation management activities are performed through cloud consoles, billing APIs, and FinOps platforms
- **Collaboration Tools:** Microsoft Teams, Jira, GitHub, Python/PowerShell, cloud provider consoles, and FinOps cost management platforms
- **On-Site Requirements:** None
- **Time Zone Flexibility:** Core business hours with flexibility to align with multi-cloud platform team schedules and monthly FinOps review cycles
- **On-Call / Operational Demands:** Light on-call rotation for critical cost anomaly alerts or significant unexpected spend spikes requiring urgent investigation

## Career Development Path

**Previous Roles:**

- Cloud Engineer
- DevOps Engineer
- Infrastructure Engineer
- Systems Administrator with cloud exposure
- IT Operations Analyst transitioning to cloud

**Potential Next Roles:**

- FinOps Senior Engineer
- Cloud Platform Engineer (cost-focused track)
- FinOps Architect (with additional experience and certifications)
- Cloud Operations Lead

## Recommended Certifications & Learning Paths

- FinOps Certified Practitioner (FCP) — FinOps Foundation
- AWS Certified Cloud Practitioner
- Microsoft Azure Fundamentals (AZ-900)
- Google Cloud Digital Leader
- AWS Certified Solutions Architect – Associate (recommended progression)
- FinOps Certified Engineer (FCE) — for senior progression

**Complementary Certifications:**

- HashiCorp Terraform Associate, AWS Certified SysOps Administrator – Associate, and Microsoft Azure Administrator (AZ-104) for engineering depth alongside FinOps specialisation

**Learning Resources and Communities:**

- FinOps Foundation (finops.org), AWS Cost Management documentation and Well-Architected Cost Optimisation pillar, Microsoft Azure Cost Management and Billing documentation, Google Cloud Cost Optimisation best practices, and the FinOps Foundation community Slack workspace
