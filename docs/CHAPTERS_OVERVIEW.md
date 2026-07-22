# Chapters overview

This role library is organised into **seven chapters** — the top-level grouping above domains. Each chapter owns a cluster of related domains and is led by a Chapter Lead who reports to the Technical Area Lead (TAL) or Product Area Lead (PAL).

> **Where the detail lives:** Each chapter's full description (purpose and cross-chapter collaborations) is maintained as a separate file under [`docs/chapters/`](chapters/). Live domain and role counts are shown in the web viewer's chapter panel — click a chapter in the sidebar — so they are always current and are deliberately not duplicated here.

## The seven chapters

| # | Chapter | Focus | Detail | Chapter Lead |
|---|---------|-------|--------|--------------|
| 1 | ☁️ Cloud, Platform & Infrastructure | Cloud, containers, virtualisation, hardware, OS, network, FinOps | [cloud_platform_infra.md](chapters/cloud_platform_infra.md) | [cloud_platform_infrastructure_chapter_lead](../Roles/leadership/cloud_platform_infrastructure_chapter_lead.md) |
| 2 | 🔄 DevOps & Delivery | CI/CD, developer experience, application platforms, integration | [devops_delivery.md](chapters/devops_delivery.md) | [devops_delivery_chapter_lead](../Roles/leadership/devops_delivery_chapter_lead.md) |
| 3 | 📊 Data & AI | Data platform, storage, databases, AI governance | [data_ai.md](chapters/data_ai.md) | [data_ai_chapter_lead](../Roles/leadership/data_ai_chapter_lead.md) |
| 4 | 🔒 Security & Identity | Security architecture, IAM/PAM, data protection, directory services | [security_identity.md](chapters/security_identity.md) | [security_identity_chapter_lead](../Roles/leadership/security_identity_chapter_lead.md) |
| 5 | 🖥️ End User & Workplace | Client platform, endpoint management, Microsoft 365, service desk | [end_user_workplace.md](chapters/end_user_workplace.md) | [end_user_workplace_chapter_lead](../Roles/leadership/end_user_workplace_chapter_lead.md) |
| 6 | 🎯 Service & Governance | ITSM, configuration management, service management, enterprise architecture | [service_governance.md](chapters/service_governance.md) | [service_governance_chapter_lead](../Roles/leadership/service_governance_chapter_lead.md) |
| 7 | 👑 Leadership | C-Suite, SVP, CISO, Chapter Leads, TAL, PAL, cross-cutting leadership | [leadership_chapter.md](chapters/leadership_chapter.md) | — |

## Maintaining chapter content

- To edit a chapter's purpose or collaborations, update its file in [`docs/chapters/`](chapters/) — the web viewer's chapter panel renders it directly.
- Do not add role or domain counts to these files. Counts are computed live from the `Roles/` folder by the viewer, which prevents the drift this document previously suffered.
- To add a new chapter, create `docs/chapters/<key>.md` and add a matching entry (with the same `<key>`) to the `CHAPTERS` map in `index.html`.
