import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { usePlayerSearch } from '../usePlayerSearch';
import { PlayerSearchInput } from '../components/PlayerSearchInput';
import { FavoritesList } from '../components/FavoritesList';
import { useFavorites } from '../FavoritesContext';
import { Footer } from '../components/Footer';

const Shell = styled.div`
  background: var(--bg-page);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Archivo', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
`;

const PageContent = styled.div`
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Kicker = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-variant: small-caps;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 14px;
`;

const Heading = styled.h1`
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0 0 14px;
  line-height: 1.05;
`;

const Subtitle = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 28px;
`;

export function LandingPage() {
  const navigate = useNavigate();
  const { query, setQuery, results, loading } = usePlayerSearch();
  const { favorites } = useFavorites();

  return (
    <Shell>
      <ContentArea>
        <PageContent>
          <div>
            <Kicker>Tennis Vlaanderen</Kicker>
            <Heading>Zoek een speler</Heading>
            <Subtitle>
              Zoek op naam of club om het spelersprofiel te openen — punten,
              evolutie, recentste vorm en volledige toernooigeschiedenis.
            </Subtitle>
            <PlayerSearchInput
              query={query}
              setQuery={setQuery}
              results={results}
              loading={loading}
              onSelect={id => navigate(`/player/${id}`)}
            />
          </div>
          {favorites.length > 0 && <FavoritesList />}
        </PageContent>
      </ContentArea>
      <Footer />
    </Shell>
  );
}
