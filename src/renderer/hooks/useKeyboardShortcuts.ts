import { useEffect } from 'react';
import type { Editor } from '@tiptap/react';

const isModifier = (event: KeyboardEvent): boolean => event.ctrlKey || event.metaKey;

export const useKeyboardShortcuts = (
  editor: Editor | null,
  handlers: {
    onFind: () => void;
    onReplace: () => void;
  }
) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (!editor || !isModifier(event)) {
        return;
      }

      const key = event.key.toLowerCase();
      if (key === 'f') {
        event.preventDefault();
        handlers.onFind();
      } else if (key === 'h') {
        event.preventDefault();
        handlers.onReplace();
      } else if (event.altKey && ['1', '2', '3'].includes(key)) {
        event.preventDefault();
        editor.chain().focus().toggleHeading({ level: Number(key) as 1 | 2 | 3 }).run();
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [editor, handlers]);
};
