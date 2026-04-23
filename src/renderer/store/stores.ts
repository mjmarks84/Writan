export interface EditorStore {
  activeDocumentId: string | null;
  setActiveDocumentId: (id: string) => void;
}

export const createEditorStore = (): EditorStore => {
  let activeDocumentId: string | null = null;

  return {
    get activeDocumentId() {
      return activeDocumentId;
    },
    setActiveDocumentId: (id: string) => {
      activeDocumentId = id;
    }
  };
};
