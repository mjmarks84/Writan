import React from 'react';

export function QuickReferenceCard({ title, subtitle, description, imageUrl }: { title: string; subtitle?: string; description?: string; imageUrl?: string }) {
  return (
    <div style={{ border: '1px solid #334155', borderRadius: 8, padding: 12, background: '#0f172a' }}>
      <strong>{title}</strong>
      {subtitle ? <div style={{ opacity: 0.8 }}>{subtitle}</div> : null}
      {imageUrl ? <img src={imageUrl} alt={title} style={{ width: '100%', borderRadius: 6, marginTop: 8 }} /> : null}
      {description ? <p style={{ marginTop: 8 }}>{description}</p> : null}
    </div>
  );
}
