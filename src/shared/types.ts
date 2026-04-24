export type ThemeMode = 'light' | 'dark' | 'system';
export type TimeRange = 'day' | 'week' | 'month' | 'year';

export interface ProjectMetadata {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface WritingEntry {
  date: string;
  words: number;
  minutes: number;
}

export interface WritingSession {
  id: string;
  startTime: string;
  endTime?: string;
  wordsWritten: number;
  goalWords?: number;
  note?: string;
}

export interface Goal {
  id: string;
  label: string;
  target: number;
  current: number;
  deadline?: string;
}

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  minAppVersion?: string;
  dependencies?: string[];
}

export interface Collaborator {
  id: string;
  name: string;
  permission: 'view' | 'comment' | 'edit';
}

export interface SyncStatus {
  syncing: boolean;
  lastSyncAt?: string;
  pendingFiles: number;
  offline: boolean;
}
