import type {
  UIPlayerData, UIDisc, UIResult, UIMatch, UIRecentMatch, UIUpcomingMatch,
  RawPlayerData, RawDisc, RawResult, RawMatch, RawRecentMatch, RawUpcomingMatch,
  PlayerSearchResult
} from './types';

function transformMatch(m: RawMatch): UIMatch {
  return { round: m.round, score: m.score, did_win: m.did_win, opp: m.opponents.map(o => ({ name: o.name, rank: o.rank, user_id: o.user_id })) };
}

function transformResult(r: RawResult): UIResult {
  return {
    title: r.title, series: r.series, subtitle: r.subtitle,
    score: r.score, WL: r.WL, selected: r.selected, partner: r.p_name ?? '', p_id: r.p_id,
    matches: r.matches.map(transformMatch),
    subscores: (r.subscores ?? []).map(ss => ({ title: ss.title, score: ss.score, literal: ss.literal }))
  };
}

function transformDisc(d: RawDisc): UIDisc {
  return {
    current: d.current_rank, predicted: d.predicted_rank, elo: d.elo_rank,
    score: d.score, mi: d.mi, ma: d.ma, factor: d.score_factor ?? null,
    stats: { nm: d.nm, nw: d.nw, ngw: d.ngw, ngp: d.ngp, nsw: d.nsw, nsp: d.nsp, ntw: d.ntw, ntp: d.ntp },
    results: d.results.map(transformResult)
  };
}

function fmtSetTuple(s: unknown): string | null {
  if (s == null || typeof s !== 'object') return null;
  let s0: unknown, s1: unknown, tb: unknown;
  if (Array.isArray(s)) {
    [s0, s1, tb] = s as unknown[];
  } else {
    const o = s as Record<string, unknown>;
    s0 = o.score_a ?? o[0];
    s1 = o.score_b ?? o[1];
    tb = o.tiebreak ?? o[2];
  }
  // Match tie-breaker: both set scores are null, tiebreak holds the loser's points.
  // Winner score: first to 10, win by 2, so max(10, loser+2).
  if (s0 == null && s1 == null) return typeof tb === 'number' ? `${Math.max(10, (tb as number) + 2)}/${tb}` : null;
  if (typeof s0 !== 'number' || typeof s1 !== 'number') return null;
  return typeof tb === 'number' ? `${s0}/${s1} (${tb})` : `${s0}/${s1}`;
}

function transformRecent(m: RawRecentMatch): UIRecentMatch {
  const ms = m.m_score;
  const sets = [ms?.set1, ms?.set2, ms?.set3]
    .map(fmtSetTuple)
    .filter((s): s is string => s !== null)
    .join(' - ');
  const score = ms?.wo ? 'Walk-over'
    : ms?.forfait ? 'Forfait'
    : ms?.surrender ? (sets ? `${sets} · Opgave` : 'Opgave')
    : sets;
  const opp = m.o1_name != null
    ? [
        { name: m.o1_name, rank: m.o1_pts ?? 0, user_id: m.o1_id },
        ...(m.o2_name != null ? [{ name: m.o2_name, rank: m.o2_pts ?? 0, user_id: m.o2_id }] : []),
      ]
    : m.o_name != null ? [{ name: m.o_name, rank: m.o_pts ?? 0, user_id: m.o_id }] : [];
  return { title: m.title ?? '', cat: m.cat, round: m.rn, date: m.date,
           win: (ms?.winner ?? 1) === 0, score, opp, partner: m.p_name ?? '', p_id: m.p_id };
}

function transformUpcoming(u: RawUpcomingMatch): UIUpcomingMatch {
  return { tid: u.tid, sid: u.sid, rn: u.rn, cat: u.cat, title: u.title,
           p_name: u.p_name ?? '', p_pts: u.p_pts ?? 0, my_pts: u.my_pts,
           url: u.url, p_id: u.p_id };
}

function transform(raw: RawPlayerData): UIPlayerData {
  return {
    player: { name: raw.name, club: raw.club },
    singles: transformDisc(raw.singles), doubles: transformDisc(raw.doubles),
    history: raw.history,
    upcoming: {
      singles: (raw.activity?.singles ?? []).map(transformUpcoming),
      doubles: (raw.activity?.doubles ?? []).map(transformUpcoming)
    },
    recent: {
      singles: (raw.activity_recent?.singles ?? []).map(transformRecent),
      doubles: (raw.activity_recent?.doubles ?? []).map(transformRecent)
    }
  };
}

export async function searchPlayers(query: string, signal: AbortSignal): Promise<PlayerSearchResult[]> {
  try {
    const res = await fetch(`/api/list_users?s=${encodeURIComponent(query)}`, { signal });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchPlayer(userId: number, signal?: AbortSignal): Promise<UIPlayerData | null> {
  try {
    const res = await fetch(`/api/get_user_report/${userId}`, {
      headers: { Accept: 'application/json' },
      signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw: RawPlayerData = await res.json();
    return transform(raw);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return null;
    return null;
  }
}
