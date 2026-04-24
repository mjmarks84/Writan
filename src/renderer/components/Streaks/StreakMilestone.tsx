interface StreakMilestoneProps {
  milestone: number;
  onDismiss: () => void;
}

const MILESTONE_MESSAGES: Record<number, string> = {
  7: '🎉 One week streak! You\'re building a habit!',
  14: '🔥 Two weeks! Your dedication is showing!',
  30: '⭐ One month! You\'re a committed writer!',
  60: '🏆 Two months! Incredible consistency!',
  100: '🌟 100 days! You\'re a writing legend!'
};

export function StreakMilestone({ milestone, onDismiss }: StreakMilestoneProps) {
  const message = MILESTONE_MESSAGES[milestone] ?? `🎊 ${milestone}-day streak! Amazing!`;

  return (
    <div className="mb-3 rounded-lg border border-indigo-200 bg-indigo-50 p-3 dark:border-indigo-800 dark:bg-indigo-950">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">{message}</p>
        <button
          onClick={onDismiss}
          className="text-indigo-400 hover:text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-300 text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
