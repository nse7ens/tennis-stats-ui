# ADR-0002: React + TypeScript + Vite as tech stack

**Status:** Accepted  
**Date:** 2026-06-18

## Context

The project is a single-page application that renders player profile data from a JSON API. It needs a frontend framework with good TypeScript support, fast developer iteration, and a minimal build footprint. No server-side rendering is required — all data is fetched client-side from `tennisstats.be`.

## Decision

Use **React 19** with **TypeScript 6** and **Vite 8**, managed with **pnpm**.

- React 19 for the component model and hooks
- TypeScript 6 with strict settings (`noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`) — type errors block the build
- Vite 8 for HMR, fast cold starts, and native ESM bundling
- pnpm for dependency management (faster installs, strict node_modules layout)

## Consequences

- Excellent DX: instant HMR, sub-second cold starts.
- Type errors are caught at build time, not runtime.
- No SSR — the app is a client-side SPA; CORS must be considered when fetching from `tennisstats.be`.
- No test runner included by default; one must be added explicitly if needed.
