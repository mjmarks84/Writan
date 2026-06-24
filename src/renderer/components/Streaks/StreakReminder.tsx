import { useStreak } from '../../hooks/useStreak';

export function StreakReminder() {
  const { streak, isAtRisk, isDueToday, updateStreak } = useStreak();

  if (!streak || (!isAtRisk && !isDueToday)) return null;

  const current = streak.currentStreak;
  const timeLeft = getTimeRemaining();

  return (
    <div className={`rounded-lg border p-3 text-sm ${
      isAtRisk
        ? 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950'
        : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
    }`}>
      <div className="mb-1 font-medium">
        {isAtRisk && current > 0
          ? `⚠️ Your ${current}-day streak is at risk!`
          : '✍️ Time to write today!'}
      </div>
      <div className="text-xs opacity-70 mb-2">{timeLeft} remaining today</div>
      <button
        onClick={updateStreak}
        className="rounded bg-indigo-600 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-700 transition-colors"
      >
        ▶ Start Writing
      </button>
    </div>
  );
}

function getTimeRemaining() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diffMs = end.getTime() - now.getTime();
  const h = Math.floor(diffMs / 3600000);
  const m = Math.floor((diffMs % 3600000) / 60000);
  return `${h}h ${m}m`;
}
