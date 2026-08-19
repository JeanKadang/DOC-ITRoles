# Adopting this catalogue for your own organisation

This catalogue describes one specific organisation: 226 roles across 34
domains and 7 chapters, with a full leadership ladder up to a CEO and a
7-person Chapter Lead layer. It is licensed for reuse ([`LICENSE`](../LICENSE),
[ADR-0007](adr/0007-license-code-and-catalogue-content-separately.md)), but
"portable" does not mean "the shape every organisation should copy exactly."
It means the opposite: this is a menu to trim from, not a template to become
identical to.

## The posture: fork and trim, don't become

Nobody adopting this catalogue is actually shaped like it. The org chart
here — a full C-suite, an SVP of Technology, seven Chapter Leads, a
Technical/Product Area Lead pair, three architecture rungs above Engineer —
exists because it's comprehensive enough to be a reference for organisations
at very different scales, not because every reader needs all of it.

Adopt by forking the repository (or copying the parts you want into your own
structure) and deleting or merging what doesn't apply, rather than trying to
grow into the full shape or leaving unused layers in place "in case." An
adopted catalogue with 40 roles that all mean something is worth more than
one with 226 roles where most are aspirational.

## A rough sizing heuristic

These are starting points, not thresholds anyone measured — judge them
against your own organisation's actual complexity, not headcount alone.

**Small (a double-digit to low-hundreds IT organisation).** Collapse the
leadership ladder hard. One or two people plausibly hold everything from
Architect upward — you likely don't need Lead Architect, Principal Architect,
Chapter Lead, TAL, and PAL as five separate roles when one person does all
five jobs. Pick a handful of domains that match what your organisation
actually runs (cloud platform, security, one or two application platforms)
and ignore the rest entirely rather than keeping empty domain folders.

**Mid-sized (low hundreds to low thousands).** The Engineer → Senior
Engineer → Architect → Product Owner rungs per domain start earning their
keep — you likely have enough people in, say, Kubernetes or Security to
actually staff each level distinctly. The Chapter Lead / TAL / PAL layer is
still probably premature unless you have enough domains that someone
genuinely needs to coordinate across a cluster of them.

**Large (thousands, multiple domains each with real depth).** This is the
scale the catalogue's full shape was written for. Even here, don't assume
you need all 34 domains — keep the ones with real headcount and real
technical depth behind them, and drop the rest.

Whatever you land on, the [chapters](CHAPTERS_OVERVIEW.md) and
[skills progression](SKILLS_PROGRESSION.md) structure still applies within
the domains you keep — trimming the org chart's height doesn't require
rewriting how a role file itself is structured.

## Keeping local IDs traceable against upstream

If you fork and then rename, restructure, or reword roles for your own
organisation, keep the original `Role ID` field
([ADR-0005](adr/0005-identify-roles-by-a-stable-id-rather-than-by-title.md))
even after the title changes. The ID is frozen on assignment and deliberately
never re-derived from the title — that's exactly what makes it useful for
your fork too: you can diff your `Role ID`s against a fresh checkout of this
repository to see which roles upstream added, removed, or substantively
changed, independent of any renaming you've done locally. Renaming a role's
title and dropping its ID at the same time loses that thread permanently.

If you add roles that don't exist upstream, give them new IDs following the
same lowercase kebab-case format so nothing downstream (your own tooling, if
you build any against this shape) has to special-case where an ID came from.

## Attribution

Catalogue content is CC BY 4.0
([`LICENSE`](../LICENSE)). A published fork or adaptation needs attribution —
credit "Jean Kadang and DOC-ITRoles contributors," link back to this
repository, and note that changes were made. The exact wording is in
[`README.md`](../README.md#licence).
