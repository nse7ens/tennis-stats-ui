# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation

All project documentation lives in `.docs/`:

| Path | Contents |
|---|---|
| `.docs/adr/` | Architecture Decision Records (Nygard format, numbered `0001-…`) |
| `.docs/specs/` | Feature design specs (`YYYY-MM-DD-<topic>-design.md`) |
| `.docs/dev/` | Developer docs — setup, architecture, data schema |
| `.docs/user/` | End-user guide |
| `CHANGELOG.md` | Root-level change log |

When writing an ADR, copy the template from `.docs/adr/README.md`.

### When to update documentation (do this automatically, without being asked)

**After every task or change, no exceptions:**
- Add a `CHANGELOG.md` entry describing what changed and why (one line minimum).
- `CHANGELOG.md` uses date-based headers (`## YYYY-MM-DD`, newest first). There is no `[Unreleased]` section — add entries directly under today's date header, creating it if it doesn't exist yet.

**When a tech or architectural decision is made** (new library, approach, pattern, infra choice):
- Write a new ADR in `.docs/adr/` and add it to the index in `.docs/adr/README.md`.

**When the component structure, data flow, or dev setup changes:**
- Update `.docs/dev/architecture.md` and/or `.docs/dev/getting-started.md`.

**When the tennisstats.be API schema or a data behaviour is discovered or confirmed:**
- Update the schema tables in this file (`CLAUDE.md`) AND in `.docs/dev/data-schema.md`.

**When a user-facing feature is added or changed:**
- Update `.docs/user/README.md` (or the relevant user guide page).

**When this file (`CLAUDE.md`) itself needs updating** (new commands, stack changes, new gotchas):
- Update it in the same commit as the code change — never leave it stale.

## Project purpose

Alternative frontend UI for [tennisstats.be](https://tennisstats.be) — a site that surfaces Tennis Vlaanderen match history and rankings. The goal is a cleaner, React-based player profile page that consumes the same JSON API.

## Commands

```bash
pnpm dev          # Start dev server with HMR
pnpm build        # Type-check then bundle (tsc -b && vite build)
pnpm lint         # Run ESLint
pnpm preview      # Preview the production build locally
```

No test runner is configured yet.

## Stack

- **React 19** + **TypeScript 6** + **Vite 8**
- Package manager: **pnpm**
- ESLint with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`
- TypeScript enforces `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` — type errors block `pnpm build`

## API

Player profile endpoint (no auth required):

```
https://tennisstats.be/speler/{user_id}
```

Returns a JSON blob — not a REST API but a single page-load payload. Example player: `user_id: 1606891`.

## Data schema

### Top-level fields

| Field | Type | Notes |
|---|---|---|
| `name` | string | "Lastname Firstname" |
| `club` | string | Full club name in caps |
| `user_id` | number | Tennis Vlaanderen ID |
| `singles` | object | See below |
| `doubles` | object | See below |
| `history` | array | Ranking evolution snapshots |
| `activity` | object | Upcoming matches |
| `activity_recent` | object | Recent match feed |
| `counter.report` | number | View count |

### `singles` / `doubles`

| Field | Type | Notes |
|---|---|---|
| `current_rank` | number | Current rank (lower = better; scale: 3 5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100 105 110 115) |
| `predicted_rank` | number | Predicted next-period rank |
| `elo_rank` | number | ELO score |
| `sub_category` | string | e.g. "M" for men |
| `score` | number | Calculated ranking score |
| `mi` / `ma` | number | Score range (min/max) |
| `score_factor` | number | Singles only |
| `nm` | number | Matches played |
| `nw` | number | Matches won |
| `ngw` / `ngp` | number | Games won / played |
| `nsw` / `nsp` | number | Sets won / played |
| `ntw` / `ntp` | number | Tournaments won / played |
| `results` | array | Tournament/interclub results |

### `results[]` entries

Each result is either a tournament or interclub block:

| Field | Type | Notes |
|---|---|---|
| `title` | string | Tournament/club name |
| `series` | string | Category code (e.g. `eh4`, `eh35/4`, `dh5`, `eic`) |
| `subtitle` | string | Human-readable summary |
| `score` | number | Points earned |
| `WL` | string[] | Per-match outcome: `"W"` win, `"L"` loss, `"G"` bye/not-played |
| `selected` | 0 \| 1 | `1` = counts toward ranking; `0` = dimmed, excluded |
| `finished` | 0 \| 1 | Whether completed |
| `matches` | array | Individual matches |
| `subscores` | array | Score breakdown components |
| `date` | string? | ISO date (tournaments only) |
| `week` | string? | `"YYYY-WW"` (tournaments only) |
| `participants` | number? | Draw size (tournaments only) |
| `rn` | string? | Round reached (tournaments only) |
| `url` | string? | Tennis Vlaanderen link (tournaments only) |
| `p_name` / `p_id` | string/number? | Doubles partner (doubles only) |

### `matches[]` entries (within a result)

| Field | Type | Notes |
|---|---|---|
| `opponents` | array | `{name, user_id, rank}` — two entries for doubles |
| `round` | string | Round name |
| `score` | string | Raw score string, display verbatim (e.g. `"7/6 (5) - 6/7 (6) - 6/0"`) |
| `did_win` | 0 \| 1 | `1` = player won (W badge), `0` = player lost (L badge) |

### `history[]` entries

Alternating start-of-season / end-of-season snapshots:

| Field | Notes |
|---|---|
| `l` | Year string (e.g. `"2025"`) or `""` for end-of-season; `"2027"` with `p: true` = predicted |
| `s` | Singles rank |
| `d` | Doubles rank |
| `ss` | Singles ELO |
| `ds` | Doubles ELO |
| `p` | `true` = predicted, render distinctly |

### `activity_recent.singles[]` / `activity_recent.doubles[]`

Recent match feed entries — richer than `results[].matches`:

| Field | Notes |
|---|---|
| `m_score` | `{winner, wo, forfait, surrender, set1, set2, set3}` where each set is `[score_a, score_b, tiebreak]` and `winner: 0` = player won |
| `o_name` / `o_pts` | Opponent name / rank |
| `date` | ISO datetime |
| `url` | Match/tournament link |
| `tid` / `sid` | Tournament ID / series ID |
| `cat` / `fmt` | Category / format (e.g. `"XL"`) |

## Reference UI

The reference design is at `C:\Users\sevensn\Downloads\tennisstats_player_profile.html`. Key layout decisions to replicate:

### Player header
- Avatar circle with initials, name, club badge, gender, ID

### Ranking cards (2-column grid)
- Singles card: large current rank, predicted rank with up/down arrow + color, ELO, score, range
- Doubles card: same shape, no range shown

### Stat strip (4 cards)
- Matches played (`nm`), wins (`nw`), games win % (`ngw/ngp * 100`), sets won/total (`nsw/nsp`)

### Tabs: Enkel / Dubbel / Historiek
**Results tab** shows tournament cards:
- Header: title + subtitle (series, round, date, participants), W/L dot row, points
- Interclub has no date/participants/link; tournaments do
- Unselected results (`selected: 0`): render at `opacity: 0.7` with "niet geselecteerd" label
- Each match row: W/L badge → opponent name + rank → score pill (monospace)
- Doubles match rows: show both opponents abbreviated (e.g. `Baeke C. (40) / Hiels J. (20)`)
- Tournament cards include an external link to Tennis Vlaanderen

**History tab** shows horizontal bar chart:
- One bar per year label where `l` is non-empty (skip `""` entries except for end-of-season display)
- Bars use rank value inversely (lower rank = longer bar; scale against max rank of 115)
- Predicted year (`p: true`) rendered in lighter blue with asterisk label

### Design tokens
The reference HTML uses CSS variables (`--color-text-primary`, `--color-background-success`, etc.) and **Tabler Icons** (`ti ti-*`). Match these in the React implementation.

## Series code reference

| Code | Meaning |
|---|---|
| `eic` | Interclub singles |
| `iic` / `ih4` etc. | Interclub (various divisions) |
| `eh{n}` | Enkel Heren cat. N |
| `eh{n}/{m}` | Enkel Heren cat. N/M |
| `dh{n}` | Dubbel Heren cat. N |
