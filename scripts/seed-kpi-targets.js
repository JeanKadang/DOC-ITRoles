// Applies the KPI benchmark table in viewer-logic.js to every role file
// (#140). Zero dependencies — run with `npm run seed-kpi` or
// `node scripts/seed-kpi-targets.js [--dry]`.
//
// Three edits, each counted separately:
//   drop      a "(proposed)" target the classifier now refuses -> em dash
//   retarget  a "(proposed)" target the classifier now values differently
//   seed      a blank row the classifier can give a starting point
//
// A row carrying a real (unmarked) target is never touched: that number was
// agreed by someone, and no classifier gets to overrule it.
//
// This exists so the invariant is maintainable rather than hand-kept. The
// suite asserts every "(proposed)" row in the catalogue matches what the
// classifier produces for its metric; when a benchmark changes, this is what
// makes the files match again.
'use strict';

const fs   = require('fs');
const path = require('path');
const { proposedKpiTarget } = require('../viewer-logic');

const ROOT      = path.join(__dirname, '..');
const ROLES_DIR = process.env.ROLES_DIR ? path.resolve(process.env.ROLES_DIR) : path.join(ROOT, 'Roles');
const DRY       = process.argv.includes('--dry');

function listRoleFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) listRoleFiles(p, out);
    else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(p);
  }
  return out;
}

// A blank cell and an em dash mean the same thing: no target yet.
function isBareTarget(t) {
  return !t || t === '—' || t === '-' || t === 'TBD';
}

function seedFile(filePath, { dry = false } = {}) {
  const raw  = fs.readFileSync(filePath, 'utf8');
  const bom  = raw.startsWith('﻿') ? '﻿' : '';
  const crlf = /\r\n/.test(raw);
  const lines = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n').split('\n');

  const counts = { drop: 0, retarget: 0, seed: 0, house: 0, benchmark: 0 };
  let inKpi = false, headerRows = 0, changed = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^##\s/.test(line)) { inKpi = /^##\s+Key Performance Indicators/.test(line); headerRows = 0; continue; }
    if (!inKpi || !line.trim().startsWith('|')) continue;
    if (headerRows < 2) { headerRows++; continue; }   // header and delimiter

    const cells = line.split('|');
    if (cells.length < 4) continue;
    const metric = (cells[1] || '').trim();
    const target = (cells[2] || '').trim();
    if (!metric) continue;

    const isProposed = /\(proposed\)/i.test(target);
    if (!isProposed && !isBareTarget(target)) continue;

    const suggested = proposedKpiTarget(metric);

    if (isProposed && !suggested) { cells[2] = ' — '; counts.drop++; }
    else if (isProposed && suggested.target !== target) { cells[2] = ` ${suggested.target} `; counts.retarget++; }
    else if (!isProposed && suggested) {
      cells[2] = ` ${suggested.target} `;
      // Only fill a cadence that is itself empty — an agreed frequency on an
      // untargeted row is still someone's decision.
      if (isBareTarget((cells[3] || '').trim())) cells[3] = ` ${suggested.frequency} `;
      counts.seed++;
      counts[suggested.basis === 'house' ? 'house' : 'benchmark']++;
    } else continue;

    lines[i] = cells.join('|');
    changed = true;
  }

  if (changed && !dry) {
    const body = lines.join('\n');
    fs.writeFileSync(filePath, bom + (crlf ? body.replace(/\n/g, '\r\n') : body), 'utf8');
  }
  return { changed, counts };
}

function main() {
  const totals = { drop: 0, retarget: 0, seed: 0, house: 0, benchmark: 0, files: 0 };
  for (const file of listRoleFiles(ROLES_DIR)) {
    const { changed, counts } = seedFile(file, { dry: DRY });
    if (!changed) continue;
    totals.files++;
    for (const k of Object.keys(counts)) totals[k] += counts[k];
  }

  console.log(DRY ? 'Would change:' : 'Changed:');
  console.log(`  ${totals.files} file(s)`);
  console.log(`  ${totals.seed} row(s) seeded — ${totals.benchmark} from a published benchmark, ${totals.house} a house starting point`);
  console.log(`  ${totals.retarget} row(s) re-targeted`);
  console.log(`  ${totals.drop} row(s) returned to no target`);
  if (totals.files === 0) console.log('  (files already match the benchmark table)');
}

if (require.main === module) main();

module.exports = { seedFile, listRoleFiles, isBareTarget };
