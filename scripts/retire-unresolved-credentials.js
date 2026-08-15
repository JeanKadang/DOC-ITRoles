'use strict';

// Applies the maintainer's rule for the credential references that no issuer
// will stand behind (#229):
//
//   where the issuer no longer names a credential and offers a clear successor,
//   rewrite to the successor; where there is no successor, drop the reference
//   rather than leave a recommendation nobody can act on.
//
// ADR-0003 supplies the exception: a successor that is a course belongs under
// Learning Resources & Communities, not among certifications.
//
// Each entry below records the evidence that justifies its action, because the
// action is a content change and the reasoning should not live only in a commit
// message.

const fs = require('node:fs');
const path = require('node:path');
const { stripComments } = require('./credential-inventory');

const ROLES_DIR = path.resolve(__dirname, '..', 'Roles');
// The catalogue spells this subhead two ways -- 124 roles use "&" and 101 use
// "and", because #227 only normalised the files it had to restructure. Matching
// one spelling exactly meant a relocated bullet was removed and its replacement
// silently dropped in every role using the other.
const LEARNING_SUBHEAD = '**Learning Resources & Communities:**';
const LEARNING_SUBHEAD_PATTERN = /^\*\*Learning Resources\s*(?:&|and)\s*Communities:?\*\*$/i;

function findLearningSubhead(lines, from, to) {
    for (let i = from; i < Math.min(to, lines.length); i++) {
        if (LEARNING_SUBHEAD_PATTERN.test(lines[i].trim())) return i;
    }
    return -1;
}

const RULES = [
    {
        match: /docker certified associate/i,
        action: 'relocate',
        replacement: 'Docker Foundations Professional Certificate (LinkedIn Learning) — course, not an individually-held certification',
        why: 'docker.com/certification returns 404 in fetch and browser; Docker promotes the LinkedIn Learning certificate instead, which is a course under ADR-0003.',
    },
    {
        match: /technology business management \(tbm\) certification|\btbm\b.*certification/i,
        action: 'relocate',
        replacement: 'TBM Practitioner course and certification, TBM Council — course, not an individually-held certification',
        why: 'The TBM Council offers a year-prefixed "2026 TBM Practitioner Course & Certification" and states the programme is mid-relaunch.',
    },
    {
        match: /certified agile service manager/i,
        action: 'drop',
        why: "DevOps Institute's current catalogue lists ten certifications and CASM is not among them; no successor is named.",
    },
    {
        match: /\bMCSE\b/,
        action: 'drop',
        why: "Microsoft's credential retirement page lists only the last year's retirements and does not mention MCSE; no current Microsoft page describes it.",
    },
];

function roleFiles(dir = ROLES_DIR, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) roleFiles(full, out);
        else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(full);
    }
    return out;
}

// Returns the bounds of the certification section, or null.
function certificationSection(lines) {
    const start = lines.findIndex(l => /^## [^\n]*Certification/i.test(l));
    if (start === -1) return null;
    let end = lines.length;
    for (let i = start + 1; i < lines.length; i++) {
        if (/^## /.test(lines[i])) { end = i; break; }
    }
    return { start, end };
}

function applyRules(text) {
    const lines = text.split('\n');
    const bounds = certificationSection(lines);
    if (!bounds) return { text, changes: [] };

    const changes = [];
    const learningAt = findLearningSubhead(lines, bounds.start, bounds.end);

    // Walk backwards so indices stay valid as lines are removed.
    for (let i = bounds.end - 1; i > bounds.start; i--) {
        const line = lines[i];
        if (!/^\s*[-*]\s+\S/.test(line)) continue;
        // Anything already under Learning Resources is out of scope.
        if (learningAt !== -1 && i > learningAt) continue;

        const rule = RULES.find(r => r.match.test(line));
        if (!rule) continue;

        // A bullet may pack several credentials into one comma-joined list.
        // Acting on the whole line would take valid recommendations with it --
        // dropping "Azure Stack HCI Operator Associate, MCSE: Core
        // Infrastructure, ..." deletes two live Microsoft certifications to
        // remove one dead one. Those bullets are reported for a human instead.
        const body = stripComments(line.replace(/^\s*[-*]\s+/, '')).trim();
        const packed = body.split(/,\s*(?:and\s+)?|\s+and\s+/).map(s => s.trim()).filter(Boolean);
        if (packed.length > 1) {
            changes.push({ action: 'manual', line: line.trim(), why: 'bullet names several credentials; splitting it is a content judgement' });
            continue;
        }

        lines.splice(i, 1);
        changes.push({ action: rule.action, line: line.trim(), why: rule.why });

        if (rule.action === 'relocate') {
            let at = findLearningSubhead(lines, bounds.start, lines.length);

            // No learning subhead in this role: create one rather than dropping
            // the replacement. Removing a bullet and silently failing to re-add
            // it is the one outcome this script must never produce.
            if (at === -1) {
                let end = lines.length;
                for (let j = bounds.start + 1; j < lines.length; j++) {
                    if (/^## /.test(lines[j])) { end = j; break; }
                }
                while (end > bounds.start && !lines[end - 1].trim()) end--;
                lines.splice(end, 0, '', LEARNING_SUBHEAD, '');
                at = end + 1;
            }

            let insert = at + 1;
            while (insert < lines.length && !/^\s*[-*]\s+\S/.test(lines[insert])) insert++;
            lines.splice(insert, 0, `- ${rule.replacement}`);
        }
    }

    return { text: lines.join('\n'), changes };
}

function run({ write }) {
    let touched = 0;
    const tally = { drop: 0, relocate: 0, manual: 0 };

    for (const file of roleFiles()) {
        const original = fs.readFileSync(file, 'utf8');
        const hadBom = original.startsWith('﻿');
        const hadCrlf = original.includes('\r\n');
        const body = original.replace(/^﻿/, '').replace(/\r\n/g, '\n');

        const { text: updated, changes } = applyRules(body);
        if (!changes.length) continue;
        touched++;
        for (const c of changes) tally[c.action]++;

        const rel = path.relative(path.dirname(ROLES_DIR), file).split(path.sep).join('/');
        console.log(`\n${rel}`);
        for (const c of changes) console.log(`  ${c.action.toUpperCase().padEnd(8)} ${c.line.slice(0, 88)}`);

        if (write) {
            const out = (hadBom ? '﻿' : '') + (hadCrlf ? updated.replace(/\n/g, '\r\n') : updated);
            fs.writeFileSync(file, out, 'utf8');
        }
    }

    console.log(`\n${write ? 'Updated' : 'Would update'} ${touched} role file(s): ${tally.drop} dropped, ${tally.relocate} relocated to learning resources.`);
}

if (require.main === module) run({ write: process.argv.includes('--write') });

module.exports = { applyRules, RULES };
