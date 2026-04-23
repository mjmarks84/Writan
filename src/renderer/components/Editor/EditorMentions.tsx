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

  const mentions = useMemo(() => parseMentions(value), [value]);

  return (
    <div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyUp={(event) => {
          const target = event.target as HTMLTextAreaElement;
          const cursorText = target.value.slice(0, target.selectionStart || 0);
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
          onSelect={(mention) => onChange(`${value} ${mention}`.trim())}
        />
      ) : null}
      <small>Mentions: {mentions.join(', ') || 'none'}</small>
    </div>
  );
}
