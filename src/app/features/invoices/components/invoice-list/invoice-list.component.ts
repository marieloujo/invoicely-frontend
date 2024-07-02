import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Invoice } from '@app/shared/models/invoice.model';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectAllInvoices, selectCurrentPage, selectTotalPages } from '../../store/invoice.selectors';
import { loadInvoices, updateInvoice } from '../../store/invoice.actions';
import { TruncateInvoiceReferencePipe } from '@app/shared/pipes/truncate-invoice-reference.pipe';
import { CurrencyXofPipe } from '@app/shared/pipes/currency-xof.pipe';
import { CustomDatePipe } from '@app/shared/pipes/custom-date.pipe';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '@app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [
    NgFor, NgIf,
    AsyncPipe, UpperCasePipe,
    TruncateInvoiceReferencePipe,
    CurrencyXofPipe,
    CustomDatePipe,
    TableComponent,
    ConfirmModalComponent,
    PaginationComponent
  ],
  templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent {
  private subscription: Subscription = new Subscription;

  @Input() withPagination = false;

  invoices$: Observable<Invoice[]>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;

  currentPage: number = 1;
  totalPages: number = 1;

  invoiceToUpdate: Invoice | null = null;

  constructor(private store: Store, private router: Router) {
    this.invoices$ = this.store.select(selectAllInvoices);
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.totalPages$ = this.store.select(selectTotalPages);
  }

  ngOnInit(): void {
    this.loadInvoices(1);
    this.subscription = this.currentPage$.subscribe(page => {
      this.currentPage = page;
    });
    this.subscription = this.totalPages$.subscribe(page => {
      this.totalPages = page;
    });
  }

  loadInvoices(page: number): void {
    this.store.dispatch(loadInvoices({ page }));
  }

  goToPage(page: number): void {
    this.loadInvoices(page);
  }

  goToInvoiceDetail(invoiceId: string): void {
    this.router.navigate(['/app/factures', invoiceId]);
  }

  confirmUpdate(invoice: Invoice): void {
    this.invoiceToUpdate = invoice;
  }

  onUpdateConfirmed(confirm: boolean): void {
    if (confirm && this.invoiceToUpdate) {
      this.store.dispatch(updateInvoice({ invoice: this.invoiceToUpdate }));
    }
  }

}
