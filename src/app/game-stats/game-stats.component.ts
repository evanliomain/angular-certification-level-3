import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Team } from '../data.models';
import { NbaService } from '../nba.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css'],
})
export class GameStatsComponent {
  protected teams$: Observable<Team[]>;

  private allTeams: Team[] = [];

  constructor(protected nbaService: NbaService) {
    this.teams$ = nbaService
      .getAllTeams()
      .pipe(tap(data => (this.allTeams = data)));
  }

  protected trackTeam(teamId: string): void {
    let team = this.allTeams.find(team => team.id == Number(teamId));
    if (team) {
      this.nbaService.addTrackedTeam(team);
    }
  }

  protected trackById(index: number, item: Team): number {
    return item.id;
  }
}
