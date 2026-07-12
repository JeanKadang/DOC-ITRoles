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
