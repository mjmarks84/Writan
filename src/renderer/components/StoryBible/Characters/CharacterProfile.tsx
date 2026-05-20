import React, { useMemo } from 'react';
import type { Character, TimelineEvent } from '../../../types/storyBible';
import { CharacterForm } from './CharacterForm';
import { CharacterTimeline } from './CharacterTimeline';

export function CharacterProfile({
  character,
  timelineEvents,
  onChange,
  onSave,
}: {
  character: Character;
  timelineEvents: TimelineEvent[];
  onChange: (next: Character) => void;
  onSave: () => void;
}) {
  const appearances = useMemo(
    () => timelineEvents.filter((event) => event.connectedCharacters?.includes(character.id)),
    [character.id, timelineEvents]
  );

  return (
    <section>
      <h3>{character.name || 'New Character'}</h3>
      <CharacterForm value={character} onChange={onChange} />
      <button onClick={onSave} disabled={!character.name.trim()}>
        Save Character
      </button>
      <h4>Character Timeline</h4>
      <CharacterTimeline events={appearances} />
    </section>
  );
}
