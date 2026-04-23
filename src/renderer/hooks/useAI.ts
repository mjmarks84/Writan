import { useCallback, useEffect, useState } from 'react';
import { aiStore } from '../store/aiStore';
import { aiService } from '../services/aiService';
import { AIRequest, AIResponse, AISettings } from '../types/ai';

export const useAI = () => {
  const [state, setState] = useState(aiStore.getState());

  useEffect(() => aiStore.subscribe(setState), []);

  const run = useCallback(
    async (request: AIRequest, action: (payload: AIRequest) => Promise<AIResponse>) => {
      aiStore.setState({ loading: true, error: null });
      try {
        const response = await action(request);
        aiStore.setState({ loading: false, history: [response, ...aiStore.getState().history].slice(0, 200) });
        return response;
      } catch (error) {
        aiStore.setState({ loading: false, error: (error as Error).message });
        throw error;
      }
    },
    []
  );

  const refreshConnection = useCallback(async () => {
    const statuses = await aiService.checkConnection();
    aiStore.setState({ connectionStatus: statuses });
    return statuses;
  }, []);

  const saveSettings = useCallback(async (settings: AISettings) => {
    const next = await aiService.saveSettings(settings);
    aiStore.setState({ settings: next });
    return next;
  }, []);

  return {
    ...state,
    run,
    refreshConnection,
    saveSettings,
    api: aiService
  };
};
