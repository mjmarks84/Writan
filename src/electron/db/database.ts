import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { ensureDataDirectories, getDatabasePath } from '../utils/paths';
import { logger } from '../utils/logger';

const MIGRATIONS_DIR = path.resolve(__dirname, 'migrations');

let connection: Database.Database | null = null;

function runMigrations(db: Database.Database): void {
  const migrationFiles = fs.readdirSync(MIGRATIONS_DIR)
    .filter((entry) => entry.endsWith('.sql'))
    .sort((a, b) => a.localeCompare(b));

  const alreadyRun = new Set<string>(
    (db.prepare('SELECT id FROM migrations').all() as Array<{ id: string }>).map((row) => String(row.id)),
  );

  for (const migrationFile of migrationFiles) {
    if (alreadyRun.has(migrationFile)) continue;

    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, migrationFile), 'utf8');
    const tx = db.transaction(() => {
      db.exec(sql);
      db.prepare('INSERT INTO migrations(id) VALUES (?)').run(migrationFile);
    });
    tx();
    logger.info('Database migration applied', { migrationFile });
  }
}

function openDatabase(): Database.Database {
  ensureDataDirectories();
  const dbPath = getDatabasePath();

  try {
    const db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    db.pragma('busy_timeout = 5000');
    return db;
  } catch (error) {
    const backupPath = `${dbPath}.corrupt.${Date.now()}`;
    if (fs.existsSync(dbPath)) {
      fs.renameSync(dbPath, backupPath);
      logger.warn('Corrupt database moved aside', { backupPath });
    }

    const recoveredDb = new Database(dbPath);
    recoveredDb.pragma('journal_mode = WAL');
    recoveredDb.pragma('foreign_keys = ON');
    recoveredDb.pragma('busy_timeout = 5000');
    logger.error('Database open failed; created fresh database', { error: String(error) });
    return recoveredDb;
  }
}

export function initDatabase(): Database.Database {
  if (connection) return connection;

  const db = openDatabase();
  db.exec('CREATE TABLE IF NOT EXISTS migrations (id TEXT PRIMARY KEY, executedAt DATETIME DEFAULT CURRENT_TIMESTAMP)');
  runMigrations(db);
  connection = db;
  logger.info('Database initialized', { dbPath: getDatabasePath() });
  return db;
}

export function getDatabase(): Database.Database {
  return initDatabase();
}

export function resetDatabase(mode: 'soft' | 'hard' = 'soft'): void {
  const db = getDatabase();
  if (mode === 'soft') {
    db.exec('DELETE FROM versions; DELETE FROM documents; DELETE FROM projects;');
    logger.warn('Database soft reset completed');
    return;
  }

  connection?.close();
  connection = null;
  const dbPath = getDatabasePath();
  if (fs.existsSync(dbPath)) fs.rmSync(dbPath);
  logger.warn('Database hard reset completed');
}
