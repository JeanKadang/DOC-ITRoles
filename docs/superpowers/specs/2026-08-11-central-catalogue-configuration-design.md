# Central Catalogue Configuration Design

**Issue:** [#184](https://github.com/JeanKadang/DOC-ITRoles/issues/184)  
**Status:** Approved for planning  
**Date:** 2026-08-11

## Goal

Make one machine-readable module authoritative for domain and chapter identity,
labels, icons, ordering, aliases, and chapter-lead references. The server,
viewer, validators, and generators must derive their catalogue structure from
that module instead of maintaining parallel maps.

This is a structural refactor. User-visible catalogue content and ordering must
remain unchanged, apart from making the canonical FinOps folder name lowercase.

## Chosen approach

Add a dependency-free `catalogueConfig.js` module that works in both Node and
the browser. It exposes immutable configuration plus small derivation and
validation functions. Loading it as a script before the viewer's inline script
keeps viewer startup synchronous and avoids adding a configuration fetch or a
build step.

The alternatives were rejected for this change:

- A JSON file fetched by the viewer would make initial rendering asynchronous
  and expand the regression surface.
- Generating a browser copy would create a synchronization step and retain the
  drift risk this issue is intended to remove.

## Configuration model

The module owns two ordered collections:

- Chapters: canonical ID, label, icon, description, display order, and the
  canonical chapter-lead role reference.
- Domains: canonical lowercase ID, label, icon, chapter ID, display order, and
  aliases used to recognize legacy identifiers.

The chapter-lead reference uses the current route identity
`<domain-id>/<role-slug>`. This is resolvable today and can be migrated to the
stable role IDs introduced by #180 without changing chapter membership.

Derived exports replace hand-maintained compatibility maps such as
`DOMAIN_LABELS`, `CHAPTERS`, and `ICONS`. `roleMeta.js` may re-export a derived
`DOMAIN_LABELS` object temporarily so existing consumers can migrate without a
large unrelated rewrite; the values still originate only in the configuration
module.

## FinOps migration and compatibility

Rename `Roles/FinOps` to `Roles/finops` with a Git-aware two-step case rename so
the change is represented correctly on Windows and case-sensitive filesystems.
The canonical domain ID and all repository links become `finops`.

`FinOps` remains a declared alias. Alias resolution is case-insensitive and
maps legacy domain identifiers to `finops`; aliases never appear as duplicate
catalogue entries. Existing hash routes are already normalized to lowercase,
and tests will explicitly protect that behavior. Direct repository paths are
updated to the canonical casing rather than supported as permanent duplicate
paths.

## Consumers and data flow

1. `server.js` enumerates role folders, resolves each folder through the
   configuration, and emits domains in configured display order with configured
   labels.
2. `roleMeta.js` and `validate-roles.js` use the same domain lookup when
   evaluating role metadata.
3. `index.html` reads the browser export and derives chapter navigation, domain
   icons, display order, and chapter-lead links from it.
4. Count checks and generated catalogue documents import the module instead of
   parsing configuration out of `index.html`.
5. A repository validator compares configured domains and chapters with the
   filesystem and documented chapter files before CI can pass.

No consumer may introduce a second authored domain-label, membership, icon, or
display-order map.

## Validation and failure behavior

Configuration validation reports actionable errors for:

- duplicate chapter IDs, domain IDs, or aliases;
- non-lowercase canonical domain IDs;
- a domain referencing an unknown chapter;
- duplicate or invalid display-order values within their scope;
- missing labels, icons, descriptions, or chapter-lead references (the
  cross-cutting Leadership chapter explicitly declares that it has no lead);
- configured domain folders that are absent, unconfigured role folders, or
  folder casing that differs from the canonical ID;
- chapter-lead references that do not resolve to a role; and
- configured chapters without their narrative document.

The validation command exits non-zero on any error and is included in the
existing validation workflow. The server fails clearly at startup if its
catalogue configuration is invalid rather than silently applying fallback
labels to drifted folders.

## Testing strategy

Implementation follows red-green-refactor cycles:

- Module tests cover ordering, derived maps, alias resolution, and invalid
  configuration cases using hand-authored fixtures.
- Filesystem integration tests cover missing/unconfigured folders, exact casing,
  chapter narratives, and chapter-lead resolution.
- Server tests prove API domain labels and order come from the shared module.
- Viewer logic and route tests prove canonical and legacy FinOps identifiers
  resolve to the same domain.
- Count and generator tests prove their output no longer depends on parsing
  maps from `index.html`.
- The full Node suite, role validation, count check, generated-document checks,
  Markdown lint, and the hosted browser matrix remain the completion gates.

## Documentation

Update the contributor guidance and chapter overview so adding a domain has one
documented configuration step, followed by creation of its canonical role
folder and role files. Document aliases as compatibility inputs, not additional
domain IDs.

## Out of scope

- Stable role IDs and relationship validation tracked by #180.
- Broad viewer modularisation tracked by #186.
- Content changes to role definitions or chapter narratives.
- A new build system, database, or runtime dependency.
