import { ProgressBar } from '../Design/ProgressBar';

export const SessionGoal = ({ words, goal }: { words: number; goal: number }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Session Goal</h3>
    <ProgressBar value={goal > 0 ? (words / goal) * 100 : 0} />
  </section>
);
