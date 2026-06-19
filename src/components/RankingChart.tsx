import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import type { UIHistoryEntry } from '../types';
import { useTheme } from '../theme';
import { RANK_TIERS } from '../utils';

const Section = styled.section`
  background: #fff;
  border: 1px solid #e6e6df;
  border-radius: 18px;
  padding: clamp(13px, 2.2vw, 18px) clamp(14px, 2.4vw, 20px);
`;

const ChartHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 14px;
`;

const Kicker = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9a9a90;
  font-weight: 600;
`;

const Title = styled.h2`
  margin: 4px 0 0;
  font-weight: 700;
  letter-spacing: -0.01em;
  font-size: clamp(15px, 2vw, 18px);
`;

const Legend = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  color: #54544c;
  font-weight: 600;
`;

const ScrollWrap = styled.div`
  overflow-x: auto;
`;

const ChartWrap = styled.div`
  position: relative;
  width: 100%;
  min-width: 480px;
`;

const W = 1000, PAD_L = 44, PAD_R = 70, PAD_T = 30, PAD_B = 40, Ht = 240;
const pw = W - PAD_L - PAD_R, ph = Ht - PAD_T - PAD_B;


interface Props { history: UIHistoryEntry[]; }

export function RankingChart({ history }: Props) {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, []);
  const n = history.length;

  const maxRank = Math.max(...history.map(h => Math.max(h.s ?? 0, h.d ?? 0)));
  const nextIdx = RANK_TIERS.findIndex(t => t > maxRank);
  const Y_MAX = nextIdx >= 0 ? RANK_TIERS[nextIdx] : RANK_TIERS[RANK_TIERS.length - 1];

  const gridStep = Y_MAX <= 40 ? 10 : Y_MAX <= 80 ? 20 : 25;
  const gridLines: number[] = [];
  for (let v = 0; v <= Y_MAX; v += gridStep) gridLines.push(v);
  if (gridLines[gridLines.length - 1] < Y_MAX) gridLines.push(Y_MAX);

  const xAt = (i: number) => n < 2 ? PAD_L + pw / 2 : PAD_L + (i * pw / (n - 1));
  const yAt = (v: number) => PAD_T + (1 - v / Y_MAX) * ph;

  const sP = history.map((h, i) => ({ x: xAt(i), y: yAt(h.s), v: h.s }));
  const dP = history.map((h, i) => ({ x: xAt(i), y: yAt(h.d), v: h.d }));

  let lastSolid = 0;
  history.forEach((h, i) => { if (!h.p) lastSolid = i; });

  const path = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const seg = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    `M${a.x.toFixed(1)} ${a.y.toFixed(1)} L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;

  const pX = (x: number) => `${(x / W * 100).toFixed(2)}%`;
  const pY = (y: number) => `${(y / Ht * 100).toFixed(2)}%`;
  const halo = '0 1px 2px #fff,0 -1px 2px #fff,1px 0 2px #fff,-1px 0 2px #fff';
  const monoBase = { fontFamily: "'JetBrains Mono',monospace", whiteSpace: 'nowrap' as const, position: 'absolute' as const, transform: 'translate(-50%,-50%)' };

  const yearLabels = history.filter(h => h.l !== '').map(h => String(h.l));
  const firstYear = yearLabels[0] ?? '';
  const lastYear = yearLabels[yearLabels.length - 1] ?? '';
  const kickerRange = firstYear && lastYear ? `${firstYear} — ${lastYear}` : 'Ranking evolution';

  return (
    <Section>
      <ChartHeader>
        <div>
          <Kicker>{kickerRange}</Kicker>
          <Title>Ranking evolution</Title>
        </div>
        <Legend>
          <LegendItem><span style={{ width: 22, height: 3, borderRadius: 2, background: theme.singles, display: 'inline-block' }} />Singles</LegendItem>
          <LegendItem><span style={{ width: 22, height: 3, borderRadius: 2, background: theme.doubles, display: 'inline-block' }} />Doubles</LegendItem>
          <LegendItem><span style={{ width: 22, height: 0, borderTop: '2px dashed #b7b7ad', display: 'inline-block' }} />Predicted</LegendItem>
        </Legend>
      </ChartHeader>
      <ScrollWrap ref={scrollRef}>
        <ChartWrap>
          <svg viewBox={`0 0 ${W} ${Ht}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            {gridLines.map(v => <line key={v} x1={PAD_L} y1={yAt(v)} x2={W - PAD_R} y2={yAt(v)} stroke="#ededdf" strokeWidth={1} />)}
            {history.map((h, i) => h.l !== '' ? <line key={i} x1={xAt(i)} y1={PAD_T} x2={xAt(i)} y2={PAD_T + ph} stroke="#f4f4ea" strokeWidth={1} /> : null)}
            {history[n - 1]?.p && (
              <>
                <path d={seg(dP[lastSolid], dP[n - 1])} fill="none" stroke={theme.doubles} strokeWidth={1.4} strokeDasharray="2 7" strokeLinecap="round" />
                <path d={seg(sP[lastSolid], sP[n - 1])} fill="none" stroke={theme.singles} strokeWidth={1.4} strokeDasharray="2 7" strokeLinecap="round" />
              </>
            )}
            <path d={path(dP.slice(0, lastSolid + 1))} fill="none" stroke={theme.doubles} strokeWidth={1.7} strokeLinejoin="round" strokeLinecap="round" />
            <path d={path(sP.slice(0, lastSolid + 1))} fill="none" stroke={theme.singles} strokeWidth={1.7} strokeLinejoin="round" strokeLinecap="round" />
            {dP.slice(0, lastSolid + 1).map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.4} fill={theme.doubles} />)}
            {sP.slice(0, lastSolid + 1).map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.4} fill={theme.singles} />)}
            <circle cx={dP[n - 1].x} cy={dP[n - 1].y} r={3.2} fill="#fff" stroke={theme.doubles} strokeWidth={1.4} />
            <circle cx={sP[n - 1].x} cy={sP[n - 1].y} r={3.2} fill="#fff" stroke={theme.singles} strokeWidth={1.4} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {gridLines.map(v => (
              <div key={v} style={{ ...monoBase, left: pX(PAD_L - 9), top: pY(yAt(v)), fontSize: '11.5px', color: '#aeaea4' }}>{v}</div>
            ))}
            {history.map((h, i) => h.l !== '' ? (
              <div key={i} style={{ ...monoBase, left: pX(xAt(i)), top: pY(Ht - 11), fontSize: '12.5px', fontWeight: 600, color: '#8b8b80' }}>{h.l}</div>
            ) : null)}
            {sP.map((p, i) => {
              const above = p.v >= dP[i].v;
              return <div key={i} style={{ ...monoBase, left: pX(p.x), top: pY(p.y + (above ? -9 : 16)), fontSize: '12.5px', fontWeight: 700, color: theme.singles, textShadow: halo }}>{p.v}</div>;
            })}
            {dP.map((p, i) => {
              const sAbove = sP[i].v >= p.v;
              return <div key={i} style={{ ...monoBase, left: pX(p.x), top: pY(p.y + (sAbove ? 16 : -9)), fontSize: '12.5px', fontWeight: 700, color: theme.doubles, textShadow: halo }}>{p.v}</div>;
            })}
          </div>
        </ChartWrap>
      </ScrollWrap>
    </Section>
  );
}
