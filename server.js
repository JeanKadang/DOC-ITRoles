const http = require('http');
const fs   = require('fs');
const path = require('path');
const { resolveLevel, parseMeta, REFERENCE_DOC_PATTERN, DOMAIN_LABELS } = require('./roleMeta');

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

function getRoles() {
  const signature = rolesTreeSignature();
  if (rolesCache.domains && rolesCache.signature === signature) {
    return rolesCache.domains;
  }

  const domains = {};

  const entries = fs.readdirSync(ROLES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .sort((a, b) => {
      const la = DOMAIN_LABELS[a.name] || a.name;
      const lb = DOMAIN_LABELS[b.name] || b.name;
      return la.localeCompare(lb);
    });

  for (const entry of entries) {
    const domainPath = path.join(ROLES_DIR, entry.name);
    const files = fs.readdirSync(domainPath)
      .filter(f => f.endsWith('.md') && f !== 'README.md' && !REFERENCE_DOC_PATTERN.test(f))
      .sort();

    if (files.length === 0) continue;

    const roles = files.map(file => {
      const content = fs.readFileSync(path.join(domainPath, file), 'utf8');
      const meta  = parseMeta(content);
      const title = meta.title || file.replace(/_/g, ' ').replace('.md', '');

      return {
        name:         file.replace('.md', ''),
        file:         `Roles/${entry.name}/${file}`,
        title,
        level:        resolveLevel(content, file),
        lastReviewed: meta.lastReviewed,
      };
    });

    domains[entry.name] = {
      label: DOMAIN_LABELS[entry.name] || entry.name.replace(/_/g, ' '),
      roles,
    };
  }

  rolesCache = { signature, domains };
  return domains;
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

module.exports = { server, getRoles, ROOT, ROLES_DIR };
