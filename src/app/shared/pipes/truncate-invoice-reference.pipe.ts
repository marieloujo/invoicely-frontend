import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateInvoiceReference',
  standalone: true
})
export class TruncateInvoiceReferencePipe implements PipeTransform {

  transform(value: string): string {
    if (value.startsWith('INV-') && value.length > 7) {
      return value.slice(0, 10);
    }
    return value;
  }

}
