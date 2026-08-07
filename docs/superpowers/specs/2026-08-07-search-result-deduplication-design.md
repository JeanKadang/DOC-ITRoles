# Search Result Deduplication Design

**Issue:** #182 — Deduplicate exact title matches from full-text search results

**Status:** Approved for implementation planning

**Date:** 2026-08-07

## Problem

The viewer performs two related searches for the same query:

- the sidebar filters roles by title, domain, and chapter; and
- `/api/search` searches role titles and full Markdown content.

For an exact role-title query such as `Kubernetes Architect`, the same role is
therefore shown in the normal role list and again under **Content matches**. Its
content snippet can also begin in the document heading or metadata table instead
of the narrative section that gives the match useful context.

## Decision

Keep the two search mechanisms separate and reconcile their results in the
viewer. The general-purpose search API will continue returning title and body
matches. Before rendering the content-reference group, the viewer will remove
only results whose normalized title exactly equals the normalized query.

Normalization will trim surrounding whitespace, collapse internal whitespace,
and compare case-insensitively. It will not use fuzzy matching, stemming, or
partial-title matching. Consequently:

- `Kubernetes Architect` is shown once in the filtered role list;
- the duplicate `Kubernetes Architect` entry is omitted from **Content matches**;
- other roles that mention `Kubernetes Architect` remain as content references;
- partial queries such as `Kubernetes` retain all relevant API results; and
- mixed or unmatched queries retain the existing empty-state behavior.

The sidebar summary and **Content matches (N)** heading remain separate counts.
The first describes roles shown by the sidebar filter; the second is calculated
after exact-title reconciliation and describes only the rendered content
references.

## Snippet selection

The server will prefer a query occurrence in narrative content when generating a
snippet. Narrative content begins at the first level-two Markdown heading after
the role heading and metadata block. If the query occurs there, the first such
occurrence supplies the snippet. If no narrative occurrence exists, the server
falls back to the first occurrence in the complete document so that a genuine
metadata-only match is not discarded.

The existing escaping boundary remains unchanged: the server returns plain text,
and the viewer HTML-escapes it when rendering.

## Implementation boundaries

- Add a small pure helper to `viewer-logic.js` for exact-title reconciliation so
  the browser behavior can be tested without a browser.
- Use that helper in `runContentSearch` before the empty-state check and count.
- Adjust snippet selection in `server.js` without changing `/api/search` result
  membership or response fields.
- Do not combine the sidebar and API search implementations or redesign the
  search interface; those broader changes belong to later search work.

## Accessibility and failure behavior

The content results retain their existing `role="button"`, `tabindex="0"`, data
attributes, keyboard handling, and escaped visible labels. Removing a duplicate
does not create a new interaction pattern. If reconciliation leaves no content
references, the existing **No matches inside role content** status is displayed,
while the exact role remains available in the sidebar.

Out-of-order response protection, the debounced request, short-query threshold,
and unavailable-search status remain unchanged.

## Verification

Implementation will be test-driven and cover:

1. An exact, case-insensitive, whitespace-normalized title match is removed from
   content references while other matching roles remain.
2. Partial-title and unrelated content matches are not removed.
3. Empty and malformed match collections are handled safely.
4. `/api/search` still returns exact-title matches for API consumers.
5. A narrative occurrence is preferred over an H1 or metadata occurrence.
6. Metadata-only matches still receive a fallback snippet.
7. Existing short-query, sorting, reference-document exclusion, keyboard, and
   screen-reader semantics remain passing.

The full repository test suite and role validation commands will be run before
the implementation is considered complete.
