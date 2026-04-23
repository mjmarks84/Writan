import { ProgressBar } from '../Design/ProgressBar';

interface Props {
  phase: 'work' | 'break';
  elapsedSeconds: number;
  durationSeconds: number;
}

export const PomodoroTimer = ({ phase, elapsedSeconds, durationSeconds }: Props) => {
  const progress = durationSeconds ? Math.round((elapsedSeconds / durationSeconds) * 100) : 0;
  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Pomodoro Timer</h3>
      <p style={{ margin: '4px 0' }}>{phase === 'work' ? 'Work Interval' : 'Break Interval'}</p>
      <ProgressBar value={progress} />
    </section>
  );
};
