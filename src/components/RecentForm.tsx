import { useState } from 'react';
import styled from '@emotion/styled';
import type { UIRecentMatch, Disc } from '../types';
import { fmtDate } from '../utils';
import { WLBadge } from './WLBadge';
import { DiscToggle } from './DiscToggle';

const Card = styled.div`
  background: #fff;
  border: 1px solid #e6e6df;
  border-radius: 18px;
  padding: clamp(18px, 3vw, 26px);
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
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
  font-size: clamp(18px, 2.6vw, 23px);
  font-weight: 700;
`;

const Strip = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const StripItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  width: 62px;
`;

const OppName = styled.span`
  font-size: 10.5px;
  color: #54544c;
  text-align: center;
  line-height: 1.15;
  max-width: 62px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const DateLabel = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  color: #aeaea4;
`;

const MatchList = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MatchItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #fafaf6;
  border: 1px solid #eeeee7;
  border-radius: 11px;
`;

const OppBlock = styled.div`
  flex: 1;
  min-width: 0;
`;

const OppRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`;

const OppNameBold = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: #26261f;
`;

const RankChip = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  color: #8b8b80;
  background: #efefe7;
  padding: 1px 6px;
  border-radius: 5px;
`;

const RoundLabel = styled.div`
  font-size: 11px;
  color: #a3a399;
  margin-top: 2px;
`;

const ScorePill = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  font-weight: 600;
  color: #3a3a33;
  background: #fff;
  border: 1px solid #e6e6df;
  padding: 4px 9px;
  border-radius: 7px;
  white-space: nowrap;
`;

interface Props { singles: UIRecentMatch[]; doubles: UIRecentMatch[]; }

export function RecentForm({ singles, doubles }: Props) {
  const [disc, setDisc] = useState<Disc>('singles');
  const rec = disc === 'singles' ? singles : doubles;
  const strip = rec.slice(0, 6);
  const list = rec.slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <div>
          <Kicker>Recent form</Kicker>
          <Title>Last matches</Title>
        </div>
        <DiscToggle value={disc} onChange={setDisc} variant="light" size="sm" />
      </CardHeader>

      <Strip>
        {strip.map((m, i) => (
          <StripItem key={i}>
            <WLBadge win={m.win} size="lg" />
            <OppName>{m.opp[0]?.name.split(' ')[0]}</OppName>
            <DateLabel>{fmtDate(m.date)}</DateLabel>
          </StripItem>
        ))}
      </Strip>

      <MatchList>
        {list.map((m, i) => (
          <MatchItem key={i}>
            <WLBadge win={m.win} size="md" />
            <OppBlock>
              <OppRow>
                {m.opp.map((o, j) => (
                  <span key={j} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <OppNameBold>{o.name}</OppNameBold>
                    <RankChip>{o.rank}pts</RankChip>
                  </span>
                ))}
              </OppRow>
              {m.round && <RoundLabel>{m.round}</RoundLabel>}
            </OppBlock>
            <ScorePill>{m.score}</ScorePill>
          </MatchItem>
        ))}
      </MatchList>
    </Card>
  );
}
