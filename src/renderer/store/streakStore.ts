import { create } from 'zustand';
import type { Streak } from '../types/session';

interface StreakState {
  streak: Streak | null;
  newMilestone: number | null;
  loading: boolean;

  setStreak: (streak: Streak | null) => void;
  setNewMilestone: (milestone: number | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useStreakStore = create<StreakState>((set) => ({
  streak: null,
  newMilestone: null,
  loading: false,

  setStreak: (streak) => set({ streak }),
  setNewMilestone: (newMilestone) => set({ newMilestone }),
  setLoading: (loading) => set({ loading })
}));
