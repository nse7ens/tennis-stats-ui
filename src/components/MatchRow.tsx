import styled from '@emotion/styled';
import type { UIMatch } from '../types';
import { WLBadge } from './WLBadge';

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 9px 11px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #ececdf;
  border-radius: 10px;
`;

const OppBlock = styled.div`
  flex: 1;
  min-width: 0;
`;

const OppRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px 7px;
  align-items: center;
`;

const OppName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #26261f;
`;

const RankChip = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  font-weight: 600;
  color: #8b8b80;
  background: #efefe7;
  padding: 1px 6px;
  border-radius: 5px;
`;

const RoundLabel = styled.div`
  font-size: 10.5px;
  color: #a3a399;
  margin-top: 2px;
`;

const ScorePill = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: #3a3a33;
  background: #fff;
  border: 1px solid #e6e6df;
  padding: 4px 9px;
  border-radius: 7px;
  white-space: nowrap;
`;

interface Props { match: UIMatch; }

export function MatchRow({ match }: Props) {
  return (
    <Row>
      <WLBadge win={match.did_win === 1} size="sm" />
      <OppBlock>
        <OppRow>
          {match.opp.map((o, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <OppName>{o.name}</OppName>
              <RankChip>{o.rank}pts</RankChip>
            </span>
          ))}
        </OppRow>
        <RoundLabel>{match.round}</RoundLabel>
      </OppBlock>
      <ScorePill>{match.score}</ScorePill>
    </Row>
  );
}
