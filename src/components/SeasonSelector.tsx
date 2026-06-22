import styled from '@emotion/styled';
import { useTheme } from '../theme';
import { SEASONS } from '../utils';
import type { SeasonTag } from '../utils';

interface Props {
  season: SeasonTag;
  onChange: (tag: SeasonTag) => void;
}

const Card = styled.div`
  background: #fff;
  border: 1px solid #e8e8e0;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 16px;
`;

const ChevronRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChevronButton = styled.button<{ disabled: boolean }>`
  width: 32px;
  height: 32px;
  background: #f1f1ea;
  border: none;
  border-radius: 50%;
  cursor: ${p => p.disabled ? 'default' : 'pointer'};
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${p => p.disabled ? 0.3 : 1};
  pointer-events: ${p => p.disabled ? 'none' : 'auto'};
`;

const SeasonLabel = styled.span<{ color: string }>`
  font-size: 16px;
  font-weight: 600;
  color: ${p => p.color};
`;

const Divider = styled.div`
  height: 1px;
  background: #e8e8e0;
  margin: 12px 0;
`;

const YearStrip = styled.div`
  display: flex;
  justify-content: space-around;
`;

const YearMark = styled.button<{ active: boolean; color: string }>`
  background: none;
  border: none;
  font-family: 'Archivo', sans-serif;
  font-size: 13px;
  color: ${p => p.active ? p.color : '#888'};
  font-weight: ${p => p.active ? 700 : 400};
  cursor: ${p => p.active ? 'default' : 'pointer'};
  padding: 2px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &:hover {
    color: ${p => p.active ? p.color : '#444'};
  }
`;

const ActiveDot = styled.div<{ color: string }>`
  width: 6px;
  height: 3px;
  border-radius: 2px;
  background: ${p => p.color};
`;

export function SeasonSelector({ season, onChange }: Props) {
  const theme = useTheme();
  const idx = SEASONS.findIndex(s => s.tag === season);
  const safeIdx = idx >= 0 ? idx : SEASONS.length - 1;
  const activeLabel = SEASONS[safeIdx].label;
  const activeYear = activeLabel.split(' ').at(-1)!;

  const uniqueYears = [...new Set(SEASONS.map(s => s.label.split(' ').at(-1)!))];

  const handlePrev = () => {
    if (safeIdx > 0) onChange(SEASONS[safeIdx - 1].tag);
  };

  const handleNext = () => {
    if (safeIdx < SEASONS.length - 1) onChange(SEASONS[safeIdx + 1].tag);
  };

  const handleYearClick = (year: string) => {
    const target = [...SEASONS].reverse().find(s => s.label.endsWith(year))!;
    onChange(target.tag);
  };

  return (
    <Card>
      <ChevronRow>
        <ChevronButton type="button" disabled={safeIdx === 0} onClick={handlePrev}>
          &#x2039;
        </ChevronButton>
        <SeasonLabel color={theme.singles}>{activeLabel}</SeasonLabel>
        <ChevronButton type="button" disabled={safeIdx === SEASONS.length - 1} onClick={handleNext}>
          &#x203A;
        </ChevronButton>
      </ChevronRow>
      <Divider />
      <YearStrip>
        {uniqueYears.map(year => {
          const isActive = year === activeYear;
          return (
            <YearMark
              key={year}
              type="button"
              active={isActive}
              color={theme.singles}
              onClick={() => handleYearClick(year)}
            >
              {year}
              {isActive && <ActiveDot color={theme.singles} />}
            </YearMark>
          );
        })}
      </YearStrip>
    </Card>
  );
}
