import { ipcMain } from 'electron';

export const buildAIContext = (
  documentContent: string,
  storyBibleSummary: string,
  online = true
): string => {
  if (!online) {
    return 'Offline mode: AI provider unavailable';
  }

  return `Document:\n${documentContent}\n\nStory Bible:\n${storyBibleSummary}`;
};

export function registerAIHandlers() {
  ipcMain.handle('ai:brainstorm', async (_event, prompt: string) => {
    return {
      suggestions: [
        `What conflict can intensify after: ${prompt}`,
        `How can the protagonist evolve in this scene?`
      ]
    };
  });
}
