export const brainstormPrompt = (topic: string, ideaCount = 10) =>
  `Brainstorm ${ideaCount} novel ideas about: ${topic}. Return concise bullet points grouped by theme.`;
