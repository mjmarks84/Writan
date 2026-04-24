import type { WritingEntry } from '../../../shared/types';

export const WritingPaceChart = ({ entries }: { entries: WritingEntry[] }) => (
  <section className="card" aria-label="Writing pace chart">
    <h3 style={{ marginTop: 0 }}>Writing Pace</h3>
    <div style={{ display: 'grid', gap: 8 }}>
      {entries.map((entry) => (
        <div key={entry.date} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 8 }}>
          <span>{entry.date}</span>
          <div style={{ height: 8, borderRadius: 999, background: 'var(--color-border)' }}>
            <div style={{ width: `${Math.min(100, Math.max(4, entry.words / 20))}%`, height: '100%', borderRadius: 999, background: 'var(--color-primary)' }} />
          </div>
        </div>
      ))}
    </div>
  </section>
);
