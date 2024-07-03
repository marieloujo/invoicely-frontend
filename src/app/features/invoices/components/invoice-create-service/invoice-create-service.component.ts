import { Component } from '@angular/core';
import { InvoiceCreateComponent } from '../invoice-create/invoice-create.component';
import { TypeFacturation } from '@app/shared/models/type-facturation';

@Component({
  selector: 'app-invoice-create-service',
  standalone: true,
  imports: [InvoiceCreateComponent],
  templateUrl: './invoice-create-service.component.html'
})
export class InvoiceCreateServiceComponent {
  type: TypeFacturation = TypeFacturation.SERVICE
}
