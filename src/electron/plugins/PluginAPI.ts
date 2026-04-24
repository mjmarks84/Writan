export interface PluginAPI {
  on: (event: string, listener: (payload?: unknown) => void) => void;
  off: (event: string, listener: (payload?: unknown) => void) => void;
  emit: (event: string, payload?: unknown) => void;
  storage: {
    get: <T>(key: string, fallback: T) => T;
    set: (key: string, value: unknown) => void;
  };
}
