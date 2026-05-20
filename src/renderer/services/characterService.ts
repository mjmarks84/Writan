import type { Character, CharacterRelationship } from '../types/storyBible';
import { invokeStoryBible } from './storyBibleApi';

export const characterService = {
  list: (projectId: string) => invokeStoryBible<Character[]>('storyBible:characters:list', projectId),
  save: (character: Character) => invokeStoryBible<Character>('storyBible:characters:save', character),
  remove: (id: string) => invokeStoryBible<boolean>('storyBible:characters:delete', id),
  listRelationships: (projectId: string) =>
    invokeStoryBible<CharacterRelationship[]>('storyBible:relationships:list', projectId),
  saveRelationship: (relationship: CharacterRelationship) =>
    invokeStoryBible<CharacterRelationship>('storyBible:relationships:save', relationship),
};
