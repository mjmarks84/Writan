import { AIProviderId, AIRequest, AIResponse, AISettings } from '../types/ai';

type IPCBridge = {
  invoke: <T>(channel: string, ...args: unknown[]) => Promise<T>;
};

const bridge: IPCBridge =
  (globalThis as { writan?: IPCBridge }).writan ??
  ({
    invoke: async () => {
      throw new Error('IPC bridge unavailable');
    }
  } as IPCBridge);

export const aiService = {
  checkConnection: () => bridge.invoke('ai:checkConnection'),
  listModels: (provider: AIProviderId) => bridge.invoke<string[]>('ai:listModels', provider),
  brainstorm: (request: AIRequest) => bridge.invoke<AIResponse>('ai:brainstorm', request),
  getSuggestions: (request: AIRequest) => bridge.invoke<AIResponse>('ai:getSuggestions', request),
  generatePrompt: (request: AIRequest) => bridge.invoke<AIResponse>('ai:generatePrompt', request),
  generatePlotIdea: (request: AIRequest) => bridge.invoke<AIResponse>('ai:generatePlotIdea', request),
  generateDialogue: (request: AIRequest) => bridge.invoke<AIResponse>('ai:generateDialogue', request),
  analyzeStyle: (request: AIRequest) => bridge.invoke<AIResponse>('ai:analyzeStyle', request),
  saveSettings: (settings: AISettings) => bridge.invoke<AISettings>('ai:saveSettings', settings),
  getSettings: () => bridge.invoke<AISettings>('ai:getSettings'),
  testConnection: (endpoint: string) => bridge.invoke('ai:testConnection', endpoint)
};
