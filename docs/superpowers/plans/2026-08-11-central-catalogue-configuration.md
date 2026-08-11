# Central Catalogue Configuration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make one shared module authoritative for catalogue domains, chapters,
icons, ordering, aliases, and chapter-lead references, while canonicalising the
FinOps folder to lowercase.

**Architecture:** A dependency-free UMD module exposes ordered source records,
derived compatibility maps, alias resolution, and pure structural validation to
Node and the browser. A Node-only validator checks that configuration, role
folders, chapter narratives, and chapter-lead role files agree. Existing server,
viewer, count, and generator consumers import those interfaces instead of
authoring parallel maps.

**Tech Stack:** Node.js 18+, CommonJS, browser JavaScript, `node:test`, Markdown,
GitHub Actions.

## Global Constraints

- Keep viewer configuration loading synchronous; add no runtime fetch or build
  step.
- Add no runtime or development dependency.
- Preserve the existing seven-chapter and 34-domain ordering and user-visible
  labels, icons, and descriptions.
- Use lowercase canonical domain IDs; retain `FinOps` as a compatibility alias
  for `finops`.
- Keep stable role IDs (#180), broad viewer modularisation (#186), and catalogue
  content changes out of scope.
- Follow strict RED-GREEN-REFACTOR: every production behavior starts with a
  focused failing test whose failure reason is observed.
- Do not run local Firefox; the hosted browser matrix is the cross-browser gate.

---

## File map

- Create `catalogueConfig.js`: browser/Node-safe source records, derived maps,
  alias resolution, and structural validation.
- Create `scripts/validate-catalogue.js`: Node-only filesystem drift checks and
  command-line exit behavior.
- Create `test/catalogue-config.test.js`: pure configuration and alias tests.
- Create `test/catalogue-filesystem.test.js`: controlled filesystem drift tests.
- Modify `roleMeta.js`: re-export the derived domain labels.
- Modify `server.js`: configured discovery/order, unknown-folder rejection, and
  serving the browser configuration module.
- Modify `index.html`: load the module and remove the authored `CHAPTERS` and
  `ICONS` maps.
- Modify `scripts/check-counts.js`: obtain chapter count from configuration.
- Create `test/check-counts.test.js`: prove count computation accepts configured
  chapters rather than parsing HTML.
- Modify `scripts/build-skills-matrix.js`: search canonical configured domain
  folders rather than arbitrary directories.
- Modify `package.json`: run catalogue drift validation in `npm run validate`.
- Rename `Roles/FinOps/` to `Roles/finops/` and update repository-relative links.
- Modify `test/server.test.js`, `test/skills-matrix.test.js`, and
  `test/browser/routing.spec.js`: protect the migrated identity and shared
  browser source.
- Modify `CONTRIBUTING.md` and `docs/CHAPTERS_OVERVIEW.md`: document the single
  add-domain configuration step.

### Task 1: Shared configuration module

**Files:**

- Create: `catalogueConfig.js`
- Create: `test/catalogue-config.test.js`

**Interfaces:**

- Produces `CHAPTER_LIST: readonly Chapter[]`, where `Chapter` is
  `{ id, label, icon, description, order, chapterLeadRoleId }`.
- Produces `DOMAIN_LIST: readonly Domain[]`, where `Domain` is
  `{ id, label, icon, chapterId, order, aliases }`.
- Produces derived frozen objects `CHAPTERS`, `DOMAIN_LABELS`, and `ICONS` in
  the shapes currently consumed by the viewer and role metadata parser.
- Produces `resolveDomainId(value): string | null`.
- Produces `validateCatalogueConfig({ chapters, domains }): string[]` and
  `assertValidCatalogueConfig(config): void`.
- Exposes the same object as `module.exports` in Node and
  `globalThis.CatalogueConfig` in the browser.

- [ ] **Step 1: Write focused structural and alias tests**

Create `test/catalogue-config.test.js` with literal fixtures. The first tests
must prove the module does not exist yet, then cover observable behavior rather
than exact source text:

```js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  CHAPTER_LIST,
  DOMAIN_LIST,
  CHAPTERS,
  DOMAIN_LABELS,
  ICONS,
  resolveDomainId,
  validateCatalogueConfig,
} = require('../catalogueConfig');

const chapters = [{
  id: 'platform', label: 'Platform', icon: 'P', description: 'Platform work',
  order: 10, chapterLeadRoleId: 'leadership/platform_chapter_lead',
}];
const domains = [{
  id: 'finops', label: 'FinOps', icon: 'F', chapterId: 'platform', order: 10,
  aliases: ['FinOps'],
}];

test('legacy and canonical domain identifiers resolve to the canonical ID', () => {
  assert.equal(resolveDomainId('finops'), 'finops');
  assert.equal(resolveDomainId('FinOps'), 'finops');
  assert.equal(resolveDomainId('unknown'), null);
});

test('derived maps preserve configured labels, icons, membership and lead files', () => {
  assert.equal(DOMAIN_LABELS.finops, 'FinOps');
  assert.equal(ICONS.finops, '💰');
  assert.ok(CHAPTERS.cloud_platform_infra.domains.includes('finops'));
  assert.equal(
    CHAPTERS.cloud_platform_infra.leadFile,
    'Roles/leadership/cloud_platform_infrastructure_chapter_lead.md',
  );
});

test('valid configuration has no structural errors', () => {
  assert.deepEqual(validateCatalogueConfig({ chapters, domains }), []);
});

test('configuration rejects collisions and broken chapter membership', () => {
  const badDomains = [
    ...domains,
    { id: 'security', label: 'Security', icon: 'S', chapterId: 'missing',
      order: 10, aliases: ['FINOPS'] },
  ];
  const errors = validateCatalogueConfig({ chapters, domains: badDomains });
  assert.ok(errors.some(error => error.includes('unknown chapter')));
  assert.ok(errors.some(error => error.includes('alias')));
  assert.ok(errors.some(error => error.includes('order')));
});

test('the committed configuration is structurally valid and fully derived', () => {
  assert.deepEqual(validateCatalogueConfig({ chapters: CHAPTER_LIST, domains: DOMAIN_LIST }), []);
  assert.deepEqual(Object.keys(DOMAIN_LABELS), DOMAIN_LIST.map(domain => domain.id));
});
```

- [ ] **Step 2: Run the focused test and observe RED**

Run: `node --test test/catalogue-config.test.js`

Expected: FAIL with `Cannot find module '../catalogueConfig'`.

- [ ] **Step 3: Implement the UMD module and transcribe the existing maps once**

Use this module boundary and validation strategy:

```js
'use strict';

(function expose(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.CatalogueConfig = api;
}(typeof globalThis === 'undefined' ? this : globalThis, function buildConfig() {
  const CHAPTER_LIST = Object.freeze([
    { id: 'cloud_platform_infra', label: 'Cloud, Platform & Infrastructure', icon: '☁️',
      description: 'Owns the full infrastructure estate from bare metal to cloud-native, including cloud adoption strategy, platform engineering, container orchestration, virtualisation, specialised computing, server hardware, operating systems, networking, and cloud cost governance (FinOps).',
      order: 10, chapterLeadRoleId: 'leadership/cloud_platform_infrastructure_chapter_lead' },
    { id: 'devops_delivery', label: 'DevOps & Delivery', icon: '🔄',
      description: 'Owns the software delivery toolchain, internal developer platforms, CI/CD standards, application platform engineering, and integration & middleware architecture. Accountable for DORA metrics and delivery flow across the organisation.',
      order: 20, chapterLeadRoleId: 'leadership/devops_delivery_chapter_lead' },
    { id: 'data_ai', label: 'Data & AI', icon: '📊',
      description: 'Owns the data platform strategy, data architecture, database management standards, and AI governance frameworks. Ensures data quality, lineage, and ethical AI practices across the organisation.',
      order: 30, chapterLeadRoleId: 'leadership/data_ai_chapter_lead' },
    { id: 'security_identity', label: 'Security & Identity', icon: '🔒',
      description: 'Owns the end-to-end security posture, zero trust architecture, identity and access management, data protection, directory services, and security automation across all platforms and cloud environments.',
      order: 40, chapterLeadRoleId: 'leadership/security_identity_chapter_lead' },
    { id: 'end_user_workplace', label: 'End User & Workplace', icon: '🖥️',
      description: 'Owns the digital workplace experience, device management strategy, M365 platform, collaboration tooling, Tier-1/2/3 service desk operations, and end-user technology standards. Ensures employees have secure, productive, and consistent technology experiences.',
      order: 50, chapterLeadRoleId: 'leadership/end_user_workplace_chapter_lead' },
    { id: 'service_governance', label: 'Service & Governance', icon: '🎯',
      description: 'Owns IT service management, configuration management, SIAM frameworks, enterprise architecture governance, and infrastructure onboarding standards. Ensures IT operates as a consistent, measurable service across the organisation.',
      order: 60, chapterLeadRoleId: 'leadership/service_governance_chapter_lead' },
    { id: 'leadership_chapter', label: 'Leadership', icon: '👑',
      description: 'Cross-cutting leadership roles that span all chapters and domains. Includes C-Suite executives, Chapter Leads, Technical Area Leads (TAL), and Product Area Leads (PAL). These roles set technical direction, own people development, and represent IT at the business level.',
      order: 70, chapterLeadRoleId: null },
  ].map(Object.freeze));

  const DOMAIN_LIST = Object.freeze([
    { id: 'cloud_platforms', label: 'Cloud Platforms', icon: '☁️', chapterId: 'cloud_platform_infra', order: 10, aliases: [] },
    { id: 'kubernetes', label: 'Kubernetes', icon: '☸️', chapterId: 'cloud_platform_infra', order: 20, aliases: [] },
    { id: 'modern_infrastructure', label: 'Modern Infrastructure', icon: '🚀', chapterId: 'cloud_platform_infra', order: 30, aliases: [] },
    { id: 'virtualization', label: 'Virtualization', icon: '📦', chapterId: 'cloud_platform_infra', order: 40, aliases: [] },
    { id: 'specialized_computing', label: 'Specialized Computing', icon: '⚡', chapterId: 'cloud_platform_infra', order: 50, aliases: [] },
    { id: 'server_hardware', label: 'Server Hardware', icon: '🖧', chapterId: 'cloud_platform_infra', order: 60, aliases: [] },
    { id: 'server_hardware_hpe', label: 'HPE Server Hardware', icon: '🖧', chapterId: 'cloud_platform_infra', order: 70, aliases: [] },
    { id: 'server_os_linux', label: 'Linux Server OS', icon: '🐧', chapterId: 'cloud_platform_infra', order: 80, aliases: [] },
    { id: 'server_os_windows', label: 'Windows Server OS', icon: '🪟', chapterId: 'cloud_platform_infra', order: 90, aliases: [] },
    { id: 'network', label: 'Network', icon: '🌐', chapterId: 'cloud_platform_infra', order: 100, aliases: [] },
    { id: 'finops', label: 'FinOps', icon: '💰', chapterId: 'cloud_platform_infra', order: 110, aliases: ['FinOps'] },
    { id: 'devops', label: 'DevOps', icon: '🔄', chapterId: 'devops_delivery', order: 10, aliases: [] },
    { id: 'app_platforms', label: 'App Platforms', icon: '⚙️', chapterId: 'devops_delivery', order: 20, aliases: [] },
    { id: 'integration_middleware', label: 'Integration & Middleware', icon: '🔗', chapterId: 'devops_delivery', order: 30, aliases: [] },
    { id: 'quality_engineering', label: 'Quality Engineering', icon: '🧪', chapterId: 'devops_delivery', order: 40, aliases: [] },
    { id: 'data_engineering', label: 'Data Engineering', icon: '📊', chapterId: 'data_ai', order: 10, aliases: [] },
    { id: 'data_management', label: 'Data Management', icon: '💾', chapterId: 'data_ai', order: 20, aliases: [] },
    { id: 'database_management', label: 'Database Management', icon: '🗄️', chapterId: 'data_ai', order: 30, aliases: [] },
    { id: 'ai_governance', label: 'AI Governance', icon: '🤖', chapterId: 'data_ai', order: 40, aliases: [] },
    { id: 'security', label: 'Security', icon: '🔒', chapterId: 'security_identity', order: 10, aliases: [] },
    { id: 'security_cross_platform', label: 'Security Cross-Platform', icon: '🛡️', chapterId: 'security_identity', order: 20, aliases: [] },
    { id: 'security_identity', label: 'Security & Identity', icon: '🪪', chapterId: 'security_identity', order: 30, aliases: [] },
    { id: 'data_protection', label: 'Data Protection', icon: '🛡️', chapterId: 'security_identity', order: 40, aliases: [] },
    { id: 'directory_services', label: 'Directory Services', icon: '📁', chapterId: 'security_identity', order: 50, aliases: [] },
    { id: 'client_platform', label: 'Client Platform', icon: '🖱️', chapterId: 'end_user_workplace', order: 10, aliases: [] },
    { id: 'endpoint_management', label: 'Endpoint Management', icon: '💻', chapterId: 'end_user_workplace', order: 20, aliases: [] },
    { id: 'modern_workplace', label: 'Modern Workplace', icon: '🖥️', chapterId: 'end_user_workplace', order: 30, aliases: [] },
    { id: 'service_desk', label: 'Service Desk', icon: '🎧', chapterId: 'end_user_workplace', order: 40, aliases: [] },
    { id: 'itsm_configuration', label: 'ITSM & Configuration', icon: '📋', chapterId: 'service_governance', order: 10, aliases: [] },
    { id: 'service_management', label: 'Service Management', icon: '🎯', chapterId: 'service_governance', order: 20, aliases: [] },
    { id: 'infrastructure_onboarding_cross_platform', label: 'Infrastructure Onboarding', icon: '🔌', chapterId: 'service_governance', order: 30, aliases: [] },
    { id: 'enterprise_architecture', label: 'Enterprise Architecture', icon: '🏛️', chapterId: 'service_governance', order: 40, aliases: [] },
    { id: 'c_suite', label: 'C-Suite', icon: '🏢', chapterId: 'leadership_chapter', order: 10, aliases: [] },
    { id: 'leadership', label: 'Leadership', icon: '👑', chapterId: 'leadership_chapter', order: 20, aliases: [] },
  ].map(domain => Object.freeze({ ...domain, aliases: Object.freeze(domain.aliases) })));

  function validateCatalogueConfig({ chapters = CHAPTER_LIST, domains = DOMAIN_LIST } = {}) {
    const errors = [];
    const chapterIds = new Set();
    const chapterOrders = new Set();
    for (const chapter of chapters) {
      if (!chapter.id || !chapter.label || !chapter.icon || !chapter.description) {
        errors.push(`chapter ${chapter.id || '<missing>'} is missing required fields`);
      }
      if (chapterIds.has(chapter.id)) errors.push(`duplicate chapter ID "${chapter.id}"`);
      if (!Number.isInteger(chapter.order) || chapter.order <= 0) {
        errors.push(`chapter "${chapter.id}" has an invalid order`);
      } else if (chapterOrders.has(chapter.order)) {
        errors.push(`duplicate chapter order ${chapter.order}`);
      }
      if (chapter.chapterLeadRoleId !== null &&
          !/^[a-z0-9_]+\/[a-z0-9_]+$/.test(chapter.chapterLeadRoleId || '')) {
        errors.push(`chapter "${chapter.id}" has an invalid chapter lead role ID`);
      }
      if (chapter.id !== 'leadership_chapter' && chapter.chapterLeadRoleId === null) {
        errors.push(`chapter "${chapter.id}" is missing its chapter lead role ID`);
      }
      chapterIds.add(chapter.id);
      chapterOrders.add(chapter.order);
    }
    const domainIds = new Set();
    const claimedNames = new Map();
    const ordersByChapter = new Map();
    for (const domain of domains) {
      if (!/^[a-z0-9_]+$/.test(domain.id || '')) {
        errors.push(`domain ID "${domain.id || '<missing>'}" must be lowercase`);
      }
      if (!domain.label || !domain.icon) errors.push(`domain "${domain.id}" is missing required fields`);
      if (domainIds.has(domain.id)) errors.push(`duplicate domain ID "${domain.id}"`);
      if (!chapterIds.has(domain.chapterId)) {
        errors.push(`domain "${domain.id}" references unknown chapter "${domain.chapterId}"`);
      }
      const orders = ordersByChapter.get(domain.chapterId) || new Set();
      if (!Number.isInteger(domain.order) || domain.order <= 0) {
        errors.push(`domain "${domain.id}" has an invalid order`);
      } else if (orders.has(domain.order)) {
        errors.push(`duplicate domain order ${domain.order} in "${domain.chapterId}"`);
      }
      orders.add(domain.order);
      ordersByChapter.set(domain.chapterId, orders);
      if (!Array.isArray(domain.aliases)) errors.push(`domain "${domain.id}" aliases must be an array`);
      for (const name of [domain.id, ...(Array.isArray(domain.aliases) ? domain.aliases : [])]) {
        const folded = name.toLowerCase();
        const owner = claimedNames.get(folded);
        if (owner && (owner !== domain.id || folded !== domain.id)) {
          errors.push(`domain alias "${name}" collides with "${owner}"`);
        }
        claimedNames.set(folded, domain.id);
      }
      domainIds.add(domain.id);
    }
    return errors;
  }

  function assertValidCatalogueConfig(config) {
    const errors = validateCatalogueConfig(config);
    if (errors.length) {
      throw new Error(`Invalid catalogue configuration:\n- ${errors.join('\n- ')}`);
    }
  }

  function resolveDomainId(value) {
    const key = String(value || '').trim().toLowerCase();
    const match = DOMAIN_LIST.find(domain =>
      domain.id === key || domain.aliases.some(alias => alias.toLowerCase() === key));
    return match ? match.id : null;
  }

  assertValidCatalogueConfig({ chapters: CHAPTER_LIST, domains: DOMAIN_LIST });

  const DOMAIN_LABELS = Object.freeze(Object.fromEntries(
    DOMAIN_LIST.map(domain => [domain.id, domain.label]),
  ));
  const ICONS = Object.freeze(Object.fromEntries(
    DOMAIN_LIST.map(domain => [domain.id, domain.icon]),
  ));
  const CHAPTERS = Object.freeze(Object.fromEntries(CHAPTER_LIST.map(chapter => [
    chapter.id,
    Object.freeze({
      label: chapter.label,
      icon: chapter.icon,
      desc: chapter.description,
      domains: Object.freeze(DOMAIN_LIST
        .filter(domain => domain.chapterId === chapter.id)
        .sort((a, b) => a.order - b.order)
        .map(domain => domain.id)),
      leadFile: chapter.chapterLeadRoleId
        ? `Roles/${chapter.chapterLeadRoleId}.md`
        : null,
    }),
  ])));

  return Object.freeze({ CHAPTER_LIST, DOMAIN_LIST, CHAPTERS, DOMAIN_LABELS,
    ICONS, resolveDomainId, validateCatalogueConfig, assertValidCatalogueConfig });
}));
```

Keep the records above in the displayed order. Order values use increments of
ten so insertion does not require renumbering. The Leadership chapter is the
only record with `chapterLeadRoleId: null`.

- [ ] **Step 4: Run the focused tests and full Node suite**

Run: `node --test test/catalogue-config.test.js`

Expected: all focused tests PASS.

Run: `npm test`

Expected: 285 existing tests plus the new configuration tests PASS.

- [ ] **Step 5: Commit the shared module**

```powershell
git add catalogueConfig.js test/catalogue-config.test.js
git commit -m "feat: add central catalogue configuration"
```

### Task 2: Runtime, filesystem, and FinOps migration

**Files:**

- Create: `scripts/validate-catalogue.js`
- Create: `test/catalogue-filesystem.test.js`
- Modify: `package.json`
- Rename: `Roles/FinOps/` to `Roles/finops/`
- Modify: every tracked repository link or fixture containing `Roles/FinOps`

**Interfaces:**

- Consumes `CHAPTER_LIST`, `DOMAIN_LIST`, and `validateCatalogueConfig`.
- Produces `validateCatalogueFilesystem({ root, chapters, domains }): string[]`.
- Produces a CLI that prints each error and exits `1`, or prints a success count
  and exits `0`.
- Produces npm command `validate:catalogue`; existing `validate` runs catalogue
  validation before role-content validation.

- [ ] **Step 1: Write filesystem integration tests with controlled fixtures**

Create a temporary root with `Roles/`, `docs/chapters/`, and the configured lead
role. Assert literal failures for an absent domain, an unconfigured domain,
wrong folder casing, missing chapter narrative, and missing lead role:

```js
test('filesystem validation accepts exact configured folders and references', () => {
  const root = makeCatalogueFixture();
  assert.deepEqual(validateCatalogueFilesystem({ root, chapters, domains }), []);
});

test('filesystem validation reports casing and unconfigured-folder drift', () => {
  const root = makeCatalogueFixture();
  fs.renameSync(path.join(root, 'Roles', 'finops'), path.join(root, 'Roles', 'FinOps'));
  fs.mkdirSync(path.join(root, 'Roles', 'rogue'));
  const errors = validateCatalogueFilesystem({ root, chapters, domains });
  assert.ok(errors.some(error => error.includes('expected exact folder "finops"')));
  assert.ok(errors.some(error => error.includes('unconfigured role folder "rogue"')));
});

test('filesystem validation reports missing narratives and lead roles', () => {
  const root = makeCatalogueFixture();
  fs.unlinkSync(path.join(root, 'docs', 'chapters', 'platform.md'));
  fs.unlinkSync(path.join(root, 'Roles', 'leadership', 'platform_chapter_lead.md'));
  const errors = validateCatalogueFilesystem({ root, chapters, domains });
  assert.ok(errors.some(error => error.includes('chapter narrative')));
  assert.ok(errors.some(error => error.includes('chapter lead')));
});
```

- [ ] **Step 2: Run the focused test and observe RED**

Run: `node --test test/catalogue-filesystem.test.js`

Expected: FAIL with `Cannot find module '../scripts/validate-catalogue'`.

- [ ] **Step 3: Implement the validator and CLI**

Implement exact-name comparison using `fs.readdirSync(..., { withFileTypes:
true })`; do not lower-case the directory listing before the casing check.
Resolve lead references as `Roles/<chapterLeadRoleId>.md` and narratives as
`docs/chapters/<chapter-id>.md`.

```js
function validateCatalogueFilesystem({
  root = path.join(__dirname, '..'),
  chapters = CHAPTER_LIST,
  domains = DOMAIN_LIST,
} = {}) {
  const errors = [...validateCatalogueConfig({ chapters, domains })];
  const rolesDir = path.join(root, 'Roles');
  const actualFolders = fs.readdirSync(rolesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  const expectedIds = new Set(domains.map(domain => domain.id));
  const actualFolded = new Map(actualFolders.map(name => [name.toLowerCase(), name]));
  for (const domain of domains) {
    const actual = actualFolded.get(domain.id);
    if (!actual) errors.push(`missing configured role folder "${domain.id}"`);
    else if (actual !== domain.id) errors.push(`expected exact folder "${domain.id}", found "${actual}"`);
  }
  for (const actual of actualFolders) {
    if (!expectedIds.has(actual) && !domains.some(domain => domain.id === actual.toLowerCase())) {
      errors.push(`unconfigured role folder "${actual}"`);
    }
  }
  for (const chapter of chapters) {
    const narrative = path.join(root, 'docs', 'chapters', `${chapter.id}.md`);
    if (!fs.existsSync(narrative)) errors.push(`missing chapter narrative "${chapter.id}.md"`);
    if (chapter.chapterLeadRoleId) {
      const lead = path.join(rolesDir, `${chapter.chapterLeadRoleId}.md`);
      if (!fs.existsSync(lead)) errors.push(`missing chapter lead "${chapter.chapterLeadRoleId}"`);
    }
  }
  return errors;
}

if (require.main === module) {
  const errors = validateCatalogueFilesystem();
  if (errors.length) {
    for (const error of errors) console.error(`Catalogue configuration: ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`Catalogue configuration: ${DOMAIN_LIST.length} domains, ${CHAPTER_LIST.length} chapters`);
  }
}
```

Set package scripts to:

```json
"validate": "node scripts/validate-catalogue.js && node validate-roles.js",
"validate:catalogue": "node scripts/validate-catalogue.js"
```

- [ ] **Step 4: Run the focused filesystem tests and observe GREEN**

Run: `node --test test/catalogue-filesystem.test.js`

Expected: all fixture-based drift tests PASS. The repository-level command is
deferred until the known FinOps casing drift is migrated in the next step.

- [ ] **Step 5: Rename FinOps safely and update exact paths**

On Windows, force Git to record the case-only rename through an intermediate
name:

```powershell
git mv Roles/FinOps Roles/finops_case_migration
git mv Roles/finops_case_migration Roles/finops
rg -l "Roles/FinOps|FinOps/" --glob "!node_modules/**"
```

Update every returned repository-relative path to `Roles/finops` or
`finops/`. Do not change the human-readable label `FinOps`.

#### Server and metadata migration

**Files:**

- Modify: `roleMeta.js`
- Modify: `server.js`
- Modify: `test/server.test.js`
- Modify: `test/roleMeta.test.js`

**Interfaces:**

- Consumes `DOMAIN_LIST`, `DOMAIN_LABELS`, and `resolveDomainId`.
- Preserves `roleMeta.js`'s `DOMAIN_LABELS` export as a compatibility interface.
- `/api/roles` emits canonical domain IDs in configured display order.
- `/catalogueConfig.js` serves the browser-safe shared module.

- [ ] **Step 6: Add server behavior tests**

```js
test('GET /catalogueConfig.js serves the shared browser module', async () => {
  const res = await request('/catalogueConfig.js');
  assert.equal(res.status, 200);
  assert.match(res.headers['content-type'], /javascript/);
  assert.match(res.body, /CatalogueConfig/);
});

test('GET /api/roles uses canonical configured IDs and order', async () => {
  const res = await request('/api/roles');
  const domains = JSON.parse(res.body);
  assert.ok(domains.finops);
  assert.equal(domains.FinOps, undefined);
  assert.deepEqual(Object.keys(domains), DOMAIN_LIST.map(domain => domain.id));
  assert.equal(domains.finops.label, 'FinOps');
});
```

In `test/roleMeta.test.js`, assert that the compatibility export is the same
object exported by `catalogueConfig.js`, not a copied map:

```js
test('domain labels are the shared catalogue export', () => {
  assert.equal(
    require('../roleMeta').DOMAIN_LABELS,
    require('../catalogueConfig').DOMAIN_LABELS,
  );
});
```

- [ ] **Step 7: Run focused tests and observe RED**

Run: `node --test test/server.test.js test/roleMeta.test.js`

Expected: FAIL because `/catalogueConfig.js` returns `404` and the API still
uses `FinOps`.

- [ ] **Step 8: Replace server and metadata maps with configuration imports**

In `roleMeta.js`:

```js
const { DOMAIN_LABELS } = require('./catalogueConfig');
```

Delete the authored `DOMAIN_LABELS` literal but retain it in `module.exports`.

In `server.js`, enumerate `DOMAIN_LIST` instead of sorting filesystem entries:

```js
const { DOMAIN_LIST, resolveDomainId } = require('./catalogueConfig');

for (const domainConfig of DOMAIN_LIST) {
  const domainPath = path.join(ROLES_DIR, domainConfig.id);
  if (!fs.existsSync(domainPath)) {
    throw new Error(`Configured role folder is missing: ${domainConfig.id}`);
  }
  const { roles, references } = readDomainFiles(domainPath, domainConfig.id);
  domains[domainConfig.id] = { label: domainConfig.label, roles, references };
}
```

Extract the existing per-folder Markdown enumeration and mapping block into
`readDomainFiles(domainPath, domainId)`; preserve its role/reference output
shape and use `domainId` when constructing `Roles/<domain>/<file>` paths.

Reject any role folder for which `resolveDomainId(entry.name)` is null, because
the validator and runtime must not silently invent a fallback label. Add the
static route beside `/viewer-logic.js`:

```js
if (url.pathname === '/catalogueConfig.js') {
  send(res, 200, 'application/javascript; charset=utf-8',
    fs.readFileSync(path.join(ROOT, 'catalogueConfig.js')));
  return;
}
```

- [ ] **Step 9: Run focused tests, the full suite, and validation**

Run: `node --test test/server.test.js test/roleMeta.test.js`

Expected: focused tests PASS.

Run: `npm test && npm run validate`

Expected: all Node tests PASS; catalogue validation reports 34 domains and
seven chapters; role validation reports zero errors.

- [ ] **Step 10: Commit the complete runtime and filesystem migration**

```powershell
git add roleMeta.js server.js scripts/validate-catalogue.js package.json Roles docs test/catalogue-filesystem.test.js test/server.test.js test/roleMeta.test.js
git commit -m "refactor: consume shared catalogue config"
```

### Task 3: Viewer consumer and route compatibility

**Files:**

- Modify: `index.html`
- Modify: `test/browser/routing.spec.js`

**Interfaces:**

- Consumes browser global `CatalogueConfig.CHAPTERS`, `.ICONS`, and
  `.resolveDomainId`.
- Preserves the existing internal `CHAPTERS` and `ICONS` variable shapes for
  rendering functions.
- Canonical and legacy-case FinOps hashes select the same `finops` payload.

- [ ] **Step 1: Add a browser-loading and alias regression**

Extend `test/browser/routing.spec.js` with this journey:

```js
test('legacy FinOps route loads the shared config and becomes canonical', async ({ page }) => {
  await page.goto('/#/matrix/FinOps');
  await expect.poll(() => page.evaluate(() =>
    globalThis.CatalogueConfig?.resolveDomainId('FinOps'))).toBe('finops');
  await expect(page).toHaveURL(/#\/matrix\/finops$/);
  await expect(page.getByRole('heading', { name: 'FinOps Role Matrix' })).toBeVisible();
});
```

- [ ] **Step 2: Run the focused browser journey in Chromium and observe RED**

Run:

```powershell
npm run test:browser -- test/browser/routing.spec.js --project=chromium --grep "legacy FinOps"
```

Expected: FAIL because the browser has not loaded the shared configuration and
the API key has changed to `finops`.

- [ ] **Step 3: Load and consume the shared browser module**

Load `/catalogueConfig.js` before the existing viewer logic/inline application
script. Replace the two authored literals with derived bindings:

```js
const { CHAPTERS, ICONS, resolveDomainId } = globalThis.CatalogueConfig;
```

At each route boundary that accepts a domain, resolve the incoming value before
reading `allDomains` or formatting the canonical route:

```js
const domainId = resolveDomainId(route.domain);
if (!domainId || !allDomains[domainId]) {
  showHomeView({ invalid: true });
  return;
}
```

Use `domainId` for rendering and canonical URL replacement. Delete the inline
`CHAPTERS` and `ICONS` objects completely.

- [ ] **Step 4: Run Node tests and local Chromium only**

Run: `npm test`

Expected: all Node tests PASS.

Run the affected Playwright journey with `--project=chromium`.

Expected: the FinOps route canonicalises and renders. Do not run local Firefox
or WebKit; hosted CI performs the three-browser gate.

- [ ] **Step 5: Commit viewer migration**

```powershell
git add index.html test/browser/routing.spec.js
git commit -m "refactor: share catalogue config with viewer"
```

### Task 4: Counts, generators, and contributor documentation

**Files:**

- Modify: `scripts/check-counts.js`
- Create: `test/check-counts.test.js`
- Modify: `scripts/build-skills-matrix.js`
- Modify: `test/skills-matrix.test.js`
- Modify: `CONTRIBUTING.md`
- Modify: `docs/CHAPTERS_OVERVIEW.md`

**Interfaces:**

- Consumes `CHAPTER_LIST` and `DOMAIN_LIST`.
- `computeCounts()` keeps returning `{ roleCount, domainCount, chapterCount }`.
- `roleFileFor(slug)` searches only canonical configured domain folders.

- [ ] **Step 1: Add consumer regression tests**

In the count test, inject one domain and one chapter so the existing
filesystem/HTML implementation returns the wrong real-catalogue totals. In the
skills-matrix test, use a fixture with an unconfigured folder containing a
duplicate role slug and assert the configured-domain role is selected.

```js
test('count checks derive chapter count from catalogue configuration', () => {
  const counts = computeCounts({
    domains: { finops: { roles: [{ name: 'finops_engineer' }] } },
    chapters: [{ id: 'platform' }],
  });
  assert.deepEqual(counts, { roleCount: 1, domainCount: 1, chapterCount: 1 });
});

test('role lookup ignores unconfigured domain folders', () => {
  const result = roleFileFor('shared_slug', { rolesDir, domains });
  assert.equal(result, path.join(rolesDir, 'finops', 'shared_slug.md'));
});
```

- [ ] **Step 2: Run focused tests and observe RED**

Run the count test and `node --test test/skills-matrix.test.js`.

Expected: FAIL because counts still parse `index.html` and role lookup still
enumerates arbitrary directories.

- [ ] **Step 3: Migrate counts and generator lookup**

In `scripts/check-counts.js`, delete the `index.html` read/regex and use:

```js
const { CHAPTER_LIST } = require('../catalogueConfig');

function computeCounts({ domains = getRoles(), chapters = CHAPTER_LIST } = {}) {
  return {
    roleCount: Object.values(domains).reduce((count, domain) => count + domain.roles.length, 0),
    domainCount: Object.keys(domains).length,
    chapterCount: chapters.length,
  };
}
```

In `scripts/build-skills-matrix.js`, change `roleFileFor` to accept injected
`rolesDir` and `domains`, then iterate `domains.map(domain => domain.id)` in
configured order. Export the function for its focused test.

- [ ] **Step 4: Document the one-step configuration workflow**

Replace the `CHAPTERS`-map instruction in `docs/CHAPTERS_OVERVIEW.md`. Add this
workflow to `CONTRIBUTING.md`:

1. Add one domain record to `DOMAIN_LIST` in `catalogueConfig.js` with canonical
   lowercase ID, label, icon, chapter, order, and aliases.
2. Create the exact matching `Roles/<domain-id>/` folder and role files.
3. Run `npm run validate`, `npm run check-counts`, and affected generators.

State that labels, icons, chapter membership, and display order must not be
duplicated in consumers.

- [ ] **Step 5: Run focused tests and generated-output checks**

Run the focused count and skills-matrix tests.

Expected: PASS.

Run: `npm run check-counts && npm run build-skills-matrix -- --dry && npm run build-radar -- --dry`

Expected: counts match 226 roles, 34 domains, and seven chapters; both generator
dry runs exit `0` without changing tracked files.

- [ ] **Step 6: Commit consumer and documentation migration**

```powershell
git add scripts/check-counts.js scripts/build-skills-matrix.js test/check-counts.test.js test/skills-matrix.test.js CONTRIBUTING.md docs/CHAPTERS_OVERVIEW.md
git commit -m "docs: define catalogue configuration workflow"
```

### Task 5: Full acceptance and pull-request gate

**Files:**

- Modify only files needed to correct failures directly caused by Tasks 1-5.
- Update: issue #184 acceptance criteria only after each item has evidence.

**Interfaces:**

- Produces the verification evidence required for #184 and its pull request.

- [ ] **Step 1: Run the complete local gate once**

```powershell
npm test
npm run validate
npm run check-counts
npm run verify-vendor
npm run build-skills-matrix -- --dry
npm run build-radar -- --dry
git diff --check
git status --short
```

Expected: all Node tests pass; configuration validation reports 34 domains and
seven chapters; role validation has zero errors; counts report 226 roles;
vendor and generated-document checks pass; diff check is clean. Existing KPI
warnings remain reported and are not part of #184.

- [ ] **Step 2: Inspect the final diff against the design and acceptance criteria**

Confirm explicitly:

1. `catalogueConfig.js` is the only authored domain/chapter map.
2. Server and viewer consume the shared source.
3. Counts and skills-matrix lookup consume configured records plus role files.
4. Contributor documentation has one configuration step.
5. `Roles/finops` is the only FinOps folder and alias tests preserve legacy
   identifiers.
6. `npm run validate` detects configuration/folder drift and runs in CI.

- [ ] **Step 3: Push and open a ready pull request with a non-closing reference**

Push `codex/184-central-catalogue-config` and open a PR whose body starts with
`Refs #184`. Include the six-item evidence table and the commands from Step 1.
Do not use `Closes #184` until hosted CI passes and every acceptance criterion
has been checked on the issue.

- [ ] **Step 4: Use hosted CI as the cross-browser gate**

Watch the PR checks once. Require green Node 18, Node 22, role/content
validation, Markdown lint, and Browser journeys across Chromium, Firefox, and
WebKit. Diagnose failures from logs; do not repeat local Firefox simulation.

- [ ] **Step 5: Reconcile acceptance criteria and request merge approval**

For each criterion, post concrete file/test/CI evidence on #184 and update only
the satisfied checkbox using a body file. When all six are checked, change the
PR reference from `Refs #184` to `Closes #184`, then ask the maintainer for
explicit merge approval. Do not merge, close the issue, delete the branch, or
cut a release without that approval.
