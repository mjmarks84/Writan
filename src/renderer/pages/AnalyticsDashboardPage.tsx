import { PageHeader } from '../components/Common/PageHeader';
import { AnalyticsDashboard } from '../components/Analytics/AnalyticsDashboard';

export const AnalyticsDashboardPage = () => {
  const entries = [
    { date: '2026-04-20', words: 930, minutes: 45 },
    { date: '2026-04-21', words: 1410, minutes: 62 },
    { date: '2026-04-22', words: 1115, minutes: 50 }
  ];

  const goals = [{ id: 'daily', label: 'Daily Goal', target: 1200, current: 1115, deadline: '2026-04-30' }];

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <PageHeader title="Analytics Dashboard" subtitle="Project metrics, trends, and insights" />
      <AnalyticsDashboard entries={entries} goals={goals} sampleText={'"Hello," she said. The old road was quiet. It was painted and weathered.'} genre="fantasy" projectGoalWords={90000} />
    </main>
  );
};
