import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchPlayer } from '../api';
import type { UIPlayerData } from '../types';
import { SEASONS, DEFAULT_SEASON } from '../utils';
import type { SeasonTag } from '../utils';
import { PlayerHeader } from '../components/PlayerHeader';
import { RankingChart } from '../components/RankingChart';
import { PerformancePanel } from '../components/PerformancePanel';
import { UpcomingSection } from '../components/UpcomingSection';
import { TournamentResults } from '../components/TournamentResults';
import { SeasonSelector } from '../components/SeasonSelector';

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

const NotFound = styled(Page)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 16px;
  color: #8b8b80;
`;

const BackLink = styled(Link)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: #8b8b80;
  text-decoration: none;
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchLink = styled(Link)`
  color: #c8502a;
  font-size: 14px;
`;

export function PlayerPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const rawSeason = searchParams.get('s');
  const season: SeasonTag = rawSeason && SEASONS.some(s => s.tag === rawSeason)
    ? (rawSeason as SeasonTag)
    : DEFAULT_SEASON;
  const [data, setData] = useState<UIPlayerData | null | 'loading'>('loading');

  useEffect(() => {
    if (!rawSeason || !SEASONS.some(s => s.tag === rawSeason)) {
      setSearchParams({ s: DEFAULT_SEASON }, { replace: true });
    }
  }, [rawSeason]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!id) { setData(null); return; }
    const numId = Number(id);
    if (isNaN(numId) || numId <= 0) { setData(null); return; }

    const controller = new AbortController();
    setData('loading');
    fetchPlayer(numId, season, controller.signal).then(result => {
      if (!controller.signal.aborted) setData(result);
    });
    return () => controller.abort();
  }, [id, season]);

  if (data === 'loading') {
    return <Loading>Laden…</Loading>;
  }

  if (data === null) {
    return (
      <NotFound>
        <span>Speler niet gevonden.</span>
        <SearchLink to="/">← Zoek een andere speler</SearchLink>
      </NotFound>
    );
  }

  return (
    <Page>
      <Inner>
        <BackLink to="/">← Terug</BackLink>
        <SeasonSelector
          season={season}
          onChange={tag => setSearchParams({ s: tag })}
        />
        <PlayerHeader data={data} />
        <RankingChart history={data.history} />
        <PerformancePanel
          singles={data.singles}
          doubles={data.doubles}
          recentSingles={data.recent.singles}
          recentDoubles={data.recent.doubles}
        />
        <UpcomingSection singles={data.upcoming.singles} doubles={data.upcoming.doubles} />
        <TournamentResults singles={data.singles} doubles={data.doubles} />
      </Inner>
    </Page>
  );
}
