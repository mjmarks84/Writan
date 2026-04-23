import { ipcMain } from 'electron';

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
