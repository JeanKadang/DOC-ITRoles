# Contribution Evidence and ADRs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add evidence-focused contribution guidance and a lightweight ADR system with two pilot decisions.

**Architecture:** Keep contributor policy in one root document, keep immutable decisions as individually numbered files under `docs/adr/`, and make both discoverable from README. Record only decisions already evidenced by the repository.

**Tech Stack:** Markdown, existing Markdown/link checks

## Global Constraints

- Do not invent organisational commitments, KPI values, reviewers, or credential authority.
- GitHub Issues remain the backlog source of truth.
- Accepted ADRs are superseded by new records rather than rewritten.

---

### Task 1: Evidence and decision guidance

**Files:**

- Create: `CONTRIBUTING.md`
- Create: `docs/adr/README.md`
- Create: `docs/adr/template.md`
- Create: `docs/adr/0001-retain-portable-no-build-viewer.md`
- Create: `docs/adr/0002-use-github-issues-as-backlog.md`
- Modify: `README.md`

**Interfaces:**

- Consumes: current role template, repository design notes, and retired recommendations workflow
- Produces: contributor review rules and indexed, immutable decision records

- [ ] **Step 1: Write `CONTRIBUTING.md`** with evidence, review, credential, KPI, generated-content, and issue/PR standards.
- [ ] **Step 2: Add the ADR guide, template, and two accepted pilot records** using Context / Decision / Consequences / Status.
- [ ] **Step 3: Link the guidance from README's governance table.**
- [ ] **Step 4: Run `npm test`, `npm run validate`, and the repository Markdown lint command** expecting zero failures.
- [ ] **Step 5: Commit** with `docs: add contribution evidence and ADRs`.
