import { describe, expect, it } from 'vitest';
import {
  calculateWritingPace,
  calculateWritingStats,
  countCharactersNoSpaces,
  countWords,
  estimateReadingTimeMinutes
} from './editorStatsService';

describe('editorStatsService', () => {
  it('counts words and characters', () => {
    expect(countWords('one two three')).toBe(3);
    expect(countCharactersNoSpaces('a b c')).toBe(3);
  });

  it('estimates reading time with minimum 1 minute', () => {
    expect(estimateReadingTimeMinutes(1)).toBe(1);
    expect(estimateReadingTimeMinutes(450)).toBe(3);
  });

  it('calculates writing pace and stats', () => {
    expect(calculateWritingPace(120, 60)).toBe(120);
    const stats = calculateWritingStats({ text: 'hello world', sessionSeconds: 120, dailyGoal: 500 });
    expect(stats.words).toBe(2);
    expect(stats.dailyGoal).toBe(500);
  });
});
