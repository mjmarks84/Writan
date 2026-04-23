import { create } from 'zustand';
import type { CharacterProfile, PlotPoint, LocationNote } from '../types';

interface StoryBibleState {
  characters: CharacterProfile[];
  locations: LocationNote[];
  plotPoints: PlotPoint[];
  addCharacter: (character: CharacterProfile) => void;
}

export const useStoryBibleStore = create<StoryBibleState>((set) => ({
  characters: [],
  locations: [],
  plotPoints: [],
  addCharacter: (character) => set((state) => ({ characters: [...state.characters, character] }))
}));
