'use strict';

// Puts every role's certification section into one shape (#227), so a later
// domain batch is not reconciling two lists and guessing which is authoritative.
//
// 97 roles carry a leading flat list *and* subhead groups naming credentials
// again; 8 more use a flat list with no subheads; 24 write "Complementary
// certifications:" as a bullet rather than a subhead.
//
// The transform relocates and de-duplicates text. It never adds or removes a
// credential claim: a leading flat list is labelled, not re-sorted, and where a
// role prioritised its certifications by position that ordering is preserved.
// Whether an entry truly belongs in Core rather than Complementary is a content
// judgement, and belongs to the domain batch that audits the role.

const fs = require('node:fs');
const path = require('node:path');

const ROLES_DIR = path.resolve(__dirname, '..', 'Roles');

const CORE = 'Core Certifications';
const COMPLEMENTARY = 'Complementary Certifications';
const LEARNING = 'Learning Resources & Communities';

// The catalogue spells the learning subhead two ways; both mean this group.
function canonicalGroup(name) {
    const value = String(name).replace(/:$/, '').trim();
    if (/learning|resource|communit/i.test(value)) return LEARNING;
    if (/complementary/i.test(value)) return COMPLEMENTARY;
    if (/core/i.test(value)) return CORE;
    return value;
}

function splitDocument(text) {
    const heading = text.match(/^## [^\n]*Certification[^\n]*$/mi);
    if (!heading) return null;

    const start = heading.index;
    const afterHeading = start + heading[0].length;
    const rest = text.slice(afterHeading);
    const next = rest.search(/\n## /);

    return {
        before: text.slice(0, start),
        heading: heading[0],
        section: next === -1 ? rest : rest.slice(0, next),
        after: next === -1 ? '' : rest.slice(next),
    };
}

// Reads a section into ordered groups, whatever shape it arrived in.
function readGroups(section) {
    const groups = new Map();
    // Where a recommendation is kept, so a repeat can be dropped and a marker
    // can still win. Keyed on the credential name, so "X" and
    // "X <!-- credential: id -->" are recognised as the same claim.
    const seen = new Map();
    let current = CORE;

    const claimOf = entry => entry.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

    const add = (group, entry) => {
        if (!groups.has(group)) groups.set(group, []);

        const claim = claimOf(entry);
        const previous = seen.get(claim);

        // A credential listed in the flat list and again under a subhead is the
        // duplication this change exists to remove. The first position wins,
        // since it is the more prominent one the role already chose.
        if (previous) {
            // ...unless the repeat is the one carrying the registry marker.
            if (/<!--\s*credential:/.test(entry) && !/<!--\s*credential:/.test(previous.entry)) {
                const list = groups.get(previous.group);
                list[list.indexOf(previous.entry)] = entry;
                previous.entry = entry;
            }
            return;
        }

        groups.get(group).push(entry);
        seen.set(claim, { group, entry });
    };

    for (const line of section.split('\n')) {
        const subhead = line.match(/^\*\*(.+?):?\*\*\s*$/);
        if (subhead) { current = canonicalGroup(subhead[1]); continue; }

        const bullet = line.match(/^(\s*)[-*]\s+(.*\S)\s*$/);
        if (!bullet) continue;

        const [, indent, raw] = bullet;
        const label = raw.replace(/\*\*/g, '').trim();

        // "Complementary certifications:" written as a bullet introduces the
        // bullets nested beneath it.
        if (/^[^:]+:$/.test(label) && !indent) { current = canonicalGroup(label); continue; }

        add(current, raw.trim());
    }

    return groups;
}

function renderSection(groups) {
    const order = [CORE, COMPLEMENTARY, LEARNING];
    const named = [...groups.keys()].filter(g => !order.includes(g));
    const parts = [];

    for (const group of [...order, ...named]) {
        const entries = groups.get(group);
        if (!entries || !entries.length) continue;
        parts.push(`**${group}:**`, '', ...entries.map(e => `- ${e}`), '');
    }

    return `\n\n${parts.join('\n').trimEnd()}\n`;
}

function normaliseSection(text) {
    const parts = splitDocument(text);
    if (!parts) return text;

    const groups = readGroups(parts.section);
    if (!groups.size) return text;

    return parts.before + parts.heading + renderSection(groups) + parts.after;
}

// --- application ------------------------------------------------------------

function roleFiles(dir = ROLES_DIR, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) roleFiles(full, out);
        else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(full);
    }
    return out;
}

function run({ write }) {
    const { inventoryRole, sectionShape } = require('./credential-inventory.js');
    let changed = 0;
    let deduped = 0;
    const unsafe = [];

    for (const file of roleFiles()) {
        const original = fs.readFileSync(file, 'utf8');
        // Only the shapes #227 is about. An already-grouped role would otherwise
        // be rewritten just to respell its learning-resources subhead, turning a
        // 105-file change into a 198-file one for no gain in this issue.
        const shape = sectionShape(original);
        if (shape !== 'mixed' && shape !== 'flat') continue;
        const hadBom = original.startsWith('﻿');
        const hadCrlf = original.includes('\r\n');
        const body = original.replace(/^﻿/, '').replace(/\r\n/g, '\n');

        const updated = normaliseSection(body);
        if (updated === body) continue;

        // Safety gate: the transform may drop an exact duplicate, but it must
        // never lose a distinct claim or invent one.
        const before = inventoryRole(body).map(e => e.name);
        const after = inventoryRole(updated).map(e => e.name);
        const lost = before.filter(n => !after.includes(n));
        const gained = after.filter(n => !before.includes(n));
        if (lost.length || gained.length) {
            unsafe.push({ file, lost, gained });
            continue;
        }
        deduped += before.length - after.length;
        changed++;

        if (write) {
            const out = (hadBom ? '﻿' : '') + (hadCrlf ? updated.replace(/\n/g, '\r\n') : updated);
            fs.writeFileSync(file, out, 'utf8');
        }
    }

    console.log(`${write ? 'Normalised' : 'Would normalise'} ${changed} role file(s); ${deduped} duplicate recommendation(s) removed.`);
    if (unsafe.length) {
        console.error(`\nRefused ${unsafe.length} file(s) that would change a claim:`);
        for (const u of unsafe) console.error(`  ${u.file}\n    lost: ${u.lost.join(' | ')}\n    gained: ${u.gained.join(' | ')}`);
        process.exitCode = 1;
    }
}

if (require.main === module) run({ write: process.argv.includes('--write') });

module.exports = { normaliseSection, readGroups, canonicalGroup };
