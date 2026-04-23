import React, { useMemo, useState } from 'react';
import type { Character } from '../../../types/storyBible';

export function CharacterList({
  characters,
  onSelect,
  onCreate,
}: {
  characters: Character[];
  onSelect: (character: Character) => void;
  onCreate: () => void;
}) {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const roles = useMemo(() => [...new Set(characters.map((character) => character.role).filter(Boolean))] as string[], [characters]);

  const filtered = useMemo(
    () =>
      characters
        .filter((character) => !roleFilter || character.role === roleFilter)
        .filter((character) => character.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [characters, query, roleFilter]
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input placeholder="Search characters" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
          <option value="">All roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <button onClick={onCreate}>Add Character</button>
      </div>
      <ul>
        {filtered.map((character) => (
          <li key={character.id}>
            <button onClick={() => onSelect(character)}>{character.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
