import { useDocumentStore } from '../../store/documentStore';

export function StatusBar() {
  const { document } = useDocumentStore();
  const words = document.content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
      <span>{document.title}</span>
      <span>{words} words</span>
      <span>Updated {new Date(document.updatedAt).toLocaleTimeString()}</span>
    </div>
  );
}
