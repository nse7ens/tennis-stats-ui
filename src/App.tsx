import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './FavoritesContext';
import { LandingPage } from './pages/LandingPage';
import { PlayerPage } from './pages/PlayerPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DarkModeToggle } from './components/DarkModeToggle';
import { useDarkMode } from './hooks/useDarkMode';
import { useAppInsights } from './hooks/useAppInsights';

function AppContent() {
  const { dark, toggle } = useDarkMode();
  useAppInsights();
  return (
    <>
      <DarkModeToggle dark={dark} onToggle={toggle} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </FavoritesProvider>
  );
}
