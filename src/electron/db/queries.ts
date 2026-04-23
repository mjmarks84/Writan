import type Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { MAX_VERSION_HISTORY, VERSION_RETENTION_DAYS } from '../../shared/constants';
import type { DocumentItem, DocumentStats, Project, Version } from '../../shared/types';

const WORD_SPLIT = /\s+/g;

function getWordCount(content: string): number {
  const trimmed = content.trim();
  if (!trimmed) return 0;
  return trimmed.split(WORD_SPLIT).filter(Boolean).length;
}

export class DatabaseQueries {
  constructor(private readonly db: Database.Database) {}

  createProject(input: Pick<Project, 'name' | 'description' | 'genre' | 'status'>): Project {
    const id = uuidv4();
    this.db.prepare(
      'INSERT INTO projects(id, name, description, genre, status) VALUES (?, ?, ?, ?, ?)',
    ).run(id, input.name, input.description ?? null, input.genre ?? null, input.status);

    return this.getProject(id) as Project;
  }

  getProject(id: string): Project | undefined {
    return this.db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as Project | undefined;
  }

  listProjects(): Project[] {
    return this.db.prepare('SELECT * FROM projects ORDER BY updatedAt DESC').all() as Project[];
  }

  createDocument(input: Pick<DocumentItem, 'projectId' | 'title' | 'content' | 'order'>): DocumentItem {
    const id = uuidv4();
    const wordCount = getWordCount(input.content);
    this.db.prepare(
      'INSERT INTO documents(id, projectId, title, content, "order", wordCount) VALUES (?, ?, ?, ?, ?, ?)',
    ).run(id, input.projectId, input.title, input.content, input.order, wordCount);

    return this.getDocument(id) as DocumentItem;
  }

  getDocument(id: string): DocumentItem | undefined {
    return this.db.prepare('SELECT * FROM documents WHERE id = ?').get(id) as DocumentItem | undefined;
  }

  listDocuments(projectId: string): DocumentItem[] {
    return this.db.prepare('SELECT * FROM documents WHERE projectId = ? ORDER BY "order" ASC, updatedAt DESC').all(projectId) as DocumentItem[];
  }

  saveDocument(id: string, content: string, title?: string): DocumentItem {
    const wordCount = getWordCount(content);
    this.db.prepare(
      'UPDATE documents SET content = ?, title = COALESCE(?, title), wordCount = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    ).run(content, title ?? null, wordCount, id);

    return this.getDocument(id) as DocumentItem;
  }

  duplicateDocument(id: string): DocumentItem {
    const source = this.getDocument(id);
    if (!source) throw new Error('Document not found');

    return this.createDocument({
      projectId: source.projectId,
      title: `${source.title} (Copy)`,
      content: source.content,
      order: source.order + 1,
    });
  }

  deleteDocument(id: string): void {
    this.db.prepare('DELETE FROM documents WHERE id = ?').run(id);
  }

  createVersion(documentId: string, content: string, isAutoSave = true): Version {
    const id = uuidv4();
    const wordCount = getWordCount(content);
    this.db.prepare(
      'INSERT INTO versions(id, documentId, content, wordCount, isAutoSave) VALUES (?, ?, ?, ?, ?)',
    ).run(id, documentId, content, wordCount, isAutoSave ? 1 : 0);

    this.db.prepare(
      `DELETE FROM versions
       WHERE documentId = ?
       AND id NOT IN (
         SELECT id FROM versions
         WHERE documentId = ?
         ORDER BY createdAt DESC
         LIMIT ?
       )`,
    ).run(documentId, documentId, MAX_VERSION_HISTORY);

    this.db.prepare(
      `DELETE FROM versions
       WHERE documentId = ?
       AND createdAt < datetime('now', ?)`
    ).run(documentId, `-${VERSION_RETENTION_DAYS} days`);

    return this.db.prepare('SELECT * FROM versions WHERE id = ?').get(id) as Version;
  }

  listVersions(documentId: string): Version[] {
    return this.db.prepare('SELECT * FROM versions WHERE documentId = ? ORDER BY createdAt DESC').all(documentId) as Version[];
  }

  recoverVersion(versionId: string): DocumentItem {
    const version = this.db.prepare('SELECT * FROM versions WHERE id = ?').get(versionId) as Version | undefined;
    if (!version) throw new Error('Version not found');
    return this.saveDocument(version.documentId, version.content);
  }

  documentStats(content: string): DocumentStats {
    const wordCount = getWordCount(content);
    const characterCount = content.length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    return { wordCount, characterCount, readingTimeMinutes };
  }

  searchDocuments(projectId: string, query: string): DocumentItem[] {
    const q = `%${query}%`;
    return this.db.prepare(
      'SELECT * FROM documents WHERE projectId = ? AND (title LIKE ? OR content LIKE ?) ORDER BY updatedAt DESC',
    ).all(projectId, q, q) as DocumentItem[];
  }
}
