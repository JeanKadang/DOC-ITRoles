// Verifies that count-bearing prose in README.md matches the filesystem,
// so "216 roles across 32 domains" etc. can't silently drift out of date
// the way it did before (see docs/improvements_and_recommendations.md,
// "Technology-specific experience levels" recount).
//
// Run with `npm run check-counts`. Exit code 1 on any mismatch.

'use strict';

const fs = require('fs');
const path = require('path');
const { getRoles } = require('../server.js');

const ROOT = path.join(__dirname, '..');

function computeCounts() {
  const domains = getRoles();
  const roleCount = Object.values(domains).reduce((n, d) => n + d.roles.length, 0);
  const domainCount = Object.keys(domains).length;

  const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const chaptersMatch = indexHtml.match(/const CHAPTERS = \{([\s\S]*?)\n    \};/);
  const chapterCount = chaptersMatch
    ? (chaptersMatch[1].match(/^\s{8}[a-z_]+:\s*\{/gm) || []).length
    : null;

  return { roleCount, domainCount, chapterCount };
}

function checkReadme(counts) {
  const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
  const errors = [];

  const introMatch = readme.match(/Covers (\d+) domains grouped into (\d+) chapters, and (\d+) roles/);
  if (!introMatch) {
    errors.push('README.md: could not find the "Covers N domains grouped into N chapters, and N roles" sentence to check.');
  } else {
    const [, domains, chapters, roles] = introMatch.map(Number);
    if (domains !== counts.domainCount) errors.push(`README.md intro: says ${domains} domains, actual is ${counts.domainCount}`);
    if (chapters !== counts.chapterCount) errors.push(`README.md intro: says ${chapters} chapters, actual is ${counts.chapterCount}`);
    if (roles !== counts.roleCount) errors.push(`README.md intro: says ${roles} roles, actual is ${counts.roleCount}`);
  }

  const structMatch = readme.match(/All role definitions \((\d+) domains, (\d+) roles\)/);
  if (!structMatch) {
    errors.push('README.md: could not find the "All role definitions (N domains, N roles)" repository-structure comment to check.');
  } else {
    const [, domains, roles] = structMatch.map(Number);
    if (domains !== counts.domainCount) errors.push(`README.md structure tree: says ${domains} domains, actual is ${counts.domainCount}`);
    if (roles !== counts.roleCount) errors.push(`README.md structure tree: says ${roles} roles, actual is ${counts.roleCount}`);
  }

  return errors;
}

function main() {
  const counts = computeCounts();
  console.log(`Filesystem counts: ${counts.roleCount} roles, ${counts.domainCount} domains, ${counts.chapterCount} chapters`);

  const errors = checkReadme(counts);
  if (errors.length) {
    console.log('\nCount drift detected:');
    for (const e of errors) console.log(`  - ${e}`);
    process.exitCode = 1;
  } else {
    console.log('README.md counts match the filesystem.');
  }
}

if (require.main === module) main();

module.exports = { computeCounts };
