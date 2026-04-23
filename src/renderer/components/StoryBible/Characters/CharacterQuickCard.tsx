import React from 'react';
import type { Character } from '../../../types/storyBible';
import { QuickReferenceCard } from '../Common/QuickReferenceCard';

export function CharacterQuickCard({ character }: { character: Character }) {
  return (
    <QuickReferenceCard
      title={character.name}
      subtitle={[character.role, character.archetype].filter(Boolean).join(' • ')}
      description={character.background || character.personality}
      imageUrl={character.imageUrl}
    />
  );
}
