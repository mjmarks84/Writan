import React, { useMemo, useState } from 'react';
import type { Character, Location, PlotPoint } from '../../types/storyBible';
import { MentionAutocomplete } from './MentionAutocomplete';

const mentionRegex = /@(character|location|plot):([^\s.,!?]+)/g;

export function parseMentions(text: string): string[] {
  return Array.from(text.matchAll(mentionRegex)).map((match) => match[0]);
}

export function EditorMentions({
  value,
  onChange,
  characters,
  locations,
  plotPoints,
}: {
  value: string;
  onChange: (value: string) => void;
  characters: Character[];
  locations: Location[];
  plotPoints: PlotPoint[];
}) {
  const [query, setQuery] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  const mentions = useMemo(() => parseMentions(value), [value]);

  return (
    <div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyUp={(event) => {
          const target = event.target as HTMLTextAreaElement;
          const cursor = target.selectionStart || 0;
          setCursorPosition(cursor);
          const cursorText = target.value.slice(0, cursor);
          const atIndex = cursorText.lastIndexOf('@');
          setQuery(atIndex >= 0 ? cursorText.slice(atIndex + 1) : '');
        }}
        style={{ width: '100%', minHeight: 180 }}
      />
      {query ? (
        <MentionAutocomplete
          query={query}
          characters={characters}
          locations={locations}
          plotPoints={plotPoints}
          onSelect={(mention) => {
            const cursor = cursorPosition || value.length;
            const before = value.slice(0, cursor);
            const after = value.slice(cursor);
            const atIndex = before.lastIndexOf('@');

            if (atIndex < 0) {
              onChange(`${value} ${mention}`.trim());
              return;
            }

            const prefix = before.slice(0, atIndex);
            onChange(`${prefix}${mention} ${after}`.trimEnd());
            setQuery('');
          }}
        />
      ) : null}
      <small>Mentions: {mentions.join(', ') || 'none'}</small>
    </div>
  );
}
