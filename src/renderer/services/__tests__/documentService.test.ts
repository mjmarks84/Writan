import { documentService } from '../documentService';

describe('document service', () => {
  it('creates and fetches documents', () => {
    documentService.create('svc-1', 'Service Doc', 'content');

    expect(documentService.get('svc-1')?.title).toBe('Service Doc');
  });
});
