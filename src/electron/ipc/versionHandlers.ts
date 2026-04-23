import { getDatabase } from '../db/database';
import { DatabaseQueries } from '../db/queries';

interface IpcMainLike {
  handle(channel: string, listener: (_event: unknown, ...args: any[]) => any): void;
}

export function registerVersionHandlers(ipcMain: IpcMainLike): void {
  const queries = new DatabaseQueries(getDatabase());

  ipcMain.handle('version:list', (_event, documentId: string) => ({
    ok: true,
    data: queries.listVersions(documentId),
  }));

  ipcMain.handle('version:recover', (_event, versionId: string) => {
    try {
      return { ok: true, data: queries.recoverVersion(versionId) };
    } catch (error) {
      return { ok: false, error: (error as Error).message };
    }
  });
}
