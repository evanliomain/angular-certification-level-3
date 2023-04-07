import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DialogComponent } from '../dialog';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements DialogComponent {
  @Input() message!: string;

  @Input() abordLabel = 'No';

  @Input() confirmLabel = 'Yes';

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
}
