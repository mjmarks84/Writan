import { getDatabase } from '../db/database';
import { DatabaseQueries } from '../db/queries';
import { logger } from '../utils/logger';

interface IpcMainLike {
  handle(channel: string, listener: (_event: unknown, ...args: any[]) => any): void;
}

export function registerDocumentHandlers(ipcMain: IpcMainLike): void {
  const queries = new DatabaseQueries(getDatabase());

  ipcMain.handle('document:createProject', (_event, payload) => {
    try {
      return { ok: true, data: queries.createProject(payload) };
    } catch (error) {
      logger.error('createProject failed', error);
      return { ok: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('document:create', (_event, payload) => {
    try {
      return { ok: true, data: queries.createDocument(payload) };
    } catch (error) {
      logger.error('createDocument failed', error);
      return { ok: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('document:open', (_event, documentId: string) => {
    const doc = queries.getDocument(documentId);
    return doc ? { ok: true, data: doc } : { ok: false, error: 'Document not found' };
  });

  ipcMain.handle('document:save', (_event, payload: { id: string; content: string; title?: string }) => {
    try {
      const updated = queries.saveDocument(payload.id, payload.content, payload.title);
      queries.createVersion(payload.id, payload.content, false);
      return { ok: true, data: updated };
    } catch (error) {
      logger.error('saveDocument failed', error);
      return { ok: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('document:autoSave', (_event, payload: { id: string; content: string }) => {
    try {
      const updated = queries.saveDocument(payload.id, payload.content);
      queries.createVersion(payload.id, payload.content, true);
      return { ok: true, data: updated };
    } catch (error) {
      logger.error('autoSave failed', error);
      return { ok: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('document:duplicate', (_event, documentId: string) => {
    try {
      return { ok: true, data: queries.duplicateDocument(documentId) };
    } catch (error) {
      logger.error('duplicateDocument failed', error);
      return { ok: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('document:delete', (_event, documentId: string) => {
    try {
      queries.deleteDocument(documentId);
      return { ok: true };
    } catch (error) {
      logger.error('deleteDocument failed', error);
      return { ok: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('document:list', (_event, projectId: string) => ({ ok: true, data: queries.listDocuments(projectId) }));
  ipcMain.handle('document:stats', (_event, content: string) => ({ ok: true, data: queries.documentStats(content) }));
  ipcMain.handle('document:search', (_event, projectId: string, query: string) => ({ ok: true, data: queries.searchDocuments(projectId, query) }));
}
