import React from 'react';
import type { TimelineEvent } from '../../../types/storyBible';

export function TimelineBranch({ events }: { events: TimelineEvent[] }) {
  const branchGroups = events.reduce<Record<string, TimelineEvent[]>>((acc, event) => {
    const key = event.branchId || 'main';
    acc[key] = [...(acc[key] || []), event];
    return acc;
  }, {});

  return (
    <div>
      <h4>Timeline Branches</h4>
      {Object.entries(branchGroups).map(([branch, branchEvents]) => (
        <section key={branch}>
          <strong>{branch}</strong>
          <ul>
            {branchEvents.map((event) => (
              <li key={event.id}>{event.title}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
