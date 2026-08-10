# GitHub Practice Skills Repository Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create and release the public `JeanKadang/DOC-GitHub-Practice-Skills` repository as the canonical home of eight GitHub workflow skills, then pin DOC-ITRoles to its verified `v0.1.0` release.

**Architecture:** Eight canonical skill directories feed both OpenAI Codex and Claude installations; platform directories contain adapter documentation only. A manifest-driven Node validator checks package structure and metadata, while a PowerShell installer stages and verifies copies without silently overwriting local changes. The new `github-repo-bootstrap` skill governs creation of its own repository, and DOC-ITRoles retains only a version-pinned integration guide.

**Tech Stack:** GitHub CLI 2.97.0, Git 2.55.0, Node.js 20/22 in CI, Node.js built-in test runner, `yaml`, `markdownlint-cli2`, PowerShell 7.6, GitHub Actions, Markdown, YAML, JSON.

## Global Constraints

- Repository: public `JeanKadang/DOC-GitHub-Practice-Skills`, MIT licence, `main` default branch.
- Initial release: `v0.1.0`; do not claim `v1.0.0` until installation is proven outside the source checkout.
- Canonical inventory: the seven existing `github-*` skills plus `github-repo-bootstrap`, exactly eight packages.
- One canonical `SKILL.md` per skill; Claude and OpenAI Codex never carry separate policy copies.
- OpenAI metadata lives at `skills/<name>/agents/openai.yaml`; Claude ignores that additional file.
- Documentation lives in the repository; GitHub Wiki stays disabled.
- The ADO track contains general migration guidance only. No workplace names, URLs, fields, screenshots, templates, or policies may enter the public repository.
- Windows PowerShell is the verified installer platform for `v0.1.0`; other installers remain out of scope.
- Existing installed skills remain untouched until staged installation tests pass.
- Installed copies are deployment outputs; changes originate in the public repository and ship through releases.
- Issue #216 remains open until both repositories satisfy every criterion with evidence.
- Merge and release actions require explicit maintainer approval and every applicable CI check green.
- Preserve `.claude/settings.local.json` in DOC-ITRoles; never stage or modify it.

## File Map

### DOC-ITRoles

- Existing: `docs/superpowers/specs/2026-08-08-github-workflow-skills-repository-design.md`
- Create: `docs/superpowers/plans/2026-08-08-github-practice-skills-repository.md`
- Create after release: `docs/GITHUB_WORKFLOW_SKILLS.md`
- Modify after release: `CHANGELOG.md`

### Temporary Bootstrap Staging

- Create: `.superpowers/sdd/doc-github-practice-skills-bootstrap/skills/github-repo-bootstrap/SKILL.md`
- Create: `.superpowers/sdd/doc-github-practice-skills-bootstrap/skills/github-repo-bootstrap/agents/openai.yaml`
- Delete after the canonical copy is verified in the new repository.

### DOC-GitHub-Practice-Skills

- Create: `.github/ISSUE_TEMPLATE/{bug.yml,improvement.yml,config.yml}`
- Create: `.github/{PULL_REQUEST_TEMPLATE.md,dependabot.yml,release.yml}`
- Create: `.github/workflows/{validate.yml,release.yml}`
- Create: `contracts/skill-inventory.json`
- Create: `docs/{GUIDE.md,WORKFLOW.md,MAINTAINING.md,openai-codex.md,claude.md,azure-devops-migration.md}`
- Create: `platforms/{openai-codex,claude,azure-devops}/README.md`
- Create: `scripts/{validate-skills.mjs,install-skills.ps1}`
- Create: `tests/{validate-skills.test.mjs,install-skills.test.mjs}`
- Create: `skills/github-repo-bootstrap/{SKILL.md,agents/openai.yaml}`
- Copy: seven existing skill directories from `C:\Users\Jean\.codex\skills`
- Create: `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `package.json`, `package-lock.json`
- Modify generated: `README.md`, `LICENSE`

---

### Task 1: Draft and Validate `github-repo-bootstrap`

**Files:**

- Create: `.superpowers/sdd/doc-github-practice-skills-bootstrap/skills/github-repo-bootstrap/SKILL.md`
- Create: `.superpowers/sdd/doc-github-practice-skills-bootstrap/skills/github-repo-bootstrap/agents/openai.yaml`

**Interfaces:**

- Consumes: the approved design's “New-repository bootstrap skill” section.
- Produces: a complete draft package accepted by the local skill validator, committed in a disposable local staging repository, and ready to govern Task 2.

- [ ] **Step 1: Read both required skill-authoring instructions**

```powershell
Get-Content C:\Users\Jean\.codex\skills\.system\skill-creator\SKILL.md -Raw
Get-Content C:\Users\Jean\.codex\plugins\cache\claude-plugins-official\superpowers\6.2.0\skills\writing-skills\SKILL.md -Raw
```

Expected: both files are read completely before drafting.

- [ ] **Step 2: Write the bootstrap skill contract**

Use this frontmatter and introduction:

```markdown
---
name: github-repo-bootstrap
description: Use before creating a GitHub repository or completing the initial setup of a newly created repository. Governs public-content preflight, the minimum-shell issue-first exception, bootstrap issue and branch creation, conditional community files, repository and security settings, CI-aware rulesets, initial release readiness, and post-creation verification.
---

# GitHub repository bootstrap

Create the smallest safe repository shell, cross the issue-first boundary
immediately, and prove the resulting GitHub settings match the approved design.
Do not treat repository creation as permission to publish unreviewed local files.
```

Implement these sections in order:

1. Required decisions before external state.
2. Public-content and history preflight.
3. The minimum-shell exception.
4. Bootstrap issue and linked branch.
5. Conditional scaffolding matrix.
6. Repository and Actions settings.
7. Security settings.
8. CI first, ruleset second.
9. Initial pull request and release.
10. Post-bootstrap API audit.
11. Handoffs to companion skills.
12. Common mistakes.

The minimum-shell exception allows only README, licence, default branch, and repository metadata before the first issue. Require the first issue and issue-linked branch immediately afterward. Explicitly forbid Wiki enablement, workplace content, an unmaintained Projects board, CODEOWNERS for a solo maintainer, and rules requiring self-approval.

- [ ] **Step 3: Add OpenAI metadata**

```yaml
interface:
  display_name: "GitHub Repository Bootstrap"
  short_description: "Create and verify a new GitHub repository safely"
  default_prompt: "Use $github-repo-bootstrap to create or finish bootstrapping this GitHub repository by the approved workflow."
```

- [ ] **Step 4: Validate the draft package**

Run `quick_validate.py` from the installed `skill-creator` against the staged skill directory. If Python is absent from `PATH`, use the runtime returned by `codex_app__load_workspace_dependencies`.

Expected: zero frontmatter, naming, or metadata errors.

- [ ] **Step 5: Review all bootstrap gates**

Create a criterion table covering the 12 sections, public/private boundary, conditional scaffolding, plan-gated rulesets, solo-maintainer behavior, release handoff, and actual-settings verification. Every row must be `Met` before Task 2.

Initialize a disposable Git repository at `.superpowers/sdd/doc-github-practice-skills-bootstrap`, commit the validated draft as `docs: draft repository bootstrap skill`, and use that commit for the Task 1 review package. This commit exists only to make the pre-creation artifact reviewable; it must never be merged into DOC-ITRoles or pushed as an independent repository. Delete the disposable repository after Task 3 verifies the canonical copy.

---

### Task 2: Create the Minimum Public Shell

**Files:**

- Create remotely: `JeanKadang/DOC-GitHub-Practice-Skills`
- Clone to: `C:\Claude\Projects\DOC-GitHub-Practice-Skills`
- Generated: `README.md`, `LICENSE`
- Create through GitHub: labels, milestone `v0.1.0`, bootstrap issue, linked branch.

**Interfaces:**

- Consumes: the validated Task 1 bootstrap skill.
- Produces: a minimal public repository and linked `bootstrap/1-initial-release` branch.

- [ ] **Step 1: Verify authentication and name availability**

```powershell
gh auth status
gh repo view JeanKadang/DOC-GitHub-Practice-Skills
```

Expected: authentication succeeds and the repository is not found. Stop and inspect if it already exists.

- [ ] **Step 2: Scan the staged public content**

```powershell
rg -n -i "dev\.azure\.com|visualstudio\.com|password\s*[:=]|client[_-]?secret|api[_-]?key|BEGIN (RSA|OPENSSH|EC) PRIVATE KEY" `
  .superpowers/sdd/doc-github-practice-skills-bootstrap
```

Expected: no matches. Confirm DOC-ITRoles history and `.claude/settings.local.json` will not be copied.

- [ ] **Step 3: Create and clone only the minimum shell**

From `C:\Claude\Projects` run:

```powershell
gh repo create JeanKadang/DOC-GitHub-Practice-Skills `
  --public --add-readme --license mit `
  --description "Versioned GitHub workflow skills for OpenAI Codex, Claude, and ADO-to-GitHub migration" `
  --clone
```

Expected: public repository with README, MIT licence, and `main`; no DOC-ITRoles files or history.

- [ ] **Step 4: Configure minimum repository behavior**

```powershell
gh repo edit JeanKadang/DOC-GitHub-Practice-Skills `
  --enable-issues=true --enable-projects=false --enable-wiki=false --enable-discussions=false `
  --delete-branch-on-merge --enable-merge-commit `
  --enable-squash-merge=false --enable-rebase-merge=false `
  --add-topic github --add-topic github-actions --add-topic codex `
  --add-topic claude --add-topic skills --add-topic azure-devops

gh api -X PUT repos/JeanKadang/DOC-GitHub-Practice-Skills/actions/permissions/workflow `
  -f default_workflow_permissions=read -F can_approve_pull_request_reviews=false
```

Expected: issues on; Projects, Wiki, Discussions off; merge commits only; branches auto-delete; Actions token read-only.

- [ ] **Step 5: Create labels and milestone**

Create or reconcile: `P0`, `P1`, `P2`, `P3`, `bug`, `documentation`, `enhancement`, `process`, `tooling`, `security`, `maintenance`, `developer-experience`, `dependencies`, `github-actions`, `npm`, `ignore-for-release`. Reuse the descriptions already established in DOC-ITRoles.

```powershell
gh api -X POST repos/JeanKadang/DOC-GitHub-Practice-Skills/milestones `
  -f title='v0.1.0' `
  -f description='Bootstrap eight canonical skills, validation, installation, documentation, and the initial release.'
```

- [ ] **Step 6: File bootstrap issue #1**

Title: `Repository lacks its canonical skill packages and release scaffolding`. Assign `@me`; label `P1`, `enhancement`, `tooling`; milestone `v0.1.0`. Use these criteria:

```markdown
- [ ] Eight canonical skills validate from one inventory.
- [ ] OpenAI Codex and Claude staged installations use identical SKILL.md content.
- [ ] The installer refuses unapproved overwrites and supports dry-run and backup behavior.
- [ ] Contributor, maintainer, OpenAI Codex, Claude, and ADO migration documentation is complete.
- [ ] CI, dependency updates, release notes, security policy, issue forms, and PR template are active.
- [ ] Repository and Actions settings match the approved bootstrap design.
- [ ] All CI checks pass on the bootstrap pull request.
- [ ] v0.1.0 is tagged from updated main and published with generated release notes.
```

- [ ] **Step 7: Create the issue-linked branch**

```powershell
gh issue develop 1 --repo JeanKadang/DOC-GitHub-Practice-Skills `
  --name bootstrap/1-initial-release --base main --checkout
```

Expected: clean `bootstrap/1-initial-release`, linked to issue #1. Comment on #1 with Task 2 settings and branch evidence; do not check implementation criteria yet.

---

### Task 3: Import Eight Packages and Build Validation

**Files:**

- Create: `skills/<eight names>/**`
- Create: `contracts/skill-inventory.json`
- Create: `scripts/validate-skills.mjs`
- Create: `tests/validate-skills.test.mjs`
- Create: `package.json`, `package-lock.json`

**Interfaces:**

- Consumes: seven existing Codex skill directories and the Task 1 draft.
- Produces: `validateRepository(root) -> { errors, warnings, skills }`, CLI exit status, and the inventory consumed by the installer.

- [x] **Step 1: Copy sources without policy edits**

Copy these exact directories into `skills/`:

```text
C:\Users\Jean\.codex\skills\github-for-ado-users
C:\Users\Jean\.codex\skills\github-hygiene
C:\Users\Jean\.codex\skills\github-issue-first
C:\Users\Jean\.codex\skills\github-pr-review
C:\Users\Jean\.codex\skills\github-projects
C:\Users\Jean\.codex\skills\github-repo-review
C:\Users\Jean\.codex\skills\github-security-response
```

Copy the Task 1 draft as `skills/github-repo-bootstrap`. Verify `github-repo-review/review-prompt.md` and all eight `agents/openai.yaml` files exist.

- [x] **Step 2: Define the inventory**

Create `contracts/skill-inventory.json`:

```json
{
  "schemaVersion": 1,
  "packageVersion": "0.1.0",
  "skills": [
    { "name": "github-for-ado-users", "requiredFiles": ["SKILL.md", "agents/openai.yaml"] },
    { "name": "github-hygiene", "requiredFiles": ["SKILL.md", "agents/openai.yaml"] },
    { "name": "github-issue-first", "requiredFiles": ["SKILL.md", "agents/openai.yaml"] },
    { "name": "github-pr-review", "requiredFiles": ["SKILL.md", "agents/openai.yaml"] },
    { "name": "github-projects", "requiredFiles": ["SKILL.md", "agents/openai.yaml"] },
    { "name": "github-repo-bootstrap", "requiredFiles": ["SKILL.md", "agents/openai.yaml"] },
    { "name": "github-repo-review", "requiredFiles": ["SKILL.md", "agents/openai.yaml", "review-prompt.md"] },
    { "name": "github-security-response", "requiredFiles": ["SKILL.md", "agents/openai.yaml"] }
  ]
}
```

- [x] **Step 3: Define the Node package**

Create `package.json`:

```json
{
  "name": "doc-github-practice-skills",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "engines": { "node": ">=20" },
  "scripts": {
    "test": "node --test",
    "validate": "node scripts/validate-skills.mjs",
    "lint:markdown:docs": "markdownlint-cli2 \"**/*.md\" \"#node_modules/**\" \"#skills/**\"",
    "lint:markdown:skills": "markdownlint-cli2 --config .markdownlint-skills.jsonc \"skills/**/*.md\"",
    "lint:markdown": "npm run lint:markdown:docs && npm run lint:markdown:skills",
    "check": "npm run validate && npm test && npm run lint:markdown"
  },
  "devDependencies": {
    "markdownlint-cli2": "^0.23.2",
    "yaml": "^2.8.1"
  }
}
```

Run `npm install` and commit the generated lockfile.

Create `.markdownlint-skills.jsonc` for the byte-preserved imported skill
sources. Disable only inherited formatting rules `MD013`, `MD022`, `MD032`,
`MD040`, and `MD060`. Root and documentation Markdown remain subject to the
strict default rules through `lint:markdown:docs`. This scoped exception was
approved by the maintainer on 2026-08-09 after the exact imports exposed 266
pre-existing findings; normalization is intentionally deferred to a separately
reviewed change.

- [x] **Step 4: Write failing validator tests**

Use `node:test` and temporary copies. Include:

```javascript
test('accepts the canonical eight-skill checkout', async () => {
  const result = await validateRepository(repoRoot);
  assert.deepEqual(result.errors, []);
  assert.equal(result.skills.length, 8);
});

test('rejects an unregistered github skill directory', async () => {
  const root = await fixtureFromRepo();
  await mkdir(join(root, 'skills', 'github-unregistered'));
  const result = await validateRepository(root);
  assert.match(result.errors.join('\n'), /unregistered skill/i);
});

test('rejects missing companion files', async () => {
  const root = await fixtureFromRepo();
  await rm(join(root, 'skills', 'github-repo-review', 'review-prompt.md'));
  const result = await validateRepository(root);
  assert.match(result.errors.join('\n'), /review-prompt\.md/);
});

test('rejects a frontmatter name that differs from its directory', async () => {
  const root = await fixtureFromRepo();
  await writeFile(join(root, 'skills', 'github-hygiene', 'SKILL.md'), '---\nname: wrong\n---\n');
  const result = await validateRepository(root);
  assert.match(result.errors.join('\n'), /frontmatter name/i);
});
```

Run the focused test and confirm failure because `validateRepository` is absent.

- [x] **Step 5: Implement manifest validation**

`scripts/validate-skills.mjs` exports:

```javascript
export async function validateRepository(root = process.cwd()) {
  return { errors: [], warnings: [], skills: [] };
}
```

Expand it to load the inventory, compare registered and actual `skills/github-*` directories, verify files, parse `SKILL.md` YAML frontmatter, require `name === directory name`, parse `agents/openai.yaml`, and require non-empty `interface.display_name`, `short_description`, and `default_prompt`. The CLI prints a deterministic summary and exits one on errors.

- [x] **Step 6: Run red-green verification**

```powershell
npm run validate
npm test
npm run lint:markdown
```

Expected: eight skills, all tests pass, zero Markdown issues under the strict
repository-doc rules and the explicitly scoped imported-skill policy.

- [x] **Step 7: Commit Task 3**

```powershell
git add skills contracts scripts/validate-skills.mjs tests/validate-skills.test.mjs package.json package-lock.json .markdownlint-skills.jsonc
git commit -m "feat: add canonical skill inventory"
```

---

### Task 4: Build the Safe PowerShell Installer

**Files:**

- Create: `scripts/install-skills.ps1`
- Create: `tests/install-skills.test.mjs`
- Modify: `package.json`

**Interfaces:**

- Consumes: inventory and validated `skills/` tree.
- Produces: `install-skills.ps1 -Target Codex|Claude|Both -SourceRoot <path> -CodexHome <path> -ClaudeHome <path> -DryRun -Force`.

- [x] **Step 1: Write failing installer tests**

Spawn `pwsh -NoProfile -File scripts/install-skills.ps1` with temporary homes. Test that dry-run changes nothing, both targets receive eight skills, corresponding `SKILL.md` hashes match, an untracked existing skill is refused without `-Force`, and `-Force` backs up a modified tracked skill before replacement.

Run the focused test and confirm failure because the installer is absent.

- [x] **Step 2: Implement parameters and discovery**

```powershell
[CmdletBinding()]
param(
    [ValidateSet('Codex', 'Claude', 'Both')]
    [string]$Target = 'Both',
    [string]$SourceRoot = (Split-Path $PSScriptRoot -Parent),
    [string]$CodexHome,
    [string]$ClaudeHome,
    [switch]$DryRun,
    [switch]$Force
)

$userProfilePath = [Environment]::GetFolderPath('UserProfile')
if (-not $CodexHome) {
    $CodexHome = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $userProfilePath '.codex' }
}
if (-not $ClaudeHome) {
    $ClaudeHome = if ($env:CLAUDE_HOME) { $env:CLAUDE_HOME } else { Join-Path $userProfilePath '.claude' }
}
```

Do not declare or repurpose `$HOME`, `$home`, or `$CODEX_HOME`.

- [x] **Step 3: Implement staging and overwrite safety**

Validate `SourceRoot` before destination writes. Load the inventory, compute SHA-256 for required files, and stage under a GUID directory inside each target parent. `-DryRun` prints source, target, eight skills, overwrite decisions, and backup paths without creating anything.

Write `.doc-github-practice-skills.json` with release and file hashes. If an existing skill has no matching marker or current hashes differ, exit one unless `-Force`. With `-Force`, back up to `<platform-home>/skill-backups/<UTC timestamp>/<skill-name>/`. Move staged directories only after every check succeeds.

- [x] **Step 4: Run installer red-green verification**

```powershell
npm test
npm run check
```

Expected: staged Codex and Claude hashes match for all eight skills; overwrite and backup tests pass.

- [x] **Step 5: Commit Task 4**

```powershell
git add scripts/install-skills.ps1 tests/install-skills.test.mjs package.json package-lock.json
git commit -m "feat: add safe skill installer"
```

---

### Task 5: Add Documentation and Repository Health Scaffolding

**Files:**

- Create: all documentation, platform, community-health, CI, dependency, and release files from the file map.
- Modify: `README.md`

**Interfaces:**

- Consumes: eight validated skills and installer interface.
- Produces: complete public documentation, intake templates, CI, dependency updates, release notes, security policy, and release automation.

- [x] **Step 1: Write the layered guide**

`docs/GUIDE.md` covers all eight triggers, responsibilities, boundaries, outputs, and handoffs. Start with the issue → linked branch → `Refs` → criterion evidence → `Closes` → epic/milestone → release chain. Include ordinary change, repository review, PR review, security, multi-maintainer, release, and new-repository examples. Label current policy separately from improvements and record version/review date.

`docs/WORKFLOW.md` expands the lifecycle. `docs/MAINTAINING.md` defines the cross-skill invariant review, parent-epic reconciliation, issue-versus-PR number verification, and compatibility recording.

- [x] **Step 2: Write platform tracks**

Create OpenAI Codex and Claude guides that link to the same skill directories, document discovery/restart behavior, and show `-DryRun` before installation. Create neutral ADO mappings for work items, types, iterations, milestones, Projects, repos, pipelines, Test Plans, and Wiki; state that workplace templates belong in a future private companion.

- [x] **Step 3: Write root policies**

README: purpose, eight skills, quick install, docs, compatibility, licence, security, release status. CONTRIBUTING: issue-first, conventional commits, linked branches, evidence gates, focused PRs, tests, and no workplace content. SECURITY: current release, private vulnerability reporting, no public disclosure, no fictitious guarantees.

Start `CHANGELOG.md` with:

```markdown
# Changelog

## [Unreleased]

## [0.1.0] - 2026-08-08

### Added

- Eight canonical GitHub workflow skills for OpenAI Codex and Claude.
- Safe Windows PowerShell installation and manifest validation.
- General Azure DevOps-to-GitHub migration guidance.
```

- [x] **Step 4: Add issue forms and PR template**

Bug and improvement forms require evidence, scope, acceptance criteria, affected skills, and public-content confirmation. Disable blank issues and route security reports to SECURITY.md. PR template begins `Refs #N`, asks for criterion evidence and validation, and never defaults to `Closes #N`.

- [x] **Step 5: Add dependency and release-note configuration**

Dependabot checks npm and GitHub Actions weekly, grouped, assigned to `JeanKadang`, with Task 2 labels. Release notes categorize Security, Features, Fixes, Documentation, Tooling & CI, Maintenance, and Other; exclude `ignore-for-release`; keep `"*"` last.

- [x] **Step 6: Add pinned CI**

`validate.yml` uses `permissions: contents: read` and stable job names:

- `Validate skills (Node 20)`
- `Validate skills (Node 22)`
- `Markdown lint`
- `Installer dry run (Windows)`

Use pinned `actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0` and `actions/setup-node@48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e`. Node jobs use `npm ci`; Windows runs installer tests and direct dry-run against temporary homes.

- [x] **Step 7: Add tag release workflow**

Trigger `v*`; use `permissions: contents: write`; checkout tag; run `npm ci` and `npm run check`; require package and inventory versions to equal the tag without `v`; then run this release step with `shell: pwsh`:

```powershell
gh release create $env:GITHUB_REF_NAME `
  --verify-tag --generate-notes --title $env:GITHUB_REF_NAME
```

Expose `${{ github.token }}` only as `GH_TOKEN` for that step. Use no third-party release action.

- [x] **Step 8: Verify and commit Task 5**

Run `npm run check`, the public-content regex from Task 2 across the repo excluding `node_modules` and lockfile, and `git diff --check`. Review any generic documentation match manually.

```powershell
git add README.md CHANGELOG.md CONTRIBUTING.md SECURITY.md docs platforms .github
git commit -m "docs: add skill workflow guidance"
```

---

### Task 6: Open, Verify, and Merge the Bootstrap PR

**Files:**

- Create temporarily: `.superpowers/sdd/repo-settings.json`
- Create temporarily: `.superpowers/sdd/main-ruleset.json`
- Delete both after API verification.

**Interfaces:**

- Consumes: complete bootstrap branch with green local validation.
- Produces: configured repository, green PR, evidence-backed issue state, and approved merge commit.

- [x] **Step 1: Push and open the PR**

Push `bootstrap/1-initial-release`. Open a ready PR titled `feat: bootstrap GitHub practice skills` with `Refs #1`, exact commits, inventory, validation, settings still to verify, and public-content scan result.

- [x] **Step 2: Enable and verify security settings**

Enable private vulnerability reporting. Query `security_and_analysis`; enable secret scanning and push protection where the public repository reports them available. Record an unavailable API/plan control as a constraint, not a fabricated defect.

- [x] **Step 3: Audit actual settings**

```powershell
gh repo view JeanKadang/DOC-GitHub-Practice-Skills `
  --json nameWithOwner,visibility,defaultBranchRef,deleteBranchOnMerge,mergeCommitAllowed,rebaseMergeAllowed,squashMergeAllowed,hasIssuesEnabled,hasProjectsEnabled,hasWikiEnabled
gh api repos/JeanKadang/DOC-GitHub-Practice-Skills/actions/permissions/workflow
gh api repos/JeanKadang/DOC-GitHub-Practice-Skills --jq .security_and_analysis
```

Expected: public/main, delete true, merge commit true, squash/rebase false, issues true, Projects/Wiki false, default Actions read, available security controls enabled.

- [x] **Step 4: Wait for every PR check**

Resolve the PR number from the branch, then run `gh pr checks <N> --watch`. All four stable CI jobs must be green. Diagnose failures before any rerun.

- [x] **Step 5: Review issue criteria and PR scope**

Use `github-pr-review` to map each non-release criterion to diff, tests, CI, docs, or settings. Keep the release criterion unchecked and keep `Refs #1`, because `v0.1.0` does not exist yet.

- [x] **Step 6: Request explicit merge approval**

Present PR URL, criterion table, CI matrix, settings audit, content scan, and the remaining release criterion. Merge only after approval, with a merge commit.

- [x] **Step 7: Create the main ruleset after CI names exist**

After merge, create an active `~DEFAULT_BRANCH` ruleset with deletion and non-fast-forward protection, pull requests required with zero approvals for the solo maintainer, and strict required checks using the four exact Task 5 job names. Verify with `gh ruleset check main` and the API. Record why the first PR preceded the ruleset.

---

### Task 7: Publish and Verify `v0.1.0`

**Files:**

- No source changes unless verification finds a genuine defect.

**Interfaces:**

- Consumes: updated `main`, green validation, matching `0.1.0` versions, changelog, approved release.
- Produces: annotated tag, latest release, completed issue #1, closed milestone, clean branches.

- [x] **Step 1: Verify fresh `main`**

```powershell
git checkout main
git pull --ff-only
npm ci
npm run check
node -e "const p=require('./package.json'),i=require('./contracts/skill-inventory.json');if(p.version!=='0.1.0'||i.packageVersion!=='0.1.0')process.exit(1)"
git diff --check
```

Expected: all checks pass, versions match, tree clean.

- [x] **Step 2: Preview release notes**

```powershell
gh api repos/JeanKadang/DOC-GitHub-Practice-Skills/releases/generate-notes `
  -f tag_name=v0.1.0 -f target_commitish=main `
  --jq '{name: .name, body: .body}'
```

Expected: bootstrap PR categorized correctly and no unrelated changes.

- [x] **Step 3: Request explicit release approval**

Present release commit, check results, notes preview, open release criterion, and annotated-tag command. Do not tag without approval.

- [x] **Step 4: Tag updated `main`**

```powershell
git tag -a v0.1.0 -m "Release 0.1.0"
git rev-list -n 1 v0.1.0
git push origin v0.1.0
```

Verify tag commit equals `main`, then watch release automation. Do not create a duplicate manual release.

- [x] **Step 5: Verify and close release tracking**

Confirm `v0.1.0` is latest, not draft/prerelease, annotated tag resolves to updated `main`, generated notes exist, and release workflow is green. Add criterion evidence to issue #1, check all eight boxes with a body file, close Completed, verify zero unchecked, close milestone `v0.1.0`, prune the branch, and report any open PR.

---

### Task 8: Integrate the Released Skills into DOC-ITRoles

**Files:**

- Create: `docs/GITHUB_WORKFLOW_SKILLS.md`
- Modify: `CHANGELOG.md`
- Modify remotely: issue #216 and the current branch PR metadata.

**Interfaces:**

- Consumes: verified public `v0.1.0` and canonical documentation URLs.
- Produces: repository-specific integration guide, green DOC-ITRoles PR, and evidence-backed #216 closure.

- [x] **Step 1: Write the integration guide**

Include repository URL and adopted `v0.1.0`; all eight names; canonical guide/installer/platform links; DOC-ITRoles labels, thematic milestones, linked branches, merge commits, release conventions; acceptance criteria as evidence gates; parent-epic/native-sub-issue reconciliation; explicit merge/release approval; hosted browser CI as authoritative when local simulation is unavailable; private security routing; and a statement that reusable policy lives in the released skills repository.

- [x] **Step 2: Update the changelog**

Under `[Unreleased]`, record the integration guide and link #216 and the released repository. Do not bump DOC-ITRoles solely for this documentation PR.

- [x] **Step 3: Verify DOC-ITRoles**

```powershell
npx --yes markdownlint-cli2 "docs/GITHUB_WORKFLOW_SKILLS.md" `
  "docs/superpowers/specs/2026-08-08-github-workflow-skills-repository-design.md" `
  "docs/superpowers/plans/2026-08-08-github-practice-skills-repository.md"
npm test
npm run validate
git diff --check
```

Expected: zero lint issues, at least 279 Node tests pass, role validation zero errors, clean diff.

- [x] **Step 4: Open the DOC-ITRoles PR**

From `docs/216-github-skills-guide`, open a ready PR titled `docs: document GitHub practice skills` with `Refs #216`, release evidence, local validation, and scope-decision history.

- [ ] **Step 5: Reconcile all ten #216 criteria**

Map criteria to design, public repo, eight packages, bootstrap evidence, docs, CI, installer tests, release, integration guide, content scan, and both validations. Only when all are `Met`, change PR to `Closes #216` and check every box with a newline-preserving body file.

- [ ] **Step 6: Request merge approval and merge on green**

Wait for every DOC-ITRoles check; present criterion table and PR URL; merge with a merge commit only after explicit approval.

- [ ] **Step 7: Verify closure and cleanup**

Confirm #216 Closed/Completed with ten checked and zero unchecked. Reconcile epic #193 if #216 is listed. Verify both `main` branches equal origin, merged remote branches are gone, temporary bootstrap staging is deleted, no active agents remain, and only the user's `.claude/settings.local.json` remains untracked in DOC-ITRoles.

## Plan Self-Review Checklist

- [ ] Every approved design section maps to a task.
- [ ] Every external-state mutation has an exact target and verification step.
- [ ] The issue-first exception ends immediately after the minimum shell.
- [ ] Public/private ADO boundaries are checked before publication.
- [ ] OpenAI Codex and Claude consume identical skill text.
- [ ] Ruleset creation follows observation of CI names.
- [ ] Merge and release approvals remain explicit gates.
- [ ] Both repositories have criterion-level closure evidence and cleanup.
