# Player Search — Design Spec

**Date:** 2026-06-19  
**Status:** Implemented

## Problem

The landing page required users to know a player's numeric ID upfront, which is a barrier to discovery. Most users know a name or club, not an ID.

## Solution

Replace the ID input with a free-text search box that queries the tennisstats.be player list API and presents results as a floating dropdown.

## API

```
GET /api/list_users?s={query}
```
(Proxied via Vite's existing `/api → https://tennisstats.be` proxy)

Response shape:
```json
[
  { "id": 35408, "name": "Naert Chris", "name_club": "T.C. LEIEMEERS V.Z.W.", "singles": 5, "doubles": 10, "category": "M" }
]
```

## Behaviour

- **Trigger threshold:** 5 characters. Under 5 → no network call, no dropdown.
- **Caching:** One fetch per "root" query. Results are cached by the exact query string that triggered the fetch. If the user extends the query (e.g. "chris" → "chris lei"), the cached batch is filtered in-memory with no additional API call. A new fetch fires only when the current query no longer starts with the cached query string.
- **In-memory filter:** Split the current query on whitespace; every segment must appear (case-insensitive) anywhere in the combined `name + name_club` string.
- **Selection:** Clicking a result navigates immediately to `/player/{id}`.
- **Dropdown close:** `onBlur` with a 150ms delay so `onMouseDown` on a result fires before the dropdown disappears.

## Components

| File | Role |
|---|---|
| `src/usePlayerSearch.ts` | Hook — fetch, cache, filter, loading state |
| `src/components/PlayerSearchInput.tsx` | Renders input + dropdown |
| `src/api.ts` | `searchPlayers(query, signal)` — one fetch function |
| `src/types.ts` | `PlayerSearchResult` interface |
| `src/pages/LandingPage.tsx` | Wires hook + component, calls `navigate()` on select |

## Known limitation

The API returns all matching players for a 5-character query (observed: ~2363 rows for "chris"). The dropdown caps visible height at 320px with scroll, but all rows are rendered in the DOM. A future improvement could slice results or add virtual scrolling.
