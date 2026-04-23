export const aiAnalysisService = {
  estimatePacing(text: string): string {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    if (words < 120) return 'Fast pacing';
    if (words < 350) return 'Balanced pacing';
    return 'Slow pacing';
  }
};
