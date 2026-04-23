import { clamp } from '../../shared/utils';

export interface SessionMetrics {
  wordsWritten: number;
  minutes: number;
  goal: number;
}

export const analyticsService = {
  wordsPerMinute: ({ wordsWritten, minutes }: SessionMetrics): number => {
    if (minutes <= 0) {
      return 0;
    }

    return Math.round(wordsWritten / minutes);
  },
  goalProgress: ({ wordsWritten, goal }: SessionMetrics): number => {
    if (goal <= 0) {
      return 0;
    }

    return clamp(Math.round((wordsWritten / goal) * 100), 0, 100);
  }
};
