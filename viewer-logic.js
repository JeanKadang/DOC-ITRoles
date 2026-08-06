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

    // Prepend a role to the recently-viewed list (#117): newest first, no
    // duplicates, hard cap. Navigation history is a single linear Back stack,
    // so returning to a role seen a few minutes ago otherwise means finding it
    // again — and the Compare feature actively encourages visiting several in
    // sequence.
    //
    // Defensive about the incoming list: it comes from localStorage, which is
    // user-writable and survives across versions, so it cannot be trusted to
    // still be the shape we wrote. Only the four fields the list renders are
    // kept, so a stale title or level cannot outlive a catalogue edit by more
    // than one visit.
    // Passing a null entry sanitises the list without adding to it, which is
    // how stored history is cleaned on load. The sanitising must happen on
    // that path too — returning the raw list let a stored null through and
    // crashed the renderer on r.file.
    function pushRecent(list, entry, max = 10) {
        const keep = r => r && typeof r === 'object' && r.file
            ? { file: r.file, title: r.title || '', level: r.level || '', domainLabel: r.domainLabel || '' }
            : null;
        const kept  = keep(entry);
        const prior = (Array.isArray(list) ? list : [])
            .map(keep)
            .filter(r => r && (!kept || r.file !== kept.file));
        return (kept ? [kept, ...prior] : prior).slice(0, max);
    }

    // The accessible text fallbacks behind the Org and Graph charts (#118) —
    // the "View as list" content a screen-reader user gets instead of an
    // ECharts canvas. Pure string builders, extracted here so they are
    // covered: a regression in them is invisible to sighted testing.

    // Recursive nested list for the org tree. A node carrying a file is a
    // role and becomes keyboard-operable; a node without one is a structural
    // heading and must not claim to be a button.
    function orgListHtml(node) {
        const label = node.file
            ? `<span data-file="${escapeHtml(node.file)}" role="button" tabindex="0">${escapeHtml(node.name)}</span>`
            : `<span class="org-node-label">${escapeHtml(node.name)}</span>`;
        // Only chapter nodes carry leadTitle, and buildOrgTree sets it from
        // the same lead object as `file` — so in practice the two are always
        // present together and the first branch never fires. Kept as written
        // rather than simplified: this is an extraction, and collapsing a
        // condition is a behaviour change dressed as tidying.
        const meta = node.leadTitle && !node.file ? '' :
            node.leadTitle ? ` — lead: ${escapeHtml(node.leadTitle)}` : '';
        const kids = (node.children || []).map(c => orgListHtml(c)).join('');
        return `<ul><li>${label}${meta}${kids ? kids : ''}</li></ul>`;
    }

    // Flat list of graph nodes, each with its relationships. Edges are
    // undirected here on purpose: the reader may arrive at either end, so
    // each edge is described under both nodes.
    function graphListHtml(graph, chapterOf) {
        const byNode = graph.nodes.map(n => {
            const rels = graph.links
                .filter(l => l.source === n.name || l.target === n.name)
                .map(l => {
                    const other = l.source === n.name ? l.target : l.source;
                    return `<li>${l.kind === 'collaborates' ? 'Collaborates with' : 'Consulted relationship with'} <b>${escapeHtml(other)}</b>: ${escapeHtml(l.labels.join('; '))}</li>`;
                }).join('');
            const notes = (n.notes || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');
            const chapter = n.kind === 'external' ? 'External party' : ((chapterOf || {})[n.name] || 'Other');
            return `<li><span class="org-node-label">${escapeHtml(n.name)}</span> — ${escapeHtml(chapter)}<ul>${rels}${notes}</ul></li>`;
        }).join('');
        return `<ul>${byNode}</ul>`;
    }

    // Convert a bullet KPI into a | Metric | Target | Frequency | row (#140).
    //
    // The metric text is kept **verbatim** — a target already stated in the
    // prose is surfaced into its own column as well, rather than being cut
    // out of the sentence. Slight redundancy on the ~97 rows that have one is
    // a fair price for guaranteeing nothing is lost in a 1,791-row rewrite.
    //
    // A missing target or cadence becomes an em dash, not an empty cell: the
    // gap is the point. Two thirds of these KPIs name a subject rather than a
    // measure, and the row should say so plainly.
    function parseKpiBullet(text) {
        const raw = String(text == null ? '' : text).trim();

        // Only forms actually used in the catalogue. Deliberately excludes a
        // bare number, so "ISO 27001" and "the 2026 standard" are not read as
        // targets.
        const target = raw.match(/[≥≤<>]\s*\d+(?:\.\d+)?\s*(?:%|hours?|hrs?|days?|weeks?|months?|minutes?|mins?|business days?)?|\b\d+(?:\.\d+)?\s*%/);

        const cadence = raw.match(/\b(daily|weekly|monthly|quarterly|annual(?:ly)?|per sprint)\b/i);
        const FREQ = { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly',
                       quarterly: 'Quarterly', annual: 'Annual', annually: 'Annual',
                       'per sprint': 'Per sprint' };

        return {
            // A pipe would silently split the cell and shift every column.
            metric:    raw.replace(/\|/g, '\\|'),
            target:    target ? target[0].replace(/\s+/g, ' ').trim() : '—',
            frequency: cadence ? FREQ[cadence[0].toLowerCase()] : '—',
        };
    }

    // Industry benchmarks for the metric families that genuinely have one
    // (#140). Seeding these turns 315 blank rows into a reviewable starting
    // point — correcting a draft is far easier than filling a blank.
    //
    // Every value carries "(proposed)" so it travels with the number if a row
    // is copied, and the validator counts proposals apart from real gaps. An
    // unmarked invented target would end up cited in a performance
    // conversation as though it had been agreed.
    //
    // Adoption rate and incident rate are deliberately absent: widely
    // measured, but with no established value to propose. A family with no
    // real benchmark gets no seed.
    const KPI_BENCHMARKS = [
        { re: /\bchange failure\b/i,                                    target: '≤15%',             frequency: 'Monthly',   note: 'DORA' },
        { re: /\bdeployment frequency\b/i,                              target: 'Weekly or better', frequency: 'Monthly',   note: 'DORA high performer' },
        // Ahead of the MTTR rule: for a vulnerability, "time to remediate" is
        // governed by the remediation policy, not the P1 restore commitment.
        { re: /\bvulnerab\w*\b[^|]*\b(remediat|resolv|closure)/i,       target: '≤30 days (critical)', frequency: 'Monthly', note: 'common remediation policy' },
        { re: /\b(mttr|mean time to (restore|repair|resolve|recover)\w*|time to restore)\b/i,
                                                                        target: '≤4 hours',         frequency: 'Monthly',   note: 'common P1 restore commitment' },
        { re: /\b(mttd|mean time to detect\w*|time to detect)\b/i,      target: '≤24 hours',        frequency: 'Monthly',   note: 'common detection target' },
        { re: /\b(test|code)\s+coverage\b/i,                            target: '≥80%',             frequency: 'Monthly',   note: 'widely-used threshold' },
        { re: /\b(backup|recovery|restore)\b[^|]*\b(success|rate|test)/i, target: '≥99%',           frequency: 'Monthly',   note: 'standard data-protection target' },
        { re: /\bfirst[- ]contact\b/i,                                  target: '≥70%',             frequency: 'Monthly',   note: 'common service-desk target' },
        { re: /\b(patch|compliance)\b[^|]*\b(coverage|complian)/i,      target: '≥95%',             frequency: 'Monthly',   note: 'common security baseline' },
        { re: /\bSLA\b/,                                                target: '≥95%',             frequency: 'Monthly',   note: 'typical service commitment' },
        { re: /\b(csat|satisfaction|nps)\b/i,                           target: '≥85%',             frequency: 'Quarterly', note: 'common enterprise IT service target' },
        // Anchored to the noun so "documentation available to teams" does not
        // match — only uptime/availability used as the metric itself.
        { re: /\b(uptime|availability)\b(?!\s+(to|for|of\s+(the\s+)?(team|staff|stakeholder)))/i,
                                                                        target: '≥99.9%',           frequency: 'Monthly',   note: 'three-nines enterprise SLA' },
    ];

    // A metric that asks only for a direction of travel has no threshold to
    // propose. Every pattern here comes from a real row that a benchmark
    // keyword matched in a sense the benchmark does not cover.
    const KPI_UNSEEDABLE = [
        /\btrend\w*\b/i,
        /\bimprovement\w*\b|\bimprovements? in\b/i,
        /\betc\.?\b/i,
    ];

    // Counting measure nouns rather than commas. A list inside a metric is
    // usually scope, not measures — "Microsoft 365 service availability
    // (Exchange, Teams, SharePoint)" is one measure across three products,
    // whereas "incident frequency, severity, and mean time to detect" is
    // three measures in one row and has no single target.
    const KPI_MEASURE_NOUN = /\b(frequency|severity|rate|time|uptime|availability|reliability|coverage|utilisation|utilization|latency|throughput|cost|accuracy|volume|score)\b/i;

    function kpiMeasureCount(m) {
        return m.split(/,|\band\b/i).filter(seg => KPI_MEASURE_NOUN.test(seg)).length;
    }

    // The unit the metric is counted in. Seeding "≥99.9%" against a lead time
    // measured in hours is not a weaker proposal but a wrong one, and a wrong
    // proposal hides the gap better than a blank does — the validator counts
    // it as awaiting confirmation rather than as an error.
    function kpiMetricUnit(m) {
        if (/^\s*number of\b/i.test(m) || /\(count\b/i.test(m)) return 'count';
        if (/\((hours?|days?|minutes?|seconds?|ms)\)/i.test(m)
            || /\b(lead time|turnaround|mean time|time to)\b/i.test(m)) return 'duration';
        if (/\(%\)|\bpercentage\b|\brate\b|\bscore\b/i.test(m)) return 'percent';
        return null;
    }

    function kpiTargetUnit(t) {
        if (/%/.test(t)) return 'percent';
        if (/\b(hours?|days?|minutes?|seconds?)\b/i.test(t)) return 'duration';
        return null;
    }

    function proposedKpiTarget(metric) {
        const m = String(metric == null ? '' : metric);
        if (KPI_UNSEEDABLE.some(re => re.test(m))) return null;
        if (kpiMeasureCount(m) >= 3) return null;
        const mUnit = kpiMetricUnit(m);
        for (const b of KPI_BENCHMARKS) {
            if (!b.re.test(m)) continue;
            const tUnit = kpiTargetUnit(b.target);
            if (mUnit && tUnit && mUnit !== tUnit) return null;
            return { target: `${b.target} (proposed)`, frequency: b.frequency, note: b.note };
        }
        return null;
    }

    return {
        STALE_MONTHS,
        proposedKpiTarget,
        KPI_BENCHMARKS,
        parseKpiBullet,
        orgListHtml,
        graphListHtml,
        pushRecent,
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
