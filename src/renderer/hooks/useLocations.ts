import { useMemo } from 'react';
import type { Location } from '../types/storyBible';
import { storyBibleStore } from '../store/storyBibleStore';
import { locationService } from '../services/locationService';
import { useStoryBible } from './useStoryBible';

export function useLocations(projectId: string) {
  const state = useStoryBible(projectId);

  return useMemo(
    () => ({
      locations: state.locations,
      saveLocation: async (location: Location) => {
        const saved = await locationService.save(location);
        storyBibleStore.updateLocation(saved);
        return saved;
      },
      deleteLocation: async (id: string) => {
        await locationService.remove(id);
        storyBibleStore.setState({ locations: state.locations.filter((l) => l.id !== id) });
      },
    }),
    [state.locations]
  );
}
