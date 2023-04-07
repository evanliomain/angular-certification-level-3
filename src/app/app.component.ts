import { Component, ViewContainerRef } from '@angular/core';
import { DialogService } from './dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    viewContainerRef: ViewContainerRef,
    dialogService: DialogService
  ) {
    // Didn't figure out how to inject the ViewContainerRef to a service
    // Found this solution here: https://github.com/NativeScript/nativescript-angular/issues/2334#issuecomment-913238273
    dialogService.setViewContainerRef(viewContainerRef);
  }
}
