const http = require('http');
const fs   = require('fs');
const path = require('path');
const { resolveLevel, parseMeta, REFERENCE_DOC_PATTERN } = require('./roleMeta');
const { DOMAIN_LIST, resolveDomainId } = require('./catalogueConfig');

const PORT      = process.env.PORT || 3000;
const ROOT      = __dirname;
const ROLES_DIR = path.join(ROOT, 'Roles');
const VENDOR_DIR = path.join(ROOT, 'vendor');

// Cache getRoles() results, invalidated whenever any directory or file under
// Roles/ has a newer mtime than what was last seen (covers edits, adds, and
// removes -- a deletion changes its parent directory's mtime). Avoids a full
// readdir+readFile+parse pass of every role file on every /api/roles hit.
let rolesCache = { signature: -1, domains: null };

function rolesTreeSignature() {
  let latest = fs.statSync(ROLES_DIR).mtimeMs;
  for (const entry of fs.readdirSync(ROLES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const domainPath = path.join(ROLES_DIR, entry.name);
    latest = Math.max(latest, fs.statSync(domainPath).mtimeMs);
    for (const file of fs.readdirSync(domainPath)) {
      latest = Math.max(latest, fs.statSync(path.join(domainPath, file)).mtimeMs);
    }
  }
  return latest;
}

function assertConfiguredRoleFolders() {
  const actualFolders = fs.readdirSync(ROLES_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  const actualSet = new Set(actualFolders);

  for (const folder of actualFolders) {
    const canonicalId = resolveDomainId(folder);
    if (!canonicalId) throw new Error(`Unconfigured role folder: ${folder}`);
    if (folder !== canonicalId) {
      throw new Error(`Role folder casing drift: expected ${canonicalId}, found ${folder}`);
    }
  }
  for (const domain of DOMAIN_LIST) {
    if (!actualSet.has(domain.id)) {
      throw new Error(`Configured role folder is missing: ${domain.id}`);
    }
  }
}

function getRoles() {
  const signature = rolesTreeSignature();
  if (rolesCache.domains && rolesCache.signature === signature) {
    return rolesCache.domains;
  }

  const domains = {};

  assertConfiguredRoleFolders();

  for (const domainConfig of DOMAIN_LIST) {
    const domainId = domainConfig.id;
    const domainPath = path.join(ROLES_DIR, domainId);
    const allMd = fs.readdirSync(domainPath)
      .filter(f => f.endsWith('.md') && f !== 'README.md')
      .sort();
    const files    = allMd.filter(f => !REFERENCE_DOC_PATTERN.test(f));
    const refFiles = allMd.filter(f => REFERENCE_DOC_PATTERN.test(f));

    if (files.length === 0 && refFiles.length === 0) continue;

    const roles = files.map(file => {
      const content = fs.readFileSync(path.join(domainPath, file), 'utf8');
      const meta  = parseMeta(content);
      const title = meta.title || file.replace(/_/g, ' ').replace('.md', '');

      return {
        name:         file.replace('.md', ''),
        file:         `Roles/${domainId}/${file}`,
        title,
        level:        resolveLevel(content, file),
        lastReviewed: meta.lastReviewed,
      };
    });

    // Reference/standards documents (e.g. *_standards.md) are listed
    // separately: they are reachable in the viewer but never counted as
    // roles, never levelled, and never stale-tracked (#23, #29).
    const references = refFiles.map(file => {
      const content = fs.readFileSync(path.join(domainPath, file), 'utf8');
      const meta = parseMeta(content);
      return {
        name:  file.replace('.md', ''),
        file:  `Roles/${domainId}/${file}`,
        title: meta.title || file.replace(/_/g, ' ').replace('.md', ''),
      };
    });

    domains[domainId] = {
      label: domainConfig.label,
      roles,
      references,
    };
  }

  rolesCache = { signature, domains };
  return domains;
}

// Full-text search index over role bodies (#68). Built lazily and cached
// against the same mtime signature as getRoles(), so a role edit is picked
// up without a restart. Reference/standards docs are excluded — they are
// reachable via their own listing, not the role search.
let searchCache = { signature: -1, entries: null };

function getSearchIndex() {
  const signature = rolesTreeSignature();
  if (searchCache.entries && searchCache.signature === signature) return searchCache.entries;

  const entries = [];
  assertConfiguredRoleFolders();
  for (const domainConfig of DOMAIN_LIST) {
    const domainPath = path.join(ROLES_DIR, domainConfig.id);
    const label = domainConfig.label;
    for (const file of fs.readdirSync(domainPath)) {
      if (!file.endsWith('.md') || file === 'README.md' || REFERENCE_DOC_PATTERN.test(file)) continue;
      const content = fs.readFileSync(path.join(domainPath, file), 'utf8');
      const meta = parseMeta(content);
      entries.push({
        file:        `Roles/${domainConfig.id}/${file}`,
        title:       meta.title || file.replace(/_/g, ' ').replace('.md', ''),
        level:       resolveLevel(content, file),
        domainLabel: label,
        text:        content,
      });
    }
  }
  searchCache = { signature, entries };
  return entries;
}

function preferredSearchMatchIndex(text, query) {
  const source = String(text == null ? '' : text);
  const q = String(query == null ? '' : query).toLowerCase();
  if (!q) return -1;

  const lower = source.toLowerCase();
  const first = lower.indexOf(q);
  if (first === -1) return -1;

  const narrativeStart = source.search(/^##\s+/m);
  if (narrativeStart !== -1) {
    const narrative = lower.indexOf(q, narrativeStart);
    if (narrative !== -1) return narrative;
  }
  return first;
}

// A ~100-char excerpt of `text` centred on the first match of the query.
// Whitespace (incl. markdown table pipes/newlines) is collapsed to one
// space; the raw excerpt is HTML-escaped by the client before rendering.
function makeSnippet(text, idx, qlen, radius = 50) {
  const start = Math.max(0, idx - radius);
  const end   = Math.min(text.length, idx + qlen + radius);
  let s = text.slice(start, end).replace(/[|#*`]/g, ' ').replace(/\s+/g, ' ').trim();
  if (start > 0)          s = '… ' + s;
  if (end < text.length)  s = s + ' …';
  return s;
}

// Roles whose title or body contains the query. Title matches sort first,
// then alphabetically. Query shorter than 2 chars returns nothing.
function searchRoles(query) {
  const q = String(query).trim().replace(/\s+/g, ' ').toLowerCase();
  if (q.length < 2) return [];
  const matches = [];
  for (const e of getSearchIndex()) {
    const inTitle = e.title.toLowerCase().includes(q);
    const bodyIdx = preferredSearchMatchIndex(e.text, q);
    if (!inTitle && bodyIdx === -1) continue;
    matches.push({
      file:    e.file,
      title:   e.title,
      level:   e.level,
      domain:  e.domainLabel,
      inTitle,
      snippet: bodyIdx === -1 ? '' : makeSnippet(e.text, bodyIdx, q.length),
    });
  }
  matches.sort((a, b) => (Number(b.inTitle) - Number(a.inTitle)) || a.title.localeCompare(b.title));
  return matches;
}

// Content Security Policy: this app is a single-origin SPA with inline
// <script>/<style> and inline onclick handlers, so 'unsafe-inline' is required
// for script-src/style-src. Everything else is locked to same-origin, and no
// external network origins (CDNs, frames, forms) are permitted.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "frame-ancestors 'none'",
].join('; ');

function send(res, status, contentType, body) {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': CSP,
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Serve the SPA
  if (url.pathname === '/' || url.pathname === '/index.html') {
    try {
      send(res, 200, 'text/html; charset=utf-8', fs.readFileSync(path.join(ROOT, 'index.html')));
    } catch {
      send(res, 500, 'text/plain', 'index.html not found');
    }
    return;
  }

  // Serve the shared pure view-logic module (also consumed by node:test)
  if (url.pathname === '/viewer-logic.js') {
    try {
      send(res, 200, 'text/javascript; charset=utf-8', fs.readFileSync(path.join(ROOT, 'viewer-logic.js')));
    } catch {
      send(res, 404, 'text/plain', 'Asset not found');
    }
    return;
  }

  // Serve the shared catalogue configuration to the browser.
  if (url.pathname === '/catalogueConfig.js') {
    try {
      send(res, 200, 'text/javascript; charset=utf-8', fs.readFileSync(path.join(ROOT, 'catalogueConfig.js')));
    } catch {
      send(res, 404, 'text/plain', 'Asset not found');
    }
    return;
  }

  // Serve vendored third-party assets (e.g. marked.min.js) — no CDN dependency
  if (url.pathname.startsWith('/vendor/')) {
    const rel = url.pathname.slice('/vendor/'.length);
    if (!rel || rel.includes('..')) {
      send(res, 400, 'text/plain', 'Invalid asset path');
      return;
    }
    const resolved = path.resolve(VENDOR_DIR, rel);
    if (!resolved.startsWith(VENDOR_DIR + path.sep)) {
      send(res, 403, 'text/plain', 'Forbidden');
      return;
    }
    try {
      const type = resolved.endsWith('.js') ? 'text/javascript; charset=utf-8' : 'application/octet-stream';
      send(res, 200, type, fs.readFileSync(resolved));
    } catch {
      send(res, 404, 'text/plain', 'Asset not found');
    }
    return;
  }

  // Return all roles grouped by domain
  if (url.pathname === '/api/roles') {
    try {
      send(res, 200, 'application/json', JSON.stringify(getRoles()));
    } catch (e) {
      send(res, 500, 'application/json', JSON.stringify({ error: e.message }));
    }
    return;
  }

  // Full-text search across role bodies (#68)
  if (url.pathname === '/api/search') {
    try {
      const q = url.searchParams.get('q') || '';
      send(res, 200, 'application/json', JSON.stringify({ query: q.trim(), matches: searchRoles(q).slice(0, 50) }));
    } catch (e) {
      send(res, 500, 'application/json', JSON.stringify({ error: e.message }));
    }
    return;
  }

  // Return raw markdown for a single role
  if (url.pathname === '/api/role') {
    const file = url.searchParams.get('file') || '';

    // Path traversal protection
    if (!file.startsWith('Roles/') || file.includes('..') || !file.endsWith('.md')) {
      send(res, 400, 'text/plain', 'Invalid file path');
      return;
    }
    const resolved = path.resolve(ROOT, file);
    if (!resolved.startsWith(ROLES_DIR + path.sep) && !resolved.startsWith(ROLES_DIR + '/')) {
      send(res, 403, 'text/plain', 'Forbidden');
      return;
    }
    try {
      send(res, 200, 'text/plain; charset=utf-8', fs.readFileSync(resolved, 'utf8'));
    } catch {
      send(res, 404, 'text/plain', 'Role not found');
    }
    return;
  }

  // Return raw markdown for a reference doc
  if (url.pathname === '/api/doc') {
    const DOCS_DIR = path.join(ROOT, 'docs');
    const file = url.searchParams.get('file') || '';
    if (!file.startsWith('docs/') || file.includes('..') || !file.endsWith('.md')) {
      send(res, 400, 'text/plain', 'Invalid file path');
      return;
    }
    const resolved = path.resolve(ROOT, file);
    if (!resolved.startsWith(DOCS_DIR + path.sep) && !resolved.startsWith(DOCS_DIR + '/')) {
      send(res, 403, 'text/plain', 'Forbidden');
      return;
    }
    try {
      send(res, 200, 'text/plain; charset=utf-8', fs.readFileSync(resolved, 'utf8'));
    } catch {
      send(res, 404, 'text/plain', 'Doc not found');
    }
    return;
  }

  send(res, 404, 'text/plain', 'Not found');
});

// Only bind a port when run directly (`node server.js`). When required from
// tests, the caller controls listen()/close() on an ephemeral port instead.
if (require.main === module) {
  server.listen(PORT, '127.0.0.1', () => {
    const W   = 42;
    const hr  = '═'.repeat(W);
    const row = s => `║  ${s.padEnd(W - 2)}║`;
    console.log(`\n╔${hr}╗`);
    console.log(row('IT Roles Library'));
    console.log(row(`http://localhost:${PORT}`));
    console.log(row('Press Ctrl+C to stop'));
    console.log(`╚${hr}╝\n`);
  });
}

module.exports = { server, getRoles, searchRoles, preferredSearchMatchIndex, ROOT, ROLES_DIR };
