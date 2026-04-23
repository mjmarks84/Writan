import { create } from 'zustand';
import type { AISuggestion, AISettings } from '../types';

interface AIState {
  settings: AISettings;
  suggestions: AISuggestion[];
  setSuggestions: (suggestions: AISuggestion[]) => void;
}

export const useAIStore = create<AIState>((set) => ({
  settings: {
    provider: 'ollama',
    endpoint: 'http://localhost:11434/api/generate',
    model: 'llama3'
  },
  suggestions: [],
  setSuggestions: (suggestions) => set({ suggestions })
}));
