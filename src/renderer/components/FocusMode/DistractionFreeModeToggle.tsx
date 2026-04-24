import { useFocusModeStore } from '../../store/focusModeStore';

export function DistractionFreeModeToggle() {
  const { isActive, toggle } = useFocusModeStore();

  return (
    <button
      onClick={toggle}
      title={isActive ? 'Exit Focus Mode (F11)' : 'Enter Focus Mode (F11)'}
      className={`rounded px-2 py-1 text-sm transition-colors ${
        isActive
          ? 'bg-indigo-600 text-white'
          : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
      }`}
    >
      {isActive ? '⊡ Exit Focus' : '⊞ Focus Mode'}
    </button>
  );
}
