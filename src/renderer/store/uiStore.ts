import { create } from 'zustand';
type ThemeMode = 'light' | 'dark' | 'system';

interface UIState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme })
}));
