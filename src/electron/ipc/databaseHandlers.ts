import { ipcMain as electronIpcMain, type IpcMain } from 'electron';
import { getDatabase, resetDatabase } from '../db/database';

interface IpcMainLike {
  handle(channel: string, listener: (_event: unknown, ...args: any[]) => any): void;
}

const ALLOWED_TABLES = new Set([
  'projects',
  'documents',
  'characters',
  'locations',
  'plotPoints',
  'timelineEvents',
  'themes',
  'versions',
  'tags',
  'aiSettings',
]);

export function registerDatabaseHandlers(ipcMain: IpcMainLike | IpcMain = electronIpcMain): void {
  const db = getDatabase();
  const countResolvers: Record<string, () => number> = {
    projects: () => (db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number }).count,
    documents: () => (db.prepare('SELECT COUNT(*) as count FROM documents').get() as { count: number }).count,
    characters: () => (db.prepare('SELECT COUNT(*) as count FROM characters').get() as { count: number }).count,
    locations: () => (db.prepare('SELECT COUNT(*) as count FROM locations').get() as { count: number }).count,
    plotPoints: () => (db.prepare('SELECT COUNT(*) as count FROM plotPoints').get() as { count: number }).count,
    timelineEvents: () => (db.prepare('SELECT COUNT(*) as count FROM timelineEvents').get() as { count: number }).count,
    themes: () => (db.prepare('SELECT COUNT(*) as count FROM themes').get() as { count: number }).count,
    versions: () => (db.prepare('SELECT COUNT(*) as count FROM versions').get() as { count: number }).count,
    tags: () => (db.prepare('SELECT COUNT(*) as count FROM tags').get() as { count: number }).count,
    aiSettings: () => (db.prepare('SELECT COUNT(*) as count FROM aiSettings').get() as { count: number }).count,
  };

  ipcMain.handle('database:health', () => {
    try {
      db.prepare('SELECT 1').get();
      return { ok: true, data: { ok: true, message: 'Database healthy' } };
    } catch (error) {
      return { ok: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('database:reset', (_event, mode: 'soft' | 'hard') => {
    resetDatabase(mode);
    return { ok: true };
  });

  ipcMain.handle('database:count', (_event, tableName: string) => {
    if (!ALLOWED_TABLES.has(tableName)) {
      return { ok: false, error: 'Unsupported table name' };
    }

    return { ok: true, data: countResolvers[tableName]() };
  });
}
