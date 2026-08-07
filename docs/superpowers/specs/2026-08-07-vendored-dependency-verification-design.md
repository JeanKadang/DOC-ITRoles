# Vendored Dependency Verification Design

## Goal

Make every browser asset in `vendor/` traceable and mechanically verifiable without adding a runtime dependency or network requirement.

## Design

`vendor/manifest.json` is the machine-readable source for filename, package, version, upstream release URL, licence, SHA-256 checksum, verification date, owner, and review cadence. `vendor/README.md` explains the project licensing position and the offline upgrade/security-review procedure.

`scripts/verify-vendor.js` validates the manifest schema, requires an entry for every committed JavaScript asset, rejects missing or unexpected files, and compares each file's SHA-256 digest. It performs no network access. `npm run verify-vendor` exposes the check locally and in CI through the existing `npm test` suite.

## Error handling and tests

The verifier returns actionable errors for malformed metadata, missing assets, unexpected assets, and checksum drift. Unit tests use temporary directories to prove a valid manifest succeeds and tampering fails before the committed repository assets are checked.
