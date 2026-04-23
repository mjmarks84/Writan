import type { Editor } from '@tiptap/react';
import type { FindMatch } from '../types/stats';

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const findMatches = (text: string, query: string, useRegex = false): FindMatch[] => {
  if (!query) {
    return [];
  }

  const pattern = useRegex ? query : escapeRegex(query);
  const regex = new RegExp(pattern, 'gi');
  const matches: FindMatch[] = [];
  let match = regex.exec(text);
  while (match) {
    matches.push({
      index: match.index,
      length: match[0].length,
      value: match[0]
    });
    match = regex.exec(text);
  }
  return matches;
};

export const replaceInText = (
  text: string,
  query: string,
  replaceWith: string,
  useRegex = false,
  replaceAll = false
): string => {
  if (!query) {
    return text;
  }

  const pattern = useRegex ? query : escapeRegex(query);
  const regex = new RegExp(pattern, replaceAll ? 'gi' : 'i');
  return text.replace(regex, replaceWith);
};

export const applyReplaceToEditor = (
  editor: Editor,
  query: string,
  replaceWith: string,
  useRegex = false,
  replaceAll = false
): void => {
  const text = editor.getText();
  const replaced = replaceInText(text, query, replaceWith, useRegex, replaceAll);
  if (text !== replaced) {
    editor.commands.setContent(`<p>${replaced.replace(/\n/g, '<br />')}</p>`);
  }
};
