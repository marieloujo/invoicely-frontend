import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-button',
  standalone: true,
  imports: [],
  templateUrl: './form-button.component.html'
})
export class FormButtonComponent {
  @Input() title: string = '';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
}
