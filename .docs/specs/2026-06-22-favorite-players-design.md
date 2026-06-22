# Favorite Players — Design Spec

**Date:** 2026-06-22  
**Status:** Approved

## Context

Users currently must search for a player by name every time they visit the app. For players they follow regularly, this is friction. The favorites feature lets users bookmark players and return to them directly from the landing page.

---

## Goals

- Users can mark any player as a favorite from their profile page.
- Favorite players appear on the landing page below the search bar, so no searching is needed for known players.
- The list is alphabetically ordered by default. Users can manually drag to reorder. When a new favorite is added it slots into alphabetical position relative to the current list (rather than triggering a full re-sort), preserving existing manual order.

---

## Data Model

```ts
// Added to src/types.ts
interface FavoritedPlayer {
  id: number;
  name: string;  // "Lastname Firstname"
  club: string;
}
```

Stored in localStorage under the key `"tennis_favorites"` as a JSON array. **Array order is display order** — the single source of truth for both alphabetical default and manual reorders.

**Alphabetical insertion rule:** when adding a new favorite, find the insertion index by walking the existing array and comparing the new player's `name` against each entry using `localeCompare`. Insert at the first position where the new name is ≤ the existing name. This slots the new entry into its correct alphabetical position without disturbing the relative order of already-existing entries.

---

## Architecture

### New: `src/FavoritesContext.tsx`

Exports `FavoritesProvider` and `useFavorites()`.

```ts
interface FavoritesContext {
  favorites: FavoritedPlayer[];
  isFavorite: (id: number) => boolean;
  addFavorite: (player: FavoritedPlayer) => void;
  removeFavorite: (id: number) => void;
  reorderFavorites: (newOrder: FavoritedPlayer[]) => void;
}
```

`FavoritesProvider` initializes from localStorage on mount and syncs on every mutation. Follows the same pattern as the existing `ThemeContext`.

### `src/App.tsx`

Wrap the router with `<FavoritesProvider>` alongside the existing `<ThemeProvider>`.

---

## New Dependencies

```
@dnd-kit/core
@dnd-kit/sortable
```

`@dnd-kit` is chosen over `react-beautiful-dnd` (abandoned, React 19 issues) and `react-sortablejs` (less idiomatic React). It is actively maintained, accessible, and tree-shakeable.

---

## Component Changes

### `src/components/PlayerHeader.tsx` — favorite toggle

Add a star button (Tabler Icons `ti-star` unfilled / `ti-star-filled` filled) in the player header. Calls `addFavorite` or `removeFavorite` via `useFavorites()`. Data for `addFavorite` comes from the already-loaded `UIPlayerData` — no extra API call.

### New: `src/components/FavoritesList.tsx`

Renders the ordered favorites list using `@dnd-kit/sortable`. Each row:

| Element | Detail |
|---|---|
| Drag handle (left) | `ti-grip-vertical` icon, always visible |
| Player name | `<Link to="/player/{id}">` |
| Club | Plain text below name |
| Remove button (right) | `ti-x` or `ti-trash` icon, calls `removeFavorite` |

Drag end calls `reorderFavorites` with the new array order.

### `src/pages/LandingPage.tsx` — favorites section

Search card stays at top, unchanged. Below it, if `favorites.length > 0`, render `<FavoritesList />`. If no favorites exist, nothing extra is shown — the landing page is identical to today.

---

## Files Touched

| File | Change |
|---|---|
| `src/types.ts` | Add `FavoritedPlayer` interface |
| `src/FavoritesContext.tsx` | New — Context, Provider, hook |
| `src/App.tsx` | Wrap with `FavoritesProvider` |
| `src/components/PlayerHeader.tsx` | Add star toggle button |
| `src/components/FavoritesList.tsx` | New — sortable favorites list |
| `src/pages/LandingPage.tsx` | Render `FavoritesList` below search |
| `package.json` / `pnpm-lock.yaml` | Add `@dnd-kit/core`, `@dnd-kit/sortable` |

---

## Verification

1. Visit a player page → star button visible in header, unfilled state.
2. Click star → button fills, navigating back to landing shows player card below search.
3. Add a second player → appears in alphabetical order relative to the first.
4. Drag a card to a new position → order persists after page refresh.
5. Add a third player after manual reorder → inserts at its alphabetical position within the current list.
6. Click remove (×) on a favorites card → card disappears; revisiting the player page shows star unfilled.
7. Remove last favorite → favorites section disappears from landing page entirely.
