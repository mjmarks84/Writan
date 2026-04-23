import type { DocumentItem, DocumentStats, Project } from '../../shared/types';

async function invoke<T>(channel: string, ...args: unknown[]): Promise<T> {
  const response = await window.electronAPI.invoke<T>(channel, ...args);
  if (!response.ok || response.data === undefined) throw new Error(response.error ?? `${channel} failed`);
  return response.data;
}

export const documentService = {
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
  autoSave(id: string, content: string): Promise<DocumentItem> {
    return invoke<DocumentItem>('document:autoSave', { id, content });
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
};
