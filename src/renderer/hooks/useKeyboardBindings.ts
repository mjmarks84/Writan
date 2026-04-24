import { useCallback, useMemo, useState } from 'react';
import { defaultShortcuts, hasShortcutConflict, type ShortcutBinding } from '../services/keyboardService';

export const useKeyboardBindings = () => {
  const [shortcuts, setShortcuts] = useState<ShortcutBinding[]>(defaultShortcuts);

  const updateShortcut = useCallback((updated: ShortcutBinding) => {
    if (hasShortcutConflict(shortcuts, updated)) return false;
    setShortcuts((current) => current.map((shortcut) => (shortcut.id === updated.id ? updated : shortcut)));
    return true;
  }, [shortcuts]);

  return useMemo(() => ({ shortcuts, updateShortcut }), [shortcuts, updateShortcut]);
};
