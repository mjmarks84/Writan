import { Input } from '../Design/Input';
import type { ShortcutBinding } from '../../services/keyboardService';

interface Props {
  shortcut: ShortcutBinding;
  onChange: (next: ShortcutBinding) => void;
}

export const ShortcutEditor = ({ shortcut, onChange }: Props) => (
  <label style={{ display: 'block' }}>
    {shortcut.action}
    <Input value={shortcut.keys} onChange={(event) => onChange({ ...shortcut, keys: event.target.value })} />
  </label>
);
