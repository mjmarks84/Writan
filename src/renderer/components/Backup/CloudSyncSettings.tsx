import { Dropdown } from '../Design/Dropdown';

export const CloudSyncSettings = ({ provider, onProviderChange }: { provider: string; onProviderChange: (value: string) => void }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Cloud Sync</h3>
    <Dropdown options={['Google Drive', 'Dropbox', 'OneDrive']} value={provider} onChange={onProviderChange} />
  </section>
);
