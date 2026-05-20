import React from 'react';
import type { Theme } from '../../../types/storyBible';
import { ThemeExploration } from './ThemeExploration';
import { ThemeForm } from './ThemeForm';

export function ThemeEditor({
  theme,
  onChange,
  onSave,
}: {
  theme: Theme;
  onChange: (next: Theme) => void;
  onSave: () => void;
}) {
  return (
    <section>
      <h3>{theme.name || 'New Theme'}</h3>
      <ThemeForm value={theme} onChange={onChange} />
      <button onClick={onSave} disabled={!theme.name.trim()}>Save Theme</button>
      <ThemeExploration theme={theme} />
    </section>
  );
}
