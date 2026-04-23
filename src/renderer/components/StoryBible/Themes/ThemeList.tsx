import React, { useMemo, useState } from 'react';
import type { Theme } from '../../../types/storyBible';
import { EntityBadge } from '../Common/EntityBadge';

export function ThemeList({ themes, onSelect, onCreate }: { themes: Theme[]; onSelect: (theme: Theme) => void; onCreate: () => void }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => themes.filter((theme) => theme.name.toLowerCase().includes(query.toLowerCase())),
    [themes, query]
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search themes" />
        <button onClick={onCreate}>Add Theme</button>
      </div>
      <ul>
        {filtered.map((theme) => (
          <li key={theme.id}>
            <button onClick={() => onSelect(theme)}>{theme.name}</button> <EntityBadge label={theme.color || '#6366f1'} color={theme.color} />
          </li>
        ))}
      </ul>
    </div>
  );
}
