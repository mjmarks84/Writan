import { useMemo } from 'react';

export const useDocument = (id: string, title: string) => {
  return useMemo(
    () => ({
      id,
      title,
      slug: `${id}-${title.toLowerCase().replace(/\s+/g, '-')}`
    }),
    [id, title]
  );
};
