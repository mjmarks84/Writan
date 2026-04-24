import { AIContext } from '../types/ai';

const DEFAULT_STYLE_ANALYSIS =
  'Style analysis unavailable: provide document analyzer output for stronger context-aware guidance.';

export const aiContextService = {
  fromEditor(currentText: string, recentText = ''): AIContext {
    return {
      writing: {
        currentText,
        recentText,
        styleAnalysis: DEFAULT_STYLE_ANALYSIS
      }
    };
  }
};
