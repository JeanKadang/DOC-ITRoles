const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  const totalRoles = page.locator('#statsCards .stat-card').filter({
    has: page.getByText('Total Roles', { exact: true }),
  });
  await expect(totalRoles).toContainText('226');
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

test('search opens a known role without duplicating its exact title', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  const searchResponse = page.waitForResponse(response =>
    response.url().includes('/api/search?q=Kubernetes%20Architect') && response.ok());

  await search.fill('Kubernetes Architect');
  await searchResponse;

  const exactRole = page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^Kubernetes Architect\b/,
  });
  await expect(exactRole).toHaveCount(1);
  await expect(page.locator('#contentMatches').getByText('Kubernetes Architect', { exact: true })).toHaveCount(0);

  await exactRole.click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Kubernetes Architect' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Compare with another role' })).toBeVisible();
});

test('compare mode opens a second role and closes cleanly', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('Kubernetes Architect');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^Kubernetes Architect\b/,
  }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Kubernetes Architect' })).toBeVisible();

  await page.getByRole('button', { name: 'Compare with another role' }).click();
  await expect(page.getByText('Click a role to compare', { exact: false })).toBeVisible();

  await search.fill('Kubernetes Engineer');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^Kubernetes Engineer\b/,
  }).click();
  await expect(page.locator('#roleHeader2').getByRole('heading', { name: 'Kubernetes Engineer' })).toBeVisible();

  await page.getByRole('button', { name: 'Close comparison' }).click();
  await expect(page.locator('#roleView2')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Compare with another role' })).toBeVisible();
});
