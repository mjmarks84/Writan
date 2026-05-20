import React from 'react';
import { storyBibleExportService, type StoryBibleExportPayload } from '../../../services/storyBibleExportService';

export function DataExportDialog({ payload }: { payload: StoryBibleExportPayload }) {
  const download = (content: string, fileName: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button onClick={() => download(storyBibleExportService.toCSV(payload), 'story-bible.csv', 'text/csv')}>Export CSV</button>
      <button onClick={() => download(storyBibleExportService.toHTML(payload), 'story-bible.html', 'text/html')}>Export HTML</button>
    </div>
  );
}
