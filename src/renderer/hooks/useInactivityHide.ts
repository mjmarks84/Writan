import { useCallback, useEffect, useRef, useState } from 'react';

export function useInactivityHide(timeoutMs: number, active: boolean) {
  const [hidden, setHidden] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (!active) { setHidden(false); return; }
    setHidden(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setHidden(true), timeoutMs);
  }, [active, timeoutMs]);

  useEffect(() => {
    if (!active) {
      setHidden(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    resetTimer();
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    for (const ev of events) window.addEventListener(ev, resetTimer);
    return () => {
      for (const ev of events) window.removeEventListener(ev, resetTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, resetTimer]);

  return { hidden, show: resetTimer };
}
