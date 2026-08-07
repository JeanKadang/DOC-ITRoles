# Browser Journey and Accessibility Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reproducible Chromium, Firefox, and WebKit smoke tests for the catalogue's critical browser journeys and serious/critical accessibility regressions.

**Architecture:** Playwright starts the existing Node server on an isolated port and runs three browser projects against the served application. Focused specifications cover catalogue loading, search, comparison, responsive navigation, keyboard operation, and axe scans; the existing `node:test` suite stays separate and fast. A dedicated ten-minute GitHub Actions job installs the locked development dependencies and uploads diagnostics only on failure.

**Tech Stack:** Node.js 18+, CommonJS, Playwright Test 1.62.1, `@axe-core/playwright` 4.12.1, GitHub Actions

## Global Constraints

- Keep `npm test` as the Node-only suite; browser tests run only through `npm run test:browser`.
- Run every browser specification in Chromium, Firefox, and WebKit with no silent browser-specific skips.
- Use accessible roles, names, labels, headings, and visible text before CSS selectors; add no test ID unless semantic locators cannot identify the element.
- Use observable-state assertions and Playwright auto-waiting; add no fixed sleeps.
- Use the committed catalogue and stable Kubernetes roles; make no network request outside the local application during tests.
- Fail axe scans only for `serious` and `critical` impacts, while attaching all lower-impact findings to the report.
- Keep Playwright and axe as exact, development-only dependencies and commit `package-lock.json`; add no production runtime dependency.
- Keep deep-link and reload routing coverage out of this issue because it belongs to #181.
- Give the dedicated CI browser job `timeout-minutes: 10` and retain failure artifacts for seven days.
- Make no frontend framework, build-system, or production-server architecture change.

## File structure

- `playwright.config.js`: owns browser projects, the isolated server lifecycle, diagnostics, retries, and reporters.
- `test/browser/catalogue.spec.js`: owns the home-count, exact-title search, role-opening, and compare journeys.
- `test/browser/navigation.spec.js`: owns narrow-screen drawer behavior and representative keyboard/focus journeys.
- `test/browser/accessibility.spec.js`: owns axe scanning, severity filtering, and report attachments.
- `package.json` and `package-lock.json`: own the separate browser command and exact development dependency graph.
- `.gitignore`: excludes Playwright's generated local reports and test results.
- `.github/workflows/ci.yml`: owns the bounded, dedicated browser job and failure artifact upload.
- `README.md`: documents local browser-test setup and the CI browser gate.

---

### Task 1: Browser harness and live catalogue counts

**Files:**

- Create: `playwright.config.js`
- Create: `test/browser/catalogue.spec.js`
- Create: `package-lock.json` through npm
- Modify: `package.json`
- Modify: `.gitignore`

**Interfaces:**

- Consumes: `node server.js`, `PORT`, `/api/roles`, and the welcome screen rendered by `index.html`.
- Produces: `npm run test:browser`; Playwright projects named `chromium`, `firefox`, and `webkit`; a shared `baseURL`; generated diagnostics under `test-results/` and `playwright-report/`.

- [ ] **Step 1: Write the home-count journey before the harness exists**

Create `test/browser/catalogue.spec.js`:

```javascript
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('home page shows the live catalogue totals', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Select a role to view' })).toBeVisible();

  const cards = page.locator('#statsCards .stat-card');
  const totalRoles = cards.filter({ has: page.getByText('Total Roles', { exact: true }) });
  const chapters = cards.filter({ has: page.getByText('Chapters', { exact: true }) });
  const domains = cards.filter({ has: page.getByText('Domains', { exact: true }) });

  await expect(totalRoles).toContainText('226');
  await expect(chapters).toContainText('7');
  await expect(domains).toContainText('34');
});
```

- [ ] **Step 2: Run the missing browser command to establish the red state**

Run: `npm run test:browser -- --project=chromium test/browser/catalogue.spec.js`

Expected: FAIL with `Missing script: "test:browser"`.

- [ ] **Step 3: Install and lock the exact development dependencies**

Run:

```powershell
npm install --save-dev --save-exact @playwright/test@1.62.1 @axe-core/playwright@4.12.1
```

Expected: `package.json` gains exact `devDependencies`, `package-lock.json` is created, and `dependencies` remains empty.

Add the browser script to `package.json` without changing the existing `test` script:

```json
"scripts": {
  "start": "node server.js",
  "test": "node --test",
  "test:browser": "playwright test",
  "validate": "node validate-roles.js"
},
"dependencies": {},
"devDependencies": {
  "@axe-core/playwright": "4.12.1",
  "@playwright/test": "1.62.1"
}
```

- [ ] **Step 4: Configure all three browsers and the managed test server**

Create `playwright.config.js`:

```javascript
const { defineConfig, devices } = require('@playwright/test');

const testPort = process.env.PLAYWRIGHT_PORT || '4173';
const baseURL = `http://127.0.0.1:${testPort}`;

module.exports = defineConfig({
  testDir: './test/browser',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['line'], ['html', { outputFolder: 'playwright-report', open: 'never' }]]
    : 'list',
  outputDir: 'test-results',
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node server.js',
    url: `${baseURL}/api/roles`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { ...process.env, PORT: testPort },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

- [ ] **Step 5: Ignore only generated browser-test output**

Append to `.gitignore`:

```gitignore

# Playwright browser-test output
playwright-report/
test-results/
```

- [ ] **Step 6: Install the three local browser binaries**

Run: `npx playwright install chromium firefox webkit`

Expected: Chromium, Firefox, and WebKit revisions matching Playwright 1.62.1 are available locally.

- [ ] **Step 7: Run the home journey in every browser**

Run: `npm run test:browser -- test/browser/catalogue.spec.js`

Expected: PASS with three executions of `home page shows the live catalogue totals`, one per browser project.

- [ ] **Step 8: Prove the Node suite remains separate**

Run: `npm test`

Expected: PASS with the existing 233 Node tests and no Playwright browser launch.

- [ ] **Step 9: Commit the harness and first journey**

```powershell
git add -- .gitignore package.json package-lock.json playwright.config.js test/browser/catalogue.spec.js
git commit -m "test: add Playwright browser harness"
```

---

### Task 2: Exact-title search, role opening, and comparison

**Files:**

- Modify: `test/browser/catalogue.spec.js`

**Interfaces:**

- Consumes: the `page` fixture and `baseURL` from `playwright.config.js`; the accessible `Search roles`, `Compare with another role`, and `Close comparison` controls from `index.html`.
- Produces: browser coverage for #182's exact-title reconciliation and the complete two-role compare lifecycle.

- [ ] **Step 1: Add the search journey**

Append inside `test/browser/catalogue.spec.js`:

```javascript
test('search opens a known role without duplicating its exact title', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  const searchResponse = page.waitForResponse(response =>
    response.url().includes('/api/search?q=Kubernetes%20Architect') && response.ok());

  await search.fill('Kubernetes Architect');
  await searchResponse;

  const exactRole = page.getByRole('button', { name: /Kubernetes Architect/ });
  await expect(exactRole).toHaveCount(1);
  await expect(page.locator('#contentMatches').getByText('Kubernetes Architect', { exact: true })).toHaveCount(0);

  await exactRole.click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Kubernetes Architect' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Compare with another role' })).toBeVisible();
});
```

- [ ] **Step 2: Run only the new search journey and observe the current gap**

Run: `npm run test:browser -- test/browser/catalogue.spec.js --project=chromium --grep "search opens"`

Expected: PASS if #182 and current role opening are integrated correctly. If it fails, preserve the trace and correct only an inaccurate semantic locator; do not change product behavior under #183.

- [ ] **Step 3: Add the comparison lifecycle journey**

Append inside `test/browser/catalogue.spec.js`:

```javascript
test('compare mode opens a second role and closes cleanly', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('Kubernetes Architect');
  await page.getByRole('button', { name: /Kubernetes Architect/ }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Kubernetes Architect' })).toBeVisible();

  await page.getByRole('button', { name: 'Compare with another role' }).click();
  await expect(page.getByText('Click a role to compare', { exact: false })).toBeVisible();

  await search.fill('Kubernetes Engineer');
  await page.getByRole('button', { name: /Kubernetes Engineer/ }).click();
  await expect(page.locator('#roleHeader2').getByRole('heading', { name: 'Kubernetes Engineer' })).toBeVisible();
  await expect(page.locator('#rolesGrid')).toHaveClass(/comparing/);

  await page.getByRole('button', { name: 'Close comparison' }).click();
  await expect(page.locator('#roleView2')).toBeHidden();
  await expect(page.locator('#rolesGrid')).not.toHaveClass(/comparing/);
});
```

- [ ] **Step 4: Run the comparison journey in Chromium**

Run: `npm run test:browser -- test/browser/catalogue.spec.js --project=chromium --grep "compare mode"`

Expected: PASS; the primary header remains `Kubernetes Architect`, the second header becomes `Kubernetes Engineer`, and closing comparison hides the second column.

- [ ] **Step 5: Run every catalogue journey in all browser engines**

Run: `npm run test:browser -- test/browser/catalogue.spec.js`

Expected: PASS for home, search, and compare in Chromium, Firefox, and WebKit.

- [ ] **Step 6: Commit the catalogue journeys**

```powershell
git add -- test/browser/catalogue.spec.js
git commit -m "test: cover search and role comparison"
```

---

### Task 3: Narrow-screen navigation and keyboard focus

**Files:**

- Create: `test/browser/navigation.spec.js`

**Interfaces:**

- Consumes: Playwright's `page` fixture; the existing `Show role navigation`, `Search roles`, chapter, domain, role, and `Toggle dark mode` controls.
- Produces: narrow-viewport drawer assertions and keyboard activation/focus coverage across chapter, domain, role, and native button controls.

- [ ] **Step 1: Write the narrow-screen drawer journey**

Create `test/browser/navigation.spec.js`:

```javascript
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('narrow-screen navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('drawer manages expanded state, focus, role opening, and closure', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Show role navigation' });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const search = page.getByRole('textbox', { name: 'Search roles' });
    await expect(search).toBeFocused();
    await search.fill('Kubernetes Architect');

    await page.getByRole('button', { name: /Kubernetes Architect/ }).click();
    await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Kubernetes Architect' })).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
    await expect(page.getByRole('navigation', { name: 'Role navigation' })).not.toHaveClass(/open/);
  });
});
```

- [ ] **Step 2: Run the drawer journey in Chromium**

Run: `npm run test:browser -- test/browser/navigation.spec.js --project=chromium --grep "drawer manages"`

Expected: PASS at 375px width; opening focuses search and role navigation closes with focus returned to its toggle.

- [ ] **Step 3: Add representative keyboard activation and visible-focus assertions**

Append to `test/browser/navigation.spec.js` after the narrow-screen `describe` block:

```javascript
test('keyboard activates chapter, domain, role, and header controls', async ({ page }) => {
  const chapter = page.locator('#ch-cloud_platform_infra').getByRole('button').first();
  await chapter.focus();
  await expect(chapter).toBeFocused();
  expect(await chapter.evaluate(element => element.matches(':focus-visible'))).toBe(true);
  await chapter.press('Enter');
  await expect(chapter).toHaveAttribute('aria-expanded', 'true');

  const domain = page.locator('#dg-kubernetes').getByRole('button').first();
  await domain.focus();
  await expect(domain).toBeFocused();
  expect(await domain.evaluate(element => element.matches(':focus-visible'))).toBe(true);
  await domain.press('Space');
  await expect(domain).toHaveAttribute('aria-expanded', 'true');

  const role = page.getByRole('button', { name: /Kubernetes Architect/ });
  await role.focus();
  await expect(role).toBeFocused();
  expect(await role.evaluate(element => element.matches(':focus-visible'))).toBe(true);
  await role.press('Enter');
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Kubernetes Architect' })).toBeVisible();

  const theme = page.getByRole('button', { name: 'Toggle dark mode' });
  await theme.focus();
  await expect(theme).toBeFocused();
  await theme.press('Space');
  await expect(theme).toHaveAttribute('aria-pressed', 'true');
});
```

- [ ] **Step 4: Run the keyboard journey in Chromium**

Run: `npm run test:browser -- test/browser/navigation.spec.js --project=chromium --grep "keyboard activates"`

Expected: PASS with both custom `role="button"` elements and the native theme button responding to keyboard input.

- [ ] **Step 5: Run both navigation journeys in all browser engines**

Run: `npm run test:browser -- test/browser/navigation.spec.js`

Expected: PASS twice in each of Chromium, Firefox, and WebKit with no browser-specific skip.

- [ ] **Step 6: Commit responsive and keyboard coverage**

```powershell
git add -- test/browser/navigation.spec.js
git commit -m "test: cover responsive keyboard navigation"
```

---

### Task 4: Serious and critical accessibility gate

**Files:**

- Create: `test/browser/accessibility.spec.js`

**Interfaces:**

- Consumes: `AxeBuilder`, Playwright's `page` and `test.info()` APIs, the stable home screen, and the searchable `Kubernetes Architect` role.
- Produces: `scanForAccessibility(page, testInfo, stateName): Promise<void>`, which attaches all axe violations and fails only when impact is `serious` or `critical`.

- [ ] **Step 1: Write the accessibility scanner and both required state tests**

Create `test/browser/accessibility.spec.js`:

```javascript
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

async function scanForAccessibility(page, testInfo, stateName) {
  const results = await new AxeBuilder({ page }).analyze();

  if (results.violations.length > 0) {
    await testInfo.attach(`axe-${stateName}`, {
      body: Buffer.from(JSON.stringify(results.violations, null, 2)),
      contentType: 'application/json',
    });
  }

  const blocking = results.violations.filter(violation =>
    violation.impact === 'serious' || violation.impact === 'critical');
  const summary = blocking.map(violation => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    targets: violation.nodes.flatMap(node => node.target),
  }));

  expect(summary, `${stateName} has serious or critical axe violations`).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('home state has no serious or critical axe violations', async ({ page }, testInfo) => {
  await expect(page.getByRole('heading', { name: 'Select a role to view' })).toBeVisible();
  await scanForAccessibility(page, testInfo, 'home');
});

test('opened role has no serious or critical axe violations', async ({ page }, testInfo) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('Kubernetes Architect');
  await page.getByRole('button', { name: /Kubernetes Architect/ }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Kubernetes Architect' })).toBeVisible();

  await scanForAccessibility(page, testInfo, 'opened-role');
});
```

- [ ] **Step 2: Run both axe states in Chromium and inspect the complete result**

Run: `npm run test:browser -- test/browser/accessibility.spec.js --project=chromium`

Expected: PASS if neither state has a serious/critical violation. Any moderate/minor findings appear in the `axe-home` or `axe-opened-role` attachment; any serious/critical finding fails with rule IDs, help text, and target selectors.

- [ ] **Step 3: Handle a blocking finding through issue-first triage**

If Step 2 reports a serious or critical violation, use `github-issue-first` to create a linked GitHub issue containing the axe rule, affected state, browser, and target. Fix only a small semantic defect that is clearly required for #183; do not add `disableRules`, `exclude`, or impact suppression.

After an in-scope correction, rerun: `npm run test:browser -- test/browser/accessibility.spec.js --project=chromium`

Expected: PASS with the blocking finding corrected and lower-impact findings still attached.

- [ ] **Step 4: Run both axe states in all browser engines**

Run: `npm run test:browser -- test/browser/accessibility.spec.js`

Expected: PASS for home and opened-role scans in Chromium, Firefox, and WebKit with no exclusion.

- [ ] **Step 5: Commit the accessibility gate**

```powershell
git add -- test/browser/accessibility.spec.js
git commit -m "test: gate high-impact accessibility issues"
```

---

### Task 5: Dedicated CI job, documentation, and complete verification

**Files:**

- Modify: `.github/workflows/ci.yml`
- Modify: `README.md:213-248`

**Interfaces:**

- Consumes: the committed npm lockfile, `npm run test:browser`, Playwright's `playwright-report/` and `test-results/` paths, and the existing pinned checkout/setup-node actions.
- Produces: a blocking `Browser journeys (Chromium, Firefox, WebKit)` job with a ten-minute budget and failure-only diagnostics retained for seven days; documented local commands.

- [ ] **Step 1: Add the dedicated browser job**

Append this job under `jobs:` in `.github/workflows/ci.yml`, aligned with `test`, `validate`, and `markdownlint`:

```yaml
  browser:
    name: Browser journeys (Chromium, Firefox, WebKit)
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      # actions/checkout v7
      - uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0
      # actions/setup-node v6
      - uses: actions/setup-node@48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium firefox webkit
      - run: npm run test:browser
      # actions/upload-artifact v4
      - uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02
        if: ${{ failure() }}
        with:
          name: playwright-failure-${{ github.run_id }}
          path: |
            playwright-report/
            test-results/
          if-no-files-found: ignore
          retention-days: 7
```

- [ ] **Step 2: Document local browser setup and the new CI gate**

Insert after the existing Node testing paragraph in `README.md`:

````markdown
### Browser journey and accessibility tests

```powershell
npm ci
npx playwright install chromium firefox webkit
npm run test:browser
```

Playwright starts the local Node server automatically and runs the critical home,
search, compare, responsive-navigation, keyboard, and accessibility journeys in
Chromium, Firefox, and WebKit. Failure output is written to `test-results/`; the
HTML report is written to `playwright-report/` in CI.
````

Add this bullet to the continuous-integration list:

```markdown
- **Browser journeys** (`npm run test:browser`) — blocking; Chromium, Firefox,
  and WebKit share a ten-minute job budget, with failure diagnostics retained
  for seven days.
```

- [ ] **Step 3: Verify the workflow and documentation formatting**

Run: `npx --yes markdownlint-cli2@0.23.0 "**/*.md"`

Expected: `Summary: 0 error(s)`.

Run: `git diff --check`

Expected: no output and exit code 0.

- [ ] **Step 4: Run the complete browser suite**

Run: `npm run test:browser`

Expected: PASS for all seven test cases across Chromium, Firefox, and WebKit:
three catalogue cases, two navigation cases, and two accessibility states.
Playwright reports 21 passed executions because seven distinct tests run in
three projects.

- [ ] **Step 5: Run every existing repository gate**

Run: `npm test`

Expected: PASS with 233 tests, 0 failures, and no browser launch.

Run: `npm run validate`

Expected: exit code 0, 0 files with errors, 199 files with existing warnings, and 0 duplicate titles.

Run: `npm run check-counts`

Expected: exit code 0 with 226 roles, 34 domains, and 7 chapters matching `README.md`.

- [ ] **Step 6: Review the final scope and generated-file boundary**

Run: `git status --short`

Expected: only `.github/workflows/ci.yml` and `README.md` are uncommitted at this task; `playwright-report/` and `test-results/` remain ignored. Across the complete branch, only the approved specification, this plan, `.gitignore`, `package.json`, `package-lock.json`, `playwright.config.js`, the three files under `test/browser/`, `.github/workflows/ci.yml`, and `README.md` differ from the branch base unless a separately filed accessibility issue justified a small `index.html` correction.

- [ ] **Step 7: Commit CI and usage documentation**

```powershell
git add -- .github/workflows/ci.yml README.md
git commit -m "ci: run browser journey tests"
```

- [ ] **Step 8: Perform the final verification-before-completion gate**

Run:

```powershell
npm run test:browser
npm test
npm run validate
npm run check-counts
npx --yes markdownlint-cli2@0.23.0 "**/*.md"
git diff --check
git status --short --branch
```

Expected: 21 Playwright executions pass, 233 Node tests pass, validation exits 0 with only the 199 known warnings, counts match, Markdown lint reports 0 errors, the diff check is empty, and the branch is clean and ahead only by the planned commits.
