import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Bar = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: #9b9b90;
  text-align: center;
  pointer-events: none;
`;

const FooterLink = styled(Link)`
  color: #9b9b90;
  text-decoration: none;
  pointer-events: all;

  &:hover {
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a`
  color: #9b9b90;
  text-decoration: none;
  pointer-events: all;

  &:hover {
    text-decoration: underline;
  }
`;

export function Footer() {
  return (
    <Bar>
      Onofficieel project · Data via{' '}
      <ExternalLink href="https://tennisstats.be" target="_blank" rel="noopener noreferrer">
        tennisstats.be
      </ExternalLink>
      {' '}· Geen affiliatie ·{' '}
      <FooterLink to="/privacy">Privacy</FooterLink>
    </Bar>
  );
}
