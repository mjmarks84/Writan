import { useCallback, useState } from 'react';
import { getSyncStatus, markSyncCompleted, markSyncStarted } from '../services/cloudSyncService';

export const useCloudSync = () => {
  const [status, setStatus] = useState(getSyncStatus());

  const start = useCallback((pendingFiles: number) => setStatus(markSyncStarted(pendingFiles)), []);
  const finish = useCallback(() => setStatus(markSyncCompleted()), []);

  return { status, start, finish };
};
