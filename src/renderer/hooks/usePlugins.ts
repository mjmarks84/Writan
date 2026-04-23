import { useMemo } from 'react';
import { sortPluginsByPopularity } from '../services/pluginService';
import type { MarketplacePlugin } from '../services/pluginService';

export const usePlugins = (plugins: MarketplacePlugin[]) => useMemo(() => sortPluginsByPopularity(plugins), [plugins]);
