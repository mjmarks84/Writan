declare global {
  interface Window {
    electronAPI?: {
      invoke: <T = unknown>(channel: string, ...args: unknown[]) => Promise<T>;
    };
  }
}

export async function invokeStoryBible<T = unknown>(channel: string, ...args: unknown[]): Promise<T> {
  if (!window.electronAPI?.invoke) {
    throw new Error('Electron API unavailable: cannot invoke Story Bible IPC channel.');
  }
  return window.electronAPI.invoke<T>(channel, ...args);
}
