import { ipcMain } from 'electron';

let lastSaved = '';

export function registerDocumentHandlers() {
  ipcMain.handle('document:new', async () => ({ title: 'Untitled Manuscript', content: '' }));
  ipcMain.handle('document:autoSave', async (_event, content: string) => {
    lastSaved = content;
    return { ok: true, lastSavedAt: new Date().toISOString() };
  });
  ipcMain.handle('document:lastSaved', async () => lastSaved);
}
