import { Component, ViewContainerRef } from '@angular/core';
import { DialogService } from './dialog';
import { NbaService } from './nba.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    viewContainerRef: ViewContainerRef,
    dialogService: DialogService,
    nbaService: NbaService
  ) {
    nbaService.initialize();

    // Didn't figure out how to inject the ViewContainerRef to a service
    // Found this solution here: https://github.com/NativeScript/nativescript-angular/issues/2334#issuecomment-913238273
    dialogService.setViewContainerRef(viewContainerRef);
  }
}
