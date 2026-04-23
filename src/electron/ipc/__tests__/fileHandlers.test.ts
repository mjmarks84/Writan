import { isSupportedFile, normalizeExportContent, validateImportFile } from '../fileHandlers';

describe('file I/O validation', () => {
  it('accepts supported import extensions', () => {
    expect(isSupportedFile('chapter.docx')).toBe(true);
    expect(isSupportedFile('outline.epub')).toBe(true);
    expect(isSupportedFile('notes.exe')).toBe(false);
  });

  it('handles size limits and normalization', () => {
    expect(validateImportFile('book.md', 1024).valid).toBe(true);
    expect(validateImportFile('book.md', 100 * 1024 * 1024).valid).toBe(false);
    expect(normalizeExportContent('a\r\nb')).toBe('a\nb');
  });
});
