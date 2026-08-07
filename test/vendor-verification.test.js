const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { verifyVendor } = require('../scripts/verify-vendor');

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function createFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vendor-verification-'));
  const vendorDir = path.join(root, 'vendor');
  fs.mkdirSync(vendorDir);
  fs.mkdirSync(path.join(vendorDir, 'licenses'));
  const content = '/* Example 1.0.0 */\n';
  fs.writeFileSync(path.join(vendorDir, 'example.min.js'), content);
  fs.writeFileSync(path.join(vendorDir, 'licenses', 'MIT.txt'), 'MIT licence\n');
  fs.writeFileSync(path.join(vendorDir, 'manifest.json'), JSON.stringify({
    schemaVersion: 1,
    assets: [{
      file: 'example.min.js',
      package: 'example',
      version: '1.0.0',
      source: 'https://example.com/example/releases/tag/v1.0.0',
      license: 'MIT',
      licenseFiles: ['licenses/MIT.txt'],
      sha256: sha256(content),
      verified: '2026-08-07',
      owner: 'repository maintainer',
      reviewCadence: 'quarterly',
    }],
  }));
  return root;
}

test('accepts a complete manifest whose checksums match', t => {
  const root = createFixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  assert.deepEqual(verifyVendor(root), []);
});

test('reports checksum drift after an asset changes', t => {
  const root = createFixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.appendFileSync(path.join(root, 'vendor', 'example.min.js'), '// changed\n');
  assert.match(verifyVendor(root).join('\n'), /checksum mismatch.*example\.min\.js/i);
});

test('uses LF-normalized text checksums across Git checkout settings', t => {
  const root = createFixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'vendor', 'example.min.js'), '/* Example 1.0.0 */\r\n');
  assert.deepEqual(verifyVendor(root), []);
});

test('reports JavaScript assets missing from the manifest', t => {
  const root = createFixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'vendor', 'untracked.min.js'), '// untracked\n');
  assert.match(verifyVendor(root).join('\n'), /untracked asset.*untracked\.min\.js/i);
});

test('reports a retained licence file that is missing', t => {
  const root = createFixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.unlinkSync(path.join(root, 'vendor', 'licenses', 'MIT.txt'));
  assert.match(verifyVendor(root).join('\n'), /missing licence file.*licenses[/\\]MIT\.txt/i);
});

test('the committed vendor directory passes verification', () => {
  assert.deepEqual(verifyVendor(path.join(__dirname, '..')), []);
});
