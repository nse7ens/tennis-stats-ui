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
