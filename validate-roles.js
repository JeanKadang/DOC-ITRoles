// Validates every role file under Roles/ against the canonical 14-section
// structure defined in docs/role_template.md. Zero dependencies — run with
// `npm run validate` or `node validate-roles.js [--strict]`.
//
// Exit code 0: no errors (warnings may still be printed).
// Exit code 1: at least one error, or --strict was passed and there are warnings.

'use strict';

const fs   = require('fs');
const path = require('path');
const { parseMeta, KNOWN_LEVELS, normalizeLevel, REFERENCE_DOC_PATTERN, DOMAIN_LABELS } = require('./roleMeta');
const { loadCredentialRegistry, validateRoleCredentialReferences } = require('./credentialRegistry');

const ROOT       = __dirname;
// ROLES_DIR env override exists for the test suite, which points the
// validator at a fixture tree; normal runs always use Roles/.
const ROLES_DIR  = process.env.ROLES_DIR ? path.resolve(process.env.ROLES_DIR) : path.join(ROOT, 'Roles');
const CREDENTIALS_FILE = process.env.CREDENTIALS_FILE
  ? path.resolve(process.env.CREDENTIALS_FILE)
  : path.join(ROOT, 'data', 'credentials.json');
const STRICT     = process.argv.includes('--strict');

// Required section headings. Each entry accepts one or more historical
// spellings so the validator surfaces genuinely missing content rather than
// failing on cosmetic wording differences. Anything other than `name` itself
// now also raises a canonical-heading warning (#121) so the drift is visible
// and countable; #122 normalises the files, after which the alternates can be
// dropped and CI can move to `--strict`.
// Review provenance vocabulary (#179). "mechanical" is the honest default for
// a role whose date came from a bulk edit rather than a review; "reviewed" is
// claimed only when an owner has actually read the content.
const REVIEW_STATUSES = new Set(['reviewed', 'mechanical', 'unreviewed']);

const REQUIRED_SECTIONS = [
  { name: 'Role Overview',                          patterns: [/^##\s+Role Overview/im] },
  { name: 'Role Scope & Boundaries',                patterns: [/^##\s+Role Scope (&|and) Boundaries/im] },
  { name: 'Business Impact',                        patterns: [/^##\s+Business Impact/im] },
  { name: 'Key Responsibilities',                    patterns: [/^##\s+Key Responsibilities/im] },
  { name: 'Key Decisions & Accountabilities',        patterns: [/^##\s+Key Decisions (&|and) Accountabilities/im] },
  { name: 'Required Skills & Qualifications',        patterns: [/^##\s+Required Skills/im] },
  { name: 'Interactions with Other Roles',           patterns: [/^##\s+Interactions with Other Roles/im, /^##\s+Relationships (&|and) Collaboration/im] },
  { name: 'Key Technologies',                        patterns: [/^##\s+Key Technologies/im] },
  { name: 'Typical Day-to-Day Activities',           patterns: [/^##\s+Typical Day-to-Day Activities/im] },
  { name: 'Key Performance Indicators',               patterns: [/^##\s+Key Performance Indicators/im] },
  { name: 'Remote Work Considerations',              patterns: [/^##\s+Remote Work Considerations/im] },
  { name: 'Career Development Path',                 patterns: [/^##\s+Career Development Path/im] },
  { name: 'Recommended Certifications & Learning Paths', patterns: [/^##\s+Recommended Certifications (&|and) Learning Paths/im] },
];

// The Interactions table must carry an Interaction Mode column (Collaborates /
// Consumes From / Provides To / Governed By / Escalates To) so each cross-role
// relationship states its direction, not just its subject. Matches a table
// header row naming the column followed by the delimiter row, rather than a
// bare mention of the words — the template's explanatory blockquote above the
// table would otherwise satisfy a looser check.
const INTERACTION_MODE_COLUMN = /^\|.*Interaction Mode.*\|[ \t]*\r?\n\|[\s:|-]+\|/im;

// Return the body of a "## " section: everything up to the next H2 or EOF.
function sectionBody(content, heading) {
  const start = content.search(new RegExp('^##\\s+' + heading, 'im'));
  if (start === -1) return '';
  const rest = content.slice(start);
  const next = rest.search(/\n##\s+/);
  return next === -1 ? rest : rest.slice(0, next);
}

// The template calls the KPI table (| Metric | Target | Frequency |) the
// preferred form because a bullet list records topics, not measurable
// targets: "Architecture design quality and effectiveness" cannot be met or
// missed. 200 of 222 roles still use bullets — see #122.
function hasKpiTable(body) {
  return /^\|.*\|[ \t]*\r?\n\|[\s:|-]+\|/im.test(body);
}

// Classify KPI table rows by whether their Target is confirmed, merely
// proposed, or absent. Skips the header and delimiter rows.
//
// An em dash is how #140 renders a known gap and a blank cell must not be a
// quieter way of saying the same thing. "(proposed)" marks a seeded starting
// point — for some families a published benchmark, for others a house figure
// where no standard exists — real either way, but not an agreed commitment,
// so it is counted apart rather than treated as done.
function kpiTargetCounts(body) {
  let missing = 0, proposed = 0;
  const rows = body.split(/\r?\n/).filter(l => l.trim().startsWith('|'));
  for (const row of rows.slice(2)) {
    const target = (row.split('|')[2] || '').trim();
    if (!target || target === '—' || target === '-' || target === 'TBD') missing++;
    else if (/\(proposed\)/i.test(target)) proposed++;
  }
  return { missing, proposed };
}

// Technology Proficiency Levels should use the template's sub-heading form
// (**Expert level required:** on its own line, then a bullet list) rather
// than folding each tier into a single bullet. 191 of 222 use the inline
// form — see #122.
const PROFICIENCY_INLINE = /^[ \t]*-[ \t]+\*\*(Expert|Proficient|Working Knowledge|Awareness)[^*]*\*\*/im;

function listRoleFiles(rolesDir = ROLES_DIR) {
  const files = [];
  for (const entry of fs.readdirSync(rolesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const domainPath = path.join(rolesDir, entry.name);
    for (const f of fs.readdirSync(domainPath)) {
      if (f.endsWith('.md') && f !== 'README.md') {
        files.push(path.join(domainPath, f));
      }
    }
  }
  return files.sort();
}

function validateFile(filePath, rolesDir = ROLES_DIR, credentialContext = null) {
  const rel     = path.relative(path.dirname(rolesDir), filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  const meta    = parseMeta(content);
  const errors  = [];
  const warnings = [];

  if (!meta.title) errors.push('Missing H1 title (# Role Title)');
  if (!meta.domain) errors.push('Missing **Domain** metadata field');

  const isReferenceDoc = REFERENCE_DOC_PATTERN.test(path.basename(filePath));

  if (isReferenceDoc) {
    return { rel, errors, warnings, skipped: true };
  }

  // Domain metadata should match the canonical label for the folder the
  // file lives in -- a warning (not error) so this doesn't block CI while
  // any future drift gets cleaned up incrementally.
  if (meta.domain) {
    const folder = rel.split('/')[1];
    const canonicalLabel = DOMAIN_LABELS[folder] || folder;
    if (meta.domain.toLowerCase() !== canonicalLabel.toLowerCase()) {
      warnings.push(`Domain "${meta.domain}" does not match the canonical label "${canonicalLabel}" for folder Roles/${folder}/`);
    }
  }

  if (!meta.levelRaw) {
    errors.push('Missing **Role Level** metadata field');
  } else if (!KNOWN_LEVELS.has(normalizeLevel(meta.levelRaw))) {
    warnings.push(`Role Level "${meta.levelRaw}" is not in the canonical level vocabulary (roleMeta.js)`);
  }

  // Reporting line. Backfilled across all role files in #5; enforced here so
  // the vertical relationship can't silently go missing from new roles the
  // way it was absent from the whole catalogue before that backfill.
  if (!meta.reportsTo) errors.push('Missing **Reports To** metadata field');
  if (!meta.directReports) errors.push('Missing **Direct Reports** metadata field');

  if (!meta.lastReviewed) {
    errors.push('Missing **Last Reviewed** metadata field');
  } else if (!/^\d{4}-\d{2}$/.test(meta.lastReviewed)) {
    warnings.push(`Last Reviewed "${meta.lastReviewed}" is not in YYYY-MM format`);
  }

  // Review provenance (#179). A populated Last Reviewed date shows only that
  // the file was touched -- 206 roles shared one month before this was added.
  // Content Owner names who stands behind the content, as a durable role
  // identifier rather than a person so the catalogue stays portable; Review
  // Status says whether the date reflects subject-matter review or a bulk edit.
  if (!meta.contentOwner) errors.push('Missing **Content Owner** metadata field');

  if (!meta.reviewStatus) {
    errors.push('Missing **Review Status** metadata field');
  } else if (!REVIEW_STATUSES.has(meta.reviewStatus)) {
    errors.push(`Review Status "${meta.reviewStatus}" is not one of: ${[...REVIEW_STATUSES].join(', ')}`);
  } else if (meta.reviewStatus !== 'reviewed') {
    // A warning, not an error: the gap stays countable without failing CI,
    // the same way the KPI target gap does.
    warnings.push(`Review Status is "${meta.reviewStatus}" — the content has not been reviewed by its owner, so Last Reviewed records only when the file was last touched`);
  }

  for (const section of REQUIRED_SECTIONS) {
    const found = section.patterns.some(re => re.test(content));
    if (!found) {
      errors.push(`Missing section: ## ${section.name}`);
      continue;
    }
    // Present, but is it spelled the canonical way? An accepted alternate is
    // not an error (the content is there) but it is drift worth counting.
    const canonical = new RegExp('^##\\s+' + section.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$', 'im');
    if (!canonical.test(content)) {
      warnings.push(`Non-canonical heading for "${section.name}" — use "## ${section.name}" exactly`);
    }
  }

  // Content-format conventions. Warnings rather than errors while #122
  // normalises the catalog; `--strict` already fails on warnings, so CI can
  // be switched over the moment that lands.
  const kpiBody = sectionBody(content, 'Key Performance Indicators');
  if (kpiBody && !hasKpiTable(kpiBody)) {
    warnings.push('Key Performance Indicators uses bullets — the template prefers a | Metric | Target | Frequency | table so targets are measurable');
  } else if (kpiBody) {
    // Once a role uses the table the format warning goes quiet, but a row
    // with no target is still an unmeasurable KPI. Without this the #140
    // conversion would have silenced the very signal it was meant to expose
    // (see also #122's KPI notes).
    const { missing, proposed } = kpiTargetCounts(kpiBody);
    if (missing > 0) {
      warnings.push(`Key Performance Indicators has ${missing} row(s) with no target — a metric nobody can meet or miss is not yet a KPI`);
    }
    if (proposed > 0) {
      // Deliberately does not say where the number came from. Some proposals
      // are published benchmarks and some are house starting points for
      // families nobody standardises, and the "(proposed)" marker in the file
      // cannot tell them apart. Claiming an industry source for all of them
      // would be the more comfortable wording and the false one.
      warnings.push(`Key Performance Indicators has ${proposed} proposed target(s) awaiting confirmation — a starting point, not yet agreed`);
    }
  }

  if (PROFICIENCY_INLINE.test(content)) {
    warnings.push('Technology Proficiency Levels uses inline bullets — the template puts each level on its own **sub-heading** line');
  }

  if (!INTERACTION_MODE_COLUMN.test(content)) {
    errors.push('Interactions table is missing the "Interaction Mode" column');
  }

  if (credentialContext) {
    const credentialResult = validateRoleCredentialReferences(
      content,
      credentialContext.credentialsById,
      { requireComplete: credentialContext.auditedRoles.has(rel) },
    );
    errors.push(...credentialResult.errors);
    warnings.push(...credentialResult.warnings);
  }

  return { rel, errors, warnings, skipped: false };
}

// Group H1 titles across all non-reference role files and return
// [{ title, files: [rel, …] }] for any title held by more than one role.
// Duplicate titles shipped in both v1.2.0 (3 cross-domain pairs) and
// v1.3.0 (a pair the filename scan missed because the files differed);
// this makes the recurrence a blocking validation error.
function findDuplicateTitles(rolesDir = ROLES_DIR) {
  const byTitle = new Map();
  for (const filePath of listRoleFiles(rolesDir)) {
    if (REFERENCE_DOC_PATTERN.test(path.basename(filePath))) continue;
    const title = parseMeta(fs.readFileSync(filePath, 'utf8')).title;
    if (!title) continue; // a missing H1 is already a per-file error
    const rel = path.relative(path.dirname(rolesDir), filePath).replace(/\\/g, '/');
    if (!byTitle.has(title)) byTitle.set(title, []);
    byTitle.get(title).push(rel);
  }
  return [...byTitle.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([title, files]) => ({ title, files: files.sort() }));
}

function main() {
  const credentialContext = loadCredentialRegistry(CREDENTIALS_FILE);
  const files   = listRoleFiles();
  const results = files.map(f => validateFile(f, ROLES_DIR, credentialContext));

  const withErrors   = results.filter(r => r.errors.length > 0);
  const withWarnings = results.filter(r => r.warnings.length > 0);
  const skipped      = results.filter(r => r.skipped);
  const duplicates   = findDuplicateTitles();

  if (credentialContext.errors.length > 0 || credentialContext.warnings.length > 0) {
    console.log(`\n${CREDENTIALS_FILE}`);
    for (const error of credentialContext.errors) console.log(`  ERROR: ${error}`);
    for (const warning of credentialContext.warnings) console.log(`  warn:  ${warning}`);
  }

  for (const r of withErrors) {
    console.log(`\n✖ ${r.rel}`);
    for (const e of r.errors) console.log(`  ERROR: ${e}`);
    for (const w of r.warnings) console.log(`  warn:  ${w}`);
  }
  for (const r of withWarnings.filter(r => r.errors.length === 0)) {
    console.log(`\n⚠ ${r.rel}`);
    for (const w of r.warnings) console.log(`  warn:  ${w}`);
  }

  for (const d of duplicates) {
    console.log(`\n✖ Duplicate role title: "${d.title}"`);
    for (const f of d.files) console.log(`  ${f}`);
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`Checked ${files.length} role files (${skipped.length} reference docs skipped)`);
  console.log(`  ${withErrors.length} file(s) with errors`);
  console.log(`  ${withWarnings.length} file(s) with warnings`);
  console.log(`  ${duplicates.length} duplicate title(s)`);
  console.log('─'.repeat(60));

  if (withErrors.length > 0 || credentialContext.errors.length > 0 || duplicates.length > 0 ||
      (STRICT && (withWarnings.length > 0 || credentialContext.warnings.length > 0))) {
    process.exitCode = 1;
  }
}

// Only run the CLI when executed directly (`node validate-roles.js`).
// The test suite requires this module and calls the exported functions.
if (require.main === module) {
  main();
}

module.exports = { listRoleFiles, validateFile, findDuplicateTitles, REQUIRED_SECTIONS };
