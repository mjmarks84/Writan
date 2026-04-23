export interface StyleAnalyticsResult {
  averageSentenceLength: number;
  averageParagraphLength: number;
  dialoguePercentage: number;
  descriptionRatio: number;
  passiveVoiceRatio: number;
}

export const analyzeStyle = (text: string): StyleAnalyticsResult => {
  const sentences = text.split(/[.!?]+/).map((line) => line.trim()).filter(Boolean);
  const paragraphs = text.split(/\n\s*\n/).map((line) => line.trim()).filter(Boolean);
  const words = text.match(/\b[\w'-]+\b/g) ?? [];
  const dialogueWords = (text.match(/"[^\"]+"/g) ?? []).join(' ').match(/\b[\w'-]+\b/g)?.length ?? 0;
  const passiveHits = (text.match(/\b(was|were|been|being|is|are|am)\s+\w+ed\b/gi) ?? []).length;

  return {
    averageSentenceLength: sentences.length ? Math.round(words.length / sentences.length) : 0,
    averageParagraphLength: paragraphs.length ? Math.round(words.length / paragraphs.length) : 0,
    dialoguePercentage: words.length ? Math.round((dialogueWords / words.length) * 100) : 0,
    descriptionRatio: words.length ? Math.round(((words.length - dialogueWords) / words.length) * 100) : 0,
    passiveVoiceRatio: sentences.length ? Math.round((passiveHits / sentences.length) * 100) : 0
  };
};
