interface WritanInvokeResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

interface WritanAPI {
  openFileDialog: () => Promise<string[]>;
  saveFileDialog: () => Promise<string | undefined>;
  newDocument: () => Promise<{ title: string; content: string }>;
  autoSave: (content: string) => Promise<{ ok: boolean; lastSavedAt: string }>;
  brainstorm: (prompt: string) => Promise<{ suggestions: string[] }>;
  invoke: <T = unknown>(channel: string, ...args: unknown[]) => Promise<WritanInvokeResponse<T>>;
}

declare interface Window {
  writan: WritanAPI;
}
