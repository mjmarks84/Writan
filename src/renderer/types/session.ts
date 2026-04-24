// Session types - aligned with WritanSession from global.d.ts
export type Session = WritanSession;
export type Streak = WritanStreak;

export interface SessionSummary extends Session {
  durationSec: number;
  wordsWritten: number;
  wpm: number;
}

export type FocusHighlight = 'paragraph' | 'sentence' | 'none';

export interface FocusModeConfig {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  lineHeight: number;
  maxWidth: number;
  dimOpacity: number;
  autoHideMs: number;
  typewriterMode: boolean;
  focusHighlight: FocusHighlight;
}

export type PomodoroPhase = 'work' | 'break' | 'longBreak' | 'idle';
