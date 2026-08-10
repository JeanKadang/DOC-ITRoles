# Shareable Routes and Contextual Titles Design

**Issue:** #181 — Add shareable, reload-safe routes and contextual document titles

**Status:** Approved for implementation planning

**Date:** 2026-08-11

## Problem

The viewer keeps its durable navigation state only in JavaScript variables. A
role, comparison, matrix domain, or reference document therefore cannot be
bookmarked or shared, reload returns to the welcome screen, and browser Back
and Forward do not replay those views. The page title also remains the generic
`IT Roles Library`, so tabs and bookmarks do not identify their content.

The existing application is deliberately lightweight: one served HTML page,
shared pure viewer logic, and no frontend framework or build step. Routing must
preserve that architecture and work without deployment-specific rewrite rules.

## Decision

Add hash-based routing for durable views. Hash routes work with the current
server and static-file shape because the browser does not send the fragment to
the server. They provide native reload, bookmark, Back, and Forward behavior
without adding a dependency or changing server fallback behavior.

The supported routes are:

- `#/` — welcome view;
- `#/role/<domain>/<role-id>` — one role;
- `#/compare/<domain-a>/<role-a>/<domain-b>/<role-b>` — two roles;
- `#/matrix/<domain>` — the matrix focused on one domain; and
- `#/doc/<document-id>` — a registered reference or onboarding document.

Route segments use catalogue identifiers, not display titles. Role identifiers
come from their existing `Roles/<domain>/<filename>.md` paths with the `.md`
suffix removed. Document identifiers are explicit stable identifiers on the
registered resource entries rather than titles derived at runtime. This avoids
breaking links when a human-readable title changes.

Only the durable views agreed for #181 are routed. Search text, sidebar
expansion, level filters, recently viewed state, chapter overviews, stale-role
view, organisation chart, relationship graph, career flow, and technology
radar remain transient UI state.

## Route model and pure logic

Parsing and formatting will live in `viewer-logic.js` as pure functions so the
route contract can be covered by the fast Node test suite. The parser returns a
small discriminated route object or an invalid result; it does not access the
DOM or catalogue.

Formatting accepts only known route shapes and percent-encodes each segment.
Parsing decodes segments defensively, rejects malformed encodings, unexpected
segment counts, empty identifiers, and unsupported route types. Catalogue
resolution remains a separate browser-side step after `/api/roles` has loaded.

Formatting and parsing must round-trip all supported route shapes. Normalized
hashes use lowercase catalogue identifiers and no trailing slash except `#/`.

## Navigation controller

One controller in `index.html` will own the relationship between the URL and
the rendered viewer state:

1. `init()` loads the catalogue and renders the base controls.
2. After data is available, the controller parses and applies the current hash.
3. A `hashchange` listener applies later Back, Forward, and direct hash changes.
4. User actions navigate by assigning a canonical hash; route application opens
   the view without writing another history entry.

This separation prevents recursive navigation and duplicate history entries.
Asynchronous role and document loads must not allow a slower, superseded request
to overwrite the view selected by a newer route.

The existing in-page Back stack will no longer drive routed durable views. The
header Back control will call `history.back()` when browser history is
available; otherwise it returns to `#/`. This makes the visible Back control and
the browser controls describe the same navigation sequence.

Existing callers such as sidebar roles, recent roles, cross-references, career
steps, resource items, matrix chips, comparison controls, and Home will enter
the controller instead of directly creating an unrepresented durable view.

## View resolution

### Roles

The controller resolves the domain and role identifier against `allDomains`.
The role is opened only when both identifiers match a catalogue entry. The
canonical hash is derived from the role file path rather than copied from DOM
labels.

### Comparisons

A comparison route resolves both roles before rendering either column. It opens
the first role as the primary view and the second in the comparison slot. An
invalid, missing, or duplicate role produces the standard invalid-route state
instead of a half-rendered comparison.

Closing a comparison navigates to the primary role's canonical route. Starting
comparison mode remains transient until a second role is selected; selecting
that role creates the comparison route.

### Matrix domains

The matrix route validates the domain and renders the existing matrix limited
to that domain. The normal Matrix button may open the first available domain or
retain the last valid matrix domain during the session, but the resulting URL
must always identify a concrete domain.

### Documents

Each entry in the registered resource list receives an explicit route ID. The
controller resolves that ID to the existing file and display title before
calling the document renderer. This scope covers the reference and onboarding
documents registered in the sidebar. Domain-local standards files are not
assigned public routes in #181 because they are not part of the registered
document collection and lack a stable public identifier contract.

## Titles and copy-link action

The default title is `IT Roles Library`. Routed views set:

- `<Role title> — IT Roles Library`;
- `<Role A> vs <Role B> — IT Roles Library`;
- `<Domain> Matrix — IT Roles Library`; or
- `<Document title> — IT Roles Library`.

The title is updated when a route is successfully resolved, not merely when a
hash parses. Home and invalid routes use the default title.

A single `Copy link` button in the header is shown for a valid durable route.
It copies the canonical absolute URL from the current location. Success and
failure are announced through a small live status region so keyboard and screen
reader users receive feedback. Clipboard failure leaves the route and viewer
untouched.

## Invalid routes and failures

An unknown route type, malformed encoding, missing role, unknown domain,
unknown document, or incomplete comparison must never leave a blank or partial
panel. The viewer will:

- clear durable view state and comparisons;
- show the welcome content;
- show a concise, dismissible route-not-found message;
- restore the default document title; and
- preserve the invalid hash so the user can inspect or correct the shared URL.

Failure to fetch otherwise valid role or document content keeps the resolved
route and contextual title but shows the existing content-load error. That is a
content failure, not an invalid route.

## Testing

Fast Node tests will cover parsing, formatting, normalization, percent encoding,
malformed input, unsupported shapes, and round trips.

Playwright tests will cover user-visible integration behavior:

1. directly loading a known role route;
2. reloading and restoring the same role;
3. navigating between roles with browser Back and Forward without blank panels;
4. directly loading and closing a comparison route;
5. loading a matrix-domain route;
6. loading a registered document route;
7. contextual titles for role, comparison, matrix, and document views;
8. safe fallback for an invalid route; and
9. the Copy link action producing the canonical URL.

The existing hosted browser workflow remains the cross-browser authority for
Chromium, Firefox, and WebKit. Local verification may use the fast Node suite
and one available browser engine; implementation will not repeatedly retry a
locally unavailable browser runtime.

## Scope boundaries

This issue does not:

- add a frontend framework, router dependency, or build step;
- add server-side path fallback rules;
- persist search, filters, sidebar expansion, or transient panels;
- route chapter overviews or domain-local standards documents;
- redesign the role, comparison, matrix, or document content; or
- change the catalogue's source identifiers.

## Acceptance mapping

Implementation is complete when:

1. every catalogue role formats to and resolves from a stable direct route;
2. direct role, comparison, matrix-domain, and registered-document routes
   restore after reload;
3. browser Back and Forward replay routed durable views without blank panels;
4. valid routed views set the specified contextual document titles;
5. malformed and unresolved routes show the safe welcome fallback;
6. route logic and browser journeys are automated as described above;
7. Copy link exposes the canonical absolute URL with accessible feedback; and
8. existing validation, Node tests, and hosted browser checks remain green.
