import { useMemo } from 'react';
import { goalProgressPercent, requiredDailyPace } from '../services/goalService';
import type { Goal } from '../../shared/types';

export const useGoals = (goals: Goal[]) =>
  useMemo(
    () => goals.map((goal) => ({ ...goal, progress: goalProgressPercent(goal), neededPerDay: requiredDailyPace(goal) })),
    [goals]
  );
