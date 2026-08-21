'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
    STALE_MONTHS,
    proposedKpiTarget,
    KPI_BENCHMARKS,
    parseRadarDoc,
    radarListHtml,
    parseKpiBullet,
    orgListHtml,
    graphListHtml,
    pushRecent,
    groupResources,
    EXEC_LEVELS,
    STAT_GROUPS,
    countRolesAtLevels,
    roleMatchesFilter,
    contentReferencesForQuery,
    LEVEL_ORDER,
    LEVEL_SHORT,
    escapeHtml,
    badgeClass,
    monthsSinceReview,
    computeStaleRoles,
    reviewSlotFor,
    rolesPerLevel,
    rolesPerChapter,
    buildOrgTree,
    parseInteractions,
    labelToChapter,
    parseProgressionLadders,
    buildCareerSankey,
    parseMobilityPaths,
    parseCareerPath,
    resolveDocHref,
    sectionStartsOpen,
    roleTitleKey,
    findRoleByTitle,
    panelStateFor,
    parseRoleMeta,
    splitReportingValue,
    stripAnnotations,
    tocIdFor,
    activeTocIndex,
    parseViewerRoute,
    formatViewerRoute,
    roleRouteFromFile,
} = require('../viewer-logic');

const { CANONICAL_LEVELS, REFERENCE_DOC_PATTERN: ROLEMETA_REF_PATTERN } = require('../roleMeta');
const { REFERENCE_DOC_PATTERN } = require('../viewer-logic');

test('viewer routes parse every supported canonical shape', () => {
    assert.deepEqual(parseViewerRoute('#/'), { type: 'home' });
    assert.deepEqual(parseViewerRoute('#/role/kubernetes/kubernetes_architect'), {
        type: 'role', domain: 'kubernetes', role: 'kubernetes_architect',
    });
    assert.deepEqual(parseViewerRoute(
        '#/compare/kubernetes/kubernetes_architect/kubernetes/kubernetes_engineer',
    ), {
        type: 'compare',
        first: { domain: 'kubernetes', role: 'kubernetes_architect' },
        second: { domain: 'kubernetes', role: 'kubernetes_engineer' },
    });
    assert.deepEqual(parseViewerRoute('#/matrix/all'), { type: 'matrix', domain: 'all' });
    assert.deepEqual(parseViewerRoute('#/matrix/kubernetes'), { type: 'matrix', domain: 'kubernetes' });
    assert.deepEqual(parseViewerRoute('#/doc/skills-progression'), {
        type: 'doc', id: 'skills-progression',
    });
});

test('viewer routes normalize case and percent-encoded segments', () => {
    assert.deepEqual(parseViewerRoute('#/ROLE/Cloud%5FPlatforms/Cloud%5FArchitect'), {
        type: 'role', domain: 'cloud_platforms', role: 'cloud_architect',
    });
    assert.equal(formatViewerRoute({
        type: 'doc', id: 'Skills Progression',
    }), '#/doc/skills%20progression');
});

test('viewer routes reject malformed and incomplete hashes', () => {
    for (const hash of [
        '', '#', '#/role/kubernetes', '#/role/kubernetes/a/extra',
        '#/compare/kubernetes/a/kubernetes', '#/matrix', '#/doc',
        '#/unknown/value', '#/role/%E0%A4%A/value',
    ]) {
        assert.deepEqual(parseViewerRoute(hash), { type: 'invalid' }, hash);
    }
});

test('formatViewerRoute round-trips supported routes', () => {
    const routes = [
        { type: 'home' },
        { type: 'role', domain: 'kubernetes', role: 'kubernetes_architect' },
        {
            type: 'compare',
            first: { domain: 'kubernetes', role: 'kubernetes_architect' },
            second: { domain: 'kubernetes', role: 'kubernetes_engineer' },
        },
        { type: 'matrix', domain: 'all' },
        { type: 'doc', id: 'skills-progression' },
    ];
    for (const route of routes) {
        assert.deepEqual(parseViewerRoute(formatViewerRoute(route)), route);
    }
    assert.equal(formatViewerRoute({ type: 'unknown' }), null);
});

test('roleRouteFromFile accepts only canonical role Markdown paths', () => {
    assert.deepEqual(roleRouteFromFile('Roles/kubernetes/kubernetes_architect.md'), {
        type: 'role', domain: 'kubernetes', role: 'kubernetes_architect',
    });
    assert.deepEqual(roleRouteFromFile('Roles\\kubernetes\\kubernetes_engineer.md'), {
        type: 'role', domain: 'kubernetes', role: 'kubernetes_engineer',
    });
    assert.equal(roleRouteFromFile('docs/SKILLS_PROGRESSION.md'), null);
    assert.equal(roleRouteFromFile('Roles/kubernetes/README.md'), null);
});

test('every catalogue role has a stable round-trippable route', () => {
    const fs = require('node:fs');
    const path = require('node:path');
    const rolesDir = path.join(__dirname, '..', 'Roles');
    let count = 0;

    for (const domain of fs.readdirSync(rolesDir, { withFileTypes: true })) {
        if (!domain.isDirectory()) continue;
        const domainDir = path.join(rolesDir, domain.name);
        for (const file of fs.readdirSync(domainDir)) {
            if (!file.endsWith('.md') || file === 'README.md' || /_standards\.md$/.test(file)) continue;
            const route = roleRouteFromFile(`Roles/${domain.name}/${file}`);
            assert.ok(route, `${domain.name}/${file}`);
            assert.deepEqual(parseViewerRoute(formatViewerRoute(route)), route);
            count++;
        }
    }

    assert.equal(count, 226);
});

test('viewer-logic REFERENCE_DOC_PATTERN mirrors roleMeta exactly', () => {
    // The browser cannot require roleMeta.js, so viewer-logic carries a
    // copy; this test keeps the two from drifting apart.
    assert.equal(REFERENCE_DOC_PATTERN.source, ROLEMETA_REF_PATTERN.source);
    assert.equal(REFERENCE_DOC_PATTERN.flags, ROLEMETA_REF_PATTERN.flags);
});

test('viewer-logic stripAnnotations mirrors scripts/lib/relationship-annotations.js exactly', () => {
    // index.html loads viewer-logic.js via a plain <script> tag (no bundler),
    // so it cannot require() the canonical implementation in
    // scripts/lib/relationship-annotations.js the way server.js and
    // scripts/relationship-report.js do. viewer-logic.js therefore carries
    // its own copy (see the ANNOTATION_COMMENT comment above stripAnnotations
    // in viewer-logic.js); this test keeps the two from drifting apart by
    // asserting behavioral equivalence across every ADR-0006 annotation form.
    const { stripAnnotations: canonicalStripAnnotations } = require('../scripts/lib/relationship-annotations.js');
    const samples = [
        'Chief Executive Officer <!-- role: chief-executive-officer -->',
        'COO <!-- external-role -->',
        '<!-- one-of -->A <!-- role: a -->, B <!-- role: b --><!-- /one-of -->',
        'Chief Executive Officer',
        'None (sets technical direction ; formal line management sits with the Chapter Lead)',
        '',
        null,
        undefined,
    ];
    for (const sample of samples) {
        assert.equal(stripAnnotations(sample), canonicalStripAnnotations(sample), `mismatch for ${JSON.stringify(sample)}`);
    }
});

test('contentReferencesForQuery removes only an exact normalized title match', () => {
    const exact = { title: 'Kubernetes Architect', file: 'exact.md' };
    const reference = { title: 'Platform Architect', file: 'reference.md' };
    const matches = [exact, reference];

    assert.deepEqual(
        contentReferencesForQuery(matches, '  KUBERNETES   architect  '),
        [reference],
    );
});

test('contentReferencesForQuery retains partial-title and unrelated matches', () => {
    const matches = [
        { title: 'Kubernetes Architect', file: 'architect.md' },
        { title: 'Kubernetes Engineer', file: 'engineer.md' },
    ];

    assert.deepEqual(contentReferencesForQuery(matches, 'Kubernetes'), matches);
});

test('contentReferencesForQuery safely handles missing collections', () => {
    assert.deepEqual(contentReferencesForQuery(undefined, 'Kubernetes Architect'), []);
    assert.deepEqual(contentReferencesForQuery(null, 'Kubernetes Architect'), []);
});

test('contentReferencesForQuery retains an exact title hidden by the level filter', () => {
    const exact = { title: 'Kubernetes Architect', file: 'exact.md', level: 'Architect' };
    const reference = { title: 'AI Platform Architect', file: 'reference.md', level: 'Architect' };
    const matches = [exact, reference];
    const visibleRoles = [exact].filter(role =>
        roleMatchesFilter(role, {}, { q: 'Kubernetes Architect', levels: ['Engineer'] }));

    assert.deepEqual(
        contentReferencesForQuery(matches, 'Kubernetes Architect', visibleRoles),
        matches,
    );
});

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
    assert.equal(resolveDocHref('./cloud_cost_optimization_standards.md', 'Roles/finops/finops_architect.md'), 'Roles/finops/cloud_cost_optimization_standards.md');
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

function cisoFixture() {
    const domains = {
        c_suite:    { label: 'C-Suite',    roles: [{ title: 'CEO', file: 'Roles/c_suite/ceo.md', level: 'CEO' }] },
        leadership: { label: 'Leadership', roles: [
            { title: 'SVP of Technology', file: 'Roles/leadership/svp.md', level: 'SVP' },
            { title: 'Chief Information Security Officer', file: 'Roles/leadership/ciso.md', level: 'CISO' },
            { title: 'Security & Identity Chapter Lead', file: 'Roles/leadership/sec_lead.md', level: 'Chapter Lead' },
        ] },
        security:   { label: 'Security', roles: [{ title: 'Security Engineer', file: 'Roles/security/eng.md', level: 'Engineer' }] },
        devops:     { label: 'DevOps',   roles: [{ title: 'DevOps Engineer', file: 'Roles/devops/eng.md', level: 'Engineer' }] },
    };
    const chapters = {
        security_identity: { label: 'Security & Identity', domains: ['security'], leadFile: 'Roles/leadership/sec_lead.md' },
        devops_delivery:   { label: 'DevOps & Delivery',   domains: ['devops'],   leadFile: null },
        leadership_chapter:{ label: 'Leadership',           domains: ['c_suite', 'leadership'], leadFile: null },
    };
    return { domains, chapters };
}

test('buildOrgTree attaches the Security & Identity chapter under the CISO, not the SVP (#71)', () => {
    const { domains, chapters } = cisoFixture();
    const tree = buildOrgTree(domains, chapters);
    const ciso = tree.children.find(c => c.name === 'Chief Information Security Officer');
    const svp  = tree.children.find(c => c.name === 'SVP of Technology');
    assert.ok(ciso, 'CISO sits on the executive line');
    const cisoChapters = (ciso.children || []).map(c => c.name);
    assert.ok(cisoChapters.includes('Security & Identity'), 'security chapter hangs under the CISO');
    const svpChapters = (svp.children || []).map(c => c.name);
    assert.ok(!svpChapters.includes('Security & Identity'), 'security chapter no longer under the SVP');
    assert.ok(svpChapters.includes('DevOps & Delivery'), 'other chapters remain under the SVP');
    // The security engineer still appears exactly once, now beneath the CISO.
    assert.ok(collectFiles(ciso).includes('Roles/security/eng.md'));
    const all = collectFiles(tree);
    assert.equal(new Set(all).size, all.length, 'no role duplicated by the re-parenting');
});

test('buildOrgTree leaves the security chapter under the SVP when there is no CISO', () => {
    const { domains, chapters } = cisoFixture();
    domains.leadership.roles = domains.leadership.roles.filter(r => r.level !== 'CISO');
    const tree = buildOrgTree(domains, chapters);
    const svp = tree.children.find(c => c.name === 'SVP of Technology');
    assert.ok((svp.children || []).some(c => c.name === 'Security & Identity'),
        'without a CISO the security chapter falls back under the SVP');
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

// ── parseProgressionLadders / buildCareerSankey ──────────

const LADDER_FIXTURE = `# Skills progression framework

## Domain-by-domain progression paths

Intro line.

### Alpha Domain

- Engineer: \`alpha_engineer\`, \`alpha_tool_engineer\`
- Senior Engineer: \`alpha_senior_engineer\`
- Architect: \`alpha_architect\`
- Product Owner: \`alpha_product_owner\`

### Leadershipish

- Senior Engineer: \`champion\`
- Chapter Lead: \`alpha_chapter_lead\`
- Executive: \`svp_thing\`

### Execs Only

- Executive: \`ceo_thing\`

## Cross-domain mobility paths

- **Alpha Engineer → Beta Senior Engineer** — a well-trodden move
- **Any Architect → TAL** — leadership track
`;

test('parseProgressionLadders extracts domains, buckets, and role names', () => {
    const ladders = parseProgressionLadders(LADDER_FIXTURE);
    assert.equal(ladders.length, 3);
    assert.deepEqual(ladders[0].levels['Engineer'], ['alpha_engineer', 'alpha_tool_engineer']);
    assert.deepEqual(ladders[1].levels['Chapter Lead'], ['alpha_chapter_lead']);
});

test('buildCareerSankey links adjacent present rungs weighted by target count', () => {
    const s = buildCareerSankey(parseProgressionLadders(LADDER_FIXTURE));
    const link = (a, b) => s.links.find(l => l.source === a && l.target === b);
    assert.equal(link('Engineer', 'Senior Engineer').value, 1);
    assert.equal(link('Senior Engineer', 'Architect').value, 1);
    assert.equal(link('Senior Engineer', 'Product Owner').value, 1, 'PO branches off Senior');
    assert.equal(link('Senior Engineer', 'Chapter Lead').value, 1, 'absent rungs are skipped, not broken');
    assert.equal(link('Chapter Lead', 'Executive').value, 1);
});

test('buildCareerSankey keeps entry-only rungs as nodes (nothing vanishes)', () => {
    const s = buildCareerSankey(parseProgressionLadders(LADDER_FIXTURE));
    assert.ok(s.nodes.some(n => n.name === 'Executive'), 'exec-only domain still contributes its node');
    assert.ok(s.links.every(l => l.value > 0));
});

test('career sankey handles the real SKILLS_PROGRESSION.md', () => {
    const fs = require('node:fs');
    const path = require('node:path');
    const md = fs.readFileSync(path.join(__dirname, '..', 'docs', 'SKILLS_PROGRESSION.md'), 'utf8');
    const ladders = parseProgressionLadders(md);
    assert.equal(ladders.length, 34, 'all 34 domain ladders parse');
    const totalRoles = ladders.reduce((n, l) => n + Object.values(l.levels).flat().length, 0);
    assert.equal(totalRoles, 226, 'parser sees every role the drift guard guarantees');
    const s = buildCareerSankey(ladders);
    assert.ok(s.nodes.length >= 8, 'all level rungs present');
    const engSr = s.links.find(l => l.source === 'Engineer' && l.target === 'Senior Engineer');
    assert.ok(engSr.value >= 40, `main-line flow has real volume (got ${engSr.value})`);
    const mobility = parseMobilityPaths(md);
    assert.ok(mobility.length >= 7, 'mobility bullets parse');
    assert.ok(mobility.some(m => m.path.includes('TAL')));
});

// ── parseCareerPath ──────────────────────────────────────

test('parseCareerPath handles the dominant heading variant', () => {
    const md = `# Role\n\n## Career Development Path\n\n**Previous Roles:**\n\n- System Administrator\n- Build Engineer\n\n**Potential Next Roles:**\n\n- Senior Engineer\n\n## Interactions with Other Roles\n\n- stuff`;
    assert.deepEqual(parseCareerPath(md), {
        from: ['System Administrator', 'Build Engineer'],
        to:   ['Senior Engineer'],
    });
});

test('parseCareerPath handles the From/To (typical …) variant', () => {
    const md = `## Career Development Path\n\n**From (typical previous roles):**\n\n- VMware Senior Engineer\n\n**To (typical next roles):**\n\n- Cloud Lead Architect\n- Enterprise Architect\n`;
    assert.deepEqual(parseCareerPath(md), {
        from: ['VMware Senior Engineer'],
        to:   ['Cloud Lead Architect', 'Enterprise Architect'],
    });
});

test('parseCareerPath returns empty lists when the section is absent', () => {
    assert.deepEqual(parseCareerPath('# Role\n\n## Role Overview\n\nText.'), { from: [], to: [] });
});

test('parseCareerPath ignores bullets outside the from/to sub-lists', () => {
    const md = `## Career Development Path\n\nIntro text.\n\n- stray bullet\n\n**Previous Roles:**\n\n- Real Entry\n\n**Growth areas:**\n\n- not a role list\n`;
    assert.deepEqual(parseCareerPath(md), { from: ['Real Entry'], to: [] });
});

// #269's migration appends an inline annotation comment to a career-path
// bullet's own text. renderCareerStepper (index.html) shows this value
// directly and matches it against the catalog via findRoleByTitle, so an
// unstripped comment would appear as literal text in the career stepper and
// break the xref link.
test('parseCareerPath strips a #269 annotation from a bullet', () => {
    const md = `## Career Development Path\n\n**Previous Roles:**\n\n- Cloud Lead Architect <!-- role: cloud-lead-architect -->\n\n**Potential Next Roles:**\n\n- COO <!-- external-role -->\n`;
    assert.deepEqual(parseCareerPath(md), {
        from: ['Cloud Lead Architect'],
        to:   ['COO'],
    });
});

test('parseCareerPath parses every role file in the catalog', () => {
    const fs = require('node:fs');
    const path = require('node:path');
    let withBoth = 0, total = 0;
    for (const d of fs.readdirSync(path.join(__dirname, '..', 'Roles'), { withFileTypes: true })) {
        if (!d.isDirectory()) continue;
        for (const f of fs.readdirSync(path.join(__dirname, '..', 'Roles', d.name))) {
            if (!f.endsWith('.md') || f === 'README.md' || /_standards\.md$/.test(f)) continue;
            total++;
            const cp = parseCareerPath(fs.readFileSync(path.join(__dirname, '..', 'Roles', d.name, f), 'utf8'));
            if (cp.from.length && cp.to.length) withBoth++;
        }
    }
    assert.equal(total, 226);
    assert.equal(withBoth, 226, 'every role file yields both From and To lists');
});

// ── sectionStartsOpen (#112) ──────────────────────────────
// Role bodies open with all 14 sections expanded (~9,000 chars). Collapsing
// them turns the page into a scannable outline, but the orienting sections
// must stay open or the reader lands on a wall of closed headings.
test('sectionStartsOpen keeps the two orienting sections expanded', () => {
    assert.equal(sectionStartsOpen('Role Overview'), true);
    assert.equal(sectionStartsOpen('Role Scope & Boundaries'), true);
});

test('sectionStartsOpen collapses the reference sections', () => {
    assert.equal(sectionStartsOpen('Key Technologies'), false);
    assert.equal(sectionStartsOpen('Recommended Certifications & Learning Paths'), false);
    assert.equal(sectionStartsOpen('Typical Day-to-Day Activities'), false);
    assert.equal(sectionStartsOpen('Key Performance Indicators'), false);
});

test('sectionStartsOpen tolerates the catalog heading spelling variants', () => {
    // 67 files use "Required Skills", 155 "Required Skills & Qualifications";
    // "and" vs "&" splits 203/19 (see #121). Matching must not depend on
    // which variant a given file happens to use.
    assert.equal(sectionStartsOpen('Role Scope and Boundaries'), true);
    assert.equal(sectionStartsOpen('  role scope & boundaries  '), true);
});

test('sectionStartsOpen defaults unknown sections to collapsed', () => {
    assert.equal(sectionStartsOpen('Something New We Added Later'), false);
    assert.equal(sectionStartsOpen(''), false);
    assert.equal(sectionStartsOpen(null), false);
});

// ── findRoleByTitle (#120) ────────────────────────────────
// Career-path and interaction prose names roles the way English does —
// plural for a group, with a parenthetical qualifier for a variant. An
// exact-match lookup misses all of those, so the reference renders as
// dead text instead of a link.
const LOOKUP_DOMAINS = {
    security: {
        label: 'Security',
        roles: [
            { title: 'Security Engineer',        file: 'Roles/security/security_engineer.md',        level: 'Engineer' },
            { title: 'Security Senior Engineer', file: 'Roles/security/security_senior_engineer.md', level: 'Senior Engineer' },
        ],
    },
    modern_workplace: {
        label: 'Modern Workplace',
        roles: [
            { title: 'Modern Workplace Architect (Microsoft 365)', file: 'Roles/modern_workplace/mw_architect.md', level: 'Architect' },
        ],
    },
    leadership: {
        label: 'Leadership',
        roles: [
            { title: 'Chief Information Security Officer', file: 'Roles/leadership/ciso.md', level: 'CISO' },
        ],
    },
};

test('findRoleByTitle matches an exact title', () => {
    const hit = findRoleByTitle('Security Engineer', LOOKUP_DOMAINS);
    assert.equal(hit.file, 'Roles/security/security_engineer.md');
    assert.equal(hit.domainLabel, 'Security');
});

test('findRoleByTitle matches a plural reference to a singular role title', () => {
    // "collaborates with Security Engineers" is correct prose; the catalog
    // title is singular.
    assert.equal(findRoleByTitle('Security Engineers', LOOKUP_DOMAINS)?.file,
                 'Roles/security/security_engineer.md');
    assert.equal(findRoleByTitle('Security Senior Engineers', LOOKUP_DOMAINS)?.file,
                 'Roles/security/security_senior_engineer.md');
});

test('findRoleByTitle ignores a parenthetical qualifier on the reference', () => {
    // e.g. "Chief Information Security Officer (CISO)" in a career path.
    assert.equal(findRoleByTitle('Chief Information Security Officer (CISO)', LOOKUP_DOMAINS)?.file,
                 'Roles/leadership/ciso.md');
});

test('findRoleByTitle matches when the catalog title carries the parenthetical', () => {
    // The reverse case: prose says "Modern Workplace Architect", the
    // catalog title is "Modern Workplace Architect (Microsoft 365)".
    assert.equal(findRoleByTitle('Modern Workplace Architect', LOOKUP_DOMAINS)?.file,
                 'Roles/modern_workplace/mw_architect.md');
});

test('findRoleByTitle returns null for a role the catalog does not define', () => {
    // Aspirational exits like "Chief Architect" are deliberately outside
    // the catalog and must stay unlinked rather than resolving to something
    // approximate.
    assert.equal(findRoleByTitle('Chief Architect', LOOKUP_DOMAINS), null);
    assert.equal(findRoleByTitle('VP of Engineering', LOOKUP_DOMAINS), null);
});

test('findRoleByTitle does not fuzzy-match a different role', () => {
    // "Security Architect" is not in this fixture; matching it to
    // "Security Engineer" would send the reader to the wrong role.
    assert.equal(findRoleByTitle('Security Architect', LOOKUP_DOMAINS), null);
});

test('no two catalog role titles collide under roleTitleKey', () => {
    // The plural/parenthetical normalisation is what makes prose references
    // resolve (#120), but it also merges keys. If two real role titles ever
    // reduce to the same key, findRoleByTitle silently returns whichever
    // comes first and half the links point at the wrong role.
    const fs = require('node:fs');
    const path = require('node:path');
    const rolesDir = path.join(__dirname, '..', 'Roles');
    const seen = new Map();
    const collisions = [];
    for (const d of fs.readdirSync(rolesDir, { withFileTypes: true })) {
        if (!d.isDirectory()) continue;
        for (const f of fs.readdirSync(path.join(rolesDir, d.name))) {
            if (!f.endsWith('.md') || f === 'README.md' || /_standards\.md$/.test(f)) continue;
            const title = fs.readFileSync(path.join(rolesDir, d.name, f), 'utf8')
                .replace(/^\uFEFF/, '').split('\n')[0].replace(/^#\s*/, '').trim();
            const key = roleTitleKey(title);
            if (seen.has(key)) collisions.push(`${seen.get(key)} <-> ${title}`);
            else seen.set(key, title);
        }
    }
    assert.deepEqual(collisions, [], 'role titles that normalise to the same lookup key');
});

// ── panelStateFor (#119, #129) ────────────────────────────
// The five overlay panels are mutually exclusive, and their show/hide plus
// button state was copy-pasted into each toggle. One copy (Matrix) learned
// to restore the role grid on close and the other four never did, which is
// #129: closing Org/Graph/Careers over an open role left a blank screen.
// This computes the whole desired state in one place instead.
const PANEL_KEYS = ['matrix', 'stale', 'org', 'graph', 'careers'];

test('panelStateFor activates exactly one panel and clears the rest', () => {
    const s = panelStateFor('org', PANEL_KEYS, { hasRole: false });
    assert.equal(s.active, 'org');
    assert.deepEqual(s.panels.org, { show: true, pressed: true });
    for (const k of PANEL_KEYS.filter(k => k !== 'org')) {
        assert.deepEqual(s.panels[k], { show: false, pressed: false }, `${k} must be cleared`);
    }
});

test('panelStateFor hides the content views while a panel is open', () => {
    const s = panelStateFor('graph', PANEL_KEYS, { hasRole: true });
    assert.equal(s.showRolesGrid, false);
    assert.equal(s.showWelcome, false);
});

test('panelStateFor restores the open role when every panel closes (#129)', () => {
    // The regression: closing a panel over an open role must bring the role
    // back, not leave an empty content area.
    const s = panelStateFor(null, PANEL_KEYS, { hasRole: true });
    assert.equal(s.showRolesGrid, true, 'the open role must become visible again');
    assert.equal(s.showWelcome, false, 'welcome must not cover an open role');
    for (const k of PANEL_KEYS) assert.deepEqual(s.panels[k], { show: false, pressed: false });
});

test('panelStateFor falls back to the welcome screen when no role is open', () => {
    const s = panelStateFor(null, PANEL_KEYS, { hasRole: false });
    assert.equal(s.showWelcome, true);
    assert.equal(s.showRolesGrid, false);
});

// ── TOC helpers (#111) ────────────────────────────────────
// Role bodies are 13 collapsible sections. Once one is expanded and the
// reader scrolls into it the overview is lost, so a sticky section nav needs
// stable ids to jump to and a scroll-spy to say where you are.

test('tocIdFor slugifies a heading into a stable anchor id', () => {
    assert.equal(tocIdFor('Role Overview'), 'sec-role-overview');
    assert.equal(tocIdFor('Key Decisions & Accountabilities'), 'sec-key-decisions-accountabilities');
    assert.equal(tocIdFor('Typical Day-to-Day Activities'), 'sec-typical-day-to-day-activities');
});

test('tocIdFor gives the heading spelling variants the same id', () => {
    // 203 files use "and", 19 use "&" (#121). A link built from one spelling
    // must still resolve in a file that uses the other.
    assert.equal(tocIdFor('Key Decisions and Accountabilities'),
                 tocIdFor('Key Decisions & Accountabilities'));
});

test('activeTocIndex reports the last section at or above the scroll line', () => {
    const tops = [0, 400, 900, 1500];
    assert.equal(activeTocIndex(tops, 0), 0);
    assert.equal(activeTocIndex(tops, 399), 0);
    assert.equal(activeTocIndex(tops, 400), 1);
    assert.equal(activeTocIndex(tops, 1200), 2);
    assert.equal(activeTocIndex(tops, 99999), 3);
});

test('activeTocIndex stays on the first section when scrolled above it', () => {
    // Negative scroll happens with rubber-banding; it must not return -1 and
    // leave the nav with nothing highlighted.
    assert.equal(activeTocIndex([120, 500], -50), 0);
});

test('activeTocIndex returns -1 only when there are no sections', () => {
    assert.equal(activeTocIndex([], 0), -1);
});

test('activeTocIndex highlights the last section once scrolled to the bottom', () => {
    // At max scroll the remaining sections are all on screen and none of
    // their tops can reach the scroll line, so the plain rule sticks on
    // whichever section last crossed it. Jumping to the final section would
    // then highlight the wrong chip.
    const tops = [0, 400, 900, 1500];
    assert.equal(activeTocIndex(tops, 853), 1, 'mid-scroll is unchanged (900 has not passed 853)');
    assert.equal(activeTocIndex(tops, 853, { atBottom: true }), 3);
});

test('activeTocIndex atBottom is ignored when there are no sections', () => {
    assert.equal(activeTocIndex([], 500, { atBottom: true }), -1);
});

// ── parseRoleMeta (#113) ──────────────────────────────────
// openRole slices the body at the first "## ", so the metadata table above
// it never renders. Reports To / Direct Reports were therefore absent from
// the viewer entirely — the whole #5 backfill was invisible in the UI.
const META_MD = `# AWS Cloud Architect

| Field | Value |
|---|---|
| **Domain** | Cloud Platforms |
| **Chapter:** | Cloud, Platform & Infrastructure |
| **Role Level** | Architect |
| **Reports To** | Cloud Lead Architect |
| **Direct Reports** | AWS Cloud Senior Engineers |
| **Last Reviewed** | 2026-03 |

---

## Role Overview

Body text.
`;

test('parseRoleMeta reads the reporting line out of the metadata table', () => {
    const m = parseRoleMeta(META_MD);
    assert.equal(m.reportsTo, 'Cloud Lead Architect');
    assert.equal(m.directReports, 'AWS Cloud Senior Engineers');
});

test('parseRoleMeta reads the remaining metadata fields', () => {
    const m = parseRoleMeta(META_MD);
    assert.equal(m.domain, 'Cloud Platforms');
    assert.equal(m.level, 'Architect');
    assert.equal(m.lastReviewed, '2026-03');
    assert.equal(m.chapter, 'Cloud, Platform & Infrastructure');
});

test('parseRoleMeta returns null for fields a file omits', () => {
    const m = parseRoleMeta('# Role\n\n| Field | Value |\n|---|---|\n| **Domain** | X |\n\n## Role Overview\n');
    assert.equal(m.domain, 'X');
    assert.equal(m.reportsTo, null);
    assert.equal(m.directReports, null);
    assert.equal(m.lastReviewed, null);
});

test('parseRoleMeta does not read past the first section heading', () => {
    // A "Reports To" mentioned in prose must not be mistaken for metadata.
    const md = '# Role\n\n| Field | Value |\n|---|---|\n| **Domain** | X |\n\n## Role Overview\n\n| **Reports To** | Someone Else |\n';
    assert.equal(parseRoleMeta(md).reportsTo, null);
});

test('parseRoleMeta treats "None" as a real Direct Reports value', () => {
    // Individual-contributor roles say "None"; that is meaningful and should
    // render, not be dropped as empty.
    const md = META_MD.replace('AWS Cloud Senior Engineers', 'None');
    assert.equal(parseRoleMeta(md).directReports, 'None');
});

// ── splitReportingValue (#113) ────────────────────────────
// 34% of Reports To / Direct Reports values exceed 60 characters (max 241)
// because most carry a parenthetical qualifier explaining the arrangement.
// The chip shows the lead-in; the qualifier moves to a tooltip.
test('splitReportingValue separates the lead-in from a parenthetical qualifier', () => {
    const v = 'None (sets technical direction and mentors AWS Cloud Senior Engineers; formal line management sits with the Chapter Lead)';
    assert.deepEqual(splitReportingValue(v), {
        head: 'None',
        detail: 'sets technical direction and mentors AWS Cloud Senior Engineers; formal line management sits with the Chapter Lead',
    });
});

test('splitReportingValue leaves a short plain value untouched', () => {
    assert.deepEqual(splitReportingValue('Cloud Lead Architect'),
                     { head: 'Cloud Lead Architect', detail: '' });
});

test('splitReportingValue splits on a semicolon when there is no parenthetical', () => {
    assert.deepEqual(splitReportingValue('Solution Architect; Enterprise Architecture Senior Engineer'),
                     { head: 'Solution Architect', detail: 'Enterprise Architecture Senior Engineer' });
});

test('splitReportingValue handles empty and missing values', () => {
    assert.deepEqual(splitReportingValue(''),   { head: '', detail: '' });
    assert.deepEqual(splitReportingValue(null), { head: '', detail: '' });
});

// #269's migration appends an inline annotation comment to the same Reports
// To / Direct Reports value this function reads. Without stripping it, the
// chip would show the literal "<!-- role: ... -->" text and its xref match
// (which runs on `head`) would fail, since the comment isn't a catalogue
// title.
test('stripAnnotations removes each #269 annotation form without disturbing the underlying text', () => {
    assert.equal(
        stripAnnotations('Chief Executive Officer <!-- role: chief-executive-officer -->'),
        'Chief Executive Officer',
    );
    assert.equal(stripAnnotations('COO <!-- external-role -->'), 'COO');
    assert.equal(
        stripAnnotations('<!-- one-of -->A <!-- role: a -->, B <!-- role: b --><!-- /one-of -->'),
        'A, B',
    );
    assert.equal(stripAnnotations('Chief Executive Officer'), 'Chief Executive Officer');
    assert.equal(stripAnnotations(''), '');
    assert.equal(stripAnnotations(null), '');
});

test('splitReportingValue strips a #269 annotation from the head before it is shown or matched', () => {
    assert.deepEqual(
        splitReportingValue('Chief Executive Officer <!-- role: chief-executive-officer -->'),
        { head: 'Chief Executive Officer', detail: '' },
    );
    assert.deepEqual(
        splitReportingValue('COO <!-- external-role -->'),
        { head: 'COO', detail: '' },
    );
});

// index.html's inline <script> is not require()-able (it's not a module and
// has no exports), so this can't call reportingChip() directly the way the
// tests above call splitReportingValue()/stripAnnotations() in isolation.
// This is a text-level check instead: it confirms index.html actually wires
// stripAnnotations into its script (the destructuring pull from
// ViewerLogic) and applies it to the value that becomes the reporting
// chip's tooltip text, so a future edit can't silently drop the import or
// the call and regress #269's tooltip-leak fix without this test failing.
test('index.html imports stripAnnotations from ViewerLogic and applies it to the reporting-chip tooltip value', () => {
    const fs = require('node:fs');
    const path = require('node:path');
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/i);
    assert.ok(scriptMatch, 'index.html has an inline <script> block');
    const script = scriptMatch[1];

    const destructure = script.match(/const\s*\{[\s\S]*?\}\s*=\s*ViewerLogic;/);
    assert.ok(destructure, 'index.html destructures ViewerLogic exports');
    assert.match(destructure[0], /\bstripAnnotations\b/,
        'stripAnnotations must be pulled from ViewerLogic alongside splitReportingValue');

    const reportingChip = script.match(/const reportingChip = \(icon, label, value\) => \{[\s\S]*?\n {8}\};/);
    assert.ok(reportingChip, 'reportingChip() is defined in index.html as expected');
    assert.match(reportingChip[0], /stripAnnotations\(value\)/,
        'reportingChip must strip #269 annotations from value before use');
    assert.match(reportingChip[0], /title="\$\{escapeHtml\(clean\)\}"/,
        'the tooltip must render the stripped value, not the raw annotated one');
});

// ── staggered review schedule (#124) ──────────────────────
// 206 of 222 roles carry an identical 2026-03 stamp, so at a flat
// 12-month threshold every one of them turns stale in the same month and
// the panel goes from near-empty to 93% of the catalog. Git offers no
// real review history to stagger from (the repo is younger than the
// stamps), so the schedule is spread instead of the dates being invented.
test('reviewSlotFor is deterministic for a given path', () => {
    assert.equal(reviewSlotFor('Roles/security/security_engineer.md', 12),
                 reviewSlotFor('Roles/security/security_engineer.md', 12));
});

test('reviewSlotFor stays inside the requested span', () => {
    for (const f of ['a.md', 'Roles/x/y.md', 'Roles/really/long/path/name.md', '']) {
        const s = reviewSlotFor(f, 12);
        assert.ok(Number.isInteger(s) && s >= 0 && s < 12, `${f} produced ${s}`);
    }
});

test('reviewSlotFor spreads the real catalog across the whole span', () => {
    // The point of the exercise: no month may take a disproportionate share.
    const fs = require('node:fs'), path = require('node:path');
    const rolesDir = path.join(__dirname, '..', 'Roles');
    const counts = new Array(12).fill(0);
    let total = 0;
    for (const d of fs.readdirSync(rolesDir, { withFileTypes: true })) {
        if (!d.isDirectory()) continue;
        for (const f of fs.readdirSync(path.join(rolesDir, d.name))) {
            if (!f.endsWith('.md') || f === 'README.md' || /_standards\.md$/.test(f)) continue;
            counts[reviewSlotFor(`Roles/${d.name}/${f}`, 12)]++;
            total++;
        }
    }
    assert.ok(counts.every(c => c > 0), `some months got no roles: ${counts}`);
    const worst = Math.max(...counts);
    assert.ok(worst < total / 12 * 2.5, `month overloaded: ${worst} of ${total} (${counts})`);
});

test('computeStaleRoles without stagger is unchanged', () => {
    const now = new Date(2026, 6, 15);
    const stale = computeStaleRoles(fixtureDomains(), STALE_MONTHS, now);
    assert.deepEqual(stale.map(r => r.title), ['Never Reviewed', 'Ancient Role', 'Boundary Role']);
});

test('computeStaleRoles with stagger defers roles whose slot has not come up', () => {
    const now = new Date(2026, 6, 15);
    const all      = computeStaleRoles(fixtureDomains(), STALE_MONTHS, now);
    const staggered = computeStaleRoles(fixtureDomains(), STALE_MONTHS, now, { stagger: 12 });
    assert.ok(staggered.length < all.length, 'staggering must hold some roles back');
});

test('computeStaleRoles with stagger still flags never-reviewed roles immediately', () => {
    // A missing date is a real gap, not a scheduling slot — it must not be
    // deferred by up to a year.
    const now = new Date(2026, 6, 15);
    const staggered = computeStaleRoles(fixtureDomains(), STALE_MONTHS, now, { stagger: 12 });
    assert.ok(staggered.some(r => r.title === 'Never Reviewed'));
});

test('computeStaleRoles with stagger still flags a very overdue role', () => {
    // 2020-01 is ~78 months old; no slot offset within a 12-month span can
    // excuse that.
    const now = new Date(2026, 6, 15);
    const staggered = computeStaleRoles(fixtureDomains(), STALE_MONTHS, now, { stagger: 12 });
    assert.ok(staggered.some(r => r.title === 'Ancient Role'));
});

// ── level grouping and filtering (#114, #115, #116, #141) ──
test('EXEC_LEVELS covers every C-suite/executive canonical level', () => {
    // #18 and #46 were both a hand-maintained level list that someone forgot
    // to extend; #141 was a third (the Executives tile omitted CFO). Deriving
    // the set and guarding it here is what stops a fourth.
    for (const l of ['CEO', 'CTO', 'CIO', 'CFO', 'SVP', 'CISO']) {
        assert.ok(EXEC_LEVELS.includes(l), `executive level "${l}" missing from EXEC_LEVELS`);
    }
});

test('every canonical level belongs to exactly one stat group', () => {
    // A level in no group is invisible on the welcome screen; a level in two
    // is double-counted. Either way the tiles stop summing to the catalogue.
    for (const level of CANONICAL_LEVELS) {
        const groups = STAT_GROUPS.filter(g => g.levels.includes(level)).map(g => g.label);
        assert.equal(groups.length, 1, `"${level}" is in ${groups.length} groups: ${groups}`);
    }
});

test('the stat groups together account for every role in the catalogue', () => {
    const domains = {
        a: { label: 'A', roles: [
            { title: 'X', file: 'a/x.md', level: 'CFO' },
            { title: 'Y', file: 'a/y.md', level: 'Engineer' },
            { title: 'Z', file: 'a/z.md', level: 'Architect' },
        ] },
    };
    const total = Object.values(domains).flatMap(d => d.roles).length;
    const summed = STAT_GROUPS.reduce((n, g) => n + countRolesAtLevels(domains, g.levels), 0);
    assert.equal(summed, total);
});

test('countRolesAtLevels counts only the requested levels', () => {
    const domains = { a: { label: 'A', roles: [
        { title: 'X', file: 'a/x.md', level: 'CFO' },
        { title: 'Y', file: 'a/y.md', level: 'Engineer' },
    ] } };
    assert.equal(countRolesAtLevels(domains, ['CFO']), 1);
    assert.equal(countRolesAtLevels(domains, ['CFO', 'Engineer']), 2);
    assert.equal(countRolesAtLevels(domains, []), 0);
});

test('roleMatchesFilter combines the text query and the level filter', () => {
    const role = { title: 'AWS Cloud Architect', level: 'Architect' };
    const ctx  = { domainLabel: 'Cloud Platforms', chapterLabel: 'Cloud, Platform & Infrastructure' };
    assert.equal(roleMatchesFilter(role, ctx, { q: 'aws',  levels: [] }), true);
    assert.equal(roleMatchesFilter(role, ctx, { q: 'aws',  levels: ['Architect'] }), true);
    assert.equal(roleMatchesFilter(role, ctx, { q: 'aws',  levels: ['Engineer'] }), false);
    assert.equal(roleMatchesFilter(role, ctx, { q: 'nope', levels: ['Architect'] }), false);
    assert.equal(roleMatchesFilter(role, ctx, { q: '',     levels: [] }), true);
});

test('roleMatchesFilter normalizes internal whitespace in exact-title queries', () => {
    const role = { title: 'Kubernetes Architect', level: 'Architect' };

    assert.equal(
        roleMatchesFilter(role, {}, { q: '  KUBERNETES   architect  ', levels: [] }),
        true,
    );
});

test('roleMatchesFilter matches on domain and chapter as well as title', () => {
    const role = { title: 'AWS Cloud Architect', level: 'Architect' };
    const ctx  = { domainLabel: 'Cloud Platforms', chapterLabel: 'Cloud, Platform & Infrastructure' };
    assert.equal(roleMatchesFilter(role, ctx, { q: 'cloud platforms', levels: [] }), true);
    assert.equal(roleMatchesFilter(role, ctx, { q: 'infrastructure',  levels: [] }), true);
});

// ── groupResources (#144) ─────────────────────────────────
// The Resources list mixed two kinds of thing: read-only references
// describing the catalogue, and onboarding templates you copy and fill in.
// Grouping is data-driven so the onboarding group is somewhere new
// templates get added, not a hard-coded second list.
test('groupResources returns groups in the declared order, not alphabetically', () => {
    const items = [
        { group: 'reference',  title: 'A' },
        { group: 'onboarding', title: 'B' },
        { group: 'reference',  title: 'C' },
    ];
    const groups = groupResources(items, [
        { key: 'reference',  label: '📚 Resources' },
        { key: 'onboarding', label: '🚀 Onboarding' },
    ]);
    assert.deepEqual(groups.map(g => g.label), ['📚 Resources', '🚀 Onboarding']);
    assert.deepEqual(groups[0].items.map(i => i.title), ['A', 'C']);
    assert.deepEqual(groups[1].items.map(i => i.title), ['B']);
});

test('groupResources omits a group that has no items', () => {
    const groups = groupResources([{ group: 'reference', title: 'A' }], [
        { key: 'reference',  label: 'Ref' },
        { key: 'onboarding', label: 'Onboarding' },
    ]);
    assert.deepEqual(groups.map(g => g.label), ['Ref']);
});

test('groupResources keeps an ungrouped item visible in the first group', () => {
    // A resource added without a group must not silently vanish from the
    // sidebar - that failure mode is invisible until someone goes looking.
    const groups = groupResources([{ title: 'Orphan' }], [
        { key: 'reference',  label: 'Ref' },
        { key: 'onboarding', label: 'Onboarding' },
    ]);
    assert.deepEqual(groups[0].items.map(i => i.title), ['Orphan']);
});

// ── pushRecent (#117) ─────────────────────────────────────
// Navigation history is a single linear Back stack, so returning to a role
// seen a few minutes ago means re-finding it. A recently-viewed list needs
// most-recent-first ordering, no duplicates, and a hard cap.
test('pushRecent puts the newest entry first', () => {
    const list = pushRecent([], { file: 'a.md', title: 'A' }, 5);
    assert.deepEqual(list.map(r => r.file), ['a.md']);
    const list2 = pushRecent(list, { file: 'b.md', title: 'B' }, 5);
    assert.deepEqual(list2.map(r => r.file), ['b.md', 'a.md']);
});

test('pushRecent moves a revisited role to the front rather than duplicating it', () => {
    let list = [];
    for (const f of ['a.md', 'b.md', 'c.md']) list = pushRecent(list, { file: f, title: f }, 5);
    list = pushRecent(list, { file: 'a.md', title: 'a.md' }, 5);
    assert.deepEqual(list.map(r => r.file), ['a.md', 'c.md', 'b.md']);
    assert.equal(new Set(list.map(r => r.file)).size, list.length, 'no duplicates');
});

test('pushRecent caps the list and drops the oldest', () => {
    let list = [];
    for (const f of ['a', 'b', 'c', 'd']) list = pushRecent(list, { file: f, title: f }, 3);
    assert.deepEqual(list.map(r => r.file), ['d', 'c', 'b']);
});

test('pushRecent ignores an entry with no file', () => {
    const list = pushRecent([{ file: 'a.md', title: 'A' }], { title: 'no file' }, 5);
    assert.deepEqual(list.map(r => r.file), ['a.md']);
});

test('pushRecent tolerates a corrupt or non-array stored value', () => {
    // localStorage content is user-writable and survives across versions, so
    // it cannot be trusted to still be the shape we wrote.
    assert.deepEqual(pushRecent(null,        { file: 'a', title: 'A' }, 5).map(r => r.file), ['a']);
    assert.deepEqual(pushRecent('garbage',   { file: 'a', title: 'A' }, 5).map(r => r.file), ['a']);
    assert.deepEqual(pushRecent([1, 2, null],{ file: 'a', title: 'A' }, 5).map(r => r.file), ['a']);
});

test('pushRecent keeps only the fields the list renders', () => {
    // Storing the whole role object would persist stale titles and levels
    // across catalogue edits.
    const list = pushRecent([], { file: 'a.md', title: 'A', level: 'Engineer', domainLabel: 'X', extra: 'drop me' }, 5);
    assert.deepEqual(Object.keys(list[0]).sort(), ['domainLabel', 'file', 'level', 'title']);
});

test('pushRecent sanitises the list even when there is no entry to add', () => {
    // loadRecent() calls pushRecent(stored, null) purely to clean whatever
    // localStorage held. The early return for a missing entry used to hand
    // the raw list straight back, so a stored null survived and crashed the
    // renderer on r.file.
    assert.deepEqual(pushRecent([1, 2, null, { nope: true }], null, 5), []);
    assert.deepEqual(
        pushRecent([{ file: 'a.md', title: 'A', level: 'Engineer', domainLabel: 'D' }, null], null, 5),
        [{ file: 'a.md', title: 'A', level: 'Engineer', domainLabel: 'D' }]
    );
    assert.deepEqual(pushRecent('garbage', null, 5), []);
});

// ── accessible list fallbacks (#118) ──────────────────────
// These build the "View as list" content behind the Org and Graph charts —
// what a screen-reader user gets instead of an ECharts canvas. They were
// untested, and a regression in them is invisible to sighted testing.

test('orgListHtml nests children as nested lists', () => {
    const html = orgListHtml({ name: 'Root', children: [{ name: 'Child' }] });
    assert.match(html, /<ul><li>.*Root.*<ul><li>.*Child.*<\/li><\/ul><\/li><\/ul>/s);
});

test('orgListHtml makes a node with a file keyboard-operable, and one without inert', () => {
    const withFile = orgListHtml({ name: 'A Role', file: 'Roles/x/a.md' });
    assert.match(withFile, /data-file="Roles\/x\/a\.md"/);
    assert.match(withFile, /role="button"/);
    assert.match(withFile, /tabindex="0"/);

    const without = orgListHtml({ name: 'A Domain' });
    assert.doesNotMatch(without, /role="button"/, 'a non-navigable node must not claim to be a button');
});

test('orgListHtml names the chapter lead on a chapter node', () => {
    // buildOrgTree sets `file` and `leadTitle` together from the chapter's
    // lead, so a chapter with a lead is both labelled and clickable.
    const html = orgListHtml({ name: 'Chapter', file: 'Roles/leadership/lead.md', leadTitle: 'Chapter Lead' });
    assert.match(html, /lead: Chapter Lead/);
    assert.match(html, /data-file="Roles\/leadership\/lead\.md"/);
});

test('orgListHtml adds no lead line to a node without one', () => {
    assert.doesNotMatch(orgListHtml({ name: 'Domain' }), /lead:/);
    assert.doesNotMatch(orgListHtml({ name: 'Role', file: 'r.md' }), /lead:/);
});

// Tag casing is matched case-insensitively: HTML tag names are not
// case-sensitive, so a lower-case-only assertion would pass while "<SCRIPT>"
// survived escaping.
test('orgListHtml escapes names and file paths whatever the tag casing', () => {
    const html = orgListHtml({ name: '<IMG src=x onerror=alert(1)>', file: '"><script>' });
    assert.doesNotMatch(html, /<img/i);
    assert.doesNotMatch(html, /<script>/i);
    assert.match(html, /&lt;IMG/);
});

test('graphListHtml lists each node with its relationships and chapter', () => {
    const graph = {
        nodes: [{ name: 'Alpha', kind: 'domain', notes: [] },
                { name: 'Beta',  kind: 'domain', notes: [] }],
        links: [{ source: 'Alpha', target: 'Beta', kind: 'collaborates', labels: ['shared work'] }],
    };
    const html = graphListHtml(graph, { Alpha: 'Chapter One', Beta: 'Chapter Two' });
    assert.match(html, /Alpha/);
    assert.match(html, /Chapter One/);
    assert.match(html, /Collaborates with/);
    assert.match(html, /shared work/);
});

test('graphListHtml describes a relationship from both sides', () => {
    // The reader may arrive at either node, so the edge must appear under
    // both — a directed rendering would hide half the graph.
    const graph = {
        nodes: [{ name: 'Alpha', kind: 'domain', notes: [] },
                { name: 'Beta',  kind: 'domain', notes: [] }],
        links: [{ source: 'Alpha', target: 'Beta', kind: 'consulted', labels: ['x'] }],
    };
    const html = graphListHtml(graph, {});
    assert.equal((html.match(/Consulted relationship with/g) || []).length, 2);
});

test('graphListHtml labels an external party rather than guessing its chapter', () => {
    const graph = { nodes: [{ name: 'Vendor', kind: 'external', notes: [] }], links: [] };
    assert.match(graphListHtml(graph, {}), /External party/);
});

test('graphListHtml falls back to "Other" for a node with no chapter', () => {
    const graph = { nodes: [{ name: 'Orphan', kind: 'domain', notes: [] }], links: [] };
    assert.match(graphListHtml(graph, {}), /Other/);
});

test('graphListHtml renders node notes', () => {
    const graph = { nodes: [{ name: 'Alpha', kind: 'domain', notes: ['consulted by all domains'] }], links: [] };
    assert.match(graphListHtml(graph, {}), /consulted by all domains/);
});

// ── parseKpiBullet (#140) ─────────────────────────────────
// Converting a bullet KPI to a | Metric | Target | Frequency | row. The
// metric text is kept verbatim so nothing is lost; a target or cadence
// already stated in the prose is surfaced into its own column, and a gap
// is rendered as an em dash rather than silently omitted.
test('parseKpiBullet surfaces a stated target without altering the metric text', () => {
    const t = 'SAST/DAST/SCA pipeline coverage: ≥95% of active repositories instrumented';
    const r = parseKpiBullet(t);
    assert.equal(r.metric, t, 'metric text must survive verbatim');
    assert.equal(r.target, '≥95%');
});

test('parseKpiBullet recognises the target forms actually used', () => {
    assert.equal(parseKpiBullet('MTTD critical vulnerabilities: ≤24 hours from commit').target, '≤24 hours');
    assert.equal(parseKpiBullet('Admission control coverage: 100% of production clusters').target, '100%');
    assert.equal(parseKpiBullet('Resolution time <4 hours for P1').target, '<4 hours');
    assert.equal(parseKpiBullet('Attrition rate ≥30% of findings auto-resolved').target, '≥30%');
});

test('parseKpiBullet extracts a cadence when one is named', () => {
    assert.equal(parseKpiBullet('False positive rate ≤10%, reviewed monthly').frequency, 'Monthly');
    assert.equal(parseKpiBullet('Adoption reviewed quarterly').frequency, 'Quarterly');
    assert.equal(parseKpiBullet('Reported annually to the board').frequency, 'Annual');
});

test('parseKpiBullet marks an absent target or cadence with an em dash', () => {
    // The gap has to be visible in the row. Omitting it would make an
    // unmeasurable KPI look complete.
    const r = parseKpiBullet('AI incident rate and severity');
    assert.equal(r.metric, 'AI incident rate and severity');
    assert.equal(r.target, '—');
    assert.equal(r.frequency, '—');
});

test('parseKpiBullet does not mistake a year or a version for a target', () => {
    assert.equal(parseKpiBullet('Alignment with ISO 27001 controls').target, '—');
    assert.equal(parseKpiBullet('Adoption of the 2026 architecture standard').target, '—');
});

test('parseKpiBullet escapes a pipe so it cannot break the table', () => {
    assert.equal(parseKpiBullet('Uptime | availability').metric, 'Uptime \\| availability');
});

// A backslash already in the bullet must be escaped before the pipe is, or
// the escape the line above depends on is itself escaped away and the column
// breaks anyway.
test('parseKpiBullet escapes a backslash so it cannot cancel the pipe escape', () => {
    assert.equal(
        parseKpiBullet(String.raw`Uptime \| availability`).metric,
        String.raw`Uptime \\\| availability`,
    );
});

// ── proposedKpiTarget (#140) ──────────────────────────────
// Seeds a recognised industry benchmark for the metric families that have
// one. Every value is marked "(proposed)" so it cannot be mistaken for an
// agreed organisational target, and the validator counts proposals apart
// from real gaps.
test('proposedKpiTarget seeds the well-established families', () => {
    assert.match(proposedKpiTarget('Platform availability').target, /99\.9%/);
    assert.match(proposedKpiTarget('Overall SLA attainment').target, /95%/);
    assert.match(proposedKpiTarget('Desk-wide CSAT score').target, /85%/);
    assert.match(proposedKpiTarget('Mean time to restore (MTTR)').target, /4 hours/);
    assert.match(proposedKpiTarget('Change failure rate').target, /15%/);
});

test('proposedKpiTarget marks every seeded value as proposed', () => {
    for (const m of ['Service uptime', 'Backup success rate', 'Test coverage']) {
        assert.match(proposedKpiTarget(m).target, /\(proposed\)$/, `"${m}" must be marked`);
    }
});

test('proposedKpiTarget returns nothing for a metric with no recognised benchmark', () => {
    // These are the 1,379 that name a subject rather than a measure. Inventing
    // a number for them is exactly what must not happen.
    for (const m of ['Architecture design quality and effectiveness',
                     'AI supplier assessment coverage',
                     'Knowledge transfer to engineering teams']) {
        assert.equal(proposedKpiTarget(m), null, `"${m}" must not be seeded`);
    }
});

test('proposedKpiTarget declines the families with no established benchmark', () => {
    // Adoption and incident rate were deliberately excluded: widely measured,
    // but with no industry-standard value to propose.
    assert.equal(proposedKpiTarget('Self-service adoption rate'), null);
    assert.equal(proposedKpiTarget('Security incident rate'), null);
});

test('proposedKpiTarget suggests a review cadence alongside the target', () => {
    assert.ok(proposedKpiTarget('Platform availability').frequency);
    assert.match(proposedKpiTarget('Platform availability').frequency, /Monthly|Quarterly/);
});

test('proposedKpiTarget matches the family, not an incidental word', () => {
    // "available" in prose must not trigger the availability benchmark.
    assert.equal(proposedKpiTarget('Documentation available to delivery teams'), null);
});

// ── proposedKpiTarget: seeding must not contradict the metric (#140) ──
// Every string below is real content from a role file that the first pass
// of benchmark matching seeded wrongly. They are the regression guard:
// each had a keyword the benchmark table recognised, used in a sense the
// benchmark does not apply to.

test('proposedKpiTarget refuses a percentage target on a duration metric', () => {
    // "availability" appears here as the endpoint of a lead time, not as
    // the thing measured. Seeding 99.9% against a metric counted in hours
    // is worse than leaving it blank: the validator counts it as awaiting
    // confirmation rather than as wrong.
    for (const m of [
        'Model deployment lead time (hours from training completion to production endpoint availability, trending down)',
        'ML feature pipeline production lead time (time from feature request to production availability)',
        'eDiscovery case turnaround time (Legal SLA compliance)',
    ]) {
        assert.equal(proposedKpiTarget(m), null, `"${m}" must not be seeded`);
    }
});

test('proposedKpiTarget refuses a percentage target on a counted metric', () => {
    assert.equal(
        proposedKpiTarget('Number of ad hoc financial analysis requests completed within SLA per quarter'),
        null);
});

test('proposedKpiTarget refuses composite and trend metrics', () => {
    // A metric naming several measures at once has no single target, and a
    // metric asking for a direction of travel has no threshold at all.
    for (const m of [
        'DORA metrics trend at chapter level (deployment frequency, lead time, change failure rate, MTTR)',
        'DORA metrics improvement per coached team: deployment frequency, lead time for changes, mean time to recovery, and change failure rate tracked before and after engagement',
        'Improvement in delivery metrics (lead time, MTTR, etc.)',
        'Improvements in deployment frequency and reliability',
        'Backup success rate improvement trends',
        'Security incident frequency, severity, and mean time to detect and respond',
    ]) {
        assert.equal(proposedKpiTarget(m), null, `"${m}" must not be seeded`);
    }
});

test('proposedKpiTarget reads a list of products as scope, not as measures', () => {
    // Reconciling the guard against all 258 seeded rows caught this: a
    // comma-counting rule refused these, but each names one measure across
    // several products. Only a row naming three actual measures is composite.
    for (const m of [
        'Microsoft 365 service availability (Exchange, Teams, SharePoint)',
        'Data platform availability SLA (uptime % for Databricks, ingestion pipelines, and shared platform components)',
        'Incident, Change, and Problem SLA compliance rates (platform impact contribution)',
    ]) {
        assert.ok(proposedKpiTarget(m), `"${m}" should still be seeded`);
    }
});

test('proposedKpiTarget routes vulnerability MTTR to the remediation policy', () => {
    // MTTR here means "time to remediate a finding", governed by the
    // vulnerability policy, not the P1 restore commitment.
    const got = proposedKpiTarget(
        'Vulnerability mean time to remediate (MTTR) across critical and high severity findings');
    assert.match(got.target, /30 days/);
});

test('proposedKpiTarget seeds the further sourceable families', () => {
    assert.match(proposedKpiTarget('Median lead time from commit to production for teams on the standard (hours)').target, /24 hours/);
    assert.match(proposedKpiTarget('Platform services meeting their published SLO (%)').target, /95%/);
    assert.match(proposedKpiTarget('Cloud accounts and subscriptions compliant with landing-zone guardrails (%)').target, /95%/);
    assert.match(proposedKpiTarget('Support requests acknowledged within the agreed response window (%)').target, /95%/);
});

test('the DORA lead time figure is anchored to change lead time', () => {
    // Not every duration called a lead time is the DORA one. Without the
    // anchor this seeded ≤24 hours against an ML feature pipeline.
    assert.equal(
        proposedKpiTarget('ML feature pipeline production lead time (time from feature request to production availability)'),
        null);
});

test('proposedKpiTarget separates published benchmarks from house starting points', () => {
    // The distinction the marker cannot carry: "(proposed)" says the number
    // is not agreed, but not whether anyone published it. A house figure
    // must never be dressed up with a citation it does not have.
    assert.equal(proposedKpiTarget('Change failure rate').basis, 'benchmark');
    const house = proposedKpiTarget('Owned documentation reviewed and current within the agreed review cycle (%)');
    assert.equal(house.basis, 'house');
    assert.match(house.note, /no industry standard/i);
    assert.match(house.target, /\(proposed\)$/);
});

test('every KPI benchmark declares its basis and a note', () => {
    // A new entry added without a basis would be counted as published.
    for (const b of KPI_BENCHMARKS) {
        assert.ok(['benchmark', 'house'].includes(b.basis), `${b.re} needs a basis`);
        assert.ok(b.note && b.note.length > 0, `${b.re} needs a note`);
    }
});

test('proposedKpiTarget seeds counted improvement items but not improvement in a measure', () => {
    // "Improvement in X" is a direction of travel; "Improvement items
    // proposed and adopted" counts things. The first blanket rule refused
    // both, which silently withheld a target from 3 rows that have a unit.
    assert.match(proposedKpiTarget('Improvement items proposed and adopted (count per quarter)').target, /per quarter/);
    assert.equal(proposedKpiTarget('Improvement in delivery metrics (lead time, MTTR, etc.)'), null);
    assert.equal(proposedKpiTarget('Improvements in deployment frequency and reliability'), null);
});

test('count targets are floors, and stated per period', () => {
    // A count depends on team size, so these say "the activity happens at
    // all" rather than proposing a level of output.
    for (const m of ['Engineers mentored who progress to the next competency level (count per year)',
                     'Knowledge-sharing sessions delivered to engineering teams (count per quarter)']) {
        assert.match(proposedKpiTarget(m).target, /^≥\d+ per (quarter|year) \(proposed\)$/, m);
        assert.equal(proposedKpiTarget(m).basis, 'house');
    }
});

// ── parseRadarDoc (#172) ──────────────────────────────────
// The radar view reads the generated document rather than re-deriving the
// numbers in the browser, so the chart and the page can never disagree.

test('parseRadarDoc reads technologies, rings and quadrants from the document', () => {
    const md = [
        '# Technology radar',
        '',
        'Some prose about what it is.',
        '',
        '| Ring | Meaning here |',
        '|---|---|',
        '| **Adopt** | Expected at Expert or Proficient level in 10 or more roles |',
        '',
        '## Platforms & Infrastructure',
        '',
        '| Technology | Ring | Roles | Expert | Proficient |',
        '|---|---|---:|---:|---:|',
        '| Microsoft Azure | Adopt | 138 | 86 | 71 |',
        '| Istio | Trial | 12 | 1 | 4 |',
        '',
        '## Data & AI',
        '',
        '| Technology | Ring | Roles | Expert | Proficient |',
        '|---|---|---:|---:|---:|',
        '| Power BI | Adopt | 33 | 12 | 21 |',
        '',
        '## Summary',
        '',
        '| Ring | Technologies |',
        '|---|---:|',
        '| Adopt | 40 |',
    ].join('\n');

    const got = parseRadarDoc(md);
    assert.equal(got.length, 3);
    assert.deepEqual(got[0], { name: 'Microsoft Azure', quadrant: 'Platforms & Infrastructure', ring: 'Adopt', roles: 138, expert: 86, proficient: 71 });
    assert.equal(got[2].quadrant, 'Data & AI');
});

test('parseRadarDoc ignores the explanatory and summary tables', () => {
    // Both have two columns and live under headings; only the five-column
    // technology tables carry radar entries.
    const md = [
        '## Summary',
        '',
        '| Ring | Technologies |',
        '|---|---:|',
        '| Adopt | 40 |',
        '| Hold | 0 — not derivable |',
    ].join('\n');
    assert.deepEqual(parseRadarDoc(md), []);
});

test('parseRadarDoc survives a document with no technology tables', () => {
    assert.deepEqual(parseRadarDoc('# Technology radar\n\nNothing yet.\n'), []);
    assert.deepEqual(parseRadarDoc(''), []);
});

test('radarListHtml groups by ring for the accessible fallback', () => {
    const entries = [
        { name: 'Microsoft Azure', quadrant: 'Platforms & Infrastructure', ring: 'Adopt', roles: 138, expert: 86, proficient: 71 },
        { name: 'Istio', quadrant: 'Platforms & Infrastructure', ring: 'Trial', roles: 12, expert: 1, proficient: 4 },
    ];
    const html = radarListHtml(entries);
    assert.match(html, /Adopt/);
    assert.match(html, /Microsoft Azure/);
    assert.match(html, /138/);
    // Hold has no source in the catalogue; the fallback must say so rather
    // than leaving the reader to wonder whether it was dropped.
    assert.match(html, /not derivable/i);
});
