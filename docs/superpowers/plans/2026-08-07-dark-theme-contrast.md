# Dark-Theme Contrast Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate the serious axe color-contrast violations in the dark home and opened-role states while preserving the light theme, layout, and theme-toggle behavior.

**Architecture:** Extend the existing Playwright accessibility suite with explicit dark-theme states, then correct contrast through the existing semantic CSS tokens. Keep the exceptional role-level badge colors as narrowly scoped component overrides; do not introduce a second theme system or centralize configuration as part of this issue.

**Tech Stack:** Static HTML/CSS/JavaScript, Playwright, axe-core, Node.js test suite, markdownlint-cli2.

## Global Constraints

- Work only on issue #202 in branch `codex/202-dark-theme-contrast`.
- Preserve all light-theme values and behavior.
- Preserve the current `data-theme` and `aria-pressed` toggle contract.
- Do not change layout, typography, content, generated role data, or configuration loading.
- Do not weaken axe rules, exclude selectors, or lower the serious/critical threshold.
- Run the accessibility tests in Chromium, Firefox, and WebKit before completion.
- Keep all new tests deterministic by using the existing finite-animation wait in `scanForAccessibility`.

---

## Task 1: Cover and correct the dark home state

**Files:**

- Modify: `test/browser/accessibility.spec.js`
- Modify: `index.html:41-55`

**Interfaces:**

- Reuse `scanForAccessibility(page, testInfo, stateName)` without changing its exclusions or severity threshold.
- Add `activateDarkTheme(page)`, which proves both the document theme and toggle state before an axe scan.

- [ ] **Step 1: Add a dark-theme activation helper**

Add this helper immediately after `scanForAccessibility` in `test/browser/accessibility.spec.js`:

```javascript
async function activateDarkTheme(page) {
  const themeButton = page.getByRole('button', { name: 'Toggle dark mode' });

  await themeButton.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(themeButton).toHaveAttribute('aria-pressed', 'true');
}
```

- [ ] **Step 2: Add the failing dark-home accessibility test**

Add this test after the existing home-state accessibility test:

```javascript
test('dark home state has no serious or critical axe violations', async ({ page }, testInfo) => {
  await activateDarkTheme(page);

  await expect(page.getByRole('heading', { name: 'Select a role to view' })).toBeVisible();
  await scanForAccessibility(page, testInfo, 'dark-home');
});
```

- [ ] **Step 3: Prove that the new test catches the current defect**

Run:

```powershell
npm run test:browser -- test/browser/accessibility.spec.js --project=chromium
```

Expected result: the two existing light-theme tests pass and the new dark-home test fails with serious `color-contrast` violations. The report should include the filter-chip variants, resource headings, and welcome paragraph documented in issue #202.

- [ ] **Step 4: Refresh the semantic dark palette**

Replace only the existing `[data-theme="dark"]` token block in `index.html` with:

```css
[data-theme="dark"] {
  --bg-primary: #0b1220;
  --bg-card: #111827;
  --bg-card-hover: #1b2638;
  --bg-input: #243044;
  --text-primary: #f8fafc;
  --text-secondary: #d6deea;
  --text-muted: #b4c0d0;
  --accent-blue: #6eb6ff;
  --border-color: rgba(226, 232, 240, 0.18);
  --border-hover: rgba(110, 182, 255, 0.72);
  --gradient-card: linear-gradient(135deg, #172033 0%, #202c40 100%);
}
```

This keeps the existing semantic token API intact while lifting muted text, links, and active-state boundaries above the WCAG AA contrast threshold.

- [ ] **Step 5: Prove that the dark home state now passes**

Run:

```powershell
npm run test:browser -- test/browser/accessibility.spec.js --project=chromium
```

Expected result: all three Chromium accessibility tests pass with no serious or critical violations.

- [ ] **Step 6: Commit the independently verified home-state change**

```powershell
git add test/browser/accessibility.spec.js index.html
git commit -m "fix: improve dark home contrast"
```

---

## Task 2: Cover and correct the dark opened-role state

**Files:**

- Modify: `test/browser/accessibility.spec.js`
- Modify: `index.html:375-390`

**Interfaces:**

- Reuse `activateDarkTheme(page)` from Task 1.
- Continue using the accessible search and role-card names rather than CSS selectors to open a role.
- Preserve the existing role-level class names (`b-ceo` through `b-tal`).

- [ ] **Step 1: Add the failing dark opened-role accessibility test**

Add this test after the existing opened-role accessibility test:

```javascript
test('dark opened role has no serious or critical axe violations', async ({ page }, testInfo) => {
  await activateDarkTheme(page);

  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('Kubernetes Architect');
  await page.getByRole('button', { name: /Kubernetes Architect/ }).click();

  await expect(
    page.locator('#roleHeader').getByRole('heading', { name: 'Kubernetes Architect' }),
  ).toBeVisible();
  await scanForAccessibility(page, testInfo, 'dark-opened-role');
});
```

- [ ] **Step 2: Prove that the opened-role test catches the remaining defect**

Run:

```powershell
npm run test:browser -- test/browser/accessibility.spec.js --project=chromium
```

Expected result: the new dark opened-role test fails if any role badge or opened-role state still has a serious `color-contrast` violation. The attached axe report must name the remaining selectors; do not infer them from appearance alone.

- [ ] **Step 3: Replace translucent dark badge overrides with accessible solid pairs**

Replace the existing dark-theme role-badge override block in `index.html` with:

```css
[data-theme="dark"] .b-ceo { background: #3a2c0c; color: #fcd34d; }
[data-theme="dark"] .b-cto { background: #26264f; color: #c7d2fe; }
[data-theme="dark"] .b-cio { background: #11382d; color: #6ee7b7; }
[data-theme="dark"] .b-cfo { background: #442039; color: #f9a8d4; }
[data-theme="dark"] .b-svp { background: #2b3442; color: #f1f5f9; }
[data-theme="dark"] .b-ciso { background: #48252b; color: #fecaca; }
[data-theme="dark"] .b-arch { background: #342247; color: #e9d5ff; }
[data-theme="dark"] .b-lead { background: #422b18; color: #fdba74; }
[data-theme="dark"] .b-prin { background: #3b330f; color: #fde68a; }
[data-theme="dark"] .b-cl { background: #103b34; color: #5eead4; }
[data-theme="dark"] .b-sen { background: #163858; color: #93c5fd; }
[data-theme="dark"] .b-eng { background: #173822; color: #86efac; }
[data-theme="dark"] .b-po { background: #422a0b; color: #fdba74; }
[data-theme="dark"] .b-standards { background: #123744; color: #67e8f9; }
[data-theme="dark"] .b-pal { background: #1d3557; color: #bfdbfe; }
[data-theme="dark"] .b-tal { background: #123b55; color: #bae6fd; }
```

The solid backgrounds make each foreground/background pair deterministic instead of depending on alpha blending with the surrounding card.

- [ ] **Step 4: Prove both dark states pass in every supported browser**

Run:

```powershell
npm run test:browser -- test/browser/accessibility.spec.js
```

Expected result: 12 accessibility tests pass: four states in each of Chromium, Firefox, and WebKit. No test may use an axe exclusion.

- [ ] **Step 5: Commit the independently verified opened-role change**

```powershell
git add test/browser/accessibility.spec.js index.html
git commit -m "test: cover dark opened-role contrast"
```

---

## Task 3: Complete regression and visual verification

**Files:**

- Modify: `docs/superpowers/specs/2026-08-07-dark-theme-contrast-design.md`

- [ ] **Step 1: Run the full automated verification set**

Run each command separately:

```powershell
npm test
npm run test:browser
npm run validate
npm run count
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

Expected results from the current baseline plus the two new browser tests:

- `npm test`: 233 tests pass.
- `npm run test:browser`: 27 tests pass across Chromium, Firefox, and WebKit.
- `npm run validate`: zero errors; the existing warning baseline remains unchanged unless the generated data changed, which this plan forbids.
- `npm run count`: 226 roles, 34 categories, and 7 tracks.
- Markdown lint: zero errors.

- [ ] **Step 2: Inspect the final UI at desktop and narrow widths**

Start the local server:

```powershell
npm start
```

Inspect these four states with the browser developer tools at 1440×900 and 375×812:

1. Light home: confirm it is visually unchanged.
2. Dark home: confirm filter chips, resource headings, welcome text, borders, and focus indicators are readable.
3. Light Kubernetes Architect: confirm it is visually unchanged.
4. Dark Kubernetes Architect: confirm the Chapter Lead badge, metadata keys, career links, table-of-contents chips, and Role Overview text are readable.

Also keyboard-tab through the theme button, search input, filter chips, role card, and opened-role table of contents. Confirm the 2px accent focus outline remains visible and no text disappears on hover or active states.

- [ ] **Step 3: Record the verified result in the approved design**

Change the design document status from `Approved` to `Implemented`, then append:

```markdown
## Implementation verification

- Dark home and dark opened-role axe scans pass without exclusions in Chromium, Firefox, and WebKit.
- The full Node and browser suites pass.
- Repository validation and content counts remain at their pre-change baselines.
- Desktop and narrow-width checks confirm that the light theme and layout remain unchanged.
```

Use the actual command results in place of any statement that did not pass exactly as written.

- [ ] **Step 4: Commit the verification record**

```powershell
git add docs/superpowers/specs/2026-08-07-dark-theme-contrast-design.md
git commit -m "docs: record dark-theme verification"
```

- [ ] **Step 5: Push the completed branch**

```powershell
git push
```

The branch is then ready for the GitHub hygiene checks, issue-linking pull request, and review workflow.
