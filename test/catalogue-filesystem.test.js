'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { validateCatalogueFilesystem } = require('../scripts/validate-catalogue');

const chapters = [
  {
    id: 'platform',
    label: 'Platform',
    icon: 'P',
    description: 'Platform work',
    order: 10,
    chapterLeadRoleId: 'leadership/platform_chapter_lead',
  },
  {
    id: 'leadership_chapter',
    label: 'Leadership',
    icon: 'L',
    description: 'Leadership work',
    order: 20,
    chapterLeadRoleId: null,
  },
];

const domains = [
  {
    id: 'finops',
    label: 'FinOps',
    icon: 'F',
    chapterId: 'platform',
    order: 10,
    aliases: ['FinOps'],
  },
  {
    id: 'leadership',
    label: 'Leadership',
    icon: 'L',
    chapterId: 'leadership_chapter',
    order: 10,
    aliases: [],
  },
];

const roots = [];

test.afterEach(() => {
  for (const root of roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

function makeCatalogueFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'catalogue-config-'));
  roots.push(root);
  for (const directory of [
    'Roles/finops',
    'Roles/leadership',
    'docs/chapters',
  ]) {
    fs.mkdirSync(path.join(root, directory), { recursive: true });
  }
  fs.writeFileSync(path.join(root, 'Roles/leadership/platform_chapter_lead.md'), '# Lead\n');
  fs.writeFileSync(path.join(root, 'docs/chapters/platform.md'), '# Platform\n');
  fs.writeFileSync(path.join(root, 'docs/chapters/leadership_chapter.md'), '# Leadership\n');
  return root;
}

test('filesystem validation accepts exact configured folders and references', () => {
  const root = makeCatalogueFixture();
  assert.deepEqual(validateCatalogueFilesystem({ root, chapters, domains }), []);
});

test('filesystem validation reports a missing configured domain folder', () => {
  const root = makeCatalogueFixture();
  fs.rmdirSync(path.join(root, 'Roles/finops'));
  const errors = validateCatalogueFilesystem({ root, chapters, domains });
  assert.ok(errors.some(error => error.includes('missing configured role folder "finops"')));
});

test('filesystem validation reports casing and unconfigured-folder drift', () => {
  const root = makeCatalogueFixture();
  fs.renameSync(path.join(root, 'Roles/finops'), path.join(root, 'Roles/finops_case'));
  fs.renameSync(path.join(root, 'Roles/finops_case'), path.join(root, 'Roles/FinOps'));
  fs.mkdirSync(path.join(root, 'Roles/rogue'));
  const errors = validateCatalogueFilesystem({ root, chapters, domains });
  assert.ok(errors.some(error => error.includes('expected exact folder "finops"')));
  assert.ok(errors.some(error => error.includes('unconfigured role folder "rogue"')));
});

test('filesystem validation reports missing narratives and lead roles', () => {
  const root = makeCatalogueFixture();
  fs.unlinkSync(path.join(root, 'docs/chapters/platform.md'));
  fs.unlinkSync(path.join(root, 'Roles/leadership/platform_chapter_lead.md'));
  const errors = validateCatalogueFilesystem({ root, chapters, domains });
  assert.ok(errors.some(error => error.includes('chapter narrative')));
  assert.ok(errors.some(error => error.includes('chapter lead')));
});
