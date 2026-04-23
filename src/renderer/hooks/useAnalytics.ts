import { useMemo } from 'react';
import { buildProjectStats } from '../services/analyticsService';
import type { WritingEntry } from '../../shared/types';

export const useAnalytics = (entries: WritingEntry[], targetWords: number) =>
  useMemo(() => buildProjectStats(entries, targetWords), [entries, targetWords]);
