'use strict';

// Adds the review-provenance fields from #179 to every role.
//
// Before this, the only governance metadata was Last Reviewed, and 206 of 226
// roles shared 2026-03 — a bulk stamp rather than 206 reviews. The field
// therefore recorded when the file was last touched, which git already knows,
// and implied a review that had not happened.
//
// Two fields fix that. Content Owner names who stands behind the content, as a
// durable role identifier rather than a person so the catalogue stays portable
// when another organisation adopts it. Review Status says whether the date
// reflects subject-matter review or a mechanical edit.
//
// The backfill claims "mechanical", never "reviewed": it can see that the files
// were edited, not that anyone read them. Promoting a role is a human act.

const fs = require('node:fs');
const path = require('node:path');

const ROLES_DIR = path.resolve(__dirname, '..', 'Roles');

const OWNER = 'catalogue-maintainers';
const STATUS = 'mechanical';

function addProvenanceFields(text) {
    if (/\|\s*\*\*Content Owner\*\*/.test(text) && /\|\s*\*\*Review Status\*\*/.test(text)) return text;

    const lines = text.split('\n');
    const at = lines.findIndex(l => /^\|\s*\*\*Last Reviewed\*\*/.test(l));
    if (at === -1) return text;

    // Above the date, so a reader meets the owner and the status before the
    // value they qualify.
    lines.splice(at, 0,
        `| **Content Owner** | ${OWNER} |`,
        `| **Review Status** | ${STATUS} |`);

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
    let changed = 0;
    let skipped = 0;

    for (const file of roleFiles()) {
        const original = fs.readFileSync(file, 'utf8');
        const hadBom = original.startsWith('﻿');
        const hadCrlf = original.includes('\r\n');
        const body = original.replace(/^﻿/, '').replace(/\r\n/g, '\n');

        const updated = addProvenanceFields(body);
        if (updated === body) { skipped++; continue; }
        changed++;

        if (write) {
            const out = (hadBom ? '﻿' : '') + (hadCrlf ? updated.replace(/\n/g, '\r\n') : updated);
            fs.writeFileSync(file, out, 'utf8');
        }
    }

    console.log(`${write ? 'Updated' : 'Would update'} ${changed} role file(s); ${skipped} already carried the fields or had no metadata table.`);
}

if (require.main === module) run({ write: process.argv.includes('--write') });

module.exports = { addProvenanceFields, OWNER, STATUS };
