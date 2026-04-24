import { useEffect } from 'react';
import { useAI } from './useAI';

export const useAIConnection = () => {
  const { connectionStatus, refreshConnection } = useAI();

  useEffect(() => {
    void refreshConnection();
  }, [refreshConnection]);

  return connectionStatus;
};
