import { useAI } from './useAI';
import { aiPromptService } from '../services/aiPromptService';
import { aiContextService } from '../services/aiContextService';

export const useAIPlots = () => {
  const ai = useAI();

  const generatePlotIdea = async (currentText: string) => {
    return ai.run(
      {
        type: 'plot',
        prompt: aiPromptService.plot(currentText),
        context: aiContextService.fromEditor(currentText)
      },
      ai.api.generatePlotIdea
    );
  };

  return { ...ai, generatePlotIdea };
};
