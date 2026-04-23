import type { WritingSession } from '../../shared/types';

export interface SessionState {
  sessions: WritingSession[];
}

export const sessionStore: SessionState = {
  sessions: []
};
