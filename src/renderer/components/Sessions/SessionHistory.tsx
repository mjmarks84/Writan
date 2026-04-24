import { useEffect, useState } from 'react';
import { sessionService } from '../../services/sessionService';
import type { SessionSummary } from '../../types/session';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function formatDuration(sec: number) {
  if (sec < 60) return `${sec}s`;
  return `${Math.floor(sec / 60)}m ${sec % 60}s`;
}

export function SessionHistory() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    sessionService.listSessions()
      .then((list) => setSessions(list.map(sessionService.summarize)))
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = sessions.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return s.startTime.includes(q) || (s.notes ?? '').toLowerCase().includes(q);
  });

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Session History</h3>

      <input
        type="text"
        placeholder="Search sessions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 w-full rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
      />

      {loading ? (
        <div className="text-center text-xs text-slate-400 py-4">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-xs text-slate-400 py-4">
          {sessions.length === 0 ? 'No sessions yet. Start your first writing session!' : 'No matching sessions.'}
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filtered.map((s) => (
            <div key={s.id} className="rounded border border-slate-100 p-2 text-xs dark:border-slate-700">
              <div className="flex justify-between">
                <span className="font-medium text-slate-700 dark:text-slate-200">{formatDate(s.startTime)}</span>
                <span className="text-slate-500 dark:text-slate-400">{formatTime(s.startTime)}</span>
              </div>
              <div className="mt-1 flex gap-3 text-slate-500 dark:text-slate-400">
                <span>⏱ {formatDuration(s.durationSec)}</span>
                <span>📝 {s.wordsWritten} words</span>
                <span>⚡ {s.wpm} WPM</span>
                {s.pomodoroMode && <span>🍅 Pomodoro</span>}
              </div>
              {s.notes && (
                <div className="mt-1 text-slate-400 italic">{s.notes}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
