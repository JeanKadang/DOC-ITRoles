'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { parseMeta, normalizeLevel, resolveLevel, detectLevelFromFilename, KNOWN_LEVELS } = require('../roleMeta.js');

test('domain labels are the shared catalogue export', () => {
  assert.equal(
    require('../roleMeta').DOMAIN_LABELS,
    require('../catalogueConfig').DOMAIN_LABELS,
  );
});

test('parseMeta extracts title and metadata fields', () => {
  const content = [
    '# Example Architect',
    '',
    '| Field | Value |',
    '|---|---|',
    '| **Domain** | Example Domain |',
    '| **Role Level** | Architect |',
    '| **Reports To** | Example Chapter Lead |',
    '| **Direct Reports** | None |',
    '| **Last Reviewed** | 2026-03 |',
    '',
    '---',
    '',
    '## Role Overview',
  ].join('\n');

  const meta = parseMeta(content);
  assert.equal(meta.title, 'Example Architect');
  assert.equal(meta.domain, 'Example Domain');
  assert.equal(meta.levelRaw, 'Architect');
  assert.equal(meta.reportsTo, 'Example Chapter Lead');
  assert.equal(meta.directReports, 'None');
  assert.equal(meta.lastReviewed, '2026-03');
});

test('parseMeta returns null for reporting-line fields when absent', () => {
  const meta = parseMeta('# Bare Role\n\n| **Role Level** | Engineer |\n');
  assert.equal(meta.reportsTo, null);
  assert.equal(meta.directReports, null);
});

test('parseMeta strips a leading UTF-8 BOM before matching the H1 title', () => {
  const content = '\uFEFF# BOM-Prefixed Role\n\n| **Role Level** | Engineer |\n';
  const meta = parseMeta(content);
  assert.equal(meta.title, 'BOM-Prefixed Role');
  assert.equal(meta.levelRaw, 'Engineer');
});

test('normalizeLevel maps known aliases to canonical vocabulary', () => {
  assert.equal(normalizeLevel('SVP of Technology'), 'SVP');
  assert.equal(normalizeLevel('svp'), 'SVP');
  assert.equal(normalizeLevel('Architect'), 'Architect');
  assert.equal(normalizeLevel(null), null);
});

test('every canonical level is present in KNOWN_LEVELS', () => {
  assert.ok(KNOWN_LEVELS.has('Architect'));
  assert.ok(KNOWN_LEVELS.has('Senior Engineer'));
  assert.ok(KNOWN_LEVELS.has('SVP'));
});

test('detectLevelFromFilename infers level when metadata is absent', () => {
  assert.equal(detectLevelFromFilename('kubernetes_architect.md'), 'Architect');
  assert.equal(detectLevelFromFilename('kubernetes_senior_engineer.md'), 'Senior Engineer');
  assert.equal(detectLevelFromFilename('kubernetes_product_owner.md'), 'Product Owner');
  assert.equal(detectLevelFromFilename('kubernetes_engineer.md'), 'Engineer');
});

test('resolveLevel prefers metadata over filename inference', () => {
  const content = '# Some Role\n\n| **Role Level** | SVP of Technology |\n';
  assert.equal(resolveLevel(content, 'irrelevant_engineer.md'), 'SVP');
});

test('resolveLevel falls back to filename when Role Level metadata is missing', () => {
  const content = '# Some Standards Doc\n\nNo metadata table here.\n';
  assert.equal(resolveLevel(content, 'cloud_cost_optimization_architect.md'), 'Architect');
});
