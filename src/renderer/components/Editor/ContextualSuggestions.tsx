import React from 'react';

export function ContextualSuggestions({ suggestions, onPick }: { suggestions: string[]; onPick: (value: string) => void }) {
  if (!suggestions.length) return null;

  return (
    <aside>
      <h4>Context-Aware Suggestions</h4>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion}>
            <button onClick={() => onPick(suggestion)}>{suggestion}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
