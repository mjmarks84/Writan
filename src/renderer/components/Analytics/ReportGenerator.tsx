import type { WritingEntry } from '../../../shared/types';

export const ReportGenerator = ({ entries }: { entries: WritingEntry[] }) => {
  const csv = ['date,words,minutes', ...entries.map((entry) => `${entry.date},${entry.words},${entry.minutes}`)].join('\n');

  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Analytics Export</h3>
      <textarea readOnly value={csv} aria-label="CSV export preview" style={{ width: '100%', minHeight: 120 }} />
    </section>
  );
};
