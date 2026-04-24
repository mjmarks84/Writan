import { ipcMain } from 'electron';
import sqlite3 from 'sqlite3';
import { app } from 'electron';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { Streak } from '../../shared/types';
import { STREAK_MILESTONES } from '../../shared/constants';

function getDb() {
  const dbPath = path.join(app.getPath('userData'), 'writan.db');
  return new sqlite3.Database(dbPath);
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const msPerDay = 86400000;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}

export function registerStreakHandlers() {
  ipcMain.handle('streak:get', (_event, projectId: string) => {
    return new Promise<Streak | null>((resolve, reject) => {
      const db = getDb();
      db.get<Streak>(
        `SELECT * FROM streaks WHERE projectId = ? ORDER BY createdAt ASC LIMIT 1`,
        [projectId],
        (err, row) => {
          db.close();
          if (err) { reject(err); return; }
          resolve(row ?? null);
        }
      );
    });
  });

  ipcMain.handle('streak:update', (_event, projectId: string) => {
    return new Promise<{ streak: Streak; newMilestone: number | null }>((resolve, reject) => {
      const db = getDb();
      const today = todayStr();
      db.get<Streak>(
        `SELECT * FROM streaks WHERE projectId = ? ORDER BY createdAt ASC LIMIT 1`,
        [projectId],
        (err, existing) => {
          if (err) { db.close(); reject(err); return; }

          if (!existing) {
            // Create new streak record
            const id = randomUUID();
            const createdAt = new Date().toISOString();
            const streak: Streak = {
              id, projectId, currentStreak: 1, longestStreak: 1,
              lastWriteDate: today, streakStartDate: today, createdAt
            };
            db.run(
              `INSERT INTO streaks (id, projectId, currentStreak, longestStreak, lastWriteDate, streakStartDate, createdAt)
               VALUES (?, ?, 1, 1, ?, ?, ?)`,
              [id, projectId, today, today, createdAt],
              function (insertErr) {
                db.close();
                if (insertErr) { reject(insertErr); return; }
                resolve({ streak, newMilestone: checkMilestone(0, 1) });
              }
            );
            return;
          }

          const last = existing.lastWriteDate ?? '';
          if (last === today) {
            // Already wrote today
            db.close();
            resolve({ streak: existing, newMilestone: null });
            return;
          }

          const diff = last ? daysBetween(last, today) : 999;
          const prevStreak = existing.currentStreak;
          let newStreak: number;
          let streakStartDate = existing.streakStartDate;

          if (diff === 1) {
            newStreak = prevStreak + 1;
          } else {
            newStreak = 1;
            streakStartDate = today;
          }

          const newLongest = Math.max(existing.longestStreak, newStreak);
          db.run(
            `UPDATE streaks SET currentStreak = ?, longestStreak = ?, lastWriteDate = ?, streakStartDate = ? WHERE id = ?`,
            [newStreak, newLongest, today, streakStartDate ?? today, existing.id],
            function (updateErr) {
              db.close();
              if (updateErr) { reject(updateErr); return; }
              const updated: Streak = {
                ...existing,
                currentStreak: newStreak,
                longestStreak: newLongest,
                lastWriteDate: today,
                streakStartDate: streakStartDate ?? today
              };
              resolve({ streak: updated, newMilestone: checkMilestone(prevStreak, newStreak) });
            }
          );
        }
      );
    });
  });

  ipcMain.handle('streak:reset', (_event, projectId: string) => {
    return new Promise<void>((resolve, reject) => {
      const db = getDb();
      db.run(
        `UPDATE streaks SET currentStreak = 0, streakStartDate = NULL WHERE projectId = ?`,
        [projectId],
        function (err) {
          db.close();
          if (err) { reject(err); return; }
          resolve();
        }
      );
    });
  });
}

function checkMilestone(prevStreak: number, newStreak: number): number | null {
  for (const m of STREAK_MILESTONES) {
    if (newStreak >= m && prevStreak < m) return m;
  }
  return null;
}
