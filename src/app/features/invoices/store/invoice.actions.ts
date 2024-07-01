import { Invoice } from '@app/shared/models/invoice.model';
import { createAction, props } from '@ngrx/store';

export const loadInvoices = createAction('[Invoice List] Load Invoices', props<{ page: number }>());
export const loadInvoicesSuccess = createAction('[Invoice List] Load Invoices Success', props<{ invoices: Invoice[], currentPage: number, totalPages: number }>());
export const loadInvoicesFailure = createAction('[Invoice List] Load Invoices Failure', props<{ error: any }>());

export const addInvoice = createAction('[Invoice] Add Invoice', props<{ invoice: Invoice }>());
export const addInvoiceSuccess = createAction('[Invoice] Add Invoice Success', props<{ invoice: Invoice }>());
export const addInvoiceFailure = createAction('[Invoice] Add Invoice Failure', props<{ error: any }>());

export const findInvoiceByIdStart = createAction('[Invoice] Find Invoice By Id Start', props<{ id: string }>());
export const findInvoiceByIdSuccess = createAction('[Invoice] Find Invoice By Id Success', props<{ invoice: Invoice }>());
export const findInvoiceByIdFailure = createAction('[Invoice] Find Invoice By Id Failure',props<{ error: string }>());

export const showLoader = createAction('[Invoice] Show Loader');
export const hideLoader = createAction('[Invoice] Hide Loader');
