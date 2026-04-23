import { DocumentDatabase } from '../db/database';

const db = new DocumentDatabase();

export const createDocument = (id: string, title: string, content: string) => {
  return db.create({ id, title, content });
};

export const updateDocument = (id: string, content: string) => {
  return db.update(id, { content });
};

export const getDocument = (id: string) => db.get(id);
