import type { WritingEntry } from '../../../shared/types';

export const WritingHeatmap = ({ entries }: { entries: WritingEntry[] }) => (
  <section className="card" aria-label="Writing heatmap">
    <h3 style={{ marginTop: 0 }}>Writing Heatmap</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {entries.map((entry) => (
        <button
          key={entry.date}
          type="button"
          title={`${entry.date}: ${entry.words} words`}
          style={{ width: 20, height: 20, border: 0, borderRadius: 4, background: `rgba(37,99,235, ${Math.min(1, entry.words / 2000)})` }}
        />
      ))}
    </div>
  </section>
);
