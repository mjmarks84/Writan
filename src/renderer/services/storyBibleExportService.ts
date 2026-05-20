import type { Character, Location, PlotPoint, Theme, TimelineEvent } from '../types/storyBible';

export interface StoryBibleExportPayload {
  projectId: string;
  characters: Character[];
  locations: Location[];
  plotPoints: PlotPoint[];
  timelineEvents: TimelineEvent[];
  themes: Theme[];
}

const escapeHTML = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

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
          .map((value) => {
            const escaped = String(value).replaceAll('"', '""');
            return `"${escaped}"`;
          })
          .join(',')
      )
      .join('\n');
  },

  toHTML(payload: StoryBibleExportPayload): string {
    const section = (title: string, items: string[]) => `\n<section><h2>${title}</h2><ul>${items.join('')}</ul></section>`;
    return `<!doctype html><html><head><meta charset="utf-8"><title>Story Bible Export</title></head><body>
      <h1>Story Bible</h1>
      ${section(
        'Characters',
        payload.characters.map((c) => `<li><strong>${escapeHTML(c.name)}</strong> — ${escapeHTML(c.role || '')}</li>`)
      )}
      ${section('Locations', payload.locations.map((l) => `<li><strong>${escapeHTML(l.name)}</strong> — ${escapeHTML(l.type || '')}</li>`))}
      ${section('Plot Points', payload.plotPoints.map((p) => `<li><strong>${escapeHTML(p.title)}</strong></li>`))}
      ${section(
        'Timeline Events',
        payload.timelineEvents.map((e) => `<li><strong>${escapeHTML(e.title)}</strong> — ${escapeHTML(e.eventDate || '')}</li>`)
      )}
      ${section('Themes', payload.themes.map((t) => `<li><strong>${escapeHTML(t.name)}</strong></li>`))}
    </body></html>`;
  },
};
