import React from 'react';

interface AIPanelProps {
  onGenerate: () => void;
}

export const AIPanel = ({ onGenerate }: AIPanelProps) => {
  return (
    <section aria-label="ai-panel">
      <h2>AI Assistant</h2>
      <button type="button" onClick={onGenerate}>
        Generate Suggestion
      </button>
    </section>
  );
};
