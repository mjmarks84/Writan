import { DocumentDatabase } from '../../electron/db/database';

const database = new DocumentDatabase();

export const documentService = {
  create: (id: string, title: string, content: string) => database.create({ id, title, content }),
  update: (id: string, content: string) => database.update(id, { content }),
  get: (id: string) => database.get(id),
  list: () => database.list()
};
