import styled from '@emotion/styled';
import type { UIPlayerData } from '../types';
import { useTheme } from '../theme';
import { RankingCard } from './RankingCard';
import { useFavorites } from '../FavoritesContext';

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

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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

const StarButton = styled.button<{ $active: boolean }>`
  all: unset;
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
  color: ${({ $active }) => ($active ? '#e8a020' : '#c4c4b8')};
  flex-shrink: 0;
  transition: color 0.15s ease, transform 0.1s ease;

  &:hover {
    color: ${({ $active }) => ($active ? '#c8881a' : '#8b8b80')};
    transform: scale(1.15);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(258px, 1fr));
  gap: 14px;
`;

interface Props {
  data: UIPlayerData;
  id: number;
}

export function PlayerHeader({ data, id }: Props) {
  const theme = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(id);

  function handleToggle() {
    if (favorited) {
      removeFavorite(id);
    } else {
      addFavorite({ id, name: data.player.name, club: data.player.club });
    }
  }

  return (
    <Root>
      <TitleBlock>
        <Eyebrow>Tennis Vlaanderen · Spelersprofiel</Eyebrow>
        <NameRow>
          <Name>{data.player.name}</Name>
          <StarButton
            $active={favorited}
            onClick={handleToggle}
            title={favorited ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
            aria-label={favorited ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
          >
            <i className={`ti ${favorited ? 'ti-star-filled' : 'ti-star'}`} />
          </StarButton>
        </NameRow>
        <Club>{data.player.club}</Club>
      </TitleBlock>
      <CardsGrid>
        <RankingCard disc={data.singles} label="Enkel" color={theme.singles} />
        <RankingCard disc={data.doubles} label="Dubbel" color={theme.doubles} />
      </CardsGrid>
    </Root>
  );
}
