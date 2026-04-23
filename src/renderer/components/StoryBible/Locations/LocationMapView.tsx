import React from 'react';
import type { Location } from '../../../types/storyBible';

export function LocationMapView({ locations }: { locations: Location[] }) {
  return (
    <div>
      <h4>Map View</h4>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>{location.name} {location.mapUrl ? '📍' : ''}</li>
        ))}
      </ul>
    </div>
  );
}
