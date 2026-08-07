const { spawnSync } = require('node:child_process');
const { readdirSync } = require('node:fs');
const { constants } = require('node:os');
const path = require('node:path');

function childExitCode(result) {
  if (result.error) {
    console.error(`Unable to start the Node test runner: ${result.error.message}`);
    return 1;
  }
  if (result.signal) {
    return 128 + (constants.signals[result.signal] || 0);
  }
  return result.status === null ? 1 : result.status;
}

function runNodeTests(rootDir) {
  const testDir = path.join(rootDir, 'test');
  let testFiles;

  try {
    testFiles = readdirSync(testDir, { withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name.endsWith('.test.js'))
      .map(entry => path.join(testDir, entry.name))
      .sort();
  } catch (error) {
    console.error(`Unable to enumerate Node tests in ${testDir}: ${error.message}`);
    return 1;
  }

  if (testFiles.length === 0) {
    console.error(`No top-level test/*.test.js files found in ${testDir}.`);
    return 1;
  }

  const result = spawnSync(process.execPath, ['--test', ...testFiles], {
    stdio: 'inherit',
  });
  return childExitCode(result);
}

if (require.main === module) {
  const rootDir = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.resolve(__dirname, '..');
  process.exitCode = runNodeTests(rootDir);
}

module.exports = { childExitCode, runNodeTests };
