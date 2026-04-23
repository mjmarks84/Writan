import React from 'react';
import type { EntityType, StoryBibleSearchFilters } from '../../../types/storyBible';

const options: EntityType[] = ['character', 'location', 'plotPoint', 'timelineEvent', 'theme'];

export function SearchFilters({ value, onChange }: { value: StoryBibleSearchFilters; onChange: (next: StoryBibleSearchFilters) => void }) {
  const toggleType = (type: EntityType) => {
    const current = value.types || [];
    onChange({
      ...value,
      types: current.includes(type) ? current.filter((entry) => entry !== type) : [...current, type],
    });
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map((type) => (
        <label key={type}>
          <input type="checkbox" checked={value.types?.includes(type) || false} onChange={() => toggleType(type)} /> {type}
        </label>
      ))}
    </div>
  );
}
