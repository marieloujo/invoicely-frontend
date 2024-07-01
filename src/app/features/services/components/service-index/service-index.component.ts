import { Component } from '@angular/core';
import { ServiceListComponent } from '../service-list/service-list.component';

@Component({
  selector: 'app-service-index',
  standalone: true,
  imports: [ServiceListComponent],
  templateUrl: './service-index.component.html'
})
export class ServiceIndexComponent {

}
