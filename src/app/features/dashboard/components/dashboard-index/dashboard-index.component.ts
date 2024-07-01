import { Component } from '@angular/core';
import { InvoiceListComponent } from '@app/features/invoices/components/invoice-list/invoice-list.component';
import { Statistic } from '@app/shared/models/statistic.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllStatistics } from '../../store/statistic.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { loadStatistics } from '../../store/statistic.actions';
import { CurrencyXofPipe } from '@app/shared/pipes/currency-xof.pipe';

@Component({
  selector: 'app-dashboard-index',
  standalone: true,
  imports: [InvoiceListComponent, NgIf, AsyncPipe, CurrencyXofPipe],
  templateUrl: './dashboard-index.component.html'
})
export class DashboardIndexComponent {

  statistic$: Observable<Statistic | null>;

  constructor(private store: Store) {
    this.statistic$ = this.store.select(selectAllStatistics);
  }

  ngOnInit(): void {
    this.store.dispatch(loadStatistics({ page: 1}));
  }

}
