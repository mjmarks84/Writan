import { useCallback, useEffect, useRef, useState } from 'react';
import type { PomodoroPhase } from '../types/session';

const POMODORO_DEFAULTS = {
  workDurationMin: 25,
  breakDurationMin: 5,
  longBreakDurationMin: 15,
  longBreakInterval: 4
};

export interface PomodoroSettings {
  workDurationMin: number;
  breakDurationMin: number;
  longBreakDurationMin: number;
  longBreakInterval: number;
}

export function usePomodoroTimer(onPhaseChange?: (phase: PomodoroPhase) => void) {
  const [settings, setSettings] = useState<PomodoroSettings>({ ...POMODORO_DEFAULTS });
  const [phase, setPhase] = useState<PomodoroPhase>('idle');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [remainingSec, setRemainingSec] = useState(settings.workDurationMin * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phaseDuration = useCallback((p: PomodoroPhase): number => {
    if (p === 'work') return settings.workDurationMin * 60;
    if (p === 'longBreak') return settings.longBreakDurationMin * 60;
    if (p === 'break') return settings.breakDurationMin * 60;
    return 0;
  }, [settings]);

  const transition = useCallback((nextPhase: PomodoroPhase) => {
    setPhase(nextPhase);
    setRemainingSec(phaseDuration(nextPhase));
    onPhaseChange?.(nextPhase);
  }, [phaseDuration, onPhaseChange]);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          // Phase complete - transition
          setCompletedPomodoros((c) => {
            const newCount = phase === 'work' ? c + 1 : c;
            const nextPhase: PomodoroPhase = phase === 'work'
              ? (newCount % settings.longBreakInterval === 0 ? 'longBreak' : 'break')
              : 'work';
            transition(nextPhase);
            return newCount;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    };
  }, [running, phase, settings.longBreakInterval, transition]);

  const start = useCallback(() => {
    if (phase === 'idle') {
      setPhase('work');
      setRemainingSec(settings.workDurationMin * 60);
    }
    setRunning(true);
  }, [phase, settings.workDurationMin]);

  const pause = useCallback(() => setRunning(false), []);

  const reset = useCallback(() => {
    setRunning(false);
    setPhase('idle');
    setCompletedPomodoros(0);
    setRemainingSec(settings.workDurationMin * 60);
  }, [settings.workDurationMin]);

  const skipPhase = useCallback(() => {
    if (phase === 'idle') return;
    const nextPhase: PomodoroPhase = phase === 'work'
      ? (completedPomodoros % settings.longBreakInterval === 0 ? 'longBreak' : 'break')
      : 'work';
    transition(nextPhase);
  }, [phase, completedPomodoros, settings.longBreakInterval, transition]);

  const progressPct = phase !== 'idle'
    ? Math.round((1 - remainingSec / phaseDuration(phase)) * 100)
    : 0;

  return {
    phase,
    running,
    remainingSec,
    completedPomodoros,
    progressPct,
    settings,
    setSettings,
    start,
    pause,
    reset,
    skipPhase
  };
}
