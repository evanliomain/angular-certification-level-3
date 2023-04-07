import { Component, Input, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Game, Stats, Team } from '../data.models';
import { NbaService } from '../nba.service';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css'],
})
export class TeamStatsComponent implements OnInit {
  @Input() team!: Team;

  protected games$!: Observable<Game[]>;

  protected stats!: Stats;

  constructor(private nbaService: NbaService) {}

  ngOnInit(): void {
    this.games$ = this.nbaService
      .getLastResults(this.team, 12)
      .pipe(
        tap(
          games =>
            (this.stats = this.nbaService.getStatsFromGames(games, this.team))
        )
      );
  }

  protected remove(): void {
    this.nbaService.removeTrackedTeam(this.team);
  }
}
