import { useCallback, useEffect, useRef } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { sessionService } from '../services/sessionService';
import { useDocumentStore } from '../store/documentStore';

export function useWritingSession() {
  const store = useSessionStore();
  const { document } = useDocumentStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentWords = document.content.trim().split(/\s+/).filter(Boolean).length;

  // Tick every second when running
  useEffect(() => {
    if (store.status === 'running') {
      intervalRef.current = setInterval(() => {
        store.setElapsedSec(store.elapsedSec + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.status, store.elapsedSec]);

  const start = useCallback(async () => {
    const wordCountStart = currentWords;
    const session = await sessionService.startSession({
      wordCountStart,
      sessionGoal: store.sessionGoal,
      pomodoroMode: store.pomodoroMode
    });
    store.setActiveSession(session);
    store.setWordCountStart(wordCountStart);
    store.setTotalPausedSec(0);
    store.setElapsedSec(0);
    store.setStatus('running');
  }, [store, currentWords]);

  const pause = useCallback(async () => {
    if (!store.activeSession || store.status !== 'running') return;
    store.setPauseStartedAt(Date.now());
    store.setStatus('paused');
    await sessionService.pauseSession(store.activeSession.id, store.totalPausedSec);
  }, [store]);

  const resume = useCallback(async () => {
    if (!store.activeSession || store.status !== 'paused') return;
    const pausedMs = store.pauseStartedAt ? (Date.now() - store.pauseStartedAt) / 1000 : 0;
    store.setTotalPausedSec(store.totalPausedSec + Math.floor(pausedMs));
    store.setPauseStartedAt(null);
    store.setStatus('running');
    await sessionService.resumeSession(store.activeSession.id);
  }, [store]);

  const stop = useCallback(async () => {
    if (!store.activeSession) return;
    let pausedSec = store.totalPausedSec;
    if (store.status === 'paused' && store.pauseStartedAt) {
      pausedSec += Math.floor((Date.now() - store.pauseStartedAt) / 1000);
    }
    await sessionService.endSession(store.activeSession.id, currentWords, pausedSec);
    const updated = await sessionService.listSessions();
    store.setSessions(updated.map(sessionService.summarize));
    store.reset();
  }, [store, currentWords]);

  const wpm = store.elapsedSec > 0
    ? Math.round(((currentWords - store.wordCountStart) / store.elapsedSec) * 60)
    : 0;

  return {
    status: store.status,
    elapsedSec: store.elapsedSec,
    wordsWritten: Math.max(0, currentWords - store.wordCountStart),
    wpm: Math.max(0, wpm),
    sessionGoal: store.sessionGoal,
    pomodoroMode: store.pomodoroMode,
    setSessionGoal: store.setSessionGoal,
    setPomodoroMode: store.setPomodoroMode,
    start,
    pause,
    resume,
    stop
  };
}
