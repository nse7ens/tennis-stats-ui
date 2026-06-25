import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CS = import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING as string | undefined;

let ai: ApplicationInsights | null = null;

function initAI(connectionString: string) {
  if (ai) return;
  ai = new ApplicationInsights({
    config: {
      connectionString,
      isCookieUseDisabled: true,
      enableAutoRouteTracking: false,
    },
  });
  ai.loadAppInsights();
}

function pageNameFromPath(path: string): string {
  if (path.startsWith('/player/')) return 'Player Profile';
  if (path === '/privacy') return 'Privacy';
  return 'Home';
}

export function trackEvent(name: string, properties?: Record<string, string | number | boolean>) {
  if (!CS || !ai) return;
  ai.trackEvent({ name }, properties);
}

export function useAppInsights() {
  const location = useLocation();

  useEffect(() => {
    if (CS) initAI(CS);
  }, []);

  useEffect(() => {
    if (!CS || !ai) return;
    const playerIdMatch = location.pathname.match(/^\/player\/(\d+)/);
    const normalizedPath = playerIdMatch ? '/player/:id' : location.pathname;
    const properties = playerIdMatch ? { playerId: playerIdMatch[1] } : undefined;
    ai.trackPageView({ uri: normalizedPath, name: pageNameFromPath(location.pathname), properties });
  }, [location]);
}
