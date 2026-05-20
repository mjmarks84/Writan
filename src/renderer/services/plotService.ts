import type { PlotPoint } from '../types/storyBible';
import { invokeStoryBible } from './storyBibleApi';

export const plotService = {
  list: (projectId: string) => invokeStoryBible<PlotPoint[]>('storyBible:plotPoints:list', projectId),
  save: (plotPoint: PlotPoint) => invokeStoryBible<PlotPoint>('storyBible:plotPoints:save', plotPoint),
  remove: (id: string) => invokeStoryBible<boolean>('storyBible:plotPoints:delete', id),
};
