const http = require('http');
const fs   = require('fs');
const path = require('path');
const { resolveLevel, parseMeta } = require('./roleMeta');

const PORT      = process.env.PORT || 3000;
const ROOT      = __dirname;
const ROLES_DIR = path.join(ROOT, 'Roles');
const VENDOR_DIR = path.join(ROOT, 'vendor');

// Human-readable labels for each domain folder
const DOMAIN_LABELS = {
  leadership:                             'Leadership',
  ai_governance:                          'AI Governance',
  app_platforms:                          'App Platforms',
  cloud_platforms:                        'Cloud Platforms',
  data_engineering:                       'Data Engineering',
  data_management:                        'Data Management',
  data_protection:                        'Data Protection',
  database_management:                    'Database Management',
  devops:                                 'DevOps',
  directory_services:                     'Directory Services',
  client_platform:                        'Client Platform',
  endpoint_management:                    'Endpoint Management',
  enterprise_architecture:                'Enterprise Architecture',
  FinOps:                                 'FinOps',
  infrastructure_onboarding_cross_platform: 'Infrastructure Onboarding',
  integration_middleware:                 'Integration & Middleware',
  itsm_configuration:                     'ITSM & Configuration',
  kubernetes:                             'Kubernetes',
  modern_infrastructure:                  'Modern Infrastructure',
  modern_workplace:                       'Modern Workplace',
  network:                                'Network',
  security:                               'Security',
  security_cross_platform:                'Security Cross-Platform',
  security_identity:                      'Security & Identity',
  server_hardware:                        'Server Hardware',
  server_hardware_hpe:                    'HPE Server Hardware',
  server_os_linux:                        'Linux Server OS',
  server_os_windows:                      'Windows Server OS',
  service_management:                     'Service Management',
  c_suite:                                'C-Suite',
  specialized_computing:                  'Specialized Computing',
  virtualization:                         'Virtualization',
};

function getRoles() {
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
      .filter(f => f.endsWith('.md') && f !== 'README.md')
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
