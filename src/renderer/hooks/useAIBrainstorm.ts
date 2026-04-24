import { useAI } from './useAI';
import { aiPromptService } from '../services/aiPromptService';
import { aiContextService } from '../services/aiContextService';

export const useAIBrainstorm = () => {
  const ai = useAI();

  const brainstorm = async (topic: string, currentText: string) => {
    return ai.run(
      {
        type: 'brainstorm',
        prompt: aiPromptService.brainstorm(topic),
        context: aiContextService.fromEditor(currentText)
      },
      ai.api.brainstorm
    );
  };

  return { ...ai, brainstorm };
};
