import { Button } from '../Design/Button';
import { Input } from '../Design/Input';

interface Props {
  running: boolean;
  elapsed: string;
  words: number;
  wpm: number;
  goal: number;
  onGoalChange: (value: number) => void;
  onStartPause: () => void;
  onStop: () => void;
}

export const WritingSessionTracker = ({ running, elapsed, words, wpm, goal, onGoalChange, onStartPause, onStop }: Props) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Writing Session</h3>
    <p style={{ margin: '4px 0' }}>Timer: {elapsed}</p>
    <p style={{ margin: '4px 0' }}>Words: {words} • WPM: {wpm}</p>
    <label>
      Session goal
      <Input type="number" value={goal} onChange={(event) => onGoalChange(Number(event.target.value || 0))} />
    </label>
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
      <Button onClick={onStartPause}>{running ? 'Pause' : 'Start'}</Button>
      <Button variant="secondary" onClick={onStop}>Stop</Button>
    </div>
  </section>
);
