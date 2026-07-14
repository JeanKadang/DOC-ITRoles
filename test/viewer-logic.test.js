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
    buildOrgTree,
    parseInteractions,
    labelToChapter,
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

// ── buildOrgTree ─────────────────────────────────────────

function orgFixture() {
    const domains = {
        c_suite: {
            label: 'C-Suite',
            roles: [
                { title: 'Chief Executive Officer', file: 'Roles/c_suite/ceo.md', level: 'CEO' },
                { title: 'Chief Technology Officer', file: 'Roles/c_suite/cto.md', level: 'CTO' },
            ],
        },
        leadership: {
            label: 'Leadership',
            roles: [
                { title: 'SVP of Technology', file: 'Roles/leadership/svp.md', level: 'SVP' },
                { title: 'Product Area Lead', file: 'Roles/leadership/pal.md', level: 'Product Area Lead' },
                { title: 'Alpha Chapter Lead', file: 'Roles/leadership/alpha_lead.md', level: 'Chapter Lead' },
                { title: 'Community Leader', file: 'Roles/leadership/community.md', level: 'Senior Engineer' },
            ],
        },
        devops: {
            label: 'DevOps',
            roles: [
                { title: 'DevOps Engineer', file: 'Roles/devops/eng.md', level: 'Engineer' },
                { title: 'DevOps Architect', file: 'Roles/devops/arch.md', level: 'Architect' },
            ],
        },
    };
    const chapters = {
        alpha: { label: 'Alpha Chapter', domains: ['devops'], leadFile: 'Roles/leadership/alpha_lead.md' },
        leadership_chapter: { label: 'Leadership', domains: ['c_suite', 'leadership'], leadFile: null },
    };
    return { domains, chapters };
}

function collectFiles(node, out = []) {
    if (node.file) out.push(node.file);
    for (const c of node.children || []) collectFiles(c, out);
    return out;
}

test('buildOrgTree roots at the CEO with C-suite and SVP children', () => {
    const { domains, chapters } = orgFixture();
    const tree = buildOrgTree(domains, chapters);
    assert.equal(tree.name, 'Chief Executive Officer');
    assert.equal(tree.kind, 'exec');
    const childNames = tree.children.map(c => c.name);
    assert.ok(childNames.includes('Chief Technology Officer'));
    assert.ok(childNames.includes('SVP of Technology'));
});

test('buildOrgTree hangs area leads, cross-cutting roles, and chapters under the SVP', () => {
    const { domains, chapters } = orgFixture();
    const tree = buildOrgTree(domains, chapters);
    const svp = tree.children.find(c => c.name === 'SVP of Technology');
    const names = svp.children.map(c => c.name);
    assert.ok(names.includes('Product Area Lead'));
    assert.ok(names.includes('Cross-cutting Leadership'), 'unplaced leadership roles are grouped');
    assert.ok(names.includes('Alpha Chapter'));
});

test('buildOrgTree attaches the chapter lead and counts roles per chapter', () => {
    const { domains, chapters } = orgFixture();
    const tree = buildOrgTree(domains, chapters);
    const chapter = tree.children.find(c => c.name === 'SVP of Technology')
        .children.find(c => c.name === 'Alpha Chapter');
    assert.equal(chapter.leadTitle, 'Alpha Chapter Lead');
    assert.equal(chapter.count, 2);
    assert.equal(chapter.children[0].name, 'DevOps');
    assert.equal(chapter.children[0].children.length, 2);
});

test('buildOrgTree places every role exactly once', () => {
    const { domains, chapters } = orgFixture();
    const tree = buildOrgTree(domains, chapters);
    const files = collectFiles(tree);
    const allFiles = Object.values(domains).flatMap(d => d.roles.map(r => r.file)).sort();
    assert.deepEqual([...files].sort(), allFiles);
    assert.equal(new Set(files).size, files.length, 'no role may appear twice');
});

test('buildOrgTree falls back to a generic root when no CEO exists', () => {
    const { domains, chapters } = orgFixture();
    domains.c_suite.roles = domains.c_suite.roles.filter(r => r.level !== 'CEO');
    const tree = buildOrgTree(domains, chapters);
    assert.equal(tree.name, 'IT Organisation');
    assert.equal(tree.kind, 'group');
    assert.equal(collectFiles(tree).length, 7, 'all remaining roles still placed');
});

// ── parseInteractions ────────────────────────────────────

const INTERACTIONS_FIXTURE = `# Cross-domain interactions

## Domain ownership boundaries

| Technology / Decision | Primary Owner | Consulted |
|---|---|---|
| Kubernetes platform selection | Kubernetes | Cloud Platforms, DevOps |
| Cost governance | FinOps | All domains (consumers) |
| Privacy program | Data Management (Data Privacy Officer) | Security, Legal (external) |

## Key cross-domain relationships

- **Cloud Platforms ↔ Network** — landing zone connectivity
- **Kubernetes ↔ Cloud Platforms** — managed Kubernetes services
- **Enterprise Architecture ↔ All** — architecture governance framework

## Escalation paths

1. Domain architects
`;

test('parseInteractions extracts consultation edges from the ownership table', () => {
    const g = parseInteractions(INTERACTIONS_FIXTURE);
    const k8s = g.links.filter(l => [l.source, l.target].includes('Kubernetes'));
    assert.equal(k8s.length, 2); // Cloud Platforms (consult + collaboration merged into one edge) and DevOps
    const kcp = g.links.find(l => [l.source, l.target].sort().join('|') === 'Cloud Platforms|Kubernetes');
    assert.equal(kcp.kind, 'collaborates', 'collaboration wins when both edge kinds exist for a pair');
    assert.equal(kcp.labels.length, 2, 'labels from both sources are kept');
});

test('parseInteractions strips role parentheticals and flags external parties', () => {
    const g = parseInteractions(INTERACTIONS_FIXTURE);
    assert.ok(g.nodes.some(n => n.name === 'Data Management' && n.kind === 'domain'));
    assert.ok(g.nodes.some(n => n.name === 'Legal' && n.kind === 'external'));
    assert.ok(!g.nodes.some(n => n.name.includes('(')));
});

test('parseInteractions turns All-domain entries into node notes, not edges', () => {
    const g = parseInteractions(INTERACTIONS_FIXTURE);
    const finops = g.nodes.find(n => n.name === 'FinOps');
    assert.ok(finops.notes[0].includes('Cost governance'));
    const ea = g.nodes.find(n => n.name === 'Enterprise Architecture');
    assert.ok(ea.notes[0].includes('architecture governance'));
    assert.ok(!g.links.some(l => [l.source, l.target].some(isAllish => /^All/.test(isAllish))));
});

test('parseInteractions handles the real CROSS_DOMAIN_INTERACTIONS.md', () => {
    // Integration guard: doc drift that breaks the graph fails the suite.
    const fs = require('node:fs');
    const path = require('node:path');
    const md = fs.readFileSync(path.join(__dirname, '..', 'docs', 'CROSS_DOMAIN_INTERACTIONS.md'), 'utf8');
    const g = parseInteractions(md);
    assert.ok(g.nodes.length >= 18, `expected 18+ nodes, got ${g.nodes.length}`);
    assert.ok(g.links.length >= 25, `expected 25+ links, got ${g.links.length}`);
    assert.ok(g.nodes.some(n => n.name === 'Service Management'), 'governance rows from #2 present');
    assert.ok(g.nodes.some(n => n.kind === 'external'), 'external parties (Legal/Procurement) present');
    assert.ok(g.nodes.find(n => n.name === 'FinOps').notes.length > 0, 'All-domains note captured');
    for (const l of g.links) {
        assert.ok(l.source !== l.target, 'no self-loops');
        assert.ok(g.nodes.some(n => n.name === l.source) && g.nodes.some(n => n.name === l.target), 'links reference known nodes');
    }
});

// ── labelToChapter ───────────────────────────────────────

test('labelToChapter maps domain labels to chapter labels', () => {
    const domains = { devops: { label: 'DevOps', roles: [] }, network: { label: 'Network', roles: [] } };
    const chapters = {
        a: { label: 'Chapter A', domains: ['devops'] },
        b: { label: 'Chapter B', domains: ['network', 'missing'] },
    };
    assert.deepEqual(labelToChapter(domains, chapters), { 'DevOps': 'Chapter A', 'Network': 'Chapter B' });
});
