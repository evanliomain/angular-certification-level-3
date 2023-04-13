import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AnimationCardDirective } from './animation-card.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDirective } from './confirm';
import { DialogService } from './dialog';
import { GameResultsComponent } from './game-results/game-results.component';
import { GameStatsComponent } from './game-stats/game-stats.component';
import { LoaderComponent } from './loader';
import { StoreModule } from './store';
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
    ConfirmDirective,
    CommonModule,
    LoaderComponent,
    StoreModule,
    AnimationCardDirective,
  ],
  providers: [DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
