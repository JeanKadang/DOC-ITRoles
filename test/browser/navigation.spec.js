const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('narrow-screen navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('drawer manages expanded state, focus, role opening, and closure', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /role navigation/ });
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
