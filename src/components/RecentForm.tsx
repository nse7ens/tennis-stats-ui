import styled from "@emotion/styled";
import { useState } from "react";
import type { Disc, UIRecentMatch } from "../types";
import { fmtDate } from "../utils";
import { DiscToggle } from "./DiscToggle";
import { PlayerLink } from "./PlayerLink";
import { WLBadge } from "./WLBadge";
import { trackEvent } from "../hooks/useAppInsights";

const Card = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: clamp(18px, 3vw, 26px);
  display: flex;
  flex-direction: column;
`;

const Kicker = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-muted);
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
`;

const DateLabel = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  color: var(--text-faint);
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
  flex-wrap: wrap;
  gap: 12px;
  padding: 10px 12px;
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: 11px;
`;

const OppNameBold = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
`;

const RankChip = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-inset);
  padding: 1px 6px;
  border-radius: 5px;
`;

const ScorePill = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 4px 9px;
  border-radius: 7px;
  white-space: nowrap;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

interface Props {
  singles: UIRecentMatch[];
  doubles: UIRecentMatch[];
}

export function RecentForm({ singles, doubles }: Props) {
  const [disc, setDisc] = useState<Disc>("singles");
  const rec = disc === "singles" ? singles : doubles;
  const strip = rec.slice(0, 6);
  const list = rec.slice(0, 6);

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
        <div>
          <Kicker>Recente vorm</Kicker>
          <Title>Laatste wedstrijden</Title>
        </div>
        <DiscToggle value={disc} onChange={v => { trackEvent('disc_toggled', { view: v, context: 'recent_form' }); setDisc(v); }} variant="light" size="sm" />
      </div>

      <Strip>
        {strip.map((m, i) => (
          <StripItem key={i}>
            <WLBadge win={m.win} size="lg" />
            <DateLabel>{fmtDate(m.date)}</DateLabel>
          </StripItem>
        ))}
      </Strip>

      <MatchList>
        {list.map((m, i) => (
          <MatchItem key={i}>
            <WLBadge win={m.win} size="md" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {m.opp.map((o, j) => (
                  <span key={j} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    {o.user_id != null ? (
                      <PlayerLink to={`/player/${o.user_id}`} onClick={() => trackEvent('player_link_clicked', { context: 'opponent', target_player_id: o.user_id! })}>
                        <OppNameBold>{o.name}</OppNameBold>
                      </PlayerLink>
                    ) : (
                      <OppNameBold>{o.name}</OppNameBold>
                    )}
                    <RankChip>{o.rank}pts</RankChip>
                  </span>
                ))}
              </div>
            </div>
            <ScorePill>{m.score}</ScorePill>
          </MatchItem>
        ))}
      </MatchList>
    </Card>
  );
}
