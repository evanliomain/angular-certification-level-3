import { EventEmitter } from '@angular/core';

export interface DialogComponent {
  /**
   * Event to close the dialog
   * Emit true for confirmation, false to cancel any action
   */
  close: EventEmitter<boolean>;
}
