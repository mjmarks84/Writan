export const dialoguePrompt = (character: string, scene: string) =>
  `Generate dialogue for ${character} in this scene while preserving voice consistency:\n\n${scene}`;
