import type { WritingEntry } from '../../../shared/types';

export const WritingProgressChart = ({ entries, goalWords }: { entries: WritingEntry[]; goalWords: number }) => {
  let cumulative = 0;
  return (
    <section className="card" aria-label="Writing progress chart">
      <h3 style={{ marginTop: 0 }}>Progress Over Time</h3>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {entries.map((entry) => {
          cumulative += entry.words;
          return (
            <li key={entry.date}>
              {entry.date}: +{entry.words} words (cumulative {cumulative}, goal {goalWords})
            </li>
          );
        })}
      </ul>
    </section>
  );
};
