'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  CHAPTER_LIST,
  DOMAIN_LIST,
  CHAPTERS,
  DOMAIN_LABELS,
  ICONS,
  resolveDomainId,
  validateCatalogueConfig,
} = require('../catalogueConfig');

const chapters = [{
  id: 'platform',
  label: 'Platform',
  icon: 'P',
  description: 'Platform work',
  order: 10,
  chapterLeadRoleId: 'leadership/platform_chapter_lead',
}];

const domains = [{
  id: 'finops',
  label: 'FinOps',
  icon: 'F',
  chapterId: 'platform',
  order: 10,
  aliases: ['FinOps'],
}];

test('legacy and canonical domain identifiers resolve to the canonical ID', () => {
  assert.equal(resolveDomainId('finops'), 'finops');
  assert.equal(resolveDomainId('FinOps'), 'finops');
  assert.equal(resolveDomainId('unknown'), null);
});

test('derived maps preserve configured labels, icons, membership and lead files', () => {
  assert.equal(DOMAIN_LABELS.finops, 'FinOps');
  assert.equal(ICONS.finops, '💰');
  assert.ok(CHAPTERS.cloud_platform_infra.domains.includes('finops'));
  assert.equal(
    CHAPTERS.cloud_platform_infra.leadFile,
    'Roles/leadership/cloud_platform_infrastructure_chapter_lead.md',
  );
});

test('valid configuration has no structural errors', () => {
  assert.deepEqual(validateCatalogueConfig({ chapters, domains }), []);
});

test('configuration rejects collisions and broken chapter membership', () => {
  const badDomains = [
    ...domains,
    {
      id: 'security',
      label: 'Security',
      icon: 'S',
      chapterId: 'platform',
      order: 10,
      aliases: ['FINOPS'],
    },
    {
      id: 'orphan',
      label: 'Orphan',
      icon: 'O',
      chapterId: 'missing',
      order: 20,
      aliases: [],
    },
  ];
  const errors = validateCatalogueConfig({ chapters, domains: badDomains });
  assert.ok(errors.some(error => error.includes('unknown chapter')));
  assert.ok(errors.some(error => error.includes('alias')));
  assert.ok(errors.some(error => error.includes('order')));
});

test('configuration rejects non-lowercase IDs and invalid display orders', () => {
  const errors = validateCatalogueConfig({
    chapters: [{ ...chapters[0], order: 0 }],
    domains: [{ ...domains[0], id: 'FinOps', order: -1 }],
  });
  assert.ok(errors.some(error => error.includes('must be lowercase')));
  assert.equal(errors.filter(error => error.includes('invalid order')).length, 2);
});

test('the committed configuration is structurally valid and fully derived', () => {
  assert.deepEqual(
    validateCatalogueConfig({ chapters: CHAPTER_LIST, domains: DOMAIN_LIST }),
    [],
  );
  assert.deepEqual(Object.keys(DOMAIN_LABELS), DOMAIN_LIST.map(domain => domain.id));
});
