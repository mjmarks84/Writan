import { usePomodoroTimer } from '../../hooks/usePomodoroTimer';
import type { PomodoroPhase } from '../../types/session';

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const PHASE_COLORS: Record<PomodoroPhase, string> = {
  idle: '#94a3b8',
  work: '#6366f1',
  break: '#22c55e',
  longBreak: '#06b6d4'
};

const PHASE_LABELS: Record<PomodoroPhase, string> = {
  idle: 'Ready',
  work: 'Focus Time',
  break: 'Short Break',
  longBreak: 'Long Break'
};

interface ProgressRingProps {
  pct: number;
  color: string;
  size?: number;
}

function ProgressRing({ pct, color, size = 80 }: ProgressRingProps) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct / 100);

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={6} className="dark:stroke-slate-700" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={6}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  );
}

export function PomodoroTimer() {
  const { phase, running, remainingSec, completedPomodoros, progressPct, settings, setSettings, start, pause, reset, skipPhase } = usePomodoroTimer();

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Pomodoro Timer</h3>

      {/* Phase label */}
      <div className="mb-2 text-center">
        <span
          className="rounded-full px-3 py-0.5 text-xs font-medium"
          style={{ backgroundColor: `${PHASE_COLORS[phase]}20`, color: PHASE_COLORS[phase] }}
        >
          {PHASE_LABELS[phase]}
        </span>
      </div>

      {/* Progress ring + timer */}
      <div className="relative mx-auto mb-3 flex items-center justify-center" style={{ width: 80, height: 80 }}>
        <ProgressRing pct={progressPct} color={PHASE_COLORS[phase]} />
        <span className="absolute font-mono text-sm font-bold text-slate-800 dark:text-slate-100">
          {formatTime(remainingSec)}
        </span>
      </div>

      {/* Pomodoro count */}
      <div className="mb-3 flex justify-center gap-1">
        {Array.from({ length: settings.longBreakInterval }).map((_, i) => (
          <span key={i} className={`h-2 w-2 rounded-full ${i < completedPomodoros % settings.longBreakInterval ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {!running ? (
          <button onClick={start} className="flex-1 rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
            {phase === 'idle' ? '▶ Start' : '▶ Resume'}
          </button>
        ) : (
          <button onClick={pause} className="flex-1 rounded bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600 transition-colors">
            ⏸ Pause
          </button>
        )}
        <button onClick={skipPhase} disabled={phase === 'idle'} className="rounded bg-slate-200 px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-300 disabled:opacity-40 dark:bg-slate-700 dark:text-slate-300 transition-colors" title="Skip phase">
          ⏭
        </button>
        <button onClick={reset} className="rounded bg-slate-200 px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 transition-colors" title="Reset">
          ↺
        </button>
      </div>

      {/* Settings */}
      <details className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        <summary className="cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">⚙ Settings</summary>
        <div className="mt-2 space-y-2">
          <label className="flex items-center justify-between">
            <span>Work (min)</span>
            <input type="number" min={1} max={60} value={settings.workDurationMin}
              onChange={(e) => setSettings({ ...settings, workDurationMin: Number(e.target.value) })}
              className="w-16 rounded border border-slate-300 bg-white px-1 py-0.5 text-right dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Break (min)</span>
            <input type="number" min={1} max={30} value={settings.breakDurationMin}
              onChange={(e) => setSettings({ ...settings, breakDurationMin: Number(e.target.value) })}
              className="w-16 rounded border border-slate-300 bg-white px-1 py-0.5 text-right dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Long Break (min)</span>
            <input type="number" min={1} max={60} value={settings.longBreakDurationMin}
              onChange={(e) => setSettings({ ...settings, longBreakDurationMin: Number(e.target.value) })}
              className="w-16 rounded border border-slate-300 bg-white px-1 py-0.5 text-right dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
            />
          </label>
        </div>
      </details>
    </div>
  );
}
