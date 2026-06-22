export interface RawOpponent { name: string; user_id: number; rank: number; }

export interface RawMatch {
  opponents: RawOpponent[];
  round: string;
  score: string;
  did_win: 0 | 1;
}

export interface RawSubscore {
  title: string;
  score: number;
  literal: [string, number | string] | null;
}

export interface RawResult {
  title: string; series: string; subtitle: string;
  score: number; WL: string[];
  selected: 0 | 1; finished: 0 | 1;
  matches: RawMatch[];
  subscores?: RawSubscore[];
  date?: string; week?: string; participants?: number;
  rn?: string; url?: string; p_name?: string; p_id?: number;
}

export interface RawDisc {
  current_rank: number; predicted_rank: number; elo_rank: number;
  sub_category: string; score: number; mi: number; ma: number;
  score_factor?: number;
  nm: number; nw: number; ngw: number; ngp: number;
  nsw: number; nsp: number; ntw: number; ntp: number;
  results: RawResult[];
}

export interface RawHistoryEntry {
  l: number | string; s: number; d: number;
  ss?: number; ds?: number; p?: boolean;
}

export interface RawMScore {
  winner: number; wo?: boolean; forfait?: boolean; surrender?: boolean;
  set1?: [number, number, number?];
  set2?: [number, number, number?];
  set3?: [number, number, number?];
}

export interface RawRecentMatch {
  m_score?: RawMScore;
  // singles opponent
  o_name?: string; o_pts?: number; o_id?: number; o_name_club?: string;
  // doubles opponents
  o1_name?: string; o1_pts?: number; o1_id?: number;
  o2_name?: string; o2_pts?: number; o2_id?: number;
  // doubles partner
  p_name?: string; p_id?: number; p_pts?: number;
  // common
  rn?: string; title?: string; cat: string; fmt?: string;
  date: string; url?: string; tid?: number; sid?: number;
  my_id?: number; my_pts?: number; my_name?: string;
}

export interface RawUpcomingMatch {
  tid: number; sid: number; rn: string; cat: string; title: string;
  planned: string | null; p_name?: string; p_pts?: number;
  my_id: number; my_pts: number; my_name: string; my_name_club: string;
  p_id?: number; url?: string;
}

export interface RawPlayerData {
  name: string; club: string; user_id: number;
  singles: RawDisc; doubles: RawDisc;
  history: RawHistoryEntry[];
  activity?: { singles?: RawUpcomingMatch[]; doubles?: RawUpcomingMatch[] };
  activity_recent?: { singles?: RawRecentMatch[]; doubles?: RawRecentMatch[] };
  counter?: { report: number };
}

// ---- UI types (used by components) ----

export interface Opponent { name: string; rank: number; user_id?: number; }

export interface UIMatch {
  round: string; score: string; did_win: 0 | 1; opp: Opponent[];
}

export interface UISubscore {
  title: string; score: number; literal: [string, string | number] | null;
}

export interface UIResult {
  title: string; series: string; subtitle: string;
  score: number; WL: string[]; selected: 0 | 1;
  partner: string; p_id?: number; matches: UIMatch[]; subscores: UISubscore[];
}

export interface UIStats {
  nm: number; nw: number; ngw: number; ngp: number;
  nsw: number; nsp: number; ntw: number; ntp: number;
}

export interface UIDisc {
  current: number; predicted: number; elo: number;
  score: number; mi: number; ma: number; factor: number | null;
  stats: UIStats; results: UIResult[];
}

export interface UIHistoryEntry {
  l: number | string; s: number; d: number;
  ss?: number; ds?: number; p?: boolean;
}

export interface UIRecentMatch {
  title: string; cat: string; round?: string; date: string;
  win: boolean; score: string; opp: Opponent[]; partner: string; p_id?: number;
}

export interface UIUpcomingMatch {
  tid: number; sid: number; rn: string; cat: string; title: string;
  planned: string | null;
  p_name: string; p_pts: number; my_pts: number; url?: string; p_id?: number;
}

export interface UIPlayerData {
  player: { name: string; club: string };
  singles: UIDisc; doubles: UIDisc;
  history: UIHistoryEntry[];
  upcoming: { singles: UIUpcomingMatch[]; doubles: UIUpcomingMatch[] };
  recent: { singles: UIRecentMatch[]; doubles: UIRecentMatch[] };
}

export type Disc = 'singles' | 'doubles';

export interface PlayerSearchResult {
  id: number;
  name: string;
  name_club: string;
  singles: number;
  doubles: number;
  category: string;
}
