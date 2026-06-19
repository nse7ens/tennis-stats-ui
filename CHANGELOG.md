# Changelog

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
