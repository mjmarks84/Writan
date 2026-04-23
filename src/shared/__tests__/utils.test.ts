import { clamp, wordCount } from '../utils';

describe('shared utilities', () => {
  it('counts words and clamps values', () => {
    expect(wordCount('  one two  ')).toBe(2);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});
