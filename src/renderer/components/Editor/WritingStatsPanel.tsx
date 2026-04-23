import type { WritingStats } from '../../types/stats';

interface WritingStatsPanelProps {
  stats: WritingStats;
}

export const WritingStatsPanel = ({ stats }: WritingStatsPanelProps) => (
  <section className="writing-stats-panel" aria-label="Writing stats">
    <h3>Writing Stats</h3>
    <ul>
      <li>Word count: {stats.words}</li>
      <li>Character count: {stats.characters}</li>
      <li>Character count (no spaces): {stats.charactersNoSpaces}</li>
      <li>Estimated reading time: {stats.readingTimeMinutes} minutes</li>
      <li>Writing pace: {stats.writingPaceWpm} WPM</li>
      <li>Session time: {Math.floor(stats.sessionSeconds / 60)} minutes</li>
    </ul>
  </section>
);
