import type { CrossReference } from '../types/storyBible';
import { invokeStoryBible } from './storyBibleApi';

export const crossReferenceService = {
  list: (projectId: string) => invokeStoryBible<CrossReference[]>('storyBible:crossReferences:list', projectId),
  save: (crossReference: CrossReference) =>
    invokeStoryBible<CrossReference>('storyBible:crossReferences:save', crossReference),
};
