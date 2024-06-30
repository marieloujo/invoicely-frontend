import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() goToPageEvent = new EventEmitter<number>();

  isPreviousButtonDisabled(): boolean {
    return this.currentPage <= 1;
  }

  isNextButtonDisabled(): boolean {
    return this.currentPage >= this.totalPages;
  }

  getArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }

  goToPage(page: number) {
    this.goToPageEvent.emit(page);
  }

}
