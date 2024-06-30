import { Component } from '@angular/core';
import { ClientListComponent } from '../client-list/client-list.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [ClientListComponent],
  templateUrl: './client-index.component.html'
})
export class ClientIndexComponent {

}
