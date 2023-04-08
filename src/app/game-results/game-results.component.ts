import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Game, Team } from '../data.models';
import { NbaService } from '../nba.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css'],
})
export class GameResultsComponent {
  protected team?: Team;
  protected games$?: Observable<Game[]>;

  protected nbDays = this.nbaService.nbDays;

  constructor(
    private activatedRoute: ActivatedRoute,
    private nbaService: NbaService
  ) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.team = this.nbaService
        .getTrackedTeams()
        .find(team => team.abbreviation === paramMap.get('teamAbbr'));
      if (this.team) {
        this.games$ = this.nbaService.getLastResults(this.team);
      }
    });
  }

  protected trackById(index: number, item: Game): number {
    return item.id;
  }
}
