# Changelog

## [Unreleased]

- **Fixed** Last matches blade: walk-over, forfait, and surrender results now display the correct label ("Walk-over", "Forfait", "Opgave") in the score pill instead of rendering empty; surrender now shows any partial sets played before the retirement (e.g. `6/2 - 3/1 · Opgave`); `RawMScore` type extended with `surrender` flag
- **Fixed** Last matches blade: super-tiebreak winner score was hardcoded to 10 — extended matches (12/10, 15/13, 11/9, …) now compute winner score as `max(10, loser + 2)`

- **Fixed** Mobile layout: resolved horizontal scroll on iPhone 16 caused by `minmax(420px, 1fr)` grid in tournament results (replaced with `min(420px, 100%)`); added `overflow-x: hidden` safety net to `html, body`; score calculation bar strips "pts" suffix on ≤480px; ranking chart auto-scrolls to the right on mount to show current/predicted year; match score pills in "Last matches" and tournament result cards wrap to a new line below the opponent name on ≤480px

- **Added** Deployment pipeline: multi-stage Dockerfile (node build → nginx), nginx API proxy for `/api/` → `tennisstats.be`, GitHub Actions workflow pushing to ACR and deploying to Azure Container Apps on every push to `main` (ADR-0006)

- **Fixed** RecentForm: removed opponent name from badge strip (date is sufficient); aligned match-list count with strip count (both now show up to 6)

- **Refactored** Rank tiers extracted to a single `RANK_TIERS` constant in `utils.ts` — `PredictionPanel` and `RankingChart` now share one definition; also fixed the stale list which was missing 45, 60, 70, 80, 90, 100, 110

- **Added** Player search on landing page: free-text search box replaces the numeric ID input; queries `/api/list_users?s=…` at 5+ characters, caches the result, filters in-memory for longer queries, and navigates immediately on result click — results show player name, club, and singles/doubles rank
- **Fixed** Player search debounce: rapid typing no longer starves results; fetch is deferred 300 ms after the last keystroke, query is trimmed before cache lookup so trailing spaces (e.g. "pieter ") reuse cached results without re-fetching

- **Fixed** AbortController cleanup in PlayerPage: stale fetches are now aborted on navigation/re-render; `fetchPlayer` accepts an optional `AbortSignal`; NaN/non-positive id guard prevents broken API calls
- **Fixed** LandingPage: non-numeric input now shows an inline error instead of navigating to a broken route
- **Refactored** Shared `PlayerLink` styled component extracted from `MatchRow`, `RecentForm`, `TournamentCard`, and `UpcomingSection` — removes four identical `styled(Link)` definitions
- **Docs** ADR-0005: documents react-router-dom v7 routing decision including dev `historyApiFallback` and production rewrite requirement

- **Added** Task 8: opponent and partner names now render as router links (`/player/:id`) in MatchRow, TournamentCard, RecentForm, and UpcomingSection when a player ID is available; falls back to plain text when no ID is present

- **Added** Tasks 5-6-7: react-router-dom v7 routing — App.tsx replaced with a thin BrowserRouter shell; LandingPage (player ID search form, terracotta "Search" button, chip quick-link) at `/`; PlayerPage (URL param `:id`, loading/not-found/data states, ← Back link) at `/player/:id`

- **Fixed** Ranking tier scale corrected to 115 (was 50): updated `FULL_TIERS` in PredictionPanel, `Y_MAX` and grid lines in RankingChart, and CLAUDE.md schema docs
- **Fixed** TournamentCard: non-counted results now use the same background (#fff) and colors as counted results — only the border differs
- **Fixed** PredictionPanel: bar window now starts one tier below min(current, predicted) so the player's better rank is always in view, and `idx` now tracks the predicted rank instead of current
- **Fixed** RankingChart: Y_MAX is now dynamic — set to the next tier above the worst historical rank, with grid lines that follow
- **Fixed** `transformRecent`: set parsing now uses `Array.isArray` + `typeof === 'number'` guards, preventing null/null display for 2-set matches and fixing 3rd-set (match tie-breaker) omission for doubles

### Added
- Full player profile page: header, ranking cards, evolution chart, radar + recent form, upcoming matches, tournament results
- `@emotion/styled` for component styles
- Shared `WLBadge` (3 sizes) and `DiscToggle` (2 variants) components
- Static data fallback + API fetch via Vite proxy at `/api/get_user_report/{userId}`
- 4 court themes (Clay/Hard/Grass/Night) via React context

## 2026-06-19
- **Added** Task 10: TournamentResults section with MatchRow, TournamentCard (accordion score panel, W/L dots, selected/unselected card styling), and TournamentResults (DiscToggle tab, grid layout, footnote) — wired into App.tsx after UpcomingSection
- **Added** Task 9: UpcomingSection for displaying upcoming singles and doubles matches with yellow theme (#f9efd7 bg, #ecd49a border), merges both match types into single list with kind labels, renders null when empty
- **Added** Task 8: PerformancePanel with RadarChart (SVG, 5-axis, 4 rings, singles+doubles polygons) and RecentForm (strip + match list with DiscToggle) — wired into App.tsx after RankingChart
- **Added** Task 6: PlayerHeader component with styled title block (eyebrow, name, club) and ranking cards grid (2-col auto-fit, 14px gap) — wired App.tsx with fetchPlayer(1606891), theme context provider (Clay court default), and Loading state
- **Added** Task 4: WLBadge and DiscToggle shared components — Win/Loss badge (sm/md/lg sizes) and Singles/Doubles toggle (light/outlined variants) using @emotion/styled
- **Added** Task 3: Data layer with static fallback dataset (verbatim from design reference) and transform functions (RawPlayerData → UIPlayerData) — fetchPlayer() now queries /api/get_user_report/{userId} with fallback to STATIC_DATA

## 2026-06-19
- **Added** Task 2: TypeScript types (RawPlayerData/UIPlayerData), theme context (four court variants), and utilities (fmtNum, fmtDate, pct, hexA, color constants) — foundation for all subsequent component tasks

## 2026-06-19
- **Added** @emotion/styled and @emotion/react as production dependencies for component styling
- **Added** Google Fonts integration (Archivo, JetBrains Mono) with global stylesheet
- **Added** Vite dev server proxy for /api/* routes to https://tennisstats.be
- **Changed** index.html language to Dutch (nl), updated title, added font preconnects and base styles

## 2026-06-18
- **Changed** `CLAUDE.md` and `.docs/README.md` to include explicit, trigger-based documentation update rules so AI agents update docs automatically without being asked


- **Added** `.docs/` documentation structure with ADR support, dev docs, specs, and user guide
- **Added** `CHANGELOG.md` for tracking meaningful changes
- **Added** ADR-0001 (documentation practice), ADR-0002 (tech stack), ADR-0003 (API approach)
- **Added** `CLAUDE.md` with project context, API schema, and UI reference notes for AI agents
