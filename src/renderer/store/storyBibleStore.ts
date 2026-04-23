import type {
  Character,
  CharacterRelationship,
  CrossReference,
  Location,
  PlotPoint,
  StoryBibleState,
  StoryBibleTag,
  Theme,
  TimelineEvent,
} from '../types/storyBible';

const defaultState: StoryBibleState = {
  characters: [],
  relationships: [],
  locations: [],
  plotPoints: [],
  timelineEvents: [],
  themes: [],
  tags: [],
  crossReferences: [],
};

type Listener = (state: StoryBibleState) => void;

class StoryBibleStore {
  private state = defaultState;
  private listeners = new Set<Listener>();

  getState(): StoryBibleState {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  setState(partial: Partial<StoryBibleState>): void {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((listener) => listener(this.state));
  }

  updateCharacter(character: Character): void {
    this.setState({ characters: upsertById(this.state.characters, character) });
  }

  updateRelationship(relationship: CharacterRelationship): void {
    this.setState({ relationships: upsertById(this.state.relationships, relationship) });
  }

  updateLocation(location: Location): void {
    this.setState({ locations: upsertById(this.state.locations, location) });
  }

  updatePlotPoint(plotPoint: PlotPoint): void {
    this.setState({ plotPoints: upsertById(this.state.plotPoints, plotPoint) });
  }

  updateTimelineEvent(event: TimelineEvent): void {
    this.setState({ timelineEvents: upsertById(this.state.timelineEvents, event) });
  }

  updateTheme(theme: Theme): void {
    this.setState({ themes: upsertById(this.state.themes, theme) });
  }

  updateTag(tag: StoryBibleTag): void {
    this.setState({ tags: upsertById(this.state.tags, tag) });
  }

  updateCrossReference(crossReference: CrossReference): void {
    this.setState({ crossReferences: upsertById(this.state.crossReferences, crossReference) });
  }
}

function upsertById<T extends { id: string }>(list: T[], item: T): T[] {
  const index = list.findIndex((entry) => entry.id === item.id);
  if (index === -1) return [item, ...list];
  const next = [...list];
  next[index] = item;
  return next;
}

export const storyBibleStore = new StoryBibleStore();
