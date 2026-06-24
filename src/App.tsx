import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './FavoritesContext';
import { LandingPage } from './pages/LandingPage';
import { PlayerPage } from './pages/PlayerPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DarkModeToggle } from './components/DarkModeToggle';
import { useDarkMode } from './hooks/useDarkMode';

export default function App() {
  const { dark, toggle } = useDarkMode();

  return (
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
  );
}
