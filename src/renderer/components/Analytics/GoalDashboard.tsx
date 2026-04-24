import type { Goal } from '../../../shared/types';
import { ProgressBar } from '../Design/ProgressBar';
import { goalProgressPercent, requiredDailyPace } from '../../services/goalService';

export const GoalDashboard = ({ goals }: { goals: Goal[] }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Goal Dashboard</h3>
    <div style={{ display: 'grid', gap: 12 }}>
      {goals.map((goal) => {
        const progress = goalProgressPercent(goal);
        return (
          <article key={goal.id}>
            <strong>{goal.label}</strong>
            <ProgressBar value={progress} />
            <small>{progress}% complete · need {requiredDailyPace(goal)} words/day</small>
          </article>
        );
      })}
    </div>
  </section>
);
