import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, DatePipe],
  templateUrl: './auth.component.html',
  styles: ''
})
export class AuthComponent {
  currentDate = new Date()
}
