import { useState } from 'react';
import styled from '@emotion/styled';
import type { UIResult } from '../types';
import { fmtNum, hexA, WIN_GREEN, LOSS_RED } from '../utils';
import { useTheme } from '../theme';
import { MatchRow } from './MatchRow';
import { PlayerLink } from './PlayerLink';

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
`;

const TitleBlock = styled.div`
  min-width: 0;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
`;

const CardTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #1a1a17;
`;

const SeriesChip = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #6f6f67;
  background: #efefe7;
  padding: 2px 7px;
  border-radius: 5px;
`;

const SubTitle = styled.div`
  font-size: 12.5px;
  color: #8b8b80;
  margin-top: 3px;
`;

const PointsBlock = styled.div`
  text-align: right;
  flex: none;
`;

const PointsLabel = styled.div`
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #a3a399;
  margin-top: 2px;
`;

const DotsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 13px;
`;

const TagBadge = styled.span<{ selected: boolean; color: string }>`
  margin-left: 6px;
  font-size: 9.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  color: ${p => p.selected ? p.color : '#9a9a90'};
  background: ${p => p.selected ? hexA(p.color, 0.1) : '#efefe9'};
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
  border: 1px dashed #d8d8cf;
  cursor: pointer;
  font-family: 'Archivo', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 8px;
  border-radius: 9px;
`;

const CalcPanel = styled.div`
  margin-top: 11px;
  border-radius: 11px;
  padding: 13px 14px;
`;

const CalcHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 8px;
`;

const CalcRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #eef2fb;
`;

const CalcTitle = styled.span`
  font-size: 13px;
  color: #3a3a33;
  flex: 1;
  min-width: 0;
`;

const CalcTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;


interface Props { result: UIResult; }

export function TournamentCard({ result: r }: Props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const sel = r.selected === 1;
  const ongoing = r.finished === 0;
  const borderWidth = sel ? '1.5px' : '1px';
  const borderColor = sel ? theme.singles : '#e6e6df';
  const borderStyle = ongoing ? 'dashed' : 'solid';

  const cardStyle = {
    borderRadius: 16, padding: '18px 18px 16px', background: '#fff',
    border: `${borderWidth} ${borderStyle} ${borderColor}`,
  };

  return (
    <div style={cardStyle}>
      <CardHeader>
        <TitleBlock>
          <TitleRow>
            <CardTitle>{r.title}</CardTitle>
            <SeriesChip>{r.series.toUpperCase()}</SeriesChip>
          </TitleRow>
          <SubTitle>{r.partner ? r.subtitle.replace(`met ${r.partner} • `, '') : r.subtitle}</SubTitle>
        </TitleBlock>
        {sel && r.score > 0 && (
          <PointsBlock>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 700, color: theme.singles, lineHeight: 1 }}>{fmtNum(r.score)}</div>
            <PointsLabel>punten</PointsLabel>
          </PointsBlock>
        )}
      </CardHeader>

      {r.partner && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 11, background: hexA(theme.doubles, 0.08), border: `1px solid ${hexA(theme.doubles, 0.28)}`, padding: '4px 10px', borderRadius: 7 }}>
          <span style={{ fontSize: '9.5px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: hexA(theme.doubles, 0.85), fontWeight: 600 }}>Met</span>
          {r.p_id != null
            ? <PlayerLink to={`/player/${r.p_id}`} style={{ fontSize: '12.5px', fontWeight: 600, color: theme.doubles }}>{r.partner}</PlayerLink>
            : <span style={{ fontSize: '12.5px', fontWeight: 600, color: theme.doubles }}>{r.partner}</span>
          }
        </div>
      )}

      <DotsRow>
        {r.WL.map((x, i) => (
          <span key={i} style={
            x === 'W' ? { display: 'inline-block', flex: 'none', width: 13, height: 13, borderRadius: '50%', background: WIN_GREEN } :
            x === 'L' ? { display: 'inline-block', flex: 'none', width: 13, height: 13, borderRadius: '50%', background: LOSS_RED } :
            { display: 'inline-block', flex: 'none', width: 9, height: 9, borderRadius: '50%', background: 'transparent', border: '1.5px solid #d3d3cb' }
          } />
        ))}
        <TagBadge selected={sel} color={theme.singles}>
          {sel ? 'Telt mee voor ranking' : 'Niet meegeteld'}
        </TagBadge>
      </DotsRow>

      <MatchList>
        {r.matches.map((m, i) => <MatchRow key={i} match={m} />)}
      </MatchList>

      {r.subscores.length > 0 && (
        <>
          <ToggleBtn type="button" onClick={() => setOpen(o => !o)} style={{ color: theme.singles }}>
            {open ? 'Verberg puntberekening' : 'Hoe worden deze punten berekend'}
            <span style={{ display: 'inline-block', transition: 'transform .18s', transform: open ? 'rotate(180deg)' : 'none', fontSize: 10 }}>▾</span>
          </ToggleBtn>
          {open && (
            <CalcPanel style={{ background: hexA(theme.singles, 0.04), border: `1px solid ${hexA(theme.singles, 0.18)}` }}>
              <CalcHeader style={{ borderBottom: `1px solid ${hexA(theme.singles, 0.18)}` }}>
                <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8b8b80', fontWeight: 700 }}>Puntberekening</span>
                <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a3a399' }}>Waarde</span>
              </CalcHeader>
              {r.subscores.map((ss, i) => (
                <CalcRow key={i}>
                  <CalcTitle>{ss.title}</CalcTitle>
                  {ss.literal && (
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 600, color: theme.doubles, background: '#fff', border: `1px solid ${hexA(theme.doubles, 0.22)}`, padding: '2px 8px', borderRadius: 6, whiteSpace: 'nowrap' }}>
                      {ss.literal[0]} × {ss.literal[1]}
                    </span>
                  )}
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '13.5px', fontWeight: 700, width: 58, textAlign: 'right', color: ss.score > 0 ? '#1a1a17' : '#b3b3a9' }}>{fmtNum(ss.score)}</span>
                </CalcRow>
              ))}
              <CalcTotal>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#1a1a17' }}>Toernooipunten</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: theme.singles }}>{fmtNum(r.score)}</span>
              </CalcTotal>
            </CalcPanel>
          )}
        </>
      )}
    </div>
  );
}
