import styled from '@emotion/styled';

const SIZE_MAP = {
  sm: { dim: '24px', radius: '6px', fontSize: '12px' },
  md: { dim: '26px', radius: '7px', fontSize: '13px' },
  lg: { dim: '42px', radius: '12px', fontSize: '18px' },
} as const;

type BadgeSize = keyof typeof SIZE_MAP;

const Badge = styled.div<{ $win: boolean; $dim: string; $radius: string; $fontSize: string }>`
  background: ${p => p.$win ? 'var(--win-bg)' : 'var(--loss-bg)'};
  color: ${p => p.$win ? 'var(--win)' : 'var(--loss)'};
  border: 1px solid ${p => p.$win ? 'var(--win-border)' : 'var(--loss-border)'};
  width: ${p => p.$dim};
  height: ${p => p.$dim};
  border-radius: ${p => p.$radius};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: ${p => p.$fontSize};
  flex: none;
`;

interface Props { win: boolean; size?: BadgeSize; }

export function WLBadge({ win, size = 'md' }: Props) {
  const s = SIZE_MAP[size];
  return <Badge $win={win} $dim={s.dim} $radius={s.radius} $fontSize={s.fontSize}>{win ? 'W' : 'L'}</Badge>;
}
