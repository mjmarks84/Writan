interface WritanSession {
  id: string;
  projectId: string;
  documentId?: string;
  startTime: string;
  endTime?: string;
  pausedDuration: number;
  wordCountStart: number;
  wordCountEnd?: number;
  sessionGoal?: number;
  pomodoroMode: boolean;
  notes?: string;
  createdAt: string;
}

interface WritanStreak {
  id: string;
  projectId: string;
  currentStreak: number;
  longestStreak: number;
  lastWriteDate?: string;
  streakStartDate?: string;
  createdAt: string;
}

interface WritanAPI {
  openFileDialog: () => Promise<string[]>;
  saveFileDialog: () => Promise<string | undefined>;
  newDocument: () => Promise<{ title: string; content: string }>;
  autoSave: (content: string) => Promise<{ ok: boolean; lastSavedAt: string }>;
  brainstorm: (prompt: string) => Promise<{ suggestions: string[] }>;
  // Session IPC
  sessionStart: (projectId: string, documentId: string | undefined, wordCountStart: number, sessionGoal: number | undefined, pomodoroMode: boolean) => Promise<WritanSession>;
  sessionEnd: (id: string, wordCountEnd: number, pausedDuration: number, notes?: string) => Promise<void>;
  sessionPause: (id: string, pausedDuration: number) => Promise<void>;
  sessionResume: (id: string) => Promise<void>;
  sessionList: (projectId: string) => Promise<WritanSession[]>;
  // Streak IPC
  streakGet: (projectId: string) => Promise<WritanStreak | null>;
  streakUpdate: (projectId: string) => Promise<{ streak: WritanStreak; newMilestone: number | null }>;
  streakReset: (projectId: string) => Promise<void>;
}

declare interface Window {
  writan: WritanAPI;
}


