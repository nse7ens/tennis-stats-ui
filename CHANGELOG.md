# Changelog

## 2026-06-19
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
