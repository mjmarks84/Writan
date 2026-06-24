CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  documentId TEXT,
  startTime DATETIME NOT NULL,
  endTime DATETIME,
  pausedDuration INTEGER DEFAULT 0,
  wordCountStart INTEGER,
  wordCountEnd INTEGER,
  sessionGoal INTEGER,
  pomodoroMode BOOLEAN DEFAULT 0,
  notes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS streaks (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  currentStreak INTEGER DEFAULT 0,
  longestStreak INTEGER DEFAULT 0,
  lastWriteDate DATE,
  streakStartDate DATE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id)
);
