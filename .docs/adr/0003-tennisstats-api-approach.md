# ADR-0003: Consume tennisstats.be API directly (no proxy)

**Status:** Accepted  
**Date:** 2026-06-18

## Context

The app needs player profile data from tennisstats.be. Options are to fetch it directly from the browser, or to proxy it through a backend service. The site has no documented public API — it is a single JSON payload loaded on the player profile page (`https://tennisstats.be/speler/{user_id}`).

## Decision

Fetch directly from `https://tennisstats.be/api/get_user_report/{user_id}` in the browser, with no backend proxy.

- No auth is required.
- The payload is a self-contained JSON blob — no pagination, no session state.
- A proxy would add infrastructure complexity for no functional gain at this scale.

## Consequences

- **CORS dependency:** The app only works if `tennisstats.be` allows cross-origin requests from the app's origin. If CORS is blocked, a proxy will need to be introduced (superseding this ADR).
- **API fragility:** The schema is undocumented and may change without notice. The data schema is documented in `CLAUDE.md` and `.docs/dev/data-schema.md` as a safeguard.
- **No caching layer:** Each profile load hits tennisstats.be directly. Client-side caching (e.g. React Query, localStorage) can be added if needed.
- No backend to maintain, deploy, or secure.
