import { useAI } from './useAI';

export const useAISettings = () => {
  const ai = useAI();

  const loadSettings = async () => {
    const settings = await ai.api.getSettings();
    await ai.saveSettings(settings);
    return settings;
  };

  const testConnection = (endpoint: string) => ai.api.testConnection(endpoint);

  return { ...ai, loadSettings, testConnection };
};
