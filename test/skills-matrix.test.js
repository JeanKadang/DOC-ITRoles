// Guards for the generated skills matrix (#151, item 1).
//
// The matrix is a join of two sources that drift independently: the ladders
// in SKILLS_PROGRESSION.md and the proficiency tiers in the role files.
// Either changing without regeneration makes the document quietly wrong,
// which is worse than not having it.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { build, render, rungTiers, TIER_RANK } = require('../scripts/build-skills-matrix');

const ROOT = path.join(__dirname, '..');
const DOC = path.join(ROOT, 'docs', 'SKILLS_MATRIX.md');

test('the committed skills matrix matches what the script generates', () => {
    const generated = render(build());
    const committed = fs.readFileSync(DOC, 'utf8').replace(/\r\n/g, '\n');
    const strip = s => s.split('\n').filter(l => !/^Crosses the ladders/.test(l)).join('\n');
    assert.equal(strip(committed), strip(generated),
        'run "npm run build-skills-matrix" — docs/SKILLS_MATRIX.md is out of date');
});

test('the matrix covers the ladders that have more than one technical rung', () => {
    const { domains, steps } = build();
    assert.ok(domains.length >= 30, `expected most domains to appear, got ${domains.length}`);
    assert.ok(steps >= 50, `expected a transition per adjacent rung pair, got ${steps}`);
});

test('a transition only reports a rise, never a fall', () => {
    // Moving up a rung cannot ask for less of a technology. If a lower rung
    // expects more, that is a fact about the role definitions and belongs in
    // neither column — silently rendering it as a "rise" would invert it.
    for (const d of build().domains) {
        for (const t of d.transitions) {
            for (const x of t.deepens) {
                assert.ok(TIER_RANK[x.now] > TIER_RANK[x.was],
                    `${d.domain} ${t.from}→${t.to}: ${x.tech} ${x.was}→${x.now} is not a rise`);
            }
        }
    }
});

test('a rung with several roles takes the highest tier among them', () => {
    // Otherwise the row describes whichever role was listed first rather
    // than the rung.
    const matchers = [{ name: 'Kubernetes', res: [/kubernetes/i] }];
    const tiers = rungTiers(['kubernetes_engineer', 'kubernetes_senior_engineer'], matchers);
    assert.ok(tiers, 'expected both role files to be found');
    assert.equal(tiers.get('Kubernetes'), 'Expert');
});

test('an unknown role slug yields nothing rather than an empty rung', () => {
    assert.equal(rungTiers(['no_such_role_anywhere'], [{ name: 'X', res: [/x/] }]), null);
});

test('the document states what it is not', () => {
    // The failure mode for this file is being read as an assessment of a
    // person or as a training plan. It has to say so on its own face.
    const text = fs.readFileSync(DOC, 'utf8');
    assert.match(text, /not a training plan and not an assessment/i);
    assert.match(text, /only as complete as the vocabulary/i);
});
