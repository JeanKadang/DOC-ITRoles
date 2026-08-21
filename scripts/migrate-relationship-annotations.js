'use strict';

// Applies the ADR-0006 annotation syntax to Reports To, Direct Reports,
// career-path bullets, and the interactions table (#269). Dry-run by
// default; pass --write to apply. Idempotent: re-running with --write
// after a clean run changes no files. Mirrors backfill-role-ids.js's
// structure — BOM/CRLF preservation, per-file compare-and-skip.

const fs = require('node:fs');
const path = require('node:path');
const { buildRoleIndex, migrateRoleContent, normalizeTitle } = require('./lib/relationship-annotations.js');
const { EXTERNAL_TERMS } = require('./lib/external-role-terms.js');

const ROLES_DIR = process.env.ROLES_DIR
  ? path.resolve(process.env.ROLES_DIR)
  : path.resolve(__dirname, '..', 'Roles');

function roleFiles(dir = ROLES_DIR, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) roleFiles(full, out);
    else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(full);
  }
  return out;
}

function loadRoleIndex(files) {
  const roles = [];
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
    const title = (text.match(/^#\s+(.+)$/m) || [])[1];
    const roleId = (text.match(/\|\s*\*\*Role ID\*\*\s*\|\s*`([^`]+)`/) || [])[1];
    if (title && roleId) roles.push({ title: title.trim(), roleId });
  }
  return buildRoleIndex(roles);
}

function run({ write, legacy }) {
  const files = roleFiles();
  const roleIndex = loadRoleIndex(files);
  const externalTerms = new Set(EXTERNAL_TERMS.map(normalizeTitle));
  const ctx = { roleIndex, externalTerms };

  let filesChanged = 0;
  const kindCounts = { role: 0, external: 0, 'one-of': 0 };
  const legacyEntries = [];

  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const hadBom = original.startsWith('﻿');
    const hadCrlf = original.includes('\r\n');
    const body = original.replace(/^﻿/, '').replace(/\r\n/g, '\n');

    const { content, resolved, legacy } = migrateRoleContent(body, ctx);
    for (const item of resolved) kindCounts[item.kind] = (kindCounts[item.kind] || 0) + 1;
    for (const item of legacy) legacyEntries.push({ file, ...item });

    if (content === body) continue;
    filesChanged++;

    if (write) {
      const out = (hadBom ? '﻿' : '') + (hadCrlf ? content.replace(/\n/g, '\r\n') : content);
      fs.writeFileSync(file, out, 'utf8');
    }
  }

  console.log(`${write ? 'Annotated' : 'Would annotate'} relationships in ${filesChanged} file(s).`);
  console.log(`  role: ${kindCounts.role || 0}   external: ${kindCounts.external || 0}   one-of: ${kindCounts['one-of'] || 0}`);
  if (legacyEntries.length) {
    console.log(`\n${legacyEntries.length} unresolved reference(s) left as legacy text — run scripts/audit-relationship-terms.js for the full breakdown.`);
  }

  // --legacy surfaces the file/field/text detail the design spec calls for
  // ("targets left legacy — with file + field + text — so the legacy list
  // is a concrete, reviewable to-do"). The committed exceptions doc
  // (docs/superpowers/plans/2026-08-20-relationship-annotation-legacy-exceptions.txt,
  // produced separately by scripts/audit-relationship-terms.js) has text +
  // frequency but no file/field, so this is the only way to trace an
  // unresolved string back to the file it lives in.
  if (legacy) {
    console.log('\nfile\tfield\ttext');
    for (const entry of legacyEntries) {
      console.log(`${entry.file}\t${entry.field}\t${entry.text}`);
    }
  }
}

if (require.main === module) run({ write: process.argv.includes('--write'), legacy: process.argv.includes('--legacy') });

module.exports = { run, loadRoleIndex, roleFiles };
