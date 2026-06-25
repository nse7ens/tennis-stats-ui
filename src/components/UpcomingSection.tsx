import styled from '@emotion/styled';
import type { UIUpcomingMatch } from '../types';
import { fmtDateFull } from '../utils';
import { PlayerLink } from './PlayerLink';
import { trackEvent } from '../hooks/useAppInsights';

const Section = styled.section`
  background: var(--upcoming-bg);
  border: 1px solid var(--upcoming-border);
  border-radius: 18px;
  padding: clamp(18px, 3vw, 24px);
`;

const SectionLabel = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--upcoming-label);
  font-weight: 700;
  margin-bottom: 12px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
  background: var(--upcoming-item-bg);
  border: 1px solid var(--upcoming-border);
  border-radius: 13px;
  padding: 16px 18px;
`;

const ItemTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: var(--upcoming-text-primary);
`;

const ItemSub = styled.span`
  font-size: 12.5px;
  color: var(--upcoming-text-secondary);
`;

const CatBadge = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--upcoming-label);
  background: var(--upcoming-bg);
  padding: 4px 10px;
  border-radius: 7px;
`;

const PartnerLabel = styled.span`
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--upcoming-text-secondary);
`;

const PartnerName = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--upcoming-text-primary);
`;

const PartnerPts = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--upcoming-text-secondary);
`;

interface Props { singles: UIUpcomingMatch[]; doubles: UIUpcomingMatch[]; }

export function UpcomingSection({ singles, doubles }: Props) {
  const items = [
    ...singles.map(u => ({ ...u, kind: 'Enkel' })),
    ...doubles.map(u => ({ ...u, kind: 'Dubbel' })),
  ];
  if (items.length === 0) return null;

  return (
    <Section>
      <SectionLabel>Aankomende wedstrijden</SectionLabel>
      <ItemList>
        {items.map((u, i) => (
          <Item key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 180, flex: 1 }}>
              <ItemTitle>{u.title}</ItemTitle>
              <ItemSub>
                {u.kind} · {u.rn}
                {u.planned && <> · {fmtDateFull(u.planned)}</>}
              </ItemSub>
            </div>
            <CatBadge>{u.cat.toUpperCase()}</CatBadge>
            {u.p_name && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <PartnerLabel>Ploegmaat</PartnerLabel>
                <PartnerName>
                  {u.p_id != null
                    ? <PlayerLink to={`/player/${u.p_id}`} onClick={() => trackEvent('player_link_clicked', { context: 'upcoming_partner', target_player_id: u.p_id! })}>{u.p_name}</PlayerLink>
                    : u.p_name
                  }
                  {' '}<PartnerPts>{u.p_pts}pts</PartnerPts>
                </PartnerName>
              </div>
            )}
          </Item>
        ))}
      </ItemList>
    </Section>
  );
}
