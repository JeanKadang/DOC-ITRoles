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
        LEVEL_ORDER,
        LEVEL_SHORT,
        escapeHtml,
        badgeClass,
        monthsSinceReview,
        computeStaleRoles,
        rolesPerLevel,
        rolesPerChapter,
        resolveDocHref,
    };
});
