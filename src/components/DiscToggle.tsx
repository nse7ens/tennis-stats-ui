import styled from '@emotion/styled';
import type { Disc } from '../types';

type Variant = 'light' | 'outlined';
type Size = 'sm' | 'md';

const Wrapper = styled.div<{ variant: Variant }>`
  display: flex;
  background: ${p => p.variant === 'light' ? '#f1f1ea' : '#fff'};
  border: ${p => p.variant === 'outlined' ? '1px solid #e6e6df' : 'none'};
  border-radius: ${p => p.variant === 'outlined' ? '10px' : '9px'};
  padding: 3px;
`;

const Tab = styled.button<{ active: boolean; size: Size }>`
  background: ${p => p.active ? '#1a1a17' : 'transparent'};
  color: ${p => p.active ? '#fff' : '#74746b'};
  border: none;
  cursor: pointer;
  font-family: 'Archivo', sans-serif;
  font-size: ${p => p.size === 'sm' ? '12.5px' : '13px'};
  font-weight: 600;
  padding: ${p => p.size === 'sm' ? '6px 13px' : '8px 18px'};
  border-radius: 7px;
  transition: background 0.15s, color 0.15s;
`;

interface Props {
  value: Disc;
  onChange: (v: Disc) => void;
  variant?: Variant;
  size?: Size;
}

export function DiscToggle({ value, onChange, variant = 'light', size = 'sm' }: Props) {
  return (
    <Wrapper variant={variant}>
      <Tab active={value === 'singles'} size={size} type="button" onClick={() => onChange('singles')}>Enkel</Tab>
      <Tab active={value === 'doubles'} size={size} type="button" onClick={() => onChange('doubles')}>Dubbel</Tab>
    </Wrapper>
  );
}
