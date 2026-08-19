# ADR-0007: License code and catalogue content separately

- **Status:** Accepted
- **Date:** 2026-08-19
- **Issue/PR:** #272, delivered in PR #276

## Context

The repository is public and describes itself as a portable role-definition
library, but carried no `LICENSE` file, GitHub detected no license, and
`package.json` declared `UNLICENSED`. #272 named the resulting bind directly:
a potential adopter could read the catalogue but not confidently reuse,
modify, or redistribute it, while adding a license without an explicit
decision risked granting rights nobody had actually agreed to.

The repository holds two materially different kinds of content. `Roles/`,
`data/`, and `docs/` are the catalogue itself — role definitions, career
paths, credential evidence, governance documentation, the thing an adopting
organisation actually wants to reuse and adapt for their own roles. The
scripts, tests, workflows, and the server/viewer code exist to author,
validate, and present that content — reusable in their own right (another
project's tooling could borrow the validator or the viewer), but a different
kind of artifact serving a different kind of reuse.

`vendor/` holds third-party assets (Chart.js, ECharts, marked, DOMPurify)
already governed by their own upstream licenses, tracked in
`vendor/manifest.json` and `vendor/THIRD_PARTY_NOTICES.md` — outside this
decision's scope entirely.

## Decision

**Software is MIT-licensed. Catalogue content and documentation are
CC BY 4.0-licensed. Vendored material keeps its own upstream terms.**

- **MIT** covers source code, scripts, tests, workflows, and configuration —
  the executable and configuration files at the repository root, and
  everything under `.claude/`, `.github/`, `scripts/`, and `test/`. Code
  samples embedded in documentation are MIT too, since they are code, not
  catalogue prose.
- **CC BY 4.0** covers role definitions, catalogue data, and documentation —
  `Roles/`, `data/`, `docs/`, and Markdown documentation at the repository
  root. Reuse requires attribution to "Jean Kadang and DOC-ITRoles
  contributors," a link to the source repository and license, and a note of
  whether changes were made; attribution must not imply endorsement.
- **`vendor/`** is unaffected: it remains governed by each asset's own
  upstream license, unchanged by this decision.

The split follows the reuse each half is actually for: permissive terms so
the tooling can be borrowed and modified freely like any other MIT project,
attribution-required terms so a catalogue that gets forked or excerpted keeps
a visible link back to its source — the same distinction #272 asked the
maintainer to make explicit rather than leaving implicit or unstated.

## Consequences

- `LICENSE` states the split and points to `LICENSES/MIT.txt` and
  `LICENSES/CC-BY-4.0.txt` for the full texts; `package.json`'s `license`
  field and `README.md`'s reuse guidance were brought into agreement with it
  in the same change, closing the gap #272's exit criteria named.
- An adopter reusing only the tooling (the validator, the viewer, the
  scripts) can do so under ordinary permissive terms with no attribution
  chain to maintain. An adopter reusing the catalogue content must credit
  the source and note changes — the catalogue cannot be silently
  rebranded and redistributed as someone else's original work.
- The split has to be kept correct as the repository grows: a new top-level
  file or directory needs a license determination (code vs. content) before
  or as part of being added, not after. `LICENSE` is the place that
  determination is recorded.
- `vendor/` staying outside this decision means its own provenance tracking
  (`vendor/manifest.json`, `scripts/verify-vendor.js`) remains the
  authoritative source for third-party terms — this ADR does not supersede
  or duplicate that.