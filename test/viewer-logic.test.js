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
    parseProgressionLadders,
    buildCareerSankey,
    parseMobilityPaths,
    parseCareerPath,
    resolveDocHref,
    sectionStartsOpen,
    roleTitleKey,
    findRoleByTitle,
    panelStateFor,
    tocIdFor,
    activeTocIndex,
} = require('../viewer-logic');

const { CANONICAL_LEVELS, REFERENCE_DOC_PATTERN: ROLEMETA_REF_PATTERN } = require('../roleMeta');
const { REFERENCE_DOC_PATTERN } = require('../viewer-logic');

test('viewer-logic REFERENCE_DOC_PATTERN mirrors roleMeta exactly', () => {
    // The browser cannot require roleMeta.js, so viewer-logic carries a
    // copy; this test keeps the two from drifting apart.
    assert.equal(REFERENCE_DOC_PATTERN.source, ROLEMETA_REF_PATTERN.source);
    assert.equal(REFERENCE_DOC_PATTERN.flags, ROLEMETA_REF_PATTERN.flags);
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
    assert.equal(ladders.length, 33, 'all 33 domain ladders parse');
    const totalRoles = ladders.reduce((n, l) => n + Object.values(l.levels).flat().length, 0);
    assert.equal(totalRoles, 222, 'parser sees every role the drift guard guarantees');
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
    assert.equal(total, 222);
    assert.equal(withBoth, 222, 'every role file yields both From and To lists');
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
