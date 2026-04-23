export type EntityType = 'character' | 'location' | 'plotPoint' | 'timelineEvent' | 'theme';

export interface BaseEntity {
  id: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export type CharacterStatus = 'alive' | 'dead' | 'unknown';

export interface Character extends BaseEntity {
  name: string;
  role?: string;
  archetype?: string;
  age?: number;
  gender?: string;
  occupation?: string;
  physicalDescription?: string;
  personality?: string;
  background?: string;
  motivations?: string;
  conflicts?: string;
  relationshipNotes?: string;
  imageUrl?: string;
  status?: CharacterStatus;
  notes?: string;
  customFields?: Record<string, string>;
}

export interface CharacterRelationship {
  id: string;
  projectId: string;
  character1Id: string;
  character2Id: string;
  relationshipType?: string;
  description?: string;
  isBidirectional?: boolean;
}

export interface Location extends BaseEntity {
  name: string;
  type?: string;
  region?: string;
  description?: string;
  climate?: string;
  geography?: string;
  culture?: string;
  population?: string;
  economy?: string;
  history?: string;
  imageUrl?: string;
  mapUrl?: string;
  isVisited?: boolean;
}

export type PlotType =
  | 'inciting_incident'
  | 'rising_action'
  | 'midpoint'
  | 'climax'
  | 'resolution'
  | 'subplot'
  | 'other';

export interface PlotPoint extends BaseEntity {
  title: string;
  description?: string;
  plotType?: PlotType;
  order?: number;
  importance?: number;
  connectedCharacters?: string[];
  connectedLocations?: string[];
  connectedThemes?: string[];
  timelinePosition?: string;
}

export type TimelineEventType = 'backstory' | 'present' | 'future' | 'prophecy' | 'alternate';

export interface TimelineEvent extends BaseEntity {
  title: string;
  description?: string;
  eventType?: TimelineEventType;
  eventDate?: string;
  order?: number;
  importance?: number;
  connectedCharacters?: string[];
  connectedLocations?: string[];
  connectedPlots?: string[];
  recurrencePattern?: string;
  branchId?: string;
}

export interface Theme extends BaseEntity {
  name: string;
  description?: string;
  thematicElements?: string;
  connectedCharacters?: string[];
  connectedPlotPoints?: string[];
  symbolism?: string;
  color?: string;
}

export interface StoryBibleTag {
  id: string;
  projectId: string;
  name: string;
  category?: string;
  color?: string;
  parentTagId?: string;
  createdAt: string;
}

export interface CrossReference {
  id: string;
  projectId: string;
  sourceId: string;
  sourceType: EntityType;
  targetId: string;
  targetType: EntityType;
  context?: string;
  createdAt: string;
}

export interface StoryBibleSearchResult {
  id: string;
  type: EntityType;
  title: string;
  subtitle?: string;
  preview?: string;
  tags?: string[];
}

export interface StoryBibleSearchFilters {
  types?: EntityType[];
  tags?: string[];
  query?: string;
}

export interface StoryBibleState {
  characters: Character[];
  relationships: CharacterRelationship[];
  locations: Location[];
  plotPoints: PlotPoint[];
  timelineEvents: TimelineEvent[];
  themes: Theme[];
  tags: StoryBibleTag[];
  crossReferences: CrossReference[];
}

export interface MentionToken {
  type: EntityType;
  name: string;
  raw: string;
  start: number;
  end: number;
}

export interface ValidationIssue {
  id: string;
  level: 'warning' | 'error';
  message: string;
  sourceType: EntityType;
  sourceId: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ProjectMetadata {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
