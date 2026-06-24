import { useState } from 'react';
import styled from '@emotion/styled';
import type { UIDisc } from '../types';
import { fmtNum, RANK_TIERS } from '../utils';
const WINDOW_SIZE = 5;

const PtsSuffix = styled.span`
  @media (max-width: 480px) { display: none; }
`;

const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin-top: 14px;
  background: transparent;
  border: none;
  border-top: 1px solid var(--border-subtle);
  padding-top: 13px;
  cursor: pointer;
  font-family: 'Archivo', sans-serif;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const Chevron = styled.span<{ open: boolean }>`
  display: inline-block;
  transition: transform 0.18s;
  transform: ${p => p.open ? 'rotate(180deg)' : 'none'};
  font-size: 9px;
`;

const Body = styled.div`
  margin-top: 13px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormulaLine = styled.div`
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--text-secondary);
`;

const SubLine = styled.div`
  font-size: 12.5px;
  color: var(--text-secondary);
`;

const BarWrap = styled.div`
  position: relative;
  height: 66px;
  margin-top: 6px;
`;

const BarTrack = styled.div`
  position: absolute;
  left: 0; right: 0; top: 33px;
  height: 8px;
  border-radius: 4px;
  background: var(--bg-track);
`;

interface Props { disc: UIDisc; color: string; altColor: string; }

export function PredictionPanel({ disc, color, altColor }: Props) {
  const [open, setOpen] = useState(false);

  const sel = disc.results.filter(r => r.selected === 1 && r.score > 0).map(r => r.score);
  const avg = sel.length ? sel.reduce((a, b) => a + b, 0) / sel.length : 0;
  if (avg <= 0) return null;

  const factor = disc.factor != null ? disc.factor : (avg ? disc.score / avg : 0);
  const range = disc.ma - disc.mi;
  const within = range > 0 ? Math.max(0, Math.min(1, (disc.score - disc.mi) / range)) : 0;

  const globalPredIdx = RANK_TIERS.indexOf(disc.predicted);
  const globalCurrIdx = RANK_TIERS.indexOf(disc.current);
  const safeCurrentIdx = globalCurrIdx >= 0 ? globalCurrIdx : 0;
  const safePredIdx = globalPredIdx >= 0 ? globalPredIdx : 0;

  const betterIdx = Math.min(safeCurrentIdx, safePredIdx);
  const worseIdx = Math.max(safeCurrentIdx, safePredIdx);
  const rawStart = Math.max(0, betterIdx - 1);
  const rawEnd = Math.min(RANK_TIERS.length - 1, worseIdx + 1);
  const rawSize = rawEnd - rawStart + 1;
  let windowStart = rawStart;
  let windowEnd = rawEnd;
  if (rawSize < WINDOW_SIZE) {
    const extra = WINDOW_SIZE - rawSize;
    windowStart = Math.max(0, rawStart - Math.floor(extra / 2));
    windowEnd = Math.min(RANK_TIERS.length - 1, rawEnd + Math.ceil(extra / 2));
    const actual = windowEnd - windowStart + 1;
    if (actual < WINDOW_SIZE) {
      if (windowStart === 0) windowEnd = Math.min(RANK_TIERS.length - 1, windowEnd + WINDOW_SIZE - actual);
      else windowStart = Math.max(0, windowStart - (WINDOW_SIZE - actual));
    }
  }
  const TIERS = RANK_TIERS.slice(windowStart, windowEnd + 1);
  const idx = Math.max(0, safePredIdx - windowStart);
  const gap = 100 / (TIERS.length - 1);
  const fillPct = Math.min(100, idx * gap + within * gap);

  const mono = { fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 };

  return (
    <>
      <ToggleBtn type="button" onClick={() => setOpen(o => !o)} style={{ color }}>
        {open ? 'Berekening verbergen' : 'Hoe het berekend wordt'}
        <Chevron open={open}>▾</Chevron>
      </ToggleBtn>

      {open && (
        <Body>
          <FormulaLine>
            <span style={{ color: 'var(--text-muted)' }}>Rankingscore </span>
            <span style={{ ...mono, color }}>{fmtNum(disc.score)}</span>
            <span style={{ color: 'var(--text-muted)' }}> = </span>
            <span style={{ ...mono, color: altColor }}>{Math.round(factor * 100)}%</span>
            <span style={{ color: 'var(--text-muted)' }}> · </span>
            <span style={{ ...mono, color }}>{fmtNum(avg)}</span>
          </FormulaLine>
          <SubLine>
            <span style={{ ...mono, color: altColor }}>{Math.round(factor * 100)}%</span>
            <span style={{ color: 'var(--text-muted)' }}> — weging voor {sel.length} {sel.length === 1 ? 'resultaat' : 'resultaten'} met punten</span>
          </SubLine>
          <SubLine>
            <span style={{ ...mono, color }}>{fmtNum(avg)}</span>
            <span style={{ color: 'var(--text-muted)' }}> = ( </span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--text-primary)' }}>{sel.map(fmtNum).join(' + ')}</span>
            <span style={{ color: 'var(--text-muted)' }}> ) / {sel.length}</span>
          </SubLine>

          <BarWrap>
            <BarTrack />
            <div style={{ position: 'absolute', left: 0, top: 33, height: 8, borderRadius: 4, background: color, width: `${fillPct.toFixed(1)}%` }} />
            {TIERS.map((t, i) => {
              const tx = i === 0 ? '0' : i === TIERS.length - 1 ? '-100%' : '-50%';
              const on = i <= idx;
              return (
                <div key={t} style={{ position: 'absolute', top: 0, left: `${i * gap}%`, transform: `translateX(${tx})`, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, whiteSpace: 'nowrap', background: on ? 'var(--rank-chip-active-bg)' : 'var(--rank-chip-inactive-bg)', color: on ? 'var(--rank-chip-active-text)' : 'var(--rank-chip-inactive-text)' }}>
                  {t}<PtsSuffix> pts</PtsSuffix>
                </div>
              );
            })}
            <div style={{ position: 'absolute', top: 17, left: `${Math.min(96, fillPct).toFixed(1)}%`, transform: 'translateX(-50%)', fontFamily: "'JetBrains Mono',monospace", fontSize: '10.5px', fontWeight: 700, color, background: 'var(--bg-card)', padding: '0 4px' }}>
              {Math.round(within * 100)}%
            </div>
            <div style={{ position: 'absolute', top: 46, left: `${idx * gap}%`, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text-muted)' }}>{fmtNum(disc.mi)}</div>
            <div style={{ position: 'absolute', top: 46, left: `${Math.min(100, (idx + 1) * gap)}%`, transform: 'translateX(-50%)', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600, color }}>{fmtNum(disc.ma)}</div>
          </BarWrap>
        </Body>
      )}
    </>
  );
}
