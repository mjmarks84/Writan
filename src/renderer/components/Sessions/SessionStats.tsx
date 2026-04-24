import { useEffect, useMemo, useState } from 'react';
import { sessionService } from '../../services/sessionService';
import type { SessionSummary } from '../../types/session';

function formatHour(hour: number): string {
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function avg(nums: number[]) {
  return nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : 0;
}

export function SessionStats() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);

  useEffect(() => {
    sessionService.listSessions()
      .then((list) => setSessions(list.map(sessionService.summarize)))
      .catch(() => setSessions([]));
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 86400000);
    const thisWeek = sessions.filter((s) => new Date(s.startTime) >= weekAgo);

    const hourCounts: Record<number, number> = {};
    for (const s of sessions) {
      const h = new Date(s.startTime).getHours();
      hourCounts[h] = (hourCounts[h] ?? 0) + s.wordsWritten;
    }
    let peakHour = -1, peakWords = 0;
    for (const [h, w] of Object.entries(hourCounts)) {
      if (w > peakWords) { peakHour = Number(h); peakWords = w; }
    }
    const peakLabel = peakHour >= 0 ? formatHour(peakHour) : '—';

    const days = new Set(sessions.map((s) => s.startTime.slice(0, 10))).size;
    const totalDays = sessions.length > 0
      ? Math.max(1, Math.ceil((now.getTime() - new Date(sessions[sessions.length - 1].startTime).getTime()) / 86400000))
      : 1;
    const consistency = Math.min(100, Math.round((days / totalDays) * 100));

    return {
      totalThisWeek: thisWeek.length,
      avgDurationMin: avg(thisWeek.map((s) => Math.floor(s.durationSec / 60))),
      avgWords: avg(thisWeek.map((s) => s.wordsWritten)),
      peakTime: peakLabel,
      consistency
    };
  }, [sessions]);

  const items = [
    { label: 'Sessions this week', value: stats.totalThisWeek },
    { label: 'Avg duration', value: `${stats.avgDurationMin}m` },
    { label: 'Avg words/session', value: stats.avgWords },
    { label: 'Peak time', value: stats.peakTime },
    { label: 'Consistency', value: `${stats.consistency}%` }
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Session Stats</h3>
      <div className="space-y-2">
        {items.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">{label}</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
