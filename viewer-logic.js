// Pure view logic shared between the browser UI (index.html) and the
// node:test suite (test/viewer-logic.test.js). UMD-ish: in the browser it
// attaches to window.ViewerLogic; under Node it exports via module.exports.
// Keep this file free of DOM access and application state — everything here
// must stay callable from tests with plain data.
(function (root, factory) {
    'use strict';
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.ViewerLogic = factory();
    }
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // Roles not reviewed within this many months are flagged stale.
    const STALE_MONTHS = 12;

    // Files that document standards/policy rather than a single role.
    // Mirror of roleMeta.js REFERENCE_DOC_PATTERN (which can't be required
    // from the browser); a test asserts the two stay identical.
    const REFERENCE_DOC_PATTERN = /_standards\.md$/;

    // Matrix column order. Must cover every canonical role level in
    // roleMeta.js CANONICAL_LEVELS — a level missing here silently drops
    // its roles from the matrix (see #46: CFO was absent).
    const LEVEL_ORDER = [
        'CEO',
        'CTO',
        'CIO',
        'CFO',
        'SVP',
        'CISO',
        'Product Area Lead',
        'Technical Area Lead',
        'Chapter Lead',
        'Principal Architect',
        'Lead Architect',
        'Architect',
        'Senior Engineer',
        'Engineer',
        'Reliability Engineer',
        'Product Owner',
    ];

    // Short column header labels for the matrix.
    const LEVEL_SHORT = {
        'CEO':                 'CEO',
        'CTO':                 'CTO',
        'CIO':                 'CIO',
        'CFO':                 'CFO',
        'SVP':                 'SVP',
        'CISO':                'CISO',
        'Product Area Lead':   'PAL',
        'Technical Area Lead': 'TAL',
        'Chapter Lead':        'Ch Lead',
        'Principal Architect': 'Principal',
        'Lead Architect':      'Lead Arch',
        'Architect':           'Architect',
        'Senior Engineer':     'Sr Engineer',
        'Engineer':            'Engineer',
        'Reliability Engineer':'SRE',
        'Product Owner':       'Prod Owner',
    };

    // Full escape for both text nodes and attribute values. Every dynamic
    // string interpolated into a template literal that becomes innerHTML
    // must pass through this — markdown bodies are sanitized with DOMPurify
    // instead (renderMarkdown in index.html).
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Badge CSS class for a role level. Every canonical level must map to
    // its own class — an unmapped level falls through to the Engineer
    // green (that fallthrough shipped the #18 CFO bug).
    function badgeClass(level) {
        if (level === 'CEO')                 return 'b-ceo';
        if (level === 'CTO')                 return 'b-cto';
        if (level === 'CIO')                 return 'b-cio';
        if (level === 'CFO')                 return 'b-cfo';
        if (level === 'SVP')                 return 'b-svp';
        if (level === 'CISO')                return 'b-ciso';
        if (level === 'Product Area Lead')   return 'b-pal';
        if (level === 'Technical Area Lead') return 'b-tal';
        if (level === 'Chapter Lead')        return 'b-cl';
        if (level === 'Principal Architect') return 'b-prin';
        if (level === 'Lead Architect')      return 'b-lead';
        if (level === 'Architect')           return 'b-arch';
        if (level === 'Senior Engineer')     return 'b-sen';
        if (level === 'Product Owner')       return 'b-po';
        if (level.includes('Reliability'))   return 'b-sre';
        return 'b-eng';
    }

    // Whole months between a YYYY-MM review stamp and now. Returns null for
    // missing or malformed values (treated as "never reviewed" upstream).
    function monthsSinceReview(lastReviewed, now = new Date()) {
        if (!lastReviewed) return null;
        const m = String(lastReviewed).match(/^(\d{4})-(\d{2})$/);
        if (!m) return null;
        const reviewed = new Date(Number(m[1]), Number(m[2]) - 1, 1);
        return (now.getFullYear() - reviewed.getFullYear()) * 12 + (now.getMonth() - reviewed.getMonth());
    }

    // Roles with no review date or one at least staleMonths old, sorted
    // most-overdue first (never-reviewed roles sort to the top).
    function computeStaleRoles(domains, staleMonths = STALE_MONTHS, now = new Date()) {
        const stale = [];
        for (const domain of Object.values(domains)) {
            for (const role of domain.roles) {
                const monthsSince = monthsSinceReview(role.lastReviewed, now);
                if (monthsSince === null || monthsSince >= staleMonths) {
                    stale.push({ ...role, domainLabel: domain.label, monthsSince });
                }
            }
        }
        return stale.sort((a, b) => (b.monthsSince ?? 9999) - (a.monthsSince ?? 9999));
    }

    // Role counts per canonical level, in seniority order (LEVEL_ORDER).
    // Levels present in the data but missing from the order are appended at
    // the end rather than dropped — a chart must never silently lose roles
    // the way the matrix once lost the CFO (#46).
    function rolesPerLevel(domains, levelOrder = LEVEL_ORDER) {
        const counts = new Map();
        for (const domain of Object.values(domains)) {
            for (const role of domain.roles) {
                counts.set(role.level, (counts.get(role.level) || 0) + 1);
            }
        }
        const ordered = levelOrder.filter(l => counts.has(l));
        const extras  = [...counts.keys()].filter(l => !levelOrder.includes(l)).sort();
        return [...ordered, ...extras].map(level => ({ level, count: counts.get(level) }));
    }

    // Role counts per chapter, in the chapters object's own order.
    // `chapters` is the CHAPTERS mapping from index.html: key → { label,
    // domains: [domainKey, …] }. Domains absent from the data count as 0.
    function rolesPerChapter(domains, chapters) {
        return Object.entries(chapters).map(([key, chapter]) => ({
            key,
            label: chapter.label,
            count: chapter.domains.reduce((n, d) => n + (domains[d]?.roles.length || 0), 0),
        }));
    }

    // Parse docs/CROSS_DOMAIN_INTERACTIONS.md into a graph:
    // nodes = domains (plus external parties), links = consultation edges
    // from the ownership table and collaboration edges from the
    // relationship bullets. Pure markdown in, { nodes, links } out.
    //
    // "All domains (…)" consulted entries and "X ↔ All" bullets become a
    // note on the node instead of edges — fanning one node out to every
    // other node says nothing and buries the real structure.
    function parseInteractions(markdown) {
        const lines = String(markdown).split(/\r?\n/);
        const nodes = new Map(); // name → { name, kind, notes: [] }
        const edges = new Map(); // "a|b" sorted key → { source, target, kinds:Set, labels: [] }

        const cleanName = raw => raw.replace(/\(.*?\)/g, '').trim();
        const isExternal = raw => /\(external\)/i.test(raw);
        const isAll = raw => /^all\b/i.test(raw.trim());

        function node(raw) {
            const name = cleanName(raw);
            if (!nodes.has(name)) {
                nodes.set(name, { name, kind: isExternal(raw) ? 'external' : 'domain', notes: [] });
            }
            return nodes.get(name);
        }

        function edge(a, b, kind, label) {
            const [s, t] = [a, b].sort();
            const key = `${s}|${t}`;
            if (!edges.has(key)) edges.set(key, { source: s, target: t, kinds: new Set(), labels: [] });
            const e = edges.get(key);
            e.kinds.add(kind);
            if (label) e.labels.push(label);
        }

        let section = null;
        for (const line of lines) {
            const h = line.match(/^##\s+(.+)/);
            if (h) { section = h[1].trim().toLowerCase(); continue; }

            if (section && section.startsWith('domain ownership')) {
                const m = line.match(/^\|(.+)\|(.+)\|(.+)\|\s*$/);
                if (!m) continue;
                const [decision, ownerRaw, consultedRaw] = [m[1], m[2], m[3]].map(s => s.trim());
                if (/^-+$/.test(decision.replace(/\s/g, '')) || /technology \/ decision/i.test(decision)) continue;
                const owner = node(ownerRaw);
                for (const c of consultedRaw.split(',').map(s => s.trim()).filter(Boolean)) {
                    if (isAll(c)) { owner.notes.push(`Consulted by all domains: ${decision}`); continue; }
                    edge(owner.name, node(c).name, 'consults', decision);
                }
            }

            if (section && section.startsWith('key cross-domain')) {
                const m = line.match(/^-\s+\*\*(.+?)\s*↔\s*(.+?)\*\*\s*—\s*(.+)$/);
                if (!m) continue;
                const [aRaw, bRaw, desc] = [m[1], m[2], m[3]].map(s => s.trim());
                if (isAll(bRaw)) { node(aRaw).notes.push(`Collaborates with all domains: ${desc}`); continue; }
                edge(node(aRaw).name, node(bRaw).name, 'collaborates', desc);
            }
        }

        return {
            nodes: [...nodes.values()],
            links: [...edges.values()].map(e => ({
                source: e.source,
                target: e.target,
                kind: e.kinds.has('collaborates') ? 'collaborates' : 'consults',
                labels: e.labels,
            })),
        };
    }

    // Parse the domain-ladder section of docs/SKILLS_PROGRESSION.md into
    // [{ domain, levels: { bucket: [roleName, …] } }]. Pure markdown in;
    // the drift-guard tests in test/skills-progression.test.js keep the
    // document complete, so this parser can trust its shape.
    function parseProgressionLadders(markdown) {
        const section = String(markdown)
            .split('## Domain-by-domain progression paths')[1];
        if (!section) return [];
        const body = section.split(/\r?\n## /)[0];
        const ladders = [];
        let current = null;
        for (const line of body.split(/\r?\n/)) {
            const h = line.match(/^###\s+(.+)/);
            if (h) {
                current = { domain: h[1].trim(), levels: {} };
                ladders.push(current);
                continue;
            }
            const l = current && line.match(/^-\s+([^:]+):\s+(.+)$/);
            if (l) {
                const bucket = l[1].trim();
                const roles = [...l[2].matchAll(/`([a-z0-9_]+)`/g)].map(m => m[1]);
                if (roles.length) current.levels[bucket] = roles;
            }
        }
        return ladders;
    }

    // Build a level-flow sankey from parsed ladders. Nodes are career
    // levels; a link Engineer → Senior Engineer with value 3 means a domain
    // contributes 3 Senior roles reachable from its Engineer rung. Link
    // weight = role count at the TARGET level, so node throughput mirrors
    // how many roles exist at each rung. Product Owner branches off Senior
    // Engineer; Reliability Engineer branches off Engineer; every ladder
    // role is represented in exactly one link value (or as a source-only
    // entry node), so nothing silently disappears (#46 lesson).
    const SANKEY_MAIN_LINE = [
        'Engineer', 'Senior Engineer', 'Architect', 'Lead/Principal',
        'Chapter Lead', 'Area Lead', 'Executive',
    ];
    const SANKEY_BRANCHES = {
        'Reliability Engineer': 'Engineer',
        'Product Owner':        'Senior Engineer',
    };

    function buildCareerSankey(ladders) {
        const linkMap = new Map(); // "src|tgt" → { value, domains: [] }
        const nodeSet = new Set();

        function addLink(source, target, value, domain) {
            const key = `${source}|${target}`;
            if (!linkMap.has(key)) linkMap.set(key, { source, target, value: 0, domains: [] });
            const l = linkMap.get(key);
            l.value += value;
            l.domains.push(`${domain} (${value})`);
            nodeSet.add(source);
            nodeSet.add(target);
        }

        for (const { domain, levels } of ladders) {
            const present = SANKEY_MAIN_LINE.filter(b => levels[b]);
            for (let i = 1; i < present.length; i++) {
                addLink(present[i - 1], present[i], levels[present[i]].length, domain);
            }
            if (present.length === 1) nodeSet.add(present[0]); // entry-only rung (e.g. C-Suite Executive)
            for (const [branch, from] of Object.entries(SANKEY_BRANCHES)) {
                if (levels[branch] && levels[from]) {
                    addLink(from, branch, levels[branch].length, domain);
                }
            }
        }

        const order = [...SANKEY_MAIN_LINE, ...Object.keys(SANKEY_BRANCHES)];
        return {
            nodes: order.filter(n => nodeSet.has(n)).map(name => ({ name })),
            links: [...linkMap.values()],
        };
    }

    // Parse the cross-domain mobility bullet list from SKILLS_PROGRESSION.md
    // into [{ path, description }] for display alongside the sankey.
    function parseMobilityPaths(markdown) {
        const section = String(markdown).split('## Cross-domain mobility paths')[1];
        if (!section) return [];
        const out = [];
        for (const line of section.split(/\r?\n/)) {
            const m = line.match(/^-\s+\*\*(.+?)\*\*\s*(?:\((.*?)\))?\s*—\s*(.+)$/);
            if (m) out.push({ path: m[1].trim(), description: m[3].trim() });
        }
        return out;
    }

    // Map each domain label to its chapter label (for graph node
    // categories). Labels not covered by any chapter map to null.
    function labelToChapter(domains, chapters) {
        const map = {};
        for (const chapter of Object.values(chapters)) {
            for (const key of chapter.domains) {
                if (domains[key]) map[domains[key].label] = chapter.label;
            }
        }
        return map;
    }

    // Build the org-chart tree: leadership line (CEO → C-suite/SVP →
    // PAL/TAL → chapters) on top of the Chapters → Domains → Roles
    // hierarchy. Pure data in, nested { name, kind, file?, count?,
    // children? } out — the renderer decides how to draw it.
    //
    // Invariant: every role in `domains` appears exactly once — either as a
    // node on the leadership line, a chapter-lead attachment, or a leaf
    // under its domain. Roles must never be silently dropped (#46 lesson).
    function buildOrgTree(domains, chapters) {
        const allRoles = Object.entries(domains).flatMap(([key, d]) =>
            d.roles.map(r => ({ ...r, domainKey: key, domainLabel: d.label })));
        const used = new Set();
        const take = pred => {
            const hit = allRoles.find(r => !used.has(r.file) && pred(r));
            if (hit) used.add(hit.file);
            return hit || null;
        };
        const roleNode = (r, kind = 'role') =>
            ({ name: r.title, kind, file: r.file, roleLevel: r.level });

        // Leadership line
        const ceo  = take(r => r.level === 'CEO');
        const svp  = take(r => r.level === 'SVP');
        const suite = ['CTO', 'CIO', 'CFO', 'CISO']
            .map(lvl => take(r => r.level === lvl)).filter(Boolean);
        const areaLeads = [];
        for (;;) {
            const lead = take(r => r.level === 'Product Area Lead' || r.level === 'Technical Area Lead');
            if (!lead) break;
            areaLeads.push(lead);
        }

        // Chapter nodes (the Leadership chapter IS the line above — skip any
        // chapter whose domains are all consumed by leadership placement).
        const chapterNodes = Object.entries(chapters)
            .filter(([, ch]) => ch.domains.some(d => domains[d] && !['c_suite', 'leadership'].includes(d)))
            .map(([key, ch]) => {
                const lead = ch.leadFile
                    ? take(r => r.file === ch.leadFile || r.file.replace(/\\/g, '/') === ch.leadFile)
                    : null;
                const domainNodes = ch.domains
                    .filter(d => domains[d] && !['c_suite', 'leadership'].includes(d))
                    .map(d => ({
                        name: domains[d].label,
                        kind: 'domain',
                        count: domains[d].roles.length,
                        children: domains[d].roles.map(r => {
                            used.add(r.file);
                            return roleNode(r);
                        }),
                    }));
                return {
                    name: ch.label,
                    kind: 'chapter',
                    file: lead ? lead.file : null,
                    leadTitle: lead ? lead.title : null,
                    count: domainNodes.reduce((n, d) => n + d.count, 0),
                    children: domainNodes,
                };
            });

        // Anything not yet placed (e.g. cross-cutting leadership roles)
        const leftovers = allRoles.filter(r => !used.has(r.file));
        const crossCutting = leftovers.length
            ? [{
                name: 'Cross-cutting Leadership',
                kind: 'group',
                count: leftovers.length,
                children: leftovers.map(r => roleNode(r)),
            }]
            : [];

        const svpNode = svp
            ? { ...roleNode(svp, 'exec'), children: [...areaLeads.map(r => roleNode(r, 'lead')), ...crossCutting, ...chapterNodes] }
            : null;

        const rootChildren = [
            ...suite.map(r => roleNode(r, 'exec')),
            ...(svpNode ? [svpNode] : [...areaLeads.map(r => roleNode(r, 'lead')), ...crossCutting, ...chapterNodes]),
        ];

        return ceo
            ? { ...roleNode(ceo, 'exec'), children: rootChildren }
            : { name: 'IT Organisation', kind: 'group', children: rootChildren };
    }

    // Resolve a Markdown link href relative to the file it appears in.
    // Repo-absolute hrefs (Roles/…, docs/…) pass through unchanged.
    function resolveDocHref(href, baseFile = '') {
        href = href.replace(/^\.\//, '');
        if (href.startsWith('Roles/') || href.startsWith('docs/')) return href;
        const baseDir = baseFile.includes('/') ? baseFile.slice(0, baseFile.lastIndexOf('/')) : '';
        const stack   = baseDir ? baseDir.split('/') : [];
        for (const seg of href.split('/')) {
            if (seg === '' || seg === '.') continue;
            if (seg === '..') stack.pop();
            else stack.push(seg);
        }
        return stack.join('/');
    }

    return {
        STALE_MONTHS,
        REFERENCE_DOC_PATTERN,
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
        resolveDocHref,
    };
});
