import type { WritingEntry } from '../../shared/types';

export interface ProjectStatsOverview {
  totalWords: number;
  completionPercent: number;
  totalSessions: number;
  currentStreak: number;
  averageWordsPerDay: number;
  averageWordsPerWeek: number;
  totalHours: number;
}

export const buildProjectStats = (entries: WritingEntry[], targetWords = 80000): ProjectStatsOverview => {
  const totalWords = entries.reduce((sum, entry) => sum + entry.words, 0);
  const totalMinutes = entries.reduce((sum, entry) => sum + entry.minutes, 0);
  const uniqueDates = new Set(entries.map((entry) => entry.date)).size || 1;

  return {
    totalWords,
    completionPercent: Math.min(100, Math.round((totalWords / Math.max(1, targetWords)) * 100)),
    totalSessions: entries.length,
    currentStreak: estimateCurrentStreak(entries),
    averageWordsPerDay: Math.round(totalWords / uniqueDates),
    averageWordsPerWeek: Math.round((totalWords / uniqueDates) * 7),
    totalHours: Number((totalMinutes / 60).toFixed(1))
  };
};

export const estimateCurrentStreak = (entries: WritingEntry[]): number => {
  const dates = [...new Set(entries.map((entry) => entry.date))].sort().reverse();
  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const date of dates) {
    const current = cursor.toISOString().slice(0, 10);
    if (date === current) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    if (date < current) break;
  }

  return streak;
};
