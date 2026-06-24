import styled from '@emotion/styled';
import type { UIDisc } from '../types';
import { pct } from '../utils';

const Card = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: clamp(18px, 3vw, 26px);
`;

const Kicker = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 600;
`;

const Title = styled.h2`
  margin: 4px 0 14px;
  font-size: clamp(18px, 2.6vw, 23px);
  font-weight: 700;
`;

const MetricsTable = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 4px 6px;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
`;

const MetricRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 4px;
  border-top: 1px solid var(--border-subtle);
`;

const MetricName = styled.span`
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
`;

const MetricVal = styled.span<{ color: string }>`
  width: 62px;
  text-align: right;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
  font-weight: 600;
  color: ${p => p.color};
`;

const CX = 155, CY = 150, R = 100, N = 5;
const ang = (i: number) => -Math.PI / 2 + i * 2 * Math.PI / N;
const pt = (i: number, v: number) => [
  (CX + R * v * Math.cos(ang(i))).toFixed(1),
  (CY + R * v * Math.sin(ang(i))).toFixed(1),
];

interface Props { singles: UIDisc; doubles: UIDisc; }

export function RadarChart({ singles, doubles }: Props) {
  const S = singles.stats, D = doubles.stats;

  const safeDiv = (a: number, b: number) => b ? a / b : 0;

  const axes = [
    { t: 'Match gew.', sv: safeDiv(S.nw, S.nm),   dv: safeDiv(D.nw, D.nm) },
    { t: 'Set gew.',   sv: safeDiv(S.nsw, S.nsp), dv: safeDiv(D.nsw, D.nsp) },
    { t: 'Game gew.',  sv: safeDiv(S.ngw, S.ngp), dv: safeDiv(D.ngw, D.ngp) },
    { t: 'Gem. prestatie', sv: singles.bestRound.score, dv: doubles.bestRound.score },
    { t: 'ELO',       sv: Math.min(1, singles.elo / 50), dv: Math.min(1, doubles.elo / 50) },
  ];

  const metricRows = [
    { t: 'Match gew.',    s: pct(S.nw, S.nm) + '%',   d: pct(D.nw, D.nm) + '%' },
    { t: 'Set gew.',      s: pct(S.nsw, S.nsp) + '%',  d: pct(D.nsw, D.nsp) + '%' },
    { t: 'Game gew.',     s: pct(S.ngw, S.ngp) + '%',  d: pct(D.ngw, D.ngp) + '%' },
    { t: 'Gem. prestatie',    s: singles.bestRound.label,    d: doubles.bestRound.label },
    { t: 'ELO',           s: String(singles.elo),        d: String(doubles.elo) },
  ];

  const poly = (key: 'sv' | 'dv') =>
    axes.map((a, i) => pt(i, Math.max(0.02, Math.min(1, a[key]))).join(',')).join(' ');
  const rings = [0.25, 0.5, 0.75, 1].map(r => axes.map((_, i) => pt(i, r).join(',')).join(' '));
  const svgAxes = axes.map((_, i) => { const e = pt(i, 1); return { x2: e[0], y2: e[1] }; });
  const labels = axes.map((a, i) => {
    const l = pt(i, 1.21);
    const lx = parseFloat(l[0]);
    return { x: l[0], y: l[1], t: a.t, anchor: Math.abs(lx - CX) < 6 ? 'middle' : lx > CX ? 'start' : 'end' };
  });

  return (
    <Card>
      <Kicker>Statistieken</Kicker>
      <Title>Prestatieprofiel</Title>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg viewBox="0 0 310 305" style={{ width: '100%', maxWidth: 340, height: 'auto' }}>
          {rings.map((r, i) => <polygon key={i} points={r} fill="none" style={{ stroke: 'var(--chart-ring)' }} strokeWidth={1} />)}
          {svgAxes.map((a, i) => <line key={i} x1={CX} y1={CY} x2={a.x2} y2={a.y2} style={{ stroke: 'var(--chart-axis)' }} strokeWidth={1} />)}
          <polygon points={poly('dv')} style={{ fill: 'rgba(var(--accent-doubles-rgb), 0.13)', stroke: 'var(--accent-doubles)' }} strokeWidth={2} strokeLinejoin="round" />
          <polygon points={poly('sv')} style={{ fill: 'rgba(var(--accent-singles-rgb), 0.14)', stroke: 'var(--accent-singles)' }} strokeWidth={2} strokeLinejoin="round" />
          {labels.map((lb, i) => (
            <text key={i} x={lb.x} y={lb.y} textAnchor={lb.anchor as 'middle' | 'start' | 'end'} dominantBaseline="middle" fontSize={11} fontWeight={600} style={{ fill: 'var(--text-tertiary)' }} fontFamily="Archivo, sans-serif">{lb.t}</text>
          ))}
        </svg>
      </div>
      <MetricsTable>
        <MetricHeader>
          <span style={{ flex: 1 }}>Metriek</span>
          <MetricVal color="var(--accent-singles)">Enkel</MetricVal>
          <MetricVal color="var(--accent-doubles)">Dubbel</MetricVal>
        </MetricHeader>
        {metricRows.map(m => (
          <MetricRow key={m.t}>
            <MetricName>{m.t}</MetricName>
            <MetricVal color="var(--accent-singles)">{m.s}</MetricVal>
            <MetricVal color="var(--accent-doubles)">{m.d}</MetricVal>
          </MetricRow>
        ))}
      </MetricsTable>
    </Card>
  );
}
