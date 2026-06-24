import type { RawPlayerData, RawRecentMatch } from '../types';

export const recentSinglesNormal: RawRecentMatch = {
  cat: 'HE', date: '2025-06-01T10:00:00', title: 'TC Test Open', rn: 'QF',
  o_name: 'Smith J.', o_pts: 15, o_id: 42,
  m_score: { winner: 0, set1: [6, 3], set2: [6, 4] },
};

export const recentSinglesWalkover: RawRecentMatch = {
  cat: 'HE', date: '2025-05-15T10:00:00',
  o_name: 'Doe J.', o_pts: 20, o_id: 55,
  m_score: { winner: 1, wo: true },
};

export const recentSinglesForfait: RawRecentMatch = {
  cat: 'HE', date: '2025-05-10T10:00:00',
  o_name: 'Brown K.', o_pts: 25, o_id: 66,
  m_score: { winner: 0, forfait: true },
};

export const recentSinglesSurrender: RawRecentMatch = {
  cat: 'HE', date: '2025-05-05T10:00:00',
  o_name: 'Green L.', o_pts: 30, o_id: 77,
  m_score: { winner: 0, surrender: true, set1: [6, 3] },
};

export const recentDoubles: RawRecentMatch = {
  cat: 'HD', date: '2025-04-20T10:00:00', title: 'TC Dubbel Open', rn: 'SF',
  o1_name: 'Adams P.', o1_pts: 20, o1_id: 88,
  o2_name: 'Baker Q.', o2_pts: 25, o2_id: 99,
  p_name: 'Partner R.', p_pts: 15, p_id: 77,
  m_score: { winner: 1, set1: [3, 6], set2: [4, 6] },
};

export const rawPlayerFixture: RawPlayerData = {
  name: 'Test Player', club: 'TC Test', user_id: 1,
  singles: {
    current_rank: 10, predicted_rank: 9, elo_rank: 1150,
    sub_category: 'HE', score: 55.0, mi: 40, ma: 70, score_factor: 1.2,
    nm: 5, nw: 3, ngw: 8, ngp: 12, nsw: 7, nsp: 10, ntw: 1, ntp: 3,
    results: [
      {
        title: 'TC Test Open', series: 'eh4', subtitle: 'HE cat 4',
        score: 10, WL: ['W', 'W', 'L'], selected: 1, finished: 1,
        matches: [
          { opponents: [{ name: 'Smith J.', user_id: 42, rank: 15 }], round: 'R1', score: '6/3 6/4', did_win: 1 },
        ],
        subscores: [{ title: 'Prestatie', score: 8, literal: null }],
      },
      {
        title: 'Interclub', series: 'eic', subtitle: 'Divisie 3',
        score: 5, WL: [], selected: 0, finished: 1, matches: [],
        // no subscores — exercises the ?? [] fallback in transformResult
      },
    ],
  },
  doubles: {
    current_rank: 15, predicted_rank: 15, elo_rank: 1050,
    sub_category: 'HD', score: 30.0, mi: 20, ma: 50,
    // no score_factor — exercises the ?? null fallback in transformDisc
    nm: 2, nw: 1, ngw: 4, ngp: 8, nsw: 4, nsp: 6, ntw: 0, ntp: 1,
    results: [],
  },
  history: [{ l: '2024', s: 10, d: 15, ss: 1150, ds: 1050 }],
  activity: {
    singles: [{
      tid: 100, sid: 200, rn: 'R1', cat: 'HE', title: 'TC Test Open',
      planned: '2025-07-01',
      my_id: 99, my_pts: 12, my_name: 'Test Player', my_name_club: 'TC Test (Test Player)',
      url: '/t/100',
      // no p_name/p_pts — exercises ?? '' and ?? 0 fallbacks in transformUpcoming
    }],
    doubles: [],
  },
  activity_recent: {
    singles: [recentSinglesNormal, recentSinglesWalkover, recentSinglesForfait, recentSinglesSurrender],
    doubles: [recentDoubles],
  },
};
