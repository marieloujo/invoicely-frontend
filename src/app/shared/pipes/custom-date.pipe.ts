import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: string | null): string | null {
    if (!value) return null;

    const parts = value.split('/');
    const date = new Date(+parts[2], +parts[1] - 1, +parts[0]);

    return this.datePipe.transform(date, 'dd MMM, yyyy');
  }

}
