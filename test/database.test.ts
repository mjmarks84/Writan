import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { initDatabase } from '../src/electron/db/database';
import { DatabaseQueries } from '../src/electron/db/queries';

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'writan-phase1-'));
process.env.WRITAN_DATA_DIR = tempRoot;

test('database initializes and creates expected tables', () => {
  const db = initDatabase();
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as Array<{ name: string }>;
  const names = new Set(tables.map((t) => t.name));

  assert.equal(names.has('projects'), true);
  assert.equal(names.has('documents'), true);
  assert.equal(names.has('versions'), true);
  assert.equal(names.has('characters'), true);
  assert.equal(names.has('aiSettings'), true);
});

test('document CRUD and version limit work', () => {
  const db = initDatabase();
  const queries = new DatabaseQueries(db);

  const project = queries.createProject({ name: 'Novel', description: 'desc', genre: 'fantasy', status: 'draft' });
  const doc = queries.createDocument({ projectId: project.id, title: 'Chapter 1', content: 'Once upon a time', order: 1 });

  assert.equal(queries.getDocument(doc.id)?.title, 'Chapter 1');

  for (let i = 0; i < 25; i += 1) {
    queries.createVersion(doc.id, `content ${i}`, i % 5 !== 0);
  }

  const versions = queries.listVersions(doc.id);
  assert.equal(versions.length <= 20, true);
  assert.equal(versions.some((v) => v.isAutoSave === 0), true);

  const updated = queries.saveDocument(doc.id, 'Updated text with more words');
  assert.equal(updated.wordCount > 0, true);

  const duplicate = queries.duplicateDocument(doc.id);
  assert.equal(duplicate.title.includes('(Copy)'), true);

  const search = queries.searchDocuments(project.id, 'Updated');
  assert.equal(search.length >= 1, true);
});
