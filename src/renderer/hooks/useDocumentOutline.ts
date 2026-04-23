import { useMemo, useState } from 'react';
import type { Editor } from '@tiptap/react';
import type { DocumentOutlineNode } from '../types/editor';

export const useDocumentOutline = (editor: Editor | null) => {
  const [search, setSearch] = useState('');

  const outline = useMemo<DocumentOutlineNode[]>(() => {
    if (!editor) {
      return [];
    }
    const json = editor.getJSON();
    const content = json.content ?? [];
    let offset = 0;
    let chapterCount = 0;
    let sceneCount = 0;
    return content
      .filter((node) => node.type === 'heading')
      .map((node): DocumentOutlineNode => {
        const text = node.content?.map((child) => ('text' in child ? child.text : '')).join('') ?? 'Untitled';
        const level = typeof node.attrs?.level === 'number' ? node.attrs.level : 1;
        const type = level <= 1 ? 'chapter' : 'scene';
        const id = type === 'chapter' ? `chapter-${++chapterCount}` : `scene-${++sceneCount}`;
        offset += text.length;
        return {
          id,
          title: text,
          type,
          level,
          startOffset: offset
        };
      })
      .filter((node) => node.title.toLowerCase().includes(search.toLowerCase()));
  }, [editor, search]);

  const jumpToNode = (node: DocumentOutlineNode) => {
    if (!editor) {
      return;
    }
    const text = editor.getText();
    const index = text.indexOf(node.title);
    if (index >= 0) {
      editor.commands.focus();
      editor.commands.setTextSelection(index);
    }
  };

  return {
    outline,
    search,
    setSearch,
    jumpToNode
  };
};
