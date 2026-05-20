import React, { useMemo } from 'react';
import type { Character, Location, PlotPoint } from '../../types/storyBible';

export function MentionAutocomplete({
  query,
  characters,
  locations,
  plotPoints,
  onSelect,
}: {
  query: string;
  characters: Character[];
  locations: Location[];
  plotPoints: PlotPoint[];
  onSelect: (value: string) => void;
}) {
  const options = useMemo(() => {
    const q = query.toLowerCase();
    return [
      ...characters.filter((c) => c.name.toLowerCase().includes(q)).map((c) => `@character:${c.name}`),
      ...locations.filter((l) => l.name.toLowerCase().includes(q)).map((l) => `@location:${l.name}`),
      ...plotPoints.filter((p) => p.title.toLowerCase().includes(q)).map((p) => `@plot:${p.title}`),
    ].slice(0, 10);
  }, [characters, locations, plotPoints, query]);

  return (
    <ul style={{ border: '1px solid #334155', borderRadius: 8, padding: 8 }}>
      {options.map((option) => (
        <li key={option}>
          <button onClick={() => onSelect(option)}>{option}</button>
        </li>
      ))}
    </ul>
  );
}
