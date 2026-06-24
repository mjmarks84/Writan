import type { Session, SessionSummary } from '../types/session';

const DEFAULT_PROJECT = 'default';

export const sessionService = {
  async startSession(opts: {
    documentId?: string;
    wordCountStart: number;
    sessionGoal?: number;
    pomodoroMode?: boolean;
  }): Promise<Session> {
    return window.writan.sessionStart(
      DEFAULT_PROJECT,
      opts.documentId,
      opts.wordCountStart,
      opts.sessionGoal,
      opts.pomodoroMode ?? false
    );
  },

  async endSession(id: string, wordCountEnd: number, pausedDuration: number, notes?: string): Promise<void> {
    return window.writan.sessionEnd(id, wordCountEnd, pausedDuration, notes);
  },

  async pauseSession(id: string, pausedDuration: number): Promise<void> {
    return window.writan.sessionPause(id, pausedDuration);
  },

  async resumeSession(id: string): Promise<void> {
    return window.writan.sessionResume(id);
  },

  async listSessions(): Promise<Session[]> {
    return window.writan.sessionList(DEFAULT_PROJECT);
  },

  summarize(session: Session): SessionSummary {
    const endTime = session.endTime ?? new Date().toISOString();
    const totalMs = new Date(endTime).getTime() - new Date(session.startTime).getTime();
    const durationSec = Math.max(0, Math.floor(totalMs / 1000) - session.pausedDuration);
    const wordsWritten = Math.max(0, (session.wordCountEnd ?? session.wordCountStart) - session.wordCountStart);
    const wpm = durationSec > 0 ? Math.round((wordsWritten / durationSec) * 60) : 0;
    return { ...session, durationSec, wordsWritten, wpm };
  }
};
