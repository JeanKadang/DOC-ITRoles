# Architecture Decision Records

Architecture Decision Records (ADRs) preserve consequential catalogue, governance, and implementation decisions with the files they affect. GitHub Issues own decisions still to be made; an accepted ADR records the outcome.

## Lifecycle

1. Open an issue labelled `decision-needed` when a durable choice is unresolved.
2. Copy [`template.md`](template.md) to the next four-digit filename and set its status to `Proposed`.
3. Review the options and consequences in the pull request.
4. Merge as `Accepted` and link the deciding issue/PR.
5. Never rewrite an accepted decision to reverse it. Add a new ADR, set the old record to `Superseded by ADR-NNNN`, and link both records.

Allowed statuses are `Proposed`, `Accepted`, `Deprecated`, and `Superseded by ADR-NNNN`.

## Index

| ADR | Status | Decision |
|---|---|---|
| [0001](0001-organise-domains-into-seven-capability-chapters.md) | Accepted | Organise domains into seven capability chapters |
| [0002](0002-separate-technical-product-and-people-leadership-tracks.md) | Accepted | Separate technical, product, and people-leadership tracks |
| [0003](0003-name-credentials-explicitly-rather-than-families-or-topics.md) | Accepted | Name credentials explicitly rather than families or topics |
