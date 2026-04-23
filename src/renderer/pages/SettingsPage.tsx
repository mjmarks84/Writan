import { PageHeader } from '../components/Common/PageHeader';
import { KeyboardSettings } from '../components/Keyboard/KeyboardSettings';
import { BackupSettings } from '../components/Backup/BackupSettings';
import { CloudSyncSettings } from '../components/Backup/CloudSyncSettings';

export const SettingsPage = () => (
  <main className="container" style={{ paddingTop: 24, paddingBottom: 24, display: 'grid', gap: 16 }}>
    <PageHeader title="Settings" subtitle="Keyboard, backup, and sync preferences" />
    <KeyboardSettings />
    <BackupSettings location="~/WritanBackups" onLocationChange={() => undefined} />
    <CloudSyncSettings provider="Google Drive" onProviderChange={() => undefined} />
  </main>
);
