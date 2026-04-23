import { createEditorStore } from '../stores';

describe('store state management', () => {
  it('tracks active document id', () => {
    const store = createEditorStore();
    store.setActiveDocumentId('doc-22');

    expect(store.activeDocumentId).toBe('doc-22');
  });
});
