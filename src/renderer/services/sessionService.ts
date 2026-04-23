import type { WritingSession } from '../../shared/types';

export const startSession = (): WritingSession => ({
  id: crypto.randomUUID(),
  startTime: new Date().toISOString(),
  wordsWritten: 0
});

export const stopSession = (session: WritingSession): WritingSession => ({
  ...session,
  endTime: new Date().toISOString()
});

export const calculateWpm = (words: number, elapsedSeconds: number): number => {
  if (elapsedSeconds <= 0) return 0;
  return Math.round((words / elapsedSeconds) * 60);
};
