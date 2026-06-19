import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { fetchPlayer } from './api';
import type { UIPlayerData } from './types';
import { ThemeContext, THEMES, type ThemeName } from './theme';
import { PlayerHeader } from './components/PlayerHeader';

const Page = styled.div`
  background: #f3f3ee;
  min-height: 100vh;
  font-family: 'Archivo', system-ui, sans-serif;
  color: #1a1a17;
  padding: clamp(16px,4vw,40px) clamp(14px,4vw,32px) 64px;
  -webkit-font-smoothing: antialiased;
`;

const Inner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(22px, 3vw, 34px);
`;

const DEFAULT_PLAYER = 1606891;

export default function App() {
  const [data, setData] = useState<UIPlayerData | null>(null);
  const [themeName] = useState<ThemeName>('Clay court');

  useEffect(() => { fetchPlayer(DEFAULT_PLAYER).then(setData); }, []);

  if (!data) return <Page style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b8b80', fontSize: 16 }}>Loading…</Page>;

  return (
    <ThemeContext.Provider value={THEMES[themeName]}>
      <Page>
        <Inner>
          <PlayerHeader data={data} />
        </Inner>
      </Page>
    </ThemeContext.Provider>
  );
}
