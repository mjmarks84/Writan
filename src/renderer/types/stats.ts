export interface WritingStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  readingTimeMinutes: number;
  writingPaceWpm: number;
  sessionSeconds: number;
  dailyWords: number;
  dailyGoal: number;
}

export interface FindMatch {
  index: number;
  length: number;
  value: string;
}
