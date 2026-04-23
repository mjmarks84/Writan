import React from 'react';
import type { Character } from '../../../types/storyBible';

export function CharacterSheetExport({ character }: { character: Character }) {
  const content = [
    `Name: ${character.name}`,
    `Role: ${character.role || ''}`,
    `Archetype: ${character.archetype || ''}`,
    `Background: ${character.background || ''}`,
  ].join('\n');

  return (
    <button
      onClick={() => {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${character.name || 'character'}-sheet.txt`;
        link.click();
        URL.revokeObjectURL(url);
      }}
    >
      Export Character Sheet
    </button>
  );
}
