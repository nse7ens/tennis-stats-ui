import { Link } from 'react-router-dom';
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
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1a1a17;
  margin: 0 0 24px;
  line-height: 1.1;
`;

const Body = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #5a5a52;
  margin: 0 0 32px;
`;

const BackLink = styled(Link)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: #9b9b90;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Anchor = styled.a`
  color: #c8502a;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export function PrivacyPage() {
  return (
    <Shell>
      <Card>
        <Kicker>Tennis Stats</Kicker>
        <Heading>Privacy & disclaimer</Heading>
        <Body>
          Dit is een onofficieel, niet-commercieel project zonder affiliatie met{' '}
          <Anchor href="https://tennisstats.be" target="_blank" rel="noopener noreferrer">
            tennisstats.be
          </Anchor>
          . De site toont spelersdata die publiek beschikbaar is via de API van tennisstats.be —
          er wordt geen data opgeslagen, verwerkt of gedeeld door deze applicatie.
          Voor vragen, correcties of verwijderverzoeken kun je een{' '}
          <Anchor
            href="https://github.com/nse7ens/tennis-stats-ui/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Issue aanmaken
          </Anchor>
          .
        </Body>
        <BackLink to="/">← Terug naar startpagina</BackLink>
      </Card>
    </Shell>
  );
}
