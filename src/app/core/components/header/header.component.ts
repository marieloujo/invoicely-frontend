import { Component, Input } from '@angular/core';
import { User } from '@app/shared/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styles: ''
})
export class HeaderComponent {
  @Input() username!: string;
}
