import { useCallback, useRef, useState } from 'react';

export const useZenMode = () => {
  const [enabled, setEnabled] = useState(false);
  const [showUi, setShowUi] = useState(true);
  const hideTimerRef = useRef<number | undefined>(undefined);

  const toggle = useCallback(() => setEnabled((value) => !value), []);
  const revealUi = useCallback(() => {
    setShowUi(true);
    window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setShowUi(false), 2500);
  }, []);

  return { enabled, showUi, toggle, revealUi };
};
