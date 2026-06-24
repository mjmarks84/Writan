import { useFocusMode } from '../../hooks/useFocusMode';
import { useSessionStore } from '../../store/sessionStore';
import { ZenEditor } from './ZenEditor';

interface FocusModeContainerProps {
  children: React.ReactNode;
}

export function FocusModeContainer({ children }: FocusModeContainerProps) {
  const { isActive, config, showSettings, updateConfig, deactivate, setShowSettings } = useFocusMode();
  const { elapsedSec, sessionGoal } = useSessionStore();

  return (
    <>
      {children}
      {isActive && (
        <ZenEditor
          config={config}
          onUpdateConfig={updateConfig}
          showSettings={showSettings}
          onShowSettings={setShowSettings}
          onExit={deactivate}
          sessionElapsedSec={elapsedSec}
          sessionGoal={sessionGoal}
        />
      )}
    </>
  );
}
