import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loader',
  template: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {}
