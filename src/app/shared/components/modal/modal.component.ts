import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() title: string = ''
  @Input() center: string = ''
  @Input() modalId: string = ''
}
