import React from 'react';
import type { PlotPoint } from '../../../types/storyBible';
import { PlotStructureView } from './PlotStructureView';

export function PlotOutline({
  plotPoints,
  onSelect,
  onCreate,
}: {
  plotPoints: PlotPoint[];
  onSelect: (plotPoint: PlotPoint) => void;
  onCreate: () => void;
}) {
  const ordered = [...plotPoints].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <h3>Plot Outline</h3>
        <button onClick={onCreate}>Add Plot Point</button>
      </div>
      <PlotStructureView plotPoints={ordered} />
      <ul>
        {ordered.map((plotPoint) => (
          <li key={plotPoint.id}>
            <button onClick={() => onSelect(plotPoint)}>{plotPoint.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
