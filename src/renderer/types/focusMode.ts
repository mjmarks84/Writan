export type { FocusModeConfig, FocusHighlight } from './session';

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
