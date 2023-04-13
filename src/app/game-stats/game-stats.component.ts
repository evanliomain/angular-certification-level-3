import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  Subscription,
  combineLatest,
  map,
  startWith,
  tap,
} from 'rxjs';
import { Division, Team } from '../data.models';
import { CONFERENCES } from '../data/conferences';
import { DIVISIONS } from '../data/divisions';
import { skipNill } from '../operator';
import { AllTeamsStore, NB_DAYS, TRACKED_TEAMS } from '../store';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css'],
})
export class GameStatsComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  private trackedTeams = inject(TRACKED_TEAMS);
  private nbDaysStore = inject(NB_DAYS);
  private allTeamsStore = inject(AllTeamsStore);

  private teams$ = this.allTeamsStore.value$;

  protected trackedTeams$ = this.allTeamsStore.tracked$;

  protected conferences = CONFERENCES;

  protected conferenceControl = new FormControl('');
  protected divisionControl = new FormControl('');

  protected defaultNbDay = this.nbDaysStore.value;
  protected days = [6, 12, 20];
  protected nbDaysControl = new FormControl(this.defaultNbDay);

  protected filterTeams$: Observable<Team[]> = combineLatest([
    this.teams$,
    this.conferenceControl.valueChanges.pipe(startWith('')),
    this.divisionControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([teams, conference, division]) => {
      let filterTeams = [...teams];
      if ('' !== conference) {
        filterTeams = filterTeams.filter(
          team => team.conference === conference
        );
      }
      if ('' !== division) {
        filterTeams = filterTeams.filter(team => team.division === division);
      }

      return filterTeams;
    })
  );

  protected filterDivisions$: Observable<Division[]> =
    this.conferenceControl.valueChanges.pipe(startWith('')).pipe(
      map(conference => {
        let filterDivisions = [...DIVISIONS];
        if ('' !== conference) {
          filterDivisions = filterDivisions.filter(
            division => division.conference === conference
          );
        }

        return filterDivisions;
      })
    );

  ngOnInit(): void {
    this.subscription = this.nbDaysControl.valueChanges
      .pipe(skipNill())
      .pipe(tap(value => (this.nbDaysStore.value = value)))
      .subscribe();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected trackTeam(teamAbbr: string): void {
    if ('' === teamAbbr) {
      return;
    }
    this.trackedTeams.add(teamAbbr);
  }

  protected trackById<T extends { id: number }>(
    index: number,
    item: T
  ): number {
    return item?.id;
  }
}
