import { useEffect } from 'react';
import { useAI } from './useAI';

export const useAIConnection = () => {
  const ai = useAI();

  useEffect(() => {
    void ai.refreshConnection();
  }, []);

  return ai.connectionStatus;
};
