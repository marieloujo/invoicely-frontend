import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slug',
  standalone: true
})
export class SlugPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return value
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
