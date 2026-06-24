import styled from '@emotion/styled';

const Btn = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 200;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.10);

  &:hover {
    color: var(--text-primary);
    border-color: var(--text-muted);
  }
`;

interface Props { dark: boolean; onToggle: () => void; }

export function DarkModeToggle({ dark, onToggle }: Props) {
  return (
    <Btn
      type="button"
      onClick={onToggle}
      title={dark ? 'Schakel naar lichtmodus' : 'Schakel naar donkere modus'}
      aria-label={dark ? 'Schakel naar lichtmodus' : 'Schakel naar donkere modus'}
    >
      <i className={dark ? 'ti ti-sun' : 'ti ti-moon'} />
    </Btn>
  );
}
