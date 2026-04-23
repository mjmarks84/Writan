import { analyticsService } from '../analyticsService';

describe('analytics service', () => {
  it('calculates pace and goal progress', () => {
    expect(analyticsService.wordsPerMinute({ wordsWritten: 120, minutes: 30, goal: 500 })).toBe(4);
    expect(analyticsService.goalProgress({ wordsWritten: 250, minutes: 30, goal: 500 })).toBe(50);
  });
});
