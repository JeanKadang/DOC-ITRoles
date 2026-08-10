# GitHub workflow skills

DOC-ITRoles adopts version
[`v0.1.0`](https://github.com/JeanKadang/DOC-GitHub-Practice-Skills/releases/tag/v0.1.0)
of the public
[`DOC-GitHub-Practice-Skills`](https://github.com/JeanKadang/DOC-GitHub-Practice-Skills)
repository. Reusable policy is maintained and released there; this document
records only the conventions specific to DOC-ITRoles.

## Adopted skills

The release contains eight complementary skills:

- `github-repo-bootstrap` creates a repository through an issue-tracked,
  verified bootstrap sequence.
- `github-issue-first` turns actionable findings into owned, scoped issues
  before implementation.
- `github-hygiene` governs acceptance gates, merges, milestones, releases, and
  cleanup.
- `github-pr-review` provides evidence-based pull-request review.
- `github-repo-review` audits a repository and converts accepted findings into
  a traceable backlog.
- `github-projects` adds a shared Projects board only when collaboration needs
  one.
- `github-security-response` keeps sensitive findings out of public issues and
  coordinates safe remediation.
- `github-for-ado-users` maps Azure DevOps concepts to GitHub without pretending
  the two products have identical work-tracking models.

Canonical instructions are in the
[workflow guide](https://github.com/JeanKadang/DOC-GitHub-Practice-Skills/blob/v0.1.0/docs/GUIDE.md).
Installation is handled by the
[safe PowerShell installer](https://github.com/JeanKadang/DOC-GitHub-Practice-Skills/blob/v0.1.0/scripts/install-skills.ps1),
with separate guidance for
[OpenAI Codex](https://github.com/JeanKadang/DOC-GitHub-Practice-Skills/blob/v0.1.0/docs/openai-codex.md),
[Claude](https://github.com/JeanKadang/DOC-GitHub-Practice-Skills/blob/v0.1.0/docs/claude.md),
and
[Azure DevOps migration](https://github.com/JeanKadang/DOC-GitHub-Practice-Skills/blob/v0.1.0/docs/azure-devops-migration.md).
Installed copies are deployment outputs; policy changes originate in the
canonical repository and arrive through a reviewed release.

## DOC-ITRoles conventions

### Issues and milestones

- File actionable work before changing the repository. Assign it, add exactly
  one priority label (`P0` through `P3`), add relevant category labels, and
  attach it to an existing thematic milestone.
- The active milestone model separates foundation work in **Catalogue Trust &
  Adoption** from later product discovery in **Adoption & Discovery**. GitHub
  Issues remain the source of truth; review documents are traceability indexes,
  not parallel backlogs.
- Create work branches with `gh issue develop` so GitHub records the issue
  relationship. Use one focused branch and pull request per issue or bounded
  sub-issue.
- Large work uses native sub-issues plus a readable checklist in the parent.
  After each child merges, update both the native relationship and parent
  checklist. Reconcile parent epic #193 whenever a listed child changes state.

### Acceptance and merge gates

- Acceptance criteria are evidence gates. Evaluate every criterion against a
  diff, test, hosted check, document, or reproducible result before checking it.
  Green CI alone does not prove criteria it does not exercise.
- Start pull requests with `Refs #N`. A connected development branch may still
  close its issue when merged, so immediately audit the issue state and body
  after every merge and reopen it if any in-scope criterion remains unchecked,
  unmet, or unevaluated.
- Use `Closes #N` only after every in-scope criterion is evidenced and checked.
  Scope removal or deferral needs a recorded decision and linked follow-up; it
  must not be presented as delivered.
- DOC-ITRoles retains merge commits. Every required check must be green, and
  merging requires explicit maintainer approval. Release approval is a separate
  explicit gate.

### Validation and releases

- Run the relevant focused checks plus `npm test`, `npm run validate`, Markdown
  lint for changed Markdown, and `git diff --check` before requesting review.
- Hosted browser CI is authoritative when a local browser cannot be simulated
  reliably. Record the hosted run as evidence instead of repeatedly retrying a
  failing local browser environment.
- Release from updated `main` through a dedicated release branch and pull
  request. Update the version and `CHANGELOG.md`, wait for all checks, obtain
  merge approval, then tag the exact merged commit only after explicit release
  approval. Verify the published release before closing its milestone.
- Apply release-note category labels to pull requests, not only their issues.

### Security boundary

Suspected credentials, vulnerabilities, or exploitable details do not belong in
a public issue, branch, commit, or pull request. Stop public handling and use the
repository's private vulnerability-reporting path and `github-security-response`.
Public tracking begins only when coordinated disclosure makes it safe.

## Updating the adoption

When adopting a later skills release, review its changelog and migration notes,
test staged Codex and Claude installations, update the pinned version and links
in this document, and ship that change through the ordinary DOC-ITRoles issue
and pull-request workflow.
