# Security Automation Engineer

| Field | Value |
|---|---|
| **Domain** | Security Cross-Platform |
| **Chapter:** | Security & Identity |
| **Role Level** | Engineer |
| **Reports To** | Security Cross-Platform Senior Engineer |
| **Direct Reports** | None |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

The Security Automation Engineer builds and maintains the automated security tooling, pipelines, and integrations that allow security controls to operate at pipeline speed across the software development lifecycle. This role treats security as code — authoring policy-as-code engines (OPA, Kyverno), embedding SAST, DAST, and SCA tooling into CI/CD pipelines, implementing SOAR playbooks for automated threat response, and constructing automated compliance evidence collection workflows. Rather than relying on manual security reviews, the Security Automation Engineer designs the automation layer that enforces security controls continuously, at scale, and with measurable outcomes — making the security function a reliable, low-friction part of the engineering organisation rather than a bottleneck.

## Role Scope & Boundaries

- **Scope of Influence:** Team — security automation tooling, evidence collection pipelines, and pipeline-speed control enforcement
- **Experience Anchor:** 3-5 years in security or automation engineering — operates independently within the Security Architect's control framework
- **Out of Scope:** Cross-platform security standards (Security Cross-Platform Senior Engineer and Architect-owned); security control framework design (Security Architect-owned, this role implements automated enforcement of it); shared automation platform architecture (Automation Framework Engineer-owned, this role consumes it)
- **Escalates To:** Security Cross-Platform Senior Engineer — complex automation implementation issues
- **Escalated To By:** development teams on security gate findings and false positive tuning

## Business Impact

- **Business Objective:** Scale the organisation's security enforcement capability beyond what manual review can achieve — automating vulnerability detection, policy compliance, and threat response so that security controls are applied consistently across every build, deployment, and runtime environment without requiring proportional growth in security headcount.
- **Value Metrics:** SAST/DAST/SCA pipeline coverage as a percentage of active repositories, mean time to detect (MTTD) critical vulnerabilities from code commit to alert, automated remediation rate as a percentage of findings resolved without manual intervention, security gate false positive rate, compliance evidence automation coverage as a percentage of required audit controls satisfied by automated collection.
- **Key Stakeholders:** Security Architect, DevOps Architect, CISO / Security leadership, development teams, Cloud Security Posture Manager, Compliance and Risk team, Developer Experience Engineer, Automation Framework Engineer, platform and SRE teams.
- **Processes Supported:** Secure software development lifecycle (SSDLC), CI/CD pipeline security gate enforcement, vulnerability management lifecycle, incident detection and automated response, compliance evidence collection, policy-as-code governance, container and Kubernetes security admission control.

## Key Responsibilities

- Design, implement, and maintain SAST, DAST, and SCA security scanning integrations across CI/CD pipelines — ensuring all active repositories have automated security gates configured and producing actionable findings.
- Author and maintain policy-as-code rules using OPA/Conftest and Kyverno — defining and enforcing infrastructure, Kubernetes, and container security policies that are evaluated automatically at pipeline and admission time.
- Build and operate SOAR playbooks (Palo Alto XSOAR, Splunk SOAR) to automate threat detection response workflows — orchestrating alert enrichment, triage, containment actions, and stakeholder notifications without manual intervention.
- Integrate vulnerability scanning tooling (Snyk, Trivy, Grype, Semgrep) into developer toolchains — surfacing findings at the IDE, pull request, and pipeline stages to enable shift-left remediation.
- Configure and operate runtime security tooling (Falco) for container and Kubernetes workload threat detection — tuning detection rules to reduce noise while maintaining coverage of high-severity threat patterns.
- Develop and maintain automated compliance evidence collection pipelines — gathering, structuring, and delivering audit evidence for frameworks such as ISO 27001, SOC 2, NIST CSF, and IEC 62443 with minimal manual effort.
- Configure and maintain GitHub Advanced Security and Microsoft Defender for DevOps integrations — ensuring code scanning, secret scanning, and dependency review results are surfaced and tracked through to resolution.
- Collaborate with DevOps and platform engineering teams to embed security tooling into shared pipeline templates and golden-path developer tooling — reducing the per-team effort to adopt security automation.
- Tune security scanning configurations to manage false positive rates — maintaining signal quality so that security gate failures reflect genuine risk rather than noise.
- Monitor the operational health of security automation pipelines, alert on tooling failures or coverage gaps, and maintain runbooks for pipeline security tooling incidents.

## Key Decisions & Accountabilities

> Clarifies what this role **owns** (decides independently) vs. **advises on** (input without final authority).

| Owns | Advises On |
|---|---|
| Security scanning tool configuration, pipeline integration patterns, and security gate rule definitions | Security policy framework and control requirements (owned by Security Architect) |
| Policy-as-code rule authoring in OPA/Conftest and Kyverno for infrastructure and Kubernetes admission control | Cloud architecture design and infrastructure topology (owned by Cloud Architects) |
| SOAR playbook design, implementation, and operational tuning for automated threat response workflows | Incident response strategy and escalation thresholds (owned by Security Architect) |
| Automated compliance evidence collection pipeline design and delivery | Compliance framework selection and regulatory obligations (owned by Compliance and Risk team) |
| Security tooling integration into CI/CD pipelines and developer-facing toolchains | CI/CD pipeline architecture and developer platform design (owned by DevOps Architect) |
| Runtime security rule configuration (Falco) and detection signal tuning | Threat modelling and broader detection strategy (owned by Security Architect) |

## Required Skills & Qualifications

**Technical Skills:**

- Hands-on experience integrating SAST, DAST, and SCA tooling (Snyk, Semgrep, Trivy, Grype, OWASP ZAP) into CI/CD pipelines across GitHub Actions, Azure Pipelines, Jenkins, or equivalent platforms.
- Proficiency in policy-as-code: authoring OPA Rego policies for Conftest and building Kyverno policies for Kubernetes admission control — including validation, mutation, and generation rules.
- Working knowledge of SOAR platforms (Palo Alto XSOAR or Splunk SOAR) — building playbooks, integrating with detection sources, and orchestrating automated response actions.
- Strong scripting ability in Python and/or Go for building security automation tooling, custom scanning integrations, and evidence collection pipelines.
- Practical understanding of container and Kubernetes security: image scanning, admission controllers, Falco runtime rules, and CIS Kubernetes Benchmark controls.
- Familiarity with GitHub Advanced Security (GHAS): code scanning (CodeQL), secret scanning, and dependency review configuration and triage.
- Understanding of common vulnerability classes (OWASP Top 10, CWE Top 25) and the ability to configure scanning rules that accurately detect them without excessive noise.
- Experience with automated compliance evidence collection patterns — structured artifact generation, evidence storage, and audit trail management.
- Understanding of secret management and secure credentials handling in pipeline contexts (HashiCorp Vault, Azure Key Vault, AWS Secrets Manager).

**Soft Skills & Leadership:**

- Ability to translate security requirements into engineering specifications that development and DevOps teams can implement within standard pipeline patterns.
- Clear communication of security findings and tooling rationale to non-security engineers — framing automation as an enabler rather than a gate.
- Systematic approach to false positive management and signal quality: balancing coverage with usability to maintain developer trust in automated security gates.

**Technology Proficiency Levels:**

**Expert level required:**

- Snyk (SCA/SAST/container/IaC)
- GitHub Advanced Security (GHAS)/Microsoft Defender for DevOps
- Python/Go (security automation)
- OPA/Conftest

**Proficient level required:**

- Semgrep
- Trivy/Grype
- Palo Alto XSOAR/Splunk SOAR
- Kyverno/Falco

**Working Knowledge required:**

- OWASP ZAP (DAST)
- Wiz/Prisma Cloud

**Awareness level expected:**

- eBPF-based security tools
- AI-driven security automation

### Qualifications

- **Education:** Bachelor's degree in Computer Science, Software Engineering, Cybersecurity, or a related field; or equivalent demonstrated experience.
- **Experience:** 3–5 years of experience in DevOps engineering, security engineering, or software engineering with a strong security focus; at least 2 years of hands-on experience building and operating automated security tooling within CI/CD pipelines.
- **Certifications:** CompTIA Security+, Certified Ethical Hacker (CEH), Offensive Security Certified Professional (OSCP), AWS Certified Security – Specialty, Microsoft Certified: Security Operations Analyst Associate (SC-200).

## Interactions with Other Roles

| Role | Nature of Interaction | Interaction Mode |
|---|---|---|
| Cloud Security Posture Manager | Align runtime CSPM detection with pipeline-time policy-as-code rules — ensuring consistent coverage between shift-left and runtime security layers | Collaborates |
| Developer Experience Engineer | Integrate security tooling into the developer-facing toolchain in a low-friction, actionable manner — minimising developer toil while maintaining security coverage | Collaborates |
| Automation Framework Engineer | Leverage shared automation infrastructure (pipeline templates, scripting libraries, orchestration platforms) for security automation workloads | Consumes From |
| Compliance and Risk team | Understand evidence requirements for ISO 27001, SOC 2, and other frameworks — designing automated evidence collection pipelines to satisfy audit obligations | Consumes From |
| Security Architect | Implements automation that enforces the organisation's security control framework at pipeline speed | Governed By |
| DevOps Architect | Embedding security tooling into shared CI/CD pipeline templates, golden-path tooling, and infrastructure automation — ensuring security gates are a first-class component of the delivery platform | Governed By |
| development teams | Triage security gate findings, explain remediation requirements, and tune false positive rates — maintaining developer trust in automated security tooling | Provides To |
| platform and SRE teams | Runtime security tooling (Falco) deployment, alert routing, and operational runbook management | Collaborates |

## Key Technologies

- Snyk (SCA, SAST, container image scanning, and IaC scanning with developer-first workflow integration)
- Semgrep (SAST with custom rule authoring for organisation-specific security patterns)
- Trivy and Grype (container image, filesystem, and IaC vulnerability scanning in pipelines)
- OWASP ZAP (automated DAST in CI/CD pipelines for web application security testing)
- OPA / Conftest (policy-as-code engine for infrastructure, Kubernetes, and pipeline policy evaluation)
- Kyverno (Kubernetes-native policy engine for admission control, mutation, and resource governance)
- Falco (runtime threat detection for containers and Kubernetes workloads)
- GitHub Advanced Security — GHAS (code scanning via CodeQL, secret scanning, dependency review)
- Microsoft Defender for DevOps (pipeline security integration within Azure DevOps and GitHub)
- Palo Alto XSOAR and Splunk SOAR (security orchestration, automation, and response playbook platforms)
- Wiz and Prisma Cloud (cloud and container security posture — integrated into automation workflows)
- Python / Go (scripting languages for custom security automation, tooling integrations, and evidence pipelines)

## Typical Day-to-Day Activities

- Reviewing security scan results from overnight or PR-triggered SAST/DAST/SCA pipeline runs — triaging new findings, classifying severity, and routing to the appropriate development team or risk owner.
- Authoring or updating OPA/Kyverno policy rules in response to new security requirements, audit findings, or emerging threat patterns — testing policies in staging before rollout to production admission controllers.
- Building or iterating on SOAR playbooks in XSOAR or Splunk SOAR — automating threat alert enrichment, triage routing, and containment actions for common detection patterns.
- Tuning Falco runtime detection rules — reviewing alert volumes, suppressing noise from known benign behaviour, and adding detection rules for newly identified threat patterns.
- Collaborating with development teams on security gate failures — investigating false positives, updating suppression configurations, and guiding developers on valid finding remediation.
- Working with the DevOps Architect or Automation Framework Engineer to add or update security scanning steps in shared pipeline templates — rolling out coverage to repositories not yet fully instrumented.
- Building or maintaining automated compliance evidence collection workflows — scheduling evidence artifact generation, validating completeness, and staging deliverables for Compliance and Risk team consumption.
- Reviewing GHAS dashboards for code scanning, secret scanning, and dependency alert volumes — ensuring findings are assigned and not stalling in unreviewed state.
- Reviewing and improving security tooling operational health: checking pipeline scan job failure rates, tooling version currency, and coverage gap reports.
- Staying current with new vulnerability scanner capabilities, emerging SOAR playbook patterns, and updates to OPA/Kyverno policy language features.

## Key Performance Indicators

- SAST/DAST/SCA pipeline coverage: ≥95% of active repositories instrumented with at least one automated security scan integrated into the CI/CD pipeline
- Mean time to detect (MTTD) critical vulnerabilities: ≤24 hours from code commit or image push to security alert generation for critical-severity findings
- Automated remediation rate: ≥30% of low-to-medium severity findings resolved through automated PR suggestions, dependency auto-updates, or SOAR-driven remediation actions
- Security gate false positive rate: ≤10% of security gate failures representing validated false positives, tracked per scanner and reviewed monthly
- Compliance evidence automation coverage: ≥80% of required audit control evidence items satisfied by automated collection pipelines, reducing manual evidence-gathering effort
- Policy-as-code admission control coverage: 100% of production Kubernetes clusters protected by OPA/Kyverno admission controllers enforcing organisation security policies
- SOAR playbook mean time to respond (MTTR): automated playbook-driven response actions initiated within ≤5 minutes of qualifying alert for defined high-priority threat scenarios
- Security scanning tooling availability: ≥99% pipeline security scan job success rate across all instrumented repositories, with failures alerted and resolved within 1 business day

## Remote Work Considerations

- **Remote Eligibility:** Fully remote eligible — all security automation tooling, pipeline systems, and collaboration surfaces are accessible remotely; no physical infrastructure access requirement.
- **Collaboration Tools:** Microsoft Teams, GitHub / Azure DevOps (pipeline and code scanning), Jira or equivalent (finding and task tracking), Confluence (runbooks and documentation), XSOAR / Splunk SOAR consoles, Snyk and GHAS dashboards, OPA Playground / Kyverno Playground for policy testing.
- **On-Site Requirements:** None typically; occasional on-site for security architecture workshops, audit preparation sessions, or team onboarding events.
- **Time Zone Flexibility:** Standard business hours with flexibility for coordination with development teams in overlapping time zones; pipeline security tooling operates continuously but does not require out-of-hours human response for most scenarios.
- **On-Call / Operational Demands:** Expected to respond to critical security automation failures (e.g., scanning pipeline outages removing security gate coverage, Falco alerting on active container compromise) within a defined SLA; may participate in a lightweight on-call rotation shared with the broader security engineering team.

## Career Development Path

**Previous Roles:**

- DevOps Engineer or Platform Engineer with security tooling interest
- Security Engineer (application or infrastructure security focus)
- Software Engineer with security interest who has moved into DevSecOps tooling
- Penetration Tester or Application Security Analyst transitioning to automation-focused work
- Cloud Engineer with CI/CD security scanning and IaC policy experience

**Potential Next Roles:**

- Security Senior Engineer (security automation or DevSecOps specialism)
- Security Cross-Platform Architect
- DevSecOps Lead or Principal Security Engineer
- Security Architect (with application and pipeline security specialism)
- Head of Security Engineering or Security Platform Lead

## Recommended Certifications & Learning Paths

**Core Certifications:**

- CompTIA Security+ — foundational security knowledge baseline for the engineering context
- Certified Ethical Hacker (CEH) — structured understanding of attack techniques that informs scanner rule selection and SOAR playbook design
- Offensive Security Certified Professional (OSCP) — hands-on offensive security skills that sharpen understanding of what automated tooling must detect
- Microsoft Certified: Security Operations Analyst Associate (SC-200) — Microsoft Defender for DevOps and Sentinel integration depth
- AWS Certified Security – Specialty — AWS-native security automation, GuardDuty, Security Hub, and pipeline security patterns

**Complementary Certifications:**

- Certified Kubernetes Security Specialist (CKS) — Kubernetes admission control, OPA/Kyverno, Falco, and runtime security depth
- HashiCorp Terraform Associate — IaC proficiency supporting policy-as-code and Conftest integration work
- Certified Information Systems Security Professional (CISSP) — for progression toward Security Architect track
- GIAC Cloud Security Automation (GCSA) — purpose-built for cloud security automation workflows
- Palo Alto Networks Certified Security Automation Engineer — XSOAR SOAR playbook development depth

**Learning Resources & Communities:**

- OWASP (owasp.org) — OWASP Top 10, OWASP Testing Guide, and OWASP SAMM for SSDLC automation context
- Open Policy Agent documentation and Styra Academy (openpolicyagent.org) — OPA Rego language and policy pattern library
- Kyverno documentation and policy library (kyverno.io) — Kubernetes policy authoring reference
- Falco project documentation and Falco community rules (falco.org) — runtime detection rule authoring and tuning
- Snyk Learn and Snyk security research blog (learn.snyk.io) — vulnerability class education and scanner configuration guidance
- GitHub Advanced Security documentation and GitHub Security Lab (securitylab.github.com) — CodeQL query authoring and GHAS configuration
- SANS DevSecOps curriculum and SANS SEC540 (Cloud Security and DevSecOps Automation) — structured pipeline security automation training
- Semgrep documentation and Semgrep Registry (semgrep.dev) — custom SAST rule development and community rule library
