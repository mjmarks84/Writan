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

export function registerDatabaseHandlers(ipcMain: IpcMainLike): void {
  ipcMain.handle('database:health', () => {
    try {
      getDatabase().prepare('SELECT 1').get();
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

    const row = getDatabase().prepare(`SELECT COUNT(*) as count FROM ${tableName}`).get() as { count: number };
    return { ok: true, data: row.count };
  });
}
