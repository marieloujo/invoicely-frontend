import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from './invoice.actions';
import { Invoice } from '@app/shared/models/invoice.model';

export interface InvoiceState {
  invoices: Invoice[];
  invoice: Invoice | null;
  currentPage: number;
  totalPages: number;
  error: any;
  loading: boolean;
}

export const initialState: InvoiceState = {
  invoices: [],
  invoice: null,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null
};

export const invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.loadInvoicesSuccess, (state, { invoices, currentPage, totalPages }) => ({
    ...state,
    invoices,
    currentPage,
    totalPages
  })),
  on(InvoiceActions.loadInvoicesFailure, (state, { error }) => ({ ...state, error })),
  on(InvoiceActions.addInvoiceSuccess, (state, { invoice }) => ({
    ...state,
    invoices: [...state.invoices, invoice],
    error: null,
    loading: false,
  })),
  on(InvoiceActions.addInvoiceFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(InvoiceActions.findInvoiceByIdStart, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InvoiceActions.findInvoiceByIdSuccess, (state, { invoice }) => ({
    ...state,
    invoice: invoice,
    loading: false,
  })),
  on(InvoiceActions.findInvoiceByIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(InvoiceActions.showLoader, state => ({
    ...state,
    loading: true
  })),

  on(InvoiceActions.hideLoader, state => ({
    ...state,
    loading: false
  })),
);