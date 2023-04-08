import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, switchMap, tap } from 'rxjs';
import { Game, Team } from '../data.models';
import { NbaService } from '../nba.service';
import { skipNill } from '../operator';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css'],
})
export class GameResultsComponent implements OnDestroy {
  private subscription!: Subscription;

  protected team?: Team;
  protected games$?: Observable<Game[]>;

  protected nbDays = this.nbaService.nbDays;

  constructor(
    private activatedRoute: ActivatedRoute,
    private nbaService: NbaService
  ) {
    this.subscription = this.activatedRoute.paramMap
      .pipe(map(paramMap => paramMap.get('teamAbbr')))
      .pipe(skipNill())
      .pipe(
        switchMap(teamAbbr => this.nbaService.getTeamByAbbreviation(teamAbbr))
      )
      .pipe(tap(team => (this.team = team)))
      .pipe(
        tap(team => {
          if (team) {
            this.games$ = this.nbaService.getLastResults(team);
          }
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected trackById(index: number, item: Game): number {
    return item.id;
  }
}
