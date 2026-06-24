import { useCallback, useEffect } from 'react';
import { useStreakStore } from '../store/streakStore';
import { streakService } from '../services/streakService';

export function useStreak() {
  const store = useStreakStore();

  useEffect(() => {
    store.setLoading(true);
    streakService.getStreak()
      .then((streak) => store.setStreak(streak))
      .catch(() => store.setStreak(null))
      .finally(() => store.setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStreak = useCallback(async () => {
    const result = await streakService.updateStreak();
    store.setStreak(result.streak);
    if (result.newMilestone) {
      store.setNewMilestone(result.newMilestone);
      setTimeout(() => store.setNewMilestone(null), 5000);
    }
    return result;
  }, [store]);

  const resetStreak = useCallback(async () => {
    await streakService.resetStreak();
    store.setStreak(null);
  }, [store]);

  const dismissMilestone = useCallback(() => {
    store.setNewMilestone(null);
  }, [store]);

  return {
    streak: store.streak,
    newMilestone: store.newMilestone,
    loading: store.loading,
    isAtRisk: streakService.isAtRisk(store.streak),
    isDueToday: streakService.isDueToday(store.streak),
    updateStreak,
    resetStreak,
    dismissMilestone
  };
}
