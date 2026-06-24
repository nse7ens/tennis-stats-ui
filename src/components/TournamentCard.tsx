import { useState } from 'react';
import styled from '@emotion/styled';
import type { UIResult } from '../types';
import { fmtNum, WIN_GREEN, LOSS_RED } from '../utils';
import { MatchRow } from './MatchRow';
import { PlayerLink } from './PlayerLink';

const CardTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
`;

const SeriesChip = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--text-tertiary);
  background: var(--bg-inset);
  padding: 2px 7px;
  border-radius: 5px;
`;

const SubTitle = styled.div`
  font-size: 12.5px;
  color: var(--text-muted);
  margin-top: 3px;
`;

const PointsLabel = styled.div`
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-top: 2px;
`;

const TagBadge = styled.span<{ selected: boolean }>`
  margin-left: 6px;
  font-size: 9.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  color: ${p => p.selected ? 'var(--accent-singles)' : 'var(--text-muted)'};
  background: ${p => p.selected ? 'rgba(var(--accent-singles-rgb), 0.1)' : 'var(--bg-inset)'};
`;

const MatchList = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 13px;
  width: 100%;
  justify-content: center;
  background: transparent;
  border: 1px dashed var(--border-dashed);
  cursor: pointer;
  font-family: 'Archivo', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 8px;
  border-radius: 9px;
`;

const CalcTitle = styled.span`
  font-size: 13px;
  color: var(--text-secondary);
  flex: 1;
  min-width: 0;
`;

interface Props { result: UIResult; }

export function TournamentCard({ result: r }: Props) {
  const [open, setOpen] = useState(false);
  const sel = r.selected === 1;
  const ongoing = r.finished === 0;
  const borderWidth = sel ? '1.5px' : '1px';
  const borderColor = sel ? 'var(--accent-singles)' : 'var(--border)';
  const borderStyle = ongoing ? 'dashed' : 'solid';

  const cardStyle = {
    borderRadius: 16, padding: '18px 18px 16px',
    background: ongoing
      ? 'linear-gradient(to bottom, rgba(217, 119, 6, 0.07) 0%, var(--bg-card) 38%)'
      : 'var(--bg-card)',
    border: `${borderWidth} ${borderStyle} ${borderColor}`,
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' as const }}>
            <CardTitle>{r.title}</CardTitle>
            <SeriesChip>{r.series.toUpperCase()}</SeriesChip>
          </div>
          <SubTitle>{r.partner ? r.subtitle.replace(`met ${r.partner} • `, '') : r.subtitle}</SubTitle>
        </div>
        {sel && r.score > 0 && (
          <div style={{ textAlign: 'right', flex: 'none' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 700, color: 'var(--accent-singles)', lineHeight: 1 }}>{fmtNum(r.score)}</div>
            <PointsLabel>punten</PointsLabel>
          </div>
        )}
      </div>

      {r.partner && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 11, background: 'rgba(var(--accent-doubles-rgb), 0.08)', border: '1px solid rgba(var(--accent-doubles-rgb), 0.28)', padding: '4px 10px', borderRadius: 7 }}>
          <span style={{ fontSize: '9.5px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(var(--accent-doubles-rgb), 0.85)', fontWeight: 600 }}>Met</span>
          {r.p_id != null
            ? <PlayerLink to={`/player/${r.p_id}`} style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--accent-doubles)' }}>{r.partner}</PlayerLink>
            : <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--accent-doubles)' }}>{r.partner}</span>
          }
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 13 }}>
        {r.WL.map((x, i) => (
          <span key={i} style={
            x === 'W' ? { display: 'inline-block', flex: 'none', width: 13, height: 13, borderRadius: '50%', background: WIN_GREEN } :
            x === 'L' ? { display: 'inline-block', flex: 'none', width: 13, height: 13, borderRadius: '50%', background: LOSS_RED } :
            { display: 'inline-block', flex: 'none', width: 9, height: 9, borderRadius: '50%', background: 'transparent', border: '1.5px solid var(--border-dashed)' }
          } />
        ))}
        <TagBadge selected={sel}>
          {sel ? 'Telt mee voor ranking' : 'Niet meegeteld'}
        </TagBadge>
      </div>

      <MatchList>
        {r.matches.map((m, i) => <MatchRow key={i} match={m} />)}
      </MatchList>

      {r.subscores.length > 0 && (
        <>
          <ToggleBtn type="button" onClick={() => setOpen(o => !o)} style={{ color: 'var(--accent-singles)' }}>
            {open ? 'Verberg puntberekening' : 'Hoe worden deze punten berekend'}
            <span style={{ display: 'inline-block', transition: 'transform .18s', transform: open ? 'rotate(180deg)' : 'none', fontSize: 10 }}>▾</span>
          </ToggleBtn>
          {open && (
            <div style={{ marginTop: 11, borderRadius: 11, padding: '13px 14px', background: 'rgba(var(--accent-singles-rgb), 0.04)', border: '1px solid rgba(var(--accent-singles-rgb), 0.18)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 8, borderBottom: '1px solid rgba(var(--accent-singles-rgb), 0.18)' }}>
                <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 700 }}>Puntberekening</span>
                <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--text-faint)' }}>Waarde</span>
              </div>
              {r.subscores.map((ss, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <CalcTitle>{ss.title}</CalcTitle>
                  {ss.literal && (
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 600, color: 'var(--accent-doubles)', background: 'var(--bg-card)', border: '1px solid rgba(var(--accent-doubles-rgb), 0.22)', padding: '2px 8px', borderRadius: 6, whiteSpace: 'nowrap' as const }}>
                      {ss.literal[0]} × {ss.literal[1]}
                    </span>
                  )}
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '13.5px', fontWeight: 700, width: 58, textAlign: 'right' as const, color: ss.score > 0 ? 'var(--text-primary)' : 'var(--text-faint)' }}>{fmtNum(ss.score)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10 }}>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Toernooipunten</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: 'var(--accent-singles)' }}>{fmtNum(r.score)}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
