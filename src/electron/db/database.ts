export interface DocumentRecord {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export class DocumentDatabase {
  private records = new Map<string, DocumentRecord>();
  private history = new Map<string, DocumentRecord[]>();

  create(input: Omit<DocumentRecord, 'updatedAt'>): DocumentRecord {
    const record: DocumentRecord = { ...input, updatedAt: new Date().toISOString() };
    this.records.set(record.id, record);
    this.history.set(record.id, [record]);
    return record;
  }

  update(id: string, updates: Partial<Pick<DocumentRecord, 'title' | 'content'>>): DocumentRecord {
    const existing = this.records.get(id);
    if (!existing) {
      throw new Error('Document not found');
    }

    const updated: DocumentRecord = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.records.set(id, updated);
    this.history.set(id, [...(this.history.get(id) ?? []), updated]);
    return updated;
  }

  get(id: string): DocumentRecord | undefined {
    return this.records.get(id);
  }

  list(): DocumentRecord[] {
    return [...this.records.values()];
  }

  delete(id: string): boolean {
    this.history.delete(id);
    return this.records.delete(id);
  }

  getHistory(id: string): DocumentRecord[] {
    return this.history.get(id) ?? [];
  }

  pruneHistory(id: string, keepLast: number): DocumentRecord[] {
    const entries = this.history.get(id) ?? [];
    const pruned = entries.slice(-keepLast);
    this.history.set(id, pruned);
    return pruned;
  }
}
