const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const REQUIRED_FIELDS = [
  'file',
  'package',
  'version',
  'source',
  'license',
  'sha256',
  'verified',
  'owner',
  'reviewCadence',
];

function digest(filePath) {
  const normalized = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

function verifyVendor(rootDir) {
  const vendorDir = path.join(rootDir, 'vendor');
  const manifestPath = path.join(vendorDir, 'manifest.json');
  const errors = [];
  let manifest;

  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    return [`Unable to read vendor/manifest.json: ${error.message}`];
  }

  if (manifest.schemaVersion !== 1) {
    errors.push('vendor/manifest.json: schemaVersion must be 1');
  }
  if (!Array.isArray(manifest.assets)) {
    return [...errors, 'vendor/manifest.json: assets must be an array'];
  }

  const tracked = new Set();
  for (const [index, asset] of manifest.assets.entries()) {
    const label = `vendor/manifest.json assets[${index}]`;
    if (!asset || typeof asset !== 'object' || Array.isArray(asset)) {
      errors.push(`${label}: must be an object`);
      continue;
    }
    for (const field of REQUIRED_FIELDS) {
      if (typeof asset[field] !== 'string' || asset[field].trim() === '') {
        errors.push(`${label}: ${field} must be a non-empty string`);
      }
    }
    if (typeof asset.file !== 'string') continue;
    if (path.basename(asset.file) !== asset.file || !asset.file.endsWith('.js')) {
      errors.push(`${label}: file must be a JavaScript filename directly under vendor/`);
      continue;
    }
    if (tracked.has(asset.file)) {
      errors.push(`${label}: duplicate asset ${asset.file}`);
      continue;
    }
    tracked.add(asset.file);

    if (typeof asset.source === 'string' && !asset.source.startsWith('https://')) {
      errors.push(`${label}: source must be an HTTPS URL`);
    }
    if (typeof asset.sha256 === 'string' && !/^[a-f0-9]{64}$/i.test(asset.sha256)) {
      errors.push(`${label}: sha256 must contain 64 hexadecimal characters`);
    }
    if (typeof asset.verified === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(asset.verified)) {
      errors.push(`${label}: verified must use YYYY-MM-DD`);
    }
    if (!Array.isArray(asset.licenseFiles) || asset.licenseFiles.length === 0) {
      errors.push(`${label}: licenseFiles must be a non-empty array`);
    } else {
      for (const licenseFile of asset.licenseFiles) {
        if (typeof licenseFile !== 'string' || licenseFile.trim() === '') {
          errors.push(`${label}: licenseFiles entries must be non-empty strings`);
          continue;
        }
        const licensePath = path.resolve(vendorDir, licenseFile);
        if (!licensePath.startsWith(`${path.resolve(vendorDir)}${path.sep}`)) {
          errors.push(`${label}: licence file must stay inside vendor/: ${licenseFile}`);
        } else if (!fs.existsSync(licensePath)) {
          errors.push(`Missing licence file: ${licenseFile}`);
        }
      }
    }

    const assetPath = path.join(vendorDir, asset.file);
    if (!fs.existsSync(assetPath)) {
      errors.push(`Missing vendored asset: ${asset.file}`);
    } else if (/^[a-f0-9]{64}$/i.test(asset.sha256 || '') && digest(assetPath) !== asset.sha256.toLowerCase()) {
      errors.push(`Checksum mismatch for ${asset.file}`);
    }
  }

  let vendorFiles = [];
  try {
    vendorFiles = fs.readdirSync(vendorDir)
      .filter(file => file.endsWith('.js'))
      .sort();
  } catch (error) {
    errors.push(`Unable to enumerate vendor/: ${error.message}`);
  }
  for (const file of vendorFiles) {
    if (!tracked.has(file)) errors.push(`Untracked asset: ${file}`);
  }

  return errors;
}

if (require.main === module) {
  const rootDir = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.resolve(__dirname, '..');
  const errors = verifyVendor(rootDir);
  if (errors.length) {
    for (const error of errors) console.error(`ERROR: ${error}`);
    process.exitCode = 1;
  } else {
    console.log('Vendored dependency manifest and checksums verified.');
  }
}

module.exports = { verifyVendor };
