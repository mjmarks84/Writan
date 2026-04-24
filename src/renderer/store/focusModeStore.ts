import { create } from 'zustand';
import type { FocusModeConfig } from '../types/focusMode';
import { focusModeService } from '../services/focusModeService';

interface FocusModeState {
  isActive: boolean;
  config: FocusModeConfig;
  showSettings: boolean;
  lastActivity: number;

  toggle: () => void;
  activate: () => void;
  deactivate: () => void;
  setConfig: (config: Partial<FocusModeConfig>) => void;
  setShowSettings: (show: boolean) => void;
  recordActivity: () => void;
}

export const useFocusModeStore = create<FocusModeState>((set, get) => ({
  isActive: false,
  config: focusModeService.loadConfig(),
  showSettings: false,
  lastActivity: Date.now(),

  toggle: () => {
    const isActive = !get().isActive;
    set({ isActive });
  },
  activate: () => set({ isActive: true, lastActivity: Date.now() }),
  deactivate: () => set({ isActive: false, showSettings: false }),
  setConfig: (partial) => {
    const updated = { ...get().config, ...partial };
    focusModeService.saveConfig(updated);
    set({ config: updated });
  },
  setShowSettings: (showSettings) => set({ showSettings }),
  recordActivity: () => set({ lastActivity: Date.now() })
}));
