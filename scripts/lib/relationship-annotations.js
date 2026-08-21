'use strict';

// Shared parser/annotator for the relationship representation decided in
// ADR-0006 (docs/adr/0006-annotate-role-relationships-with-stable-targets.md).
// This module only ever adds an annotation when it can prove one is
// correct — an exact title match or an exact curated external-term match.
// Everything else stays as legacy, unannotated text. Guessing here would
// reproduce the exact silent-drift failure ADR-0006 exists to prevent.

function normalizeTitle(title) {
  return String(title).trim().toLowerCase().replace(/\s+/g, ' ');
}

function buildRoleIndex(roles) {
  const index = new Map();
  for (const { title, roleId } of roles) {
    index.set(normalizeTitle(title), { roleId, title });
  }
  return index;
}

function annotateTarget(label, { roleIndex, externalTerms }) {
  const trimmed = String(label).trim();
  if (!trimmed) return null;
  const norm = normalizeTitle(trimmed);

  const role = roleIndex.get(norm);
  if (role) {
    return { text: `${trimmed} <!-- role: ${role.roleId} -->`, kind: 'role', roleId: role.roleId };
  }
  if (externalTerms.has(norm)) {
    return { text: `${trimmed} <!-- external-role -->`, kind: 'external' };
  }
  return null;
}

const ANNOTATION_MARKER = /<!--\s*(role:|external-role|one-of)/i;

function isAnnotated(segment) {
  return ANNOTATION_MARKER.test(segment);
}

// Builds a "<!-- one-of -->A, B, or C<!-- /one-of -->" group only when every
// candidate independently resolves. Punctuation is normalized to an Oxford
// comma to match ADR-0006's own examples — the candidate labels themselves
// are used verbatim, only the joiners are standardized.
function buildOneOf(rawCandidates, ctx) {
  const candidates = rawCandidates.map(c => c.trim()).filter(Boolean);
  if (candidates.length < 2) return null;

  const annotated = candidates.map(label => annotateTarget(label, ctx));
  if (annotated.some(a => !a)) return null;

  const texts = annotated.map(a => a.text);
  const joined = texts.length === 2
    ? `${texts[0]} or ${texts[1]}`
    : `${texts.slice(0, -1).join(', ')}, or ${texts[texts.length - 1]}`;

  return { text: `<!-- one-of -->${joined}<!-- /one-of -->`, kind: 'one-of', options: annotated };
}

// A top-level segment is either a single target or a genuine "or" choice
// among two or more targets. Direct resolution is tried first so a title
// that happens to contain the word "or" is never misread as a choice.
function annotateSegment(segment, ctx) {
  const trimmed = segment.trim();
  if (!trimmed || /^none$/i.test(trimmed) || isAnnotated(trimmed)) {
    return { text: segment, status: 'skip' };
  }

  const direct = annotateTarget(trimmed, ctx);
  if (direct) return { text: direct.text, status: 'resolved', detail: direct };

  if (/\bor\b/i.test(trimmed)) {
    const candidates = trimmed.split(/,|\bor\b/i);
    const oneOf = buildOneOf(candidates, ctx);
    if (oneOf) return { text: oneOf.text, status: 'resolved', detail: oneOf };
  }

  return { text: segment, status: 'legacy', detail: trimmed };
}

// Top-level targets in a field are separated by ";" (see ADR-0006's Direct
// Reports example). A field that resolves nothing is returned completely
// unchanged, including its original separator spacing, so untouched fields
// never produce a diff. "None" is recognized with an optional parenthetical
// explanation (e.g. "None (explanation; with; internal; punctuation)").
function annotateField(fieldText, ctx) {
  if (/^\s*none\s*(\(.*\))?\s*$/i.test(fieldText)) return { text: fieldText, resolved: [], legacy: [] };

  const segments = fieldText.split(';').map(s => annotateSegment(s, ctx));
  const resolved = segments.filter(s => s.status === 'resolved').map(s => s.detail);
  const legacy = segments.filter(s => s.status === 'legacy').map(s => s.detail);

  if (resolved.length === 0) return { text: fieldText, resolved, legacy };

  const text = segments.map(s => s.text.trim()).join('; ');
  return { text, resolved, legacy };
}

// Matches a metadata table row's value cell: group 1 is everything up to
// and including the opening "| **Field** | ", group 2 is the value, group 3
// is the trailing whitespace and closing pipe. Replacing only group 2 keeps
// the row's formatting untouched when nothing resolves.
function fieldRowPattern(name) {
  return new RegExp(`(\\|\\s*\\*\\*${name}\\*\\*\\s*\\|\\s*)([^|\\n]*?)(\\s*\\|)`);
}

function migrateTableField(content, name, ctx, resolved, legacy) {
  const pattern = fieldRowPattern(name);
  const match = content.match(pattern);
  if (!match) return content;

  const { text, resolved: fieldResolved, legacy: fieldLegacy } = annotateField(match[2], ctx);
  resolved.push(...fieldResolved);
  legacy.push(...fieldLegacy.map(entry => ({ field: name, text: entry })));

  if (text === match[2]) return content;
  return content.replace(pattern, `$1${text}$3`);
}

// Same boundary rule validate-roles.js uses for section bodies: a heading
// runs to the next "## " heading or end of document.
function sectionBody(content, headingPattern) {
  const start = content.search(headingPattern);
  if (start === -1) return null;
  const rest = content.slice(start);
  const next = rest.slice(1).search(/\n##\s+/);
  const end = next === -1 ? rest.length : next + 1;
  return { start, end: start + end, text: rest.slice(0, end) };
}

function migrateInteractionsTable(content, ctx, resolved, legacy) {
  const section = sectionBody(content, /^##\s+(Interactions with Other Roles|Relationships (&|and) Collaboration)/im);
  if (!section) return content;

  const lines = section.text.split('\n');
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip the header row and the "|---|---|---|" separator row.
    if (!/^\|/.test(line) || /^\|\s*Role\s*\|/.test(line) || /^\|[\s:|-]+\|$/.test(line)) continue;

    const cellMatch = line.match(/^(\|\s*)([^|]*?)(\s*\|.*)$/);
    if (!cellMatch) continue;

    const { text, resolved: cellResolved, legacy: cellLegacy } = annotateField(cellMatch[2], ctx);
    resolved.push(...cellResolved);
    legacy.push(...cellLegacy.map(entry => ({ field: 'Interactions with Other Roles', text: entry })));

    if (text !== cellMatch[2]) {
      lines[i] = `${cellMatch[1]}${text}${cellMatch[3]}`;
      changed = true;
    }
  }

  if (!changed) return content;
  const newSection = lines.join('\n');
  return content.slice(0, section.start) + newSection + content.slice(section.end);
}

function migrateCareerBullets(content, ctx, resolved, legacy) {
  const section = sectionBody(content, /^##\s+Career Development Path/im);
  if (!section) return content;

  const lines = section.text.split('\n');
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const bulletMatch = lines[i].match(/^(-\s+)(.+)$/);
    if (!bulletMatch) continue;

    const { text, resolved: itemResolved, legacy: itemLegacy } = annotateField(bulletMatch[2], ctx);
    resolved.push(...itemResolved);
    legacy.push(...itemLegacy.map(entry => ({ field: 'Career Development Path', text: entry })));

    if (text !== bulletMatch[2]) {
      lines[i] = `${bulletMatch[1]}${text}`;
      changed = true;
    }
  }

  if (!changed) return content;
  const newSection = lines.join('\n');
  return content.slice(0, section.start) + newSection + content.slice(section.end);
}

function migrateRoleContent(content, ctx) {
  const resolved = [];
  const legacy = [];
  let out = content;
  out = migrateTableField(out, 'Reports To', ctx, resolved, legacy);
  out = migrateTableField(out, 'Direct Reports', ctx, resolved, legacy);
  out = migrateInteractionsTable(out, ctx, resolved, legacy);
  out = migrateCareerBullets(out, ctx, resolved, legacy);
  return { content: out, resolved, legacy };
}

// The one place that knows the ADR-0006 annotation syntax well enough to
// strip it back out again. Every consumer that displays or matches against
// relationship text (server.js's search snippets, scripts/relationship-report.js,
// viewer-logic.js's reporting chips/career stepper) needs this, so it lives
// here rather than being re-derived per caller. viewer-logic.js runs in the
// browser via a plain <script> tag with no bundler and so cannot require()
// this module directly; it carries a documented, test-enforced mirror
// instead (see stripAnnotations in viewer-logic.js and the equivalence test
// in test/viewer-logic.test.js).
const ANNOTATION_COMMENT = /<!--[\s\S]*?-->/g;

function stripAnnotations(text) {
  let stripped = String(text == null ? '' : text);
  // A single .replace pass is what CodeQL's incomplete-sanitization check
  // flags: it cannot prove no comment-shaped text survives one pass, even
  // though real HTML comments can't nest. Looping until stable removes any
  // possibility, at the cost of one extra pass on the (already rare) input
  // that contains an annotation at all.
  let previous;
  do {
    previous = stripped;
    stripped = stripped.replace(ANNOTATION_COMMENT, '');
  } while (stripped !== previous);
  return stripped
    .replace(/\s+([,;])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

// Reads the ADR-0006 annotation syntax back into structured data — the
// counterpart to annotateField's writing side. Pure extraction: the role
// ID is already embedded in the text, so this needs no roleIndex to parse,
// which is what makes it small and safe enough to mirror into the browser
// (see the equivalent function in viewer-logic.js).
function parseSingleTarget(segment) {
  const markerCount = (segment.match(/<!--\s*(role:|external-role)/gi) || []).length;
  if (markerCount > 1) {
    return { kind: 'invalid', reason: 'a label carries more than one target annotation', text: segment };
  }

  const roleMatch = segment.match(/^(.*?)\s*<!--\s*role:\s*([a-z0-9][a-z0-9-]*)\s*-->\s*$/);
  if (roleMatch) {
    const label = roleMatch[1].trim();
    if (!label) return { kind: 'invalid', reason: 'annotation has no visible label', text: segment };
    return { kind: 'catalogue', roleId: roleMatch[2], label };
  }

  const externalMatch = segment.match(/^(.*?)\s*<!--\s*external-role\s*-->\s*$/);
  if (externalMatch) {
    const label = externalMatch[1].trim();
    if (!label) return { kind: 'invalid', reason: 'annotation has no visible label', text: segment };
    return { kind: 'external', label };
  }

  // markerCount === 1 already proved an annotation marker is present (the
  // /gi regex above matches "role:" or "external-role" case-insensitively
  // and without constraining the id's characters). If neither roleMatch nor
  // externalMatch fired, the marker itself is malformed — an uppercase
  // letter, underscore, space, or empty id in the role id, or a capitalized
  // keyword — and that's a hand-edit typo, not unannotated prose. Falling
  // through to 'legacy' here would be exactly the silent-drift failure
  // ADR-0006 exists to catch.
  if (markerCount === 1) {
    return { kind: 'invalid', reason: 'malformed role annotation', text: segment };
  }

  return { kind: 'legacy', text: segment };
}

function parseOneOf(segment) {
  const closed = segment.match(/^<!--\s*one-of\s*-->([\s\S]*)<!--\s*\/one-of\s*-->$/);
  if (!closed) {
    if (/<!--\s*one-of\s*-->|<!--\s*\/one-of\s*-->/.test(segment)) {
      return { kind: 'invalid', reason: 'unclosed one-of wrapper', text: segment };
    }
    return null; // not a one-of at all — caller tries a single target instead
  }

  const inner = closed[1];
  if (/<!--\s*one-of\s*-->|<!--\s*\/one-of\s*-->/.test(inner)) {
    return { kind: 'invalid', reason: 'nested one-of wrapper', text: segment };
  }

  const options = inner.split(/,|\bor\b/i).map(s => s.trim()).filter(Boolean).map(parseSingleTarget);
  if (options.length < 2) {
    return { kind: 'invalid', reason: 'one-of has fewer than two options', text: segment };
  }
  if (options.some(o => o.kind === 'invalid' || o.kind === 'legacy')) {
    return { kind: 'invalid', reason: 'one-of contains an unannotated or invalid option', text: segment };
  }
  return { kind: 'one-of', options };
}

function parseSegment(segment) {
  const oneOf = parseOneOf(segment);
  if (oneOf) return oneOf;
  return parseSingleTarget(segment);
}

function parseRelationshipField(fieldText) {
  const text = String(fieldText == null ? '' : fieldText).trim();
  if (!text) return [];

  // The whole field is the empty-relationship sentinel, optionally with a
  // parenthetical explanation (matches annotateField's None handling).
  // Check this BEFORE splitting on semicolons, since the explanation can
  // contain internal semicolons.
  if (/^none\s*(\(.*\))?$/i.test(text)) return [];

  const segments = text.split(';').map(s => s.trim()).filter(Boolean);

  return segments.map(seg => {
    if (/^none\b/i.test(seg) && !/<!--/.test(seg)) {
      return { kind: 'invalid', reason: 'None combined with another target', text: seg };
    }
    return parseSegment(seg);
  });
}

module.exports = {
  normalizeTitle,
  buildRoleIndex,
  annotateTarget,
  isAnnotated,
  annotateField,
  migrateRoleContent,
  stripAnnotations,
  parseRelationshipField,
};
