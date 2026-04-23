import { dialog, ipcMain } from 'electron';
import { SUPPORTED_EXPORT_FORMATS, SUPPORTED_IMPORT_FORMATS } from '../../shared/constants';

export function registerFileHandlers() {
  ipcMain.handle('file:openDialog', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Supported files', extensions: SUPPORTED_IMPORT_FORMATS.map((ext) => ext.slice(1)) }]
    });
    return result.filePaths;
  });

  ipcMain.handle('file:saveDialog', async () => {
    const result = await dialog.showSaveDialog({
      filters: [{ name: 'Export formats', extensions: SUPPORTED_EXPORT_FORMATS.map((ext) => ext.slice(1)) }]
    });
    return result.filePath;
  });
}
