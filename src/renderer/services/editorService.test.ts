import { describe, expect, it } from 'vitest';
import { findMatches, replaceInText } from './editorService';

describe('editorService', () => {
  it('finds literal and regex matches', () => {
    expect(findMatches('Scene one scene two', 'scene').length).toBe(2);
    expect(findMatches('abc123def', '\\d+', true).length).toBe(1);
  });

  it('replaces text once and globally', () => {
    expect(replaceInText('cat cat', 'cat', 'dog')).toBe('dog cat');
    expect(replaceInText('cat cat', 'cat', 'dog', false, true)).toBe('dog dog');
  });
});
