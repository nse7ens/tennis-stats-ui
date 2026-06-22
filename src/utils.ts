export const RANK_TIERS = [3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115];

export const WIN_GREEN = '#1f9d55';
export const LOSS_RED = '#d6453d';

export const fmtNum = (n: number) => (n % 1 === 0 ? String(n) : n.toFixed(1));

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const fmtDate = (iso: string) => {
  const dt = new Date(iso);
  if (isNaN(dt.getTime())) return '';
  return `${dt.getDate()} ${MONTHS[dt.getMonth()]}`;
};

export const pct = (a: number, b: number) => (b ? Math.round(a / b * 100) : 0);

export const hexA = (hex: string, a: number): string => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export const SEASONS = [
  { tag: 'dec2022', label: 'Winterberekening 2023', start: 2022.5 },
  { tag: 'jun2023', label: 'Zomerberekening 2023',  start: 2023   },
  { tag: 'oct2023', label: 'Winterberekening 2024', start: 2023.5 },
  { tag: 'may2024', label: 'Zomerberekening 2024',  start: 2024   },
  { tag: 'oct2024', label: 'Winterberekening 2025', start: 2024.5 },
  { tag: 'may2025', label: 'Zomerberekening 2025',  start: 2025   },
  { tag: 'oct2025', label: 'Winterberekening 2026', start: 2025.5 },
  { tag: 'may2026', label: 'Zomerberekening 2026',  start: 2026   },
] as const;

export type SeasonTag = typeof SEASONS[number]['tag'];
export const DEFAULT_SEASON: SeasonTag = 'may2026';
