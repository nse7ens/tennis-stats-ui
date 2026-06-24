import type { UIPlayerData, PlayerSearchResult } from './types';
import type { SeasonTag } from './utils';
import { transform } from './transforms';

export async function searchPlayers(query: string, signal: AbortSignal): Promise<PlayerSearchResult[]> {
  try {
    const res = await fetch(`/api/list_users?s=${encodeURIComponent(query)}`, { signal });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchPlayer(userId: number, season: SeasonTag, signal?: AbortSignal): Promise<UIPlayerData | null> {
  try {
    const res = await fetch(`/api/get_user_report/${userId}?s=${season}`, {
      headers: { Accept: 'application/json' },
      signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.json();
    return transform(raw);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return null;
    return null;
  }
}
