# ADR-0005: Use react-router-dom v7 for client-side routing

**Status:** Accepted  
**Date:** 2026-06-19

## Context

The app needed dynamic player profiles reachable by direct URL (e.g. `/player/1606891`), a landing/search page at `/`, and a "not found" state for unknown player IDs. No router was previously installed — navigation was impossible without adding a client-side routing solution.

## Decision

Adopt **react-router-dom v7** with `BrowserRouter`. Two routes are defined:

- `/` → `LandingPage` (player ID search form)
- `/player/:id` → `PlayerPage` (dynamic player profile)

`vite.config.ts` sets `appType: 'spa'` to enable `historyApiFallback` in dev, so reloading `/player/1606891` does not 404 during development.

## Consequences

- Direct URL access to `/player/:id` works correctly in dev without a proxy workaround.
- Production deploys require a server-side rewrite rule so all paths serve `index.html`. For Netlify this means a `_redirects` file containing `/* /index.html 200`; other hosts need equivalent configuration.
- The `:id` param is a string; `PlayerPage` validates it with `Number()` and guards against `NaN` / non-positive values before fetching.
