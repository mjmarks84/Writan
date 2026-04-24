import { StoryBiblePanel } from '../StoryBible/StoryBiblePanel';
import { AIPanel } from '../AIAssistant/AIPanel';
import { EditorToolbar } from '../Editor/EditorToolbar';
import { WordProcessor } from '../Editor/WordProcessor';
import { StatusBar } from '../Editor/StatusBar';
import { ThemeToggle } from '../Common/ThemeToggle';
import { FileDialog } from '../Common/FileDialog';
import { StatusIndicators } from '../Common/StatusIndicators';
import { Sidebar } from './Sidebar';
import { FocusModeContainer } from '../FocusMode/FocusModeContainer';
import { WritingSessionTracker } from '../Sessions/WritingSessionTracker';
import { PomodoroTimer } from '../Sessions/PomodoroTimer';
import { StreakTracker } from '../Streaks/StreakTracker';
import { StreakReminder } from '../Streaks/StreakReminder';

export function MainLayout() {
  return (
    <FocusModeContainer>
      <div className="flex h-screen flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 p-2 dark:border-slate-700">
          <div className="font-bold">Writan</div>
          <div className="flex items-center gap-2">
            <FileDialog />
            <ThemeToggle />
          </div>
        </header>
        <Sidebar />
        <div className="grid min-h-0 flex-1 grid-cols-[280px_1fr_320px]">
          <StoryBiblePanel />
          <main className="flex min-h-0 flex-col">
            <EditorToolbar />
            <div className="min-h-0 flex-1">
              <WordProcessor />
            </div>
            <StatusBar />
          </main>
          <aside className="flex h-full flex-col gap-4 overflow-auto border-l border-slate-200 p-3 dark:border-slate-700">
            <WritingSessionTracker />
            <PomodoroTimer />
            <StreakReminder />
            <StreakTracker />
            <AIPanel />
          </aside>
        </div>
        <footer className="border-t border-slate-200 px-4 py-2 dark:border-slate-700">
          <StatusIndicators />
        </footer>
      </div>
    </FocusModeContainer>
  );
}

