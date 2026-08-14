# Network Automation Architect

| Field | Value |
|---|---|
| **Domain** | Network |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Architect |
| **Reports To** | Cloud, Platform & Infrastructure Chapter Lead |
| **Direct Reports** | None (sets technical direction and mentors the Network Automation Engineer; formal line management sits with the Chapter Lead) |
| **Content Owner** | catalogue-maintainers |
| **Review Status** | mechanical |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Network Automation Architect designs and governs the strategy, tooling, and practices for automating network infrastructure provisioning, configuration, validation, and operations. As networks evolve from manually-configured hardware-centric models to software-defined, API-driven, and infrastructure-as-code approaches, this role leads the transition - defining the automation architecture across on-premises (campus, data centre), SD-WAN, and cloud networking. The Network Automation Architect bridges traditional network engineering with software and DevOps practices to enable faster, safer, and more consistent network-change delivery.

## Role Scope & Boundaries

- **Scope of Influence:** Domain-wide — network automation architecture, CI/CD for network changes, and infrastructure-as-code patterns across the chapter
- **Experience Anchor:** 8+ years in network engineering or automation architecture with demonstrated architecture-level delivery — operates independently on domain-wide network automation decisions, as a peer counterpart to the Network Architect rather than in a hierarchical relationship
- **Out of Scope:** Overall network platform architecture (Network Architect-owned, this role extends and operationalises its designs); cloud IaC standards beyond network automation (Cloud Architects-owned, this role aligns to them); ITSM change process ownership (Service Management-owned, this role integrates automated workflows with it)
- **Escalates To:** Cloud, Platform & Infrastructure Chapter Lead — chapter-wide priorities and cross-domain investment decisions
- **Escalated To By:** the Network Automation Engineer on automation strategy questions

## Business Impact

- **Business Objective:** Reduce network change delivery time, eliminate human error in configuration management, and enable network infrastructure to be provisioned at cloud speed aligned with application and DevOps delivery cadences.
- **Value Metrics:** Network change cycle time (manual baseline vs. automated), configuration drift rate, mean time to remediate network incidents attributable to misconfigurations, network automation coverage percentage, network-related change-related outages (trend: decreasing).
- **Key Stakeholders:** Network Architect, Infrastructure and Cloud Architects, DevOps and Platform Engineering teams, Security, IT Operations, Compliance.
- **Processes Supported:** Network change management, configuration management, network compliance validation, Day-2 operations automation, cloud network provisioning, SD-WAN and SD-Access overlay management.

## Key Responsibilities

- Design the enterprise network automation architecture: toolchain, platforms, workflow patterns, and integration with ITSM change processes.
- Define network-as-code standards using tools such as Ansible, Nornir, NAPALM, Terraform (cloud networking), and Cisco NSO.
- Architect intent-based networking (IBN) and closed-loop automation patterns for network configuration management.
- Define network CI/CD pipeline architecture: automated configuration testing, linting, validation in pre-production before production deployment.
- Establish network configuration management standards using Git-based source-of-truth approaches (NetBox as IPAM/DCIM source of truth).
- Design API-first integration patterns between network management (Cisco DNA Centre, Meraki, Aruba Central) and automation pipelines.
- Define automated network compliance checking frameworks using tools like Batfish or Nornir-based compliance scanners.
- Architect telemetry and streaming data collection from network devices (gNMI, YANG, OpenConfig) for real-time observability.
- Lead evaluation and adoption of network automation platforms: Cisco Catalyst Centre, Apstra, Itential, or equivalent.
- Mentor network automation engineers and coach traditional network engineers through automation adoption.
- Represent network automation in cross-domain architecture forums alongside DevOps and infrastructure teams.
- Design automated edge network provisioning frameworks: zero-touch provisioning (ZTP) pipelines for edge site routers, SD-WAN CPE, and network appliances at distributed edge locations.
- Define edge network automation standards: automated configuration push, compliance validation, and telemetry collection for edge PoPs and remote/branch network infrastructure integrated into the central network-as-code framework.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Network automation toolchain architecture and standards | Network design and topology decisions (with Network Architect) |
| Network-as-code standards and Git-based workflow design | Cloud network architecture (with Cloud Architects) |
| CI/CD pipeline design for network deployments | Change management gate requirements (with ITSM/Service Management) |
| IBN and telemetry collection architecture | Security policy for network automation access credentials |
| Network compliance automation framework design | Training and skilling programme for network operations team |

## Required Skills & Qualifications

**Technical Skills:**

- Expert knowledge of network automation frameworks: Ansible (network modules), Nornir, NAPALM, NetMiko.
- Experience with infrastructure-as-code for cloud networking: Terraform AWS networking, Azure Virtual Network, GCP VPC.
- Proficiency with network source-of-truth tools: NetBox, Nautobot.
- Experience with Cisco platforms supporting automation: DNA Centre / Catalyst Centre APIs, Meraki API, NSO.
- Understanding of network data modelling: YANG, NETCONF, RESTCONF, OpenConfig, gNMI.
- Knowledge of programmable networking: Cisco IOS-XE/NX-OS REST APIs, Arista eAPI, Juniper PyEZ.
- Experience with network compliance tools: Batfish, Forward Networks, or similar.
- Proficiency in Python for network automation scripting and tooling development.
- Understanding of streaming telemetry and model-driven observability for network devices.
- Experience integrating network automation with ITSM platforms (ServiceNow) for change workflow automation.

**Soft Skills and Leadership:**

- Ability to lead network operations teams through cultural change from CLI-driven to automation-first practices.
- Strong cross-functional collaboration with DevOps and cloud engineering disciplines.
- Clear architectural documentation and standards writing skills.
- Mentoring traditional network engineers in Python and automation tooling.

**Technology Proficiency Levels:**

**Expert level required:**

- Ansible (network modules) / Nornir / NAPALM / NetMiko
- Python (scripting and automation)
- NETCONF / RESTCONF / gNMI / OpenConfig / YANG

**Proficient level required:**

- Cisco DNA Centre / Catalyst Centre / Cisco NSO
- NetBox / Nautobot (Source of Truth)
- Batfish / Forward Networks (network compliance)

**Working Knowledge required:**

- Terraform (cloud networking - Azure, AWS, GCP)
- Arista eAPI / Juniper PyEZ / Cisco IOS-XE REST API
- ServiceNow (ITSM integration)
- GitHub / GitLab / Azure DevOps (network-as-code pipelines)

**Awareness level expected:**

- Zero-touch provisioning (ZTP) platforms for edge site CPE and SD-WAN onboarding
- SD-WAN automation APIs for edge PoP provisioning

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Network Architect | Collaborate on overall network platform decisions; automation extends and operationalises network designs | Collaborates |
| DevOps / Platform Engineering Architect | Align network CI/CD with enterprise pipeline standards | Collaborates |
| Cloud Architects | Define cloud network automation patterns (Terraform VNets/VPCs) aligned with cloud platform IaC standards | Collaborates |
| Security Engineers | Automate network security policy enforcement and compliance validation | Governed By |
| Service Management | Integrate automated network change workflows with ITSM change approval processes | Collaborates |

## Key Technologies

- Ansible (network modules) / Nornir / NAPALM / NetMiko
- Python (scripting and automation)
- Cisco DNA Centre / Catalyst Centre / Cisco NSO
- NetBox / Nautobot (Source of Truth)
- Terraform (cloud networking - Azure, AWS, GCP)
- NETCONF / RESTCONF / gNMI / OpenConfig / YANG
- Batfish / Forward Networks (network compliance)
- Arista eAPI / Juniper PyEZ / Cisco IOS-XE REST API
- ServiceNow (ITSM integration)
- GitHub / GitLab / Azure DevOps (network-as-code pipelines)
- Zero-touch provisioning (ZTP) platforms for edge site CPE and SD-WAN onboarding (Cisco PnP, Juniper ZTP, Arista ZTP)
- SD-WAN automation APIs for edge PoP provisioning (Cisco Viptela, VMware VeloCloud, Fortinet SD-WAN)

## Typical Day-to-Day Activities

- Designing network automation workflows for new infrastructure provisioning or change scenarios.
- Reviewing automation code contributed by the network automation team (code review of Ansible playbooks, Python scripts).
- Evaluating new API capabilities from Cisco, Arista, or Juniper platform releases.
- Collaborating with DevOps teams on integrating network pipeline standards into enterprise CI/CD.
- Working with the network operations team to identify manual toil candidates for automation.
- Presenting automation adoption metrics and roadmap to infrastructure leadership.
- Updating network-as-code standards and architecture documentation.

## Key Performance Indicators

| Metric | Target | Frequency |
|---|---|---|
| Percentage of network changes deployed via automated pipelines (coverage) | — | — |
| Network configuration drift rate (target: near-zero with continuous reconciliation) | — | — |
| Network change cycle time (automated vs. manual benchmark) | — | — |
| Network compliance check pass rate (automated validation) | — | — |
| Mean time to remediate network misconfigurations | — | — |
| Network automation pipeline code coverage and test pass rate | ≥80% (proposed) | Monthly |
| Edge site provisioning automation coverage: ≥80% of new edge PoPs and branch sites provisioned via automated ZTP pipelines | ≥80% | — |
| Edge network configuration drift rate: near-zero target applied consistently across the edge and branch network estate | — | — |

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible for architecture and development work.
- **Collaboration Tools:** Microsoft Teams, GitHub, VSCode / Ansible Tower / AWX, NetBox, Confluence.
- **On-Site Requirements:** Occasional on-site for network hardware lab testing or proof-of-concept validation on physical equipment.
- **Time Zone Flexibility:** Standard business hours.
- **On-Call / Operational Demands:** Not typically on direct on-call, but may be engaged during incidents involving failed automated deployments or configuration drift events.

## Career Development Path

**Previous Roles:**

- Network Automation Engineer (senior level)
- Network Senior Engineer with Python/Ansible proficiency
- Network Architect with growing automation interest

**Potential Next Roles:**

- Enterprise Architect or Infrastructure Architect
- Head of Network and Automation Engineering
- Cloud Networking Architect

## Recommended Certifications & Learning Paths

**Core Certifications:**

- Cisco Certified DevNet Professional (DEVCOR)
- Cisco Certified DevNet Specialist - Network Automation (ENAUTO)
- Juniper Networks Certified Associate - Automation and DevOps (JNCIA-DevOps) - if Juniper environment

**Complementary Certifications:**

- CCNP Enterprise or CCNP Data Centre (domain depth)
- HashiCorp Certified: Terraform Associate
- AWS / Azure networking certifications (for cloud network automation)

**Learning Resources and Communities:**

- Cisco DevNet Learning Labs and Sandbox
- Network to Code community and NTC workshops
- Python for Network Engineers resources (Kirk Byers)
- NANOG and Network Automation Forum communities
