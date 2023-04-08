import { InjectionToken } from '@angular/core';
import { CollectionStore } from '../collection.store';

export const TRACKED_TEAMS = new InjectionToken<CollectionStore<string>>(
  'tracked-teams-store'
);
