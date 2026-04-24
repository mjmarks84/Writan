import { ipcMain } from 'electron';
import sqlite3 from 'sqlite3';
import { app } from 'electron';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { Session } from '../../shared/types';

function getDb() {
  const dbPath = path.join(app.getPath('userData'), 'writan.db');
  return new sqlite3.Database(dbPath);
}

export function registerSessionHandlers() {
  ipcMain.handle('session:start', (_event, projectId: string, documentId: string | undefined, wordCountStart: number, sessionGoal: number | undefined, pomodoroMode: boolean) => {
    return new Promise<Session>((resolve, reject) => {
      const db = getDb();
      const id = randomUUID();
      const startTime = new Date().toISOString();
      const createdAt = startTime;
      db.run(
        `INSERT INTO sessions (id, projectId, documentId, startTime, pausedDuration, wordCountStart, sessionGoal, pomodoroMode, createdAt)
         VALUES (?, ?, ?, ?, 0, ?, ?, ?, ?)`,
        [id, projectId, documentId ?? null, startTime, wordCountStart, sessionGoal ?? null, pomodoroMode ? 1 : 0, createdAt],
        function (err) {
          db.close();
          if (err) { reject(err); return; }
          resolve({ id, projectId, documentId, startTime, pausedDuration: 0, wordCountStart, sessionGoal, pomodoroMode, createdAt });
        }
      );
    });
  });

  ipcMain.handle('session:end', (_event, id: string, wordCountEnd: number, pausedDuration: number, notes?: string) => {
    return new Promise<void>((resolve, reject) => {
      const db = getDb();
      const endTime = new Date().toISOString();
      db.run(
        `UPDATE sessions SET endTime = ?, wordCountEnd = ?, pausedDuration = ?, notes = ? WHERE id = ?`,
        [endTime, wordCountEnd, pausedDuration, notes ?? null, id],
        function (err) {
          db.close();
          if (err) { reject(err); return; }
          resolve();
        }
      );
    });
  });

  ipcMain.handle('session:pause', (_event, id: string, pausedDuration: number) => {
    return new Promise<void>((resolve, reject) => {
      const db = getDb();
      db.run(
        `UPDATE sessions SET pausedDuration = ? WHERE id = ?`,
        [pausedDuration, id],
        function (err) {
          db.close();
          if (err) { reject(err); return; }
          resolve();
        }
      );
    });
  });

  ipcMain.handle('session:resume', (_event, _id: string) => {
    return Promise.resolve();
  });

  ipcMain.handle('session:list', (_event, projectId: string) => {
    return new Promise<Session[]>((resolve, reject) => {
      const db = getDb();
      db.all<Session>(
        `SELECT * FROM sessions WHERE projectId = ? ORDER BY createdAt DESC`,
        [projectId],
        (err, rows) => {
          db.close();
          if (err) { reject(err); return; }
          resolve(rows ?? []);
        }
      );
    });
  });
}
