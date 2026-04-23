import { editorService } from '../editorService';

describe('editor service functionality', () => {
  it('formats text and counts words', () => {
    expect(editorService.applyBold('test')).toBe('**test**');
    expect(editorService.getWordCount('one two three')).toBe(3);
  });
});
