import { useStreak } from '../../hooks/useStreak';
import { StreakMilestone } from './StreakMilestone';

// Local copy of STREAK_MILESTONES — renderer tsconfig rootDir restricts direct shared imports
const STREAK_MILESTONES = [7, 14, 30, 60, 100] as const;

export function StreakTracker() {
  const { streak, newMilestone, loading, dismissMilestone, updateStreak } = useStreak();

  if (loading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="text-center text-xs text-slate-400">Loading streak...</div>
      </div>
    );
  }

  const current = streak?.currentStreak ?? 0;
  const longest = streak?.longestStreak ?? 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Writing Streak</h3>

      {newMilestone && (
        <StreakMilestone milestone={newMilestone} onDismiss={dismissMilestone} />
      )}

      {/* Flame + current streak */}
      <div className="mb-3 flex items-center gap-3">
        <span className="text-3xl">{current > 0 ? '🔥' : '💤'}</span>
        <div>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {current} <span className="text-sm font-normal text-slate-500">day{current !== 1 ? 's' : ''}</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Current streak</div>
        </div>
      </div>

      {/* Longest */}
      <div className="mb-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>🏆 Longest: <strong className="text-slate-700 dark:text-slate-200">{longest} days</strong></span>
      </div>

      {/* Milestone indicators */}
      <div className="mb-3">
        <div className="mb-1 text-xs text-slate-500 dark:text-slate-400">Milestones</div>
        <div className="flex gap-2 flex-wrap">
          {STREAK_MILESTONES.map((m) => (
            <div
              key={m}
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                current >= m
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                  : 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500'
              }`}
            >
              {m}d {current >= m ? '✓' : ''}
            </div>
          ))}
        </div>
      </div>

      {/* Update button */}
      <button
        onClick={updateStreak}
        className="w-full rounded bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition-colors"
      >
        Log Today's Writing
      </button>
    </div>
  );
}
