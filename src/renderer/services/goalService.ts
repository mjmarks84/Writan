import type { Goal } from '../../shared/types';

export const goalProgressPercent = (goal: Goal): number => {
  if (goal.target <= 0) return 0;
  return Math.min(100, Math.round((goal.current / goal.target) * 100));
};

export const requiredDailyPace = (goal: Goal): number => {
  if (!goal.deadline) return Math.max(0, goal.target - goal.current);
  const today = new Date();
  const end = new Date(goal.deadline);
  const daysLeft = Math.max(1, Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  return Math.max(0, Math.ceil((goal.target - goal.current) / daysLeft));
};
