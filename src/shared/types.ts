export type ThemeMode = 'light' | 'dark' | 'system';

export interface ProjectMetadata {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

// Session types
export interface Session {
  id: string;
  projectId: string;
  documentId?: string;
  startTime: string;
  endTime?: string;
  pausedDuration: number;
  wordCountStart: number;
  wordCountEnd?: number;
  sessionGoal?: number;
  pomodoroMode: boolean;
  notes?: string;
  createdAt: string;
}

export interface SessionSummary extends Session {
  durationSec: number;
  wordsWritten: number;
  wpm: number;
}

// Streak types
export interface Streak {
  id: string;
  projectId: string;
  currentStreak: number;
  longestStreak: number;
  lastWriteDate?: string;
  streakStartDate?: string;
  createdAt: string;
}

// Focus mode types
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

// Pomodoro phase
export type PomodoroPhase = 'work' | 'break' | 'longBreak' | 'idle';
