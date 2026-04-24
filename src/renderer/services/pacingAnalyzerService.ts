export interface PacingInsight {
  label: string;
  score: number;
}

export const analyzePacing = (chapterWordCounts: number[]): PacingInsight[] => {
  if (!chapterWordCounts.length) return [];

  const average = chapterWordCounts.reduce((sum, count) => sum + count, 0) / chapterWordCounts.length;
  const variance = chapterWordCounts.reduce((sum, count) => sum + Math.pow(count - average, 2), 0) / chapterWordCounts.length;

  return [
    { label: 'Chapter Balance', score: Math.max(0, 100 - Math.round(Math.sqrt(variance) / 10)) },
    { label: 'Scene Consistency', score: Math.max(0, 100 - Math.round(Math.sqrt(variance) / 12)) }
  ];
};
