# Data Schema

The tennisstats.be player profile endpoint returns a single JSON payload:

```
GET https://tennisstats.be/api/get_user_report/{user_id}
```

No authentication required. The schema is undocumented and may change without notice.

---

## Top-level fields

| Field             | Type   | Description                        |
| ----------------- | ------ | ---------------------------------- |
| `name`            | string | Player name — "Lastname Firstname" |
| `club`            | string | Club name in ALL CAPS              |
| `user_id`         | number | Tennis Vlaanderen player ID        |
| `singles`         | object | Singles stats and results          |
| `doubles`         | object | Doubles stats and results          |
| `history`         | array  | Ranking evolution snapshots        |
| `activity`        | object | Upcoming (future) matches          |
| `activity_recent` | object | Recent past match feed             |
| `counter.report`  | number | Profile view count                 |

---

## `singles` / `doubles`

| Field            | Type   | Notes                                                                 |
| ---------------- | ------ | --------------------------------------------------------------------- |
| `current_rank`   | number | Current rank — **lower = better**. Scale: 3 5 10 15 20 25 30 35 40 50 |
| `predicted_rank` | number | Predicted next-period rank                                            |
| `elo_rank`       | number | ELO score                                                             |
| `sub_category`   | string | `"M"` = men, `"V"` = women                                            |
| `score`          | number | Calculated ranking score                                              |
| `mi` / `ma`      | number | Score range min / max (singles only)                                  |
| `score_factor`   | number | Score multiplier (singles only)                                       |
| `nm`             | number | Matches played                                                        |
| `nw`             | number | Matches won                                                           |
| `ngw` / `ngp`    | number | Games won / played                                                    |
| `nsw` / `nsp`    | number | Sets won / played                                                     |
| `ntw` / `ntp`    | number | Tournaments won / played                                              |
| `results`        | array  | Tournament and interclub results (see below)                          |

---

## `results[]`

Each entry is either a tournament or an interclub block.

| Field             | Type             | Notes                                                             |
| ----------------- | ---------------- | ----------------------------------------------------------------- |
| `title`           | string           | Tournament or club name                                           |
| `series`          | string           | Category code — see [Series codes](#series-codes)                 |
| `subtitle`        | string           | Human-readable summary                                            |
| `score`           | number           | Points earned toward ranking                                      |
| `WL`              | string[]         | Per-match outcome: `"W"` win · `"L"` loss · `"G"` bye/not-played  |
| `selected`        | 0 \| 1           | `1` = counts toward ranking score; `0` = excluded (render dimmed) |
| `finished`        | 0 \| 1           | Whether the event is complete                                     |
| `matches`         | array            | Individual matches (see below)                                    |
| `subscores`       | array            | Score breakdown components                                        |
| `date`            | string?          | ISO date — tournaments only                                       |
| `week`            | string?          | `"YYYY-WW"` — tournaments only                                    |
| `participants`    | number?          | Draw size — tournaments only                                      |
| `rn`              | string?          | Round reached — tournaments only                                  |
| `url`             | string?          | Tennis Vlaanderen link — tournaments only                         |
| `p_name` / `p_id` | string / number? | Doubles partner name / ID                                         |

---

## `matches[]` (within a result)

| Field       | Type   | Notes                                                                      |
| ----------- | ------ | -------------------------------------------------------------------------- |
| `opponents` | array  | `{ name, user_id, rank }` — two entries for doubles                        |
| `round`     | string | Round name (e.g. `"1/4 finale"`)                                           |
| `score`     | string | Raw score string — **display verbatim** (e.g. `"7/6 (5) - 6/7 (6) - 6/0"`) |
| `did_win`   | 0 \| 1 | **`1` = player won (W badge)** · **`0` = player lost (L badge)**           |

---

## `history[]`

Alternating start-of-season / end-of-season snapshots.

| Field | Notes                                                       |
| ----- | ----------------------------------------------------------- |
| `l`   | Year label (`"2025"`) or `""` for an end-of-season snapshot |
| `s`   | Singles rank                                                |
| `d`   | Doubles rank                                                |
| `ss`  | Singles ELO                                                 |
| `ds`  | Doubles ELO                                                 |
| `p`   | `true` = predicted — render in lighter colour with asterisk |

The entry with `l = "2027"` and `p = true` represents the predicted next-season rank.

---

## `activity_recent.singles[]` / `activity_recent.doubles[]`

Recent match feed with richer score data than `results[].matches`.

| Field              | Notes                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `m_score`          | `{ winner, wo, forfait, surrender, set1, set2, set3 }` — each set is `[score_a, score_b, tiebreak]`; **`winner: 0` = player won**, `winner: 1` = opponent won |
| `o_name` / `o_pts` | Opponent name / rank                                                                                                                                          |
| `date`             | ISO datetime                                                                                                                                                  |
| `url`              | Match or tournament link                                                                                                                                      |
| `tid` / `sid`      | Tournament ID / series ID                                                                                                                                     |
| `cat` / `fmt`      | Category / format (`"XL"` = expanded draw)                                                                                                                    |

---

## Series codes

| Code               | Meaning                           |
| ------------------ | --------------------------------- |
| `eic`              | Interclub singles                 |
| `ih4`, `iic`, etc. | Interclub divisions               |
| `eh{n}`            | Enkel (singles) Heren category N  |
| `eh{n}/{m}`        | Enkel Heren category N/M          |
| `dh{n}`            | Dubbel (doubles) Heren category N |

---

## Known gotchas

- `did_win: 1` = **player won**, `did_win: 0` = **player lost** — not the opponent's perspective.
- Score strings are raw from the API — display verbatim, do not parse.
- `selected: 0` results do **not** count toward ranking score — render at reduced opacity.
- Rank scale is inverted: **lower number = better rank** (3 is elite, 50 is entry level).
- `winner: 0` in `m_score` (activity_recent) = **player won**.
