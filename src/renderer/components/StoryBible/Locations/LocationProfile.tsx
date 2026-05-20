import React from 'react';
import type { Location } from '../../../types/storyBible';
import { LocationForm } from './LocationForm';
import { LocationMapView } from './LocationMapView';

export function LocationProfile({
  location,
  allLocations,
  onChange,
  onSave,
}: {
  location: Location;
  allLocations: Location[];
  onChange: (next: Location) => void;
  onSave: () => void;
}) {
  return (
    <section>
      <h3>{location.name || 'New Location'}</h3>
      <LocationForm value={location} onChange={onChange} />
      <button onClick={onSave} disabled={!location.name.trim()}>Save Location</button>
      <LocationMapView locations={allLocations} />
    </section>
  );
}
