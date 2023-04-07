import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogService } from '../dialog';
import { ConfirmationComponent } from './confirmation.component';

@Directive({
  standalone: true,
  selector: '[appConfirm]',
  exportAs: 'appConfirm',
})
export class ConfirmDirective implements OnDestroy {
  private dialogComponentSubscription!: Subscription;

  @Input() confirmMessage = '';

  @Input() confirmAbordLabel = 'No';

  @Input() confirmConfirmLabel = 'Yes';

  @Output('appConfirm') confirm = new EventEmitter<void>();

  @Output() abord = new EventEmitter<void>();

  constructor(private dialogService: DialogService) {}

  ngOnDestroy(): void {
    if (this.dialogComponentSubscription) {
      this.dialogComponentSubscription.unsubscribe();
    }
  }

  @HostListener('click', ['$event'])
  public click(event: MouseEvent): void {
    event.stopPropagation();
    this.open();
  }

  public open(): void {
    this.dialogComponentSubscription = this.dialogService
      .open(ConfirmationComponent, {
        data: {
          message: this.confirmMessage,
          abordLabel: this.confirmAbordLabel,
          confirmLabel: this.confirmConfirmLabel,
        },
      })
      .pipe(tap(confirm => (confirm ? this.confirm.emit() : this.abord.emit())))
      .subscribe();
  }
}
