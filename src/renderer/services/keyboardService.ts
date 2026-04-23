export interface ShortcutBinding {
  id: string;
  action: string;
  keys: string;
}

export const defaultShortcuts: ShortcutBinding[] = [
  { id: 'save', action: 'Save', keys: 'Ctrl+S' },
  { id: 'find', action: 'Find', keys: 'Ctrl+F' },
  { id: 'zen', action: 'Toggle Zen Mode', keys: 'Ctrl+Shift+Z' }
];

export const hasShortcutConflict = (shortcuts: ShortcutBinding[], next: ShortcutBinding): boolean =>
  shortcuts.some((shortcut) => shortcut.id !== next.id && shortcut.keys.toLowerCase() === next.keys.toLowerCase());
