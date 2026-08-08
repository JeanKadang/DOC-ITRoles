# GitHub Workflow Skills Repository Design

**Date:** 2026-08-08  
**Bootstrap issue:** #216  
**Status:** Proposed for maintainer review

## Decision summary

Create a public repository named `DOC-GitHub-Practice-Skills` under the
`JeanKadang` account. It will become the canonical, versioned source for the
seven GitHub workflow skills currently installed locally for Claude and OpenAI
Codex.

The repository will keep one shared skill source and provide platform-specific
metadata, installation, and usage guidance for OpenAI Codex and Claude. A third
track will explain general Azure DevOps-to-GitHub migration concepts. It will not
contain company-specific ADO templates, names, fields, or policies.

DOC-ITRoles will retain a short integration guide that identifies the adopted
released version and records only repository-specific conventions.

## Goals

- Establish one canonical source for all seven skills.
- Prevent Claude and Codex installations from drifting independently.
- Publish understandable contributor and maintainer documentation.
- Validate package structure and platform metadata automatically.
- Provide safe, repeatable installation and update paths on Windows.
- Version changes with a changelog and GitHub releases.
- Preserve a clear extension point for future private ADO template work.

## Non-goals

- Automating Azure DevOps work items, boards, repositories, or pipelines.
- Publishing or adapting company-specific ADO templates in the public repository.
- Replacing the skills with a single large skill.
- Maintaining separate policy copies for Claude and OpenAI Codex.
- Automatically overwriting locally modified installed skills.
- Moving DOC-ITRoles project-specific policy into the shared repository.
- Publishing documentation through GitHub Wiki. The Wiki's separate repository,
  publication workflow, and indexing caveats add more maintenance than the
  initial release needs; reviewed Markdown under `docs/` remains authoritative.

## Repository identity

| Property | Decision |
|---|---|
| Owner | `JeanKadang` |
| Name | `DOC-GitHub-Practice-Skills` |
| Visibility | Public |
| Licence | MIT, suitable for reuse and adaptation |
| Default branch | `main` |
| Initial release | `v0.1.0`, promoted to `v1.0.0` after installation and reuse are proven outside the source checkout |

The repository name describes the capability rather than either AI platform.
This keeps Claude, OpenAI Codex, and ADO migration guidance as equal tracks over
the same workflow model.

## Canonical skill inventory

The initial release contains exactly these seven skills:

1. `github-issue-first`
2. `github-hygiene`
3. `github-pr-review`
4. `github-repo-review`
5. `github-security-response`
6. `github-projects`
7. `github-for-ado-users`

The existing `github-repo-review/review-prompt.md` remains a self-contained
companion artifact. Its deliberate policy repetition is preserved because it is
also intended for colleagues who do not run the skill package.

## Repository structure

```text
DOC-GitHub-Practice-Skills/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   │   ├── validate.yml
│   │   └── release.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── release.yml
├── contracts/
│   └── skill-inventory.json
├── docs/
│   ├── GUIDE.md
│   ├── WORKFLOW.md
│   ├── MAINTAINING.md
│   ├── openai-codex.md
│   ├── claude.md
│   └── azure-devops-migration.md
├── platforms/
│   ├── openai-codex/
│   │   └── README.md
│   ├── claude/
│   │   └── README.md
│   └── azure-devops/
│       └── README.md
├── scripts/
│   ├── Install-GitHubWorkflowSkills.ps1
│   └── Test-GitHubWorkflowSkills.ps1
├── skills/
│   ├── github-for-ado-users/
│   ├── github-hygiene/
│   ├── github-issue-first/
│   ├── github-pr-review/
│   ├── github-projects/
│   ├── github-repo-review/
│   └── github-security-response/
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```

Each directory under `skills/` contains the canonical `SKILL.md`. Where OpenAI
Codex metadata is required, the same skill directory also contains
`agents/openai.yaml`. Claude consumes the shared `SKILL.md` and ignores the
additional OpenAI metadata; no second policy copy is created.

The `platforms/` directories explain installation and activation differences.
They contain no forks of the skill text.

## Documentation model

The documentation uses two reading layers.

### Contributor layer

`docs/GUIDE.md` starts with the common path:

```text
finding or committed need
  -> issue with ownership, labels, milestone, and acceptance criteria
  -> issue-linked branch
  -> PR using Refs #N while incomplete
  -> criterion-by-criterion evidence review
  -> Closes #N only after the closure gate passes
  -> parent epic and milestone reconciliation
  -> release and cleanup
```

A trigger matrix shows which skill owns each stage. Security-sensitive findings
branch into private response. Projects are presented as an optional shared view
for multi-maintainer repositories, never as a replacement for issue metadata.

### Maintainer layer

The remainder of the guide and `docs/MAINTAINING.md` describe each skill's:

- intent and activation trigger;
- responsibilities and expected outputs;
- deliberate boundaries;
- hand-off to companion skills;
- shared workflow invariants; and
- known improvement opportunities.

Documentation identifies the repository release it describes and distinguishes
current behavior from proposed changes.

GitHub Wiki is deliberately not part of the initial documentation model. The
repository README and `docs/` tree provide one reviewable, testable, and
version-matched documentation surface. Wiki publication can be reconsidered only
if a concrete navigation or contributor need outweighs the additional sync path.

## Platform tracks

### OpenAI Codex

- Uses the shared `SKILL.md` plus `agents/openai.yaml` metadata.
- Installs to the user's Codex skills directory discovered from the environment,
  defaulting to `%USERPROFILE%\.codex\skills` only when no configured location
  is available.
- Documents restart or rediscovery requirements after installation.
- Validates the OpenAI metadata for every skill before packaging a release.

### Claude

- Uses the same canonical `SKILL.md` files.
- Installs to the configured Claude skills directory, defaulting to
  `%USERPROFILE%\.claude\skills` when appropriate.
- Does not maintain a Claude-specific policy fork.
- Documents any Claude-only discovery behavior in the platform guide.

### Azure DevOps migration

- Explains how ADO work items, epics, iterations, boards, policies, pipelines,
  test plans, and wikis map—or fail to map—to GitHub.
- Starts from the existing `github-for-ado-users` skill.
- Includes migration checklists and neutral example mappings only.
- Reserves a documented extension seam for a future private companion repository.
- Does not ingest workplace templates during the initial scope.

## Installation and update behavior

`Install-GitHubWorkflowSkills.ps1` accepts a target platform and source version.
The first release supports Windows PowerShell because that is the verified local
environment.

Required behavior:

- `-Target Codex`, `-Target Claude`, or both;
- dry-run mode showing planned copies;
- validation before any destination changes;
- refusal to overwrite locally modified skill files unless explicitly approved;
- backup or side-by-side staging before replacement;
- a version marker recording the installed release; and
- a post-install inventory and validation summary.

Installation copies released canonical packages. Installed directories are
deployment outputs, not independent editing locations. Changes flow back through
the public repository and a new release.

Cross-platform shell installers are deferred until there is a confirmed user or
CI environment for them; the documentation must state the Windows-first support
boundary clearly.

## Validation and consistency controls

`contracts/skill-inventory.json` records the seven expected skill names and
their required files. Automated checks verify:

- every inventory entry has a valid `SKILL.md` and required frontmatter;
- every OpenAI-enabled package has valid `agents/openai.yaml` metadata;
- referenced companion files such as `review-prompt.md` exist;
- no unregistered `github-*` skill silently enters a release;
- release packages for Claude and Codex originate from the same skill source;
- documentation mentions every inventory entry;
- Markdown passes linting; and
- install scripts pass static analysis and dry-run tests.

Semantic policies such as acceptance criteria being closure gates cannot be
reliably proven by string matching alone. `docs/MAINTAINING.md` therefore adds a
cross-skill review checklist for shared invariants. Automation checks structure;
human review checks meaning.

## Improvement roadmap

The initial documentation will record, but not automatically implement, these
prioritized improvements:

1. Add mandatory parent-epic reconciliation after child closure.
2. Provide audits for completed issues with unchecked criteria and stale epic
   checkboxes.
3. Distinguish thematic milestones from release milestones before closing them.
4. Resolve conflicting iteration-versus-milestone guidance.
5. Add PowerShell-native equivalents for Bash-oriented examples.
6. Verify whether a shared GitHub number identifies an issue or a pull request
   before attempting metadata reconciliation.
7. Add cross-skill consistency review whenever shared invariants change.
8. Record the GitHub CLI and API versions against which change-prone commands
   were verified.

Each improvement becomes a separate issue in the new repository after its
bootstrap release. The migration must preserve current behavior first; redesign
does not ride unnoticed inside the copy.

## Security and public/private boundary

The public repository may contain generic workflow policy, neutral examples,
installation code, and general ADO-to-GitHub mapping.

It must not contain:

- company or customer names;
- internal organization, project, repository, or account identifiers;
- proprietary work-item fields, templates, policies, or process names;
- credentials, endpoints, or screenshots from workplace systems; or
- examples copied from work material without explicit sanitisation and approval.

Future company-specific ADO reuse belongs in a private companion repository that
depends on a released public-core version.

## Release model

The new repository follows its own skills:

- issues precede changes;
- one issue-linked branch per unit of work;
- pull requests use `Refs #N` until all acceptance criteria have evidence;
- all validation checks must be green before approved merge;
- `CHANGELOG.md` records user-visible skill or packaging changes;
- an annotated tag is created only from updated `main`;
- GitHub generated notes accompany each release; and
- installed copies update from releases, not arbitrary branch state.

The initial `v0.1.0` release is a public preview of the packaging and installation
contract. `v1.0.0` requires successful installation and use from a clean checkout
outside the source repository.

## Migration sequence

1. Create the public repository with a README and MIT licence.
2. File its bootstrap issue and create an issue-linked branch.
3. Copy the seven current skill sources without policy redesign.
4. Add OpenAI metadata, platform guides, inventory, validation, and installation.
5. Add the layered guide and maintainer documentation.
6. Validate a staged Claude and Codex installation from a clean checkout.
7. Merge the bootstrap PR after acceptance review and publish `v0.1.0`.
8. Add `docs/GITHUB_WORKFLOW_SKILLS.md` to DOC-ITRoles, pinned to `v0.1.0`,
   containing only local conventions and canonical links.
9. Reconcile issue #216 with evidence from both repositories.
10. File separate improvement issues in the new repository.

Existing local installations remain untouched until the released installer has
passed staged validation. Migration is additive and recoverable.

## DOC-ITRoles integration document

`docs/GITHUB_WORKFLOW_SKILLS.md` will contain:

- the adopted skills repository and release version;
- the seven enabled skill names;
- DOC-ITRoles-specific labels, milestone model, merge approval, release, and
  acceptance-evidence conventions;
- the parent-epic reconciliation requirement;
- links to the canonical guide and installation instructions; and
- a statement that the shared skill repository—not this integration file—is the
  source for reusable workflow policy.

## Acceptance and verification

Completion requires evidence that:

- the public repository and initial release exist;
- all seven skills validate from the canonical checkout;
- staged Claude and Codex installations contain the same `SKILL.md` content;
- the guide covers all seven skills and all three tracks;
- public-content scanning finds no company-specific material;
- release notes and changelog identify the bootstrap contents;
- the DOC-ITRoles integration document points to the verified release; and
- issue #216 has every in-scope criterion checked before completed closure.
