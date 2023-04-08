import { NgModule } from '@angular/core';
import { provideCollectionStore } from './collection-store.provider';
import { NB_DAYS, TRACKED_TEAMS } from './token';
import { provideObjectStore } from './object-store.provider';
import { AllTeamsStore } from './all-teams.store';

@NgModule({
  providers: [
    AllTeamsStore,
    provideCollectionStore<string>(TRACKED_TEAMS, 'trackedTeamsAbbr'),
    provideObjectStore<number>(NB_DAYS, 'nbDays', 12),
  ],
})
export class StoreModule {}
