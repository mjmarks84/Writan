import React, { useState } from 'react';
import { useStoryBibleSearch } from '../../../hooks/useStoryBibleSearch';
import type { StoryBibleSearchFilters } from '../../../types/storyBible';
import { SearchFilters } from './SearchFilters';

export function StoryBibleSearch({ projectId }: { projectId: string }) {
  const { results, history, search } = useStoryBibleSearch(projectId);
  const [filters, setFilters] = useState<StoryBibleSearchFilters>({ query: '' });

  return (
    <div>
      <div style={{ display: 'grid', gap: 8 }}>
        <input
          value={filters.query || ''}
          onChange={(event) => setFilters({ ...filters, query: event.target.value })}
          placeholder="Search Story Bible"
        />
        <SearchFilters value={filters} onChange={setFilters} />
        <button onClick={() => search(filters)}>Search</button>
      </div>
      <div>
        <small>History: {history.join(', ')}</small>
      </div>
      <ul>
        {results.map((result) => (
          <li key={`${result.type}-${result.id}`}>
            <strong>{result.title}</strong> <em>({result.type})</em>
            {result.preview ? <div>{result.preview}</div> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
