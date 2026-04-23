import { DocumentDatabase } from '../database';

describe('DocumentDatabase CRUD and versioning', () => {
  it('creates, updates, and tracks history', () => {
    const db = new DocumentDatabase();
    db.create({ id: '1', title: 'Draft', content: 'alpha' });
    db.update('1', { content: 'beta' });

    expect(db.get('1')?.content).toBe('beta');
    expect(db.getHistory('1')).toHaveLength(2);
  });

  it('prunes history', () => {
    const db = new DocumentDatabase();
    db.create({ id: '1', title: 'Draft', content: 'alpha' });
    db.update('1', { content: 'beta' });
    db.update('1', { content: 'gamma' });

    expect(db.pruneHistory('1', 2)).toHaveLength(2);
  });
});
