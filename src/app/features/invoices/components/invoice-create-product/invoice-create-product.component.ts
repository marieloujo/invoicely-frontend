import { Component } from '@angular/core';
import { InvoiceCreateComponent } from '../invoice-create/invoice-create.component';

@Component({
  selector: 'app-invoice-create-product',
  standalone: true,
  imports: [InvoiceCreateComponent],
  templateUrl: './invoice-create-product.component.html'
})
export class InvoiceCreateProductComponent {

}
