# ADR-0005: Identify roles by a stable ID rather than by title

- **Status:** Accepted
- **Date:** 2026-08-14
- **Issue/PR:** #180

## Context

Reporting lines, direct reports, career paths, and interaction tables all reference roles by human-readable title. Titles change, and when one does the references to it break silently.

That is not hypothetical. Checking every `Reports To` against every role title on `main` found **203 of 226 resolving** and 23 not — and the 23 are three different things:

- **7 are correct**: `CEO`, `Board of Directors`, `SVP of Technology`. Destinations deliberately outside the catalogue, which the catalogue has no way to express.
- **12 are a choice**, not an edge: `Technical Area Lead (TAL) or Product Area Lead (PAL)` and similar. One field holding an either/or cannot be validated or drawn.
- **4 are drift**: `Infrastructure Onboarding Senior Engineer` should be *Enterprise* Infrastructure Onboarding Senior Engineer; `Configuration Management Senior Engineer` should be *Application* Configuration Management Senior Engineer; `Modern Workplace Senior Engineer` is missing its *(Microsoft 365)* qualifier; and `GCP Cloud Senior Engineer` names a role the catalogue does not contain at all.

Nothing reports the last group, because a stale name is indistinguishable from a deliberate reference to something outside the catalogue. Validation cannot tell a typo from an intentional external destination when both are just free text that fails to match.

## Decision

**Every role carries a `Role ID`: lowercase kebab-case, unique across the catalogue, assigned once and never reused.**

The id is seeded from the role title on first assignment and then **frozen**. It is deliberately not derived at read time — an id computed from the title would change when the title changes, which is the failure it exists to prevent. Renaming a role changes its title and leaves its id alone.

Parenthesised qualifiers are preserved when seeding, so `Modern Workplace Senior Engineer (Microsoft 365)` and a plain `Modern Workplace Senior Engineer` cannot collide.

The validator enforces presence, format, and catalogue-wide uniqueness. An id shared by two roles is not an identifier, so duplicates are an error, checked the same way duplicate titles already are.

This mirrors `data/credentials.json`, where a stable id and a mutable display name are already separated. That separation has been exercised in practice: the credential registry survived a real vendor rename this session with the id untouched.

## Consequences

- Relationships gain something stable to point at. Migrating `Reports To`, `Direct Reports`, career paths, and interaction tables onto ids is follow-on work, not part of this decision.
- Renaming a role becomes safe. Re-homing a role between domains becomes safe. Neither invalidates a reference.
- The four drifted references above become detectable once relationships resolve against ids, rather than silently unresolvable.
- Ids seeded from titles will look stale after a rename — `kubernetes-engineer` for a role later called something else. That is correct and intended: the id is an identifier, not a label. Anyone tempted to "fix" it is reintroducing the defect.
- Two representation gaps remain open, and are deliberately **not** decided here: how a destination outside the catalogue is expressed, and how a genuine either/or is expressed. Both need a decision before relationships can migrate.
- Ids are metadata, so the catalogue gains a third row in every role's table. This lands before the credential batches in #230–#245 rewrite these files, so the cost is paid once.
