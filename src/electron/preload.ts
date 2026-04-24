import { contextBridge, ipcRenderer } from 'electron';
import type { Session, Streak } from '../shared/types';

const api = {
  openFileDialog: () => ipcRenderer.invoke('file:openDialog') as Promise<string[]>,
  saveFileDialog: () => ipcRenderer.invoke('file:saveDialog') as Promise<string | undefined>,
  newDocument: () => ipcRenderer.invoke('document:new') as Promise<{ title: string; content: string }>,
  autoSave: (content: string) => ipcRenderer.invoke('document:autoSave', content),
  brainstorm: (prompt: string) => ipcRenderer.invoke('ai:brainstorm', prompt) as Promise<{ suggestions: string[] }>,
  // Session IPC
  sessionStart: (projectId: string, documentId: string | undefined, wordCountStart: number, sessionGoal: number | undefined, pomodoroMode: boolean) =>
    ipcRenderer.invoke('session:start', projectId, documentId, wordCountStart, sessionGoal, pomodoroMode) as Promise<Session>,
  sessionEnd: (id: string, wordCountEnd: number, pausedDuration: number, notes?: string) =>
    ipcRenderer.invoke('session:end', id, wordCountEnd, pausedDuration, notes) as Promise<void>,
  sessionPause: (id: string, pausedDuration: number) =>
    ipcRenderer.invoke('session:pause', id, pausedDuration) as Promise<void>,
  sessionResume: (id: string) =>
    ipcRenderer.invoke('session:resume', id) as Promise<void>,
  sessionList: (projectId: string) =>
    ipcRenderer.invoke('session:list', projectId) as Promise<Session[]>,
  // Streak IPC
  streakGet: (projectId: string) =>
    ipcRenderer.invoke('streak:get', projectId) as Promise<Streak | null>,
  streakUpdate: (projectId: string) =>
    ipcRenderer.invoke('streak:update', projectId) as Promise<{ streak: Streak; newMilestone: number | null }>,
  streakReset: (projectId: string) =>
    ipcRenderer.invoke('streak:reset', projectId) as Promise<void>
};

contextBridge.exposeInMainWorld('writan', api);

declare global {
  interface Window {
    writan: typeof api;
  }
}

