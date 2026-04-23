import React from 'react';
import type { CrossReference } from '../../../types/storyBible';

export function CrossReferencePanel({ references }: { references: CrossReference[] }) {
  return (
    <section>
      <h4>Cross References</h4>
      <ul>
        {references.map((reference) => (
          <li key={reference.id}>
            {reference.sourceType}:{reference.sourceId} → {reference.targetType}:{reference.targetId}
            {reference.context ? ` (${reference.context})` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}
