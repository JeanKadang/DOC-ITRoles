// Drift guard for the seeded KPI targets (#140).
//
// The 16 contradictory targets corrected in this cycle were found by hand
// audit, and hand-kept state going stale is this repository's dominant bug
// class. This asserts the catalogue and the benchmark table cannot disagree:
// every "(proposed)" value in a role file must be exactly what
// proposedKpiTarget() returns for that row's metric.
//
// It fails when a metric is reworded without re-seeding, when a target is
// hand-typed as proposed, and when a benchmark changes in code without
// `npm run seed-kpi` being run. Any of those is drift worth seeing.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { proposedKpiTarget } = require('../viewer-logic');
const { listRoleFiles, seedFile, isBareTarget } = require('../scripts/seed-kpi-targets');

const ROLES_DIR = path.join(__dirname, '..', 'Roles');

function kpiRows(filePath) {
  const body = fs.readFileSync(filePath, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const section = body.split(/\n## /).find(s => /^Key Performance Indicators/.test(s));
  if (!section) return [];
  return section.split('\n')
    .filter(l => l.trim().startsWith('|'))
    .slice(2)
    .map(l => l.split('|'))
    .filter(c => c.length >= 4 && (c[1] || '').trim())
    .map(c => ({ metric: c[1].trim(), target: (c[2] || '').trim() }));
}

test('every proposed KPI target matches what the benchmark table produces', () => {
  let proposed = 0;
  for (const file of listRoleFiles(ROLES_DIR)) {
    for (const { metric, target } of kpiRows(file)) {
      if (!/\(proposed\)/i.test(target)) continue;
      proposed++;
      const suggested = proposedKpiTarget(metric);
      assert.ok(suggested,
        `${path.basename(file)}: "${metric}" carries ${target} but the table no longer seeds it`);
      assert.equal(suggested.target, target,
        `${path.basename(file)}: "${metric}" should be ${suggested.target}`);
    }
  }
  // Guards against the assertion passing because nothing was examined.
  assert.ok(proposed > 300, `expected the catalogue to carry proposed targets, found ${proposed}`);
});

test('no untargeted KPI row is one the benchmark table could already fill', () => {
  // The other direction: a blank row the table can seed means seed-kpi has
  // not been run since the table last changed.
  const missed = [];
  for (const file of listRoleFiles(ROLES_DIR)) {
    for (const { metric, target } of kpiRows(file)) {
      if (!isBareTarget(target)) continue;
      if (proposedKpiTarget(metric)) missed.push(`${path.basename(file)}: ${metric}`);
    }
  }
  assert.deepEqual(missed, [], `run "npm run seed-kpi" — ${missed.length} row(s) can be seeded`);
});

test('seeding the catalogue again changes nothing', () => {
  // The end-to-end form of both assertions above, through the tool the
  // maintainer actually runs.
  for (const file of listRoleFiles(ROLES_DIR)) {
    const { changed } = seedFile(file, { dry: true });
    assert.equal(changed, false, `${path.basename(file)} is out of date with the benchmark table`);
  }
});
