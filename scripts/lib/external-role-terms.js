'use strict';

// Curated, exact-match destinations that are legitimately outside the
// catalogue (#269). Every entry here must be a term actually observed in
// Roles/ and confirmed — via scripts/audit-relationship-terms.js — to name
// something outside the catalogue, not a guess at a pattern. Extend this
// list by re-running the audit script and adding what it surfaces.
//
// Deliberately NOT included, despite appearing in both ADR-0006's own prose
// and scripts/relationship-report.js's EXTERNAL regex: CEO, CFO, CIO, CISO,
// CTO, SVP. The catalogue now models each of these as a real role with its
// own Role ID (Roles/c_suite/chief_{executive,financial,information,
// technology}_officer.md, Roles/leadership/chief_information_security_
// officer.md, Roles/leadership/svp_technology.md). relationship-report.js
// itself says as much at the abbreviation check preceding its own EXTERNAL
// test: "the titles most often abbreviated -- CEO, CTO, CISO -- are exactly
// the ones that look external." Marking the abbreviation external-role here
// would falsely stamp a title-drift case (abbreviation vs. full title) as
// "outside the catalogue" — the exact silent-lie this list exists to avoid.
// These abbreviations are left as legacy, unannotated text; a future task
// may add abbreviation-aware resolution, but this migration only ever
// exact-matches.

const EXTERNAL_TERMS = [
  'Board',
  'Board of Directors',
  'Executive',
  'Managing Director',
  'Chief AI Officer',
  'Chief AI Officer (CAIO)',
  'Chief Risk Officer',
  'Regulators',
  'Vendors',
  'People Operations',
  'Legal',
  'Legal and Compliance',
  'HR',
  'Customers',
  'Product Teams',

  // Added from scripts/audit-relationship-terms.js's live output against
  // Roles/ (task-5-audit-output.txt) — each confirmed to have no colliding
  // catalogue title in the 170 distinct role titles the catalogue defines.
  'COO', // C-suite title; no "Chief Operating Officer" catalogue role exists. Attested x3, e.g. Roles/c_suite/chief_information_officer.md's interaction table.
  'Chief Data Officer', // C-suite title; no catalogue role. Attested x3 as career-path/interaction target (e.g. Roles/database_management/database_architect.md).
  'Chief Data Officer (CDO)', // Same title, parenthetical-abbreviation form used verbatim in several files (e.g. Roles/leadership/data_ai_chapter_lead.md). Attested x2.
  'CPO (Chief People Officer)', // C-suite title; no catalogue role. Exact literal string repeated identically across Roles/c_suite/*.md and Roles/leadership/svp_technology.md interaction tables. Attested x4.
  'Procurement', // External department. One source file spells this out directly: Roles/service_management/vendor_supplier_it_asset_manager.md lists "Procurement / Legal (external to this catalog)". Attested x5.
  'Compliance / Audit', // External function, consistent interaction-table target across security/identity roles (e.g. Roles/security_identity/privileged_access_management_engineer.md). Attested x3.
  'Compliance', // Bare form of the same external function (e.g. Roles/security/devsecops_engineer.md). Attested x2.
  'Finance', // External department, same pattern as HR/Legal/Procurement (e.g. Roles/server_hardware/server_hardware_product_owner.md). Attested x2.
  'Risk Management', // External function; no catalogue role is named this (catalogue's closest role, "GRC / Risk & Compliance Analyst", is a distinct title). Attested x4 across security/ai_governance/data_protection interaction tables.
  'Security Operations', // External function/SOC; no catalogue role is named this. Attested x4 across security/client_platform/modern_infrastructure interaction tables.
];

module.exports = { EXTERNAL_TERMS };
