import type { ExportFormat, ImportFormat } from './constants';

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  wordCount: number;
  genre?: string | null;
  status: 'draft' | 'active' | 'archived';
}

export interface DocumentItem {
  id: string;
  projectId: string;
  title: string;
  content: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  wordCount: number;
}

export interface Version {
  id: string;
  documentId: string;
  content: string;
  wordCount: number;
  createdAt: string;
  isAutoSave: 0 | 1;
}

export interface DocumentStats {
  wordCount: number;
  characterCount: number;
  readingTimeMinutes: number;
}

export interface ImportedDocument {
  title: string;
  author?: string;
  content: string;
  sourcePath: string;
  format: ImportFormat;
}

export interface ExportRequest {
  outputPath: string;
  title: string;
  author?: string;
  content: string;
  chapters?: Array<{ title: string; content: string }>;
  format: ExportFormat;
  headerTemplate?: string;
  footerTemplate?: string;
}

export interface AIPreferences {
  provider: string;
  model: string;
  endpoint?: string;
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
}
