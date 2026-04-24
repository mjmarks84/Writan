import { useWritingSession } from '../../hooks/useWritingSession';

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function WritingSessionTracker() {
  const { status, elapsedSec, wordsWritten, wpm, sessionGoal, setSessionGoal, start, pause, resume, stop } = useWritingSession();

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Writing Session</h3>

      {/* Timer display */}
      <div className="mb-3 text-center">
        <span className="font-mono text-3xl font-bold text-slate-800 dark:text-slate-100">
          {formatTime(elapsedSec)}
        </span>
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {wordsWritten} words · {wpm} WPM
        </div>
      </div>

      {/* Progress bar */}
      {sessionGoal && (
        <div className="mb-3">
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>Goal: {sessionGoal} words</span>
            <span>{Math.min(100, Math.round((wordsWritten / sessionGoal) * 100))}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-2 rounded-full bg-indigo-500 transition-all"
              style={{ width: `${Math.min(100, Math.round((wordsWritten / sessionGoal) * 100))}%` }}
            />
          </div>
        </div>
      )}

      {/* Goal input */}
      {status === 'idle' && (
        <div className="mb-3">
          <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
            Session Goal (words, optional)
          </label>
          <input
            type="number"
            min={1}
            placeholder="e.g. 500"
            value={sessionGoal ?? ''}
            onChange={(e) => setSessionGoal(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        {status === 'idle' && (
          <button
            onClick={start}
            className="flex-1 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            ▶ Start
          </button>
        )}
        {status === 'running' && (
          <>
            <button
              onClick={pause}
              className="flex-1 rounded bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
            >
              ⏸ Pause
            </button>
            <button
              onClick={stop}
              className="rounded bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
            >
              ■ Stop
            </button>
          </>
        )}
        {status === 'paused' && (
          <>
            <button
              onClick={resume}
              className="flex-1 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              ▶ Resume
            </button>
            <button
              onClick={stop}
              className="rounded bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
            >
              ■ Stop
            </button>
          </>
        )}
      </div>

      {/* Status badge */}
      <div className="mt-2 text-center">
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
          status === 'running' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
          status === 'paused' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' :
          'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
        }`}>
          {status === 'idle' ? 'Ready' : status === 'running' ? '● Recording' : '⏸ Paused'}
        </span>
      </div>
    </div>
  );
}
