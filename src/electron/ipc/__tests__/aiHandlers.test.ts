import { buildAIContext } from '../aiHandlers';

describe('AI context builder', () => {
  it('builds context and supports offline fallback', () => {
    expect(buildAIContext('scene', 'hero')).toContain('Document:');
    expect(buildAIContext('scene', 'hero', false)).toContain('Offline mode');
  });
});
