'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const { server, preferredSearchMatchIndex } = require('../server.js');
const { contentReferencesForQuery } = require('../viewer-logic.js');
const { DOMAIN_LIST } = require('../catalogueConfig.js');

let baseUrl;

test.before(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

test.after(async () => {
  await new Promise(resolve => server.close(resolve));
});

function request(pathname) {
  return new Promise((resolve, reject) => {
    http.get(baseUrl + pathname, res => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    }).on('error', reject);
  });
}

test('GET / serves the SPA with security headers', async () => {
  const res = await request('/');
  assert.equal(res.status, 200);
  assert.match(res.headers['content-type'], /text\/html/);
  assert.equal(res.headers['x-content-type-options'], 'nosniff');
  assert.equal(res.headers['x-frame-options'], 'DENY');
  assert.ok(res.headers['content-security-policy'].includes("default-src 'self'"));
  assert.equal(res.headers['access-control-allow-origin'], undefined);
});

test('GET /api/roles returns JSON grouped by domain', async () => {
  const res = await request('/api/roles');
  assert.equal(res.status, 200);
  const domains = JSON.parse(res.body);
  assert.ok(domains.kubernetes, 'expected a kubernetes domain in the payload');
  assert.ok(Array.isArray(domains.kubernetes.roles));
  assert.ok(domains.kubernetes.roles.length > 0);
  assert.ok('level' in domains.kubernetes.roles[0]);
  assert.ok('lastReviewed' in domains.kubernetes.roles[0]);
});

test('GET /catalogueConfig.js serves the shared browser module', async () => {
  const res = await request('/catalogueConfig.js');
  assert.equal(res.status, 200);
  assert.match(res.headers['content-type'], /javascript/);
  assert.match(res.body, /CatalogueConfig/);
});

test('GET /api/roles uses canonical configured IDs and order', async () => {
  const res = await request('/api/roles');
  const domains = JSON.parse(res.body);
  assert.ok(domains.finops);
  assert.equal(domains.FinOps, undefined);
  assert.deepEqual(Object.keys(domains), DOMAIN_LIST.map(domain => domain.id));
  assert.equal(domains.finops.label, 'FinOps');
});

test('GET /api/roles lists reference docs separately from roles (#29)', async () => {
  const res = await request('/api/roles');
  const domains = JSON.parse(res.body);
  const finops = domains.finops;
  assert.ok(Array.isArray(finops.references), 'FinOps carries a references array');
  const std = finops.references.find(r => r.file.endsWith('cloud_cost_optimization_standards.md'));
  assert.ok(std, 'the standards doc is listed as a reference');
  assert.equal(std.title, 'Cloud Cost Optimization Standards');
  assert.ok(!('level' in std) && !('lastReviewed' in std), 'references carry no role metadata');
  assert.ok(!finops.roles.some(r => r.file.endsWith('_standards.md')), 'standards docs never appear as roles');
});

test('GET /api/search finds roles by body content, not just title (#68)', async () => {
  // "Terraform" appears in many role bodies but few (if any) titles.
  const res = await request('/api/search?q=terraform');
  assert.equal(res.status, 200);
  const { query, matches } = JSON.parse(res.body);
  assert.equal(query, 'terraform');
  assert.ok(matches.length > 0, 'body-content search returns results');
  const bodyOnly = matches.find(m => !m.inTitle);
  assert.ok(bodyOnly, 'at least one match is a body-only hit');
  assert.ok(bodyOnly.snippet.length > 0, 'body matches carry a snippet');
  assert.ok(bodyOnly.file.startsWith('Roles/') && bodyOnly.title && bodyOnly.domain);
});

test('GET /api/search snippets never leak a #269 annotation comment', async () => {
  // dotnet_architect.md's Reports To field is annotated:
  //   | **Reports To** | DevOps & Delivery Chapter Lead <!-- role: devops-and-delivery-chapter-lead --> |
  // A "reports to" search used to center the snippet right on that comment.
  const res = await request('/api/search?q=' + encodeURIComponent('reports to'));
  assert.equal(res.status, 200);
  const { matches } = JSON.parse(res.body);
  const dotnet = matches.find(m => m.file === 'Roles/app_platforms/dotnet_architect.md');
  assert.ok(dotnet, 'expected dotnet_architect.md among the matches');
  assert.ok(!dotnet.snippet.includes('<!--'), `snippet leaked a raw annotation comment: ${dotnet.snippet}`);
  assert.ok(!dotnet.snippet.includes('role:'), `snippet leaked annotation content: ${dotnet.snippet}`);
});

test('GET /api/search sorts title matches ahead of body-only matches', async () => {
  const res = await request('/api/search?q=kubernetes');
  const { matches } = JSON.parse(res.body);
  const firstBodyOnly = matches.findIndex(m => !m.inTitle);
  const lastTitle     = matches.map(m => m.inTitle).lastIndexOf(true);
  if (firstBodyOnly !== -1 && lastTitle !== -1) {
    assert.ok(lastTitle < firstBodyOnly, 'all title matches precede body-only matches');
  }
});

test('GET /api/search retains an exact-title match for API consumers', async () => {
  const res = await request('/api/search?q=' + encodeURIComponent('Kubernetes Architect'));
  const { matches } = JSON.parse(res.body);
  assert.ok(matches.some(m => m.title === 'Kubernetes Architect'));
});

test('GET /api/search normalizes repeated whitespace before viewer reconciliation', async () => {
  const query = 'Kubernetes   Architect';
  const res = await request('/api/search?q=' + encodeURIComponent(query));
  const { matches } = JSON.parse(res.body);
  const exact = matches.find(m => m.title === 'Kubernetes Architect');

  assert.ok(exact, 'the general-purpose API retains the normalized exact-title match');
  const references = contentReferencesForQuery(matches, query, [exact]);
  assert.ok(!references.some(m => m.title === 'Kubernetes Architect'));
  assert.ok(references.some(m => m.title === 'AI Platform Architect'),
    'another role mentioning the exact title remains a content reference');
});

test('preferredSearchMatchIndex skips heading and metadata for a narrative match', () => {
  const markdown = [
    '# Kubernetes Architect',
    '',
    '| Related Role | Kubernetes Architect |',
    '',
    '## Purpose',
    '',
    'Partners with the Kubernetes Architect on platform direction.',
  ].join('\n');

  const idx = preferredSearchMatchIndex(markdown, 'kubernetes architect');
  assert.ok(idx > markdown.indexOf('## Purpose'));
  assert.equal(markdown.slice(idx, idx + 'Kubernetes Architect'.length), 'Kubernetes Architect');
});

test('preferredSearchMatchIndex falls back to a metadata-only match', () => {
  const markdown = [
    '# Platform Engineer',
    '',
    '| Primary Tool | Terraform |',
    '',
    '## Purpose',
    '',
    'Builds reliable internal platforms.',
  ].join('\n');

  assert.equal(
    preferredSearchMatchIndex(markdown, 'terraform'),
    markdown.toLowerCase().indexOf('terraform'),
  );
});

test('GET /api/search returns nothing for a query shorter than 2 chars', async () => {
  const res = await request('/api/search?q=a');
  assert.deepEqual(JSON.parse(res.body).matches, []);
});

test('GET /api/search excludes reference/standards docs', async () => {
  const res = await request('/api/search?q=chargeback'); // a standards-doc word
  const { matches } = JSON.parse(res.body);
  assert.ok(!matches.some(m => m.file.endsWith('_standards.md')), 'standards docs never appear in role search');
});

test('GET /api/role returns a real role file', async () => {
  const res = await request('/api/role?file=Roles/kubernetes/kubernetes_architect.md');
  assert.equal(res.status, 200);
  assert.match(res.body, /^#\s+Kubernetes Architect/m);
});

test('GET /api/role rejects path traversal via ..', async () => {
  const res = await request('/api/role?file=' + encodeURIComponent('Roles/../server.js'));
  assert.equal(res.status, 400);
});

test('GET /api/role rejects paths outside Roles/', async () => {
  const res = await request('/api/role?file=' + encodeURIComponent('server.js'));
  assert.equal(res.status, 400);
});

test('GET /api/role rejects non-.md files', async () => {
  const res = await request('/api/role?file=' + encodeURIComponent('Roles/kubernetes/kubernetes_architect.md.exe'));
  assert.equal(res.status, 400);
});

test('GET /api/role 404s for a missing role', async () => {
  const res = await request('/api/role?file=' + encodeURIComponent('Roles/kubernetes/does_not_exist.md'));
  assert.equal(res.status, 404);
});

test('GET /api/doc returns a governance doc', async () => {
  const res = await request('/api/doc?file=' + encodeURIComponent('docs/role_template.md'));
  assert.equal(res.status, 200);
  assert.match(res.body, /Role Title/);
});

test('GET /api/doc rejects path traversal via ..', async () => {
  const res = await request('/api/doc?file=' + encodeURIComponent('docs/../server.js'));
  assert.equal(res.status, 400);
});

test('GET /viewer-logic.js serves the shared view-logic module', async () => {
  const res = await request('/viewer-logic.js');
  assert.equal(res.status, 200);
  assert.match(res.headers['content-type'], /javascript/);
  assert.match(res.body, /ViewerLogic/);
});

test('GET /vendor/marked.min.js serves the vendored library', async () => {
  const res = await request('/vendor/marked.min.js');
  assert.equal(res.status, 200);
  assert.match(res.headers['content-type'], /javascript/);
});

test('GET /vendor rejects path traversal via ..', async () => {
  const res = await request('/vendor/' + encodeURIComponent('../server.js'));
  assert.equal(res.status, 400);
});

test('GET on an unknown path returns 404', async () => {
  const res = await request('/does/not/exist');
  assert.equal(res.status, 404);
});
