import styled from '@emotion/styled';
import { useTheme } from '../theme';
import { SEASONS } from '../utils';
import type { SeasonTag } from '../utils';

interface Props {
  season: SeasonTag;
  onChange: (tag: SeasonTag) => void;
}

const RANGE_START = SEASONS[0].start;
const RANGE_END = SEASONS[SEASONS.length - 1].start + 0.5;
const RANGE = RANGE_END - RANGE_START;

const toPercent = (val: number) => `${((val - RANGE_START) / RANGE) * 100}%`;

const YEAR_POSITIONS = [...new Set(SEASONS.map(s => s.label.split(' ').at(-1)!))].map(year => ({
  year,
  pct: toPercent(parseInt(year)),
}));

const Card = styled.div`
  background: #fff;
  border: 1px solid #e8e8e0;
  border-radius: 12px;
  padding: 10px 20px 14px;
  margin-bottom: 16px;
`;

const ChevronRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ChevronBtn = styled.button<{ disabled: boolean }>`
  width: 24px;
  height: 24px;
  background: #f1f1ea;
  border: none;
  border-radius: 50%;
  cursor: ${p => p.disabled ? 'default' : 'pointer'};
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${p => p.disabled ? 0.3 : 1};
  pointer-events: ${p => p.disabled ? 'none' : 'auto'};
  color: #555;
  transition: background 0.12s;

  &:hover {
    background: ${p => p.disabled ? '#f1f1ea' : '#e4e4dc'};
  }
`;

const SeasonLabel = styled.span<{ color: string }>`
  font-size: 15px;
  font-weight: 600;
  color: ${p => p.color};
`;

const TimelineWrap = styled.div`
  padding: 0 2px;
`;

const Track = styled.div`
  position: relative;
  height: 8px;
  background: #e4e4dc;
  border-radius: 4px;
`;

const ActiveSegment = styled.div<{ left: string; width: string; color: string }>`
  position: absolute;
  top: 0;
  left: ${p => p.left};
  width: ${p => p.width};
  height: 100%;
  background: ${p => p.color};
  border-radius: 4px;
  transition: left 0.2s, width 0.2s;
`;

const LabelsRow = styled.div`
  position: relative;
  height: 18px;
  margin-top: 3px;
`;

const YearLabel = styled.button<{ left: string; active: boolean; color: string }>`
  position: absolute;
  left: ${p => p.left};
  transform: translateX(-50%);
  font-family: 'Archivo', sans-serif;
  font-size: 11px;
  font-weight: ${p => p.active ? 700 : 400};
  color: ${p => p.active ? p.color : '#aaa'};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 18px;

  &:hover {
    color: ${p => p.active ? p.color : '#555'};
  }
`;

export function SeasonSelector({ season, onChange }: Props) {
  const theme = useTheme();
  const idx = SEASONS.findIndex(s => s.tag === season);
  const safeIdx = idx >= 0 ? idx : SEASONS.length - 1;
  const current = SEASONS[safeIdx];
  const next = SEASONS[safeIdx + 1];

  const segLeft = toPercent(current.start);
  const segEnd = next?.start ?? current.start + 0.5;
  const segWidth = `${((segEnd - current.start) / RANGE) * 100}%`;

  const activeYear = current.label.split(' ').at(-1)!;

  const handleYearClick = (year: string) => {
    const target = [...SEASONS].reverse().find(s => s.label.endsWith(year))!;
    onChange(target.tag);
  };

  return (
    <Card>
      <ChevronRow>
        <ChevronBtn
          type="button"
          disabled={safeIdx === 0}
          onClick={() => onChange(SEASONS[safeIdx - 1].tag)}
        >
          &#x2039;
        </ChevronBtn>
        <SeasonLabel color={theme.singles}>{current.label}</SeasonLabel>
        <ChevronBtn
          type="button"
          disabled={safeIdx === SEASONS.length - 1}
          onClick={() => onChange(SEASONS[safeIdx + 1].tag)}
        >
          &#x203A;
        </ChevronBtn>
      </ChevronRow>
      <TimelineWrap>
        <Track>
          <ActiveSegment left={segLeft} width={segWidth} color={theme.singles} />
        </Track>
        <LabelsRow>
          {YEAR_POSITIONS.map(({ year, pct }) => (
            <YearLabel
              key={year}
              type="button"
              left={pct}
              active={year === activeYear}
              color={theme.singles}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </YearLabel>
          ))}
        </LabelsRow>
      </TimelineWrap>
    </Card>
  );
}
