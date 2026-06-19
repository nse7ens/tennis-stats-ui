import { useState, useEffect, useRef } from 'react';
import { searchPlayers } from './api';
import type { PlayerSearchResult } from './types';

interface Cache {
  query: string;
  results: PlayerSearchResult[];
}

function filterResults(results: PlayerSearchResult[], query: string): PlayerSearchResult[] {
  const segments = query.toLowerCase().split(/\s+/).filter(Boolean);
  return results.filter(r => {
    const haystack = `${r.name} ${r.name_club}`.toLowerCase();
    return segments.every(seg => haystack.includes(seg));
  });
}

export function usePlayerSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlayerSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const cache = useRef<Cache | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const normalized = query.trim();

    if (normalized.length < 5) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (cache.current && normalized.startsWith(cache.current.query)) {
      setResults(filterResults(cache.current.results, normalized));
      return;
    }

    setLoading(true);
    let cancelled = false;

    const timer = setTimeout(() => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      searchPlayers(normalized, controller.signal).then(data => {
        if (cancelled) return;
        cache.current = { query: normalized, results: data };
        setResults(filterResults(data, normalized));
        setLoading(false);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      cancelled = true;
    };
  }, [query]);

  return { query, setQuery, results, loading };
}
