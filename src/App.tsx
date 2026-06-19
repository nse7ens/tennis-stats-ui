import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeContext, THEMES } from './theme';
import { LandingPage } from './pages/LandingPage';
import { PlayerPage } from './pages/PlayerPage';

export default function App() {
  return (
    <ThemeContext.Provider value={THEMES['Clay court']}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}
