import React from 'react';
import type { Location } from '../../../types/storyBible';
import { QuickReferenceCard } from '../Common/QuickReferenceCard';

export function LocationQuickCard({ location }: { location: Location }) {
  return (
    <QuickReferenceCard
      title={location.name}
      subtitle={[location.type, location.region].filter(Boolean).join(' • ')}
      description={location.description}
      imageUrl={location.imageUrl || location.mapUrl}
    />
  );
}
