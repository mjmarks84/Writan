import React from 'react';

export function TimelineZoom({ zoom, onZoom }: { zoom: number; onZoom: (value: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span>Zoom</span>
      <input type="range" min={1} max={5} value={zoom} onChange={(e) => onZoom(Number(e.target.value))} />
      <span>{zoom}x</span>
    </div>
  );
}
