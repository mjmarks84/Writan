import { Brainstorm } from './Brainstorm';
import { Suggestions } from './Suggestions';
import { WritingPrompts } from './WritingPrompts';

export function AIPanel() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">AI Assistant</h2>
      <Brainstorm />
      <Suggestions />
      <WritingPrompts />
    </div>
  );
}
