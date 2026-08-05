'use strict';

// Guards docs/SKILLS_PROGRESSION.md against drift (#1): every role file in
// the catalog must appear exactly once in the domain-ladder section, and
// the doc must not reference files that no longer exist. The #15 Sankey
// will parse this document — these tests keep it parseable and complete.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');

function ladderSection() {
  const doc = fs.readFileSync(path.join(ROOT, 'docs', 'SKILLS_PROGRESSION.md'), 'utf8');
  const afterHeading = doc.split('## Domain-by-domain progression paths')[1];
  assert.ok(afterHeading, 'ladder section heading present');
  return afterHeading.split(/\n## /)[0];
}

function catalogRoleNames() {
  const names = new Set();
  for (const d of fs.readdirSync(path.join(ROOT, 'Roles'), { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    for (const f of fs.readdirSync(path.join(ROOT, 'Roles', d.name))) {
      if (!f.endsWith('.md') || f === 'README.md' || /_standards\.md$/.test(f)) continue;
      names.add(f.replace('.md', ''));
    }
  }
  return names;
}

test('every catalog role appears exactly once in the progression ladders', () => {
  const section = ladderSection();
  const seen = new Map();
  for (const m of section.matchAll(/`([a-z0-9_]+)`/g)) {
    seen.set(m[1], (seen.get(m[1]) || 0) + 1);
  }
  const real = catalogRoleNames();
  const missing = [...real].filter(n => !seen.has(n));
  const dupes = [...seen].filter(([, c]) => c > 1).map(([n]) => n);
  assert.deepEqual(missing, [], `roles missing from SKILLS_PROGRESSION ladders`);
  assert.deepEqual(dupes, [], `roles listed more than once`);
});

test('the progression ladders reference no deleted or renamed roles', () => {
  const section = ladderSection();
  const real = catalogRoleNames();
  const phantom = [...new Set([...section.matchAll(/`([a-z0-9_]+)`/g)].map(m => m[1]))]
    .filter(n => !real.has(n));
  assert.deepEqual(phantom, [], 'ladder entries with no matching role file');
});

test('every domain has a ladder heading', () => {
  const section = ladderSection();
  const headings = (section.match(/^### /gm) || []).length;
  const domainCount = fs.readdirSync(path.join(ROOT, 'Roles'), { withFileTypes: true })
    .filter(d => d.isDirectory()).length;
  assert.equal(headings, domainCount, 'one ladder heading per domain');
});

// ── Cross-domain interactions coverage (#125) ─────────────
// The viewer's Domain Relationship Graph is built from
// docs/CROSS_DOMAIN_INTERACTIONS.md. A domain absent from that document is
// absent from the graph with no indication, so a reader gets a picture that
// silently omits part of the catalogue — 11 of 33 domains were missing when
// this guard was written.
test('every canonical domain appears in CROSS_DOMAIN_INTERACTIONS.md', () => {
  const { DOMAIN_LABELS } = require('../roleMeta');
  const doc = fs.readFileSync(path.join(ROOT, 'docs', 'CROSS_DOMAIN_INTERACTIONS.md'), 'utf8')
    .replace(/^\uFEFF/, '');
  const missing = Object.entries(DOMAIN_LABELS)
    .filter(([key, label]) => fs.existsSync(path.join(ROOT, 'Roles', key)) && !doc.includes(label))
    .map(([, label]) => label);
  assert.deepEqual(missing, [], 'domains missing from the relationship graph');
});

test('CROSS_DOMAIN_INTERACTIONS.md references no domain label that no longer exists', () => {
  // The mirror of the above: a renamed or removed domain leaves a phantom
  // node in the graph.
  const { DOMAIN_LABELS } = require('../roleMeta');
  const labels = new Set(Object.values(DOMAIN_LABELS));
  const doc = fs.readFileSync(path.join(ROOT, 'docs', 'CROSS_DOMAIN_INTERACTIONS.md'), 'utf8');
  // Only check the ownership table's Primary Owner column, which must name a
  // real domain; prose bullets legitimately mention teams and externals.
  const owners = [...doc.matchAll(/^\|[^|]+\|([^|]+)\|/gm)]
    .map(m => m[1].trim().replace(/\s*\(.*\)\s*$/, ''))
    .filter(v => v && v !== 'Primary Owner' && !/^-+$/.test(v));
  const phantom = [...new Set(owners)].filter(o => !labels.has(o));
  assert.deepEqual(phantom, [], 'ownership rows naming a non-existent domain');
});
