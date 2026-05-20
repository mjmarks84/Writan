import type { TimelineEvent } from '../types/storyBible';
import { invokeStoryBible } from './storyBibleApi';

export const timelineService = {
  list: (projectId: string) => invokeStoryBible<TimelineEvent[]>('storyBible:timelineEvents:list', projectId),
  save: (event: TimelineEvent) => invokeStoryBible<TimelineEvent>('storyBible:timelineEvents:save', event),
  remove: (id: string) => invokeStoryBible<boolean>('storyBible:timelineEvents:delete', id),
};
