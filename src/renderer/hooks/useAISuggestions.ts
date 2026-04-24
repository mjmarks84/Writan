import { useAI } from './useAI';
import { aiPromptService } from '../services/aiPromptService';
import { aiContextService } from '../services/aiContextService';

export const useAISuggestions = () => {
  const ai = useAI();

  const getSuggestions = async (currentText: string) => {
    return ai.run(
      {
        type: 'suggestions',
        prompt: aiPromptService.suggestions(currentText),
        context: aiContextService.fromEditor(currentText)
      },
      ai.api.getSuggestions
    );
  };

  return { ...ai, getSuggestions };
};
