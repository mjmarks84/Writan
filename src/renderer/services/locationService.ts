import type { Location } from '../types/storyBible';
import { invokeStoryBible } from './storyBibleApi';

export const locationService = {
  list: (projectId: string) => invokeStoryBible<Location[]>('storyBible:locations:list', projectId),
  save: (location: Location) => invokeStoryBible<Location>('storyBible:locations:save', location),
  remove: (id: string) => invokeStoryBible<boolean>('storyBible:locations:delete', id),
};
