export interface Scene {
  id: string;
  title: string;
  content: string;
}

export interface Chapter {
  id: string;
  title: string;
  scenes: Scene[];
}

export interface DocumentModel {
  id: string;
  title: string;
  chapters: Chapter[];
  content: string;
  updatedAt: string;
}
