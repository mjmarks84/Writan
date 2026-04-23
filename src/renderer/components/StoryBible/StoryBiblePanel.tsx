import { CharacterProfiles } from './CharacterProfiles';
import { WorldBuilding } from './WorldBuilding';
import { PlotOutline } from './PlotOutline';

export function StoryBiblePanel() {
  return (
    <aside className="flex h-full flex-col gap-4 overflow-auto border-r border-slate-200 p-3 dark:border-slate-700">
      <h2 className="text-lg font-bold">Story Bible</h2>
      <CharacterProfiles />
      <WorldBuilding />
      <PlotOutline />
    </aside>
  );
}
