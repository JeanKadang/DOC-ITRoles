const assert = require('node:assert/strict');
const { mkdtempSync, mkdirSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const repositoryRoot = path.resolve(__dirname, '..', '..');
const nodeTestLauncher = path.join(repositoryRoot, 'scripts', 'run-node-tests.js');
const browserTestLauncher = path.join(repositoryRoot, 'scripts', 'run-browser-tests.js');

function createFixture() {
  const root = mkdtempSync(path.join(tmpdir(), 'roles-node-tests-'));
  mkdirSync(path.join(root, 'scripts'));
  mkdirSync(path.join(root, 'test'));
  return root;
}

function runLauncher(root) {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  return spawnSync(process.execPath, [nodeTestLauncher, root], {
    cwd: root,
    encoding: 'utf8',
    env,
  });
}

test('Node launcher runs only top-level test files', () => {
  const root = createFixture();
  mkdirSync(path.join(root, 'test', 'browser'));
  writeFileSync(path.join(root, 'test', 'a.test.js'), "require('node:test')('a', () => {});\n");
  writeFileSync(path.join(root, 'test', 'z.test.js'), "require('node:test')('z', () => {});\n");
  writeFileSync(path.join(root, 'test', 'browser', 'ignored.test.js'), "throw new Error('nested test ran');\n");
  writeFileSync(path.join(root, 'test', 'ignored.js'), "throw new Error('non-test file ran');\n");

  const result = runLauncher(root);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /tests 2/);
  assert.doesNotMatch(result.stdout, /nested test ran|non-test file ran/);
});

test('Node launcher fails clearly when no top-level tests exist', () => {
  const root = createFixture();

  const result = runLauncher(root);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /No top-level test\/\*\.test\.js files found/);
});

test('Node launcher propagates a failing test exit status', () => {
  const root = createFixture();
  writeFileSync(path.join(root, 'test', 'failure.test.js'), "require('node:test')('failure', () => { throw new Error('expected failure'); });\n");

  const result = runLauncher(root);

  assert.equal(result.status, 1);
  assert.match(result.stdout, /expected failure/);
});

test('Node launcher maps a child signal to its conventional exit status', () => {
  const { childExitCode } = require(nodeTestLauncher);

  assert.equal(childExitCode({ error: undefined, signal: 'SIGTERM', status: null }), 143);
});

test('browser launcher rejects Node 18 before loading Playwright', () => {
  const { requireBrowserTestNode } = require(browserTestLauncher);

  assert.throws(
    () => requireBrowserTestNode('18.20.8'),
    /Browser tests require Node\.js 20 or newer; current version is 18\.20\.8/,
  );
  assert.doesNotThrow(() => requireBrowserTestNode('20.0.0'));
});

test('browser launcher forwards arguments to the Playwright test command', () => {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  const result = spawnSync(process.execPath, [browserTestLauncher, '--help'], {
    cwd: repositoryRoot,
    encoding: 'utf8',
    env,
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Usage: npx playwright test/);
});
