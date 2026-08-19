// Guards against a document naming another document without linking to it
// (#168, #169).
//
// The viewer intercepts in-body `.md` links and routes them, so a mention
// written as a bare code span is a dead end for the reader — and the
// onboarding templates were doing it precisely where they tell a new starter
// to go and read something. This makes the omission fail rather than sit.
//
// It also catches a mention of a file that does not exist, which is how
// README.md came to give `kubernetes_platform_engineer.md` as its naming
// example: no such role, and a level the pattern above it does not list.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Files that send a reader to another document. Deliberately a list rather
// than a glob: a role definition mentioning a filename in prose is not the
// same act as a README pointing somewhere.
const NAVIGATIONAL = [
  'README.md',
  'docs/ONBOARDING_TEMPLATE.md',
  'docs/onboarding_chapter_lead_template.md',
  'docs/onboarding_engineer_supplement.md',
  'docs/onboarding_senior_engineer_supplement.md',
  'docs/onboarding_architect_supplement.md',
  'docs/onboarding_product_owner_supplement.md',
  'docs/SCENARIOS.md',
  'Roles/c_suite/README.md',
  'Roles/security/README.md',
  'Roles/security_cross_platform/README.md',
  'Roles/security_identity/README.md',
];

// `docs/onboarding_*_supplement.md` names a set, not a file.
const isGlob = named => named.includes('*');

function bareMentions(rel) {
  const text = fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/^﻿/, '');
  const out = [];
  for (const m of text.matchAll(/`([A-Za-z_0-9./-]+\.md)`(\])?/g)) {
    if (m[2]) continue;              // already the label of a link
    if (isGlob(m[1])) continue;
    out.push(m[1]);
  }
  return out;
}

test('a document that names another document links to it', () => {
  const dead = [];
  for (const rel of NAVIGATIONAL) {
    for (const named of bareMentions(rel)) dead.push(`${rel} → ${named}`);
  }
  assert.deepEqual(dead, [],
    `write these as markdown links so the viewer can open them: ${dead.join(', ')}`);
});

test('every linked .md target exists', () => {
  const broken = [];
  for (const rel of NAVIGATIONAL) {
    const dir = path.posix.dirname(rel);
    const text = fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/^﻿/, '');
    for (const m of text.matchAll(/\]\(([^)]+\.md)\)/g)) {
      const href = m[1];
      if (/^https?:/.test(href)) continue;
      const target = path.posix.normalize(path.posix.join(dir === '.' ? '' : dir, href));
      if (!fs.existsSync(path.join(ROOT, target))) broken.push(`${rel} → ${href}`);
    }
  }
  assert.deepEqual(broken, [], `broken links: ${broken.join(', ')}`);
});

test('the onboarding templates leave the role definition as a fillable placeholder', () => {
  // It differs per hire, so it cannot be a fixed link — but "Link to role
  // file in this repository" described a link instead of being one, and
  // gave the manager nothing to fill in.
  const text = fs.readFileSync(path.join(ROOT, 'docs/ONBOARDING_TEMPLATE.md'), 'utf8');
  assert.ok(!/Link to role file in this repository/.test(text),
    'the Role definition row should be a placeholder, not a description of a link');
  assert.ok(!/\| Role definition in this repository \|/.test(text),
    'the Day 1 learning resource should be a placeholder, not a phrase');
  assert.match(text, /\\<link to the role definition\\>/,
    'expected the template\'s own \\<…\\> placeholder style');
});
