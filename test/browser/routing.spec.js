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
