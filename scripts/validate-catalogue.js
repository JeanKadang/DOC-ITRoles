'use strict';

const fs = require('node:fs');
const path = require('node:path');

const {
  CHAPTER_LIST,
  DOMAIN_LIST,
  validateCatalogueConfig,
} = require('../catalogueConfig');

function validateCatalogueFilesystem({
  root = path.join(__dirname, '..'),
  chapters = CHAPTER_LIST,
  domains = DOMAIN_LIST,
} = {}) {
  const errors = [...validateCatalogueConfig({ chapters, domains })];
  const rolesDir = path.join(root, 'Roles');
  let actualFolders = [];
  try {
    actualFolders = fs.readdirSync(rolesDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
  } catch (error) {
    errors.push(`cannot read role folders: ${error.message}`);
    return errors;
  }

  const expectedIds = new Set(domains.map(domain => domain.id));
  const actualFolded = new Map(actualFolders.map(name => [name.toLowerCase(), name]));
  for (const domain of domains) {
    const actual = actualFolded.get(domain.id);
    if (!actual) {
      errors.push(`missing configured role folder "${domain.id}"`);
    } else if (actual !== domain.id) {
      errors.push(`expected exact folder "${domain.id}", found "${actual}"`);
    }
  }

  for (const actual of actualFolders) {
    const knownByCase = domains.some(domain => domain.id === actual.toLowerCase());
    if (!expectedIds.has(actual) && !knownByCase) {
      errors.push(`unconfigured role folder "${actual}"`);
    }
  }

  for (const chapter of chapters) {
    const narrative = path.join(root, 'docs', 'chapters', `${chapter.id}.md`);
    if (!fs.existsSync(narrative)) {
      errors.push(`missing chapter narrative "${chapter.id}.md"`);
    }
    if (chapter.chapterLeadRoleId) {
      const lead = path.join(rolesDir, `${chapter.chapterLeadRoleId}.md`);
      if (!fs.existsSync(lead)) {
        errors.push(`missing chapter lead "${chapter.chapterLeadRoleId}"`);
      }
    }
  }

  return errors;
}

function main() {
  const errors = validateCatalogueFilesystem();
  if (errors.length) {
    for (const error of errors) console.error(`Catalogue configuration: ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(
    `Catalogue configuration: ${DOMAIN_LIST.length} domains, ${CHAPTER_LIST.length} chapters`,
  );
}

if (require.main === module) main();

module.exports = { validateCatalogueFilesystem };
