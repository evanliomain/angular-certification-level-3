import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format, subDays } from 'date-fns';
import { Observable, map } from 'rxjs';
import { Game, Stats, Team } from './data.models';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  private headers = {
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
  };
  private API_URL = 'https://free-nba.p.rapidapi.com';
  trackedTeams: Team[] = [];

  constructor(private http: HttpClient) {}

  public addTrackedTeam(team: Team): void {
    if (this.trackedTeams.some(t => t.id == team.id)) {
      return;
    }
    this.trackedTeams.push(team);
  }

  public removeTrackedTeam(team: Team): void {
    let index = this.trackedTeams.findIndex(t => t.id == team.id);
    this.trackedTeams.splice(index, 1);
  }

  public getTrackedTeams(): Team[] {
    return this.trackedTeams;
  }

  public getAllTeams(): Observable<Team[]> {
    return this.http
      .get<{ data: Team[] }>(`${this.API_URL}/teams?page=0`, {
        headers: this.headers,
      })
      .pipe(map(res => res.data));
  }

  public getLastResults(team: Team, numberOfDays = 12): Observable<Game[]> {
    return this.http
      .get<{ meta: any; data: Game[] }>(
        `${this.API_URL}/games?page=0${this.getDaysQueryString(numberOfDays)}`,
        {
          headers: this.headers,
          params: { per_page: numberOfDays, 'team_ids[]': '' + team.id },
        }
      )
      .pipe(map(res => res.data));
  }

  public getStatsFromGames(games: Game[], team: Team): Stats {
    const stats: Stats = {
      wins: 0,
      losses: 0,
      averagePointsScored: 0,
      averagePointsConceded: 0,
      lastGames: [],
    };
    games.forEach(game => {
      const gameStats = this.getSingleGameStats(team, game);
      stats.wins += gameStats.wins;
      stats.losses += gameStats.losses;
      stats.averagePointsConceded += gameStats.averagePointsConceded;
      stats.averagePointsScored += gameStats.averagePointsScored;
      stats.lastGames.push(gameStats.wins == 1 ? 'W' : 'L');
    });
    stats.averagePointsScored = Math.round(
      stats.averagePointsScored / games.length
    );
    stats.averagePointsConceded = Math.round(
      stats.averagePointsConceded / games.length
    );
    return stats;
  }

  private getDaysQueryString(nbOfDays = 12): string {
    let qs = '';
    for (let i = 1; i < nbOfDays; i++) {
      let date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      qs = qs.concat('&dates[]=' + date);
    }
    return qs;
  }

  private getSingleGameStats(team: Team, game: Game): Stats {
    const stats: Stats = {
      wins: 0,
      losses: 0,
      averagePointsScored: 0,
      averagePointsConceded: 0,
      lastGames: [],
    };
    if (game.home_team.id === team.id) {
      stats.averagePointsScored = game.home_team_score;
      stats.averagePointsConceded = game.visitor_team_score;
      if (game.home_team_score > game.visitor_team_score) {
        stats.wins += 1;
      } else {
        stats.losses += 1;
      }
    }
    if (game.visitor_team.id === team.id) {
      stats.averagePointsScored = game.visitor_team_score;
      stats.averagePointsConceded = game.home_team_score;
      if (game.visitor_team_score > game.home_team_score) {
        stats.wins = 1;
      } else {
        stats.losses = 1;
      }
    }
    return stats;
  }
}
