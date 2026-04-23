import type { WritingStats } from '../../types/stats';

interface EditorStatusBarProps {
  stats: WritingStats;
  autosaveStatus: 'idle' | 'saving' | 'saved';
}

const formatSession = (seconds: number): string => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

export const EditorStatusBar = ({ stats, autosaveStatus }: EditorStatusBarProps) => (
  <footer className="editor-status-bar">
    <span>Words: {stats.words}</span>
    <span>Chars: {stats.characters}</span>
    <span>No spaces: {stats.charactersNoSpaces}</span>
    <span>Read time: {stats.readingTimeMinutes} min</span>
    <span>WPM: {stats.writingPaceWpm}</span>
    <span>Session: {formatSession(stats.sessionSeconds)}</span>
    <span>
      Daily: {stats.dailyWords}/{stats.dailyGoal}
    </span>
    <span>Autosave: {autosaveStatus}</span>
  </footer>
);
