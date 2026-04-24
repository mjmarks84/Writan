import type { MarketplacePlugin } from '../../services/pluginService';
import { PluginCard } from './PluginCard';

export const PluginMarketplace = ({ plugins, onInstall }: { plugins: MarketplacePlugin[]; onInstall: (id: string) => void }) => (
  <section style={{ display: 'grid', gap: 12 }}>
    {plugins.map((plugin) => (
      <PluginCard key={plugin.id} plugin={plugin} onInstall={onInstall} />
    ))}
  </section>
);
