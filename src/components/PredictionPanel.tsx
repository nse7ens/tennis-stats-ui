import { useState } from 'react';
import styled from '@emotion/styled';
import type { UIDisc } from '../types';
import { fmtNum } from '../utils';

const TIERS = [30, 35, 40, 45, 50];

const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin-top: 14px;
  background: transparent;
  border: none;
  border-top: 1px solid #eeeee7;
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
  color: #54544c;
`;

const SubLine = styled.div`
  font-size: 12.5px;
  color: #54544c;
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
  background: #e8e8e0;
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
  const gap = 100 / (TIERS.length - 1);
  const idx = Math.max(0, TIERS.indexOf(disc.current));
  const fillPct = Math.min(100, idx * gap + within * gap);

  const mono = { fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 };

  return (
    <>
      <ToggleBtn onClick={() => setOpen(o => !o)} style={{ color }}>
        {open ? 'Hide calculation' : "How it's calculated"}
        <Chevron open={open}>▾</Chevron>
      </ToggleBtn>

      {open && (
        <Body>
          <FormulaLine>
            <span style={{ color: '#8b8b80' }}>Ranking score </span>
            <span style={{ ...mono, color }}>{fmtNum(disc.score)}</span>
            <span style={{ color: '#8b8b80' }}> = </span>
            <span style={{ ...mono, color: altColor }}>{Math.round(factor * 100)}%</span>
            <span style={{ color: '#8b8b80' }}> · </span>
            <span style={{ ...mono, color }}>{fmtNum(avg)}</span>
          </FormulaLine>
          <SubLine>
            <span style={{ ...mono, color: altColor }}>{Math.round(factor * 100)}%</span>
            <span style={{ color: '#8b8b80' }}> — weighting for {sel.length} result{sel.length === 1 ? '' : 's'} with points</span>
          </SubLine>
          <SubLine>
            <span style={{ ...mono, color }}>{fmtNum(avg)}</span>
            <span style={{ color: '#8b8b80' }}> = ( </span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", color: '#1a1a17' }}>{sel.map(fmtNum).join(' + ')}</span>
            <span style={{ color: '#8b8b80' }}> ) / {sel.length}</span>
          </SubLine>

          <BarWrap>
            <BarTrack />
            <div style={{ position: 'absolute', left: 0, top: 33, height: 8, borderRadius: 4, background: color, width: `${fillPct.toFixed(1)}%` }} />
            {TIERS.map((t, i) => {
              const tx = i === 0 ? '0' : i === TIERS.length - 1 ? '-100%' : '-50%';
              const on = i <= idx;
              return (
                <div key={t} style={{ position: 'absolute', top: 0, left: `${i * gap}%`, transform: `translateX(${tx})`, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, whiteSpace: 'nowrap', background: on ? '#23456f' : '#e3ebf8', color: on ? '#fff' : '#7d97c6' }}>
                  {t} pts
                </div>
              );
            })}
            <div style={{ position: 'absolute', top: 17, left: `${Math.min(96, fillPct).toFixed(1)}%`, transform: 'translateX(-50%)', fontFamily: "'JetBrains Mono',monospace", fontSize: '10.5px', fontWeight: 700, color, background: '#fff', padding: '0 4px' }}>
              {Math.round(within * 100)}%
            </div>
            <div style={{ position: 'absolute', top: 46, left: `${idx * gap}%`, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#9a9a90' }}>{fmtNum(disc.mi)}</div>
            <div style={{ position: 'absolute', top: 46, left: `${Math.min(100, (idx + 1) * gap)}%`, transform: 'translateX(-50%)', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600, color }}>{fmtNum(disc.ma)}</div>
          </BarWrap>
        </Body>
      )}
    </>
  );
}
