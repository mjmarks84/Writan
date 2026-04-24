import type { SyncStatus as SyncStatusType } from '../../../shared/types';

export const SyncStatus = ({ status }: { status: SyncStatusType }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Sync Status</h3>
    <p style={{ margin: 0 }}>
      {status.offline ? 'Offline' : status.syncing ? 'Syncing…' : 'Idle'} · Pending files: {status.pendingFiles}
      {status.lastSyncAt ? ` · Last sync: ${new Date(status.lastSyncAt).toLocaleString()}` : ''}
    </p>
  </section>
);
