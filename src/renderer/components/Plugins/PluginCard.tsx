import type { MarketplacePlugin } from '../../services/pluginService';
import { Button } from '../Design/Button';

export const PluginCard = ({ plugin, onInstall }: { plugin: MarketplacePlugin; onInstall: (id: string) => void }) => (
  <article className="card">
    <strong>{plugin.name}</strong>
    <p style={{ margin: '6px 0' }}>{plugin.author} · ⭐ {plugin.rating} · {plugin.downloads} downloads</p>
    <Button onClick={() => onInstall(plugin.id)}>Install</Button>
  </article>
);
