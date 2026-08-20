'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { collectUnresolvedTerms } = require('../scripts/audit-relationship-terms.js');

test('collectUnresolvedTerms counts text that does not resolve to a catalogue role or external term', () => {
  const roles = [
    {
      title: 'Kubernetes Engineer',
      roleId: 'kubernetes-engineer',
      fields: { reportsTo: 'Some Drifted Title', directReports: 'None', careerBullets: [], interactionRoles: [] },
    },
    {
      title: 'Kubernetes Senior Engineer',
      roleId: 'kubernetes-senior-engineer',
      fields: { reportsTo: 'Some Drifted Title', directReports: 'None', careerBullets: ['Some Drifted Title'], interactionRoles: [] },
    },
  ];
  const result = collectUnresolvedTerms(roles, new Set());
  assert.equal(result.get('Some Drifted Title'), 3);
});

test('collectUnresolvedTerms excludes text that resolves to a catalogue title', () => {
  const roles = [
    { title: 'Kubernetes Engineer', roleId: 'kubernetes-engineer', fields: { reportsTo: 'Kubernetes Senior Engineer', directReports: 'None', careerBullets: [], interactionRoles: [] } },
    { title: 'Kubernetes Senior Engineer', roleId: 'kubernetes-senior-engineer', fields: { reportsTo: 'None', directReports: 'None', careerBullets: [], interactionRoles: [] } },
  ];
  const result = collectUnresolvedTerms(roles, new Set());
  assert.equal(result.size, 0);
});

test('collectUnresolvedTerms excludes text that resolves to a curated external term', () => {
  const roles = [
    { title: 'Kubernetes Engineer', roleId: 'kubernetes-engineer', fields: { reportsTo: 'Board of Directors', directReports: 'None', careerBullets: [], interactionRoles: [] } },
  ];
  const result = collectUnresolvedTerms(roles, new Set(['board of directors']));
  assert.equal(result.size, 0);
});

test('collectUnresolvedTerms ignores an "or" choice where every side resolves', () => {
  const roles = [
    { title: 'A', roleId: 'a', fields: { reportsTo: 'B or C', directReports: 'None', careerBullets: [], interactionRoles: [] } },
    { title: 'B', roleId: 'b', fields: { reportsTo: 'None', directReports: 'None', careerBullets: [], interactionRoles: [] } },
    { title: 'C', roleId: 'c', fields: { reportsTo: 'None', directReports: 'None', careerBullets: [], interactionRoles: [] } },
  ];
  const result = collectUnresolvedTerms(roles, new Set());
  assert.equal(result.size, 0);
});
