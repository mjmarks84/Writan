import type { JSONContent } from '@tiptap/core';

export type OutlineNodeType = 'chapter' | 'scene';

export interface DocumentOutlineNode {
  id: string;
  type: OutlineNodeType;
  title: string;
  level: number;
  startOffset: number;
  collapsed?: boolean;
  children?: DocumentOutlineNode[];
}

export interface EditorSettings {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface EditorDocument {
  id: string;
  title: string;
  content: JSONContent;
  updatedAt: string;
}
