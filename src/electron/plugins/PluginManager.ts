import { APP_VERSION } from '../../shared/constants';
import type { PluginManifest } from '../../shared/types';
import type { PluginAPI } from './PluginAPI';
import type { PluginContext, WritanPlugin } from './PluginTypes';

export class PluginManager {
  private plugins = new Map<string, WritanPlugin>();
  private listeners = new Map<string, Set<(payload?: unknown) => void>>();
  private storage = new Map<string, unknown>();

  private readonly api: PluginAPI = {
    on: (event, listener) => {
      const list = this.listeners.get(event) ?? new Set();
      list.add(listener);
      this.listeners.set(event, list);
    },
    off: (event, listener) => {
      this.listeners.get(event)?.delete(listener);
    },
    emit: (event, payload) => {
      this.listeners.get(event)?.forEach((listener) => listener(payload));
    },
    storage: {
      get: <T>(key: string, fallback: T): T => {
        const value = this.storage.get(key);
        return (value as T | undefined) ?? fallback;
      },
      set: (key, value) => {
        this.storage.set(key, value);
      }
    }
  };

  public getAPI(): PluginAPI {
    return this.api;
  }

  public canLoad(manifest: PluginManifest): boolean {
    if (!manifest.minAppVersion) return true;
    return manifest.minAppVersion <= APP_VERSION;
  }

  public async load(plugin: WritanPlugin): Promise<void> {
    if (!this.canLoad(plugin.manifest)) {
      throw new Error(`Plugin ${plugin.manifest.name} requires a newer app version.`);
    }

    if (plugin.manifest.dependencies?.some((dep) => !this.plugins.has(dep))) {
      throw new Error(`Plugin ${plugin.manifest.name} has missing dependencies.`);
    }

    const context: PluginContext = {
      emit: this.api.emit,
      getSetting: this.api.storage.get,
      setSetting: this.api.storage.set
    };

    await plugin.activate(context);
    this.plugins.set(plugin.manifest.id, plugin);
    this.api.emit('plugin:loaded', plugin.manifest.id);
  }

  public async unload(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) return;

    await plugin.deactivate?.();
    this.plugins.delete(pluginId);
    this.api.emit('plugin:unloaded', pluginId);
  }

  public listInstalled(): PluginManifest[] {
    return [...this.plugins.values()].map((plugin) => plugin.manifest);
  }
}
