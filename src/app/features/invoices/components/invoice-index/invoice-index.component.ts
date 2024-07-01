import { Component } from '@angular/core';
import { InvoiceListComponent } from '../invoice-list/invoice-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-index',
  standalone: true,
  imports: [InvoiceListComponent, RouterLink],
  templateUrl: './invoice-index.component.html'
})
export class InvoiceIndexComponent {

}
