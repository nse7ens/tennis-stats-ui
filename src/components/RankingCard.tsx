import styled from '@emotion/styled';
import type { UIDisc } from '../types';
import { fmtNum, WIN_GREEN, LOSS_RED } from '../utils';
import { useTheme } from '../theme';
import { PredictionPanel } from './PredictionPanel';

const Card = styled.div`
  position: relative;
  background: #fff;
  border: 1px solid #e6e6df;
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
  color: #1a1a17;
`;

const RankingLabel = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: #9a9a90;
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
  color: #8b8b80;
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
  color: #a3a399;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid #eeeee7;
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
  color: #a3a399;
`;

const StatValue = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 600;
`;

interface Props { disc: UIDisc; label: string; color: string; }

export function RankingCard({ disc, label, color }: Props) {
  const theme = useTheme();
  const altColor = color === theme.singles ? theme.doubles : theme.singles;
  const delta = disc.predicted - disc.current;
  const arrow = delta < 0 ? '↓' : delta > 0 ? '↑' : '→';
  const arrowColor = delta < 0 ? LOSS_RED : delta > 0 ? WIN_GREEN : '#9a9a90';
  const losses = disc.stats.nm - disc.stats.nw;

  return (
    <Card>
      <AccentBar color={color} />
      <Header>
        <Label>{label}</Label>
        <RankingLabel>Ranking</RankingLabel>
      </Header>
      <RankRow>
        <BigRank>{disc.current}</BigRank>
        <PtsSuffix>pts</PtsSuffix>
        <PredGroup>
          <span style={{ color: arrowColor, fontSize: 19, fontWeight: 700, lineHeight: 1 }}>{arrow}</span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
            <PredValue>{disc.predicted}</PredValue>
            <PredLabel>predicted</PredLabel>
          </div>
        </PredGroup>
      </RankRow>
      <StatsRow>
        {[
          { lbl: 'ELO', val: fmtNum(disc.elo) },
          { lbl: 'W–L', val: `${disc.stats.nw}–${losses}` },
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
