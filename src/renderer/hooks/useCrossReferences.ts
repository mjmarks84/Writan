import { useMemo } from 'react';
import type { CrossReference } from '../types/storyBible';
import { crossReferenceService } from '../services/crossReferenceService';
import { storyBibleStore } from '../store/storyBibleStore';
import { useStoryBible } from './useStoryBible';

export function useCrossReferences(projectId: string) {
  const state = useStoryBible(projectId);

  return useMemo(
    () => ({
      crossReferences: state.crossReferences,
      forEntity: (entityId: string) =>
        state.crossReferences.filter((ref) => ref.sourceId === entityId || ref.targetId === entityId),
      save: async (crossReference: CrossReference) => {
        const saved = await crossReferenceService.save(crossReference);
        storyBibleStore.updateCrossReference(saved);
        return saved;
      },
    }),
    [state.crossReferences]
  );
}
