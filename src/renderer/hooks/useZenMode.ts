import { useCallback, useState } from 'react';

export const useZenMode = () => {
  const [enabled, setEnabled] = useState(false);
  const [showUi, setShowUi] = useState(true);

  const toggle = useCallback(() => setEnabled((value) => !value), []);
  const revealUi = useCallback(() => {
    setShowUi(true);
    window.clearTimeout((revealUi as unknown as { timeout?: number }).timeout);
    (revealUi as unknown as { timeout?: number }).timeout = window.setTimeout(() => setShowUi(false), 2500);
  }, []);

  return { enabled, showUi, toggle, revealUi };
};
