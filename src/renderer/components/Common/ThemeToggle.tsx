import { useUIStore } from '../../store/uiStore';

export function ThemeToggle() {
  const { theme, setTheme } = useUIStore();

  const applyTheme = (value: 'light' | 'dark' | 'system') => {
    setTheme(value);
    const isDark =
      value === 'dark' ||
      (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  };

  return (
    <select
      value={theme}
      onChange={(event) => applyTheme(event.target.value as 'light' | 'dark' | 'system')}
      className="rounded border border-slate-300 bg-transparent px-2 py-1 text-sm dark:border-slate-600"
      aria-label="Theme mode"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
