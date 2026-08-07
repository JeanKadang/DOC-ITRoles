# Dark-Theme Contrast Remediation Design

**Issue:** #202  
**Status:** Approved  
**Date:** 2026-08-07

## Context

The viewer's default light theme passes the serious/critical axe accessibility
gate introduced by #183 and completed in #201. The dark theme still produces
serious `color-contrast` violations on the home screen and after opening a role.
The failures cover muted copy, filter chips, resource headings, reporting
metadata, career-path controls, section navigation, and some role-level badges.

The existing dark theme is a compact override block in `index.html`. Theme
selection sets `data-theme="dark"` on the root element, after which semantic CSS
variables and a small set of badge overrides determine component colours.

## Goals

- Eliminate serious and critical axe violations in dark-mode home and opened-role states.
- Refresh the dark palette so text hierarchy, surface depth, and interactive states remain clear.
- Preserve visible focus, selected-state clarity, and role-level differentiation.
- Add permanent dark-theme coverage across Chromium, Firefox, and WebKit.
- Keep the light theme and viewer layout unchanged.

## Non-goals

- Reworking layout, typography, spacing, or component structure.
- Moving theme configuration out of `index.html`; configuration centralisation remains #184.
- Weakening axe severity, excluding selectors, or disabling the `color-contrast` rule.
- Resolving unrelated accessibility findings below serious impact.

## Considered Approaches

### 1. Semantic token refresh with limited component overrides — selected

Refresh the dark semantic variables first, then adjust only badge or state pairs
whose meaning depends on their own hue. This fixes shared causes, keeps the theme
coherent, and minimises selector-specific debt.

### 2. Component-by-component overrides

Add dark selectors for every failing element while retaining the existing token
values. This would preserve more of the current appearance, but duplicate colour
decisions and make future components easy to miss.

### 3. Full visual redesign

Redesign elevation, borders, spacing, and component treatments along with the
palette. This offers the most freedom but expands a bounded accessibility fix
into an unrelated UI project.

## Palette and Component Design

The refreshed theme uses cool charcoal/navy surfaces and brighter text:

| Semantic role | Direction |
|---|---|
| Page background | Deep navy-charcoal, darker than every content surface |
| Cards | Dark slate with a distinct but restrained elevation step |
| Inputs and inactive chips | Lighter slate so their boundaries remain visible |
| Primary text | Near-white |
| Secondary text | Light cool grey |
| Muted text | Brighter blue-grey that still passes 4.5:1 on every surface where it appears |
| Interactive blue | Light blue suitable for text, links, borders, and focus on dark surfaces |
| Borders | Higher-opacity light borders; interactive borders use the light blue accent |

Role-level badges retain their established hue families. Each foreground and
background pair must independently meet the normal-text contrast threshold.
Active filter and navigation chips use three signals together: brighter text,
a tinted surface, and a visible border. Focus remains a two-pixel accent outline
with an offset and never relies on the selected-state background alone.

Palette values will be implemented as semantic variables in the existing
`[data-theme="dark"]` block. Component-specific dark overrides are permitted only
for role-level badge pairs and interactive states that cannot inherit a shared
semantic token without losing meaning.

## Behaviour and Data Flow

1. The existing theme button activates dark mode.
2. The root `data-theme` attribute changes to `dark` and its pressed state updates.
3. Dark semantic variables flow through existing component styles.
4. Badge and active-state overrides refine the few semantic exceptions.
5. No JavaScript theme-storage or rendering behaviour changes.

## Automated Verification

`test/browser/accessibility.spec.js` will gain dark-theme variants for:

- the home state; and
- an opened `Kubernetes Architect` role.

Each dark test will:

1. activate dark mode through the accessible theme button;
2. assert the root theme attribute and button pressed state;
3. wait for finite UI animations through the existing scan helper;
4. run axe without exclusions; and
5. fail on any serious or critical violation, attaching the complete violation JSON.

The tests run in the existing Chromium, Firefox, and WebKit projects. The full
browser suite must remain green so navigation, responsive behaviour, search,
comparison, and light-theme accessibility are protected.

## Manual Verification

Inspect dark home and opened-role states at desktop and narrow widths. Confirm:

- text hierarchy remains legible without appearing uniformly bright;
- inactive, hover, active, and focus states are distinguishable;
- every role-level badge remains recognisable by both label and colour;
- links remain visually distinct from body text; and
- surfaces retain clear depth without excessive border noise.

## Failure Handling

The accessibility helper already attaches complete axe details when violations
exist. Theme activation assertions will fail before the scan if dark mode cannot
be entered, preventing a false green result caused by scanning the light theme.
No fallback palette or suppression path is introduced.

## Delivery Boundaries

The implementation belongs in one issue-linked branch and pull request for
#202. It should modify only the dark palette/component overrides, browser
accessibility tests, and this design/implementation documentation. Configuration
centralisation (#184), stable role identity (#180), and vendored dependency
verification (#185) remain separate changes.
