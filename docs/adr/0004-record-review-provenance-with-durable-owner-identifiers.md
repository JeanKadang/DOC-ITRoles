# ADR-0004: Record review provenance with durable owner identifiers

- **Status:** Accepted
- **Date:** 2026-08-14
- **Issue/PR:** #179

## Context

Every role carried a syntactically valid `Last Reviewed` month, and **206 of 226 shared `2026-03`**. One month across 91% of the catalogue is a bulk stamp, not 206 reviews.

That made the field actively misleading. It recorded when a file was last touched — which git already knows — while implying a review that had not happened. Exactly **one** role of 226 named an owner or reviewer anywhere in its body, and the metadata table had no field for it.

The gap matters more now than when it was filed. Issues #230 to #245 will rewrite every role's certification section, and #227 already rewrote 105 role files mechanically. Under any rule where touching a file refreshes its review date, the credential rollout would leave all 226 roles looking freshly reviewed by an owner who never read them.

`credentialRegistry.js` already solves the same problem for credentials, with `verified_on`, a durable `owner`, a per-record `review_months`, and a staleness warning that does not fail CI.

## Decision

**Two fields, and a rule about who may set them.**

### `Content Owner` holds a durable role identifier, never a person

The value is `catalogue-maintainers` in this repository. An organisation adopting the catalogue maps it to the accountable chapter lead for each domain.

Identifiers rather than names, for two reasons: the catalogue is meant to be shared and copied, so it should not carry personal data; and an identifier survives someone changing jobs, where a name turns every departure into a catalogue-wide edit.

### `Review Status` says what the date means

| Status | Meaning |
|---|---|
| `reviewed` | An owner read the content and stands behind it as of `Last Reviewed`. |
| `mechanical` | The file was edited, but nobody reviewed the content. |
| `unreviewed` | New or migrated content with no review yet. |

### A bulk pass may not claim a review

A mechanical rewrite leaves `Last Reviewed` untouched and sets `Review Status` to `mechanical`. Only a human reading the content may set `reviewed`. Tooling can observe that a file changed; it cannot observe that anyone read it.

### The existing dates are kept, and labelled

The 206 stamped dates are not deleted. They truthfully record that the file was touched and only untruthfully imply review, so the honest fix is the label, not the deletion. Every role starts at `mechanical` and is promoted as it is genuinely reviewed.

The validator raises a **warning**, not an error, for any status other than `reviewed` — the gap stays countable without failing CI, matching how the KPI target gap (#140) and credential staleness already behave.

## Consequences

- Provenance is now visible: 226 roles report `mechanical`, so the true review debt is countable from day one instead of hidden behind a populated date. The catalogue looks worse, accurately.
- The credential rollout in #230 to #245 can rewrite every role without laundering review status.
- Adopting organisations get a mapping point — one identifier per domain to reassign — rather than having to strip personal names.
- Promoting a role to `reviewed` is deliberate manual work. That is the cost of the field meaning anything.
- A future contributor who refreshes `Last Reviewed` during a formatting pass is now contradicting a recorded decision rather than following an unwritten habit.
- `Review Status` is not a cadence. Per-role review intervals, and warning when a review falls due, remain open — the credential registry's `review_months` is the model when that is picked up.
