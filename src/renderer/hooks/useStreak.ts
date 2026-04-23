import { useMemo } from 'react';
import { calculateStreak } from '../services/streakService';

export const useStreak = (dates: string[]) => useMemo(() => calculateStreak(dates), [dates]);
