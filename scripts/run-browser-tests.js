const { spawnSync } = require('node:child_process');
const { constants } = require('node:os');

function requireBrowserTestNode(version) {
  const major = Number.parseInt(version.split('.')[0], 10);
  if (!Number.isInteger(major) || major < 20) {
    throw new Error(`Browser tests require Node.js 20 or newer; current version is ${version}.`);
  }
}

function runBrowserTests(args) {
  try {
    requireBrowserTestNode(process.versions.node);
  } catch (error) {
    console.error(error.message);
    return 1;
  }

  let playwrightCli;
  try {
    playwrightCli = require.resolve('@playwright/test/cli');
  } catch (error) {
    console.error(`Unable to load Playwright. Run npm ci first. (${error.message})`);
    return 1;
  }

  const result = spawnSync(process.execPath, [playwrightCli, 'test', ...args], {
    stdio: 'inherit',
  });
  if (result.error) {
    console.error(`Unable to start Playwright: ${result.error.message}`);
    return 1;
  }
  if (result.signal) {
    return 128 + (constants.signals[result.signal] || 0);
  }
  return result.status === null ? 1 : result.status;
}

if (require.main === module) {
  process.exitCode = runBrowserTests(process.argv.slice(2));
}

module.exports = { requireBrowserTestNode, runBrowserTests };
