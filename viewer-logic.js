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

    // Review slot for a role, 0..span-1, derived from its path (#124).
    //
    // 206 of 222 roles carry an identical 2026-03 stamp, so at a flat
    // threshold every one turns stale in the same month and the panel jumps
    // from near-empty to 93% of the catalog — at which point it stops being a
    // work queue. Git cannot supply real review history to stagger from: the
    // repository is younger than the stamps it holds, so every file traces
    // back to one seeding commit. Rather than invent per-role review dates
    // that never happened, the *schedule* is spread and the recorded dates
    // stay truthful.
    //
    // FNV-1a: small, stable across runs and platforms, and good enough to
    // spread paths evenly — a test asserts the real catalog lands in every
    // month with no month taking a disproportionate share.
    function reviewSlotFor(file, span = 12) {
        if (span <= 1) return 0;
        let h = 0x811c9dc5;
        const s = String(file == null ? '' : file);
        for (let i = 0; i < s.length; i++) {
            h ^= s.charCodeAt(i);
            h = Math.imul(h, 0x01000193) >>> 0;
        }
        return h % span;
    }

    // Roles with no review date or one at least staleMonths old, sorted
    // most-overdue first (never-reviewed roles sort to the top).
    //
    // `stagger` spreads the due date across that many months using the role's
    // slot, so reviews arrive as a steady queue instead of one cliff. A
    // missing date is never deferred — that is a real gap, not a slot.
    function computeStaleRoles(domains, staleMonths = STALE_MONTHS, now = new Date(), { stagger = 0 } = {}) {
        const stale = [];
        for (const domain of Object.values(domains)) {
            for (const role of domain.roles) {
                const monthsSince = monthsSinceReview(role.lastReviewed, now);
                const threshold = monthsSince === null || stagger <= 0
                    ? staleMonths
                    : staleMonths + reviewSlotFor(role.file, stagger);
                if (monthsSince === null || monthsSince >= threshold) {
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
    // Engineer; every ladder role is represented in exactly one link value
    // (or as a source-only entry node), so nothing silently disappears
    // (#46 lesson).
    const SANKEY_MAIN_LINE = [
        'Engineer', 'Senior Engineer', 'Architect', 'Lead/Principal',
        'Chapter Lead', 'Area Lead', 'Executive',
    ];
    const SANKEY_BRANCHES = {
        'Product Owner': 'Senior Engineer',
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
        const suite = ['CTO', 'CIO', 'CFO']
            .map(lvl => take(r => r.level === lvl)).filter(Boolean);
        // The CISO is placed separately from the flat C-suite: it owns the
        // security-governance line (the Security & Identity chapter) per the
        // CISO role content, rather than dangling as a childless leaf (#71).
        const ciso = take(r => r.level === 'CISO');
        const areaLeads = [];
        for (;;) {
            const lead = take(r => r.level === 'Product Area Lead' || r.level === 'Technical Area Lead');
            if (!lead) break;
            areaLeads.push(lead);
        }

        // Chapter nodes, kept keyed so the security chapter can be re-parented
        // under the CISO. (The Leadership chapter IS the line above — skip any
        // chapter whose domains are all consumed by leadership placement.)
        const chapterEntries = Object.entries(chapters)
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
                return [key, {
                    name: ch.label,
                    kind: 'chapter',
                    file: lead ? lead.file : null,
                    leadTitle: lead ? lead.title : null,
                    count: domainNodes.reduce((n, d) => n + d.count, 0),
                    children: domainNodes,
                }];
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

        // The Security & Identity chapter attaches under the CISO (its
        // security-governance line, per the CISO content); every other chapter
        // sits under the SVP. When no CISO exists it stays under the SVP.
        const CISO_CHAPTER_KEY = 'security_identity';
        const attachSecurityToCiso = !!ciso && chapterEntries.some(([k]) => k === CISO_CHAPTER_KEY);
        const cisoNode = ciso
            ? (attachSecurityToCiso
                ? { ...roleNode(ciso, 'exec'), children: chapterEntries.filter(([k]) => k === CISO_CHAPTER_KEY).map(([, n]) => n) }
                : roleNode(ciso, 'exec'))
            : null;
        const svpChapterNodes = chapterEntries
            .filter(([k]) => !(attachSecurityToCiso && k === CISO_CHAPTER_KEY))
            .map(([, n]) => n);

        const svpNode = svp
            ? { ...roleNode(svp, 'exec'), children: [...areaLeads.map(r => roleNode(r, 'lead')), ...crossCutting, ...svpChapterNodes] }
            : null;

        const rootChildren = [
            ...suite.map(r => roleNode(r, 'exec')),
            ...(cisoNode ? [cisoNode] : []),
            ...(svpNode ? [svpNode] : [...areaLeads.map(r => roleNode(r, 'lead')), ...crossCutting, ...svpChapterNodes]),
        ];

        return ceo
            ? { ...roleNode(ceo, 'exec'), children: rootChildren }
            : { name: 'IT Organisation', kind: 'group', children: rootChildren };
    }

    // Parse a role file's "## Career Development Path" section into
    // { from: [...], to: [...] }. The catalog uses two heading variants
    // ("Previous Roles:" / "Potential Next Roles:" in 210 files,
    // "From (typical previous roles):" / "To (typical next roles):" in 6);
    // both are handled. Returns empty lists when the section is absent.
    function parseCareerPath(markdown) {
        const section = String(markdown).split(/^## Career Development Path\s*$/m)[1];
        const out = { from: [], to: [] };
        if (!section) return out;
        const body = section.split(/\r?\n## /)[0];
        let current = null;
        for (const line of body.split(/\r?\n/)) {
            const bold = line.match(/^\*\*(.+?):?\*\*/);
            if (bold) {
                const h = bold[1].toLowerCase();
                current = /previous|from \(/.test(h) ? 'from'
                        : /next|to \(/.test(h)       ? 'to'
                        : null;
                continue;
            }
            const item = current && line.match(/^-\s+(.+)$/);
            if (item) out[current].push(item[1].trim());
        }
        return out;
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

    // Role bodies carry 14 sections and open with all of them expanded, so
    // the reader parses ~9,000 characters to find the one they came for
    // (#112). Sections collapse by default; these two stay open because they
    // orient the reader — everything else is reference material they seek out
    // deliberately.
    //
    // Compared on a normalised key so the catalog's heading spelling variants
    // ("&" vs "and", with/without "& Qualifications") all match — see #121,
    // which removes those variants at source.
    const DEFAULT_OPEN_SECTIONS = ['Role Overview', 'Role Scope & Boundaries'];

    function sectionKey(heading) {
        return String(heading == null ? '' : heading)
            .toLowerCase()
            .replace(/\band\b/g, '&')
            .replace(/[^a-z0-9&]+/g, '');
    }

    function sectionStartsOpen(heading) {
        const key = sectionKey(heading);
        if (!key) return false;
        return DEFAULT_OPEN_SECTIONS.some(s => sectionKey(s) === key);
    }

    // Reduce a role name to a comparison key. Career-path and interaction
    // prose names roles the way English does — plural for a group
    // ("Security Engineers"), or with a parenthetical qualifier
    // ("Enterprise Architect (AI governance domain)") — while catalog H1
    // titles are singular and mostly unqualified. Exact matching misses
    // every one of those, leaving the reference as dead text (#120).
    //
    // Deliberately conservative: case, punctuation, a trailing
    // parenthetical, and a trailing plural only. No fuzzy or token-overlap
    // matching — a near-miss that resolves to the wrong role is worse than
    // one that stays unlinked.
    function roleTitleKey(name) {
        return String(name == null ? '' : name)
            .replace(/\s*\([^)]*\)\s*$/, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '')
            .replace(/s$/, '');
    }

    // Find the catalog role a prose name refers to, or null when the
    // catalog does not define it. Aspirational career exits ("Chief
    // Architect", "VP of Engineering") legitimately return null and must
    // stay unlinked.
    function findRoleByTitle(title, domains) {
        const want = roleTitleKey(title);
        if (!want) return null;
        for (const d of Object.values(domains || {})) {
            for (const r of (d.roles || [])) {
                if (roleTitleKey(r.title) === want) return { ...r, domainLabel: d.label };
            }
        }
        return null;
    }

    // The viewer has five mutually exclusive overlay panels (matrix, stale,
    // org, graph, careers). Each toggle used to hide the others by hand, so
    // the teardown existed in five copies — and when one copy learned to
    // restore the role grid on close, the other four did not, which is #129:
    // closing Org/Graph/Careers over an open role left a blank screen.
    //
    // Given the panel being requested (null = close everything), this returns
    // the complete desired state, so the caller applies one description
    // instead of maintaining five divergent ones (#119).
    function panelStateFor(requested, keys, { hasRole = false } = {}) {
        const panels = {};
        for (const key of keys) {
            const on = key === requested;
            panels[key] = { show: on, pressed: on };
        }
        return {
            active: requested || null,
            panels,
            // While a panel is open it owns the content area. When they all
            // close, an open role takes it back; otherwise the welcome screen.
            showRolesGrid: !requested && hasRole,
            showWelcome:   !requested && !hasRole,
        };
    }

    // Anchor id for a role section heading (#111). Built on sectionKey so the
    // catalog's heading spelling variants ("and" vs "&", see #121) produce the
    // same id — a jump link must not depend on which variant a file used.
    function tocIdFor(heading) {
        const slug = String(heading == null ? '' : heading)
            .toLowerCase()
            .replace(/\band\b/g, '&')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return 'sec-' + slug;
    }

    // Scroll-spy: index of the last section whose top has passed the scroll
    // line. Clamps to the first section rather than returning -1 when scrolled
    // above it (rubber-banding gives a negative scrollTop), so the nav always
    // has exactly one entry highlighted while sections exist.
    //
    // `atBottom` handles the end of the document: there the remaining sections
    // are all on screen and none of their tops can reach the scroll line, so
    // the plain rule sticks on whichever section last crossed it — jumping to
    // the final section would highlight the wrong chip.
    function activeTocIndex(tops, scrollTop, { atBottom = false } = {}) {
        if (!tops || !tops.length) return -1;
        if (atBottom) return tops.length - 1;
        let idx = 0;
        for (let i = 0; i < tops.length; i++) {
            if (tops[i] <= scrollTop) idx = i;
        }
        return idx;
    }

    // Read the metadata table that sits between the H1 and the first "## "
    // section. The viewer renders the body from that first heading onward, so
    // anything here is otherwise invisible — which is why Reports To and
    // Direct Reports never appeared in the UI at all despite being backfilled
    // across the whole catalog in #5 (see #113).
    //
    // Deliberately stops at the first section heading: a "Reports To" written
    // in prose further down is not metadata.
    function parseRoleMeta(markdown) {
        const text = String(markdown == null ? '' : markdown).replace(/\r\n/g, '\n');
        const end  = text.indexOf('\n## ');
        const head = end === -1 ? text : text.slice(0, end);
        const field = label => {
            const m = head.match(new RegExp('\\|\\s*\\*\\*' + label + ':?\\*\\*\\s*\\|\\s*([^|]*?)\\s*\\|'));
            const v = m && m[1].trim();
            return v ? v : null;
        };
        return {
            domain:        field('Domain'),
            chapter:       field('Chapter'),
            level:         field('Role Level'),
            reportsTo:     field('Reports To'),
            directReports: field('Direct Reports'),
            lastReviewed:  field('Last Reviewed'),
        };
    }

    // Split a Reports To / Direct Reports value into the part worth showing
    // and the qualifier behind it. 34% of these values run past 60 characters
    // (longest is 241) because they explain the arrangement inline — "None
    // (sets technical direction and mentors …; formal line management sits
    // with the Chapter Lead)". Rendering that whole string as a chip is
    // unreadable, so the lead-in shows and the rest becomes a tooltip (#113).
    function splitReportingValue(value) {
        const v = String(value == null ? '' : value).trim();
        if (!v) return { head: '', detail: '' };
        const paren = v.match(/^([^(]+?)\s*\((.+)\)\s*$/);
        if (paren) return { head: paren[1].trim(), detail: paren[2].trim() };
        const semi = v.indexOf(';');
        if (semi > -1) return { head: v.slice(0, semi).trim(), detail: v.slice(semi + 1).trim() };
        return { head: v, detail: '' };
    }

    // Executive levels, named once. #18 and #46 were both a hand-maintained
    // level list that someone forgot to extend when CFO arrived, and #141 was
    // a third: the Executives tile summed CEO+CTO+CIO+SVP+CISO and silently
    // reported 5 of 6. A test asserts this covers the executive levels.
    const EXEC_LEVELS = ['CEO', 'CTO', 'CIO', 'CFO', 'SVP', 'CISO'];

    // The welcome tiles, as data rather than eleven hand-written expressions.
    // Every canonical level must appear in exactly one group or the tiles stop
    // summing to the catalogue — also asserted by a test.
    const STAT_GROUPS = [
        { label: 'Executives',            levels: EXEC_LEVELS,                                 cls: 'accent-lead' },
        { label: 'Chapter Leads',         levels: ['Chapter Lead'],                            cls: 'accent-ch'   },
        { label: 'TAL / PAL',             levels: ['Technical Area Lead', 'Product Area Lead'], cls: 'accent-lead' },
        { label: 'Lead & Principal Arch', levels: ['Lead Architect', 'Principal Architect'],   cls: 'accent-arch' },
        { label: 'Architects',            levels: ['Architect'],                               cls: 'accent-arch' },
        { label: 'Senior Engineers',      levels: ['Senior Engineer'],                         cls: 'accent-lead' },
        { label: 'Product Owners',        levels: ['Product Owner'],                           cls: 'accent-eng'  },
        { label: 'Engineers',             levels: ['Engineer'],                                cls: 'accent-eng'  },
    ];

    function countRolesAtLevels(domains, levels) {
        const want = new Set(levels || []);
        if (!want.size) return 0;
        let n = 0;
        for (const d of Object.values(domains || {})) {
            for (const r of (d.roles || [])) if (want.has(r.level)) n++;
        }
        return n;
    }

    // Does a role survive the sidebar's combined text + level filter (#114,
    // #115)? An empty query or empty level set means "no constraint", so both
    // can be applied independently or together.
    function roleMatchesFilter(role, { domainLabel = '', chapterLabel = '' } = {}, { q = '', levels = [] } = {}) {
        if (levels.length && !levels.includes(role.level)) return false;
        const needle = String(q || '').trim().toLowerCase();
        if (!needle) return true;
        return String(role.title).toLowerCase().includes(needle)
            || String(domainLabel).toLowerCase().includes(needle)
            || String(chapterLabel).toLowerCase().includes(needle);
    }

    // Bucket sidebar resources by their declared group, preserving the order
    // the groups are declared in (#144). Empty groups are dropped; an item
    // with no group falls into the first one rather than disappearing, since
    // a resource silently missing from the sidebar is not noticed until
    // somebody goes looking for it.
    function groupResources(items, groups) {
        const first = groups[0] && groups[0].key;
        return groups
            .map(g => ({
                key: g.key,
                label: g.label,
                items: (items || []).filter(i => (i.group || first) === g.key),
            }))
            .filter(g => g.items.length);
    }

    return {
        STALE_MONTHS,
        groupResources,
        EXEC_LEVELS,
        STAT_GROUPS,
        countRolesAtLevels,
        roleMatchesFilter,
        REFERENCE_DOC_PATTERN,
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
        tocIdFor,
        activeTocIndex,
    };
});
