import type { DocumentItem, DocumentStats, Project } from '../../shared/types';

async function invoke<T>(channel: string, ...args: unknown[]): Promise<T> {
  const response = await window.writan.invoke<T>(channel, ...args);
  if (!response.ok || response.data === undefined) throw new Error(response.error ?? `${channel} failed`);
  return response.data;
}

export const documentService = {
  // Phase 1 document CRUD/lifecycle
  createProject(payload: Pick<Project, 'name' | 'description' | 'genre' | 'status'>): Promise<Project> {
    return invoke<Project>('document:createProject', payload);
  },
  create(payload: Pick<DocumentItem, 'projectId' | 'title' | 'content' | 'order'>): Promise<DocumentItem> {
    return invoke<DocumentItem>('document:create', payload);
  },
  open(documentId: string): Promise<DocumentItem> {
    return invoke<DocumentItem>('document:open', documentId);
  },
  save(id: string, content: string, title?: string): Promise<DocumentItem> {
    return invoke<DocumentItem>('document:save', { id, content, title });
  },
  autoSave(idOrContent: string, content?: string): Promise<unknown> {
    // Backwards compatible: scaffold called autoSave(content) with no id.
    if (content === undefined) {
      return window.writan.autoSave(idOrContent);
    }
    return invoke<DocumentItem>('document:autoSave', { id: idOrContent, content });
  },
  duplicate(documentId: string): Promise<DocumentItem> {
    return invoke<DocumentItem>('document:duplicate', documentId);
  },
  delete(documentId: string): Promise<void> {
    return invoke<void>('document:delete', documentId);
  },
  list(projectId: string): Promise<DocumentItem[]> {
    return invoke<DocumentItem[]>('document:list', projectId);
  },
  stats(content: string): Promise<DocumentStats> {
    return invoke<DocumentStats>('document:stats', content);
  },
  search(projectId: string, query: string): Promise<DocumentItem[]> {
    return invoke<DocumentItem[]>('document:search', projectId, query);
  },
  // Backwards compatible scaffold helper
  createNew: () => window.writan.newDocument(),
};
