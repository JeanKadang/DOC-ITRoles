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

// Task 2: Field splitting, one-of grouping, and field-level annotation
const { isAnnotated, annotateField } = require('../scripts/lib/relationship-annotations.js');

function ctx(roles = [], external = []) {
  return { roleIndex: buildRoleIndex(roles), externalTerms: new Set(external.map(normalizeTitle)) };
}

test('isAnnotated detects each existing marker', () => {
  assert.equal(isAnnotated('X <!-- role: x -->'), true);
  assert.equal(isAnnotated('X <!-- external-role -->'), true);
  assert.equal(isAnnotated('<!-- one-of -->X<!-- /one-of -->'), true);
  assert.equal(isAnnotated('Plain Title'), false);
});

test('annotateField resolves a single catalogue target', () => {
  const r = annotateField('Cloud Platform Architect', ctx([{ title: 'Cloud Platform Architect', roleId: 'cloud-platform-architect' }]));
  assert.equal(r.text, 'Cloud Platform Architect <!-- role: cloud-platform-architect -->');
  assert.equal(r.resolved.length, 1);
  assert.deepEqual(r.legacy, []);
});

test('annotateField leaves "None" untouched', () => {
  const r = annotateField('None', ctx());
  assert.equal(r.text, 'None');
  assert.deepEqual(r.resolved, []);
  assert.deepEqual(r.legacy, []);
});

test('annotateField wraps a fully-resolvable "or" choice in one-of', () => {
  const roles = [
    { title: 'DevOps Senior Engineer', roleId: 'devops-senior-engineer' },
    { title: 'DevOps Architect', roleId: 'devops-architect' },
  ];
  const r = annotateField('DevOps Senior Engineer or DevOps Architect', ctx(roles));
  assert.equal(
    r.text,
    '<!-- one-of -->DevOps Senior Engineer <!-- role: devops-senior-engineer --> or DevOps Architect <!-- role: devops-architect --><!-- /one-of -->'
  );
  assert.equal(r.resolved.length, 1);
  assert.equal(r.resolved[0].kind, 'one-of');
});

test('annotateField wraps a three-way comma/or choice with an Oxford comma', () => {
  const roles = [
    { title: 'CTO', roleId: 'chief-technology-officer' },
    { title: 'CIO', roleId: 'chief-information-officer' },
    { title: 'SVP of Technology', roleId: 'svp-technology' },
  ];
  const r = annotateField('CTO, CIO, or SVP of Technology', ctx(roles));
  assert.equal(
    r.text,
    '<!-- one-of -->CTO <!-- role: chief-technology-officer -->, CIO <!-- role: chief-information-officer -->, or SVP of Technology <!-- role: svp-technology --><!-- /one-of -->'
  );
});

test('annotateField leaves an "or" choice untouched when one side does not resolve', () => {
  const roles = [{ title: 'DevOps Senior Engineer', roleId: 'devops-senior-engineer' }];
  const original = 'DevOps Senior Engineer or Some Drifted Title';
  const r = annotateField(original, ctx(roles));
  assert.equal(r.text, original);
  assert.deepEqual(r.resolved, []);
  assert.deepEqual(r.legacy, [original]);
});

test('annotateField splits simultaneous targets on top-level semicolons', () => {
  const roles = [
    { title: 'CFO', roleId: 'chief-financial-officer' },
    { title: 'CISO', roleId: 'chief-information-security-officer' },
  ];
  const r = annotateField('CFO; CISO', ctx(roles));
  assert.equal(r.text, 'CFO <!-- role: chief-financial-officer -->; CISO <!-- role: chief-information-security-officer -->');
  assert.equal(r.resolved.length, 2);
});

test('annotateField is a no-op on text that is already annotated', () => {
  const original = 'Cloud Platform Architect <!-- role: cloud-platform-architect -->';
  const r = annotateField(original, ctx([{ title: 'Cloud Platform Architect', roleId: 'cloud-platform-architect' }]));
  assert.equal(r.text, original);
  assert.deepEqual(r.resolved, []);
});

test('annotateField leaves an unresolved semicolon-separated field byte-identical', () => {
  const original = 'Some Drift;Another Drift';
  const r = annotateField(original, ctx());
  assert.equal(r.text, original, 'nothing resolved, so nothing should be rewritten, including separator spacing');
});
