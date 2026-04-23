import path from 'node:path';
import { app, BrowserWindow, nativeTheme } from 'electron';
import { initDatabase } from './db/database';
import { registerFileHandlers } from './ipc/fileHandlers';
import { registerDocumentHandlers } from './ipc/documentHandlers';
import { registerAIHandlers } from './ipc/aiHandlers';
import { registerDatabaseHandlers } from './ipc/databaseHandlers';
import { registerVersionHandlers } from './ipc/versionHandlers';
import { logger } from './utils/logger';

let mainWindow: BrowserWindow | null = null;

function initializeDatabase() {
  try {
    initDatabase();
  } catch (error) {
    logger.error('Failed to initialize database', { error: String(error) });
    throw error;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const indexPath = path.join(app.getAppPath(), 'public/index.html');
  void mainWindow.loadFile(indexPath);

  nativeTheme.themeSource = 'system';
}

app.whenReady().then(() => {
  initializeDatabase();
  registerFileHandlers();
  registerDocumentHandlers();
  registerDatabaseHandlers();
  registerVersionHandlers();
  registerAIHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
