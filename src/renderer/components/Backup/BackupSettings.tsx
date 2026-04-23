import { Input } from '../Design/Input';

export const BackupSettings = ({ location, onLocationChange }: { location: string; onLocationChange: (value: string) => void }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Backup Settings</h3>
    <label>
      Backup location
      <Input value={location} onChange={(event) => onLocationChange(event.target.value)} />
    </label>
  </section>
);
