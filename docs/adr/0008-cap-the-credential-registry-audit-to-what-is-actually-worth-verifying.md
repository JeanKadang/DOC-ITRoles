# ADR-0008: Cap the credential registry audit to what is actually worth verifying

- **Status:** Accepted
- **Date:** 2026-08-15
- **Issue/PR:** #210, #229

## Context

The credential registry (#178, `docs/CREDENTIAL_REGISTRY.md`) records
credential recommendations audited against an issuer-controlled source:
exact name, type, lifecycle status, verification date, owner. #210 asked
whether that audit should roll out across the entire catalogue. It found
**2,151 legacy certification entries across 226 roles**, only 4 of which
(the Kubernetes domain, piloted in #178) had ever been audited.

#229 attempted the cross-cutting piece of that rollout — auditing the
credentials shared across three or more domains, so every domain batch would
resolve the same shared credential to the same registry ID instead of each
inventing its own answer. It surfaced how much the audit actually costs per
entry: some credentials resolved cleanly, but several required chasing
issuer pages through bot-blocking (`pmi.org`, `scrum.org`, `sabsa.org` all
return 403 to a plain fetch but load fine in a browser), distinguishing a
genuine retirement from an absent one ("no page says this is retired" is not
the same claim as "the issuer states this is retired"), and in a few cases
concluded that no public page names the credential's current status at all
(ServiceNow's certifications, gated behind an authenticated learner portal).
Two credentials stayed genuinely unresolved after real effort, not from
under-investment.

Auditing all 2,151 entries at that rate is disproportionate to what the
catalogue gains from it: most legacy certification bullets are not wrong,
they are simply unverified, and the roles they sit in are themselves marked
`Review Status: mechanical` (ADR-0004) — nobody has substantively reviewed
the role's content as a whole yet, so a fully-audited credential section on
an otherwise-unreviewed role would be a false signal of rigor.

## Decision

**The registry stays authoritative only for what has actually been audited.
Legacy credential text is not treated as verified, and there is no scheduled
project to audit the rest of the catalogue.**

- A role recommendation carries a registry marker (`<!-- credential: id -->`)
  only once it has been checked against an issuer-controlled source and
  added to `audited_roles`. Today that is the 4 Kubernetes roles from the
  #178 pilot.
- Legacy certification text without a marker is not audited. It may remain
  visible in a role file, but it must never be represented as registry-backed
  or current verified evidence — this was already `CREDENTIAL_REGISTRY.md`'s
  rule; this ADR is what makes the decision not to fix that gap catalogue-wide
  durable rather than an open-ended backlog item.
- Migration happens opportunistically: when a role is substantively reviewed
  (its `Review Status` moves off `mechanical`, per ADR-0004) or otherwise
  edited, its credential section migrates then. There is no exhaustive
  catalogue-wide backfill scheduled, and none is planned.
- Where an issuer's own page genuinely does not state a credential's status
  (the ServiceNow case), that is recorded as unresolved rather than inferred
  — a blocked or ambiguous fetch is not evidence of retirement, and absence
  of a status is not itself a status.

## Consequences

- The registry's 53 records stay small and trustworthy rather than growing
  fast and shallow. "Registry-backed" keeps meaning something specific:
  checked against an issuer page on a recorded date, not "present in the
  catalogue."
- 223 of 226 role files carry unaudited legacy credential text indefinitely,
  unless and until something else (a substantive review, an unrelated edit)
  brings them into scope. A reader of an unaudited role has no in-file signal
  that its certifications haven't been checked beyond the absence of a
  marker — `docs/CREDENTIAL_REGISTRY.md` states the rule, but nothing in the
  role file itself flags the gap.
- Ties the credential-audit and content-review efforts together by design:
  a role's credentials become trustworthy on the same occasion its content
  does, rather than as two independently scheduled programmes competing for
  the same effort.
- A future maintainer proposing "audit everything" is now proposing to
  reverse a considered decision, not fill an overlooked gap — they should
  read #210 and #229 for what the full-audit cost actually looked like in
  practice before re-opening it.
