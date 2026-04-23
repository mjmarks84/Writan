import { IpcMain } from 'electron';
import { AIService } from '../ai/AIService';
import { AIRequest, AIResponse, AISettings } from '../../shared/types';

export const registerAIHandlers = (ipcMain: IpcMain, aiService: AIService): void => {
  ipcMain.handle('ai:checkConnection', () => aiService.checkConnections());
  ipcMain.handle('ai:listModels', (_event, provider) => aiService.listModels(provider));
  ipcMain.handle('ai:brainstorm', (_event, request: AIRequest) => aiService.run({ ...request, type: 'brainstorm' }));
  ipcMain.handle('ai:getSuggestions', (_event, request: AIRequest) => aiService.run({ ...request, type: 'suggestions' }));
  ipcMain.handle('ai:generatePrompt', (_event, request: AIRequest) => aiService.run({ ...request, type: 'prompt' }));
  ipcMain.handle('ai:generatePlotIdea', (_event, request: AIRequest) => aiService.run({ ...request, type: 'plot' }));
  ipcMain.handle('ai:generateDialogue', (_event, request: AIRequest) => aiService.run({ ...request, type: 'dialogue' }));
  ipcMain.handle('ai:analyzeStyle', (_event, request: AIRequest) => aiService.run({ ...request, type: 'analysis' }));
  ipcMain.handle('ai:cancelRequest', () => ({ success: true }));
  ipcMain.handle('ai:saveResponse', (_event, response: AIResponse) => ({ success: Boolean(response.requestId) }));
  ipcMain.handle('ai:getRateLimitStatus', () => ({
    limitPerMinute: aiService.getSettings().rateLimitPerMinute
  }));
  ipcMain.handle('ai:updateSettings', (_event, settings: Partial<AISettings>) => aiService.updateSettings(settings));
};
