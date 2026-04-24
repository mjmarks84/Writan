import { AIResponse, AISuggestion } from '../../shared/types';

export class ResponseProcessor {
  format(response: AIResponse): AIResponse {
    const suggestions = this.extractSuggestions(response.content);
    return { ...response, content: response.content.trim(), suggestions };
  }

  extractSuggestions(content: string): AISuggestion[] {
    return content
      .split('\n')
      .map((line) => line.replace(/^[-*\d.\s]+/, '').trim())
      .filter(Boolean)
      .slice(0, 10)
      .map((text, index) => ({ id: `${index + 1}`, text, score: 1 }));
  }
}
