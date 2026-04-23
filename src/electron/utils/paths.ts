import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { WRITAN_DATA_SUBDIR, WRITAN_DATABASE_NAME, WRITAN_DIR_NAME, WRITAN_LOG_NAME } from '../../shared/constants';

const customDataDir = process.env.WRITAN_DATA_DIR;

export function getAppDataRootPath(): string {
  if (customDataDir) return customDataDir;
  return path.join(os.homedir(), WRITAN_DIR_NAME);
}

export function getDataPath(): string {
  return path.join(getAppDataRootPath(), WRITAN_DATA_SUBDIR);
}

export function getDatabasePath(): string {
  return path.join(getDataPath(), WRITAN_DATABASE_NAME);
}

export function getLogPath(): string {
  return path.join(getDataPath(), WRITAN_LOG_NAME);
}

export function ensureDataDirectories(): void {
  fs.mkdirSync(getDataPath(), { recursive: true });
}
