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
