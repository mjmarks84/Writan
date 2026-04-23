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
