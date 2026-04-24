import { useMemo, useState } from 'react';
import { AITabId } from '../../../shared/types';
import { BrainstormTab } from './Tabs/BrainstormTab';
import { SuggestionsTab } from './Tabs/SuggestionsTab';
import { PromptsTab } from './Tabs/PromptsTab';
import { PlotIdeasTab } from './Tabs/PlotIdeasTab';
import { CharacterVoiceTab } from './Tabs/CharacterVoiceTab';
import { SettingsTab } from './Tabs/SettingsTab';

const TABS: { id: AITabId; label: string }[] = [
  { id: 'brainstorm', label: 'Brainstorm' },
  { id: 'suggestions', label: 'Suggestions' },
  { id: 'prompts', label: 'Prompts' },
  { id: 'plot', label: 'Plot Ideas' },
  { id: 'character', label: 'Character Voice' },
  { id: 'settings', label: 'Settings' }
];

export function AIPanel() {
  const [activeTab, setActiveTab] = useState<AITabId>('brainstorm');

  const content = useMemo(() => {
    switch (activeTab) {
      case 'brainstorm':
        return <BrainstormTab />;
      case 'suggestions':
        return <SuggestionsTab />;
      case 'prompts':
        return <PromptsTab />;
      case 'plot':
        return <PlotIdeasTab />;
      case 'character':
        return <CharacterVoiceTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  }, [activeTab]);

  return (
    <aside
      aria-label="AI Assistant Panel"
      className="flex h-full flex-col gap-4 overflow-auto border-l border-slate-200 p-3 dark:border-slate-700"
    >
      <h2 className="text-lg font-bold">AI Assistant</h2>
      <nav aria-label="AI tabs" className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
            className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600"
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {content}
    </aside>
  );
}
