import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  combineLatest,
  map,
  shareReplay,
  startWith,
  tap,
} from 'rxjs';
import { Division, Team } from '../data.models';
import { CONFERENCES } from '../data/conferences';
import { DIVISIONS } from '../data/divisions';
import { NbaService } from '../nba.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css'],
})
export class GameStatsComponent {
  private nbaService = inject(NbaService);

  private teams$ = this.nbaService
    .getAllTeams()
    .pipe(tap(data => (this.allTeams = data)));

  protected trackedTeams = this.nbaService.getTrackedTeams();

  protected conferences = CONFERENCES;

  protected conferenceControl = new FormControl('');
  protected divisionControl = new FormControl('');

  protected defaultNbDay = this.nbaService.nbDays;
  protected days = [6, 12, 20, 50, 100];
  protected nbDaysControl = new FormControl(this.defaultNbDay);

  private allTeams: Team[] = [];

  protected filterTeams$: Observable<Team[]> = combineLatest([
    this.teams$.pipe(shareReplay()),
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

  protected trackTeam(teamId: string): void {
    let team = this.allTeams.find(team => team.id == Number(teamId));
    if (team) {
      this.nbaService.addTrackedTeam(team);
    }
  }

  protected trackById<T extends { id: number }>(
    index: number,
    item: T
  ): number {
    return item.id;
  }
}
