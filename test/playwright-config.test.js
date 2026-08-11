const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');

// The browser suite drives three browser projects against a single webServer.
// Letting Playwright pick its own worker count locally (half the CPU cores)
// made those projects contend, and the suite failed a different three tests on
// every run — timeouts, not product defects (#222). These tests pin the
// setting that keeps a local run as trustworthy as a CI run.

const CONFIG_PATH = path.resolve(__dirname, '..', 'playwright.config.js');

// The Tests CI job runs `npm test` with no install step at all — the repo has
// no runtime dependencies, so there is no node_modules there. Stub the one
// dev-dependency the config imports, so asserting on the config does not
// quietly require the whole Playwright package to be present.
// `defineConfig` is identity in Playwright too, so this reads the config as
// authored.
function stubPlaywright() {
    const originalLoad = Module._load;

    Module._load = function (request, ...rest) {
        if (request === '@playwright/test') {
            return {
                defineConfig: config => config,
                devices: new Proxy({}, { get: () => ({}) }),
            };
        }
        return originalLoad.call(this, request, ...rest);
    };

    return () => { Module._load = originalLoad; };
}

// The config reads process.env.CI at module load, so each load needs a fresh
// require and its own environment.
function loadConfig({ ci }) {
    const previous = process.env.CI;
    const restoreLoad = stubPlaywright();

    if (ci) {
        process.env.CI = 'true';
    } else {
        delete process.env.CI;
    }

    delete require.cache[require.resolve(CONFIG_PATH)];

    try {
        return require(CONFIG_PATH);
    } finally {
        restoreLoad();
        if (previous === undefined) {
            delete process.env.CI;
        } else {
            process.env.CI = previous;
        }
        delete require.cache[require.resolve(CONFIG_PATH)];
    }
}

test('the browser suite runs serially, so the projects cannot contend', () => {
    assert.equal(loadConfig({ ci: false }).workers, 1);
});

test('local and CI runs use the same worker count', () => {
    assert.equal(loadConfig({ ci: false }).workers, loadConfig({ ci: true }).workers);
});
