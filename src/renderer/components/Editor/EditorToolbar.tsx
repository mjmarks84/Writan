import { DistractionFreeModeToggle } from '../FocusMode/DistractionFreeModeToggle';

export function EditorToolbar() {
  return (
    <div className="flex items-center gap-2 border-b border-slate-200 p-2 dark:border-slate-700">
      <button className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700">Bold</button>
      <button className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700">Italic</button>
      <button className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700">Heading</button>
      <div className="ml-auto">
        <DistractionFreeModeToggle />
      </div>
    </div>
  );
}

