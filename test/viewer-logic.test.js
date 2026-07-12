'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
    STALE_MONTHS,
    LEVEL_ORDER,
    LEVEL_SHORT,
    escapeHtml,
    badgeClass,
    monthsSinceReview,
    computeStaleRoles,
    rolesPerLevel,
    rolesPerChapter,
    resolveDocHref,
} = require('../viewer-logic');

const { CANONICAL_LEVELS } = require('../roleMeta');

// ── escapeHtml ────────────────────────────────────────────

test('escapeHtml escapes all five significant characters', () => {
    assert.equal(
        escapeHtml(`<img src="x" onerror='alert(1)' & more>`),
        '&lt;img src=&quot;x&quot; onerror=&#39;alert(1)&#39; &amp; more&gt;'
    );
});

test('escapeHtml leaves plain text unchanged and coerces non-strings', () => {
    assert.equal(escapeHtml('Cloud Cost Optimization Engineer'), 'Cloud Cost Optimization Engineer');
    assert.equal(escapeHtml(42), '42');
    assert.equal(escapeHtml(null), 'null');
});

// ── badgeClass ────────────────────────────────────────────

test('every canonical level maps to a badge class (only Engineer uses the default)', () => {
    // The default 'b-eng' fallthrough shipped the #18 CFO bug: a canonical
    // level with no explicit branch silently renders green.
    for (const level of CANONICAL_LEVELS) {
        const cls = badgeClass(level);
        if (level === 'Engineer') {
            assert.equal(cls, 'b-eng');
        } else {
            assert.notEqual(cls, 'b-eng', `canonical level "${level}" falls through to the Engineer badge`);
        }
    }
});

test('canonical levels get distinct badge classes', () => {
    const classes = CANONICAL_LEVELS.map(badgeClass);
    assert.equal(new Set(classes).size, classes.length);
});

// ── LEVEL_ORDER / LEVEL_SHORT parity ─────────────────────

test('LEVEL_ORDER covers every canonical level (a missing one drops roles from the matrix)', () => {
    // #46: CFO was absent from LEVEL_ORDER, so the matrix silently rendered
    // 215 of 216 roles.
    for (const level of CANONICAL_LEVELS) {
        assert.ok(LEVEL_ORDER.includes(level), `canonical level "${level}" missing from LEVEL_ORDER`);
    }
});

test('LEVEL_SHORT has a label for every LEVEL_ORDER entry', () => {
    for (const level of LEVEL_ORDER) {
        assert.ok(Object.hasOwn(LEVEL_SHORT, level), `LEVEL_SHORT missing "${level}"`);
    }
});

// ── monthsSinceReview ────────────────────────────────────

test('monthsSinceReview returns null for missing or malformed values', () => {
    assert.equal(monthsSinceReview(null), null);
    assert.equal(monthsSinceReview(undefined), null);
    assert.equal(monthsSinceReview(''), null);
    assert.equal(monthsSinceReview('2026'), null);
    assert.equal(monthsSinceReview('07-2026'), null);
    assert.equal(monthsSinceReview('2026-7'), null);
    assert.equal(monthsSinceReview('garbage'), null);
});

test('monthsSinceReview computes whole months against a fixed now', () => {
    const now = new Date(2026, 6, 15); // July 2026
    assert.equal(monthsSinceReview('2026-07', now), 0);
    assert.equal(monthsSinceReview('2026-01', now), 6);
    assert.equal(monthsSinceReview('2025-07', now), 12); // exactly STALE_MONTHS
    assert.equal(monthsSinceReview('2024-07', now), 24);
});

test('monthsSinceReview handles future review dates (negative months)', () => {
    const now = new Date(2026, 6, 15);
    assert.equal(monthsSinceReview('2026-12', now), -5);
});

// ── computeStaleRoles ────────────────────────────────────

function fixtureDomains() {
    return {
        alpha: {
            label: 'Alpha',
            roles: [
                { title: 'Fresh Role',    file: 'Roles/alpha/fresh.md',    level: 'Engineer', lastReviewed: '2026-06' },
                { title: 'Boundary Role', file: 'Roles/alpha/boundary.md', level: 'Engineer', lastReviewed: '2025-07' },
            ],
        },
        beta: {
            label: 'Beta',
            roles: [
                { title: 'Never Reviewed', file: 'Roles/beta/never.md', level: 'Architect', lastReviewed: null },
                { title: 'Ancient Role',   file: 'Roles/beta/old.md',   level: 'Architect', lastReviewed: '2020-01' },
            ],
        },
    };
}

test('computeStaleRoles includes never-reviewed and >= staleMonths, excludes fresh', () => {
    const now = new Date(2026, 6, 15);
    const stale = computeStaleRoles(fixtureDomains(), STALE_MONTHS, now);
    const titles = stale.map(r => r.title);
    assert.ok(!titles.includes('Fresh Role'));
    assert.ok(titles.includes('Boundary Role'), 'exactly STALE_MONTHS old must count as stale');
    assert.ok(titles.includes('Never Reviewed'));
    assert.ok(titles.includes('Ancient Role'));
});

test('computeStaleRoles sorts never-reviewed first, then most overdue', () => {
    const now = new Date(2026, 6, 15);
    const stale = computeStaleRoles(fixtureDomains(), STALE_MONTHS, now);
    assert.deepEqual(stale.map(r => r.title), ['Never Reviewed', 'Ancient Role', 'Boundary Role']);
});

test('computeStaleRoles attaches the domain label to each entry', () => {
    const now = new Date(2026, 6, 15);
    const stale = computeStaleRoles(fixtureDomains(), STALE_MONTHS, now);
    assert.equal(stale.find(r => r.title === 'Never Reviewed').domainLabel, 'Beta');
});

test('computeStaleRoles respects a custom staleMonths threshold', () => {
    const now = new Date(2026, 6, 15);
    const stale = computeStaleRoles(fixtureDomains(), 1, now);
    assert.ok(stale.some(r => r.title === 'Fresh Role'), 'one-month threshold flags last month\'s review');
});

// ── resolveDocHref ───────────────────────────────────────

test('resolveDocHref passes repo-absolute hrefs through unchanged', () => {
    assert.equal(resolveDocHref('Roles/devops/devops_engineer.md', 'docs/CHAPTERS_OVERVIEW.md'), 'Roles/devops/devops_engineer.md');
    assert.equal(resolveDocHref('docs/SKILLS_PROGRESSION.md', 'Roles/devops/devops_engineer.md'), 'docs/SKILLS_PROGRESSION.md');
    assert.equal(resolveDocHref('./docs/SKILLS_PROGRESSION.md', ''), 'docs/SKILLS_PROGRESSION.md');
});

test('resolveDocHref resolves siblings relative to the base file', () => {
    assert.equal(resolveDocHref('ONBOARDING_TEMPLATE.md', 'docs/CHAPTERS_OVERVIEW.md'), 'docs/ONBOARDING_TEMPLATE.md');
    assert.equal(resolveDocHref('./cloud_cost_optimization_standards.md', 'Roles/FinOps/finops_architect.md'), 'Roles/FinOps/cloud_cost_optimization_standards.md');
});

test('resolveDocHref resolves parent traversal from nested paths', () => {
    assert.equal(resolveDocHref('../SKILLS_PROGRESSION.md', 'docs/chapters/data_ai.md'), 'docs/SKILLS_PROGRESSION.md');
    assert.equal(resolveDocHref('../../docs/CHAPTERS_OVERVIEW.md', 'Roles/devops/devops_engineer.md'), 'docs/CHAPTERS_OVERVIEW.md');
});

test('resolveDocHref with no base file resolves from the repo root', () => {
    assert.equal(resolveDocHref('README.md', ''), 'README.md');
});

// ── rolesPerLevel ────────────────────────────────────────

function distributionFixture() {
    return {
        alpha: {
            label: 'Alpha',
            roles: [
                { title: 'A1', file: 'Roles/alpha/a1.md', level: 'Engineer' },
                { title: 'A2', file: 'Roles/alpha/a2.md', level: 'Architect' },
                { title: 'A3', file: 'Roles/alpha/a3.md', level: 'Engineer' },
            ],
        },
        beta: {
            label: 'Beta',
            roles: [
                { title: 'B1', file: 'Roles/beta/b1.md', level: 'CEO' },
                { title: 'B2', file: 'Roles/beta/b2.md', level: 'Engineer' },
            ],
        },
    };
}

test('rolesPerLevel counts roles across domains in seniority order', () => {
    const dist = rolesPerLevel(distributionFixture());
    assert.deepEqual(dist, [
        { level: 'CEO',       count: 1 },
        { level: 'Architect', count: 1 },
        { level: 'Engineer',  count: 3 },
    ]);
});

test('rolesPerLevel appends unknown levels instead of dropping them', () => {
    // #46 lesson: a level absent from the order list must never silently
    // remove its roles from a visualization.
    const domains = {
        x: { label: 'X', roles: [
            { title: 'X1', file: 'Roles/x/x1.md', level: 'Engineer' },
            { title: 'X2', file: 'Roles/x/x2.md', level: 'Grand Wizard' },
        ] },
    };
    const dist = rolesPerLevel(domains);
    assert.deepEqual(dist, [
        { level: 'Engineer',     count: 1 },
        { level: 'Grand Wizard', count: 1 },
    ]);
});

test('rolesPerLevel total matches the role count', () => {
    const dist = rolesPerLevel(distributionFixture());
    assert.equal(dist.reduce((n, d) => n + d.count, 0), 5);
});

// ── rolesPerChapter ──────────────────────────────────────

test('rolesPerChapter sums domain counts per chapter in chapter order', () => {
    const chapters = {
        first:  { label: 'First Chapter',  domains: ['alpha'] },
        second: { label: 'Second Chapter', domains: ['beta', 'missing_domain'] },
    };
    const dist = rolesPerChapter(distributionFixture(), chapters);
    assert.deepEqual(dist, [
        { key: 'first',  label: 'First Chapter',  count: 3 },
        { key: 'second', label: 'Second Chapter', count: 2 },
    ]);
});

test('rolesPerChapter counts a chapter with no present domains as 0', () => {
    const chapters = { empty: { label: 'Empty', domains: ['nope'] } };
    assert.deepEqual(rolesPerChapter(distributionFixture(), chapters),
        [{ key: 'empty', label: 'Empty', count: 0 }]);
});
