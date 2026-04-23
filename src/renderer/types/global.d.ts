interface WritanAPI {
  openFileDialog: () => Promise<string[]>;
  saveFileDialog: () => Promise<string | undefined>;
  newDocument: () => Promise<{ title: string; content: string }>;
  autoSave: (content: string) => Promise<{ ok: boolean; lastSavedAt: string }>;
  brainstorm: (prompt: string) => Promise<{ suggestions: string[] }>;
}

declare interface Window {
  writan: WritanAPI;
}
