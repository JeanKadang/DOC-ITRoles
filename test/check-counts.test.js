'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { computeCounts } = require('../scripts/check-counts');

test('counts roles, domains, and chapters from supplied catalogue data', () => {
  const counts = computeCounts({
    domains: { finops: { roles: [{ name: 'finops_engineer' }] } },
    chapters: [{ id: 'platform' }],
  });

  assert.deepEqual(counts, {
    roleCount: 1,
    domainCount: 1,
    chapterCount: 1,
  });
});
