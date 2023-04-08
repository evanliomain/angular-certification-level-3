import { Injectable, inject } from '@angular/core';
import { Observable, ReplaySubject, combineLatest, map } from 'rxjs';
import { Team } from '../data.models';
import { TRACKED_TEAMS } from './token';

@Injectable({
  providedIn: 'root',
})
export class AllTeamsStore {
  private trackedTeamsStore = inject(TRACKED_TEAMS);

  private allTeamsRecord$: ReplaySubject<Record<string, Team>> =
    new ReplaySubject();

  public get value$(): Observable<Team[]> {
    return this.allTeamsRecord$
      .asObservable()
      .pipe(map(teams => Object.values(teams)));
  }

  public set value(items: Team[]) {
    this.allTeamsRecord$.next(
      Object.fromEntries(
        Object.values(items).map(team => [team.abbreviation, team])
      )
    );
  }

  public byAbbreviation(abbreviation: string): Observable<Team | undefined> {
    return this.value$.pipe(
      map(teams => teams.find(team => team.abbreviation === abbreviation))
    );
  }

  public get tracked$(): Observable<Team[]> {
    return combineLatest([
      this.allTeamsRecord$,
      this.trackedTeamsStore.value$,
    ]).pipe(
      map(([teams, trackedTeamsAbbr]) =>
        trackedTeamsAbbr.map(abbr => teams[abbr])
      )
    );
  }
}
