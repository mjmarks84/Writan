import React from 'react';

const colors: Record<string, string> = {
  friend: '#22c55e',
  enemy: '#ef4444',
  parent: '#3b82f6',
  spouse: '#a855f7',
  ally: '#14b8a6',
};

export function RelationshipTag({ type }: { type: string }) {
  const color = colors[type] ?? '#64748b';
  return (
    <span style={{ background: `${color}20`, color, borderRadius: 12, padding: '2px 8px', fontSize: 12 }}>{type}</span>
  );
}
