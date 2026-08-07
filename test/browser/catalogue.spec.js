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
