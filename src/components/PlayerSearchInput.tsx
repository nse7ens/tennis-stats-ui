import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import type { PlayerSearchResult } from '../types';

interface Props {
  query: string;
  setQuery: (q: string) => void;
  results: PlayerSearchResult[];
  loading: boolean;
  onSelect: (id: number) => void;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TextInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  color: #1a1a17;
  background: #fff;
  border: 1.5px solid #d4d4c8;
  border-radius: 10px;
  padding: 11px 36px 11px 14px;
  outline: none;

  &::placeholder { color: #b0b0a4; }
  &:focus { border-color: #c8502a; }
`;

const Spinner = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: 2px solid #d4d4c8;
  border-top-color: #c8502a;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1.5px solid #d4d4c8;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  margin: 0;
  padding: 4px 0;
  list-style: none;
  z-index: 100;
  max-height: 320px;
  overflow-y: auto;
`;

const ResultRow = styled.li`
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 9px 14px;
  cursor: pointer;
  transition: background 0.1s;

  &:hover { background: #f5f5f0; }
`;

const PlayerName = styled.span`
  font-family: 'Archivo', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a17;
  flex-shrink: 0;
`;

const ClubName = styled.span`
  font-family: 'Archivo', system-ui, sans-serif;
  font-size: 12.5px;
  color: #7a7a70;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RankPill = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px;
  color: #c8502a;
  background: #fdf0eb;
  border-radius: 6px;
  padding: 2px 7px;
  flex-shrink: 0;
  white-space: nowrap;
`;

const Hint = styled.p`
  font-family: 'Archivo', system-ui, sans-serif;
  font-size: 12.5px;
  color: #9b9b90;
  margin: 8px 0 0;
`;

export function PlayerSearchInput({ query, setQuery, results, loading, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleBlur() {
    blurTimer.current = setTimeout(() => setOpen(false), 150);
  }

  function handleFocus() {
    if (blurTimer.current) clearTimeout(blurTimer.current);
    setOpen(true);
  }

  function handleSelect(id: number) {
    if (blurTimer.current) clearTimeout(blurTimer.current);
    setOpen(false);
    onSelect(id);
  }

  const showDropdown = open && results.length > 0;

  return (
    <Wrapper>
      <TextInput
        type="text"
        placeholder="Speler of club zoeken…"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus
        autoComplete="off"
        spellCheck={false}
      />
      {loading && <Spinner />}
      {showDropdown && (
        <Dropdown>
          {results.map(r => (
            <ResultRow key={r.id} onMouseDown={() => handleSelect(r.id)}>
              <PlayerName>{r.name}</PlayerName>
              <ClubName>{r.name_club}</ClubName>
              <RankPill>E{r.singles} / D{r.doubles}</RankPill>
            </ResultRow>
          ))}
        </Dropdown>
      )}
      {query.length > 0 && query.length < 5 && (
        <Hint>Typ minstens 5 tekens om te zoeken.</Hint>
      )}
    </Wrapper>
  );
}
