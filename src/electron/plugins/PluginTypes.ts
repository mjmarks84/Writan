import type { PluginManifest } from '../../shared/types';

export interface PluginContext {
  emit: (event: string, payload?: unknown) => void;
  getSetting: <T>(key: string, fallback: T) => T;
  setSetting: (key: string, value: unknown) => void;
}

export interface WritanPlugin {
  manifest: PluginManifest;
  activate: (ctx: PluginContext) => Promise<void> | void;
  deactivate?: () => Promise<void> | void;
}
