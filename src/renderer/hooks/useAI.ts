import { useCallback, useEffect, useState } from 'react';
import { aiStore } from '../store/aiStore';
import { aiService } from '../services/aiService';
import { AIRequest, AIResponse, AISettings } from '../types/ai';
import { AI_HISTORY_LIMIT } from '../../shared/constants';

export const useAI = () => {
  const [state, setState] = useState(aiStore.getState());

  useEffect(() => aiStore.subscribe(setState), []);

  const run = useCallback(
    async (request: AIRequest, action: (payload: AIRequest) => Promise<AIResponse>) => {
      aiStore.setState({ loading: true, error: null });
      try {
        const response = await action(request);
        aiStore.setState((current) => ({
          loading: false,
          history: [response, ...current.history].slice(0, AI_HISTORY_LIMIT)
        }));
        return response;
      } catch (error) {
        aiStore.setState({ loading: false, error: (error as Error).message });
        throw error;
      }
    },
    []
  );

  const refreshConnection = useCallback(async () => {
    try {
      const statuses = await aiService.checkConnection();
      aiStore.setState({ connectionStatus: statuses, error: null });
      return statuses;
    } catch (error) {
      aiStore.setState({ error: (error as Error).message });
      throw error;
    }
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
