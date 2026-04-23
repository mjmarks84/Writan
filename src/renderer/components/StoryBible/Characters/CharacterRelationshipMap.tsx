import React from 'react';
import type { Character, CharacterRelationship } from '../../../types/storyBible';
import { RelationshipTag } from '../Common/RelationshipTag';

export function CharacterRelationshipMap({
  characters,
  relationships,
}: {
  characters: Character[];
  relationships: CharacterRelationship[];
}) {
  const nameById = new Map(characters.map((character) => [character.id, character.name]));

  return (
    <div>
      <h4>Relationship Map</h4>
      <ul>
        {relationships.map((relationship) => (
          <li key={relationship.id}>
            {nameById.get(relationship.character1Id) || relationship.character1Id} ↔{' '}
            {nameById.get(relationship.character2Id) || relationship.character2Id}{' '}
            {relationship.relationshipType ? <RelationshipTag type={relationship.relationshipType} /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
