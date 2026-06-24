import { useSessionStore } from '../../store/sessionStore';

interface SessionGoalProps {
  disabled?: boolean;
}

export function SessionGoal({ disabled }: SessionGoalProps) {
  const { sessionGoal, setSessionGoal } = useSessionStore();

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Daily Goal:</label>
      <input
        type="number"
        min={1}
        placeholder="words"
        value={sessionGoal ?? ''}
        disabled={disabled}
        onChange={(e) => setSessionGoal(e.target.value ? Number(e.target.value) : undefined)}
        className="w-20 rounded border border-slate-300 bg-white px-2 py-0.5 text-sm disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
      />
    </div>
  );
}
