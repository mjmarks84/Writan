import { wordCount } from '../../shared/utils';

export const editorService = {
  applyBold: (text: string) => `**${text}**`,
  getWordCount: (text: string) => wordCount(text)
};
