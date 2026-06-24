import type { Streak } from '../types/session';

const DEFAULT_PROJECT = 'default';

export const streakService = {
  async getStreak(): Promise<Streak | null> {
    return window.writan.streakGet(DEFAULT_PROJECT);
  },

  async updateStreak(): Promise<{ streak: Streak; newMilestone: number | null }> {
    return window.writan.streakUpdate(DEFAULT_PROJECT);
  },

  async resetStreak(): Promise<void> {
    return window.writan.streakReset(DEFAULT_PROJECT);
  },

  isDueToday(streak: Streak | null): boolean {
    if (!streak?.lastWriteDate) return true;
    const today = new Date().toISOString().slice(0, 10);
    return streak.lastWriteDate !== today;
  },

  isAtRisk(streak: Streak | null): boolean {
    if (!streak?.lastWriteDate) return false;
    const today = new Date().toISOString().slice(0, 10);
    if (streak.lastWriteDate === today) return false;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    return streak.lastWriteDate === yesterday;
  }
};
