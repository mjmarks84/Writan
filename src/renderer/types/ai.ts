export interface AISettings {
  provider: 'ollama' | 'lmstudio';
  endpoint: string;
  model: string;
}

export interface AISuggestion {
  id: string;
  text: string;
  type: 'plot' | 'chapter' | 'twist' | 'dialogue';
}
