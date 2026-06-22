# Changelog

Entries are grouped by date (YYYY-MM-DD), newest first. Each line is tagged **Added**, **Fixed**, **Changed**, **Refactored**, or **Docs**.

## 2026-06-22

- **Added** Footer en privacypagina: vaste footer onderaan elke pagina met attributie aan tennisstats.be en link naar `/privacy`; privacypagina verduidelijkt dat het project onofficieel en niet-commercieel is, geen data opslaat, en contactinfo voor verwijderverzoeken via GitHub Issues biedt

- **Changed** Prestatieprofiel radaras "Toernooiwinst" vervangen door "Gem. prestatie": gemiddelde win/loss ratio over alle resultaten (tornooien én interclub, selected én niet-selected), genormaliseerd als wins/WL.length per resultaat; berekend in `api.ts` als `UIDisc.bestRound`

- **Added** Favorite players — bookmark players from their profile page; favorites appear on the landing page with alphabetical insertion and drag-to-reorder; persisted in localStorage

- **Added** Planned match date and time displayed in upcoming matches: `planned` field surfaced through `UIUpcomingMatch` and rendered in the card subtitle (e.g. "Enkel · 1e ronde · 25 jun · 14:30"); date-only values show without time
- **Fixed** Unavailable seasons (API returns null) no longer show "speler niet gevonden": page keeps existing data visible and shows an inline notice; cold-loading an unavailable season redirects to the default season first before falling back to "not found"
- **Changed** SeasonSelector moved below the ranking cards (PlayerHeader), above Rankingverloop
- **Fixed** Season switch no longer triggers a full-page loading spinner: player data stays visible while the new season fetch runs; `prevIdRef` tracks whether the player changed (spinner) or only the season changed (silent update)
- **Fixed** SeasonSelector redesigned with segmented timeline bar: replaced year-chip row with a position-based horizontal track where each season occupies a proportional segment derived from its `start` value; reduces component height and correctly represents the season's time period
- **Added** Season selector wired into `PlayerPage`: reads/writes `?s=` query param via `useSearchParams`, redirects to default season when param is missing or invalid, passes `season` to `fetchPlayer`, and renders `<SeasonSelector>` above `<PlayerHeader>`
- **Added** Season selector infrastructure: `SEASONS` constant with 8 seasons (dec2022–may2026), `SeasonTag` type, and `DEFAULT_SEASON` ('may2026') added to `src/utils.ts` for upcoming season selector feature (Step 1)
- **Changed** UI language: all labels, headings, and copy translated to Dutch (Flemish) — "Singles/Doubles" → "Enkel/Dubbel", "Find a player" → "Zoek een speler", ranking/tournament/stats labels, navigation and error messages all in Dutch

## 2026-06-19

- **Added** Favicon: tennis ball SVG (yellow-green circle with two white seam arcs) added to `public/favicon.svg` and linked in `index.html`

- **Fixed** Last matches blade: walk-over, forfait, and surrender results now display the correct label ("Walk-over", "Forfait", "opgave") in the score pill instead of rendering empty; surrender now shows any partial sets played before the retirement (e.g. `6/2 - 3/1 opgave`), aligned with the tournament results format; `RawMScore` type extended with `surrender` flag
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
- **Added** Opponent and partner names now render as router links (`/player/:id`) in MatchRow, TournamentCard, RecentForm, and UpcomingSection when a player ID is available; falls back to plain text when no ID is present
- **Added** react-router-dom v7 routing — App.tsx replaced with a thin BrowserRouter shell; LandingPage (player ID search form, terracotta "Search" button, chip quick-link) at `/`; PlayerPage (URL param `:id`, loading/not-found/data states, ← Back link) at `/player/:id`
- **Fixed** Ranking tier scale corrected to 115 (was 50): updated `FULL_TIERS` in PredictionPanel, `Y_MAX` and grid lines in RankingChart, and CLAUDE.md schema docs
- **Fixed** TournamentCard: non-counted results now use the same background (#fff) and colors as counted results — only the border differs
- **Fixed** PredictionPanel: bar window now starts one tier below min(current, predicted) so the player's better rank is always in view, and `idx` now tracks the predicted rank instead of current
- **Fixed** RankingChart: Y_MAX is now dynamic — set to the next tier above the worst historical rank, with grid lines that follow
- **Fixed** `transformRecent`: set parsing now uses `Array.isArray` + `typeof === 'number'` guards, preventing null/null display for 2-set matches and fixing 3rd-set (match tie-breaker) omission for doubles
- **Added** Full player profile page: header, ranking cards, evolution chart, radar + recent form, upcoming matches, tournament results; `@emotion/styled` for component styles; shared `WLBadge` (3 sizes) and `DiscToggle` (2 variants) components; static data fallback + API fetch via Vite proxy at `/api/get_user_report/{userId}`; 4 court themes (Clay/Hard/Grass/Night) via React context
- **Added** TournamentResults section with MatchRow, TournamentCard (accordion score panel, W/L dots, selected/unselected card styling), and TournamentResults (DiscToggle tab, grid layout, footnote)
- **Added** UpcomingSection for displaying upcoming singles and doubles matches with yellow theme (#f9efd7 bg, #ecd49a border), merges both match types into single list with kind labels, renders null when empty
- **Added** PerformancePanel with RadarChart (SVG, 5-axis, 4 rings, singles+doubles polygons) and RecentForm (strip + match list with DiscToggle)
- **Added** PlayerHeader component with styled title block (eyebrow, name, club) and ranking cards grid (2-col auto-fit, 14px gap)
- **Added** WLBadge and DiscToggle shared components
- **Added** Data layer with static fallback dataset and transform functions (RawPlayerData → UIPlayerData); fetchPlayer() queries /api/get_user_report/{userId} with fallback to STATIC_DATA
- **Added** TypeScript types (RawPlayerData/UIPlayerData), theme context (four court variants), and utilities (fmtNum, fmtDate, pct, hexA, color constants)
- **Added** @emotion/styled and @emotion/react as production dependencies
- **Added** Google Fonts integration (Archivo, JetBrains Mono) with global stylesheet
- **Added** Vite dev server proxy for /api/* routes to https://tennisstats.be
- **Changed** index.html language to Dutch (nl), updated title, added font preconnects and base styles

## 2026-06-18

- **Changed** `CLAUDE.md` and `.docs/README.md` to include explicit, trigger-based documentation update rules so AI agents update docs automatically without being asked
- **Added** `.docs/` documentation structure with ADR support, dev docs, specs, and user guide
- **Added** `CHANGELOG.md` for tracking meaningful changes
- **Added** ADR-0001 (documentation practice), ADR-0002 (tech stack), ADR-0003 (API approach)
- **Added** `CLAUDE.md` with project context, API schema, and UI reference notes for AI agents
