import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameResultsComponent } from './game-results/game-results.component';
import { GameStatsComponent } from './game-stats/game-stats.component';
import { TeamStatsComponent } from './team-stats/team-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamStatsComponent,
    GameResultsComponent,
    GameStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
