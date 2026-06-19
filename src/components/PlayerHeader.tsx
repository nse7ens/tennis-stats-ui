import styled from '@emotion/styled';
import type { UIPlayerData } from '../types';
import { useTheme } from '../theme';
import { RankingCard } from './RankingCard';

const Root = styled.header`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Eyebrow = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8b8b80;
  font-weight: 600;
`;

const Name = styled.h1`
  margin: 0;
  font-size: clamp(34px, 6.5vw, 58px);
  line-height: 0.98;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const Club = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #6f6f67;
  letter-spacing: 0.02em;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(258px, 1fr));
  gap: 14px;
`;

interface Props { data: UIPlayerData; }

export function PlayerHeader({ data }: Props) {
  const theme = useTheme();
  return (
    <Root>
      <TitleBlock>
        <Eyebrow>Tennis Vlaanderen · Player Profile</Eyebrow>
        <Name>{data.player.name}</Name>
        <Club>{data.player.club}</Club>
      </TitleBlock>
      <CardsGrid>
        <RankingCard disc={data.singles} label="Singles" color={theme.singles} />
        <RankingCard disc={data.doubles} label="Doubles" color={theme.doubles} />
      </CardsGrid>
    </Root>
  );
}
