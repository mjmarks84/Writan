import React, { useMemo, useState } from 'react';
import type { Location } from '../../../types/storyBible';

export function LocationList({ locations, onSelect, onCreate }: { locations: Location[]; onSelect: (location: Location) => void; onCreate: () => void }) {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const types = useMemo(() => [...new Set(locations.map((location) => location.type).filter(Boolean))] as string[], [locations]);

  const filtered = useMemo(
    () =>
      locations
        .filter((location) => !typeFilter || location.type === typeFilter)
        .filter((location) => location.name.toLowerCase().includes(query.toLowerCase())),
    [locations, query, typeFilter]
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input placeholder="Search locations" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All types</option>
          {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button onClick={onCreate}>Add Location</button>
      </div>
      <ul>
        {filtered.map((location) => (
          <li key={location.id}>
            <button onClick={() => onSelect(location)}>{location.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
