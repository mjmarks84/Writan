import { useMemo } from 'react';
import type { TimelineEvent } from '../types/storyBible';
import { storyBibleStore } from '../store/storyBibleStore';
import { timelineService } from '../services/timelineService';
import { useStoryBible } from './useStoryBible';

export function useTimeline(projectId: string) {
  const state = useStoryBible(projectId);

  return useMemo(
    () => ({
      timelineEvents: [...state.timelineEvents].sort((a, b) => (a.eventDate || '').localeCompare(b.eventDate || '')),
      saveTimelineEvent: async (event: TimelineEvent) => {
        const saved = await timelineService.save(event);
        storyBibleStore.updateTimelineEvent(saved);
        return saved;
      },
      deleteTimelineEvent: async (id: string) => {
        await timelineService.remove(id);
        storyBibleStore.setState({ timelineEvents: state.timelineEvents.filter((e) => e.id !== id) });
      },
    }),
    [state.timelineEvents]
  );
}
