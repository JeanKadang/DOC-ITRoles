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

module.exports = { normalizeTitle, buildRoleIndex, annotateTarget };
