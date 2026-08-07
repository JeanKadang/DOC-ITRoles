const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

async function scanForAccessibility(page, testInfo, stateName) {
  // Axe evaluates the pixels at the instant it runs. Wait for finite entrance
  // animations so Firefox does not measure text while its parent is partially
  // transparent; intentionally infinite decoration such as the header shimmer
  // must not hold the scan open.
  await page.evaluate(async () => {
    const finiteAnimations = document.getAnimations().filter(animation =>
      animation.effect?.getTiming().iterations !== Infinity);
    await Promise.all(finiteAnimations.map(animation => animation.finished.catch(() => {})));
  });

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
