import fs from 'node:fs';
import { getLogPath, ensureDataDirectories } from './paths';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function write(level: LogLevel, message: string, details?: unknown): void {
  ensureDataDirectories();
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    details,
  };
  fs.appendFileSync(getLogPath(), `${JSON.stringify(payload)}\n`, 'utf8');
}

export const logger = {
  debug: (message: string, details?: unknown): void => write('debug', message, details),
  info: (message: string, details?: unknown): void => write('info', message, details),
  warn: (message: string, details?: unknown): void => write('warn', message, details),
  error: (message: string, details?: unknown): void => write('error', message, details),
};
