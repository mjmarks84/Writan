import type { SyncStatus } from '../../shared/types';

let status: SyncStatus = {
  syncing: false,
  pendingFiles: 0,
  offline: false
};

export const getSyncStatus = (): SyncStatus => status;

export const markSyncStarted = (pendingFiles: number): SyncStatus => {
  status = { syncing: true, pendingFiles, offline: false, lastSyncAt: status.lastSyncAt };
  return status;
};

export const markSyncCompleted = (): SyncStatus => {
  status = { syncing: false, pendingFiles: 0, offline: false, lastSyncAt: new Date().toISOString() };
  return status;
};
