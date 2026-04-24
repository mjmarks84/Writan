import type { ProjectStatsOverview } from '../../services/analyticsService';
import { Card } from '../Design/Card';

export const StatsOverview = ({ stats }: { stats: ProjectStatsOverview }) => (
  <Card>
    <h2 style={{ marginTop: 0 }}>Project Overview</h2>
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      <li>Total words: {stats.totalWords.toLocaleString()}</li>
      <li>Completion: {stats.completionPercent}%</li>
      <li>Total sessions: {stats.totalSessions}</li>
      <li>Current streak: {stats.currentStreak} days</li>
      <li>Pace: {stats.averageWordsPerDay}/day • {stats.averageWordsPerWeek}/week</li>
      <li>Time invested: {stats.totalHours} hours</li>
    </ul>
  </Card>
);
