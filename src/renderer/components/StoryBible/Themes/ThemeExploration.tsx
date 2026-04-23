import React from 'react';
import type { Theme } from '../../../types/storyBible';

export function ThemeExploration({ theme }: { theme: Theme }) {
  return (
    <div style={{ marginTop: 12 }}>
      <h4>Theme Exploration</h4>
      <p>{theme.thematicElements || 'Define thematic questions and narrative representation.'}</p>
    </div>
  );
}
