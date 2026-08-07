# Contribution Evidence and ADRs Design

## Goal

Give content contributors a concise evidence standard and preserve consequential catalogue decisions in versioned decision records.

## Design

Root-level `CONTRIBUTING.md` focuses on substantive content review rather than repeating Git mechanics. It distinguishes evidence-backed facts, organisation-specific commitments, generated content, and unresolved proposals; it also covers credentials, KPI targets, review provenance, and issue-first workflow.

`docs/adr/README.md` defines the immutable ADR lifecycle and indexes records. A reusable template records Status, Context, Decision, and Consequences. Two pilot accepted ADRs capture already-established decisions: retaining the portable no-build/offline viewer architecture and keeping GitHub Issues as the active backlog rather than Markdown checklists.

The repository README links to both guides. Markdown lint and link checks provide verification.
