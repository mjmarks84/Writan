import { ipcMain } from 'electron';
import { AIService } from '../ai/AIService';
import { AIRequest, AIResponse, AISettings } from '../../shared/types';

const defaultAIService = new AIService();

const toRequest = (payload: AIRequest | string, type: AIRequest['type']): AIRequest => {
  if (typeof payload === 'string') {
    return {
      type,
      prompt: payload,
      context: {
        writing: {
          currentText: ''
        }
      }
    };
  }

  if (payload.type !== type) {
    return { ...payload, type };
  }

  return payload;
};

export function registerAIHandlers(): void {
  const aiService = defaultAIService;
  ipcMain.handle('ai:checkConnection', () => aiService.checkConnections());
  ipcMain.handle('ai:listModels', (_event, provider) => aiService.listModels(provider));
  ipcMain.handle('ai:brainstorm', (_event, request: AIRequest | string) =>
    aiService.run(toRequest(request, 'brainstorm'))
  );
  ipcMain.handle('ai:getSuggestions', (_event, request: AIRequest) => aiService.run(toRequest(request, 'suggestions')));
  ipcMain.handle('ai:generatePrompt', (_event, request: AIRequest) => aiService.run(toRequest(request, 'prompt')));
  ipcMain.handle('ai:generatePlotIdea', (_event, request: AIRequest) => aiService.run(toRequest(request, 'plot')));
  ipcMain.handle('ai:generateDialogue', (_event, request: AIRequest) => aiService.run(toRequest(request, 'dialogue')));
  ipcMain.handle('ai:analyzeStyle', (_event, request: AIRequest) => aiService.run(toRequest(request, 'analysis')));
  ipcMain.handle('ai:cancelRequest', () => ({ success: true }));
  ipcMain.handle('ai:saveResponse', (_event, response: AIResponse) => ({ success: Boolean(response.requestId) }));
  ipcMain.handle('ai:getRateLimitStatus', () => ({
    limitPerMinute: aiService.getSettings().rateLimitPerMinute
  }));
  ipcMain.handle('ai:updateSettings', (_event, settings: Partial<AISettings>) => aiService.updateSettings(settings));
}
