import { Input } from '../Design/Input';

export const ZenSettings = ({ background, onBackgroundChange }: { background: string; onBackgroundChange: (next: string) => void }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Zen Settings</h3>
    <label>
      Background
      <Input value={background} onChange={(event) => onBackgroundChange(event.target.value)} />
    </label>
  </section>
);
