import { dialog, ipcMain } from 'electron';
import { SUPPORTED_EXPORT_FORMATS, SUPPORTED_IMPORT_FORMATS } from '../../shared/constants';

const supportedExtensions = ['.docx', '.txt', '.md', '.odt', '.pdf', '.epub'];
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;

export const isSupportedFile = (fileName: string): boolean => {
  return supportedExtensions.some((extension) => fileName.toLowerCase().endsWith(extension));
};

export const validateImportFile = (
  fileName: string,
  fileSize = 0
): { valid: boolean; reason?: string } => {
  if (!isSupportedFile(fileName)) {
    return { valid: false, reason: 'Unsupported file format' };
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    return { valid: false, reason: 'File exceeds maximum supported size' };
  }

  return { valid: true };
};

export const normalizeExportContent = (content: string): string => content.replace(/\r\n/g, '\n');

export function registerFileHandlers() {
  ipcMain.handle('file:openDialog', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Supported files', extensions: SUPPORTED_IMPORT_FORMATS.map((ext) => ext.slice(1)) }
      ]
    });
    return result.filePaths;
  });

  ipcMain.handle('file:saveDialog', async () => {
    const result = await dialog.showSaveDialog({
      filters: [
        { name: 'Export formats', extensions: SUPPORTED_EXPORT_FORMATS.map((ext) => ext.slice(1)) }
      ]
    });
    return result.filePath;
  });
}
