import type { Goal, WritingEntry } from '../../../shared/types';
import { buildProjectStats } from '../../services/analyticsService';
import { StatsOverview } from './StatsOverview';
import { WritingProgressChart } from './WritingProgressChart';
import { WritingPaceChart } from './WritingPaceChart';
import { WritingHeatmap } from './WritingHeatmap';
import { GenreAnalysis } from './GenreAnalysis';
import { StyleAnalytics } from './StyleAnalytics';
import { GoalDashboard } from './GoalDashboard';
import { InsightPanel } from './InsightPanel';
import { ReportGenerator } from './ReportGenerator';

interface Props {
  entries: WritingEntry[];
  goals: Goal[];
  sampleText: string;
  genre: string;
  projectGoalWords: number;
}

export const AnalyticsDashboard = ({ entries, goals, sampleText, genre, projectGoalWords }: Props) => {
  const stats = buildProjectStats(entries, projectGoalWords);

  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <StatsOverview stats={stats} />
      <WritingProgressChart entries={entries} goalWords={projectGoalWords} />
      <WritingPaceChart entries={entries} />
      <WritingHeatmap entries={entries} />
      <GoalDashboard goals={goals} />
      <GenreAnalysis genre={genre} words={stats.totalWords} />
      <StyleAnalytics text={sampleText} />
      <InsightPanel insights={[{ id: '1', severity: 'medium', message: 'Your strongest output is on weekends.' }]} />
      <ReportGenerator entries={entries} />
    </div>
  );
};
