import { useMemo } from 'react';
import { useDocumentStore } from '../../store/documentStore';

export function WordProcessor() {
  const { document, setContent } = useDocumentStore();
  const wordCount = useMemo(() => document.content.trim().split(/\s+/).filter(Boolean).length, [document.content]);

  return (
    <div className="flex h-full flex-col">
      <textarea
        className="h-full w-full resize-none bg-transparent p-4 text-base outline-none"
        placeholder="Start writing your story..."
        value={document.content}
        onChange={(event) => setContent(event.target.value)}
      />
      <div className="border-t border-slate-200 px-4 py-2 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
        Live word count: {wordCount}
      </div>
    </div>
  );
}
