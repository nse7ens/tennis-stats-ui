import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { fetchPlayer } from './api';
import type { UIPlayerData } from './types';
import { ThemeContext, THEMES, type ThemeName } from './theme';
import { PlayerHeader } from './components/PlayerHeader';
import { RankingChart } from './components/RankingChart';
import { PerformancePanel } from './components/PerformancePanel';
import { UpcomingSection } from './components/UpcomingSection';
import { TournamentResults } from './components/TournamentResults';

const Page = styled.div`
  background: #f3f3ee;
  min-height: 100vh;
  font-family: 'Archivo', system-ui, sans-serif;
  color: #1a1a17;
  padding: clamp(16px, 4vw, 40px) clamp(14px, 4vw, 32px) 64px;
  -webkit-font-smoothing: antialiased;
`;

const Inner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(22px, 3vw, 34px);
`;

const Loading = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #8b8b80;
`;

const DEFAULT_PLAYER = 1606891;

export default function App() {
  const [data, setData] = useState<UIPlayerData | null>(null);
  const [themeName] = useState<ThemeName>('Clay court');

  useEffect(() => { fetchPlayer(DEFAULT_PLAYER).then(setData); }, []);

  if (!data) return <Loading>Loading…</Loading>;

  return (
    <ThemeContext.Provider value={THEMES[themeName]}>
      <Page>
        <Inner>
          <PlayerHeader data={data} />
          <RankingChart history={data.history} />
          <PerformancePanel
            singles={data.singles} doubles={data.doubles}
            recentSingles={data.recent.singles} recentDoubles={data.recent.doubles}
          />
          <UpcomingSection singles={data.upcoming.singles} doubles={data.upcoming.doubles} />
          <TournamentResults singles={data.singles} doubles={data.doubles} />
        </Inner>
      </Page>
    </ThemeContext.Provider>
  );
}
