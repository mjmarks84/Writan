import { useMemo } from 'react';
import type { Character, CharacterRelationship } from '../types/storyBible';
import { storyBibleStore } from '../store/storyBibleStore';
import { characterService } from '../services/characterService';
import { useStoryBible } from './useStoryBible';

export function useCharacters(projectId: string) {
  const state = useStoryBible(projectId);

  return useMemo(
    () => ({
      characters: state.characters,
      relationships: state.relationships,
      saveCharacter: async (character: Character) => {
        const saved = await characterService.save(character);
        storyBibleStore.updateCharacter(saved);
        return saved;
      },
      saveRelationship: async (relationship: CharacterRelationship) => {
        const saved = await characterService.saveRelationship(relationship);
        storyBibleStore.updateRelationship(saved);
        return saved;
      },
      deleteCharacter: async (id: string) => {
        await characterService.remove(id);
        storyBibleStore.setState({
          characters: state.characters.filter((c) => c.id !== id),
          relationships: state.relationships.filter((r) => r.character1Id !== id && r.character2Id !== id),
        });
      },
    }),
    [state.characters, state.relationships]
  );
}
