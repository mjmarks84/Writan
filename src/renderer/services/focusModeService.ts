import { FOCUS_MODE_DEFAULTS } from '../types/focusMode';
import type { FocusModeConfig } from '../types/session';

const STORAGE_KEY = 'writan_focus_mode_config';

export const focusModeService = {
  loadConfig(): FocusModeConfig {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...FOCUS_MODE_DEFAULTS, ...JSON.parse(raw) as Partial<FocusModeConfig> };
    } catch {
      // fall through to defaults
    }
    return { ...FOCUS_MODE_DEFAULTS };
  },

  saveConfig(config: FocusModeConfig): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
};
