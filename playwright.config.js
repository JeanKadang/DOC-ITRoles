const { defineConfig, devices } = require('@playwright/test');

const testPort = process.env.PLAYWRIGHT_PORT || '4173';
const baseURL = `http://127.0.0.1:${testPort}`;

module.exports = defineConfig({
  testDir: './test/browser',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  // CI retries once to absorb runner noise. Locally a flake stays visible:
  // papering over it is how an intermittent defect reaches CI in the first
  // place.
  retries: process.env.CI ? 1 : 0,
  // Serial everywhere (#222). fullyParallel is off, but that only orders the
  // tests within a file — without this the three browser projects still run
  // concurrently against the single webServer below, and the contention
  // failed a different three tests on every local run.
  workers: 1,
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
