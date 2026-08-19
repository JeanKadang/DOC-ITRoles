# ADR-0006: Annotate role relationships with stable targets

- **Status:** Proposed
- **Date:** 2026-08-19
- **Issue/PR:** #268 (parent: #180)

## Context

ADR-0005 gave every catalogue role a stable `Role ID`, but relationship-bearing
fields still contain titles and prose. A title alone cannot distinguish a
catalogue role from an external party, and text such as "A or B" cannot express
whether the destinations are alternatives or simultaneous relationships.

The reporting-line inventory run for this decision found 227 roles: 211
`Reports To` values resolve to a catalogue title, one deliberately names an
external destination, 14 express a genuine choice, and none currently drift.
That clean result still depends on title matching and heuristics. The same
ambiguity appears in `Direct Reports`, career paths, and interaction tables,
where external parties such as boards, regulators, vendors, and People
Operations are legitimate.

The representation must keep the Markdown useful when read as source or
rendered without the viewer. It must also support gradual migration and give
parsers enough information to stop guessing from punctuation or title
similarity.

## Decision

Relationship targets remain human-readable labels and gain adjacent HTML
comment annotations. Markdown renderers hide the annotations, following the
existing credential-reference convention.

### Target syntax

A catalogue target uses its frozen role ID:

```markdown
Cloud Platform Architect <!-- role: cloud-platform-architect -->
```

An external role or party is marked explicitly and has no catalogue ID:

```markdown
Board of Directors <!-- external-role -->
```

The visible label is presentation text. For a catalogue target, the `role`
annotation is authoritative. A role rename therefore does not break the
relationship; consumers may display the catalogue's current title and report a
stale label separately.

### Relationship expressions

Each top-level annotated target is a simultaneous relationship. Existing
punctuation, list items, table rows, and `<br>` elements may separate targets
for readability, but punctuation does not determine their meaning.

A genuine choice is enclosed by an explicit `one-of` pair. It contains two or
more individually annotated targets:

```markdown
<!-- one-of -->Technical Area Lead <!-- role: technical-area-lead --> or Product Area Lead <!-- role: product-area-lead --><!-- /one-of -->
```

The words and punctuation inside a `one-of` expression remain presentation
text. The wrapper, not the word `or`, gives the expression its meaning. Nested
`one-of` expressions are not supported.

`None` remains the empty-relationship sentinel for fields such as `Direct
Reports`. It is valid only when it is the complete value and carries no
annotation.

### Parsed model

Consumers normalize annotations into these data shapes:

```json
{
  "kind": "catalogue",
  "roleId": "cloud-platform-architect",
  "label": "Cloud Platform Architect"
}
```

```json
{
  "kind": "external",
  "label": "Board of Directors"
}
```

```json
{
  "kind": "one-of",
  "options": [
    {
      "kind": "catalogue",
      "roleId": "technical-area-lead",
      "label": "Technical Area Lead"
    },
    {
      "kind": "catalogue",
      "roleId": "product-area-lead",
      "label": "Product Area Lead"
    }
  ]
}
```

A relationship-bearing field, list, or table cell yields an ordered array of
top-level catalogue targets, external targets, and `one-of` expressions. An
empty field represented by `None` yields an empty array. Qualifying prose is
preserved for display but is not part of target identity.

### Examples by location

`Reports To` may contain a catalogue target, an external target, or one
`one-of` expression:

```markdown
| **Reports To** | Cloud Platform Architect <!-- role: cloud-platform-architect --> |
| **Reports To** | Board of Directors <!-- external-role --> |
| **Reports To** | <!-- one-of -->DevOps Senior Engineer <!-- role: devops-senior-engineer --> or DevOps Architect <!-- role: devops-architect --><!-- /one-of --> |
```

`Direct Reports` may contain several simultaneous targets and an alternative
group. Each target is annotated independently:

```markdown
| **Direct Reports** | <!-- one-of -->CTO <!-- role: chief-technology-officer -->, CIO <!-- role: chief-information-officer -->, or SVP of Technology <!-- role: svp-technology --><!-- /one-of -->; CFO <!-- role: chief-financial-officer -->; CISO <!-- role: chief-information-security-officer --> |
```

Career-path bullets annotate the destination named by each item:

```markdown
- Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer -->
- VP of Engineering <!-- external-role -->
```

The `Role` cell in an interaction table follows the same rules:

```markdown
| Kubernetes Architect <!-- role: kubernetes-architect --> | Platform standards and escalation | Governed By |
| Regulators <!-- external-role --> | Formal notifications and assurance | Provides To |
```

### Invalid states

The shared parser and validator introduced by #270 must reject:

- a malformed or unknown catalogue role ID;
- a target with both `role` and `external-role` annotations;
- an annotation without a visible label, or a label with more than one target
  annotation;
- an unclosed or nested `one-of` expression;
- a `one-of` expression with fewer than two options or with an unannotated
  option;
- `None` combined with any target or qualifier; and
- a catalogue role that refers to itself where that relationship type forbids
  self-reference.

Title-label drift does not invalidate a catalogue relationship because the ID
is authoritative. Validation may report the stale display label and migration
tooling may refresh it.

### Legacy compatibility and migration

Until #269 migrates the catalogue, unannotated relationship text remains
readable and the existing viewer continues to display it. A new parser records
such text as `legacy`; it must not guess that the text is a catalogue target,
an external party, or an alternative.

Migration is idempotent and may proceed in reviewable batches. A migrated unit
contains only annotated targets, explicit `one-of` expressions, or `None`.
Mixed annotated and legacy targets remain compatibility input during the
migration but are not considered fully verified. After #269 completes, #270
makes remaining legacy targets validation errors and routes relationship views
through the normalized model.

## Consequences

- Role Markdown remains readable in GitHub, text editors, and rendered exports.
- Stable IDs make catalogue relationships survive title changes and domain
  moves.
- External destinations and genuine alternatives become deliberate data rather
  than heuristic exceptions.
- One representation can be used in reporting metadata, career lists, and
  interaction tables.
- Source files gain hidden annotations that contributors must preserve when
  editing labels.
- The representation does not encode conditional, weighted, or time-bounded
  relationships. Qualifiers remain prose unless a future evidenced need
  justifies another decision.
- This ADR defines the model only. #269 owns migration tooling and catalogue
  backfill; #270 owns parser enforcement, graph consumption, and rename or
  deletion tests.
