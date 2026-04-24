import { useMemo, useState } from 'react';
import { calculateWpm } from '../services/sessionService';

export const useWritingSession = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [wordsWritten, setWordsWritten] = useState(0);
  const [running, setRunning] = useState(false);

  const wpm = useMemo(() => calculateWpm(wordsWritten, elapsedSeconds), [wordsWritten, elapsedSeconds]);

  return { elapsedSeconds, setElapsedSeconds, wordsWritten, setWordsWritten, running, setRunning, wpm };
};
