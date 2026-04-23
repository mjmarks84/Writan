import { ipcMain } from 'electron';
import { DocumentDatabase } from '../db/database';

let lastSaved = '';
const db = new DocumentDatabase();

export const createDocument = (id: string, title: string, content: string) => {
  return db.create({ id, title, content });
};

export const updateDocument = (id: string, content: string) => {
  return db.update(id, { content });
};

export const getDocument = (id: string) => db.get(id);

export function registerDocumentHandlers() {
  ipcMain.handle('document:new', async () => ({ title: 'Untitled Manuscript', content: '' }));
  ipcMain.handle('document:autoSave', async (_event, content: string) => {
    lastSaved = content;
    return { ok: true, lastSavedAt: new Date().toISOString() };
  });
  ipcMain.handle('document:lastSaved', async () => lastSaved);
}
