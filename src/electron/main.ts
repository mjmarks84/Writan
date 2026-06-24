import path from 'node:path';
import { app, BrowserWindow, nativeTheme } from 'electron';
import sqlite3 from 'sqlite3';
import { registerFileHandlers } from './ipc/fileHandlers';
import { registerDocumentHandlers } from './ipc/documentHandlers';
import { registerAIHandlers } from './ipc/aiHandlers';
import { registerSessionHandlers } from './ipc/sessionHandlers';
import { registerStreakHandlers } from './ipc/streakHandlers';

let mainWindow: BrowserWindow | null = null;

function initializeDatabase() {
  const dbPath = path.join(app.getPath('userData'), 'writan.db');
  const db = new sqlite3.Database(dbPath);
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, title TEXT, updated_at TEXT)');
    db.run(`CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      projectId TEXT NOT NULL,
      documentId TEXT,
      startTime DATETIME NOT NULL,
      endTime DATETIME,
      pausedDuration INTEGER DEFAULT 0,
      wordCountStart INTEGER,
      wordCountEnd INTEGER,
      sessionGoal INTEGER,
      pomodoroMode BOOLEAN DEFAULT 0,
      notes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (projectId) REFERENCES projects(id)
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS streaks (
      id TEXT PRIMARY KEY,
      projectId TEXT NOT NULL,
      currentStreak INTEGER DEFAULT 0,
      longestStreak INTEGER DEFAULT 0,
      lastWriteDate DATE,
      streakStartDate DATE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (projectId) REFERENCES projects(id)
    )`);
  });
  db.close();
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
  registerAIHandlers();
  registerSessionHandlers();
  registerStreakHandlers();
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
