# Vendored browser dependencies

The viewer keeps these browser libraries in the repository so it works offline and does not depend on a public CDN. `manifest.json` is the source of truth for versions, immutable upstream release pages, licence sources, checksums, verification dates, ownership, and review cadence.

## Verification

Run:

```powershell
npm run verify-vendor
```

The command performs no network access. It fails when manifest metadata is incomplete, a JavaScript asset is missing or untracked, or committed content no longer matches its SHA-256 checksum. Checksums use UTF-8 text with LF line endings so Git's Windows checkout conversion cannot produce false failures.

## Licence and notice retention

The original licence/copyright headers remain embedded in every minified asset. The manifest names the retained local licence files and links to the complete licence text in the exact upstream tag from which each version came. `THIRD_PARTY_NOTICES.md` retains package-specific copyright and attribution notices, including the Apache ECharts NOTICE text and the additional Markdown notice shipped by marked.

The repository's own software and catalogue content use the licences described
in the root [`LICENSE`](../LICENSE) file. Vendored third-party code remains
governed by its own upstream licence; the repository's MIT and CC BY 4.0 grants
do not replace those terms.

## Upgrade and security review

The repository maintainer reviews upstream release and security pages quarterly and when an upstream advisory is received.

1. Open the immutable release and licence links recorded in `manifest.json`.
2. Review release notes and upstream security advisories between the current and proposed versions.
3. Download the official minified distribution for the selected release.
4. Preserve its embedded licence header and update applicable notices.
5. Replace only the relevant asset, then update its version, release URL, licence URL, SHA-256 digest, and verification date.
6. Run `npm run verify-vendor` and `npm test` before opening an issue-linked pull request.

Dependabot cannot update these copied browser files. Any available update or advisory that is not applied immediately must be recorded as a GitHub issue so the manual dependency backlog remains visible.
