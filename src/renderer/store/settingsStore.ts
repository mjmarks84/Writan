export interface SettingsState {
  zenMode: boolean;
  theme: 'light' | 'dark' | 'system';
  keyboardPreset: 'default' | 'vim' | 'emacs';
}

export const settingsStore: SettingsState = {
  zenMode: false,
  theme: 'system',
  keyboardPreset: 'default'
};
