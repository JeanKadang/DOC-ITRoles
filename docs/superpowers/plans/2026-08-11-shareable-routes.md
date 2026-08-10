# Shareable Routes and Contextual Titles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make role, comparison, matrix, and registered-document views bookmarkable, reload-safe, history-aware, titled contextually, and easy to copy.

**Architecture:** Add a pure hash-route contract to `viewer-logic.js`, then make one controller in `index.html` resolve routes after catalogue loading and render existing views without recursive history writes. Keep the current server, framework-free browser application, and hosted three-browser Playwright workflow.

**Tech Stack:** Node.js 18+, browser JavaScript, CommonJS/UMD modules, built-in `node:test`, Playwright, existing Node HTTP server.

## Global Constraints

- Use hash routes; do not add a router dependency, frontend framework, build step, or server fallback rule.
- Route only home, role, comparison, matrix, and registered resource-document views.
- Keep search, filters, sidebar expansion, chapters, stale roles, organisation, graph, careers, and radar transient.
- Use catalogue identifiers from `Roles/<domain>/<filename>.md`, never display titles, for role routes.
- Use explicit stable `routeId` values for registered documents.
- Preserve the complete Matrix button behavior through `#/matrix/all`; also accept `#/matrix/<domain>`.
- Preserve an invalid hash while showing a non-blank welcome fallback and the default title.
- Guard asynchronous role and document rendering against superseded routes.
- Treat hosted Chromium, Firefox, and WebKit checks as the cross-browser authority; do not repeatedly retry an unavailable local Firefox runtime.
- Do not modify role Markdown content or catalogue identifiers.

---

## File Structure

- `viewer-logic.js`: owns pure route parsing, formatting, and role-file conversion.
- `test/viewer-logic.test.js`: owns the route grammar, normalization, rejection, and round-trip tests.
- `index.html`: owns route resolution, browser history, view application, titles, invalid-route feedback, and Copy link UI.
- `test/browser/routing.spec.js`: owns direct-load, reload, Back/Forward, comparison, matrix, document, invalid-route, title, and clipboard journeys.
- `docs/superpowers/specs/2026-08-11-shareable-routes-design.md`: records the approved design and the `matrix/all` preservation correction.
- `docs/superpowers/plans/2026-08-11-shareable-routes.md`: tracks this implementation.

### Task 1: Define and test the pure route contract

**Files:**

- Modify: `viewer-logic.js`
- Modify: `test/viewer-logic.test.js`
- Modify: `docs/superpowers/specs/2026-08-11-shareable-routes-design.md`

**Interfaces:**

- Produces: `parseViewerRoute(hash) -> ViewerRoute`, where invalid input returns `{ type: 'invalid' }`.
- Produces: `formatViewerRoute(route) -> string | null`, returning a canonical hash or `null` for an unsupported object.
- Produces: `roleRouteFromFile(file) -> { type: 'role', domain, role } | null`.
- Route shapes are `{ type: 'home' }`, `{ type: 'role', domain, role }`, `{ type: 'compare', first: { domain, role }, second: { domain, role } }`, `{ type: 'matrix', domain }`, `{ type: 'doc', id }`, and `{ type: 'invalid' }`.

- [x] **Step 1: Add failing route-contract tests**

Add the three planned helpers to the destructured import in `test/viewer-logic.test.js`, then append:

```js
test('viewer routes parse every supported canonical shape', () => {
    assert.deepEqual(parseViewerRoute('#/'), { type: 'home' });
    assert.deepEqual(parseViewerRoute('#/role/kubernetes/kubernetes_architect'), {
        type: 'role', domain: 'kubernetes', role: 'kubernetes_architect',
    });
    assert.deepEqual(parseViewerRoute(
        '#/compare/kubernetes/kubernetes_architect/kubernetes/kubernetes_engineer',
    ), {
        type: 'compare',
        first: { domain: 'kubernetes', role: 'kubernetes_architect' },
        second: { domain: 'kubernetes', role: 'kubernetes_engineer' },
    });
    assert.deepEqual(parseViewerRoute('#/matrix/all'), { type: 'matrix', domain: 'all' });
    assert.deepEqual(parseViewerRoute('#/matrix/kubernetes'), { type: 'matrix', domain: 'kubernetes' });
    assert.deepEqual(parseViewerRoute('#/doc/skills-progression'), {
        type: 'doc', id: 'skills-progression',
    });
});

test('viewer routes normalize case and percent-encoded segments', () => {
    assert.deepEqual(parseViewerRoute('#/ROLE/Cloud%5FPlatforms/Cloud%5FArchitect'), {
        type: 'role', domain: 'cloud_platforms', role: 'cloud_architect',
    });
    assert.equal(formatViewerRoute({
        type: 'doc', id: 'Skills Progression',
    }), '#/doc/skills%20progression');
});

test('viewer routes reject malformed and incomplete hashes', () => {
    for (const hash of [
        '', '#', '#/role/kubernetes', '#/role/kubernetes/a/extra',
        '#/compare/kubernetes/a/kubernetes', '#/matrix', '#/doc',
        '#/unknown/value', '#/role/%E0%A4%A/value',
    ]) {
        assert.deepEqual(parseViewerRoute(hash), { type: 'invalid' }, hash);
    }
});

test('formatViewerRoute round-trips supported routes', () => {
    const routes = [
        { type: 'home' },
        { type: 'role', domain: 'kubernetes', role: 'kubernetes_architect' },
        {
            type: 'compare',
            first: { domain: 'kubernetes', role: 'kubernetes_architect' },
            second: { domain: 'kubernetes', role: 'kubernetes_engineer' },
        },
        { type: 'matrix', domain: 'all' },
        { type: 'doc', id: 'skills-progression' },
    ];
    for (const route of routes) {
        assert.deepEqual(parseViewerRoute(formatViewerRoute(route)), route);
    }
    assert.equal(formatViewerRoute({ type: 'unknown' }), null);
});

test('roleRouteFromFile accepts only canonical role Markdown paths', () => {
    assert.deepEqual(roleRouteFromFile('Roles/kubernetes/kubernetes_architect.md'), {
        type: 'role', domain: 'kubernetes', role: 'kubernetes_architect',
    });
    assert.deepEqual(roleRouteFromFile('Roles\\kubernetes\\kubernetes_engineer.md'), {
        type: 'role', domain: 'kubernetes', role: 'kubernetes_engineer',
    });
    assert.equal(roleRouteFromFile('docs/SKILLS_PROGRESSION.md'), null);
    assert.equal(roleRouteFromFile('Roles/kubernetes/README.md'), null);
});
```

- [x] **Step 2: Run the focused test and confirm RED**

Run: `node --test test/viewer-logic.test.js`

Expected: FAIL because the three route helpers are not exported.

- [x] **Step 3: Implement the route grammar**

Add before the export object in `viewer-logic.js`:

```js
function routeSegment(value) {
    const text = String(value == null ? '' : value).trim().toLowerCase();
    return text ? encodeURIComponent(text) : null;
}

function decodeRouteSegments(hash) {
    if (hash === '#/' || hash === '/') return [];
    const raw = String(hash == null ? '' : hash).replace(/^#/, '');
    if (!raw.startsWith('/') || raw.endsWith('/')) return null;
    try {
        const parts = raw.slice(1).split('/').map(part => decodeURIComponent(part).trim().toLowerCase());
        return parts.every(Boolean) ? parts : null;
    } catch {
        return null;
    }
}

function parseViewerRoute(hash) {
    const parts = decodeRouteSegments(hash);
    if (!parts) return { type: 'invalid' };
    if (parts.length === 0) return { type: 'home' };
    if (parts[0] === 'role' && parts.length === 3) {
        return { type: 'role', domain: parts[1], role: parts[2] };
    }
    if (parts[0] === 'compare' && parts.length === 5) {
        return {
            type: 'compare',
            first: { domain: parts[1], role: parts[2] },
            second: { domain: parts[3], role: parts[4] },
        };
    }
    if (parts[0] === 'matrix' && parts.length === 2) {
        return { type: 'matrix', domain: parts[1] };
    }
    if (parts[0] === 'doc' && parts.length === 2) {
        return { type: 'doc', id: parts[1] };
    }
    return { type: 'invalid' };
}

function formatViewerRoute(route) {
    if (!route || route.type === 'invalid') return null;
    if (route.type === 'home') return '#/';
    if (route.type === 'role') {
        const domain = routeSegment(route.domain);
        const role = routeSegment(route.role);
        return domain && role ? `#/role/${domain}/${role}` : null;
    }
    if (route.type === 'compare') {
        const values = [route.first?.domain, route.first?.role, route.second?.domain, route.second?.role]
            .map(routeSegment);
        return values.every(Boolean) ? `#/compare/${values.join('/')}` : null;
    }
    if (route.type === 'matrix') {
        const domain = routeSegment(route.domain);
        return domain ? `#/matrix/${domain}` : null;
    }
    if (route.type === 'doc') {
        const id = routeSegment(route.id);
        return id ? `#/doc/${id}` : null;
    }
    return null;
}

function roleRouteFromFile(file) {
    const normalized = String(file == null ? '' : file).replace(/\\/g, '/');
    const match = normalized.match(/^Roles\/([^/]+)\/([^/]+)\.md$/i);
    if (!match || match[2].toLowerCase() === 'readme') return null;
    return { type: 'role', domain: match[1].toLowerCase(), role: match[2].toLowerCase() };
}
```

Export `parseViewerRoute`, `formatViewerRoute`, and `roleRouteFromFile` from the returned object.

- [x] **Step 4: Run the focused test and confirm GREEN**

Run: `node --test test/viewer-logic.test.js`

Expected: all viewer-logic tests PASS.

- [x] **Step 5: Commit the pure contract and approved matrix correction**

```powershell
git add -- viewer-logic.js test/viewer-logic.test.js docs/superpowers/specs/2026-08-11-shareable-routes-design.md
git commit -m "feat: define viewer route contract"
```

### Task 2: Route the existing durable views

**Files:**

- Modify: `index.html`
- Create: `test/browser/routing.spec.js`

**Interfaces:**

- Consumes: `parseViewerRoute`, `formatViewerRoute`, and `roleRouteFromFile` from Task 1.
- Produces: `navigateToRoute(route, options?)`, `applyCurrentRoute()`, `resolveRoleRoute(route)`, `showHomeView(options?)`, and `copyCurrentLink()` in the browser script.
- Produces: stable registered resource entries shaped as `{ routeId, group, file, icon, title }`.

- [x] **Step 1: Add failing direct-route browser tests**

Create `test/browser/routing.spec.js`:

```js
const { test, expect } = require('@playwright/test');

const architect = '#/role/kubernetes/kubernetes_architect';
const engineer = '#/role/kubernetes/kubernetes_engineer';

async function expectArchitect(page) {
  await expect(page.locator('#roleHeader').getByRole('heading', {
    name: 'Kubernetes Architect',
  })).toBeVisible();
  await expect(page).toHaveTitle('Kubernetes Architect — IT Roles Library');
}

test('direct role route and reload restore the same role', async ({ page }) => {
  await page.goto('/' + architect);
  await expectArchitect(page);
  await page.reload();
  await expect(page).toHaveURL(new RegExp(architect.replaceAll('/', '\\/')));
  await expectArchitect(page);
});

test('Back and Forward replay role routes without a blank panel', async ({ page }) => {
  await page.goto('/' + architect);
  await expectArchitect(page);
  await page.evaluate(hash => { location.hash = hash; }, engineer);
  await expect(page.locator('#roleHeader').getByRole('heading', {
    name: 'Kubernetes Engineer',
  })).toBeVisible();
  await page.goBack();
  await expectArchitect(page);
  await page.goForward();
  await expect(page.locator('#roleHeader').getByRole('heading', {
    name: 'Kubernetes Engineer',
  })).toBeVisible();
});

test('comparison, matrix, and document routes restore contextual views', async ({ page }) => {
  await page.goto('/#/compare/kubernetes/kubernetes_architect/kubernetes/kubernetes_engineer');
  await expect(page.locator('#roleHeader').getByRole('heading', {
    name: 'Kubernetes Architect',
  })).toBeVisible();
  await expect(page.locator('#roleHeader2').getByRole('heading', {
    name: 'Kubernetes Engineer',
  })).toBeVisible();
  await expect(page).toHaveTitle('Kubernetes Architect vs Kubernetes Engineer — IT Roles Library');

  await page.goto('/#/matrix/kubernetes');
  await expect(page.getByRole('heading', { name: 'Kubernetes Role Matrix' })).toBeVisible();
  await expect(page).toHaveTitle('Kubernetes Matrix — IT Roles Library');

  await page.goto('/#/doc/skills-progression');
  await expect(page.locator('#docHeader').getByRole('heading', {
    name: /Career Paths & Skills Progression/,
  })).toBeVisible();
  await expect(page).toHaveTitle('Career Paths & Skills Progression — IT Roles Library');
});

test('invalid routes preserve the hash and show a safe fallback', async ({ page }) => {
  await page.goto('/#/role/kubernetes/not-a-role');
  await expect(page.getByRole('heading', { name: 'Select a role to view' })).toBeVisible();
  await expect(page.getByRole('alert')).toContainText('could not be found');
  await expect(page).toHaveURL(/#\/role\/kubernetes\/not-a-role$/);
  await expect(page).toHaveTitle('IT Roles Library');
});
```

- [x] **Step 2: Run one local Chromium project and confirm RED**

Run: `npx playwright test test/browser/routing.spec.js --project=chromium`

Expected: FAIL because direct hashes are not applied and titles remain generic. If Chromium itself cannot launch locally, record that environment failure once and continue with Node tests plus hosted CI; do not substitute repeated Firefox retries.

- [x] **Step 3: Register stable document IDs and route controls**

Add `routeId` to every `RESOURCES` entry using these exact values:

```js
const RESOURCE_ROUTE_IDS = [
    'chapters-overview',
    'skills-progression',
    'domain-interactions',
    'technology-radar',
    'skills-matrix',
    'onboarding-template',
    'onboarding-engineer',
    'onboarding-senior-engineer',
    'onboarding-architect',
    'onboarding-product-owner',
    'onboarding-chapter-lead',
];
```

Apply those values in current `RESOURCES` order. Add the Task 1 helpers to the `ViewerLogic` destructuring declaration.

In the header actions, add:

```html
<button class="btn-ghost" id="copyLinkBtn" onclick="copyCurrentLink()"
        aria-label="Copy link to this view" style="display:none">🔗 Copy link</button>
<span id="copyLinkStatus" class="sr-only" role="status" aria-live="polite"></span>
```

At the start of `#welcomeState`, add:

```html
<div id="routeStatus" class="empty-msg" role="alert" hidden></div>
```

- [x] **Step 4: Add the central route controller**

Add browser state and helpers near the current viewer state:

```js
const APP_TITLE = 'IT Roles Library';
let routeRevision = 0;
let appliedHash = null;
let currentRoute = { type: 'home' };
let activeMatrixDomain = 'all';

function resolveRoleRoute(route) {
    const domain = allDomains[route.domain];
    if (!domain) return null;
    const role = domain.roles.find(item => item.name.toLowerCase() === route.role);
    return role ? { ...role, domainLabel: domain.label } : null;
}

function resourceForRoute(id) {
    return RESOURCES.find(resource => resource.routeId === id) || null;
}

function titleForView(text) {
    document.title = text ? `${text} — ${APP_TITLE}` : APP_TITLE;
}

function navigateToRoute(route, { replace = false } = {}) {
    const hash = formatViewerRoute(route);
    if (!hash) return;
    const currentIndex = Number.isInteger(history.state?.docItRolesIndex)
        ? history.state.docItRolesIndex : 0;
    const state = { docItRolesIndex: replace ? currentIndex : currentIndex + 1 };
    if (replace) history.replaceState(state, '', hash);
    else history.pushState(state, '', hash);
    applyCurrentRoute();
}
```

Implement `applyCurrentRoute()` with this exact resolution order:

```js
async function applyCurrentRoute() {
    const hash = location.hash || '#/';
    const route = parseViewerRoute(hash);
    const revision = ++routeRevision;
    appliedHash = hash;
    currentRoute = route;

    if (route.type === 'home') {
        showHomeView();
        return;
    }
    if (route.type === 'role') {
        const role = resolveRoleRoute(route);
        if (!role) { showHomeView({ invalid: true }); return; }
        await renderRoleView(role, revision);
        if (revision === routeRevision) titleForView(role.title);
        return;
    }
    if (route.type === 'compare') {
        const first = resolveRoleRoute(route.first);
        const second = resolveRoleRoute(route.second);
        if (!first || !second || first.file === second.file) {
            showHomeView({ invalid: true });
            return;
        }
        await renderRoleView(first, revision);
        if (revision !== routeRevision) return;
        await renderCompareRoleView(second, revision);
        if (revision === routeRevision) titleForView(`${first.title} vs ${second.title}`);
        return;
    }
    if (route.type === 'matrix') {
        if (route.domain !== 'all' && !allDomains[route.domain]) {
            showHomeView({ invalid: true });
            return;
        }
        renderMatrixView(route.domain);
        const label = route.domain === 'all' ? 'Role' : allDomains[route.domain].label;
        titleForView(`${label} Matrix`);
        return;
    }
    if (route.type === 'doc') {
        const resource = resourceForRoute(route.id);
        if (!resource) { showHomeView({ invalid: true }); return; }
        await renderDocView(resource, revision);
        if (revision === routeRevision) titleForView(resource.title);
        return;
    }
    showHomeView({ invalid: true });
}
```

`showHomeView({ invalid = false } = {})` must perform the existing `goHome` DOM reset without writing history, set the default title, hide `#copyLinkBtn`, and show `#routeStatus` with `The requested view could not be found.` only when invalid.

- [x] **Step 5: Separate route entry from view rendering**

Refactor the existing durable functions without changing their rendering markup:

```js
function openRole(file) {
    const route = roleRouteFromFile(file);
    if (route) navigateToRoute(route);
}

async function renderRoleView(role, revision) {
    const { file, title, level, domainLabel } = role;
    closeSidebar();
    recordRecent(file, title, level, domainLabel);
    activeFile = file;
    activeDoc = null;
    activeChapter = null;
    compareMode = false;
    compareFile = null;
    closePanels();

    document.getElementById('roleView2').style.display = 'none';
    document.getElementById('rolesGrid').classList.remove('comparing');
    document.getElementById('docView').style.display = 'none';
    document.getElementById('rolesGrid').style.display = '';
    renderSidebar(allDomains, document.getElementById('searchInput').value);
    document.getElementById('welcomeState').style.display = 'none';
    document.getElementById('chapterView').style.display = 'none';
    document.getElementById('roleView').style.display = '';
    document.getElementById('roleView').classList.add('show');
    document.getElementById('roleHeader').innerHTML =
        buildHeader(title, level, domainLabel, null, 'A');
    document.getElementById('careerStepper').hidden = true;
    document.getElementById('roleBody').innerHTML =
        '<div class="loading"><div class="spinner"></div> Loading…</div>';

    try {
        const res = await fetch(`/api/role?file=${encodeURIComponent(file)}`);
        const markdown = await res.text();
        if (revision !== routeRevision) return;
        const meta = parseRoleMeta(markdown);
        document.getElementById('roleHeader').innerHTML =
            buildHeader(title, level, domainLabel, meta.lastReviewed, 'A', meta);
        const h2idx = markdown.indexOf('\n## ');
        const body = h2idx > -1 ? markdown.slice(h2idx + 1) : markdown;
        document.getElementById('roleBody').innerHTML = renderMarkdown(body);
        linkInteractionRoles(document.getElementById('roleBody'), title);
        collapseSections(document.getElementById('roleBody'));
        buildSectionNav(document.getElementById('roleBody'),
            document.getElementById('sectionNav'), document.getElementById('mainArea'));
        renderCareerStepper(markdown, title);
        document.getElementById('mainArea').scrollTop = 0;
        lastMarkdown = markdown;
        lastMarkdownTitle = title;
    } catch {
        if (revision === routeRevision) {
            document.getElementById('roleBody').innerHTML =
                '<div class="empty-msg">⚠️ Failed to load role content.</div>';
        }
    }
}

function openDoc(file) {
    const resource = RESOURCES.find(item => item.file === file);
    if (resource) navigateToRoute({ type: 'doc', id: resource.routeId });
    else renderTransientDocView(file);
}

async function renderDocView(resource, revision) {
    const { file, title } = resource;
    closeSidebar();
    activeDoc = file;
    activeDocTitle = title;
    activeFile = null;
    activeChapter = null;
    compareMode = false;
    compareFile = null;
    document.getElementById('roleView2').style.display = 'none';
    document.getElementById('rolesGrid').classList.remove('comparing');
    document.getElementById('rolesGrid').style.display = 'none';
    document.getElementById('roleView').classList.remove('show');
    document.getElementById('welcomeState').style.display = 'none';
    document.getElementById('chapterView').style.display = 'none';
    resetPanels();
    renderSidebar(allDomains, document.getElementById('searchInput').value);
    document.getElementById('docView').style.display = 'block';
    document.getElementById('docHeader').innerHTML = `
        <div class="role-header-row">
            <h1>📖 ${escapeHtml(title)}</h1>
            <div class="role-actions">
                <button class="btn-action" onclick="printRole()">🖨️ Print</button>
            </div>
        </div>
        <div class="role-meta"><span class="doc-tag">📚 Reference Document</span></div>`;
    document.getElementById('docBody').innerHTML =
        '<div class="loading"><div class="spinner"></div> Loading…</div>';
    try {
        const endpoint = file.startsWith('Roles/') ? '/api/role' : '/api/doc';
        const res = await fetch(`${endpoint}?file=${encodeURIComponent(file)}`);
        const markdown = await res.text();
        if (revision !== routeRevision) return;
        document.getElementById('docBody').innerHTML = renderMarkdown(markdown);
        document.getElementById('mainArea').scrollTop = 0;
        lastMarkdown = markdown;
        lastMarkdownTitle = title;
    } catch {
        if (revision === routeRevision) {
            document.getElementById('docBody').innerHTML =
                '<div class="empty-msg">⚠️ Failed to load document.</div>';
        }
    }
}

function openCompareRole(file) {
    const first = roleRouteFromFile(activeFile);
    const second = roleRouteFromFile(file);
    if (first && second) navigateToRoute({ type: 'compare', first, second });
}
```

Preserve current caller signatures by accepting unused title/level/domain arguments on `openRole`, `openCompareRole`, and `openDoc` until all inline handlers and delegated listeners are migrated. `renderTransientDocView(file, title)` retains current behavior for domain-local standards documents and sets the contextual title without creating a public document route.

Change `closeComparison()` to navigate to `roleRouteFromFile(activeFile)`. Change `goHome()` to call `navigateToRoute({ type: 'home' })`. Change the Home link to `href="#/"`.

Change `renderMatrix(domains)` to `renderMatrix(domains, domainKey = 'all')`; create `visibleDomains` as either `domains` or `{ [domainKey]: domains[domainKey] }`, and use it for levels, rows, counts, and heading text. `renderMatrixView(domainKey)` sets `activeMatrixDomain`, opens the matrix panel without another navigation write, and shows `Kubernetes Role Matrix` for the Kubernetes route. The Matrix header button navigates to `{ type: 'matrix', domain: 'all' }` when opening and `{ type: 'home' }` when closing.

- [x] **Step 6: Wire initial load and browser history**

At the end of successful `init()`:

```js
if (!Number.isInteger(history.state?.docItRolesIndex)) {
    history.replaceState({ docItRolesIndex: 0 }, '', location.href);
}
if (!location.hash) history.replaceState(history.state, '', '#/');
await applyCurrentRoute();
```

Register:

```js
window.addEventListener('popstate', () => applyCurrentRoute());
window.addEventListener('hashchange', () => {
    if (location.hash !== appliedHash) applyCurrentRoute();
});
```

Replace the private `backStack`, `captureView`, `pushHistory`, and `restoringView` machinery. `goBack()` calls `history.back()` only when `history.state.docItRolesIndex > 0`; otherwise it navigates to home. Show the header Back control when the current state index is above zero.

- [x] **Step 7: Implement Copy link feedback**

Add:

```js
async function copyCurrentLink() {
    const status = document.getElementById('copyLinkStatus');
    try {
        await navigator.clipboard.writeText(location.href);
        status.textContent = 'Link copied.';
    } catch {
        status.textContent = 'Could not copy the link.';
    }
}
```

Show `#copyLinkBtn` after successfully resolving role, comparison, matrix, and registered-document routes. Hide it for home, invalid, and transient views.

- [x] **Step 8: Run focused tests and confirm GREEN**

Run: `node --test test/viewer-logic.test.js`

Expected: PASS.

Run: `npx playwright test test/browser/routing.spec.js --project=chromium`

Expected: all routing tests PASS, or one recorded local browser-launch environment failure with no repeated local retries.

- [x] **Step 9: Commit the routed viewer**

```powershell
git add -- index.html test/browser/routing.spec.js
git commit -m "feat: add shareable viewer routes"
```

### Task 3: Complete browser coverage and verify delivery

**Files:**

- Modify: `test/browser/routing.spec.js`
- Modify: `docs/superpowers/plans/2026-08-11-shareable-routes.md`

**Interfaces:**

- Consumes: the route controller and Copy link action from Task 2.
- Produces: acceptance evidence for direct links, reload, browser history, titles, invalid routes, and canonical copied URLs.

- [x] **Step 1: Add UI-navigation and clipboard tests**

Append to `test/browser/routing.spec.js`:

```js
test('viewer actions create canonical role and comparison URLs', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('Kubernetes Architect');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^Kubernetes Architect\b/,
  }).click();
  await expect(page).toHaveURL(/#\/role\/kubernetes\/kubernetes_architect$/);

  await page.getByRole('button', { name: 'Compare with another role' }).click();
  await search.fill('Kubernetes Engineer');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^Kubernetes Engineer\b/,
  }).click();
  await expect(page).toHaveURL(
    /#\/compare\/kubernetes\/kubernetes_architect\/kubernetes\/kubernetes_engineer$/,
  );
  await page.getByRole('button', { name: 'Close comparison' }).click();
  await expect(page).toHaveURL(/#\/role\/kubernetes\/kubernetes_architect$/);
});

test('Copy link writes the canonical absolute route and announces success', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: value => { window.__copiedViewerLink = value; } },
    });
  });
  await page.goto('/#/role/kubernetes/kubernetes_architect');
  await expectArchitect(page);
  await page.getByRole('button', { name: 'Copy link to this view' }).click();
  await expect(page.getByRole('status')).toHaveText('Link copied.');
  await expect.poll(() => page.evaluate(() => window.__copiedViewerLink)).toMatch(
    /#\/role\/kubernetes\/kubernetes_architect$/,
  );
});
```

- [x] **Step 2: Run the focused browser spec and confirm behavior**

Run: `npx playwright test test/browser/routing.spec.js --project=chromium`

Expected: all routing tests PASS. If Step 1 exposes a product gap, keep the failing test, make only the controller or event-binding correction it demonstrates, and rerun this command once.

- [x] **Step 3: Run the fast repository checks**

Run: `npm test`

Expected: all Node tests PASS with zero failures.

Run: `npm run validate`

Expected: exit code 0 with no validation errors; the existing known KPI warnings may remain.

Run: `npm run check-counts`

Expected: exit code 0 and committed counts match the catalogue.

- [x] **Step 4: Run the available local browser suite once**

Run: `npx playwright test --project=chromium`

Result: all 15 Chromium journeys passed. Local Firefox and WebKit were not run;
hosted PR checks decide three-engine acceptance, as required by the approved
design and the user's explicit instruction not to retry local Firefox.

- [x] **Step 5: Check scope and whitespace**

Run: `git diff origin/main...HEAD --check`

Expected: no output and exit code 0.

Run: `git status --short --branch`

Expected: clean `codex/181-shareable-routes` branch.

Run: `git diff --stat origin/main...HEAD`

Expected: only the approved specification, plan, `viewer-logic.js`, `test/viewer-logic.test.js`, `index.html`, and `test/browser/routing.spec.js` are changed.

- [x] **Step 6: Reconcile every #181 acceptance criterion**

Confirm with fresh evidence:

```text
[x] Every catalogue role derives a stable direct URL from its file identity.
[x] Reload restores role, comparison, matrix, and registered-document views.
[x] Back and Forward replay viewer state without blank panels.
[x] Role and document views have contextual titles.
[x] Invalid route identifiers retain their hash and show a safe fallback.
[x] Automated Node and browser tests cover route parsing and reload behavior.
[x] Copy link exposes the canonical absolute URL with accessible feedback.
```

- [x] **Step 7: Commit any final test-only additions**

If Step 1 added tests after the Task 2 commit, commit them:

```powershell
git add -- test/browser/routing.spec.js docs/superpowers/plans/2026-08-11-shareable-routes.md
git commit -m "test: cover viewer route journeys"
```

If both files were already committed unchanged, do not create an empty commit.
