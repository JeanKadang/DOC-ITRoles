// Validates every role file under Roles/ against the canonical 13-section
// structure defined in docs/role_template.md. Zero dependencies — run with
// `npm run validate` or `node validate-roles.js [--strict]`.
//
// Exit code 0: no errors (warnings may still be printed).
// Exit code 1: at least one error, or --strict was passed and there are warnings.

'use strict';

const fs   = require('fs');
const path = require('path');
const { parseMeta, KNOWN_LEVELS, normalizeLevel, REFERENCE_DOC_PATTERN, DOMAIN_LABELS } = require('./roleMeta');

const ROOT       = __dirname;
// ROLES_DIR env override exists for the test suite, which points the
// validator at a fixture tree; normal runs always use Roles/.
const ROLES_DIR  = process.env.ROLES_DIR ? path.resolve(process.env.ROLES_DIR) : path.join(ROOT, 'Roles');
const STRICT     = process.argv.includes('--strict');

// Required section headings. Each entry accepts one or more historical
// spellings so the validator surfaces genuinely missing content rather than
// failing on cosmetic wording differences (tracked as a follow-up cleanup).
const REQUIRED_SECTIONS = [
  { name: 'Role Overview',                          patterns: [/^##\s+Role Overview/im] },
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

function validateFile(filePath, rolesDir = ROLES_DIR) {
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

  if (!meta.lastReviewed) {
    errors.push('Missing **Last Reviewed** metadata field');
  } else if (!/^\d{4}-\d{2}$/.test(meta.lastReviewed)) {
    warnings.push(`Last Reviewed "${meta.lastReviewed}" is not in YYYY-MM format`);
  }

  for (const section of REQUIRED_SECTIONS) {
    const found = section.patterns.some(re => re.test(content));
    if (!found) errors.push(`Missing section: ## ${section.name}`);
  }

  return { rel, errors, warnings, skipped: false };
}

function main() {
  const files   = listRoleFiles();
  const results = files.map(f => validateFile(f));

  const withErrors   = results.filter(r => r.errors.length > 0);
  const withWarnings = results.filter(r => r.warnings.length > 0);
  const skipped      = results.filter(r => r.skipped);

  for (const r of withErrors) {
    console.log(`\n✖ ${r.rel}`);
    for (const e of r.errors) console.log(`  ERROR: ${e}`);
    for (const w of r.warnings) console.log(`  warn:  ${w}`);
  }
  for (const r of withWarnings.filter(r => r.errors.length === 0)) {
    console.log(`\n⚠ ${r.rel}`);
    for (const w of r.warnings) console.log(`  warn:  ${w}`);
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`Checked ${files.length} role files (${skipped.length} reference docs skipped)`);
  console.log(`  ${withErrors.length} file(s) with errors`);
  console.log(`  ${withWarnings.length} file(s) with warnings`);
  console.log('─'.repeat(60));

  if (withErrors.length > 0 || (STRICT && withWarnings.length > 0)) {
    process.exitCode = 1;
  }
}

// Only run the CLI when executed directly (`node validate-roles.js`).
// The test suite requires this module and calls the exported functions.
if (require.main === module) {
  main();
}

module.exports = { listRoleFiles, validateFile, REQUIRED_SECTIONS };
