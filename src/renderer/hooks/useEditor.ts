import { useEditor as useTipTapEditor } from '@tiptap/react';
import { editorExtensions } from '../components/Editor/editorExtensions';

export const useEditor = (content: string, onAutoSave: (value: string) => void) => {
  return useTipTapEditor({
    extensions: editorExtensions,
    content,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'writan-editor-content'
      }
    },
    onUpdate: ({ editor }) => {
      onAutoSave(editor.getHTML());
    }
  });
};
