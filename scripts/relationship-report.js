'use strict';

// Reports the state of the catalogue's role relationships (#180).
//
// Reporting lines are still written as titles, so this resolves them against
// role titles and classifies whatever fails to match. That classification is
// the point: an unresolved reference is not automatically a defect. "CEO" is a
// correct destination outside the catalogue, "X or Y" is a choice rather than an
// edge, and "Infrastructure Onboarding Senior Engineer" is drift. Only the last
// is broken, and today nothing tells them apart.
//
// This reports; it never edits. Re-run it before and after a migration so the
// drift is measured rather than asserted.

const fs = require('node:fs');
const path = require('node:path');

const ROLES_DIR = path.resolve(__dirname, '..', 'Roles');

function roleFiles(dir = ROLES_DIR, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) roleFiles(full, out);
        else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(full);
    }
    return out;
}

function field(text, name) {
    const m = text.match(new RegExp(`\\|\\s*\\*\\*${name}\\*\\*\\s*\\|\\s*([^|\\n]+)`));
    return m ? m[1].trim() : null;
}

// Destinations that sit above or outside the catalogue on purpose.
const EXTERNAL = /\b(CEO|Board of Directors|Board|CTO|CIO|CFO|CISO|SVP|Executive|Managing Director)\b/i;
// A single field naming two acceptable destinations is a choice, not an edge.
const ALTERNATIVE = /\bor\b|\//;

// An initialism built from a title's capitalised words: "Chief Executive
// Officer" -> "CEO". Needed because token overlap is blind to abbreviations —
// "CEO" and "Chief Executive Officer" share no words — which is how four
// references to a real catalogue role were first mistaken for destinations
// above the catalogue.
function initialism(title) {
    const words = String(title).split(/\s+/).filter(w => /^[A-Z]/.test(w));
    return words.length >= 2 ? words.map(w => w[0]).join('').toUpperCase() : null;
}

// Ambiguous initialisms are dropped rather than guessed: an abbreviation that
// two roles share identifies neither.
function initialismIndex(titles) {
    const byAbbr = new Map();
    const ambiguous = new Set();
    for (const title of titles) {
        const abbr = initialism(title);
        if (!abbr) continue;
        if (byAbbr.has(abbr)) ambiguous.add(abbr);
        else byAbbr.set(abbr, title);
    }
    for (const abbr of ambiguous) byAbbr.delete(abbr);
    return byAbbr;
}

// Token overlap, used only to suggest what a drifted reference probably meant.
function similarity(a, b) {
    const A = new Set(a.toLowerCase().split(/\s+/));
    const B = new Set(b.toLowerCase().split(/\s+/));
    let shared = 0;
    for (const w of A) if (B.has(w)) shared++;
    return shared / Math.max(A.size, B.size);
}

function buildGraph() {
    const roles = [];
    for (const file of roleFiles()) {
        const rel = path.relative(path.dirname(ROLES_DIR), file).split(path.sep).join('/');
        const text = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
        const title = (text.match(/^#\s+(.+)$/m) || [])[1];
        if (!title) continue;
        roles.push({
            file: rel,
            id: (field(text, 'Role ID') || '').replace(/`/g, '') || null,
            title: title.trim(),
            reportsTo: field(text, 'Reports To'),
            directReports: field(text, 'Direct Reports'),
        });
    }

    const byTitle = new Map(roles.map(r => [r.title, r]));
    const byAbbr = initialismIndex(byTitle.keys());
    const resolved = [];
    const external = [];
    const alternatives = [];
    const drift = [];

    for (const role of roles) {
        const target = role.reportsTo;
        if (!target || /^(none|n\/a|-)$/i.test(target)) continue;

        if (byTitle.has(target)) { resolved.push(role); continue; }
        if (ALTERNATIVE.test(target)) { alternatives.push({ role, target }); continue; }

        // Before anything else: an abbreviation of a real role is drift, not an
        // external destination. This check must precede the EXTERNAL one, since
        // the titles most often abbreviated -- CEO, CTO, CISO -- are exactly the
        // ones that look external.
        if (byAbbr.has(target)) {
            drift.push({ role, target, suggestion: { title: byAbbr.get(target), score: 1 }, reason: 'abbreviation' });
            continue;
        }

        if (EXTERNAL.test(target)) { external.push({ role, target }); continue; }

        const best = roles
            .map(r => ({ score: similarity(target, r.title), title: r.title }))
            .sort((a, b) => b.score - a.score)[0];
        drift.push({ role, target, suggestion: best && best.score >= 0.5 ? best : null });
    }

    return { roles, resolved, external, alternatives, drift };
}

function report() {
    const { roles, resolved, external, alternatives, drift } = buildGraph();

    console.log(`Roles: ${roles.length}   with a Role ID: ${roles.filter(r => r.id).length}`);
    console.log('');
    console.log('Reporting lines:');
    console.log(`  ${String(resolved.length).padStart(4)}  resolve to a catalogue role`);
    console.log(`  ${String(external.length).padStart(4)}  name a destination outside the catalogue (correct, but unexpressible today)`);
    console.log(`  ${String(alternatives.length).padStart(4)}  name a choice rather than one destination`);
    console.log(`  ${String(drift.length).padStart(4)}  DRIFT — resolve to nothing and are not deliberately external`);

    if (drift.length) {
        console.log('\nDrifted references:');
        for (const d of drift) {
            console.log(`  ${d.role.file}`);
            console.log(`     Reports To: "${d.target}"`);
            if (!d.suggestion) console.log('     no similar role in the catalogue');
            else if (d.reason === 'abbreviation') console.log(`     resolves:   "${d.suggestion.title}"  (abbreviation of an existing role)`);
            else console.log(`     probably:   "${d.suggestion.title}"  (${Math.round(d.suggestion.score * 100)}% token overlap — verify before applying)`);
        }
    }

    if (alternatives.length) {
        console.log('\nAlternatives (need a representation decision before they can resolve):');
        const seen = new Map();
        for (const a of alternatives) seen.set(a.target, (seen.get(a.target) || 0) + 1);
        for (const [target, n] of [...seen].sort((x, y) => y[1] - x[1])) {
            console.log(`  ${String(n).padStart(3)}  ${target.slice(0, 84)}`);
        }
    }

    process.exitCode = drift.length ? 1 : 0;
}

if (require.main === module) report();

module.exports = { buildGraph, similarity };
