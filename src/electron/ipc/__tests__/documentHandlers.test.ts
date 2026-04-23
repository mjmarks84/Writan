import { createDocument, getDocument, updateDocument } from '../documentHandlers';

describe('document handlers', () => {
  it('performs document CRUD operations', () => {
    createDocument('doc-1', 'Title', 'start');
    updateDocument('doc-1', 'updated');

    expect(getDocument('doc-1')?.content).toBe('updated');
  });
});
