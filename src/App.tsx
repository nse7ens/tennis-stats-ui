import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeContext, THEMES } from './theme';
import { FavoritesProvider } from './FavoritesContext';
import { LandingPage } from './pages/LandingPage';
import { PlayerPage } from './pages/PlayerPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DarkModeToggle } from './components/DarkModeToggle';
import { useDarkMode } from './hooks/useDarkMode';

export default function App() {
  const { dark, toggle } = useDarkMode();

  return (
    <ThemeContext.Provider value={THEMES['Clay court']}>
      <FavoritesProvider>
        <BrowserRouter>
          <DarkModeToggle dark={dark} onToggle={toggle} />
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
