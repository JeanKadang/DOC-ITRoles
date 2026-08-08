# Credential Registry Hardening Design

## Goal

Make credential-registry validation fail safely for malformed `audited_roles`
values and prove the registry-related CLI exit-code contract with spawned-process
tests.

## Scope

This change is limited to issue #212. It hardens the existing registry validator
and adds focused tests. It does not change the registry schema, marker syntax,
CLI interface, or behavior for valid registries.

## Validator behavior

`validateCredentialRegistry()` will treat any non-array `audited_roles` value as
invalid. It will add the existing structured error, `audited_roles must be an
array`, and use an empty audited-role collection for subsequent processing.

Validation will continue through the independent `credentials` array. This
allows one invocation to report both the malformed top-level field and any
credential-record problems. The returned `auditedRoles` value remains an empty
`Set`, so callers cannot accidentally treat malformed input as an audited role.

The existing early return for a non-array `credentials` value remains unchanged
because credential-record iteration cannot continue without that collection.

## CLI behavior

The CLI continues to load a registry through `CREDENTIALS_FILE` and use the
existing exit-code rules:

- registry validation errors are printed with the registry path and exit 1;
- stale-registry warnings are printed but exit 0 in normal mode;
- stale-registry warnings exit 1 with `--strict`.

No new command-line options or output formats are introduced.

## Tests

Direct validator tests will supply representative non-array values, including an
object, number, string, boolean, and `null`. Each case must return normally with
the structured `audited_roles` error and an empty audited-role set.

Spawned CLI fixtures will prove:

1. an invalid registry exits 1 and identifies the registry validation failure;
2. a stale registry exits 0 normally and prints its warning;
3. the same stale registry exits 1 under `--strict`.

Verification will run the focused credential-registry and validator tests, the
full Node test suite, and `npm run validate`.

## Error handling and compatibility

Malformed registry data remains a validation failure rather than throwing to the
caller. Valid input produces the same indexes, warnings, and exit codes as
before. The change adds no dependencies and performs no network access.
