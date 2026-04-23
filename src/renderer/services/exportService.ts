import type { ExportRequest } from '../../shared/types';
import { fileService } from './fileService';

export const exportService = {
  exportDocument(request: ExportRequest): Promise<void> {
    return fileService.exportFile(request);
  },
};
