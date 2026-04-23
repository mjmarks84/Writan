import type { ExportRequest, ImportedDocument } from '../../shared/types';

export const fileService = {
  // Phase 1 rich import/export
  async importFile(filePath: string): Promise<ImportedDocument> {
    const response = await window.writan.invoke<ImportedDocument>('file:import', filePath);
    if (!response.ok || !response.data) throw new Error(response.error ?? 'Import failed');
    return response.data;
  },
  async exportFile(request: ExportRequest): Promise<void> {
    const response = await window.writan.invoke('file:export', request);
    if (!response.ok) throw new Error(response.error ?? 'Export failed');
  },
  // Backwards compatible scaffold dialog helpers
  open: () => window.writan.openFileDialog(),
  save: () => window.writan.saveFileDialog(),
};
