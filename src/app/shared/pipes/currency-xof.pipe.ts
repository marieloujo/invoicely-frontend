import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xof',
  standalone: true
})
export class CurrencyXofPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || isNaN(value)) {
      return '';
    }

    const formattedNumber = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    return `${formattedNumber}`.replace('F CFA', '');
  }
}
