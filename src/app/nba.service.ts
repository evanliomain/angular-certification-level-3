import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, take, tap } from 'rxjs';
import { ApiResult, Game, Team } from './data.models';
import { AllTeamsStore, NB_DAYS } from './store';
import { getDaysQueryString } from './utils';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  private headers = {
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
  };
  private API_URL = 'https://free-nba.p.rapidapi.com';

  private nbDaysStore = inject(NB_DAYS);
  private allTeamsStore = inject(AllTeamsStore);
  private http = inject(HttpClient);

  public initialize(): void {
    this.http
      .get<ApiResult<Team>>(`${this.API_URL}/teams?page=0`, {
        headers: this.headers,
      })
      .pipe(map(res => res.data))
      .pipe(tap(teams => (this.allTeamsStore.value = teams)))
      .pipe(take(1))
      .subscribe();
  }

  public getLastResults(
    team: Team,
    numberOfDays = this.nbDaysStore.value
  ): Observable<Game[]> {
    this.nbDaysStore.value = numberOfDays;

    return this.http
      .get<{ meta: any; data: Game[] }>(
        `${this.API_URL}/games?page=0${getDaysQueryString(
          numberOfDays ?? this.nbDaysStore.value
        )}`,
        {
          headers: this.headers,
          params: { per_page: numberOfDays, 'team_ids[]': '' + team.id },
        }
      )
      .pipe(map(res => res.data));
  }
}
