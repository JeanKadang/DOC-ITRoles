'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const { server } = require('../server.js');

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
