import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [],
  templateUrl: './auth-button.component.html',
  styles: ''
})
export class AuthButtonComponent {
  @Input() loading: boolean = false;
  @Input() name: string = '';
}
