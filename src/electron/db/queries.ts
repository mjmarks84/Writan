import type { DocumentRecord } from './database';

export const findByTitle = (records: DocumentRecord[], query: string): DocumentRecord[] => {
  const normalized = query.toLowerCase();
  return records.filter((record) => record.title.toLowerCase().includes(normalized));
};
