import type { Character, Location, PlotPoint, Theme, TimelineEvent } from '../types/storyBible';

export interface StoryBibleExportPayload {
  projectId: string;
  characters: Character[];
  locations: Location[];
  plotPoints: PlotPoint[];
  timelineEvents: TimelineEvent[];
  themes: Theme[];
}

export const storyBibleExportService = {
  toCSV(payload: StoryBibleExportPayload): string {
    const rows = [
      ['type', 'id', 'title', 'description'],
      ...payload.characters.map((c) => ['character', c.id, c.name, c.background || '']),
      ...payload.locations.map((l) => ['location', l.id, l.name, l.description || '']),
      ...payload.plotPoints.map((p) => ['plotPoint', p.id, p.title, p.description || '']),
      ...payload.timelineEvents.map((e) => ['timelineEvent', e.id, e.title, e.description || '']),
      ...payload.themes.map((t) => ['theme', t.id, t.name, t.description || '']),
    ];

    return rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(',')
      )
      .join('\n');
  },

  toHTML(payload: StoryBibleExportPayload): string {
    const section = (title: string, items: string[]) => `\n<section><h2>${title}</h2><ul>${items.join('')}</ul></section>`;
    return `<!doctype html><html><head><meta charset="utf-8"><title>Story Bible Export</title></head><body>
      <h1>Story Bible</h1>
      ${section('Characters', payload.characters.map((c) => `<li><strong>${c.name}</strong> — ${c.role || ''}</li>`))}
      ${section('Locations', payload.locations.map((l) => `<li><strong>${l.name}</strong> — ${l.type || ''}</li>`))}
      ${section('Plot Points', payload.plotPoints.map((p) => `<li><strong>${p.title}</strong></li>`))}
      ${section('Timeline Events', payload.timelineEvents.map((e) => `<li><strong>${e.title}</strong> — ${e.eventDate || ''}</li>`))}
      ${section('Themes', payload.themes.map((t) => `<li><strong>${t.name}</strong></li>`))}
    </body></html>`;
  },
};
