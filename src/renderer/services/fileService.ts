import type { ExportRequest, ImportedDocument } from '../../shared/types';

declare global {
  interface Window {
    electronAPI: {
      invoke<T>(channel: string, ...args: unknown[]): Promise<{ ok: boolean; data?: T; error?: string }>;
    };
  }
}

export const fileService = {
  async importFile(filePath: string): Promise<ImportedDocument> {
    const response = await window.electronAPI.invoke<ImportedDocument>('file:import', filePath);
    if (!response.ok || !response.data) throw new Error(response.error ?? 'Import failed');
    return response.data;
  },
  async exportFile(request: ExportRequest): Promise<void> {
    const response = await window.electronAPI.invoke('file:export', request);
    if (!response.ok) throw new Error(response.error ?? 'Export failed');
  },
};
