# Browser Journey and Accessibility Tests Design

**Issue:** #183 — Add browser-level journey and accessibility smoke tests

**Status:** Approved for implementation planning

**Date:** 2026-08-07

## Problem

The repository has fast Node-based tests for server and viewer logic, but it
does not currently exercise the assembled application in a real browser. This
leaves important user journeys and accessibility behavior dependent on manual
testing, including live catalogue counts, search, compare mode, the narrow-screen
navigation drawer, and keyboard focus management.

The missing browser layer should catch integration regressions without changing
the application's production architecture or turning the regular unit suite
into a slow browser suite.

## Decision

Add one Playwright browser-test suite with projects for Chromium, Firefox, and
WebKit. The suite will use `@playwright/test` and `@axe-core/playwright` as
development-only dependencies. Exact package versions and the Playwright browser
binaries will be locked during implementation, and `package-lock.json` will be
committed so local and continuous-integration installations are reproducible.

Browser tests will run through a separate `npm run test:browser` command. The
existing `npm test` command will remain the fast Node test suite and will not
implicitly launch browsers.

Playwright will manage the existing Node server through its `webServer`
configuration on a dedicated test port. Tests will exercise the application as
served rather than loading `index.html` directly. The production server and
application framework will not be replaced or restructured for this work.

## Browser projects and viewports

Every supported journey will run against the three browser engines:

- Chromium;
- Firefox; and
- WebKit.

Desktop journeys will use a consistent desktop viewport. The navigation journey
will use a narrow viewport below the application's `768px` breakpoint. A
browser-specific skip is permitted only when its reason is documented in the
test and linked to a GitHub issue; silent reductions in browser coverage are not
acceptable.

## Test organization and locator policy

Browser tests will live under `test/browser/`, separated from the Node test
files. Shared setup and small journey helpers may be added when they remove
meaningful duplication, but the individual tests should remain readable as user
journeys.

Tests will prefer accessible, user-observable locators such as roles, names,
labels, headings, and visible text. CSS structure and implementation details
will not be treated as the primary public contract. A narrowly scoped
`data-testid` may be added only when a stable semantic locator cannot describe
the element. Such an addition must not replace missing accessible semantics.

Assertions will wait on observable states rather than fixed delays. The suite
will use the committed catalogue and stable known roles instead of generated or
external data.

## Required journeys

### 1. Home page and live catalogue counts

Load the served home page and verify that the main application is visible and
that the live role, domain, and chapter counts are populated from the catalogue.
Assertions should verify meaningful values or labels rather than merely checking
that count containers exist.

### 2. Search and open a role

Search for a stable known role, verify the relevant role and content results,
and open the role content. The exact-title result must follow the deduplication
behavior delivered by #182: the role remains available through the filtered role
list and is not repeated as an exact-title content match.

### 3. Compare mode

Enter compare mode, add the supported number of roles needed to render a useful
comparison, verify that the comparison is visible, and close or exit it. The
test should assert the user-visible state transitions rather than internal
arrays or CSS classes.

### 4. Narrow-screen navigation

At a viewport below `768px`, open the navigation drawer and verify its expanded
state and initial focus behavior. Open a role from the drawer and verify that the
content is shown and the drawer closes as intended. The journey must also verify
the relevant `aria-expanded` state and that focus does not become lost.

### 5. Keyboard and focus behavior

Use keyboard input to exercise representative interactive paths through a
chapter, a domain, a role, and relevant controls. Verify activation, visible
focus movement, and expanded or collapsed state where applicable. This is a
focused smoke test of critical keyboard behavior, not an attempt to duplicate
every interaction in the application.

### 6. Automated accessibility scan

Run axe against the stable home state and an opened role state. Serious and
critical violations will fail the browser test. Moderate and minor findings
remain visible in the report so they can be assessed without making this initial
smoke suite unmanageably noisy.

Accessibility exclusions must not be added silently. Any future waiver must be
documented in the test with its rationale and a linked GitHub issue that tracks
the underlying problem.

## Continuous integration

Add one dedicated browser-test job to the existing CI workflow. The job will:

- use the repository's pinned checkout and Node setup actions;
- install the locked Node dependencies with `npm ci`;
- install the Playwright browser engines and required Linux dependencies;
- run `npm run test:browser`; and
- enforce `timeout-minutes: 10` for the complete job.

The browser job will be distinct from the Node 18/22 matrix. A single supported
Node version is sufficient because browser compatibility is supplied by the
three Playwright projects, while Node-version compatibility remains covered by
the existing unit-test matrix.

On failure, Playwright will retain screenshots and traces and produce an HTML
report. CI will upload the report and failure evidence only when the job fails,
with a short retention period of seven days. Successful runs should not create
routine artifact noise.

## Reliability and failure behavior

Playwright will start and stop the dedicated test server automatically. A failed
server start, unavailable application, timed-out journey, browser crash, or
serious/critical axe finding will fail the command with a non-zero status.

Retries must not conceal a deterministic product failure. If CI-only retries are
introduced during implementation, they will be limited and reported in the
Playwright output so a flaky first attempt remains visible.

The test suite must not depend on internet services after its dependencies and
browser binaries are installed. Tests will not mutate catalogue content or
write into production data paths.

## Scope boundaries

This issue supplies a browser harness and high-value smoke coverage. It does
not:

- replace the existing Node tests;
- add a frontend framework or production runtime dependency;
- redesign search, compare, navigation, or accessibility behavior;
- add exhaustive responsive or visual-regression coverage; or
- implement deep-link and reload routing tests assigned to #181.

The harness should be reusable by #181, but routing work will be added only when
that issue is implemented.

## Verification and acceptance mapping

Implementation will be considered complete when:

1. `npm test` continues to pass without launching a browser.
2. `npm run test:browser` starts the application and passes all six journeys in
   Chromium, Firefox, and WebKit.
3. The home journey verifies live role, domain, and chapter counts.
4. The search journey opens a known role and covers exact-title deduplication.
5. Compare mode is opened, meaningfully exercised, and closed.
6. The narrow-screen journey verifies drawer state, focus, role opening, and
   closure.
7. Keyboard tests verify representative activation, focus, and expanded state.
8. Axe reports fail on serious or critical violations in the home and opened-role
   states.
9. The CI browser job uses the locked dependency installation, completes within
   its explicit ten-minute budget, and publishes diagnostic artifacts on
   failure.
10. Existing role validation, catalogue count checks, Markdown lint, and Node
    tests remain green.
