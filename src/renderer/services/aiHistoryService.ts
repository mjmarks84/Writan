import { AIResponse } from '../types/ai';

const HISTORY_KEY = 'writan:ai:history';

export const aiHistoryService = {
  save(response: AIResponse): void {
    const existing = this.list();
    const next = [response, ...existing].slice(0, 200);
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
