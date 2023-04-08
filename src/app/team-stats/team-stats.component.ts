import { Component, Input, inject } from '@angular/core';
import { Observable, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { Stats, Team } from '../data.models';
import { NbaService } from '../nba.service';
import { skipNill } from '../operator';
import { NB_DAYS, TRACKED_TEAMS } from '../store';
import { getStatsFromGames } from '../utils';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css'],
})
export class TeamStatsComponent {
  private trackedTeams = inject(TRACKED_TEAMS);
  private nbDaysStore = inject(NB_DAYS);
  private nbaService = inject(NbaService);

  protected nbDays$ = this.nbDaysStore.value$;

  protected statsLoaded = false;

  @Input() team!: Team;

  protected stats$: Observable<Stats> = this.nbDaysStore.value$
    .pipe(skipNill())
    .pipe(distinctUntilChanged())
    .pipe(tap(() => (this.statsLoaded = false)))
    .pipe(
      switchMap(nbDays =>
        this.nbaService
          .getLastResults(this.team, nbDays)
          .pipe(map(getStatsFromGames(this.team)))
          .pipe(tap(() => (this.statsLoaded = true)))
      )
    );

  protected remove(): void {
    this.trackedTeams.remove(this.team.abbreviation);
  }
}
