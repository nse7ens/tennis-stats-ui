import styled from '@emotion/styled';
import type { UIDisc, UIRecentMatch } from '../types';
import { RadarChart } from './RadarChart';
import { RecentForm } from './RecentForm';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 14px;
`;

interface Props {
  singles: UIDisc; doubles: UIDisc;
  recentSingles: UIRecentMatch[]; recentDoubles: UIRecentMatch[];
}

export function PerformancePanel({ singles, doubles, recentSingles, recentDoubles }: Props) {
  return (
    <Grid>
      <RadarChart singles={singles} doubles={doubles} />
      <RecentForm singles={recentSingles} doubles={recentDoubles} />
    </Grid>
  );
}
