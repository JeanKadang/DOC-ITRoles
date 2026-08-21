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

test('a resolved Reports To chip links to its target role', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('Kubernetes Architect');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^Kubernetes Architect\b/,
  }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Kubernetes Architect' })).toBeVisible();

  const chip = page.locator('.meta-reporting .role-xref');
  await expect(chip).toContainText('Cloud, Platform & Infrastructure Chapter Lead');
  await chip.click();
  await expect(page.locator('#roleHeader').getByRole('heading', {
    name: 'Cloud, Platform & Infrastructure Chapter Lead',
  })).toBeVisible();
});

test('an external Reports To destination renders as plain text, not a link', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('Chief Executive Officer');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^Chief Executive Officer\b/,
  }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Chief Executive Officer' })).toBeVisible();

  const reportingTag = page.locator('.meta-reporting').filter({ hasText: 'Reports to' });
  await expect(reportingTag).toContainText('Board of Directors');
  await expect(reportingTag.locator('.role-xref')).toHaveCount(0);
});

test('a one-of career-path entry renders both options, each independently linkable', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('VMware Architect');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^VMware Architect\b/,
  }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'VMware Architect' })).toBeVisible();

  const toGroup = page.locator('#careerStepper .cs-group').filter({ hasText: 'To' });
  await expect(toGroup.getByText('Cloud Lead Architect', { exact: true })).toBeVisible();
  await expect(toGroup.getByText('Cloud Principal Architect', { exact: true })).toBeVisible();

  await toGroup.getByText('Cloud Principal Architect', { exact: true }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Cloud Principal Architect' })).toBeVisible();
});

test('a one-of interactions-table row renders both options, each independently linkable', async ({ page }) => {
  const search = page.getByRole('textbox', { name: 'Search roles' });
  await search.fill('Automation Framework Engineer');
  await page.locator('#sidebarNav .chapter-domains').getByRole('button', {
    name: /^Automation Framework Engineer\b/,
  }).click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'Automation Framework Engineer' })).toBeVisible();

  // The "Interactions with Other Roles" section renders collapsed by
  // default (it isn't in DEFAULT_OPEN_SECTIONS), so its table has to be
  // expanded before its rows are visible/interactable.
  await page.locator('#roleBody summary', { hasText: 'Interactions with Other Roles' }).click();

  const interactionsTable = page.locator('#roleBody table').filter({
    has: page.getByRole('columnheader', { name: 'Nature of Interaction' }),
  });
  const firstRow = interactionsTable.locator('tbody tr').first();
  await expect(firstRow).toContainText('DevOps Senior Engineer');
  await expect(firstRow).toContainText('DevOps Architect');
  await expect(firstRow.locator('.role-xref')).toHaveCount(2);

  await firstRow.locator('.role-xref').first().click();
  await expect(page.locator('#roleHeader').getByRole('heading', { name: 'DevOps Senior Engineer' })).toBeVisible();
});
