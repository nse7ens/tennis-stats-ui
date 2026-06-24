import {
  fmtSetTuple, transformRecent, computeBestRound,
  transformResult, transformDisc, transform,
} from './transforms';
import {
  rawPlayerFixture,
  recentSinglesNormal, recentSinglesWalkover, recentSinglesForfait,
  recentSinglesSurrender, recentDoubles,
} from './__fixtures__/player.fixture';
import type { RawResult, RawPlayerData } from './types';

// ---------------------------------------------------------------------------
// fmtSetTuple
// ---------------------------------------------------------------------------

describe('fmtSetTuple', () => {
  it('returns null for null input', () => {
    expect(fmtSetTuple(null)).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(fmtSetTuple(undefined)).toBeNull();
  });

  it('returns null for a primitive', () => {
    expect(fmtSetTuple(42)).toBeNull();
    expect(fmtSetTuple('6/3')).toBeNull();
  });

  it('handles array format without tiebreak', () => {
    expect(fmtSetTuple([6, 3])).toBe('6/3');
  });

  it('handles array format with tiebreak', () => {
    expect(fmtSetTuple([7, 6, 4])).toBe('7/6 (4)');
  });

  it('handles object format with score_a/score_b without tiebreak', () => {
    expect(fmtSetTuple({ score_a: 6, score_b: 0 })).toBe('6/0');
  });

  it('handles object format with tiebreak', () => {
    expect(fmtSetTuple({ score_a: 7, score_b: 6, tiebreak: 3 })).toBe('7/6 (3)');
  });

  it('returns null when s0/s1 are non-null non-numbers', () => {
    expect(fmtSetTuple({ score_a: 'x', score_b: 'y' })).toBeNull();
  });

  it('handles match tie-breaker: winner = max(10, loser+2) when loser pts = 8', () => {
    expect(fmtSetTuple([null, null, 8])).toBe('10/8');
  });

  it('handles match tie-breaker: winner exceeds 10 when loser pts = 9', () => {
    expect(fmtSetTuple([null, null, 9])).toBe('11/9');
  });

  it('returns null for match tie-breaker when tb is absent', () => {
    expect(fmtSetTuple([null, null, null])).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// transformRecent
// ---------------------------------------------------------------------------

describe('transformRecent', () => {
  it('maps o_name/o_pts/o_id to a single-element opp array (singles format)', () => {
    const result = transformRecent(recentSinglesNormal);
    expect(result.opp).toEqual([{ name: 'Smith J.', rank: 15, user_id: 42 }]);
  });

  it('maps o1_name+o2_name to a two-element opp array (doubles format)', () => {
    const result = transformRecent(recentDoubles);
    expect(result.opp).toEqual([
      { name: 'Adams P.', rank: 20, user_id: 88 },
      { name: 'Baker Q.', rank: 25, user_id: 99 },
    ]);
  });

  it('score = "Walk-over" when m_score.wo is true', () => {
    expect(transformRecent(recentSinglesWalkover).score).toBe('Walk-over');
  });

  it('score = "Forfait" when m_score.forfait is true', () => {
    expect(transformRecent(recentSinglesForfait).score).toBe('Forfait');
  });

  it('score ends with " opgave" when m_score.surrender is true and sets are present', () => {
    expect(transformRecent(recentSinglesSurrender).score).toBe('6/3 opgave');
  });

  it('score = "opgave" when m_score.surrender is true and no sets', () => {
    const m = { ...recentSinglesSurrender, m_score: { winner: 0 as const, surrender: true } };
    expect(transformRecent(m).score).toBe('opgave');
  });

  it('formats normal sets as set1 - set2', () => {
    expect(transformRecent(recentSinglesNormal).score).toBe('6/3 - 6/4');
  });

  it('win is true when m_score.winner === 0', () => {
    expect(transformRecent(recentSinglesNormal).win).toBe(true);
  });

  it('win is false when m_score.winner !== 0', () => {
    expect(transformRecent(recentSinglesWalkover).win).toBe(false);
  });

  it('win defaults to false when m_score is absent', () => {
    const m = { cat: 'HE' as const, date: '2025-01-01', o_name: 'X', o_pts: 10, o_id: 1 };
    expect(transformRecent(m).win).toBe(false);
  });

  it('partner defaults to empty string when p_name is absent', () => {
    expect(transformRecent(recentSinglesNormal).partner).toBe('');
  });

  it('partner is set when p_name is present', () => {
    expect(transformRecent(recentDoubles).partner).toBe('Partner R.');
  });

  it('title defaults to empty string when absent', () => {
    expect(transformRecent(recentSinglesWalkover).title).toBe('');
  });
});

// ---------------------------------------------------------------------------
// computeBestRound
// ---------------------------------------------------------------------------

describe('computeBestRound', () => {
  it('returns { score: 0, label: "—" } for empty results array', () => {
    expect(computeBestRound([])).toEqual({ score: 0, label: '—' });
  });

  it('skips results with empty WL arrays', () => {
    const results = [{ WL: [] }, { WL: [] }] as unknown as RawResult[];
    expect(computeBestRound(results)).toEqual({ score: 0, label: '—' });
  });

  it('computes correct average win rate and label', () => {
    const results = [
      { WL: ['W', 'W', 'L'] },  // 2/3
      { WL: ['W', 'L'] },       // 1/2
    ] as unknown as RawResult[];
    const { score, label } = computeBestRound(results);
    expect(score).toBeCloseTo((2 / 3 + 1 / 2) / 2);
    expect(label).toBe('58%');
  });

  it('returns 100% label for all-win result', () => {
    const results = [{ WL: ['W', 'W'] }] as unknown as RawResult[];
    expect(computeBestRound(results)).toEqual({ score: 1, label: '100%' });
  });
});

// ---------------------------------------------------------------------------
// transformResult
// ---------------------------------------------------------------------------

describe('transformResult', () => {
  it('partner defaults to empty string when p_name is absent', () => {
    const result = transformResult(rawPlayerFixture.singles.results[0]);
    expect(result.partner).toBe('');
  });

  it('subscores default to empty array when absent', () => {
    const result = transformResult(rawPlayerFixture.singles.results[1]);
    expect(result.subscores).toEqual([]);
  });

  it('maps subscores when present', () => {
    const result = transformResult(rawPlayerFixture.singles.results[0]);
    expect(result.subscores).toEqual([{ title: 'Prestatie', score: 8, literal: null }]);
  });

  it('preserves WL array as-is', () => {
    const result = transformResult(rawPlayerFixture.singles.results[0]);
    expect(result.WL).toEqual(['W', 'W', 'L']);
  });
});

// ---------------------------------------------------------------------------
// transformDisc
// ---------------------------------------------------------------------------

describe('transformDisc', () => {
  it('sets factor to null when score_factor is absent', () => {
    expect(transformDisc(rawPlayerFixture.doubles).factor).toBeNull();
  });

  it('maps score_factor to factor when present', () => {
    expect(transformDisc(rawPlayerFixture.singles).factor).toBe(1.2);
  });

  it('includes bestRound from computeBestRound', () => {
    const disc = transformDisc(rawPlayerFixture.doubles);
    expect(disc.bestRound).toEqual({ score: 0, label: '—' });
  });
});

// ---------------------------------------------------------------------------
// transform — full pipeline
// ---------------------------------------------------------------------------

describe('transform', () => {
  it('produces the expected UIPlayerData from rawPlayerFixture', () => {
    const result = transform(rawPlayerFixture);
    expect(result).toEqual({
      player: { name: 'Test Player', club: 'TC Test' },
      singles: {
        current: 10, predicted: 9, elo: 1150,
        score: 55.0, mi: 40, ma: 70, factor: 1.2,
        stats: { nm: 5, nw: 3, ngw: 8, ngp: 12, nsw: 7, nsp: 10, ntw: 1, ntp: 3 },
        results: [
          {
            title: 'TC Test Open', series: 'eh4', subtitle: 'HE cat 4',
            score: 10, WL: ['W', 'W', 'L'], selected: 1, finished: 1,
            partner: '', p_id: undefined,
            matches: [{ round: 'R1', score: '6/3 6/4', did_win: 1, opp: [{ name: 'Smith J.', rank: 15, user_id: 42 }] }],
            subscores: [{ title: 'Prestatie', score: 8, literal: null }],
          },
          {
            title: 'Interclub', series: 'eic', subtitle: 'Divisie 3',
            score: 5, WL: [], selected: 0, finished: 1,
            partner: '', p_id: undefined,
            matches: [], subscores: [],
          },
        ],
        bestRound: { score: 2 / 3, label: '67%' },
      },
      doubles: {
        current: 15, predicted: 15, elo: 1050,
        score: 30.0, mi: 20, ma: 50, factor: null,
        stats: { nm: 2, nw: 1, ngw: 4, ngp: 8, nsw: 4, nsp: 6, ntw: 0, ntp: 1 },
        results: [],
        bestRound: { score: 0, label: '—' },
      },
      history: [{ l: '2024', s: 10, d: 15, ss: 1150, ds: 1050 }],
      upcoming: {
        singles: [{
          tid: 100, sid: 200, rn: 'R1', cat: 'HE', title: 'TC Test Open',
          planned: '2025-07-01', p_name: '', p_pts: 0, my_pts: 12,
          url: '/t/100', p_id: undefined,
        }],
        doubles: [],
      },
      recent: {
        singles: [
          { title: 'TC Test Open', cat: 'HE', round: 'QF', date: '2025-06-01T10:00:00', win: true, score: '6/3 - 6/4', opp: [{ name: 'Smith J.', rank: 15, user_id: 42 }], partner: '', p_id: undefined },
          { title: '', cat: 'HE', round: undefined, date: '2025-05-15T10:00:00', win: false, score: 'Walk-over', opp: [{ name: 'Doe J.', rank: 20, user_id: 55 }], partner: '', p_id: undefined },
          { title: '', cat: 'HE', round: undefined, date: '2025-05-10T10:00:00', win: true, score: 'Forfait', opp: [{ name: 'Brown K.', rank: 25, user_id: 66 }], partner: '', p_id: undefined },
          { title: '', cat: 'HE', round: undefined, date: '2025-05-05T10:00:00', win: true, score: '6/3 opgave', opp: [{ name: 'Green L.', rank: 30, user_id: 77 }], partner: '', p_id: undefined },
        ],
        doubles: [
          { title: 'TC Dubbel Open', cat: 'HD', round: 'SF', date: '2025-04-20T10:00:00', win: false, score: '3/6 - 4/6', opp: [{ name: 'Adams P.', rank: 20, user_id: 88 }, { name: 'Baker Q.', rank: 25, user_id: 99 }], partner: 'Partner R.', p_id: 77 },
        ],
      },
    });
  });

  it('falls back to empty arrays when activity and activity_recent are absent', () => {
    const minimal: RawPlayerData = {
      ...rawPlayerFixture,
      activity: undefined,
      activity_recent: undefined,
    };
    const result = transform(minimal);
    expect(result.upcoming).toEqual({ singles: [], doubles: [] });
    expect(result.recent).toEqual({ singles: [], doubles: [] });
  });
});
