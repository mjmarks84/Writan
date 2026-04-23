export const APP_VERSION = '0.5.0';

export const COLOR_TOKENS = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#16a34a',
  warning: '#ea580c',
  danger: '#dc2626',
  lightBackground: '#ffffff',
  darkBackground: '#0f172a'
} as const;

export const POMODORO_DEFAULTS = {
  workMinutes: 25,
  breakMinutes: 5
} as const;

export const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
  xl: 1280
} as const;
