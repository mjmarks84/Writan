import { useAI } from './useAI';
import { aiPromptService } from '../services/aiPromptService';
import { aiContextService } from '../services/aiContextService';

export const useAIDialogue = () => {
  const ai = useAI();

  const generateDialogue = async (character: string, scene: string) => {
    return ai.run(
      {
        type: 'dialogue',
        prompt: aiPromptService.dialogue(character, scene),
        context: aiContextService.fromEditor(scene)
      },
      ai.api.generateDialogue
    );
  };

  return { ...ai, generateDialogue };
};
