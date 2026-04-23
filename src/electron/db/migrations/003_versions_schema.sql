CREATE TABLE IF NOT EXISTS versions (
  id TEXT PRIMARY KEY,
  documentId TEXT NOT NULL,
  content TEXT NOT NULL,
  wordCount INTEGER DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  isAutoSave BOOLEAN DEFAULT 1,
  FOREIGN KEY (documentId) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_versions_documentId_createdAt ON versions(documentId, createdAt DESC);
