import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '@app/shared/models/invoice.model';
import { Store } from '@ngrx/store';
import { selectInvoiceError, selectLoading, selectSelectedInvoice } from '../../store/invoice.selectors';
import { findInvoiceByIdStart } from '../../store/invoice.actions';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';
import { CustomDatePipe } from '../../../../shared/pipes/custom-date.pipe';
import { CurrencyXofPipe } from '@app/shared/pipes/currency-xof.pipe';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [NgIf, AsyncPipe, CustomDatePipe, CurrencyXofPipe, NgFor],
  templateUrl: './invoice-detail.component.html'
})
export class InvoiceDetailComponent {
  invoice$: Observable<Invoice | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  invoiceId: string | null = null;
  invoice: Invoice | null = null;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.invoice$ = this.store.select(selectSelectedInvoice);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectInvoiceError);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.invoiceId = params.get('id');
      this.findInvoiceById();
    });

  }

  findInvoiceById() {
    if (this.invoiceId) {
      this.store.dispatch(findInvoiceByIdStart({ id: this.invoiceId }));
    }
  }

  getTaxeAmount(amount: number): number {
    return amount * 0.18;
  }

}
