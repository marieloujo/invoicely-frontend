import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
  @Output() confirmed = new EventEmitter<boolean>();
  @Input() name: string = '';

  constructor() { }

  confirm(): void {
    this.confirmed.emit(true);
  }

  cancel(): void {
    this.confirmed.emit(false);
  }
}
