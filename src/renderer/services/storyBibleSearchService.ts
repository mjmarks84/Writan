import type { StoryBibleSearchFilters, StoryBibleSearchResult } from '../types/storyBible';
import { invokeStoryBible } from './storyBibleApi';

export const storyBibleSearchService = {
  search: (projectId: string, filters: StoryBibleSearchFilters) =>
    invokeStoryBible<StoryBibleSearchResult[]>('storyBible:search', projectId, filters),
};
