import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeContext, THEMES } from './theme';
import { FavoritesProvider } from './FavoritesContext';
import { LandingPage } from './pages/LandingPage';
import { PlayerPage } from './pages/PlayerPage';
import { PrivacyPage } from './pages/PrivacyPage';

export default function App() {
  return (
    <ThemeContext.Provider value={THEMES['Clay court']}>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/player/:id" element={<PlayerPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeContext.Provider>
  );
}
