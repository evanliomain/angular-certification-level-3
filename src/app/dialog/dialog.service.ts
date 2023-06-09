import {
  Injectable,
  Renderer2,
  RendererFactory2,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject, delay, tap } from 'rxjs';
import { DialogComponent } from './dialog-component.interface';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private viewContainerRef!: ViewContainerRef;
  private renderer: Renderer2;

  public setViewContainerRef(vcr: ViewContainerRef) {
    this.viewContainerRef = vcr;
  }

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Opens a dialog box containing the given component.
   *
   * @param componentClass Type of the component to load into the dialog.
   * @param options Extra configuration options.
   * @returns An observable bind to the close observable output
   */
  open<T extends DialogComponent>(
    componentClass: Type<T>,
    options: { data?: Record<string, string> }
  ): Observable<boolean> {
    const dialogReturn = new Subject<boolean>();

    const componentRef = this.viewContainerRef.createComponent(componentClass);

    const dialog = this.renderer.createElement('div');
    this.renderer.addClass(dialog, 'dialog');

    const dialogContent = this.renderer.createElement('div');
    this.renderer.addClass(dialogContent, 'dialog-content');
    this.renderer.appendChild(dialog, dialogContent);

    this.renderer.appendChild(
      dialogContent,
      componentRef.location.nativeElement
    );

    // Add input to the component
    Object.entries(options?.data ?? {}).forEach(([key, value]) => {
      (componentRef.instance as any)[key] = value;
    });

    // React to the close output, defined by DialogComponent interface
    const closeSubscription = componentRef.instance.close
      .pipe(
        tap(() => {
          this.renderer.addClass(dialog, 'dialog-fadeout');
        })
    )
      .pipe(delay(300))
      .pipe(
        tap(() => {
          this.renderer.removeChild(document.body, dialog);
          componentRef.destroy();
        })
      )
      .pipe(tap(result => dialogReturn.next(result)))
      .subscribe();

    this.renderer.appendChild(document.body, dialog);

    return dialogReturn.asObservable().pipe(
      tap(() => {
        closeSubscription.unsubscribe();
      })
    );
  }
}
