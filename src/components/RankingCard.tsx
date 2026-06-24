import styled from '@emotion/styled';
import type { UIDisc } from '../types';
import { fmtNum } from '../utils';
import { PredictionPanel } from './PredictionPanel';

const Card = styled.div`
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px 22px 18px;
  overflow: hidden;
`;

const AccentBar = styled.div<{ color: string }>`
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: ${p => p.color};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Label = styled.span`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-primary);
`;

const RankingLabel = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-transform: uppercase;
`;

const RankRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-top: 10px;
`;

const BigRank = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(42px, 8vw, 58px);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.02em;
`;

const PtsSuffix = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  color: var(--text-muted);
  margin-bottom: 7px;
`;

const PredGroup = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 7px;
`;

const PredValue = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  font-weight: 600;
`;

const PredLabel = styled.span`
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
`;

const StatsRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--border-subtle);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const StatLabel = styled.span`
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
`;

const StatValue = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 600;
`;

interface Props { disc: UIDisc; label: string; color: string; }

export function RankingCard({ disc, label, color }: Props) {
  const altColor = color === 'var(--accent-singles)' ? 'var(--accent-doubles)' : 'var(--accent-singles)';
  const delta = disc.predicted - disc.current;
  const arrow = delta < 0 ? '↓' : delta > 0 ? '↑' : '→';
  const arrowColor = delta < 0 ? 'var(--loss)' : delta > 0 ? 'var(--win)' : 'var(--text-muted)';
  const losses = disc.stats.nm - disc.stats.nw;

  return (
    <Card>
      <AccentBar color={color} />
      <Header>
        <Label>{label}</Label>
        <RankingLabel>Ranglijst</RankingLabel>
      </Header>
      <RankRow>
        <BigRank>{disc.current}</BigRank>
        <PtsSuffix>pts</PtsSuffix>
        <PredGroup>
          <span style={{ color: arrowColor, fontSize: 19, fontWeight: 700, lineHeight: 1 }}>{arrow}</span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
            <PredValue>{disc.predicted}</PredValue>
            <PredLabel>voorspeld</PredLabel>
          </div>
        </PredGroup>
      </RankRow>
      <StatsRow>
        {[
          { lbl: 'ELO', val: fmtNum(disc.elo) },
          { lbl: 'G–V', val: `${disc.stats.nw}–${losses}` },
          { lbl: 'Score', val: fmtNum(disc.score) },
        ].map(({ lbl, val }) => (
          <StatItem key={lbl}>
            <StatLabel>{lbl}</StatLabel>
            <StatValue>{val}</StatValue>
          </StatItem>
        ))}
      </StatsRow>
      <PredictionPanel disc={disc} color={color} altColor={altColor} />
    </Card>
  );
}
