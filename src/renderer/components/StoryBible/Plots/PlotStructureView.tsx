import React from 'react';
import type { PlotPoint } from '../../../types/storyBible';

const actForType = (plotType?: string): 'Act I' | 'Act II' | 'Act III' => {
  if (plotType === 'inciting_incident') return 'Act I';
  if (plotType === 'climax' || plotType === 'resolution') return 'Act III';
  return 'Act II';
};

export function PlotStructureView({ plotPoints }: { plotPoints: PlotPoint[] }) {
  const grouped = plotPoints.reduce<Record<string, PlotPoint[]>>((acc, plotPoint) => {
    const act = actForType(plotPoint.plotType);
    acc[act] = [...(acc[act] || []), plotPoint];
    return acc;
  }, {});

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {['Act I', 'Act II', 'Act III'].map((act) => (
        <section key={act} style={{ border: '1px solid #334155', borderRadius: 8, padding: 8 }}>
          <h4>{act}</h4>
          <ul>
            {(grouped[act] || []).map((point) => (
              <li key={point.id}>{point.title}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
