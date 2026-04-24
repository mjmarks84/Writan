import { useMemo, useState } from 'react';
import { PageHeader } from '../components/Common/PageHeader';
import { PluginMarketplace } from '../components/Plugins/PluginMarketplace';
import { InstalledPlugins } from '../components/Plugins/InstalledPlugins';

export const PluginsPage = () => {
  const [installed, setInstalled] = useState<string[]>([]);
  const plugins = useMemo(
    () => [
      { id: 'markdown-export', name: 'Markdown Export', author: 'Writan Labs', rating: 4.8, downloads: 1024 },
      { id: 'character-links', name: 'Character Relationship Exporter', author: 'Writan Labs', rating: 4.6, downloads: 876 }
    ],
    []
  );

  const install = (id: string) => setInstalled((current) => (current.includes(id) ? current : [...current, id]));

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 24, display: 'grid', gap: 16 }}>
      <PageHeader title="Plugins" subtitle="Install and manage plugin extensions" />
      <PluginMarketplace plugins={plugins} onInstall={install} />
      <InstalledPlugins pluginIds={installed} />
    </main>
  );
};
