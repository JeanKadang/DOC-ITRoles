# Credential Registry

## Purpose and audit boundary

[`data/credentials.json`](../data/credentials.json) is the authoritative, machine-readable catalogue of credential recommendations that have been audited against an issuer-controlled source. A role recommendation with a valid registry marker is registry-backed and verified as of its recorded `verified_on` date.

Legacy credential text without a marker is not yet audited. It may remain visible while the catalogue is migrated, but it must not be represented as registry-backed or current verified evidence. The current Kubernetes pilot is the first audited domain; remaining domains are tracked in [issue #210](https://github.com/JeanKadang/DOC-ITRoles/issues/210).

## Registry schema

The registry root is a JSON object with these fields:

| Field | Required value |
|---|---|
| `schema_version` | The supported schema version; currently `1`. |
| `audited_roles` | An array of unique repository-relative role paths such as `Roles/kubernetes/kubernetes_engineer.md`. These roles require complete credential markers. |
| `credentials` | An array of credential records. |

Each credential record contains:

| Field | Required value |
|---|---|
| `id` | Stable lowercase kebab-case identifier, for example `cncf-cka`. IDs are unique and are not renamed when the display name changes. |
| `name` | Exact official credential name. |
| `issuer` | Official issuing organisation. |
| `type` | `certification` or `certificate`. |
| `url` | HTTPS URL of an issuer-controlled authoritative page. |
| `status` | `active`, `retired`, or `superseded`. |
| `verified_on` | Real ISO date (`YYYY-MM-DD`) on which the authoritative page was checked. |
| `owner` | Non-empty durable owner identifier responsible for review. |
| `review_months` | Positive integer review interval. Use 12 months unless the credential warrants a shorter interval. |
| `notes` | Optional concise lifecycle or scope clarification. |

Use the marker directly after the official credential name in a certification bullet:

```markdown
- Certified Kubernetes Administrator (CKA) <!-- credential: cncf-cka -->
```

The marker syntax is exactly `<!-- credential: stable-id -->`: one space after `<!--`, one after the colon, lowercase kebab-case ID, and one space before `-->`. Each certification bullet in an audited role needs exactly one marker; a role cannot repeat the same ID. Markers that name an unknown ID, or comments that resemble a credential marker but do not match this syntax, are validation errors.

## Authoritative evidence and ownership

Use only issuer-controlled pages as credential evidence. Third-party course providers, search snippets, community summaries, and copied marketing text are not authoritative. `verified_on` is the day a contributor or reviewer checked that issuer page, not a course date, publication date, or future review date.

`catalogue-maintainers` owns registry freshness until a durable domain team is named in the record. The owner reviews source currency, official name, lifecycle status, and continued relevance before changing a recommendation or refreshing its verification date.

## Adding or changing a credential

Start with an issue before implementation. A credential pull request must include:

- the authoritative issuer URL;
- the exact official name, `type`, and lifecycle `status`;
- a stable registry ID and its role marker, where the role is audited;
- the date the issuer page was verified;
- the accountable owner and review interval; and
- validator output showing the registry and role references pass.

Keep the text shown to readers aligned with `name`, but preserve the existing ID if a provider changes branding. Do not recycle an ID for a different credential. Add or update the marker in the same change as the registry entry so validation can resolve it.

## Lifecycle and staleness

Do not delete a `retired` or `superseded` record while a role still references it. Retain it to preserve an auditable explanation of historical recommendations, use `notes` for a concise replacement or lifecycle clarification, and deliberately update role recommendations when a replacement is appropriate.

The validator starts a stale-warning period only after `verified_on + review_months`. A record due exactly on that date is not yet stale. Staleness is a warning, not a structural failure, and the validator makes no runtime network request in CI or normal validation; maintainers perform the source check during review.

## Courses and organisation programmes

Courses, training platforms, communities, and learning paths belong under **Learning Resources & Communities**, not as credentials in the registry. Do not represent an organisation-level programme, partnership, provider designation, or service status as an individual-held credential. For example, KCSP-like programmes are not individual certifications.

## Rollout policy

Migrate the remaining catalogue in bounded domain or role-family batches:

1. Inventory unique legacy credential strings and group likely aliases.
2. Select a bounded domain batch and audit each distinct recommendation against issuer evidence.
3. Add or update records, then migrate unambiguous role bullets to stable markers.
4. Move learning resources out of certification lists and remove or clarify organisation programmes, ambiguous claims, and unverifiable text.
5. Add completed roles to `audited_roles` only when every certification bullet is deliberately covered, then run validation.

Legacy prose stays unaudited until that work is complete. The durable tracker for unaudited domains and rollout batches is [issue #210](https://github.com/JeanKadang/DOC-ITRoles/issues/210); do not treat its open scope as verified merely because the text remains in a role file.

Run `node scripts/credential-inventory.js` before and after a batch. It reports the legacy entries that remain, grouped by domain and by alias, so rollout progress is measured rather than asserted. It reports only; it never edits a role file.

## Text that does not name a credential

Not every certification bullet names a credential a person can hold. Around 476 legacy entries name a group, a subject, or an alternative, and none can become a registry record. The rule, decided in [ADR-0003](adr/0003-name-credentials-explicitly-rather-than-families-or-topics.md), is that **a credential recommendation names one credential a person can hold, or it is not a credential recommendation**.

| Kind | Looks like | What to do |
|---|---|---|
| Family | `Cloud platform associate certifications`, `ITIL Service Management certifications` | Expand to the specific credentials the role actually expects, each registry-backed. If no set is determinable, name what the domain genuinely expects or drop the line — never retain the family as-is. |
| Topic | `Linux fundamentals`, `REST API Design fundamentals` | Audit before judging. Some are real credentials with the exam code omitted — `Microsoft Azure Fundamentals` is AZ-900. Register those; treat whatever remains a genuine subject as a family. |
| Vague | `TOGAF or other enterprise architecture certification`, `CISSP or equivalent` | Rewrite to the named credential. Do not preserve the hedge: a reader cannot act on "or equivalent" and a validator cannot verify it. Where several credentials genuinely qualify, name each one. |

Two contributors applying these rules to the same entry should produce the same result. Where an entry is genuinely ambiguous, resolve it in the domain batch with the reasoning visible in the pull request, rather than inventing a local convention.
