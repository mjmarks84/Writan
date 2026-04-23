import { useCallback, useState } from 'react';
import type { StoryBibleSearchFilters, StoryBibleSearchResult } from '../types/storyBible';
import { storyBibleSearchService } from '../services/storyBibleSearchService';

export function useStoryBibleSearch(projectId: string) {
  const [results, setResults] = useState<StoryBibleSearchResult[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const search = useCallback(
    async (filters: StoryBibleSearchFilters) => {
      const found = await storyBibleSearchService.search(projectId, filters);
      setResults(found);
      if (filters.query?.trim()) {
        setHistory((prev) => [filters.query!.trim(), ...prev.filter((entry) => entry !== filters.query)].slice(0, 10));
      }
      return found;
    },
    [projectId]
  );

  return { results, history, search };
}
