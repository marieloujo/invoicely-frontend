import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as InvoiceActions from './invoice.actions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { InvoiceService } from '../services/invoice.service';
import { ErrorHandlerService } from '@app/core/services/exceptions.service';

@Injectable()
export class InvoiceEffects {

  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoices),
      mergeMap(action =>
        this.invoiceService.getInvoices(action.page).pipe(
          map(response => InvoiceActions.loadInvoicesSuccess({
            invoices: response.data.data,
            currentPage: response.data.current_page,
            totalPages: response.data.last_page
          })),
          catchError(error => of(InvoiceActions.loadInvoicesFailure({ error }))),
        )
      ),
    )
  );

  addInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.addInvoice),
      mergeMap(action =>
        this.invoiceService.createInvoice(action.invoice).pipe(
          map(response => InvoiceActions.addInvoiceSuccess({ invoice: response.data })),
          catchError(error => of(InvoiceActions.addInvoiceFailure({ error })))
        )
      ),
      tap(() => {
        this.store.dispatch(InvoiceActions.hideLoader());
      })
    )
  );

  loadInvoicesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoicesFailure),
      map(action => {
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );

  addInvoiceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.addInvoiceSuccess),
      map(action => {
        this.toastr.success('Facture créée avec succès', 'Bravo!');
      })
    ), { dispatch: false }
  );

  addInvoiceFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.addInvoiceFailure),
      map(action => {
        this.toastr.error('Échec de la création de la facture', 'Oups!');
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );

  findInvoiceById$ = createEffect(() => this.actions$.pipe(
    ofType(InvoiceActions.findInvoiceByIdStart),
    mergeMap(action => this.invoiceService.getInvoiceById(action.id).pipe(
      map(response => InvoiceActions.findInvoiceByIdSuccess({ invoice: response.data })),
      catchError(error => of(InvoiceActions.findInvoiceByIdFailure({ error: error.message })))
    ))
  ));


  updateInvoice$ = createEffect(() => this.actions$.pipe(
    ofType(InvoiceActions.updateInvoice),
    mergeMap(action => this.invoiceService.markInvoiceAsPaid(action.invoice.id || '').pipe(
      map(response => InvoiceActions.updateInvoiceSuccess({ invoice: response.data })),
      catchError(error => of(InvoiceActions.updateInvoiceFailure({ error })))
    )),
    tap(() => {
      this.store.dispatch(InvoiceActions.hideLoader());
    })
  ));

  updateInvoiceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.updateInvoiceSuccess),
      map(action => {
        this.toastr.success('La facture été marqué comme payé avec succès', 'Bravo!');
        document.getElementById('dismiss-confirm-modal')?.click()
      })
    ), { dispatch: false }
  );

  updateInvoiceFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.updateInvoiceFailure),
      map(action => {
        this.toastr.error('Échec de la mise à jour de la facture', 'Oups!');
        document.getElementById('dismiss-confirm-modal')?.click()
        this.errorHandlerService.handleError(action.error)
      })
    ), { dispatch: false }
  );


  constructor(
    private toastr: ToastrService,
    private actions$: Actions,
    private store: Store,
    private invoiceService: InvoiceService,
    private errorHandlerService: ErrorHandlerService
  ) {}
}
