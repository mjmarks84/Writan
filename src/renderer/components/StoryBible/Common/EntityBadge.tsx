import React from 'react';

export function EntityBadge({ label, color = '#374151' }: { label: string; color?: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 12,
        background: `${color}20`,
        color,
        fontSize: 12,
      }}
    >
      {label}
    </span>
  );
}
