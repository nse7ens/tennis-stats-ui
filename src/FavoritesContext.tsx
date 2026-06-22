import { createContext, useContext, useState, useEffect } from 'react';
import type { FavoritedPlayer } from './types';

const STORAGE_KEY = 'tennis_favorites';

interface FavoritesContextValue {
  favorites: FavoritedPlayer[];
  isFavorite: (id: number) => boolean;
  addFavorite: (player: FavoritedPlayer) => void;
  removeFavorite: (id: number) => void;
  reorderFavorites: (newOrder: FavoritedPlayer[]) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function loadFromStorage(): FavoritedPlayer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoritedPlayer[]) : [];
  } catch {
    return [];
  }
}

function insertAlphabetically(list: FavoritedPlayer[], player: FavoritedPlayer): FavoritedPlayer[] {
  const index = list.findIndex(f => player.name.localeCompare(f.name, 'nl') <= 0);
  if (index === -1) return [...list, player];
  return [...list.slice(0, index), player, ...list.slice(index)];
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoritedPlayer[]>(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(id: number) {
    return favorites.some(f => f.id === id);
  }

  function addFavorite(player: FavoritedPlayer) {
    if (isFavorite(player.id)) return;
    setFavorites(prev => insertAlphabetically(prev, player));
  }

  function removeFavorite(id: number) {
    setFavorites(prev => prev.filter(f => f.id !== id));
  }

  function reorderFavorites(newOrder: FavoritedPlayer[]) {
    setFavorites(newOrder);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite, reorderFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
  return ctx;
}
