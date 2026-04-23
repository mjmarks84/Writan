import React from 'react';

interface StoryBibleProps {
  entries: string[];
}

export const StoryBible = ({ entries }: StoryBibleProps) => {
  return (
    <section aria-label="story-bible">
      <h2>Story Bible</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
    </section>
  );
};
