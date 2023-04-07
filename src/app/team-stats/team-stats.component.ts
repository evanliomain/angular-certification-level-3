import { Component, Input, OnInit } from '@angular/core';
import { Observable, ReplaySubject, map, switchMap, tap } from 'rxjs';
import { Game, Stats, Team } from '../data.models';
import { NbaService } from '../nba.service';
import { skipNill } from '../operator';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css'],
})
export class TeamStatsComponent implements OnInit {
  private nbDays$ = new ReplaySubject<number>();

  protected numberOfDays!: number;

  protected statsLoaded = false;

  @Input() team!: Team;

  @Input() set nbDays(n: number) {
    this.nbDays$.next(n);
    this.numberOfDays = n;
  }

  protected stats$!: Observable<Stats>;

  constructor(private nbaService: NbaService) {}

  ngOnInit(): void {
    this.stats$ = this.nbDays$
      .pipe(skipNill())
      .pipe(tap(() => (this.statsLoaded = false)))
      .pipe(
        switchMap(nbDays =>
          this.nbaService
            .getLastResults(this.team, nbDays)
            .pipe(
              map(games => this.nbaService.getStatsFromGames(games, this.team))
            )
            .pipe(tap(() => (this.statsLoaded = true)))
        )
      );
  }

  protected remove(): void {
    this.nbaService.removeTrackedTeam(this.team);
  }
}
