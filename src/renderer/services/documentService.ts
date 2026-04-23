export const documentService = {
  createNew: () => window.writan.newDocument(),
  autoSave: (content: string) => window.writan.autoSave(content)
};
