# Credential Registry and Kubernetes Pilot Design

## Goal

Make certification recommendations trustworthy and maintainable by linking each audited role recommendation to a centrally governed credential record backed by an authoritative source.

Issue #178 will establish the registry and validation model, then prove it across the four Kubernetes roles before a catalogue-wide rollout.

## Scope

The pilot covers:

- `Roles/kubernetes/kubernetes_architect.md`
- `Roles/kubernetes/kubernetes_engineer.md`
- `Roles/kubernetes/kubernetes_product_owner.md`
- `Roles/kubernetes/kubernetes_senior_engineer.md`

It includes the credential registry, role-to-registry references, automated validation, tests, ownership documentation, and a rollout plan.

Learning resources that do not award a credential remain ordinary prose and are not added to the registry. Organisation-level programmes, partnerships, and provider designations are not presented as credentials held by an individual.

## Registry

`data/credentials.json` is the authoritative machine-readable registry. Each entry contains:

- `id`: stable, lowercase identifier used by role references;
- `name`: official credential name;
- `issuer`: official issuing organisation;
- `type`: credential classification, such as certification or certificate;
- `url`: authoritative issuer page;
- `status`: lifecycle state, initially `active`, `retired`, or `superseded`;
- `verified_on`: the date the official source was last checked;
- `owner`: repository owner responsible for review;
- `review_months`: review interval, defaulting to 12 months;
- `notes`: optional concise lifecycle or scope clarification.

The registry records only credentials confirmed from an issuer-controlled source. Marketing names, course titles, vague certification families, and programmes for organisations are excluded unless they can be represented accurately as a distinct credential.

Stable IDs are not renamed when display names change. A superseded entry remains available long enough to explain and validate existing references, with its replacement identified in `notes` until the schema needs a dedicated relationship field.

## Role References

Certification sections remain readable Markdown. A registry reference is attached to each audited credential using an HTML comment:

```markdown
- Certified Kubernetes Administrator (CKA) <!-- credential: cncf-cka -->
```

This keeps rendered role pages clean while giving validation a deterministic identifier. Each credential gets its own bullet and marker; combined or ambiguous bullets are split or rewritten.

The Kubernetes pilot will audit every item currently presented as a certification. For each item, the implementation will:

1. confirm the current official name, issuer, lifecycle, and URL from an authoritative provider source;
2. add a registry entry and stable marker when it is a valid individual credential;
3. replace or clarify a recommendation when the existing wording inaccurately describes a valid credential;
4. move genuine non-credential learning guidance out of the certification list; or
5. remove invented, unverifiable, retired-without-value, ambiguous, or organisation-only recommendations.

In particular, CNCF Certified Kubernetes Service Provider (KCSP) must not remain framed as an individual certification because it is an organisation-level programme.

## Validation

Credential validation will live in a focused module used by `validate-roles.js`, so `npm run validate` remains the single repository validation entry point. The module will inspect credential markers in Markdown and the registry itself, and expose testable functions without executing the full catalogue scan on import.

Validation errors will cover:

- malformed registry data;
- duplicate or invalid IDs;
- markers referencing unknown IDs;
- duplicate credential IDs within one role section;
- missing required metadata;
- invalid authoritative URLs;
- unsupported lifecycle values; and
- invalid verification dates or review intervals.

Staleness is reported as a warning when `verified_on` plus `review_months` is older than the current date. This makes review debt visible without causing an otherwise unchanged repository to fail on the anniversary date. Unknown references and structurally invalid records remain hard failures.

The validator does not make network requests during normal tests or CI. Source authority is established during the human audit and preserved as registry metadata; automated checks validate structure, references, and review age deterministically.

## Tests

Tests will demonstrate:

- a valid registry and known marker pass;
- an unknown marker fails;
- duplicate IDs and missing required fields fail;
- invalid URL, date, status, and review interval values fail;
- duplicate role references fail;
- stale entries warn without failing;
- all four Kubernetes roles reference only known registry entries; and
- the repository's existing role and count checks continue to pass.

Fixture dates will be injected or compared against a controlled reference date so staleness tests remain deterministic.

## Ownership and Review Policy

The repository documentation will identify who owns registry review, how a contributor proposes a credential, what counts as an authoritative source, and how lifecycle changes are handled. The initial review cadence is 12 months unless a credential warrants a shorter interval.

Credential changes should include the official provider page and verification date in the pull request evidence. A provider-controlled certification or credential page is preferred; third-party training providers, search snippets, and community summaries are not authoritative evidence.

## Rollout

The Kubernetes pilot is complete when all four role files have been audited and validation covers the registry and their references. The follow-up catalogue rollout should proceed in bounded technology or role-family batches:

1. inventory unique certification strings and group likely aliases;
2. prioritize common and high-risk recommendations;
3. verify each credential against an issuer source;
4. migrate role bullets to stable markers;
5. run validation and review removals or reclassifications; and
6. track remaining unaudited roles in GitHub rather than treating their legacy prose as verified.

The pilot must not imply that the other role files have already been audited. Documentation and validator output should clearly distinguish registry-backed references from legacy unmarked recommendations until the rollout is complete.

## Alternatives Considered

Visible credential IDs in role text were rejected because they add implementation noise to human-facing documents. Fully generating certification sections from structured data was also rejected for the pilot because it would make editorial contributions harder and expand the change beyond issue #178.

The chosen design keeps role content editable, adds stable machine linkage, and allows gradual adoption without a catalogue-wide migration in one pull request.

## Completion Evidence

The pull request for #178 should include:

- links to the authoritative sources used for the Kubernetes audit;
- a summary of corrected, removed, or reclassified recommendations;
- validator and test output;
- confirmation that all four pilot roles use known registry IDs; and
- a clearly scoped follow-up issue or issues for the remaining catalogue rollout.
