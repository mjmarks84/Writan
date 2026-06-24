export const APP_NAME = 'Writan';
export const SUPPORTED_IMPORT_FORMATS = ['.docx', '.txt', '.md', '.odt'];
export const SUPPORTED_EXPORT_FORMATS = ['.docx', '.pdf', '.txt', '.epub'];

// Focus Mode defaults
export const FOCUS_MODE_DEFAULTS = {
  backgroundColor: '#1a1a2e',
  textColor: '#e2e8f0',
  fontSize: 18,
  lineHeight: 1.8,
  maxWidth: 720,
  dimOpacity: 0.3,
  autoHideMs: 3000,
  typewriterMode: false,
  focusHighlight: 'paragraph' as const
};

// Pomodoro defaults
export const POMODORO_DEFAULTS = {
  workDurationMin: 25,
  breakDurationMin: 5,
  longBreakDurationMin: 15,
  longBreakInterval: 4
};

// Session constraints
export const SESSION_MIN_DURATION_SEC = 60;
export const SESSION_MAX_DURATION_SEC = 14400; // 4 hours

// Streak milestones (days)
export const STREAK_MILESTONES = [7, 14, 30, 60, 100] as const;
