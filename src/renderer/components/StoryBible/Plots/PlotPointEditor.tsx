import React from 'react';
import type { PlotPoint } from '../../../types/storyBible';
import { PlotPointForm } from './PlotPointForm';

export function PlotPointEditor({
  plotPoint,
  onChange,
  onSave,
}: {
  plotPoint: PlotPoint;
  onChange: (next: PlotPoint) => void;
  onSave: () => void;
}) {
  return (
    <section>
      <h3>{plotPoint.title || 'New Plot Point'}</h3>
      <PlotPointForm value={plotPoint} onChange={onChange} />
      <button onClick={onSave} disabled={!plotPoint.title.trim()}>Save Plot Point</button>
    </section>
  );
}
