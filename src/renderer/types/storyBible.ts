export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  notes: string;
  tags: string[];
}

export interface LocationNote {
  id: string;
  name: string;
  description: string;
}

export interface PlotPoint {
  id: string;
  title: string;
  beat: string;
}

export interface StoryBibleModel {
  characters: CharacterProfile[];
  locations: LocationNote[];
  plotOutline: PlotPoint[];
  timeline: PlotPoint[];
}
