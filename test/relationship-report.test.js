const test = require('node:test');
const assert = require('node:assert/strict');

const { buildGraph, similarity } = require('../scripts/relationship-report.js');

// #180's premise is that an unresolved reporting line is not automatically a
// defect. "CEO" is a correct destination above the catalogue, "X or Y" is a
// choice rather than an edge, and a stale name is drift. Only the last is
// broken, and nothing distinguishes them today. These tests pin that
// classification against the live catalogue, so a regression in either
// direction — drift going unreported, or a legitimate external destination
// being called drift — fails loudly.

test('every role carries a Role ID', () => {
    const { roles } = buildGraph();
    const without = roles.filter(r => !r.id);
    assert.deepEqual(without.map(r => r.file), [], 'roles missing a Role ID');
});

test('role ids are unique across the catalogue', () => {
    const { roles } = buildGraph();
    const seen = new Map();
    for (const r of roles) {
        if (seen.has(r.id)) assert.fail(`Role ID "${r.id}" is used by both ${seen.get(r.id)} and ${r.file}`);
        seen.set(r.id, r.file);
    }
});

test('the overwhelming majority of reporting lines resolve', () => {
    const { roles, resolved } = buildGraph();
    assert.ok(resolved.length > roles.length * 0.85,
        `only ${resolved.length} of ${roles.length} reporting lines resolve`);
});

// A guard, not a target. The four known drifted references are recorded in
// ADR-0005; this fails if that number grows, which is the silent regression
// the whole issue is about.
test('drifted reporting lines do not increase beyond the known four', () => {
    const { drift } = buildGraph();
    assert.ok(drift.length <= 4,
        `drifted reporting lines rose to ${drift.length}:\n${drift.map(d => `  ${d.role.file}: "${d.target}"`).join('\n')}`);
});

test('a destination above the catalogue is not counted as drift', () => {
    const { external, drift } = buildGraph();
    assert.ok(external.length > 0, 'expected some external destinations');
    assert.ok(!drift.some(d => /\bCEO\b|Board of Directors/i.test(d.target)),
        'CEO and Board of Directors are deliberate, not drift');
});

test('an either/or destination is classified as a choice, not drift', () => {
    const { alternatives, drift } = buildGraph();
    assert.ok(alternatives.length > 0, 'expected some alternatives');
    assert.ok(!drift.some(d => / or /i.test(d.target)), 'an either/or is a representation gap, not a typo');
});

test('similarity is symmetric and bounded', () => {
    assert.equal(similarity('Cloud Engineer', 'Cloud Engineer'), 1);
    assert.equal(similarity('Cloud Engineer', 'Data Analyst'), 0);
    assert.equal(
        similarity('Modern Workplace Engineer', 'Modern Workplace Senior Engineer'),
        similarity('Modern Workplace Senior Engineer', 'Modern Workplace Engineer'),
    );
});
