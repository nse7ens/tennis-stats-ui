import { createContext, useContext } from 'react';

export const THEMES = {
  'Hard court':  { singles: '#2f6bed', doubles: '#7c46e6' },
  'Clay court':  { singles: '#c8502a', doubles: '#2f6bed' },
  'Grass court': { singles: '#1f8a4c', doubles: '#3f6f2e' },
  'Night match': { singles: '#3d8bff', doubles: '#b98bff' },
} as const;

export type ThemeName = keyof typeof THEMES;
export interface ThemeColors { singles: string; doubles: string; }

export const ThemeContext = createContext<ThemeColors>(THEMES['Clay court']);
export const useTheme = () => useContext(ThemeContext);
