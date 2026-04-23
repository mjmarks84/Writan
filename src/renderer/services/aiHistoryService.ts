import { AIResponse } from '../types/ai';
import { AI_HISTORY_LIMIT } from '../../shared/constants';

const HISTORY_KEY = 'writan:ai:history';

export const aiHistoryService = {
  save(response: AIResponse): void {
    const existing = this.list();
    const next = [response, ...existing].slice(0, AI_HISTORY_LIMIT);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  },
  list(): AIResponse[] {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as AIResponse[];
    } catch {
      return [];
    }
  }
};
