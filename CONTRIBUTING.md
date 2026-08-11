# Contributing

This catalogue influences role design, career conversations, and operating-model decisions. A structurally valid Markdown file is not enough: consequential claims need evidence, ownership, and an honest confidence level.

## Before changing the catalogue

1. Search [GitHub Issues](https://github.com/JeanKadang/DOC-ITRoles/issues) for the change or decision.
2. Create or update an issue before implementation. Issues are the backlog source of truth; do not add new backlog checklists to Markdown documents.
3. Identify whether the proposal changes portable catalogue content, an organisation-specific commitment, generated output, or a durable taxonomy decision.
4. For a durable decision, add or update a proposed [Architecture Decision Record](docs/adr/README.md) in the same pull request.

## Evidence standards

Prefer primary, authoritative sources. Link the exact page, standard, release, policy, or decision that supports a claim and record the date it was checked when the source can change.

| Content | Required evidence |
|---|---|
| Role responsibility or accountability | Named domain owner or approved operating-model source; distinguish a portable recommendation from local policy |
| Certification or credential | Follow the [Credential Registry](docs/CREDENTIAL_REGISTRY.md): issuer-controlled page, exact credential name, type, lifecycle status, verification date, and owner; do not present organisation programmes as individual credentials |
| Technology or standard | Official product, project, or standards-body source; record version/status when material |
| KPI target | Approved target source, frequency, and scope (`global`, `service-specific`, or `local`); never generate an authoritative-looking commitment |
| Reporting or career relationship | Existing catalogue role or explicitly labelled external destination; do not guess a relationship from similar names |
| Review provenance | Reviewer or accountable team, date, scope reviewed, and evidence/decision link where available |

If evidence is unavailable, label the content as proposed or unresolved and link the issue that owns the decision. An unresolved value is preferable to a fabricated one.

## What counts as substantive review

A substantive reviewer checks meaning, boundaries, relationships, and source currency—not only spelling, formatting, or template compliance. Record which sections or claims were reviewed. Mechanical bulk edits and generated rebuilds must not reset subject-matter review dates or imply approval by a domain owner.

Reviewers should explicitly check:

- responsibilities do not duplicate or contradict adjacent roles;
- organisation-specific policy is labelled instead of asserted as universal;
- credentials and standards still exist under the recorded name and status;
- KPI rows contain an approved target and cadence, or remain visibly unresolved;
- reporting, interaction, and career destinations resolve or are marked external;
- privacy-sensitive reviewer metadata uses durable team identifiers where appropriate.

## Generated content

Edit a generator's source data or script, not its generated Markdown. Regenerate the artefact and commit source and output together. The pull request must state the command used and must not hand-maintain counts that the repository derives from files.

## Adding a domain

1. Add one record to `DOMAIN_LIST` in `catalogueConfig.js`. Use a lowercase
   `id` and define its label, icon, chapter, order, and any legacy aliases.
2. Create the exact `Roles/<domain-id>/` directory and its role files.
3. Run `npm run validate`, `npm run check-counts`, and the affected generators.

Consumers must read domain labels, icons, chapter membership, and order from
`catalogueConfig.js`; do not duplicate those authored values elsewhere.

## Pull request checklist

- Link the issue with `Closes #<number>` when the acceptance criteria are complete.
- Explain the evidence and any organisation-specific assumptions.
- For a credential change, include the registry ID, authoritative issuer URL, verification date, and `npm run validate` output; use the canonical marker in every audited role recommendation.
- Update an ADR when the change creates or reverses a durable taxonomy decision.
- Run `npm test`, `npm run validate`, `npm run check-counts`, and any focused generator or verifier command affected by the change.
- Keep generated output, documentation links, and the changelog consistent with the implementation.

Security vulnerabilities and credentials must not be filed in a public issue; follow [SECURITY.md](SECURITY.md).
