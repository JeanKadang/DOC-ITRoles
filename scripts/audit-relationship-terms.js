'use strict';

// Read-only inventory of relationship text that neither resolves to a
// catalogue title nor matches the curated external-terms list (#269). Run
// this before extending scripts/lib/external-role-terms.js, so the list is
// built from evidence in the catalogue rather than guessed at. This never
// edits a file.

const fs = require('node:fs');
const path = require('node:path');
const { buildRoleIndex, annotateField } = require('./lib/relationship-annotations.js');

const ROLES_DIR = path.resolve(__dirname, '..', 'Roles');

function roleFiles(dir = ROLES_DIR, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) roleFiles(full, out);
    else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(full);
  }
  return out;
}

function fieldValue(text, name) {
  const m = text.match(new RegExp(`\\|\\s*\\*\\*${name}\\*\\*\\s*\\|\\s*([^|\\n]*)`));
  return m ? m[1].trim() : null;
}

function sectionBody(content, headingPattern) {
  const start = content.search(headingPattern);
  if (start === -1) return '';
  const rest = content.slice(start);
  const next = rest.slice(1).search(/\n##\s+/);
  return next === -1 ? rest : rest.slice(0, next + 1);
}

function extractFields(text) {
  const careerSection = sectionBody(text, /^##\s+Career Development Path/im);
  const careerBullets = [...careerSection.matchAll(/^-\s+(.+)$/gm)].map(m => m[1]);

  const interactionsSection = sectionBody(text, /^##\s+(Interactions with Other Roles|Relationships (&|and) Collaboration)/im);
  const interactionRoles = [...interactionsSection.matchAll(/^\|\s*([^|]+?)\s*\|/gm)]
    .map(m => m[1])
    .filter(cell => cell && cell !== 'Role' && !/^[-:\s]+$/.test(cell));

  return {
    reportsTo: fieldValue(text, 'Reports To'),
    directReports: fieldValue(text, 'Direct Reports'),
    careerBullets,
    interactionRoles,
  };
}

function loadRoles(dir = ROLES_DIR) {
  return roleFiles(dir).map(file => {
    const text = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
    const title = (text.match(/^#\s+(.+)$/m) || [])[1];
    const roleId = (text.match(/\|\s*\*\*Role ID\*\*\s*\|\s*`([^`]+)`/) || [])[1];
    return { file, title: title && title.trim(), roleId, fields: extractFields(text) };
  }).filter(r => r.title);
}

function collectUnresolvedTerms(roles, externalTerms) {
  const roleIndex = buildRoleIndex(roles.filter(r => r.roleId).map(r => ({ title: r.title, roleId: r.roleId })));
  const ctx = { roleIndex, externalTerms };
  const counts = new Map();

  const record = text => counts.set(text, (counts.get(text) || 0) + 1);

  for (const role of roles) {
    const { reportsTo, directReports, careerBullets, interactionRoles } = role.fields;
    for (const value of [reportsTo, directReports]) {
      if (!value) continue;
      const { legacy } = annotateField(value, ctx);
      legacy.forEach(record);
    }
    for (const bullet of careerBullets) {
      const { legacy } = annotateField(bullet, ctx);
      legacy.forEach(record);
    }
    for (const cell of interactionRoles) {
      const { legacy } = annotateField(cell, ctx);
      legacy.forEach(record);
    }
  }

  return new Map([...counts].sort((a, b) => b[1] - a[1]));
}

function run() {
  const roles = loadRoles();
  const counts = collectUnresolvedTerms(roles, new Set());
  console.log(`${roles.length} roles scanned.\n`);
  console.log('Unresolved relationship text (not a catalogue title, not a curated external term):\n');
  for (const [text, count] of counts) {
    console.log(`  ${String(count).padStart(4)}  ${text}`);
  }
}

if (require.main === module) run();

module.exports = { collectUnresolvedTerms, loadRoles, extractFields };
