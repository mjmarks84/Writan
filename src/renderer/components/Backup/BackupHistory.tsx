import type { BackupSnapshot } from '../../services/backupService';
import { formatBackupSize } from '../../services/backupService';

export const BackupHistory = ({ backups }: { backups: BackupSnapshot[] }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Backup History</h3>
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {backups.map((backup) => (
        <li key={backup.id}>{new Date(backup.createdAt).toLocaleString()} · {formatBackupSize(backup.bytes)}</li>
      ))}
    </ul>
  </section>
);
