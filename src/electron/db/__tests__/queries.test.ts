import { findByTitle } from '../queries';

describe('query execution', () => {
  it('finds records by title', () => {
    const records = [
      { id: '1', title: 'Chapter One', content: 'x', updatedAt: '2025-01-01' },
      { id: '2', title: 'Outline', content: 'y', updatedAt: '2025-01-01' }
    ];

    expect(findByTitle(records, 'chapter')).toHaveLength(1);
  });
});
