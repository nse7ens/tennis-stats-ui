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

export function useAppInsights() {
  const location = useLocation();

  useEffect(() => {
    if (CS) initAI(CS);
  }, []);

  useEffect(() => {
    if (!CS || !ai) return;
    const normalizedPath = location.pathname.replace(/\/player\/\d+/, '/player/:id');
    ai.trackPageView({ uri: normalizedPath });
  }, [location]);
}
