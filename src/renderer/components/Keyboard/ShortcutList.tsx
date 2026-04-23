import type { ShortcutBinding } from '../../services/keyboardService';

export const ShortcutList = ({ shortcuts }: { shortcuts: ShortcutBinding[] }) => (
  <ul style={{ margin: 0, paddingLeft: 18 }}>
    {shortcuts.map((shortcut) => (
      <li key={shortcut.id}>{shortcut.action}: {shortcut.keys}</li>
    ))}
  </ul>
);
