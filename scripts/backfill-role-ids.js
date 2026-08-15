'use strict';

// Gives every role the stable identifier decided in #180.
//
// Reporting lines, direct reports, career paths, and interaction tables all
// reference roles by human-readable title today. Titles change, and when one
// does the references to it fail silently: on main, four reporting lines name a
// role that no longer exists under that name, and nothing reports it, because a
// stale name is indistinguishable from a deliberate reference to something
// outside the catalogue.
//
// The id is seeded from the title once and then frozen. It is deliberately not
// derived at read time — an id computed from the title would change with the
// title, which is the failure it exists to prevent. Re-running this script
// never reassigns an existing id.

const fs = require('node:fs');
const path = require('node:path');

const ROLES_DIR = path.resolve(__dirname, '..', 'Roles');

// Parenthesised qualifiers are kept: "Modern Workplace Senior Engineer
// (Microsoft 365)" and a plain "Modern Workplace Senior Engineer" are different
// roles, and dropping the bracket would collide them.
function roleIdFromTitle(title) {
    return String(title)
        .toLowerCase()
        .replace(/\(([^)]*)\)/g, ' $1 ')
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function addRoleId(text) {
    if (/\|\s*\*\*Role ID\*\*/.test(text)) return text;

    const title = (text.match(/^#\s+(.+)$/m) || [])[1];
    if (!title) return text;

    const lines = text.split('\n');
    // First row of the metadata table, so the identifier precedes the
    // descriptive fields rather than trailing them.
    const at = lines.findIndex(l => /^\|\s*\*\*[A-Za-z]/.test(l));
    if (at === -1) return text;

    lines.splice(at, 0, `| **Role ID** | \`${roleIdFromTitle(title.trim())}\` |`);
    return lines.join('\n');
}

function roleFiles(dir = ROLES_DIR, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) roleFiles(full, out);
        else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(full);
    }
    return out;
}

function run({ write }) {
    const seen = new Map();
    let changed = 0;
    let skipped = 0;
    const collisions = [];

    for (const file of roleFiles()) {
        const original = fs.readFileSync(file, 'utf8');
        const hadBom = original.startsWith('﻿');
        const hadCrlf = original.includes('\r\n');
        const body = original.replace(/^﻿/, '').replace(/\r\n/g, '\n');

        const updated = addRoleId(body);
        const id = (updated.match(/\|\s*\*\*Role ID\*\*\s*\|\s*`([^`]+)`/) || [])[1];

        if (id) {
            // An id that is not unique is not an identifier.
            if (seen.has(id)) collisions.push({ id, files: [seen.get(id), file] });
            else seen.set(id, file);
        }

        if (updated === body) { skipped++; continue; }
        changed++;

        if (write) {
            const out = (hadBom ? '﻿' : '') + (hadCrlf ? updated.replace(/\n/g, '\r\n') : updated);
            fs.writeFileSync(file, out, 'utf8');
        }
    }

    console.log(`${write ? 'Assigned' : 'Would assign'} ${changed} role id(s); ${skipped} already had one or had no metadata table.`);

    if (collisions.length) {
        console.error(`\n${collisions.length} id collision(s) — these must be resolved by hand:`);
        for (const c of collisions) console.error(`  ${c.id}\n    ${c.files.join('\n    ')}`);
        process.exitCode = 1;
    }
}

if (require.main === module) run({ write: process.argv.includes('--write') });

module.exports = { roleIdFromTitle, addRoleId };
