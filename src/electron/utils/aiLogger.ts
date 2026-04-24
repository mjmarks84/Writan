export const aiLogger = {
  info: (message: string, data?: unknown): void => {
    console.info(`[AI] ${message}`, data ?? '');
  },
  warn: (message: string, data?: unknown): void => {
    console.warn(`[AI] ${message}`, data ?? '');
  },
  error: (message: string, data?: unknown): void => {
    console.error(`[AI] ${message}`, data ?? '');
  }
};
