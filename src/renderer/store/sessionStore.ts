import { create } from 'zustand';
import type { Session, SessionSummary } from '../types/session';

type SessionStatus = 'idle' | 'running' | 'paused';

interface SessionState {
  status: SessionStatus;
  activeSession: Session | null;
  sessions: SessionSummary[];
  sessionGoal: number | undefined;
  pomodoroMode: boolean;
  // elapsed tracking (seconds of active time, not including paused)
  elapsedSec: number;
  wordCountStart: number;
  pauseStartedAt: number | null;
  totalPausedSec: number;

  setStatus: (status: SessionStatus) => void;
  setActiveSession: (session: Session | null) => void;
  setSessions: (sessions: SessionSummary[]) => void;
  setSessionGoal: (goal: number | undefined) => void;
  setPomodoroMode: (enabled: boolean) => void;
  setElapsedSec: (sec: number) => void;
  setWordCountStart: (count: number) => void;
  setPauseStartedAt: (ts: number | null) => void;
  setTotalPausedSec: (sec: number) => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  status: 'idle',
  activeSession: null,
  sessions: [],
  sessionGoal: undefined,
  pomodoroMode: false,
  elapsedSec: 0,
  wordCountStart: 0,
  pauseStartedAt: null,
  totalPausedSec: 0,

  setStatus: (status) => set({ status }),
  setActiveSession: (session) => set({ activeSession: session }),
  setSessions: (sessions) => set({ sessions }),
  setSessionGoal: (goal) => set({ sessionGoal: goal }),
  setPomodoroMode: (enabled) => set({ pomodoroMode: enabled }),
  setElapsedSec: (elapsedSec) => set({ elapsedSec }),
  setWordCountStart: (wordCountStart) => set({ wordCountStart }),
  setPauseStartedAt: (pauseStartedAt) => set({ pauseStartedAt }),
  setTotalPausedSec: (totalPausedSec) => set({ totalPausedSec }),
  reset: () => set({
    status: 'idle', activeSession: null, elapsedSec: 0,
    wordCountStart: 0, pauseStartedAt: null, totalPausedSec: 0
  })
}));
