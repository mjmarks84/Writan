export interface MarketplacePlugin {
  id: string;
  name: string;
  author: string;
  rating: number;
  downloads: number;
}

export const sortPluginsByPopularity = (plugins: MarketplacePlugin[]): MarketplacePlugin[] =>
  [...plugins].sort((a, b) => b.downloads - a.downloads || b.rating - a.rating);
