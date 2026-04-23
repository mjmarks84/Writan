type LocalDocument = { id: string; title: string; content: string };

const localDocuments = new Map<string, LocalDocument>();

export const documentService = {
  create: (id: string, title: string, content: string) => {
    const document = { id, title, content };
    localDocuments.set(id, document);
    return document;
  },
  update: (id: string, content: string) => {
    const existing = localDocuments.get(id);
    if (!existing) {
      throw new Error('Document not found');
    }

    const updated = { ...existing, content };
    localDocuments.set(id, updated);
    return updated;
  },
  get: (id: string) => localDocuments.get(id),
  list: () => [...localDocuments.values()],
  createNew: () => window.writan.newDocument(),
  autoSave: (content: string) => window.writan.autoSave(content)
};
