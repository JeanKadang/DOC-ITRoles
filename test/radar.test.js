// Guards for the generated technology radar (#172).
//
// The vocabulary in data/technologies.json is hand-maintained, which is this
// repository's dominant bug class. Two things therefore have to hold: the
// committed document must match regeneration, and a technology the roles
// clearly expect must not be able to sit outside the vocabulary unnoticed.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { build, render, proficiencyBullets, aliasRe, ringFor } = require('../scripts/build-radar');

const ROOT = path.join(__dirname, '..');
const DOC = path.join(ROOT, 'docs', 'TECHNOLOGY_RADAR.md');
const VOCAB = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'technologies.json'), 'utf8'));

test('the committed radar matches what the script generates', () => {
    const generated = render(build());
    const committed = fs.readFileSync(DOC, 'utf8').replace(/\r\n/g, '\n');
    // The generation stamp is the month, so only that line may differ.
    const strip = s => s.split('\n').filter(l => !/^Derived from the/.test(l)).join('\n');
    assert.equal(strip(committed), strip(generated),
        'run "npm run build-radar" — docs/TECHNOLOGY_RADAR.md is out of date');
});

test('every vocabulary entry has a quadrant the file declares', () => {
    for (const t of VOCAB.technologies) {
        assert.ok(VOCAB.quadrants.includes(t.quadrant), `${t.name}: unknown quadrant "${t.quadrant}"`);
        assert.ok(t.aliases && t.aliases.length, `${t.name}: needs at least one alias`);
    }
});

test('aliases match on word boundaries, not substrings', () => {
    // ".NET" and "F5" have no \b at their edges, and a naive substring match
    // put "SQL" inside "NoSQL" and "Teams" inside "delivery teams".
    assert.ok(aliasRe('.NET').test('ASP.NET Core and .NET 8'));
    assert.ok(!aliasRe('SQL').test('NoSQL document stores'));
    assert.ok(!aliasRe('Go').test('Google Cloud Platform'));
    assert.ok(aliasRe('Kubernetes').test('Kubernetes cluster operations (kubectl, RBAC)'));
});

test('only proficiency bullets are counted, not any mention in the file', () => {
    // Microsoft Teams appears in 220 role files and in a handful of
    // proficiency bullets. A product named under Remote Work Considerations
    // says nothing about the skill expected of the person.
    const sample = [
        '## Key Technologies',
        '- Microsoft Teams for collaboration',
        '',
        '**Technology Proficiency Levels:**',
        '',
        '**Expert level required:**',
        '',
        '- Kubernetes cluster operations',
        '',
        '**Awareness level expected:**',
        '',
        '- Service mesh concepts (Istio, Linkerd)',
        '',
        '## Interactions with Other Roles',
        '- Microsoft Teams again, outside the block',
    ].join('\n');
    const bullets = proficiencyBullets(sample);
    assert.equal(bullets.length, 2);
    assert.deepEqual(bullets.map(b => b.tier), ['Expert', 'Awareness']);
});

test('a technology named only at Awareness level lands in Assess', () => {
    assert.equal(ringFor(['Awareness', 'Awareness', 'Working Knowledge']), 'Assess');
    assert.equal(ringFor(['Expert', 'Proficient']), 'Trial');
    assert.equal(ringFor(Array(12).fill('Proficient')), 'Adopt');
});

test('Kubernetes is not misplaced the way name extraction placed it', () => {
    // The reason this radar uses a vocabulary at all: extracting names from
    // the bullets put Kubernetes at Awareness in 6 roles, because it is
    // usually named inside a longer capability phrase.
    const k8s = build().entries.find(e => e.name === 'Kubernetes');
    assert.ok(k8s, 'Kubernetes must appear on the radar');
    assert.equal(k8s.ring, 'Adopt');
    assert.ok(k8s.roles > 40, `expected Kubernetes in many roles, got ${k8s.roles}`);
});

test('a technology the roles clearly expect cannot sit outside the vocabulary', () => {
    // Drift guard. Collects capitalised or dotted terms from the proficiency
    // bullets, and requires anything frequent to be either in the vocabulary
    // or in the explicit exclusions list.
    const { listRoleFiles } = require('../scripts/seed-kpi-targets');
    const { REFERENCE_DOC_PATTERN } = require('../roleMeta');

    const known = new Set();
    for (const t of VOCAB.technologies) {
        known.add(t.name.toLowerCase());
        for (const a of t.aliases) known.add(a.toLowerCase());
    }
    for (const t of VOCAB.excluded.terms) known.add(t.toLowerCase());

    const freq = new Map();
    const files = listRoleFiles(path.join(ROOT, 'Roles'))
        .filter(f => !REFERENCE_DOC_PATTERN.test(path.basename(f)));
    for (const file of files) {
        const text = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
        for (const { text: bullet } of proficiencyBullets(text)) {
            // Proper nouns and product-shaped tokens only.
            for (const m of bullet.matchAll(/\b([A-Z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)?)\b/g)) {
                const term = m[1];
                if (term.length < 3) continue;
                if (known.has(term.toLowerCase())) continue;
                if ([...known].some(k => k.includes(term.toLowerCase()))) continue;
                freq.set(term, (freq.get(term) || 0) + 1);
            }
        }
    }

    // 25 mentions is well above the noise floor: the vocabulary's own
    // entries sit far above it and one-off phrasing sits far below.
    const frequent = [...freq.entries()].filter(([, n]) => n >= 25).map(([t, n]) => `${t} (${n})`);
    assert.deepEqual(frequent, [],
        `add to data/technologies.json or its excluded list: ${frequent.join(', ')}`);
});
