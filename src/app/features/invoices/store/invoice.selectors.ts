import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from './invoice.reducer';

export const selectInvoiceState = createFeatureSelector<InvoiceState>('invoices');

export const selectAllInvoices = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.invoices
);

export const selectSelectedInvoice = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.invoice
);

export const selectCurrentPage = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.totalPages
);

export const selectInvoiceError = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.error
);

export const selectLoading = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.loading
);