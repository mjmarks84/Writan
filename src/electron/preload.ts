import { contextBridge, ipcRenderer } from 'electron';

const api = {
  openFileDialog: () => ipcRenderer.invoke('file:openDialog') as Promise<string[]>,
  saveFileDialog: () => ipcRenderer.invoke('file:saveDialog') as Promise<string | undefined>,
  newDocument: () => ipcRenderer.invoke('document:new') as Promise<{ title: string; content: string }>,
  autoSave: (content: string) => ipcRenderer.invoke('document:autoSave', content),
  brainstorm: (prompt: string) => ipcRenderer.invoke('ai:brainstorm', prompt) as Promise<{ suggestions: string[] }>
};

contextBridge.exposeInMainWorld('writan', api);

declare global {
  interface Window {
    writan: typeof api;
  }
}
