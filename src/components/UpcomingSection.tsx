import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { UIUpcomingMatch } from '../types';

const Section = styled.section`
  background: #f9efd7;
  border: 1px solid #ecd49a;
  border-radius: 18px;
  padding: clamp(18px, 3vw, 24px);
`;

const SectionLabel = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #b07d22;
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
  background: #fff;
  border: 1px solid #ecd49a;
  border-radius: 13px;
  padding: 16px 18px;
`;

const ItemTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #3a2d0e;
`;

const ItemSub = styled.span`
  font-size: 12.5px;
  color: #9a7c34;
`;

const CatBadge = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: #b07d22;
  background: #f9efd7;
  padding: 4px 10px;
  border-radius: 7px;
`;

const PartnerBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PartnerLabel = styled.span`
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #b69753;
`;

const PartnerName = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: #3a2d0e;
`;

const PartnerPts = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #9a7c34;
`;

const PartnerLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

interface Props { singles: UIUpcomingMatch[]; doubles: UIUpcomingMatch[]; }

export function UpcomingSection({ singles, doubles }: Props) {
  const items = [
    ...singles.map(u => ({ ...u, kind: 'Singles' })),
    ...doubles.map(u => ({ ...u, kind: 'Doubles' })),
  ];
  if (items.length === 0) return null;

  return (
    <Section>
      <SectionLabel>Upcoming</SectionLabel>
      <ItemList>
        {items.map((u, i) => (
          <Item key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 180, flex: 1 }}>
              <ItemTitle>{u.title}</ItemTitle>
              <ItemSub>{u.kind} · {u.rn}</ItemSub>
            </div>
            <CatBadge>{u.cat.toUpperCase()}</CatBadge>
            {u.p_name && (
              <PartnerBlock>
                <PartnerLabel>Partner</PartnerLabel>
                <PartnerName>
                  {u.p_id != null
                    ? <PartnerLink to={`/player/${u.p_id}`}>{u.p_name}</PartnerLink>
                    : u.p_name
                  }
                  {' '}<PartnerPts>{u.p_pts}pts</PartnerPts>
                </PartnerName>
              </PartnerBlock>
            )}
          </Item>
        ))}
      </ItemList>
    </Section>
  );
}
