import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Shell = styled.div`
  background: #edede5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Archivo', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  padding: 32px 16px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 520px;
`;

const Kicker = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-variant: small-caps;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9b9b90;
  margin: 0 0 14px;
`;

const Heading = styled.h1`
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1a1a17;
  margin: 0 0 14px;
  line-height: 1.05;
`;

const Subtitle = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #5a5a52;
  margin: 0 0 28px;
`;

const FieldLabel = styled.label`
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-variant: small-caps;
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #7a7a70;
  margin-bottom: 6px;
`;

const InputRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  color: #1a1a17;
  background: #fff;
  border: 1.5px solid #d4d4c8;
  border-right: none;
  border-radius: 10px 0 0 10px;
  padding: 11px 14px;
  outline: none;

  &::placeholder {
    color: #b0b0a4;
  }

  &:focus {
    border-color: #c8502a;
  }
`;

const SearchButton = styled.button`
  font-family: 'Archivo', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: #c8502a;
  border: 1.5px solid #c8502a;
  border-radius: 0 10px 10px 0;
  padding: 11px 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: #b04424;
    border-color: #b04424;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #d4d4c8;
  margin: 0 0 16px;
`;

const TryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const TryLabel = styled.span`
  font-size: 13px;
  color: #7a7a70;
`;

const ChipButton = styled.button`
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #c8502a;
  background: transparent;
  border: 1.5px solid #c8502a;
  border-radius: 20px;
  padding: 4px 14px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #c8502a;
    color: #fff;
  }
`;

const EXAMPLE_ID = '1606891';

export function LandingPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  function go(id: string) {
    const trimmed = id.trim();
    if (trimmed) navigate(`/player/${trimmed}`);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    go(value);
  }

  return (
    <Shell>
      <Card>
        <Kicker>Tennis Vlaanderen</Kicker>
        <Heading>Find a player</Heading>
        <Subtitle>
          Enter a player ID to open their ranking profile — singles &amp; doubles points,
          evolution, form and full tournament history.
        </Subtitle>

        <form onSubmit={handleSubmit}>
          <FieldLabel htmlFor="player-id-input">Player ID</FieldLabel>
          <InputRow>
            <SearchInput
              id="player-id-input"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 1606891"
              value={value}
              onChange={e => setValue(e.target.value)}
              autoFocus
            />
            <SearchButton type="submit">Search</SearchButton>
          </InputRow>
        </form>

        <Divider />

        <TryRow>
          <TryLabel>Try this player:</TryLabel>
          <ChipButton type="button" onClick={() => go(EXAMPLE_ID)}>
            {EXAMPLE_ID}
          </ChipButton>
        </TryRow>
      </Card>
    </Shell>
  );
}
