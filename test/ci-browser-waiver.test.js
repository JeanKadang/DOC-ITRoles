const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const workflow = readFileSync(
  path.resolve(__dirname, '..', '.github', 'workflows', 'ci.yml'),
  'utf8',
);

function stepNamed(name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = workflow.match(new RegExp(
    `      - name: ${escaped}\\r?\\n([\\s\\S]*?)(?=\\r?\\n      - |\\r?\\n\\r?\\n|$)`,
  ));

  assert.ok(match, `missing workflow step: ${name}`);
  return match[0];
}

test('only a labelled pull request can waive browser tests', () => {
  assert.match(
    workflow,
    /BROWSER_WAIVED: \$\{\{ github\.event_name == 'pull_request' && contains\(github\.event\.pull_request\.labels\.\*\.name, 'browser-not-required'\) \}\}/,
  );
});

test('label changes trigger a fresh browser policy evaluation', () => {
  assert.match(
    workflow,
    /pull_request:\r?\n    branches: \[main\]\r?\n    types: \[opened, synchronize, reopened, labeled, unlabeled\]/,
  );
});

test('the browser job records an explicit maintainer waiver', () => {
  const step = stepNamed('Record maintainer browser-test waiver');

  assert.match(step, /if: env\.BROWSER_WAIVED == 'true'/);
  assert.match(step, /browser-not-required/);
});

test('every browser-specific step is disabled by the waiver', () => {
  const guardedSteps = [
    'Set up Node for browser tests',
    'Install browser test dependencies',
    'Install browser engines',
    'Run browser journeys',
    'Upload browser failure artifacts',
  ];

  for (const name of guardedSteps) {
    assert.match(stepNamed(name), /if: .*env\.BROWSER_WAIVED != 'true'/);
  }
});
