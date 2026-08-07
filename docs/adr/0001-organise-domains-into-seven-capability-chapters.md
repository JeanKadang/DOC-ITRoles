# ADR-0001: Organise domains into seven capability chapters

- **Status:** Accepted
- **Date:** 2026-08-07
- **Issue/PR:** #192

## Context

The catalogue contains many technology domains. A flat domain list does not provide an accountable operating-model layer for shared standards, practitioner development, or cross-domain collaboration. Hand-maintained role and domain counts have also drifted in narrative documents.

The established catalogue groups domains into Cloud, Platform & Infrastructure; DevOps & Delivery; Data & AI; Security & Identity; End User & Workplace; Service & Governance; and Leadership. The first six capability chapters have Chapter Lead roles; Leadership contains cross-cutting executive and chapter leadership roles.

## Decision

Keep the seven chapters as the catalogue's grouping layer above domains. Each domain belongs to one capability chapter, while leadership roles remain in the Leadership chapter. Chapter narratives describe purpose and collaboration, but role/domain counts are derived from the catalogue rather than copied into those narratives.

Changing a chapter boundary, creating a chapter, or moving a domain between chapters is a taxonomy decision and requires an issue plus a superseding ADR or explicit amendment decision.

## Consequences

- Chapter ownership and cross-domain collaboration have a stable vocabulary.
- Domain additions must update the chapter configuration and chapter narrative.
- The viewer and generated documents should derive membership and counts from one configuration source; centralising that source remains tracked by #184.
- Organisation-specific structures that do not fit these chapters require an explicit future overlay decision rather than silent edits to the portable base.
