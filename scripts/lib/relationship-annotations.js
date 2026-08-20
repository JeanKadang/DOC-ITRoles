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
// never produce a diff.
function annotateField(fieldText, ctx) {
  if (/^\s*none\s*$/i.test(fieldText)) return { text: fieldText, resolved: [], legacy: [] };

  const segments = fieldText.split(';').map(s => annotateSegment(s, ctx));
  const resolved = segments.filter(s => s.status === 'resolved').map(s => s.detail);
  const legacy = segments.filter(s => s.status === 'legacy').map(s => s.detail);

  if (resolved.length === 0) return { text: fieldText, resolved, legacy };

  const text = segments.map(s => s.text.trim()).join('; ');
  return { text, resolved, legacy };
}

module.exports = { normalizeTitle, buildRoleIndex, annotateTarget, isAnnotated, annotateField };
