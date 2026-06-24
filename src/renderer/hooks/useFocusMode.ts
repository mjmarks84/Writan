import { useCallback, useEffect } from 'react';
import { useFocusModeStore } from '../store/focusModeStore';
import type { FocusModeConfig } from '../types/focusMode';

export function useFocusMode() {
  const store = useFocusModeStore();

  // Keyboard shortcut: F11 toggles focus mode, ESC reveals settings in focus mode
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'F11') {
        e.preventDefault();
        store.toggle();
      }
      if (e.key === 'Escape' && store.isActive) {
        e.preventDefault();
        store.setShowSettings(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [store]);

  const updateConfig = useCallback((partial: Partial<FocusModeConfig>) => {
    store.setConfig(partial);
  }, [store]);

  return {
    isActive: store.isActive,
    config: store.config,
    showSettings: store.showSettings,
    toggle: store.toggle,
    activate: store.activate,
    deactivate: store.deactivate,
    updateConfig,
    setShowSettings: store.setShowSettings,
    recordActivity: store.recordActivity
  };
}
