import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Game, Team } from '../data.models';
import { NbaService } from '../nba.service';
import { skipNill } from '../operator';
import { AllTeamsStore, NB_DAYS } from '../store';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css'],
})
export class GameResultsComponent {
  private nbDaysStore = inject(NB_DAYS);
  private allTeamsStore = inject(AllTeamsStore);
  private activatedRoute = inject(ActivatedRoute);
  private nbaService = inject(NbaService);

  protected team$: Observable<Team> = this.activatedRoute.paramMap
    .pipe(map(paramMap => paramMap.get('teamAbbr')))
    .pipe(skipNill())
    .pipe(switchMap(teamAbbr => this.allTeamsStore.byAbbreviation(teamAbbr)))
    .pipe(skipNill());

  protected games$?: Observable<Game[]> = this.team$.pipe(
    switchMap(team => this.nbaService.getLastResults(team))
  );

  protected nbDays = this.nbDaysStore.value;

  protected trackById(index: number, item: Game): number {
    return item.id;
  }
}
