'use strict';

// Inventories the legacy credential text still present in the catalogue, so the
// rollout in #210 can be split into bounded, reviewable batches and its progress
// re-measured after each one.
//
// This reports; it never edits a role file.
//
// The certification sections are not uniform, and the variation distorts a naive
// bullet count in both directions:
//
//   * some roles carry a flat list *and* "**Complementary Certifications:**"
//     subheads naming the same credentials again;
//   * some write "Complementary certifications:" as a bullet, not a subhead;
//   * many pack several credentials into one comma-joined bullet.
//
// So an "entry" here is one credential-shaped claim, not one bullet.

const fs = require('node:fs');
const path = require('node:path');

const ROLES_DIR = path.resolve(__dirname, '..', 'Roles');
const CREDENTIAL_MARKER = /<!--\s*credential:\s*([a-z0-9]+(?:-[a-z0-9]+)*)\s*-->/;

// Bullets under these subheads are reading material, not credentials. See the
// "Courses and organisation programmes" rule in docs/CREDENTIAL_REGISTRY.md.
const LEARNING_SUBHEAD = /learning|resource|communit|training/i;

function normalize(text) {
    return String(text).replace(/^﻿/, '').replace(/\r\n/g, '\n');
}

// Removes HTML comments from a bullet so the credential name is left behind.
//
// Scanned rather than pattern-replaced, for two reasons a regex kept getting
// wrong: a lazy `<!--[\s\S]*?-->` matches from the first opener to the first
// closer, so a comment enclosing another leaves the outer `<!--` in the name;
// and `-->` is not the only terminator HTML accepts — `--!>` closes a comment
// too, so a filter that knows only `-->` under-reads the text.
const COMMENT_OPEN = '<!--';
const COMMENT_ENDS = ['-->', '--!>'];

function firstEnd(value) {
    let at = -1;
    let length = 0;
    for (const end of COMMENT_ENDS) {
        const index = value.indexOf(end);
        if (index !== -1 && (at === -1 || index < at)) { at = index; length = end.length; }
    }
    return { at, length };
}

function stripComments(value) {
    let rest = String(value);
    let out = '';

    for (;;) {
        const open = rest.indexOf(COMMENT_OPEN);
        if (open === -1) { out += rest; break; }

        out += rest.slice(0, open);
        const after = rest.slice(open + COMMENT_OPEN.length);
        const end = firstEnd(after);
        // An unterminated comment swallows the remainder, as a parser would.
        if (end.at === -1) break;
        rest = after.slice(end.at + end.length);
    }

    // A nested comment leaves its outer terminator orphaned once the inner one
    // has been consumed; drop any delimiter that outlived its comment.
    for (const end of COMMENT_ENDS) out = out.split(end).join('');
    return out.split(COMMENT_OPEN).join('');
}

// Returns the body of the certification section, or '' when a role has none.
// Sliced by index deliberately: with the /m flag a `$` end-anchor matches a line
// end, which silently yields an empty section.
function certificationSection(text) {
    const body = normalize(text);
    const heading = body.match(/^## [^\n]*Certification[^\n]*$/mi);
    if (!heading) return '';

    const rest = body.slice(heading.index + heading[0].length);
    const next = rest.search(/\n## /);
    return next === -1 ? rest : rest.slice(0, next);
}

// "Oracle Certified Master, Java Architect" is one credential; "Docker
// Certified Associate, CompTIA Security+, and ITIL 4 Foundation" is three.
// Only split when the bullet reads as a list: three or more comma-separated
// parts, or two joined by "and"/"or" where both sides look self-contained.
function splitJoined(value) {
    const parts = value.split(/,\s*(?:and\s+|or\s+)?|\s+and\s+|\s+or\s+/i)
        .map(part => part.trim())
        .filter(Boolean);

    if (parts.length < 3) return [value];
    // A trailing fragment such as "Java Architect" is a continuation of the
    // preceding name, not a credential of its own.
    if (parts.some(part => part.split(/\s+/).length < 2)) return [value];
    return parts;
}

// One key per credential, so "Microsoft Certified: Identity and Access
// Administrator", its "Associate" spelling, and its "(SC-300)" spelling group
// together.
function aliasKey(name) {
    const normalized = String(name)
        .toLowerCase()
        .replace(/\([^)]*\)/g, ' ')
        .replace(/\b(certification|certifications|certificate|certified|associate|professional|expert|fundamentals|foundation)\b/g, ' ')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();

    // Stripped this far, a specific credential and a generic family collide --
    // "Certified Cloud Security Professional (CCSP)" and "Cloud security
    // certifications" both reduce to "cloud security". Keying on the kind as
    // well keeps them apart, so a family cannot absorb a credential and hand it
    // its own classification (#248).
    return `${classifyEntry(name)}:${normalized}`;
}

// A family or a topic is not an individual credential and must not become a
// registry record; a vague claim has to be rewritten before it can be audited.
// A single parenthesised exam or credential code — (AZ-900), (MS-900), (CCSP) —
// names one specific, individually-held credential. A list of them, as in
// "Kubernetes certifications (CKA, CKAD)", does not, which is why the plural
// family test runs first.
const EXAM_CODE = /\(([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*)\)/;

function classifyEntry(name) {
    const value = String(name).trim();

    if (/\bor\s+(other|similar|equivalent)\b/i.test(value)) return 'vague';
    if (/\b(certifications|certificates)\b/i.test(value)) return 'family';
    // Several real Microsoft certifications are named "... Fundamentals", so the
    // wording alone cannot rule a credential out; the code decides (#248).
    // "Microsoft Certified: ... Fundamentals" and "Microsoft 365 Certified:
    // Fundamentals" are certification brandings, not subject descriptions.
    if (EXAM_CODE.test(value) || /\bCertified:/.test(value)) return 'credential';
    if (/\b(fundamentals|basics|essentials)\b/i.test(value)) return 'topic';
    return 'credential';
}

// Every credential-shaped claim in one role's certification section.
function inventoryRole(text) {
    const section = certificationSection(text);
    if (!section) return [];

    const entries = [];
    let subhead = '';

    for (const line of section.split('\n')) {
        const heading = line.match(/^\*\*(.+?):?\*\*\s*$/);
        if (heading) { subhead = heading[1]; continue; }

        const bullet = line.match(/^\s*[-*]\s+(.*\S)\s*$/);
        if (!bullet) continue;

        const raw = bullet[1].trim();

        // A bullet that is only a label introduces the bullets beneath it.
        if (/^[^:]+:$/.test(raw.replace(/\*\*/g, ''))) {
            subhead = raw.replace(/\*\*/g, '').replace(/:$/, '');
            continue;
        }

        if (LEARNING_SUBHEAD.test(subhead)) continue;

        const marker = raw.match(CREDENTIAL_MARKER);
        const name = stripComments(raw).replace(/\s+/g, ' ').trim();
        if (!name) continue;

        if (marker) {
            entries.push({ name, marked: true, credentialId: marker[1], subhead });
            continue;
        }

        for (const part of splitJoined(name)) {
            entries.push({ name: part, marked: false, credentialId: null, subhead });
        }
    }

    return entries;
}

// --- reporting -------------------------------------------------------------

function roleFiles(dir = ROLES_DIR, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) roleFiles(full, out);
        else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(full);
    }
    return out;
}

// Roles carrying both a flat list and subhead groups repeat the same
// credentials twice; those duplicates have to be reconciled before a batch can
// migrate the role cleanly.
function sectionShape(text) {
    const section = certificationSection(text);
    if (!section) return 'none';

    const lines = section.split('\n');
    const firstSubhead = lines.findIndex(line => /^\*\*/.test(line));
    const hasSubheads = firstSubhead !== -1;
    const hasFlat = lines.some((line, index) =>
        /^\s*[-*]\s+\S/.test(line) && (!hasSubheads || index < firstSubhead));

    if (hasFlat && hasSubheads) return 'mixed';
    if (hasFlat) return 'flat';
    if (hasSubheads) return 'grouped';
    return 'empty';
}

function buildInventory() {
    const registry = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'credentials.json'), 'utf8'));
    const audited = new Set(registry.audited_roles);

    const domains = new Map();
    const aliases = new Map();
    const shapes = { none: 0, flat: 0, grouped: 0, mixed: 0, empty: 0 };

    for (const file of roleFiles()) {
        const rel = path.relative(path.dirname(ROLES_DIR), file).split(path.sep).join('/');
        const text = fs.readFileSync(file, 'utf8');
        const domain = rel.split('/')[1];

        shapes[sectionShape(text)]++;

        if (!domains.has(domain)) {
            domains.set(domain, { roles: 0, audited: 0, legacy: 0, migrated: 0, affected: new Set(), mixed: 0 });
        }
        const stats = domains.get(domain);
        stats.roles++;
        if (audited.has(rel)) stats.audited++;
        if (sectionShape(text) === 'mixed') stats.mixed++;

        for (const entry of inventoryRole(text)) {
            if (entry.marked) { stats.migrated++; continue; }
            stats.legacy++;
            stats.affected.add(rel);

            const key = aliasKey(entry.name);
            if (!aliases.has(key)) aliases.set(key, { spellings: new Map(), domains: new Set(), total: 0, kind: classifyEntry(entry.name) });
            const alias = aliases.get(key);
            alias.spellings.set(entry.name, (alias.spellings.get(entry.name) || 0) + 1);
            alias.domains.add(domain);
            alias.total++;
        }
    }

    return { domains, aliases, shapes };
}

function report() {
    const { domains, aliases, shapes } = buildInventory();

    const legacy = [...domains.values()].reduce((total, d) => total + d.legacy, 0);
    const migrated = [...domains.values()].reduce((total, d) => total + d.migrated, 0);
    const kinds = { credential: 0, family: 0, topic: 0, vague: 0 };
    for (const alias of aliases.values()) kinds[alias.kind] += alias.total;

    console.log(`Legacy credential entries: ${legacy}   migrated: ${migrated}`);
    console.log(`Distinct credentials after alias grouping: ${aliases.size}`);
    console.log('');
    console.log('Entries by kind:');
    console.log(`  credential ${String(kinds.credential).padStart(5)}   auditable as an individual credential`);
    console.log(`  family     ${String(kinds.family).padStart(5)}   a group, not one credential — must be rewritten or dropped`);
    console.log(`  topic      ${String(kinds.topic).padStart(5)}   a subject, not a credential`);
    console.log(`  vague      ${String(kinds.vague).padStart(5)}   "or other ..." — unverifiable as written`);
    console.log('');
    console.log('Certification section shapes:');
    console.log(`  grouped ${String(shapes.grouped).padStart(4)}   subheads only`);
    console.log(`  mixed   ${String(shapes.mixed).padStart(4)}   flat list AND subheads — duplicated recommendations`);
    console.log(`  flat    ${String(shapes.flat).padStart(4)}   no subheads`);
    console.log(`  none    ${String(shapes.none).padStart(4)}   no certification section`);
    console.log('');
    console.log('Legacy entries by domain:');
    console.log('  legacy  roles  mixed  domain');
    for (const [domain, stats] of [...domains].filter(([, s]) => s.legacy > 0).sort((a, b) => b[1].legacy - a[1].legacy)) {
        console.log(`  ${String(stats.legacy).padStart(6)}  ${String(stats.affected.size).padStart(5)}  ${String(stats.mixed).padStart(5)}  ${domain}`);
    }
    console.log('');
    console.log('Cross-cutting credentials (3+ domains), audit once and reuse everywhere:');
    for (const [, alias] of [...aliases].filter(([, a]) => a.domains.size >= 3 && a.kind === 'credential').sort((a, b) => b[1].total - a[1].total).slice(0, 25)) {
        const spellings = [...alias.spellings.keys()];
        console.log(`  ${String(alias.total).padStart(3)}  ${String(alias.domains.size).padStart(2)}d  ${spellings[0].slice(0, 64)}${spellings.length > 1 ? `  (+${spellings.length - 1} spelling(s))` : ''}`);
    }
}

if (require.main === module) report();

module.exports = { certificationSection, inventoryRole, aliasKey, classifyEntry, sectionShape, buildInventory };
