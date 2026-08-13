# ADR-0003: Name credentials explicitly rather than families or topics

- **Status:** Accepted
- **Date:** 2026-08-13
- **Issue/PR:** #228

## Context

The credential registry established in #178 records credentials that have been audited against an issuer-controlled source. Rolling it out across the remaining domains (#210) surfaced 476 legacy entries that cannot become registry records at all, because they do not name an individually-held credential:

| Kind | Entries | Distinct | Example |
|---|---|---|---|
| family | 384 | 269 | `Cloud platform associate certifications`, `ITIL Service Management certifications` |
| topic | 57 | 46 | `Linux fundamentals`, `REST API Design fundamentals` |
| vague | 35 | 26 | `TOGAF or other enterprise architecture certification` |

`docs/CREDENTIAL_REGISTRY.md` already excluded families and organisation programmes from the registry, but said nothing about what should replace them in a role. Sixteen domain batches migrating in parallel would each have invented an answer, and the catalogue would end up recommending credentials inconsistently — the precise failure the registry exists to prevent.

These counts come from `scripts/credential-inventory.js`. An earlier version of that script misclassified real certifications as families and topics (#248); the figures above are the corrected ones.

## Decision

**A credential recommendation names one credential a person can hold, or it is not a credential recommendation.**

Three rules follow, one per kind.

### Families are expanded to named credentials

Replace a family with the specific credentials it means, each registry-backed. `Cloud platform associate certifications` becomes the named associate certifications for the platforms the role actually works with — not all of them by reflex.

Where a family names no determinable set, it is not rewritten into a guess. Raise it in the domain batch and either name the credentials the domain genuinely expects, or drop the line. A family retained as-is is not an acceptable outcome.

### Topics are audited before they are judged

A topic is only a topic once an audit says so. Several real certifications appear in the catalogue with the exam code omitted — `Microsoft Azure Fundamentals` is AZ-900 — and are indistinguishable from a genuine subject such as `Linux fundamentals` without issuer knowledge.

So the cross-cutting audit (#229) resolves each topic entry first. What is a real credential becomes a registry record; what remains a subject is then treated as a family under the rule above.

### Vague alternatives are rewritten to the named credential

`X or other Y certification` becomes `X`. `X or equivalent` becomes `X`.

The hedge is not preserved. A reader cannot act on "or equivalent", and a validator cannot verify it. Where several credentials genuinely qualify, name each one explicitly rather than gesturing at a category.

## Consequences

- Every certification bullet in a migrated role names a credential that a person can hold and that has been checked against its issuer.
- The rollout is more work than deleting the 476 entries would have been, and it requires a judgement per family about which credentials a domain expects. That judgement belongs in the domain batch, with the reasoning visible in the PR.
- Roles lose the latitude "or equivalent" implied. Where that latitude was real, it must be made explicit by naming the alternatives — which is the point.
- Some of the 57 topic entries will turn out to be credentials during #229. The topic count is a review list, not a verdict.
- A future contributor adding `Security architecture certifications` to a role is now contradicting a recorded decision rather than filling a gap.
