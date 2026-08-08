'use strict';

const fs = require('node:fs');

const CREDENTIAL_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_TYPES = new Set(['certification', 'certificate']);
const ALLOWED_STATUSES = new Set(['active', 'retired', 'superseded']);
const CREDENTIAL_MARKER = /<!-- credential: ([a-z0-9]+(?:-[a-z0-9]+)*) -->/g;
const CREDENTIAL_LIKE_MARKER = /<!--(?=[^>]*\bcredential\b)[^>]*-->/gi;
const REQUIRED_FIELDS = [
  'id', 'name', 'issuer', 'type', 'url', 'status',
  'verified_on', 'owner', 'review_months',
];

function emptyResult(errors = []) {
  return { errors, warnings: [], credentialsById: new Map(), auditedRoles: new Set() };
}

function isRealIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function reviewDueDate(verifiedOn, months) {
  const date = new Date(`${verifiedOn}T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + months);
  return date;
}

function validateCredentialRegistry(value, now = new Date()) {
  const result = emptyResult();
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    result.errors.push('Credential registry must be a JSON object');
    return result;
  }
  if (value.schema_version !== 1) result.errors.push('schema_version must be 1');
  if (!Array.isArray(value.audited_roles)) result.errors.push('audited_roles must be an array');
  if (!Array.isArray(value.credentials)) {
    result.errors.push('credentials must be an array');
    return result;
  }

  for (const role of value.audited_roles || []) {
    if (typeof role !== 'string' || !/^Roles\/[a-z0-9_/-]+\.md$/.test(role)) {
      result.errors.push(`Invalid audited role path: ${String(role)}`);
    } else if (result.auditedRoles.has(role)) {
      result.errors.push(`Duplicate audited role path: ${role}`);
    } else {
      result.auditedRoles.add(role);
    }
  }

  for (const [index, credential] of value.credentials.entries()) {
    const prefix = `credentials[${index}]`;
    if (!credential || typeof credential !== 'object' || Array.isArray(credential)) {
      result.errors.push(`${prefix} must be an object`);
      continue;
    }
    for (const field of REQUIRED_FIELDS) {
      if (credential[field] === undefined || credential[field] === '') {
        result.errors.push(`${prefix}.${field} is required`);
      }
    }
    for (const field of ['name', 'issuer']) {
      if (typeof credential[field] !== 'string' || !credential[field].trim()) {
        result.errors.push(`${prefix}.${field} must be a non-empty string`);
      }
    }
    if (!CREDENTIAL_ID_PATTERN.test(credential.id || '')) {
      result.errors.push(`${prefix}.id must be lowercase kebab-case`);
    } else if (result.credentialsById.has(credential.id)) {
      result.errors.push(`Duplicate credential ID: ${credential.id}`);
    } else {
      result.credentialsById.set(credential.id, credential);
    }
    if (!ALLOWED_TYPES.has(credential.type)) result.errors.push(`${prefix}.type is unsupported`);
    if (!ALLOWED_STATUSES.has(credential.status)) result.errors.push(`${prefix}.status is unsupported`);
    try {
      const url = new URL(credential.url);
      if (url.protocol !== 'https:') result.errors.push(`${prefix}.url must use https`);
    } catch {
      result.errors.push(`${prefix}.url must be a valid https URL`);
    }
    if (!isRealIsoDate(credential.verified_on || '')) {
      result.errors.push(`${prefix}.verified_on must be a real YYYY-MM-DD date`);
    }
    if (!Number.isInteger(credential.review_months) || credential.review_months < 1) {
      result.errors.push(`${prefix}.review_months must be a positive integer`);
    }
    if (typeof credential.owner !== 'string' || !credential.owner.trim()) {
      result.errors.push(`${prefix}.owner is required`);
    }
    if (credential.notes !== undefined && typeof credential.notes !== 'string') {
      result.errors.push(`${prefix}.notes must be a string when present`);
    }
    if (isRealIsoDate(credential.verified_on || '') &&
        Number.isInteger(credential.review_months) && credential.review_months > 0 &&
        now > reviewDueDate(credential.verified_on, credential.review_months)) {
      result.warnings.push(`${credential.id || prefix} credential verification is stale`);
    }
  }
  return result;
}

function loadCredentialRegistry(filePath, now = new Date()) {
  try {
    return validateCredentialRegistry(JSON.parse(fs.readFileSync(filePath, 'utf8')), now);
  } catch (error) {
    return emptyResult([`Unable to read or parse credential registry: ${error.message}`]);
  }
}

function certificationSection(markdown) {
  const start = markdown.search(/^##\s+Recommended Certifications (?:&|and) Learning Paths\s*$/im);
  if (start === -1) return '';
  const rest = markdown.slice(start);
  const next = rest.slice(1).search(/\n##\s+/);
  return next === -1 ? rest : rest.slice(0, next + 1);
}

function findCredentialReferences(markdown) {
  const references = [];
  CREDENTIAL_MARKER.lastIndex = 0;
  for (const match of markdown.matchAll(CREDENTIAL_MARKER)) {
    references.push({
      id: match[1],
      line: markdown.slice(0, match.index).split(/\r?\n/).length,
      raw: match[0],
    });
  }
  return references;
}

function recommendedCredentialBullets(markdown) {
  const section = certificationSection(markdown);
  const learningIndex = section.search(/^\*\*Learning Resources and Communities:\*\*\s*$/im);
  const credentialPart = learningIndex === -1 ? section : section.slice(0, learningIndex);
  return credentialPart.split(/\r?\n/)
    .map((line, index) => ({ line, number: index + 1 }))
    .filter(item => /^\s*-\s+/.test(item.line));
}

function validateRoleCredentialReferences(markdown, credentialsById, { requireComplete = false } = {}) {
  const errors = [];
  const warnings = [];
  const seen = new Set();
  CREDENTIAL_LIKE_MARKER.lastIndex = 0;
  for (const match of markdown.matchAll(CREDENTIAL_LIKE_MARKER)) {
    CREDENTIAL_MARKER.lastIndex = 0;
    if (!CREDENTIAL_MARKER.test(match[0])) {
      const line = markdown.slice(0, match.index).split(/\r?\n/).length;
      errors.push(`Invalid credential marker on line ${line}: ${match[0]}`);
    }
  }
  for (const reference of findCredentialReferences(markdown)) {
    if (!credentialsById.has(reference.id)) {
      errors.push(`Unknown credential reference "${reference.id}" on line ${reference.line}`);
    }
    if (seen.has(reference.id)) {
      errors.push(`Duplicate credential reference "${reference.id}" in one role`);
    }
    seen.add(reference.id);
  }
  if (requireComplete) {
    for (const bullet of recommendedCredentialBullets(markdown)) {
      CREDENTIAL_MARKER.lastIndex = 0;
      const matches = [...bullet.line.matchAll(CREDENTIAL_MARKER)];
      if (matches.length === 0) {
        errors.push(`Audited credential bullet is missing credential marker: ${bullet.line.trim()}`);
      } else if (matches.length > 1) {
        errors.push(`Audited credential bullet has multiple credential markers: ${bullet.line.trim()}`);
      }
    }
  }
  return { errors, warnings };
}

module.exports = {
  validateCredentialRegistry,
  loadCredentialRegistry,
  CREDENTIAL_ID_PATTERN,
  ALLOWED_TYPES,
  ALLOWED_STATUSES,
  findCredentialReferences,
  validateRoleCredentialReferences,
};
