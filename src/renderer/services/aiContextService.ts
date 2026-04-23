import { AIContext } from '../types/ai';

export const aiContextService = {
  fromEditor(currentText: string, recentText = ''): AIContext {
    return {
      writing: {
        currentText,
        recentText,
        styleAnalysis: 'Narrative style appears descriptive with moderate pacing.'
      }
    };
  }
};
