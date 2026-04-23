import type { DatabaseHealthResult, DatabaseResetMode } from '../types/database';

async function invoke<T>(channel: string, ...args: unknown[]): Promise<T> {
  const response = await window.electronAPI.invoke<T>(channel, ...args);
  if (!response.ok || response.data === undefined) throw new Error(response.error ?? `${channel} failed`);
  return response.data;
}

export const databaseService = {
  health(): Promise<DatabaseHealthResult> {
    return invoke<DatabaseHealthResult>('database:health');
  },
  reset(mode: DatabaseResetMode): Promise<void> {
    return invoke<void>('database:reset', mode);
  },
  count(tableName: string): Promise<number> {
    return invoke<number>('database:count', tableName);
  },
};
