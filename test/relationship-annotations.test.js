'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  normalizeTitle,
  buildRoleIndex,
  annotateTarget,
  stripAnnotations,
} = require('../scripts/lib/relationship-annotations.js');

test('normalizeTitle lowercases and collapses whitespace', () => {
  assert.equal(normalizeTitle('  Cloud   Platform Architect '), 'cloud platform architect');
});

test('stripAnnotations strips a role annotation', () => {
  assert.equal(
    stripAnnotations('Chief Executive Officer <!-- role: chief-executive-officer -->'),
    'Chief Executive Officer',
  );
});

test('stripAnnotations strips an external-role annotation', () => {
  assert.equal(stripAnnotations('COO <!-- external-role -->'), 'COO');
});

test('stripAnnotations strips a one-of group annotation', () => {
  assert.equal(
    stripAnnotations('<!-- one-of -->A <!-- role: a -->, B <!-- role: b --><!-- /one-of -->'),
    'A, B',
  );
});

test('stripAnnotations leaves unannotated text unchanged', () => {
  assert.equal(stripAnnotations('Chief Executive Officer'), 'Chief Executive Officer');
});

test('stripAnnotations tolerates null/undefined input', () => {
  assert.equal(stripAnnotations(null), '');
  assert.equal(stripAnnotations(undefined), '');
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

test('annotateField recognizes None with parenthetical explanation as a complete sentinel (regression test)', () => {
  // Real-world example from the catalogue: None with explanation containing internal semicolons
  const original = 'None (sets technical direction and mentors Network Senior Engineers; formal line management sits with the Chapter Lead)';
  const r = annotateField(original, ctx());
  assert.equal(r.text, original, 'should preserve the entire None (...) pattern unchanged');
  assert.deepEqual(r.resolved, [], 'should not resolve any annotations');
  assert.deepEqual(r.legacy, [], 'should not create legacy fragments from internal punctuation');
});

// Task 3: Whole-document migration for Reports To and Direct Reports
const { migrateRoleContent } = require('../scripts/lib/relationship-annotations.js');

const SAMPLE = [
  '# Kubernetes Engineer',
  '',
  '| Field | Value |',
  '|---|---|',
  '| **Role ID** | `kubernetes-engineer` |',
  '| **Reports To** | Kubernetes Senior Engineer |',
  '| **Direct Reports** | None |',
  '',
  '## Role Overview',
  '',
  'Text.',
  '',
].join('\n');

function sampleCtx() {
  return {
    roleIndex: buildRoleIndex([
      { title: 'Kubernetes Engineer', roleId: 'kubernetes-engineer' },
      { title: 'Kubernetes Senior Engineer', roleId: 'kubernetes-senior-engineer' },
    ]),
    externalTerms: new Set(),
  };
}

test('migrateRoleContent annotates Reports To and leaves a None Direct Reports untouched', () => {
  const r = migrateRoleContent(SAMPLE, sampleCtx());
  assert.match(r.content, /\*\*Reports To\*\* \| Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer --> \|/);
  assert.match(r.content, /\*\*Direct Reports\*\* \| None \|/);
  assert.equal(r.resolved.length, 1);
});

test('migrateRoleContent leaves everything else in the document unchanged', () => {
  const r = migrateRoleContent(SAMPLE, sampleCtx());
  assert.match(r.content, /## Role Overview\n\nText\./);
});

test('migrateRoleContent is idempotent', () => {
  const first = migrateRoleContent(SAMPLE, sampleCtx());
  const second = migrateRoleContent(first.content, sampleCtx());
  assert.equal(second.content, first.content);
  assert.deepEqual(second.resolved, []);
});

test('migrateRoleContent records an unresolved Reports To as a legacy entry', () => {
  const drifted = SAMPLE.replace('Kubernetes Senior Engineer', 'Some Drifted Title');
  const r = migrateRoleContent(drifted, sampleCtx());
  assert.equal(r.content, drifted);
  assert.deepEqual(r.legacy, [{ field: 'Reports To', text: 'Some Drifted Title' }]);
});

// Task 4: Career-path bullets and the interactions table
const CAREER_AND_INTERACTIONS = [
  '# Kubernetes Engineer',
  '',
  '| Field | Value |',
  '|---|---|',
  '| **Role ID** | `kubernetes-engineer` |',
  '| **Reports To** | Kubernetes Senior Engineer |',
  '| **Direct Reports** | None |',
  '',
  '## Interactions with Other Roles',
  '',
  '| Role | Nature of Interaction | Interaction Mode |',
  '|---|---|---|',
  '| Kubernetes Senior Engineer | Escalation | Escalates To |',
  '| Board of Directors | Reporting | Provides To |',
  '',
  '## Career Development Path',
  '',
  '**Previous Roles:**',
  '',
  '- Kubernetes Senior Engineer',
  '',
  '**Potential Next Roles:**',
  '',
  '- Kubernetes Architect',
  '',
].join('\n');

function extendedCtx() {
  return {
    roleIndex: buildRoleIndex([
      { title: 'Kubernetes Engineer', roleId: 'kubernetes-engineer' },
      { title: 'Kubernetes Senior Engineer', roleId: 'kubernetes-senior-engineer' },
      { title: 'Kubernetes Architect', roleId: 'kubernetes-architect' },
    ]),
    externalTerms: new Set(['board of directors']),
  };
}

test('migrateRoleContent annotates the interactions table Role column', () => {
  const r = migrateRoleContent(CAREER_AND_INTERACTIONS, extendedCtx());
  assert.match(r.content, /\| Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer --> \| Escalation \| Escalates To \|/);
  assert.match(r.content, /\| Board of Directors <!-- external-role --> \| Reporting \| Provides To \|/);
});

test('migrateRoleContent annotates career-path bullets', () => {
  const r = migrateRoleContent(CAREER_AND_INTERACTIONS, extendedCtx());
  assert.match(r.content, /- Kubernetes Senior Engineer <!-- role: kubernetes-senior-engineer -->\n/);
  assert.match(r.content, /- Kubernetes Architect <!-- role: kubernetes-architect -->\n/);
});

test('migrateRoleContent leaves the interactions header row and separator untouched', () => {
  const r = migrateRoleContent(CAREER_AND_INTERACTIONS, extendedCtx());
  assert.match(r.content, /\| Role \| Nature of Interaction \| Interaction Mode \|/);
  assert.match(r.content, /\|---\|---\|---\|/);
});

test('a career-path bullet that does not resolve is left as legacy text', () => {
  const drifted = CAREER_AND_INTERACTIONS.replace('- Kubernetes Architect', '- Some Drifted Title');
  const r = migrateRoleContent(drifted, extendedCtx());
  assert.match(r.content, /- Some Drifted Title\n/);
  assert.ok(r.legacy.some(l => l.field === 'Career Development Path' && l.text === 'Some Drifted Title'));
});

test('the extended migration is idempotent', () => {
  const first = migrateRoleContent(CAREER_AND_INTERACTIONS, extendedCtx());
  const second = migrateRoleContent(first.content, extendedCtx());
  assert.equal(second.content, first.content);
});

// Task 5: Read-side annotation parser
const { parseRelationshipField } = require('../scripts/lib/relationship-annotations.js');

test('parseRelationshipField resolves a single catalogue target', () => {
  const entries = parseRelationshipField('Cloud Platform Architect <!-- role: cloud-platform-architect -->');
  assert.deepEqual(entries, [{ kind: 'catalogue', roleId: 'cloud-platform-architect', label: 'Cloud Platform Architect' }]);
});

test('parseRelationshipField resolves an external target', () => {
  const entries = parseRelationshipField('Board of Directors <!-- external-role -->');
  assert.deepEqual(entries, [{ kind: 'external', label: 'Board of Directors' }]);
});

test('parseRelationshipField resolves a one-of group', () => {
  const entries = parseRelationshipField(
    '<!-- one-of -->DevOps Senior Engineer <!-- role: devops-senior-engineer --> or DevOps Architect <!-- role: devops-architect --><!-- /one-of -->'
  );
  assert.deepEqual(entries, [{
    kind: 'one-of',
    options: [
      { kind: 'catalogue', roleId: 'devops-senior-engineer', label: 'DevOps Senior Engineer' },
      { kind: 'catalogue', roleId: 'devops-architect', label: 'DevOps Architect' },
    ],
  }]);
});

test('parseRelationshipField resolves a one-of group of external options', () => {
  const entries = parseRelationshipField(
    '<!-- one-of -->Chief Data Officer (CDO) <!-- external-role --> or Chief AI Officer <!-- external-role --><!-- /one-of -->'
  );
  assert.deepEqual(entries, [{
    kind: 'one-of',
    options: [
      { kind: 'external', label: 'Chief Data Officer (CDO)' },
      { kind: 'external', label: 'Chief AI Officer' },
    ],
  }]);
});

test('parseRelationshipField returns an empty array for the None sentinel, plain or parenthesised', () => {
  assert.deepEqual(parseRelationshipField('None'), []);
  assert.deepEqual(parseRelationshipField('None (sets technical direction; formal line management sits with the Chapter Lead)'), []);
  assert.deepEqual(parseRelationshipField(''), []);
  assert.deepEqual(parseRelationshipField(null), []);
});

test('parseRelationshipField splits simultaneous targets on top-level semicolons', () => {
  const entries = parseRelationshipField('CFO <!-- role: chief-financial-officer -->; CISO <!-- role: chief-information-security-officer -->');
  assert.deepEqual(entries, [
    { kind: 'catalogue', roleId: 'chief-financial-officer', label: 'CFO' },
    { kind: 'catalogue', roleId: 'chief-information-security-officer', label: 'CISO' },
  ]);
});

test('parseRelationshipField returns legacy for unannotated text', () => {
  assert.deepEqual(parseRelationshipField('Some Drifted Title'), [{ kind: 'legacy', text: 'Some Drifted Title' }]);
});

test('parseRelationshipField flags a target with both role and external-role annotations as invalid', () => {
  const entries = parseRelationshipField('X <!-- role: x --><!-- external-role -->');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags an annotation with no visible label as invalid', () => {
  const entries = parseRelationshipField('<!-- role: x -->');
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags an unclosed one-of as invalid', () => {
  const entries = parseRelationshipField('<!-- one-of -->A <!-- role: a --> or B <!-- role: b -->');
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags a nested one-of as invalid', () => {
  const entries = parseRelationshipField(
    '<!-- one-of -->A <!-- role: a --><!-- one-of -->B <!-- role: b --><!-- /one-of --><!-- /one-of -->'
  );
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags a one-of with fewer than two options as invalid', () => {
  const entries = parseRelationshipField('<!-- one-of -->A <!-- role: a --><!-- /one-of -->');
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags a one-of containing an unannotated option as invalid', () => {
  const entries = parseRelationshipField('<!-- one-of -->A <!-- role: a --> or B<!-- /one-of -->');
  assert.equal(entries[0].kind, 'invalid');
});

test('parseRelationshipField flags None combined with another target as invalid', () => {
  const entries = parseRelationshipField('None; Cloud Architect <!-- role: cloud-architect -->');
  assert.equal(entries[0].kind, 'invalid');
  assert.equal(entries[1].kind, 'catalogue');
});
