import { fileService } from '../../services/fileService';

export function FileDialog() {
  return (
    <div className="flex items-center gap-2">
      <button className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700" onClick={() => void fileService.open()}>
        Open
      </button>
      <button className="rounded bg-slate-200 px-2 py-1 text-sm dark:bg-slate-700" onClick={() => void fileService.save()}>
        Save / Export
      </button>
    </div>
  );
}
