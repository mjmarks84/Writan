import { useEffect, useMemo, useState } from 'react';
import type { Editor } from '@tiptap/react';
import { calculateWritingStats } from '../services/editorStatsService';
import { DEFAULT_DAILY_WORD_GOAL } from '../../shared/constants';

export const useEditorStats = (editor: Editor | null) => {
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSessionSeconds((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const updateText = () => setText(editor.getText());
    updateText();
    editor.on('update', updateText);
    return () => {
      editor.off('update', updateText);
    };
  }, [editor]);

  return useMemo(
    () =>
      calculateWritingStats({
        text,
        sessionSeconds,
        dailyGoal: DEFAULT_DAILY_WORD_GOAL
      }),
    [sessionSeconds, text]
  );
};
