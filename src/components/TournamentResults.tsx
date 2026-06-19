import { useState } from 'react';
import styled from '@emotion/styled';
import type { UIDisc, Disc } from '../types';
import { DiscToggle } from './DiscToggle';
import { TournamentCard } from './TournamentCard';

const Section = styled.section``;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Kicker = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9a9a90;
  font-weight: 600;
`;

const Title = styled.h2`
  margin: 4px 0 0;
  font-size: clamp(20px, 3vw, 27px);
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 14px;
  align-items: start;
`;

const FootNote = styled.div`
  margin-top: 14px;
  font-size: 11.5px;
  color: #a3a399;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HollowDot = styled.span`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: transparent;
  border: 1.5px solid #d3d3cb;
  display: inline-block;
`;

interface Props { singles: UIDisc; doubles: UIDisc; }

export function TournamentResults({ singles, doubles }: Props) {
  const [disc, setDisc] = useState<Disc>('singles');
  const results = disc === 'singles' ? singles.results : doubles.results;

  return (
    <Section>
      <SectionHeader>
        <div>
          <Kicker>Match by match</Kicker>
          <Title>Tournament results</Title>
        </div>
        <DiscToggle value={disc} onChange={setDisc} variant="outlined" size="md" />
      </SectionHeader>
      <Grid>
        {results.map((r, i) => <TournamentCard key={i} result={r} />)}
      </Grid>
      <FootNote>
        <HollowDot />
        Hollow markers are unplayed rounds in the draw. Faded cards were not counted toward the ranking calculation.
      </FootNote>
    </Section>
  );
}
