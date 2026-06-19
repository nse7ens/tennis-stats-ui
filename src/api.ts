import type {
  UIPlayerData, UIDisc, UIResult, UIMatch, UIRecentMatch, UIUpcomingMatch,
  RawPlayerData, RawDisc, RawResult, RawMatch, RawRecentMatch, RawUpcomingMatch
} from './types';

const STATIC_DATA: UIPlayerData = {
  player: { name: "Sevens Nick", club: "T.C. LEIEMEERS V.Z.W." },
  singles: {
    current: 35, predicted: 30, elo: 39.9, score: 137.13,
    mi: 109.54, ma: 137.33, factor: 0.84,
    stats: { nm: 7, nw: 3, ngw: 67, ngp: 145, nsw: 6, nsp: 17, ntw: 1, ntp: 4 },
    results: [
      {
        title: "Interclub", series: "eic", subtitle: "2/3 matchen gewonnen",
        score: 164, selected: 1, WL: ["W","W","L"], partner: "",
        subscores: [
          { title: "Mangelinckx Mitchel (30)", score: 164, literal: ["40%", "205"] },
          { title: "Depraetere Arnaud (30)", score: 164, literal: ["40%", "205"] }
        ],
        matches: [
          { round: "Interclub H4", score: "7/6 (5) - 6/7 (6) - 6/0", did_win: 1, opp: [{ name: "Mangelinckx Mitchel", rank: 30 }] },
          { round: "Interclub H4", score: "6/7 (6) - 6/4 - 6/2", did_win: 1, opp: [{ name: "Depraetere Arnaud", rank: 30 }] },
          { round: "Interclub H4", score: "6/1 - 6/2", did_win: 0, opp: [{ name: "Henri Decruy", rank: 35 }] }
        ]
      },
      {
        title: "TENNIS- EN PADELCLUB D'HOEVE", series: "eh4",
        subtitle: "1/4 finale kwalificatie • 21 jun 2026",
        score: 162.5, selected: 1, WL: ["W","L","G","G","G"], partner: "",
        subscores: [
          { title: "Bereikte ronde", score: 123.5, literal: ["95%", 130] },
          { title: "Punten tegenstanders", score: 35, literal: null },
          { title: "Punten aantal matchen", score: 4, literal: null }
        ],
        matches: [
          { round: "1/8 finale kwalificatie", score: "5/7 - 5/1 opgave", did_win: 1, opp: [{ name: "Vanhoutte Brecht", rank: 35 }] },
          { round: "1/4 finale kwalificatie", score: "6/1 - 6/3", did_win: 0, opp: [{ name: "Decoutere Timon", rank: 40 }] }
        ]
      },
      {
        title: "TP RUMBEKE", series: "eh35/4",
        subtitle: "1/4 finale kwalificatie • 28 dec 2025",
        score: 0, selected: 0, WL: ["L","G","G","G"], partner: "",
        subscores: [
          { title: "Bereikte ronde", score: 0, literal: ["95%", 0] },
          { title: "Punten tegenstanders", score: 0, literal: null },
          { title: "Punten aantal matchen", score: 0, literal: null }
        ],
        matches: [
          { round: "1/4 finale kwalificatie", score: "6/4 - 2/6 - 7/6 (7)", did_win: 0, opp: [{ name: "Vanneste David", rank: 40 }] }
        ]
      },
      {
        title: "TENNIS- EN PADELCLUB D'HOEVE", series: "eh35/4",
        subtitle: "1/4 finale • 21 jun 2026",
        score: 0, selected: 0, WL: ["L","G","G"], partner: "",
        subscores: [
          { title: "Bereikte ronde", score: 0, literal: ["90%", 0] },
          { title: "Punten tegenstanders", score: 0, literal: null },
          { title: "Punten aantal matchen", score: 0, literal: null }
        ],
        matches: [
          { round: "1/4 finale", score: "6/2 - 6/1", did_win: 0, opp: [{ name: "Lybeer Johan", rank: 50 }] }
        ]
      }
    ]
  },
  doubles: {
    current: 35, predicted: 35, elo: 34, score: 9,
    mi: 5, ma: 40, factor: null,
    stats: { nm: 9, nw: 4, ngw: 93, ngp: 156, nsw: 11, nsp: 21, ntw: 1, ntp: 5 },
    results: [
      {
        title: "HAPPY WAREGEM TENNIS & PADEL", series: "dh5",
        subtitle: "finale • 25 jan 2026",
        score: 9, selected: 1, WL: ["W","W","W","W","L"],
        partner: "Vandenbussche Jeroen",
        subscores: [{ title: "Bereikte ronde", score: 9, literal: null }],
        matches: [
          { round: "1/16 finale", score: "6/2 - 6/0", did_win: 1, opp: [{ name: "Vandorpe Steve", rank: 50 }, { name: "Vanhoutte Jenko", rank: 3 }] },
          { round: "1/8 finale", score: "6/3 - 6/1", did_win: 1, opp: [{ name: "Baeke Cedric", rank: 40 }, { name: "Hiels Jan", rank: 20 }] },
          { round: "1/4 finale", score: "6/1 - 6/0", did_win: 1, opp: [{ name: "Deprez Nicola", rank: 10 }, { name: "Vanwynsberghe Nicolas", rank: 25 }] },
          { round: "1/2 finale", score: "6/0 - 6/1", did_win: 1, opp: [{ name: "Maertens Frederik", rank: 15 }, { name: "Viaene Dieter", rank: 35 }] },
          { round: "finale", score: "6/0 - 6/3", did_win: 0, opp: [{ name: "Boucique Gunter", rank: 20 }, { name: "Moerenhout Matthieu", rank: 40 }] }
        ]
      },
      {
        title: "TC DE WATERTOREN", series: "dh5", subtitle: "1/8 finale • 7 dec 2025",
        score: 0, selected: 0, WL: ["L","G","G","G"], partner: "Vandenbussche Jeroen",
        subscores: [{ title: "Bereikte ronde", score: 0, literal: null }],
        matches: [
          { round: "1/8 finale", score: "6/4 - 7/5", did_win: 0, opp: [{ name: "Tack Jurgen", rank: 25 }, { name: "Vansteenkiste Bart", rank: 30 }] }
        ]
      },
      {
        title: "TP RUMBEKE", series: "dh5", subtitle: "1/16 finale • 1 feb 2026",
        score: 0, selected: 0, WL: ["L","G","G","G","G"], partner: "Vandenbussche Jeroen",
        subscores: [{ title: "Bereikte ronde", score: 0, literal: null }],
        matches: [
          { round: "1/16 finale", score: "7/6 (3) - 2/6 - 10/8", did_win: 0, opp: [{ name: "Paepe Jelle", rank: 40 }, { name: "Soenen Hans", rank: 15 }] }
        ]
      },
      {
        title: "K.G.T.C. ZWEVEGEM", series: "dh5", subtitle: "1/8 finale • 8 mrt 2026",
        score: 0, selected: 0, WL: ["L","G","G","G"], partner: "Vandenbussche Jeroen",
        subscores: [{ title: "Bereikte ronde", score: 0, literal: null }],
        matches: [
          { round: "1/8 finale", score: "6/7 (8) - 7/5 - 10/8", did_win: 0, opp: [{ name: "Craeynest Tom", rank: 50 }, { name: "Van Tieghem Jan", rank: 10 }] }
        ]
      },
      {
        title: "T.C. BOSTERHOUT", series: "dh5", subtitle: "1/16 finale • 28 mrt 2026",
        score: 0, selected: 0, WL: ["L","G","G","G","G"], partner: "Vandenbussche Jeroen",
        subscores: [{ title: "Bereikte ronde", score: 0, literal: null }],
        matches: [
          { round: "1/16 finale", score: "2/6 - 6/3 - 10/6", did_win: 0, opp: [{ name: "Declercq Frederik", rank: 15 }, { name: "Vanneste David", rank: 45 }] }
        ]
      }
    ]
  },
  history: [
    { l: 2023, s: 3,  d: 3,  ss: 6,  ds: 3  },
    { l: 2024, s: 10, d: 10, ss: 13, ds: 14 },
    { l: "",   s: 10, d: 15, ss: 16, ds: 16 },
    { l: 2025, s: 20, d: 20, ss: 23, ds: 28 },
    { l: "",   s: 15, d: 20, ss: 33, ds: 22 },
    { l: 2026, s: 35, d: 35, ss: 40, ds: 34 },
    { l: "",   s: 35, d: 35, ss: 40, ds: 34 },
    { l: 2027, s: 30, d: 35, p: true }
  ],
  upcoming: {
    singles: [],
    doubles: [{
      tid: 138783, sid: 736046, rn: "1/8 finale", cat: "dh5",
      title: "T.C. GAVERKASTEEL", p_name: "Muylle Louis",
      my_pts: 35, p_pts: 25,
      url: "https://www.tennisenpadelvlaanderen.be/tornooi-poule-tabel?reeksId=736046&tornooiId=138783"
    }]
  },
  recent: {
    singles: [
      { title: "TENNIS- EN PADELCLUB D'HOEVE", cat: "eh35/4", round: "1/4 finale", date: "2026-06-16T20:12:48", win: false, score: "6/2 - 6/1", opp: [{ name: "Lybeer Johan", rank: 50 }], partner: "" },
      { title: "TENNIS- EN PADELCLUB D'HOEVE", cat: "eh4", round: "1/4 finale kwalificatie", date: "2026-06-14T20:13:13", win: false, score: "6/1 - 6/3", opp: [{ name: "Decoutere Timon", rank: 40 }], partner: "" },
      { title: "TENNIS- EN PADELCLUB D'HOEVE", cat: "eh4", round: "1/8 finale kwalificatie", date: "2026-06-13T12:34:09", win: true, score: "5/7 - 5/1", opp: [{ name: "Vanhoutte Brecht", rank: 35 }], partner: "" },
      { title: "INTERCLUB", cat: "ih4", date: "2026-05-31T00:00:00", win: false, score: "6/1 - 6/2", opp: [{ name: "Henri Decruy", rank: 35 }], partner: "" },
      { title: "INTERCLUB", cat: "ih4", date: "2026-05-24T00:00:00", win: true, score: "7/6 (5) - 6/7 (6) - 6/0", opp: [{ name: "Mangelinckx Mitchel", rank: 30 }], partner: "" },
      { title: "INTERCLUB", cat: "ih4", date: "2026-05-17T00:00:00", win: true, score: "6/7 (6) - 6/4 - 6/2", opp: [{ name: "Depraetere Arnaud", rank: 30 }], partner: "" },
      { title: "TP RUMBEKE", cat: "eh35/4", round: "1/4 finale kwalificatie", date: "2025-12-28T17:59:23", win: false, score: "6/4 - 2/6 - 7/6 (7)", opp: [{ name: "Vanneste David", rank: 40 }], partner: "" }
    ],
    doubles: [
      { title: "T.C. BOSTERHOUT", cat: "dh5", round: "1/16 finale", date: "2026-03-28T15:29:01", win: false, score: "2/6 - 6/3 - 10/6", opp: [{ name: "Declercq Frederik", rank: 15 }, { name: "Vanneste David", rank: 45 }], partner: "Vandenbussche Jeroen" },
      { title: "K.G.T.C. ZWEVEGEM", cat: "dh5", round: "1/8 finale", date: "2026-03-08T16:10:25", win: false, score: "6/7 (8) - 7/5 - 10/8", opp: [{ name: "Craeynest Tom", rank: 50 }, { name: "Van Tieghem Jan", rank: 10 }], partner: "Vandenbussche Jeroen" },
      { title: "TP RUMBEKE", cat: "dh5", round: "1/16 finale", date: "2026-02-02T00:00:00", win: false, score: "7/6 (3) - 2/6 - 10/8", opp: [{ name: "Paepe Jelle", rank: 40 }, { name: "Soenen Hans", rank: 15 }], partner: "Vandenbussche Jeroen" },
      { title: "HAPPY WAREGEM TENNIS & PADEL", cat: "dh5", round: "1/8 finale", date: "2026-01-26T00:00:00", win: true, score: "6/3 - 6/1", opp: [{ name: "Baeke Cedric", rank: 40 }, { name: "Hiels Jan", rank: 20 }], partner: "Vandenbussche Jeroen" },
      { title: "HAPPY WAREGEM TENNIS & PADEL", cat: "dh5", round: "1/2 finale", date: "2026-01-26T00:00:00", win: true, score: "6/0 - 6/1", opp: [{ name: "Maertens Frederik", rank: 15 }, { name: "Viaene Dieter", rank: 35 }], partner: "Vandenbussche Jeroen" },
      { title: "HAPPY WAREGEM TENNIS & PADEL", cat: "dh5", round: "finale", date: "2026-01-26T00:00:00", win: false, score: "6/0 - 6/3", opp: [{ name: "Boucique Gunter", rank: 20 }, { name: "Moerenhout Matthieu", rank: 40 }], partner: "Vandenbussche Jeroen" },
      { title: "HAPPY WAREGEM TENNIS & PADEL", cat: "dh5", round: "1/16 finale", date: "2026-01-26T00:00:00", win: true, score: "6/2 - 6/0", opp: [{ name: "Vandorpe Steve", rank: 50 }, { name: "Vanhoutte Jenko", rank: 3 }], partner: "Vandenbussche Jeroen" },
      { title: "HAPPY WAREGEM TENNIS & PADEL", cat: "dh5", round: "1/4 finale", date: "2026-01-26T00:00:00", win: true, score: "6/1 - 6/0", opp: [{ name: "Deprez Nicola", rank: 10 }, { name: "Vanwynsberghe Nicolas", rank: 25 }], partner: "Vandenbussche Jeroen" }
    ]
  }
};

function transformMatch(m: RawMatch): UIMatch {
  return { round: m.round, score: m.score, did_win: m.did_win, opp: m.opponents.map(o => ({ name: o.name, rank: o.rank })) };
}

function transformResult(r: RawResult): UIResult {
  return {
    title: r.title, series: r.series, subtitle: r.subtitle,
    score: r.score, WL: r.WL, selected: r.selected, partner: r.p_name ?? '',
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

function fmtSet(set: [number, number, number?]): string {
  return set[2] != null ? `${set[0]}/${set[1]} (${set[2]})` : `${set[0]}/${set[1]}`;
}

function transformRecent(m: RawRecentMatch): UIRecentMatch {
  const sets = ([m.m_score?.set1, m.m_score?.set2, m.m_score?.set3] as Array<[number, number, number?] | undefined>)
    .filter((s): s is [number, number, number?] => s != null)
    .map(fmtSet).join(' - ');
  return { title: '', cat: m.cat, date: m.date, win: (m.m_score?.winner ?? 1) === 0, score: sets, opp: [{ name: m.o_name, rank: m.o_pts }], partner: '' };
}

function transformUpcoming(u: RawUpcomingMatch): UIUpcomingMatch {
  return { tid: u.tid, sid: u.sid, rn: u.rn, cat: u.cat, title: u.title, p_name: u.p_name ?? '', p_pts: u.p_pts ?? 0, my_pts: u.my_pts, url: u.url };
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

export async function fetchPlayer(userId: number): Promise<UIPlayerData> {
  try {
    const res = await fetch(`/api/get_user_report/${userId}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw: RawPlayerData = await res.json();
    return transform(raw);
  } catch {
    return STATIC_DATA;
  }
}
