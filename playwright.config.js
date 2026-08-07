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
