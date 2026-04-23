import { create } from 'zustand';
import type { DocumentModel } from '../types';

interface DocumentState {
  document: DocumentModel;
  setContent: (content: string) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  document: {
    id: 'default',
    title: 'Untitled Manuscript',
    chapters: [],
    content: '',
    updatedAt: new Date().toISOString()
  },
  setContent: (content) =>
    set((state) => ({
      document: { ...state.document, content, updatedAt: new Date().toISOString() }
    }))
}));
