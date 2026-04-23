import type { WritingEntry } from '../../shared/types';

export interface AnalyticsState {
  entries: WritingEntry[];
}

export const analyticsStore: AnalyticsState = {
  entries: []
};
