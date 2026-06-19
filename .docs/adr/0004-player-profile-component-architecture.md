# 0004 — Player Profile Component Architecture

**Date:** 2026-06-18
**Status:** Accepted

## Context

Implementing the player profile design from `Player Profile.dc.html`. The design uses an imperative `DCLogic` class with a single `renderVals()` function that computes all derived state as plain style objects. We need a React translation.

## Decisions

- **`@emotion/styled`** — component styles are colocated via styled components; inline `style` props are reserved for dynamically computed values (SVG coordinates, calculated chart positions).
- **Shared primitives first** — `WLBadge` and `DiscToggle` are built before the sections that use them, preventing duplication across `RecentForm`, `TournamentCard`, and `TournamentResults`.
- **Local state per section** — S/D toggles and accordion opens live in the component that owns them; nothing is lifted to App unless needed.
- **Theme via React context** — `ThemeColors` (singles/doubles color pair) is injected at the root so all components access the current theme without prop drilling.
- **Static data fallback** — `api.ts` embeds the full design dataset; `fetchPlayer()` falls back silently on CORS/error so the UI works offline.

## Consequences

- Adding a fifth theme is one line in `THEMES`.
- A theme picker UI requires only `useState<ThemeName>` in `App.tsx`.
- SVG chart components mix styled wrappers (section, header) with inline computed styles (path data, dot positions) — this is intentional and documented here.
