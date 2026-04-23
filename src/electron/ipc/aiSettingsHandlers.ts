import { IpcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_AI_SETTINGS } from '../../shared/constants';
import { AISettings } from '../../shared/types';

interface RegisterAISettingsHandlersOptions {
  settingsFilePath?: string;
}

const isLocalEndpoint = (endpoint: string): boolean => {
  try {
    const parsed = new URL(endpoint);
    return ['localhost', '127.0.0.1', '::1'].includes(parsed.hostname);
  } catch {
    return false;
  }
};

export const registerAISettingsHandlers = (
  ipcMain: IpcMain,
  options: RegisterAISettingsHandlersOptions = {}
): void => {
  const settingsPath =
    options.settingsFilePath ?? path.resolve(process.cwd(), '.writan', 'ai-settings.json');

  const loadSettings = (): AISettings => {
    if (!fs.existsSync(settingsPath)) {
      return DEFAULT_AI_SETTINGS;
    }

    try {
      const parsed = JSON.parse(fs.readFileSync(settingsPath, 'utf8')) as AISettings;
      return { ...DEFAULT_AI_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_AI_SETTINGS;
    }
  };

  const saveSettings = (settings: AISettings): AISettings => {
    Object.values(settings.endpoints).forEach((endpoint) => {
      if (!isLocalEndpoint(endpoint)) {
        throw new Error('Only local endpoints are allowed when local privacy mode is enabled.');
      }
    });

    fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
    return settings;
  };

  ipcMain.handle('ai:getSettings', () => loadSettings());
  ipcMain.handle('ai:saveSettings', (_event, settings: AISettings) => saveSettings(settings));
  ipcMain.handle('ai:testConnection', async (_event, endpoint: string) => ({
    endpoint,
    reachable: isLocalEndpoint(endpoint)
  }));
  ipcMain.handle('ai:downloadModel', (_event, model: string) => ({
    success: true,
    message: `Use provider UI/CLI to install model: ${model}`
  }));
};
