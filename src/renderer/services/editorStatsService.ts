import type { WritingStats } from '../types/stats';

const WORDS_PER_MINUTE = 200;

export const countWords = (text: string): number => {
  const trimmed = text.trim();
  if (!trimmed) {
    return 0;
  }

  return trimmed.split(/\s+/).length;
};

export const countCharacters = (text: string): number => text.length;

export const countCharactersNoSpaces = (text: string): number =>
  text.replace(/\s/g, '').length;

export const estimateReadingTimeMinutes = (wordCount: number): number =>
  Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

export const calculateWritingPace = (wordCount: number, sessionSeconds: number): number => {
  if (sessionSeconds <= 0) {
    return 0;
  }

  const minutes = sessionSeconds / 60;
  return Math.round(wordCount / minutes);
};

export const calculateWritingStats = (params: {
  text: string;
  sessionSeconds: number;
  dailyWords?: number;
  dailyGoal?: number;
}): WritingStats => {
  const words = countWords(params.text);
  return {
    words,
    characters: countCharacters(params.text),
    charactersNoSpaces: countCharactersNoSpaces(params.text),
    readingTimeMinutes: estimateReadingTimeMinutes(words),
    writingPaceWpm: calculateWritingPace(words, params.sessionSeconds),
    sessionSeconds: params.sessionSeconds,
    dailyWords: params.dailyWords ?? words,
    dailyGoal: params.dailyGoal ?? 1000
  };
};
