'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  normalizeTitle,
  buildRoleIndex,
  annotateTarget,
} = require('../scripts/lib/relationship-annotations.js');

test('normalizeTitle lowercases and collapses whitespace', () => {
  assert.equal(normalizeTitle('  Cloud   Platform Architect '), 'cloud platform architect');
});

test('buildRoleIndex keys by normalized title', () => {
  const idx = buildRoleIndex([{ title: 'Cloud Platform Architect', roleId: 'cloud-platform-architect' }]);
  assert.deepEqual(idx.get('cloud platform architect'), { roleId: 'cloud-platform-architect', title: 'Cloud Platform Architect' });
});

test('annotateTarget resolves an exact catalogue title to a role annotation', () => {
  const roleIndex = buildRoleIndex([{ title: 'Cloud Platform Architect', roleId: 'cloud-platform-architect' }]);
  const result = annotateTarget('Cloud Platform Architect', { roleIndex, externalTerms: new Set() });
  assert.deepEqual(result, {
    text: 'Cloud Platform Architect <!-- role: cloud-platform-architect -->',
    kind: 'role',
    roleId: 'cloud-platform-architect',
  });
});

test('annotateTarget matches case-insensitively', () => {
  const roleIndex = buildRoleIndex([{ title: 'Cloud Platform Architect', roleId: 'cloud-platform-architect' }]);
  const result = annotateTarget('cloud platform architect', { roleIndex, externalTerms: new Set() });
  assert.equal(result.kind, 'role');
});

test('annotateTarget resolves a curated external term', () => {
  const result = annotateTarget('Board of Directors', { roleIndex: new Map(), externalTerms: new Set(['board of directors']) });
  assert.deepEqual(result, { text: 'Board of Directors <!-- external-role -->', kind: 'external' });
});

test('a catalogue title takes priority over an external term of the same text', () => {
  const roleIndex = buildRoleIndex([{ title: 'CEO', roleId: 'ceo' }]);
  const result = annotateTarget('CEO', { roleIndex, externalTerms: new Set(['ceo']) });
  assert.equal(result.kind, 'role');
});

test('annotateTarget returns null for text that resolves to nothing', () => {
  const result = annotateTarget('Some Drifted Title', { roleIndex: new Map(), externalTerms: new Set() });
  assert.equal(result, null);
});

test('annotateTarget returns null for empty or whitespace-only text', () => {
  assert.equal(annotateTarget('   ', { roleIndex: new Map(), externalTerms: new Set() }), null);
});
