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
