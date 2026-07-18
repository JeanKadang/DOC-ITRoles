// Shared role-metadata parser.
// Single source of truth for reading the metadata block that every role file
// carries, so that both the web server (server.js) and the content validator
// (validate-roles.js) interpret roles the same way.

'use strict';

// Files that document standards/policy rather than a single role (e.g.
// cloud_cost_optimization_standards.md). They carry no Role Level or Last
// Reviewed metadata by design, so both the validator and the web server's
// role listing/stale-tracking must exclude them rather than treat them as
// roles with missing metadata.
const REFERENCE_DOC_PATTERN = /_standards\.md$/;

// Canonical human-readable label for each domain folder under Roles/. Single
// source of truth for both the web server (sidebar/matrix labels) and the
// validator (checking each role's Domain metadata value matches its folder).
const DOMAIN_LABELS = {
  leadership:                             'Leadership',
  ai_governance:                          'AI Governance',
  app_platforms:                          'App Platforms',
  cloud_platforms:                        'Cloud Platforms',
  data_engineering:                       'Data Engineering',
  data_management:                        'Data Management',
  data_protection:                        'Data Protection',
  database_management:                    'Database Management',
  devops:                                 'DevOps',
  directory_services:                     'Directory Services',
  client_platform:                        'Client Platform',
  endpoint_management:                    'Endpoint Management',
  enterprise_architecture:                'Enterprise Architecture',
  FinOps:                                 'FinOps',
  infrastructure_onboarding_cross_platform: 'Infrastructure Onboarding',
  integration_middleware:                 'Integration & Middleware',
  itsm_configuration:                     'ITSM & Configuration',
  kubernetes:                             'Kubernetes',
  modern_infrastructure:                  'Modern Infrastructure',
  modern_workplace:                       'Modern Workplace',
  network:                                'Network',
  security:                               'Security',
  security_cross_platform:                'Security Cross-Platform',
  security_identity:                      'Security & Identity',
  server_hardware:                        'Server Hardware',
  server_hardware_hpe:                    'HPE Server Hardware',
  server_os_linux:                        'Linux Server OS',
  server_os_windows:                      'Windows Server OS',
  service_management:                     'Service Management',
  c_suite:                                'C-Suite',
  specialized_computing:                  'Specialized Computing',
  virtualization:                         'Virtualization',
};

// Canonical role-level vocabulary used by the UI badges, matrix columns and
// the validator. Order is not significant here (the UI defines its own order).
const CANONICAL_LEVELS = [
  'CEO',
  'CTO',
  'CIO',
  'CFO',
  'CISO',
  'SVP',
  'Product Area Lead',
  'Technical Area Lead',
  'Chapter Lead',
  'Principal Architect',
  'Lead Architect',
  'Architect',
  'Senior Engineer',
  'Engineer',
  'Product Owner',
];

const KNOWN_LEVELS = new Set(CANONICAL_LEVELS);

// Maps free-text metadata values onto the canonical vocabulary above.
// Keyed by the lower-cased, trimmed raw value.
const LEVEL_ALIASES = {
  'svp of technology': 'SVP',
  'svp':               'SVP',
};

// Read a single `| **Field** | value |` cell from a markdown metadata table.
function parseField(content, field) {
  const re = new RegExp(`\\|\\s*\\*\\*${field}\\*\\*\\s*\\|\\s*(.+?)\\s*\\|`, 'i');
  const m = stripBOM(content).match(re);
  return m ? m[1].trim() : null;
}

// Normalize a raw role-level string to the canonical vocabulary.
function normalizeLevel(raw) {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  if (LEVEL_ALIASES[key]) return LEVEL_ALIASES[key];
  // Exact (case-insensitive) match against a canonical value.
  const hit = CANONICAL_LEVELS.find(l => l.toLowerCase() === key);
  return hit || raw.trim();
}

// Filename-based level detection. Used only as a fallback when a file has no
// Role Level metadata (e.g. reference/standards documents stored among roles).
function detectLevelFromFilename(filename) {
  if (/chief_executive_officer\.md$/.test(filename))            return 'CEO';
  if (/chief_technology_officer\.md$/.test(filename))           return 'CTO';
  if (/chief_information_officer\.md$/.test(filename))          return 'CIO';
  if (/chief_financial_officer\.md$/.test(filename))            return 'CFO';
  if (/svp_technology\.md$/.test(filename))                     return 'SVP';
  if (/chief_information_security_officer\.md$/.test(filename)) return 'CISO';
  if (/product_area_lead\.md$/.test(filename))                  return 'Product Area Lead';
  if (/technical_area_lead\.md$/.test(filename))                return 'Technical Area Lead';
  if (/_chapter_lead\.md$/.test(filename))                      return 'Chapter Lead';
  if (/cloud_principal_architect\.md$/.test(filename))          return 'Principal Architect';
  if (/cloud_lead_architect\.md$/.test(filename))               return 'Lead Architect';
  if (/_architect\.md$/.test(filename))                         return 'Architect';
  if (/_senior_engineer\.md$/.test(filename))                   return 'Senior Engineer';
  if (/cloud_security_posture_manager\.md$/.test(filename))     return 'Senior Engineer';
  if (/dataops_specialist\.md$/.test(filename))                 return 'Senior Engineer';
  if (/technical_community_leader\.md$/.test(filename))         return 'Senior Engineer';
  if (/engineering_practices_champion\.md$/.test(filename))     return 'Senior Engineer';
  if (/identity_governance_specialist\.md$/.test(filename))     return 'Senior Engineer';
  if (/_product_owner\.md$/.test(filename))                     return 'Product Owner';
  return 'Engineer';
}

// Some role files were saved with a leading UTF-8 BOM. Node decodes this as a
// literal U+FEFF character, which breaks the `^#` title regex on line 1 (the
// BOM sits before the `#`). Strip it before any pattern matching.
function stripBOM(content) {
  return content.charCodeAt(0) === 0xFEFF ? content.slice(1) : content;
}

// Parse the full metadata block from a role file's content.
function parseMeta(content) {
  const clean = stripBOM(content);
  const titleMatch = clean.match(/^#\s+(.+)/m);
  return {
    title:        titleMatch ? titleMatch[1].trim() : null,
    domain:       parseField(content, 'Domain'),
    chapter:      parseField(content, 'Chapter:') || parseField(content, 'Chapter'),
    levelRaw:     parseField(content, 'Role Level'),
    lastReviewed: parseField(content, 'Last Reviewed'),
  };
}

// Resolve a role's level: prefer the metadata value (normalized), fall back to
// filename detection when the file carries no Role Level field.
function resolveLevel(content, filename) {
  const raw = parseField(content, 'Role Level');
  return raw ? normalizeLevel(raw) : detectLevelFromFilename(filename);
}

module.exports = {
  CANONICAL_LEVELS,
  KNOWN_LEVELS,
  REFERENCE_DOC_PATTERN,
  DOMAIN_LABELS,
  parseField,
  parseMeta,
  normalizeLevel,
  detectLevelFromFilename,
  resolveLevel,
};
