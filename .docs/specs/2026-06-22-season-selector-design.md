# Season Selector — Design

## Context

The original tennisstats.be site lets users switch between named "seasons" (e.g. "Winterberekening 2025") representing ranking calculation periods. The API accepts `?s=<season_tag>` to scope data to a period. This design adds that functionality to our React frontend.

## Decisions

- **Season state location:** URL query param `?s=<tag>` — bookmarkable and shareable.
- **Default season:** Most recent (`may2026`) when no `?s=` param is present.
- **History chart:** Uses `data.history` from the current fetch as-is — no separate caching.
- **UI pattern:** Chevron prev/next navigator + clickable year strip, matching the reference tennisstats.be site.

## Data Layer

`SEASONS` constant in `src/utils.ts` — a fixed readonly array of `{ tag, label, start }` objects for all 8 seasons (dec2022 through may2026). `SeasonTag` is a union type of all tags. `DEFAULT_SEASON = 'may2026'`.

`fetchPlayer(userId, season, signal?)` in `src/api.ts` appends `?s=${season}` to the URL.

## URL & State Management

`PlayerPage` uses `useSearchParams()` from react-router-dom.

- Reads `?s=` on mount; validates against `SEASONS` list.
- Redirects to `?s=may2026` (replace) when param is absent or invalid.
- Season change: `setSearchParams({ s: newTag })` — URL is the single source of truth.
- The existing `fetchPlayer` effect gains `season` as a dependency; re-fetches on season change.

## SeasonSelector Component

**File:** `src/components/SeasonSelector.tsx`  
**Props:** `{ season: SeasonTag; onChange: (tag: SeasonTag) => void }`

Visual layout:
```
┌─────────────────────────────────────────────┐
│  ‹   Winterberekening 2025   ›              │
│  ───────────────────────────────────────────│
│    2023    2024   [2025]   2026              │
└─────────────────────────────────────────────┘
```

- Chevron buttons disabled at list boundaries.
- Year strip: unique years from season labels, active year highlighted in theme singles color with a dot indicator.
- Clicking a year jumps to the last season whose label ends with that year.
- Styled with emotion, matching existing card style (white bg, 1px border `#e8e8e0`, border-radius 12px).

## Page Layout

`SeasonSelector` renders as the first child of the `PlayerPage` content area, above `PlayerHeader`.

## Verification

1. Open `/player/1606891` — URL redirects to `?s=may2026`
2. SeasonSelector shows "Zomerberekening 2026" with `2026` highlighted
3. Click `‹` — URL becomes `?s=oct2025`, data reloads
4. Click year `2025` — jumps to `?s=may2025`
5. Navigate to `?s=garbage` — redirects to `?s=may2026`
6. Copy URL with season param, open new tab — loads that season
7. `pnpm build` passes with no TypeScript errors
