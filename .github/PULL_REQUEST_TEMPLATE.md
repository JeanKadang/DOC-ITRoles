## Summary

<!-- What changed, and why. -->

Closes #

## Evidence

<!--
For a catalogue content change: the evidence and any organisation-specific
assumptions (see CONTRIBUTING.md's evidence table).

For a credential change: registry ID, authoritative issuer URL, and
verification date.
-->

## Verification

<!-- Delete lines that don't apply. Paste actual output, not just checkmarks. -->

- [ ] `npm test`
- [ ] `npm run validate`
- [ ] `npm run check-counts`
- [ ] `npm run verify-vendor` (if `vendor/` changed)
- [ ] `npm run test:browser` (viewer changes only — drives Chromium/Firefox/WebKit, ~2.5 min)
- [ ] Any focused generator/verifier script this change affects

## Checklist

- [ ] Generated output, documentation links, and `CHANGELOG.md` are consistent with this change
- [ ] An ADR was added or updated, if this creates or reverses a durable taxonomy decision
- [ ] No security vulnerability or credential is described here — see [SECURITY.md](../SECURITY.md) if it is
