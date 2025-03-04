import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
  @Output() confirmed = new EventEmitter<boolean>();
  @Input() name: string = '';
  @Input() deleteMode: boolean = true;
  @Input() title: string | null = null;
  @Input() description: string | null = null;

  constructor() { }

  confirm(): void {
    this.confirmed.emit(true);
  }

  cancel(): void {
    this.confirmed.emit(false);
  }
}
