# Vendored Dependency Verification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add offline provenance and SHA-256 verification for every vendored browser asset.

**Architecture:** Store review metadata in `vendor/manifest.json`, document the maintenance policy in `vendor/README.md`, and verify both schema and committed bytes through a dependency-free Node script. Exercise the verifier through `node:test` and expose it through npm.

**Tech Stack:** Node.js built-ins, JSON, Markdown, `node:test`

## Global Constraints

- Preserve the zero-runtime-dependency and offline architecture.
- Verification must not require network access.
- Every JavaScript file directly under `vendor/` must have exactly one manifest entry.

---

### Task 1: Vendor manifest verifier

**Files:**
- Create: `test/vendor-verification.test.js`
- Create: `scripts/verify-vendor.js`
- Create: `vendor/manifest.json`
- Create: `vendor/README.md`
- Modify: `package.json`

**Interfaces:**
- Consumes: `{ assets: Array<{ file, package, version, source, license, sha256, verified, owner, reviewCadence }> }`
- Produces: `verifyVendor(rootDir): string[]`, where an empty array means success

- [ ] **Step 1: Write failing tests** for a valid temporary manifest, changed bytes, an untracked JavaScript file, and the committed repository manifest.
- [ ] **Step 2: Run `node --test test/vendor-verification.test.js`** and confirm failure because `scripts/verify-vendor.js` does not exist.
- [ ] **Step 3: Implement `verifyVendor(rootDir)`** using `node:crypto`, `node:fs`, and `node:path`, plus a CLI that prints errors and exits non-zero.
- [ ] **Step 4: Add the manifest and maintenance README** using the four committed assets and their SHA-256 digests.
- [ ] **Step 5: Add `verify-vendor` to `package.json` and run the focused test, `npm run verify-vendor`, and `npm test`** expecting zero failures.
- [ ] **Step 6: Commit** with `fix: verify vendored dependencies`.
