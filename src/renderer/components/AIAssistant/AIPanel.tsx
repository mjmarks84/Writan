import { Brainstorm } from './Brainstorm';
import { Suggestions } from './Suggestions';
import { WritingPrompts } from './WritingPrompts';

export function AIPanel() {
  return (
    <aside className="flex h-full flex-col gap-4 overflow-auto border-l border-slate-200 p-3 dark:border-slate-700">
      <h2 className="text-lg font-bold">AI Assistant</h2>
      <Brainstorm />
      <Suggestions />
      <WritingPrompts />
    </aside>
  );
}
