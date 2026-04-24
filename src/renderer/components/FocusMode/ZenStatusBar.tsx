import { useMemo } from 'react';

interface ZenStatusBarProps {
  wordCount: number;
  sessionGoal?: number;
  elapsedSec?: number;
  hidden: boolean;
  textColor: string;
  backgroundColor: string;
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function ZenStatusBar({ wordCount, sessionGoal, elapsedSec, hidden, textColor, backgroundColor }: ZenStatusBarProps) {
  const now = useMemo(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), []);
  const progressPct = sessionGoal ? Math.min(100, Math.round((wordCount / sessionGoal) * 100)) : null;

  return (
    <div
      className="flex items-center justify-between px-6 py-2 text-xs transition-opacity duration-500"
      style={{
        opacity: hidden ? 0 : 0.7,
        color: textColor,
        borderTop: `1px solid ${textColor}20`,
        backgroundColor: `${backgroundColor}cc`
      }}
    >
      <span>{wordCount} words{sessionGoal ? ` / ${sessionGoal}` : ''}</span>
      {progressPct !== null && (
        <div className="flex items-center gap-2">
          <div className="h-1 w-24 rounded-full" style={{ backgroundColor: `${textColor}30` }}>
            <div
              className="h-1 rounded-full transition-all"
              style={{ width: `${progressPct}%`, backgroundColor: textColor }}
            />
          </div>
          <span>{progressPct}%</span>
        </div>
      )}
      {elapsedSec !== undefined && <span>{formatTime(elapsedSec)}</span>}
      <span>{now}</span>
    </div>
  );
}
