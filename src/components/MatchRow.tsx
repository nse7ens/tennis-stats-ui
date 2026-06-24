import styled from '@emotion/styled';
import type { UIMatch } from '../types';
import { WLBadge } from './WLBadge';
import { PlayerLink } from './PlayerLink';

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 11px;
  padding: 9px 11px;
  background: rgba(var(--bg-card-rgb), 0.6);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
`;

const OppName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
`;

const RankChip = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-inset);
  padding: 1px 6px;
  border-radius: 5px;
`;

const RoundLabel = styled.div`
  font-size: 10.5px;
  color: var(--text-faint);
  margin-top: 2px;
`;

const ScorePill = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 4px 9px;
  border-radius: 7px;
  white-space: nowrap;
  @media (max-width: 480px) { width: 100%; }
`;

interface Props { match: UIMatch; }

export function MatchRow({ match }: Props) {
  return (
    <Row>
      <WLBadge win={match.did_win === 1} size="sm" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 7px', alignItems: 'center' }}>
          {match.opp.map((o, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {o.user_id != null
                ? <PlayerLink to={`/player/${o.user_id}`}><OppName>{o.name}</OppName></PlayerLink>
                : <OppName>{o.name}</OppName>
              }
              <RankChip>{o.rank}pts</RankChip>
            </span>
          ))}
        </div>
        <RoundLabel>{match.round}</RoundLabel>
      </div>
      <ScorePill>{match.score}</ScorePill>
    </Row>
  );
}
